"""
Predictive Construction Project Overrun Model - dashboard generation.

Regenerates every dashboard in share/assets/ directly from the analytical CSV
outputs in analysis/tables/. Deterministic: same inputs, same pixels.

Usage:
    python analysis/visualization/generate_dashboards.py [output_dir]

Data disclosure: all records are synthetic. The model is human decision support
and is not authorized for production use.
"""

import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from inproject_bi import (  # noqa: E402
    Dashboard, STATUS, BRICK, BRICK_2, NAVY_3, GREEN, AMBER, RED, INK, MUTED,
    LINE, SURFACE, MONEY, money, hbar, grouped_bar, donut, table_panel,
)

ROOT = Path(__file__).resolve().parents[2]
T = ROOT / "analysis" / "tables"
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "share" / "assets"

STEEL = "#53616D"
COST = BRICK          # cost-overrun series
SCHED = STEEL         # schedule-delay series


def read(n):
    return pd.read_csv(T / n, encoding="utf-8-sig")


clf = read("classification_model_metrics.csv")
reg = read("regression_model_metrics.csv")
cal = read("calibration_results.csv")
cm = read("confusion_matrix.csv")
fi_cost = read("cost_overrun_flag_feature_importance.csv")
fi_sched = read("schedule_delay_flag_feature_importance.csv")
seg = read("segment_model_performance.csv")
pred = read("test_project_predictions.csv")
top30 = read("top_30_predicted_risk_projects.csv")

BANDS = ["Red", "Yellow", "Green"]
band_counts = pred["Risk_Band"].value_counts()

# Champion rows (test split)
cost_champ = clf[(clf.Target == "Cost_Overrun_Flag") & (clf.Split == "Test") &
                 (clf.Model == "Random Forest")].iloc[0]
sched_champ = clf[(clf.Target == "Schedule_Delay_Flag") & (clf.Split == "Test") &
                  (clf.Model == "Logistic Regression")].iloc[0]

SUB = ("Early-warning classification and regression across 2,362 synthetic "
       "construction projects, validated on a future 2025 test period.")


def pretty(f):
    """Turn a raw feature column name into a readable label."""
    return (str(f).replace("_Snapshot", "").replace("_Pct_Budget", " % budget")
            .replace("_Pct", " %").replace("_Days_to_Date", " days")
            .replace("_", " ").strip())


def clip(s, n=26):
    s = str(s)
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(" ", 1)[0]
    return (cut or s[:n]) + "…"


