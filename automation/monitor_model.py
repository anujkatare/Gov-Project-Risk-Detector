from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.metrics import average_precision_score, brier_score_loss, recall_score, roc_auc_score

def psi(expected, actual, bins=10):
    quantiles = np.unique(np.quantile(expected, np.linspace(0,1,bins+1)))
    if len(quantiles) < 3:
        return 0.0
    e = np.histogram(expected, bins=quantiles)[0] / max(len(expected),1)
    a = np.histogram(actual, bins=quantiles)[0] / max(len(actual),1)
    e = np.clip(e, 1e-6, None)
    a = np.clip(a, 1e-6, None)
    return float(np.sum((a-e)*np.log(a/e)))

def main(reference_csv, monitoring_csv, output_json):
    ref = pd.read_csv(reference_csv)
    mon = pd.read_csv(monitoring_csv)
    report = {"status":"Passed","metrics":{},"drift":{},"triggers":[]}
    for target, prob in [
        ("Cost_Overrun_Flag","Predicted_Cost_Overrun_Probability"),
        ("Schedule_Delay_Flag","Predicted_Schedule_Delay_Probability")
    ]:
        if target in mon and prob in mon and mon[target].nunique()==2:
            report["metrics"][target] = {
                "roc_auc": float(roc_auc_score(mon[target], mon[prob])),
                "pr_auc": float(average_precision_score(mon[target], mon[prob])),
                "brier": float(brier_score_loss(mon[target], mon[prob])),
            }
        if prob in ref and prob in mon:
            value = psi(ref[prob].to_numpy(), mon[prob].to_numpy())
            report["drift"][prob] = value
            if value > 0.20:
                report["triggers"].append(f"Red PSI drift: {prob} = {value:.3f}")
            elif value > 0.10:
                report["triggers"].append(f"Yellow PSI drift: {prob} = {value:.3f}")
    if report["triggers"]:
        report["status"]="Review Required"
    Path(output_json).write_text(json.dumps(report,indent=2),encoding="utf-8")
    print(json.dumps(report,indent=2))

if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("reference_csv")
    parser.add_argument("monitoring_csv")
    parser.add_argument("output_json")
    args=parser.parse_args()
    main(args.reference_csv,args.monitoring_csv,args.output_json)
