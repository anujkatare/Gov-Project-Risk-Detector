from __future__ import annotations

import csv
import json
import math
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.inspection import permutation_importance
from sklearn.linear_model import LogisticRegression, Ridge
from sklearn.metrics import (
    accuracy_score, average_precision_score, brier_score_loss, confusion_matrix,
    f1_score, mean_absolute_error, mean_squared_error, precision_score,
    r2_score, recall_score, roc_auc_score
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA = PROJECT_ROOT / "data" / "processed" / "modeling_dataset_clean.csv"
TABLES = PROJECT_ROOT / "analysis" / "tables"
MODELS = PROJECT_ROOT / "analysis" / "models"
SCORING = PROJECT_ROOT / "analysis" / "scoring"
DOC = PROJECT_ROOT / "documentation"

for folder in (TABLES, MODELS, SCORING, DOC):
    folder.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(DATA)

id_columns = ["Project_ID", "Project_Name"]
date_columns = ["Start_Date", "Snapshot_Date"]
split_columns = ["Snapshot_Year", "Data_Split"]
classification_targets = ["Cost_Overrun_Flag", "Schedule_Delay_Flag", "Combined_Overrun_Flag"]
regression_targets = ["Final_Cost_Overrun_Pct", "Final_Schedule_Delay_Days"]
post_outcome_fields = ["Final_CPI", "Final_SPI", "Final_Status", "Actual_End_Date", "Final_EAC"]
all_target_fields = classification_targets + regression_targets + post_outcome_fields

feature_columns = [
    c for c in df.columns
    if c not in id_columns + date_columns + split_columns + all_target_fields
]

# Explicitly defining categorical features to prevent String-to-Float conversion errors
categorical_features = [
    "Project_Type", "Region", "Delivery_Method", 
    "Complexity_Level", "Digital_Coordination_Level", "Owner_Decision_Profile"
]
numeric_features = [c for c in feature_columns if c not in categorical_features]

train = df[df["Data_Split"] == "Train"].copy()
validation = df[df["Data_Split"] == "Validation"].copy()
test = df[df["Data_Split"] == "Test"].copy()

def classifier_preprocessor():
    return ColumnTransformer([
        ("numeric", StandardScaler(), numeric_features),
        ("categorical", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ])

def tree_preprocessor():
    return ColumnTransformer([
        ("numeric", "passthrough", numeric_features),
        ("categorical", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ])

def best_f1_threshold(y_true, probabilities):
    candidates = np.linspace(0.10, 0.90, 161)
    scores = [f1_score(y_true, probabilities >= t, zero_division=0) for t in candidates]
    index = int(np.argmax(scores))
    return float(candidates[index]), float(scores[index])

def classification_metrics(y_true, probabilities, threshold):
    pred = (probabilities >= threshold).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_true, pred, labels=[0,1]).ravel()
    return {
        "ROC_AUC": roc_auc_score(y_true, probabilities),
        "PR_AUC": average_precision_score(y_true, probabilities),
        "Brier_Score": brier_score_loss(y_true, probabilities),
        "Accuracy": accuracy_score(y_true, pred),
        "Precision": precision_score(y_true, pred, zero_division=0),
        "Recall": recall_score(y_true, pred, zero_division=0),
        "F1": f1_score(y_true, pred, zero_division=0),
        "Specificity": tn / (tn + fp) if (tn + fp) else 0,
        "Threshold": threshold,
        "TN": int(tn), "FP": int(fp), "FN": int(fn), "TP": int(tp),
    }

def regression_metrics(y_true, pred):
    return {
        "MAE": mean_absolute_error(y_true, pred),
        "RMSE": math.sqrt(mean_squared_error(y_true, pred)),
        "R2": r2_score(y_true, pred),
    }

classification_results = []
regression_results = []
confusion_rows = []
calibration_rows = []
champions = {}
trained_pipelines = {}

X_train = train[feature_columns]
X_val = validation[feature_columns]
X_test = test[feature_columns]

for target in ["Cost_Overrun_Flag", "Schedule_Delay_Flag"]:
    y_train = train[target].astype(int)
    y_val = validation[target].astype(int)
    y_test = test[target].astype(int)

    candidates = {
        "Logistic Regression": Pipeline([
            ("preprocess", classifier_preprocessor()),
            ("model", LogisticRegression(max_iter=2500, class_weight="balanced", C=1.0, random_state=42)),
        ]),
        "Random Forest": Pipeline([
            ("preprocess", tree_preprocessor()),
            ("model", RandomForestClassifier(
                n_estimators=220, max_depth=9, min_samples_leaf=8,
                max_features="sqrt", class_weight="balanced_subsample",
                random_state=42, n_jobs=-1
            )),
        ]),
    }

    val_scores = {}
    fitted = {}
    thresholds = {}
    for model_name, pipeline in candidates.items():
        pipeline.fit(X_train, y_train)
        fitted[model_name] = pipeline
        val_prob = pipeline.predict_proba(X_val)[:,1]
        threshold, _ = best_f1_threshold(y_val.to_numpy(), val_prob)
        thresholds[model_name] = threshold
        val_metric = classification_metrics(y_val, val_prob, threshold)
        val_scores[model_name] = val_metric["PR_AUC"]
        classification_results.append({
            "Target": target, "Model": model_name, "Split": "Validation", **val_metric
        })

    champion_name = max(val_scores, key=val_scores.get)
    champion = fitted[champion_name]
    threshold = thresholds[champion_name]
    champions[target] = {
        "model_name": champion_name,
        "threshold": threshold,
        "validation_pr_auc": val_scores[champion_name],
    }
    trained_pipelines[target] = champion
    joblib.dump(champion, MODELS / f"{target.lower()}_champion.joblib")

    for model_name, pipeline in fitted.items():
        test_prob = pipeline.predict_proba(X_test)[:,1]
        test_metric = classification_metrics(y_test, test_prob, thresholds[model_name])
        classification_results.append({
            "Target": target, "Model": model_name, "Split": "Test", **test_metric
        })
        if model_name == champion_name:
            for label, value in [("TN",test_metric["TN"]),("FP",test_metric["FP"]),("FN",test_metric["FN"]),("TP",test_metric["TP"])]:
                confusion_rows.append({
                    "Target": target, "Model": model_name, "Cell": label, "Count": value
                })
            # Calibration bins.
            bins = pd.qcut(test_prob, q=10, duplicates="drop")
            cal = pd.DataFrame({"prob":test_prob,"actual":y_test.to_numpy(),"bin":bins}).groupby("bin", observed=True).agg(
                Mean_Predicted_Probability=("prob","mean"),
                Observed_Rate=("actual","mean"),
                Project_Count=("actual","size")
            ).reset_index(drop=True)
            for idx, row in cal.iterrows():
                calibration_rows.append({
                    "Target": target, "Bin": idx+1,
                    "Mean_Predicted_Probability": row["Mean_Predicted_Probability"],
                    "Observed_Rate": row["Observed_Rate"],
                    "Project_Count": int(row["Project_Count"]),
                })

    # Permutation importance on champion using original feature columns.
    importance = permutation_importance(
        champion, X_test, y_test, scoring="roc_auc", n_repeats=8,
        random_state=42, n_jobs=-1
    )
    importance_rows = sorted([
        {
            "Target": target,
            "Feature": feature,
            "Importance_Mean": float(mean),
            "Importance_Std": float(std),
        }
        for feature, mean, std in zip(feature_columns, importance.importances_mean, importance.importances_std)
    ], key=lambda r: r["Importance_Mean"], reverse=True)
    pd.DataFrame(importance_rows).to_csv(
        TABLES / f"{target.lower()}_feature_importance.csv", index=False
    )

# Regression models.
for target in regression_targets:
    y_train = train[target].astype(float)
    y_val = validation[target].astype(float)
    y_test = test[target].astype(float)

    candidates = {
        "Ridge Regression": Pipeline([
            ("preprocess", classifier_preprocessor()),
            ("model", Ridge(alpha=5.0)),
        ]),
        "Random Forest Regressor": Pipeline([
            ("preprocess", tree_preprocessor()),
            ("model", RandomForestRegressor(
                n_estimators=220, max_depth=10, min_samples_leaf=6,
                max_features=0.75, random_state=42, n_jobs=-1
            )),
        ]),
    }
    val_mae = {}
    fitted = {}
    for model_name, pipeline in candidates.items():
        pipeline.fit(X_train, y_train)
        fitted[model_name] = pipeline
        val_pred = pipeline.predict(X_val)
        metrics = regression_metrics(y_val, val_pred)
        val_mae[model_name] = metrics["MAE"]
        regression_results.append({
            "Target": target, "Model": model_name, "Split": "Validation", **metrics
        })
    champion_name = min(val_mae, key=val_mae.get)
    champion = fitted[champion_name]
    champions[target] = {
        "model_name": champion_name,
        "validation_mae": val_mae[champion_name],
    }
    trained_pipelines[target] = champion
    joblib.dump(champion, MODELS / f"{target.lower()}_champion.joblib")
    for model_name, pipeline in fitted.items():
        test_pred = pipeline.predict(X_test)
        metrics = regression_metrics(y_test, test_pred)
        regression_results.append({
            "Target": target, "Model": model_name, "Split": "Test", **metrics
        })

# Score test projects with champion models.
cost_model = trained_pipelines["Cost_Overrun_Flag"]
schedule_model = trained_pipelines["Schedule_Delay_Flag"]
cost_prob = cost_model.predict_proba(X_test)[:,1]
schedule_prob = schedule_model.predict_proba(X_test)[:,1]
overall_prob = 1 - (1-cost_prob)*(1-schedule_prob)

cost_reg = trained_pipelines["Final_Cost_Overrun_Pct"].predict(X_test)
schedule_reg = trained_pipelines["Final_Schedule_Delay_Days"].predict(X_test)

scored = test[id_columns + [
    "Project_Type","Region","Delivery_Method","Complexity_Level",
    "Digital_Coordination_Level","Owner_Decision_Profile","Original_Budget",
    "CPI_Snapshot","SPI_Snapshot","Pending_Change_Exposure_Pct_Budget",
    "Avg_RFI_Response_Days","Overdue_RFI_Rate","Change_Approval_Cycle_Days",
    "Contingency_Utilization_Pct","Workflow_Risk_Score_Snapshot",
    "Cost_Overrun_Flag","Schedule_Delay_Flag","Final_Cost_Overrun_Pct",
    "Final_Schedule_Delay_Days"
]].copy()
scored["Predicted_Cost_Overrun_Probability"] = cost_prob
scored["Predicted_Schedule_Delay_Probability"] = schedule_prob
scored["Overall_Overrun_Probability"] = overall_prob
scored["Predicted_Final_Cost_Overrun_Pct"] = cost_reg
scored["Predicted_Final_Schedule_Delay_Days"] = schedule_reg
scored["Risk_Band"] = np.select(
    [overall_prob >= 0.65, overall_prob >= 0.35],
    ["Red","Yellow"], default="Green"
)

def explain(row):
    triggers = []
    if row["CPI_Snapshot"] < 0.95:
        triggers.append(("Low CPI", 1-row["CPI_Snapshot"]))
    if row["SPI_Snapshot"] < 0.95:
        triggers.append(("Low SPI", 1-row["SPI_Snapshot"]))
    if row["Pending_Change_Exposure_Pct_Budget"] > 0.02:
        triggers.append(("Pending change exposure", row["Pending_Change_Exposure_Pct_Budget"]))
    if row["Overdue_RFI_Rate"] > 0.25:
        triggers.append(("Overdue RFI backlog", row["Overdue_RFI_Rate"]))
    if row["Avg_RFI_Response_Days"] > 12:
        triggers.append(("Slow RFI response", row["Avg_RFI_Response_Days"]/30))
    if row["Change_Approval_Cycle_Days"] > 28:
        triggers.append(("Slow change approval", row["Change_Approval_Cycle_Days"]/75))
    if row["Contingency_Utilization_Pct"] > 0.60:
        triggers.append(("High contingency use", row["Contingency_Utilization_Pct"]))
    if row["Workflow_Risk_Score_Snapshot"] >= 6:
        triggers.append(("Workflow risk score", row["Workflow_Risk_Score_Snapshot"]/14))
    triggers.sort(key=lambda x:x[1], reverse=True)
    return "; ".join(t[0] for t in triggers[:3]) or "No dominant rule-based trigger"

scored["Primary_Risk_Drivers"] = scored.apply(explain, axis=1)
scored = scored.sort_values("Overall_Overrun_Probability", ascending=False)
scored.to_csv(TABLES / "test_project_predictions.csv", index=False)
scored.head(30).to_csv(TABLES / "top_30_predicted_risk_projects.csv", index=False)

# Sample scoring input excludes actual targets and final outcomes.
sample_input = test[feature_columns + id_columns].head(25).copy()
sample_input.to_csv(SCORING / "sample_new_projects.csv", index=False)

# Segment performance.
segment_rows = []
for target, probs, threshold in [
    ("Cost_Overrun_Flag", cost_prob, champions["Cost_Overrun_Flag"]["threshold"]),
    ("Schedule_Delay_Flag", schedule_prob, champions["Schedule_Delay_Flag"]["threshold"]),
]:
    y = test[target].astype(int).to_numpy()
    pred = (probs >= threshold).astype(int)
    temp = test.copy()
    temp["_prob"] = probs
    temp["_pred"] = pred
    for field in ["Project_Type","Complexity_Level","Digital_Coordination_Level","Owner_Decision_Profile","Delivery_Method"]:
        for segment, group in temp.groupby(field):
            if len(group) < 25:
                continue
            gy = group[target].astype(int)
            auc = roc_auc_score(gy, group["_prob"]) if gy.nunique() == 2 else None
            segment_rows.append({
                "Target": target,
                "Segment_Field": field,
                "Segment": segment,
                "Project_Count": len(group),
                "Actual_Positive_Rate": gy.mean(),
                "Mean_Predicted_Probability": group["_prob"].mean(),
                "ROC_AUC": auc,
                "Precision": precision_score(gy, group["_pred"], zero_division=0),
                "Recall": recall_score(gy, group["_pred"], zero_division=0),
                "F1": f1_score(gy, group["_pred"], zero_division=0),
            })

pd.DataFrame(classification_results).to_csv(TABLES / "classification_model_metrics.csv", index=False)
pd.DataFrame(regression_results).to_csv(TABLES / "regression_model_metrics.csv", index=False)
pd.DataFrame(confusion_rows).to_csv(TABLES / "confusion_matrix.csv", index=False)
pd.DataFrame(calibration_rows).to_csv(TABLES / "calibration_results.csv", index=False)
pd.DataFrame(segment_rows).to_csv(TABLES / "segment_model_performance.csv", index=False)

# Champion summary.
champion_summary = {
    "feature_count": len(feature_columns),
    "numeric_feature_count": len(numeric_features),
    "categorical_feature_count": len(categorical_features),
    "train_projects": len(train),
    "validation_projects": len(validation),
    "test_projects": len(test),
    "champions": champions,
    "risk_band_distribution": scored["Risk_Band"].value_counts().to_dict(),
}
(DOC / "model_validation_summary.json").write_text(
    json.dumps(champion_summary, indent=2), encoding="utf-8"
)

# Model card.
cost_test = pd.DataFrame(classification_results)
cost_test = cost_test[(cost_test["Target"]=="Cost_Overrun_Flag") & (cost_test["Split"]=="Test") & (cost_test["Model"]==champions["Cost_Overrun_Flag"]["model_name"])].iloc[0]
schedule_test = pd.DataFrame(classification_results)
schedule_test = schedule_test[(schedule_test["Target"]=="Schedule_Delay_Flag") & (schedule_test["Split"]=="Test") & (schedule_test["Model"]==champions["Schedule_Delay_Flag"]["model_name"])].iloc[0]

model_card = f"""# Model Card

## Model purpose

Estimate early/mid-project probability of:

- final cost overrun of at least 10%; and
- final schedule delay of at least 30 days.

The model supports management prioritization. It does not authorize contractual, employment, safety, or financial decisions.

## Data

- Synthetic projects: {len(df):,}
- Train: {len(train):,} projects from 2019–2023
- Validation: {len(validation):,} projects from 2024
- Test: {len(test):,} projects from 2025
- Predictor fields: {len(feature_columns)}
- Final-outcome fields excluded from predictors.

## Champion models

### Cost overrun

- Model: {champions["Cost_Overrun_Flag"]["model_name"]}
- Validation threshold: {champions["Cost_Overrun_Flag"]["threshold"]:.3f}
- Test ROC-AUC: {cost_test["ROC_AUC"]:.3f}
- Test PR-AUC: {cost_test["PR_AUC"]:.3f}
- Test recall: {cost_test["Recall"]:.3f}
- Test precision: {cost_test["Precision"]:.3f}
- Test Brier score: {cost_test["Brier_Score"]:.3f}

### Schedule delay

- Model: {champions["Schedule_Delay_Flag"]["model_name"]}
- Validation threshold: {champions["Schedule_Delay_Flag"]["threshold"]:.3f}
- Test ROC-AUC: {schedule_test["ROC_AUC"]:.3f}
- Test PR-AUC: {schedule_test["PR_AUC"]:.3f}
- Test recall: {schedule_test["Recall"]:.3f}
- Test precision: {schedule_test["Precision"]:.3f}
- Test Brier score: {schedule_test["Brier_Score"]:.3f}

## Intended use

- Project portfolio screening
- Project-controls exception review
- Early recovery-plan prioritization
- Scenario discussion with human decision-makers

## Prohibited use

- Autonomous project approval or rejection
- Contractual entitlement decisions
- Safety-critical decisions
- Personnel evaluation
- Claims of causal impact
- Production use on real projects without independent validation

## Human review

A prediction must be reviewed with:

- project phase and current context;
- known owner or design decisions;
- approved and pending changes;
- forecast quality;
- procurement and schedule constraints;
- and documented override rationale.

## Limitations

- All data is synthetic.
- Performance is not an industry benchmark.
- Target thresholds are case-study definitions.
- Drift, calibration, and subgroup performance require monitoring on any real deployment.
- Rule-based explanations are supplementary and not causal.
"""
(DOC / "model_card.md").write_text(model_card, encoding="utf-8")

print(json.dumps(champion_summary, indent=2))