# ==========================================================  1. Executive
def executive():
    d = Dashboard("Predictive Overrun Model", SUB, eyebrow="Executive model view")
    d.kpis([
        ("2,362", "Modeling projects", NAVY_3),
        ("40", "Predictors", NAVY_3),
        (f"{cost_champ.ROC_AUC:.3f}", "Cost ROC-AUC (test)", BRICK),
        (f"{sched_champ.ROC_AUC:.3f}", "Schedule ROC-AUC (test)", AMBER),
        (f"{int(band_counts['Red'])}", "Red-band projects", RED),
        (f"{len(pred)}", "Test projects scored", NAVY_3),
    ])

    ax = d.panel((0.0, 0.52, 0.28, 0.48), "Predicted risk bands",
                 "2025 test period, combined probability", bottom=0.30)
    donut(ax, BANDS, [int(band_counts[b]) for b in BANDS],
          [STATUS[b] for b in BANDS], centre_value=len(pred),
          centre_label="scored", legend_below=True)

    ax = d.panel((0.30, 0.52, 0.38, 0.48), "Champion model performance",
                 "Validation selects the model; test measures generalization")
    labels = ["Cost\nROC-AUC", "Cost\nPR-AUC", "Schedule\nROC-AUC", "Schedule\nPR-AUC"]
    val = [clf[(clf.Target == "Cost_Overrun_Flag") & (clf.Split == "Validation") &
               (clf.Model == "Random Forest")].iloc[0].ROC_AUC,
           clf[(clf.Target == "Cost_Overrun_Flag") & (clf.Split == "Validation") &
               (clf.Model == "Random Forest")].iloc[0].PR_AUC,
           clf[(clf.Target == "Schedule_Delay_Flag") & (clf.Split == "Validation") &
               (clf.Model == "Logistic Regression")].iloc[0].ROC_AUC,
           clf[(clf.Target == "Schedule_Delay_Flag") & (clf.Split == "Validation") &
               (clf.Model == "Logistic Regression")].iloc[0].PR_AUC]
    tst = [cost_champ.ROC_AUC, cost_champ.PR_AUC,
           sched_champ.ROC_AUC, sched_champ.PR_AUC]
    grouped_bar(ax, labels, [("Validation (2024)", val, STEEL),
                             ("Test (2025)", tst, BRICK)])
    ax.set_ylim(0, 1.05)
    ax.set_ylabel("Score")
    for i, (v, t) in enumerate(zip(val, tst)):
        ax.text(i - 0.19, v + 0.02, f"{v:.3f}", ha="center", fontsize=7.8, color=MUTED)
        ax.text(i + 0.19, t + 0.02, f"{t:.3f}", ha="center", fontsize=7.8, color=INK)
    ax.tick_params(axis="x", labelsize=8.4)

    ax = d.panel((0.70, 0.52, 0.30, 0.48), "Outcome rate by predicted band",
                 "Actual overrun and delay rate in each band")
    rows = []
    for b in BANDS:
        s = pred[pred["Risk_Band"] == b]
        rows.append((b, s["Cost_Overrun_Flag"].mean() * 100,
                     s["Schedule_Delay_Flag"].mean() * 100))
    grouped_bar(ax, [r[0] for r in rows],
                [("Cost overrun", [r[1] for r in rows], COST),
                 ("Schedule delay", [r[2] for r in rows], SCHED)])
    ax.set_ylabel("Actual rate (%)")
    ax.set_ylim(0, 100)

    ax = d.panel((0.0, 0.0, 1.0, 0.46), "Highest predicted risk projects",
                 "Ranked by combined overrun probability; every row requires human review",
                 left=0.02)
    t = top30.head(10)
    table_panel(
        ax,
        ["#", "Project", "Type", "Region", "CPI", "SPI", "Cost prob",
         "Sched prob", "Combined", "Band", "Primary drivers"],
        [[str(i + 1), f"{r.Project_ID}  {clip(r.Project_Name, 24)}", r.Project_Type,
          r.Region, f"{r.CPI_Snapshot:.3f}", f"{r.SPI_Snapshot:.3f}",
          f"{r.Predicted_Cost_Overrun_Probability:.1%}",
          f"{r.Predicted_Schedule_Delay_Probability:.1%}",
          f"{r.Overall_Overrun_Probability:.1%}", r.Risk_Band,
          clip(r.Primary_Risk_Drivers, 34)]
         for i, r in enumerate(t.itertuples())],
        widths=[0.028, 0.215, 0.085, 0.062, 0.05, 0.05, 0.072, 0.075, 0.072, 0.05, 0.241],
        aligns=["right", "left", "left", "left", "right", "right", "right",
                "right", "right", "left", "left"],
        cell_colors={(i, 9): STATUS.get(r.Risk_Band, INK)
                     for i, r in enumerate(t.itertuples())})
    d.save(OUT / "executive_model_dashboard.png")


