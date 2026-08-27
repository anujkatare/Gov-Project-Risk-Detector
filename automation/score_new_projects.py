from __future__ import annotations

import argparse
import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[1]
MODEL_DIR = PROJECT_ROOT / "analysis" / "models"
MANIFEST = json.loads((MODEL_DIR / "model_manifest.json").read_text(encoding="utf-8"))

def risk_drivers(row):
    triggers = []
    checks = [
        ("Low CPI", row.get("CPI_Snapshot", 1) < 0.95, 1-row.get("CPI_Snapshot",1)),
        ("Low SPI", row.get("SPI_Snapshot", 1) < 0.95, 1-row.get("SPI_Snapshot",1)),
        ("Pending change exposure", row.get("Pending_Change_Exposure_Pct_Budget",0) > 0.02, row.get("Pending_Change_Exposure_Pct_Budget",0)),
        ("Overdue RFI backlog", row.get("Overdue_RFI_Rate",0) > 0.25, row.get("Overdue_RFI_Rate",0)),
        ("Slow RFI response", row.get("Avg_RFI_Response_Days",0) > 12, row.get("Avg_RFI_Response_Days",0)/30),
        ("Slow change approval", row.get("Change_Approval_Cycle_Days",0) > 28, row.get("Change_Approval_Cycle_Days",0)/75),
        ("High contingency use", row.get("Contingency_Utilization_Pct",0) > 0.60, row.get("Contingency_Utilization_Pct",0)),
        ("Workflow risk score", row.get("Workflow_Risk_Score_Snapshot",0) >= 6, row.get("Workflow_Risk_Score_Snapshot",0)/14),
    ]
    for label, condition, magnitude in checks:
        if condition:
            triggers.append((label, magnitude))
    triggers.sort(key=lambda x:x[1], reverse=True)
    return "; ".join(label for label,_ in triggers[:3]) or "No dominant rule-based trigger"

def score(input_path: Path, output_path: Path):
    data = pd.read_csv(input_path)
    missing = [c for c in MANIFEST["feature_columns"] if c not in data.columns]
    if missing:
        raise ValueError(f"Missing required feature columns: {missing}")
    X = data[MANIFEST["feature_columns"]]
    cost_model = joblib.load(MODEL_DIR / MANIFEST["cost_model_file"])
    schedule_model = joblib.load(MODEL_DIR / MANIFEST["schedule_model_file"])
    cost_reg = joblib.load(MODEL_DIR / MANIFEST["cost_regression_file"])
    schedule_reg = joblib.load(MODEL_DIR / MANIFEST["schedule_regression_file"])

    cost_prob = cost_model.predict_proba(X)[:,1]
    schedule_prob = schedule_model.predict_proba(X)[:,1]
    overall = 1-(1-cost_prob)*(1-schedule_prob)

    output = data[[c for c in MANIFEST["id_columns"] if c in data.columns]].copy()
    output["Predicted_Cost_Overrun_Probability"] = cost_prob
    output["Predicted_Schedule_Delay_Probability"] = schedule_prob
    output["Overall_Overrun_Probability"] = overall
    output["Predicted_Final_Cost_Overrun_Pct"] = cost_reg.predict(X)
    output["Predicted_Final_Schedule_Delay_Days"] = schedule_reg.predict(X)
    output["Cost_Alert_Flag"] = (cost_prob >= MANIFEST["cost_threshold"]).astype(int)
    output["Schedule_Alert_Flag"] = (schedule_prob >= MANIFEST["schedule_threshold"]).astype(int)
    output["Risk_Band"] = np.select(
        [overall >= MANIFEST["risk_band_thresholds"]["Red"],
         overall >= MANIFEST["risk_band_thresholds"]["Yellow"]],
        ["Red","Yellow"], default="Green"
    )
    output["Primary_Risk_Drivers"] = data.apply(risk_drivers, axis=1)
    output["Model_Version"] = MANIFEST["model_version"]
    output = output.sort_values("Overall_Overrun_Probability", ascending=False)
    output.to_csv(output_path, index=False)
    print(f"Scored {len(output)} projects -> {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("input_csv", type=Path)
    parser.add_argument("output_csv", type=Path)
    args = parser.parse_args()
    score(args.input_csv, args.output_csv)