# ==========================================================  2. Performance
def performance():
    d = Dashboard("Model Performance and Calibration",
                  "Validation selects champions and thresholds; the 2025 test period measures temporal generalization.",
                  eyebrow="Model performance")
    d.kpis([
        (f"{cost_champ.ROC_AUC:.3f}", "Cost ROC-AUC", BRICK),
        (f"{cost_champ.PR_AUC:.3f}", "Cost PR-AUC", BRICK),
        (f"{cost_champ.Brier_Score:.3f}", "Cost Brier", NAVY_3),
        (f"{sched_champ.ROC_AUC:.3f}", "Schedule ROC-AUC", AMBER),
        (f"{sched_champ.PR_AUC:.3f}", "Schedule PR-AUC", AMBER),
        (f"{sched_champ.Brier_Score:.3f}", "Schedule Brier", NAVY_3),
    ])

    ax = d.panel((0.0, 0.52, 0.46, 0.48), "Calibration",
                 "Mean predicted probability vs observed rate, by decile")
    for target, col, lab in (("Cost_Overrun_Flag", COST, "Cost overrun"),
                             ("Schedule_Delay_Flag", SCHED, "Schedule delay")):
        s = cal[cal.Target == target].sort_values("Bin")
        ax.plot(s["Mean_Predicted_Probability"], s["Observed_Rate"], marker="o",
                color=col, linewidth=2.2, label=lab, zorder=3)
    ax.plot([0, 1], [0, 1], linestyle="--", color=MUTED, linewidth=1.2,
            label="Perfect calibration", zorder=2)
    ax.set_xlabel("Mean predicted probability")
    ax.set_ylabel("Observed rate")
    ax.set_xlim(0, 1); ax.set_ylim(0, 1)
    ax.legend(fontsize=8.8, loc="upper left")

    ax = d.panel((0.48, 0.52, 0.52, 0.48), "Model comparison",
                 "ROC-AUC by target, model and split")
    grp = []
    labels = ["Cost\nLogistic", "Cost\nRandom Forest",
              "Schedule\nLogistic", "Schedule\nRandom Forest"]
    combos = [("Cost_Overrun_Flag", "Logistic Regression"),
              ("Cost_Overrun_Flag", "Random Forest"),
              ("Schedule_Delay_Flag", "Logistic Regression"),
              ("Schedule_Delay_Flag", "Random Forest")]
    v = [clf[(clf.Target == t) & (clf.Model == m) & (clf.Split == "Validation")].iloc[0].ROC_AUC
         for t, m in combos]
    s = [clf[(clf.Target == t) & (clf.Model == m) & (clf.Split == "Test")].iloc[0].ROC_AUC
         for t, m in combos]
    grouped_bar(ax, labels, [("Validation", v, STEEL), ("Test", s, BRICK)])
    ax.set_ylim(0, 1.05)
    ax.set_ylabel("ROC-AUC")
    for i, (a, b) in enumerate(zip(v, s)):
        ax.text(i - 0.19, a + 0.02, f"{a:.3f}", ha="center", fontsize=7.8, color=MUTED)
        ax.text(i + 0.19, b + 0.02, f"{b:.3f}", ha="center", fontsize=7.8, color=INK)
    ax.tick_params(axis="x", labelsize=8.4)

    ax = d.panel((0.0, 0.0, 0.46, 0.48), "Confusion matrix, test period",
                 "Champion model per target at its selected threshold")
    tgts = [("Cost_Overrun_Flag", "Random Forest", "Cost overrun"),
            ("Schedule_Delay_Flag", "Logistic Regression", "Schedule delay")]
    cells = ["TP", "FN", "FP", "TN"]
    x = np.arange(len(cells))
    w = 0.38
    for i, (t, m, lab) in enumerate(tgts):
        s = cm[(cm.Target == t) & (cm.Model == m)].set_index("Cell")["Count"]
        vals = [int(s[c]) for c in cells]
        off = (i - 0.5) * w
        ax.bar(x + off, vals, width=w, color=[COST, SCHED][i], label=lab, zorder=3)
        for xx, vv in zip(x + off, vals):
            ax.text(xx, vv + 5, str(vv), ha="center", fontsize=8.2, color=INK, zorder=4)
    ax.set_xticks(x)
    ax.set_xticklabels(["True positive", "False negative", "False positive", "True negative"],
                       fontsize=8.6)
    ax.set_ylabel("Projects")
    ax.legend(fontsize=8.8, ncol=2, loc="upper center")
    ax.grid(axis="x", visible=False)

    ax = d.panel((0.48, 0.0, 0.52, 0.48), "Regression performance, test period",
                 "Continuous forecasts of final overrun and delay", left=0.02)
    r = reg[reg.Split == "Test"]
    table_panel(
        ax, ["Target", "Model", "MAE", "RMSE", "R²"],
        [[row.Target.replace("_", " "), row.Model,
          f"{row.MAE:.3f}" if "Pct" in row.Target else f"{row.MAE:.2f} d",
          f"{row.RMSE:.3f}" if "Pct" in row.Target else f"{row.RMSE:.2f} d",
          f"{row.R2:.3f}"] for row in r.itertuples()],
        widths=[0.30, 0.26, 0.145, 0.145, 0.15],
        aligns=["left", "left", "right", "right", "right"])
    d.save(OUT / "model_performance_dashboard.png")


# ==========================================================  3. Drivers
def drivers():
    d = Dashboard("What Drives the Prediction",
                  "Permutation importance on the test period, plus where the model works best and worst.",
                  eyebrow="Feature drivers")
    tc = fi_cost.sort_values("Importance_Mean", ascending=False).head(10)
    ts = fi_sched.sort_values("Importance_Mean", ascending=False).head(10)
    d.kpis([
        (pretty(tc.iloc[0].Feature), "Top cost driver", BRICK),
        (f"{tc.iloc[0].Importance_Mean:.3f}", "Cost importance", BRICK),
        (pretty(ts.iloc[0].Feature), "Top schedule driver", AMBER),
        (f"{ts.iloc[0].Importance_Mean:.3f}", "Schedule importance", AMBER),
        ("40", "Predictors evaluated", NAVY_3),
        ("Permutation", "Importance method", NAVY_3),
    ])

    ax = d.panel((0.0, 0.50, 0.50, 0.50), "Cost-overrun drivers",
                 "Permutation importance, champion Random Forest", left=0.34)
    hbar(ax, [clip(pretty(f), 30) for f in tc["Feature"]],
         tc["Importance_Mean"].tolist(), color=COST, fmt=lambda v: f"{v:.4f}")
    ax.tick_params(axis="y", labelsize=8.4)
    ax.set_xlabel("Mean importance")

    ax = d.panel((0.52, 0.50, 0.48, 0.50), "Schedule-delay drivers",
                 "Permutation importance, champion Logistic Regression", left=0.36)
    hbar(ax, [clip(pretty(f), 30) for f in ts["Feature"]],
         ts["Importance_Mean"].tolist(), color=SCHED, fmt=lambda v: f"{v:.4f}")
    ax.tick_params(axis="y", labelsize=8.4)
    ax.set_xlabel("Mean importance")

    ax = d.panel((0.0, 0.0, 0.50, 0.46), "Cost model by project type",
                 "Segment ROC-AUC; small segments are less reliable", left=0.26)
    s = seg[(seg.Target == "Cost_Overrun_Flag") &
            (seg.Segment_Field == "Project_Type")].sort_values("ROC_AUC")
    cols = [RED if v < 0.75 else AMBER if v < 0.85 else GREEN for v in s["ROC_AUC"]]
    hbar(ax, [f"{r.Segment}  (n={int(r.Project_Count)})" for r in s.itertuples()],
         s["ROC_AUC"].tolist(), colors=cols, fmt=lambda v: f"{v:.3f}")
    ax.set_xlim(0, 1.08)
    ax.set_xlabel("ROC-AUC")

    ax = d.panel((0.52, 0.0, 0.48, 0.46), "Schedule model by project type",
                 "Weaker and more variable than the cost model", left=0.28)
    s = seg[(seg.Target == "Schedule_Delay_Flag") &
            (seg.Segment_Field == "Project_Type")].sort_values("ROC_AUC")
    cols = [RED if v < 0.75 else AMBER if v < 0.85 else GREEN for v in s["ROC_AUC"]]
    hbar(ax, [f"{r.Segment}  (n={int(r.Project_Count)})" for r in s.itertuples()],
         s["ROC_AUC"].tolist(), colors=cols, fmt=lambda v: f"{v:.3f}")
    ax.set_xlim(0, 1.08)
    ax.set_xlabel("ROC-AUC")
    d.save(OUT / "feature_driver_dashboard.png")


# ==========================================================  4. Project risk
def project_risk():
    d = Dashboard("Project Risk Prioritization",
                  "Which projects to review first, and how the two risks combine.",
                  eyebrow="Project risk")
    d.kpis([
        (f"{int(band_counts['Red'])}", "Red band", RED),
        (f"{int(band_counts['Yellow'])}", "Yellow band", AMBER),
        (f"{int(band_counts['Green'])}", "Green band", GREEN),
        (f"{pred['Cost_Overrun_Flag'].mean():.1%}", "Actual cost-overrun rate", BRICK),
        (f"{pred['Schedule_Delay_Flag'].mean():.1%}", "Actual delay rate", AMBER),
        ("Human review", "Required before action", NAVY_3),
    ])

    ax = d.panel((0.0, 0.50, 0.50, 0.50), "How the two risks combine",
                 "Each point is a 2025 test project; band comes from combined probability")
    for b in BANDS:
        s = pred[pred["Risk_Band"] == b]
        ax.scatter(s["Predicted_Cost_Overrun_Probability"],
                   s["Predicted_Schedule_Delay_Probability"],
                   s=16, color=STATUS[b], label=b, alpha=0.75,
                   edgecolor="white", linewidth=0.4, zorder=3)
    ax.set_xlabel("Predicted cost-overrun probability")
    ax.set_ylabel("Predicted schedule-delay probability")
    ax.set_xlim(0, 1); ax.set_ylim(0, 1)
    ax.legend(fontsize=9, ncol=3, loc="upper left")

    ax = d.panel((0.52, 0.50, 0.48, 0.50), "Risk band by project type",
                 "Share of each project type in each band")
    piv = (pred.pivot_table(index="Project_Type", columns="Risk_Band",
                            values="Project_ID", aggfunc="count")
           .fillna(0).reindex(columns=BANDS, fill_value=0))
    piv = piv.loc[(piv["Red"] / piv.sum(axis=1)).sort_values().index]
    share = piv.div(piv.sum(axis=1), axis=0) * 100
    bottom = np.zeros(len(share))
    for b in BANDS:
        ax.barh(range(len(share)), share[b], left=bottom, color=STATUS[b],
                height=0.68, label=b, zorder=3)
        bottom += share[b].values
    ax.set_yticks(range(len(share)))
    ax.set_yticklabels(share.index, fontsize=8.8)
    ax.set_xlim(0, 100)
    ax.set_xlabel("Share of projects (%)")
    ax.grid(axis="y", visible=False)
    ax.legend(fontsize=8.8, ncol=3, loc="lower right")

    ax = d.panel((0.0, 0.0, 1.0, 0.46), "Top 12 projects for management review",
                 "Highest combined probability; predictions are decision support, not decisions",
                 left=0.02)
    t = top30.head(12)
    table_panel(
        ax,
        ["#", "Project", "Type", "Delivery", "CPI", "SPI", "Overdue RFI",
         "Approval days", "Cost prob", "Sched prob", "Combined", "Band"],
        [[str(i + 1), f"{r.Project_ID}  {clip(r.Project_Name, 22)}", r.Project_Type,
          r.Delivery_Method, f"{r.CPI_Snapshot:.3f}", f"{r.SPI_Snapshot:.3f}",
          f"{r.Overdue_RFI_Rate:.1%}", f"{r.Change_Approval_Cycle_Days:.1f}",
          f"{r.Predicted_Cost_Overrun_Probability:.1%}",
          f"{r.Predicted_Schedule_Delay_Probability:.1%}",
          f"{r.Overall_Overrun_Probability:.1%}", r.Risk_Band]
         for i, r in enumerate(t.itertuples())],
        widths=[0.028, 0.205, 0.083, 0.098, 0.05, 0.05, 0.078, 0.088, 0.072, 0.078,
                0.075, 0.045],
        aligns=["right", "left", "left", "left", "right", "right", "right",
                "right", "right", "right", "right", "left"],
        cell_colors={(i, 11): STATUS.get(r.Risk_Band, INK)
                     for i, r in enumerate(t.itertuples())})
    d.save(OUT / "project_risk_dashboard.png")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    print(f"Writing dashboards to {OUT}")
    executive()
    performance()
    drivers()
    project_risk()
    print("done")
