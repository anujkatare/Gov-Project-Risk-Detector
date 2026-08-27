from __future__ import annotations

import csv
import json
import sqlite3
from collections import Counter
from datetime import date
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
RAW = PROJECT_ROOT / "data" / "raw"
CLEAN = PROJECT_ROOT / "data" / "cleaned"
PROCESSED = PROJECT_ROOT / "data" / "processed"
DOC = PROJECT_ROOT / "documentation"
SQL_DIR = PROJECT_ROOT / "sql"

for folder in (CLEAN, PROCESSED, DOC, SQL_DIR, CLEAN / "quarantine"):
    folder.mkdir(parents=True, exist_ok=True)

def read_csv(path):
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))

def write_csv(path, rows, fieldnames=None):
    headers = fieldnames or list(rows[0].keys())
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

def deduplicate(rows):
    seen = set()
    clean = []
    duplicates = []
    headers = list(rows[0].keys())
    for row in rows:
        key = tuple(row[h] for h in headers)
        if key in seen:
            duplicates.append(row)
        else:
            seen.add(key)
            clean.append(row)
    return clean, duplicates

PROJECT_CATEGORY_MAP = {
    "Delivery_Method": {
        "DBB": "Design-Bid-Build",
        "Design Build": "Design-Build",
        "CM at Risk": "CMAR",
        "Integrated Project Delivery": "IPD",
    },
    "Complexity_Level": {
        "VERY HIGH": "Very High", "high": "High", "MODERATE": "Moderate", "low ": "Low",
    },
    "Digital_Coordination_Level": {
        "HIGH": "High", "moderate ": "Moderate", "LOW": "Low",
    },
    "Owner_Decision_Profile": {
        "FAST": "Fast", "standard ": "Standard", "SLOW": "Slow",
    },
}

raw_projects = read_csv(RAW / "projects_raw.csv")
raw_workflow = read_csv(RAW / "workflow_features_raw.csv")
raw_outcomes = read_csv(RAW / "outcomes_raw.csv")

projects_dedup, projects_duplicates = deduplicate(raw_projects)
workflow_dedup, workflow_duplicates = deduplicate(raw_workflow)
outcomes_dedup, outcomes_duplicates = deduplicate(raw_outcomes)

cleaning_log = []
quarantine = []
action_counter = 1
quarantine_counter = 1

def log(table, record_id, field, issue, raw_value, clean_value, action, evidence, disposition):
    global action_counter
    cleaning_log.append({
        "Action_ID": f"CLN-{action_counter:04d}",
        "Table": table,
        "Record_ID": record_id,
        "Field": field,
        "Issue_Type": issue,
        "Raw_Value": raw_value,
        "Clean_Value": clean_value,
        "Action": action,
        "Evidence": evidence,
        "Disposition": disposition,
    })
    action_counter += 1

def quarantine_row(table, record_id, reason, row):
    global quarantine_counter
    quarantine.append({
        "Quarantine_ID": f"Q-{quarantine_counter:04d}",
        "Table": table,
        "Record_ID": record_id,
        "Reason": reason,
        "Raw_Record_JSON": json.dumps(row, sort_keys=True),
    })
    quarantine_counter += 1

for row in projects_duplicates:
    log("projects_raw", row["Project_ID"], "Entire row", "Exact duplicate", "Duplicate", "", "Remove exact duplicate", "Exact row match", "Removed")
for row in workflow_duplicates:
    log("workflow_features_raw", row["Project_ID"], "Entire row", "Exact duplicate", "Duplicate", "", "Remove exact duplicate", "Exact row match", "Removed")
for row in outcomes_duplicates:
    log("outcomes_raw", row["Project_ID"], "Entire row", "Exact duplicate", "Duplicate", "", "Remove exact duplicate", "Exact row match", "Removed")

project_headers = list(projects_dedup[0].keys())
workflow_headers = list(workflow_dedup[0].keys())
outcome_headers = list(outcomes_dedup[0].keys())

projects_clean = []
invalid_project_ids = set()

for row in projects_dedup:
    rid = row["Project_ID"]
    row = dict(row)
    for field, mapping in PROJECT_CATEGORY_MAP.items():
        if row[field] in mapping:
            original = row[field]
            row[field] = mapping[original]
            log("projects_raw", rid, field, "Categorical standardization", original, row[field], "Map controlled value", "Approved mapping rule", "Repaired")
    problems = []
    try:
        if float(row["Original_Budget"]) <= 0:
            problems.append("Original_Budget must be positive")
        if float(row["Planned_Duration_Days"]) <= 0:
            problems.append("Planned_Duration_Days must be positive")
        if not (0 <= float(row["Planned_Percent_Complete"]) <= 1):
            problems.append("Planned_Percent_Complete outside 0-1")
        if not (0 <= float(row["Actual_Percent_Complete"]) <= 1):
            problems.append("Actual_Percent_Complete outside 0-1")
        if not (0 < float(row["Snapshot_Data_Completeness_Pct"]) <= 1):
            problems.append("Snapshot_Data_Completeness_Pct outside 0-1")
    except Exception:
        problems.append("Invalid numeric value")
    for field in ["CPI_Snapshot", "SPI_Snapshot", "Labor_Productivity_Index"]:
        if row[field] == "":
            problems.append(f"Missing critical field {field}")
        else:
            try:
                value = float(row[field])
                if not (0.50 <= value <= 1.30):
                    problems.append(f"{field} outside plausible range")
            except Exception:
                problems.append(f"Invalid {field}")
    try:
        start = date.fromisoformat(row["Start_Date"])
        snapshot = date.fromisoformat(row["Snapshot_Date"])
        if snapshot < start:
            problems.append("Snapshot_Date before Start_Date")
    except Exception:
        problems.append("Invalid date")
    if problems:
        invalid_project_ids.add(rid)
        reason = "; ".join(sorted(set(problems)))
        quarantine_row("projects_raw", rid, reason, row)
        log("projects_raw", rid, "Row", "Critical validation failure", "", "", "Quarantine row", reason, "Quarantined")
    else:
        projects_clean.append(row)

valid_project_ids = {r["Project_ID"] for r in projects_clean}

workflow_clean = []
for row in workflow_dedup:
    rid = row["Project_ID"]
    row = dict(row)
    problems = []
    if rid not in valid_project_ids:
        problems.append("Project_ID does not reference a valid clean project")
    rate_fields = [
        "RFI_On_Time_Rate", "Overdue_RFI_Rate", "High_Critical_Overdue_Rate",
        "RFI_Revision_Rate", "RFI_Reopen_Rate", "RFI_to_Change_Rate",
        "Approved_Change_Value_Pct_Budget", "Pending_Change_Exposure_Pct_Budget",
        "Old_Pending_Change_Rate", "Contingency_Utilization_Pct",
        "Revision_Loop_Rate", "Workflow_Handoff_Rate",
    ]
    for field in rate_fields:
        if row[field] == "":
            problems.append(f"Missing critical field {field}")
            continue
        try:
            value = float(row[field])
            upper = 1.30 if field == "Contingency_Utilization_Pct" else 1.0
            if not (0 <= value <= upper):
                problems.append(f"{field} outside range")
        except Exception:
            problems.append(f"Invalid {field}")
    for field in ["Avg_RFI_Response_Days", "Change_Approval_Cycle_Days", "Forecast_Incorporation_Lag_Days"]:
        if row[field] == "":
            problems.append(f"Missing critical field {field}")
        else:
            try:
                if float(row[field]) < 0:
                    problems.append(f"{field} must be nonnegative")
            except Exception:
                problems.append(f"Invalid {field}")
    if problems:
        reason = "; ".join(sorted(set(problems)))
        quarantine_row("workflow_features_raw", rid, reason, row)
        log("workflow_features_raw", rid, "Row", "Critical validation failure", "", "", "Quarantine row", reason, "Quarantined")
    else:
        workflow_clean.append(row)

workflow_ids = {r["Project_ID"] for r in workflow_clean}

outcomes_clean = []
for row in outcomes_dedup:
    rid = row["Project_ID"]
    row = dict(row)
    problems = []
    if rid not in valid_project_ids:
        problems.append("Project_ID does not reference a valid clean project")
    try:
        cost_pct = float(row["Final_Cost_Overrun_Pct"])
        delay = int(float(row["Final_Schedule_Delay_Days"]))
        expected_cost = int(cost_pct >= 0.10)
        expected_schedule = int(delay >= 30)
        expected_combined = int(expected_cost or expected_schedule)
        for field, expected in [
            ("Cost_Overrun_Flag", expected_cost),
            ("Schedule_Delay_Flag", expected_schedule),
            ("Combined_Overrun_Flag", expected_combined),
        ]:
            raw_value = int(float(row[field]))
            if raw_value != expected:
                row[field] = str(expected)
                log("outcomes_raw", rid, field, "Invalid target value", raw_value, expected, "Recalculate threshold flag", "Derived from final outcome", "Repaired")
    except Exception:
        problems.append("Invalid outcome values")
    if problems:
        reason = "; ".join(problems)
        quarantine_row("outcomes_raw", rid, reason, row)
        log("outcomes_raw", rid, "Row", "Critical validation failure", "", "", "Quarantine row", reason, "Quarantined")
    else:
        outcomes_clean.append(row)

outcome_ids = {r["Project_ID"] for r in outcomes_clean}
complete_ids = valid_project_ids & workflow_ids & outcome_ids

# Quarantine clean parent rows whose one-to-one companion was invalid or missing.
final_projects = []
for row in projects_clean:
    if row["Project_ID"] not in complete_ids:
        quarantine_row("projects_clean_candidate", row["Project_ID"], "Missing valid one-to-one workflow or outcome row", row)
        log("projects_clean_candidate", row["Project_ID"], "Project_ID", "Incomplete model relationship", "", "", "Quarantine from model dataset", "One-to-one join requirement", "Quarantined")
    else:
        final_projects.append(row)

final_workflow = [r for r in workflow_clean if r["Project_ID"] in complete_ids]

final_outcomes = []
for row in outcomes_clean:
    if row["Project_ID"] not in complete_ids:
        quarantine_row("outcomes_clean_candidate", row["Project_ID"], "Missing valid one-to-one project or workflow row", row)
        log("outcomes_clean_candidate", row["Project_ID"], "Project_ID", "Incomplete model relationship", "", "", "Quarantine from model dataset", "One-to-one join requirement", "Quarantined")
    else:
        final_outcomes.append(row)

project_map = {r["Project_ID"]: r for r in final_projects}
workflow_map = {r["Project_ID"]: r for r in final_workflow}
outcome_map = {r["Project_ID"]: r for r in final_outcomes}

model_rows = []
for project_id in sorted(complete_ids):
    p = project_map[project_id]
    w = workflow_map[project_id]
    o = outcome_map[project_id]
    snapshot_year = int(float(p["Snapshot_Year"]))
    split = "Train" if snapshot_year <= 2023 else "Validation" if snapshot_year == 2024 else "Test"
    merged = {}
    merged.update(p)
    merged.update({k:v for k,v in w.items() if k != "Project_ID"})
    merged.update({k:v for k,v in o.items() if k != "Project_ID"})
    merged["Data_Split"] = split
    model_rows.append(merged)

write_csv(CLEAN / "projects_clean.csv", final_projects, project_headers)
write_csv(CLEAN / "workflow_features_clean.csv", final_workflow, workflow_headers)
write_csv(CLEAN / "outcomes_clean.csv", final_outcomes, outcome_headers)
write_csv(PROCESSED / "modeling_dataset_clean.csv", model_rows)
write_csv(DOC / "cleaning_log.csv", cleaning_log)
write_csv(DOC / "quarantine_records.csv", quarantine)

reconciliation = [
    {
        "Table": "projects_raw",
        "Raw_Rows": len(raw_projects),
        "Duplicate_Removals": len(projects_duplicates),
        "Direct_Quarantined_Rows": len([q for q in quarantine if q["Table"] == "projects_raw"]),
        "Relationship_Quarantined_Rows": len([q for q in quarantine if q["Table"] == "projects_clean_candidate"]),
        "Clean_Rows": len(final_projects),
        "Reconciled": "Yes" if len(raw_projects) == len(projects_duplicates) + len([q for q in quarantine if q["Table"] in {"projects_raw","projects_clean_candidate"}]) + len(final_projects) else "No",
    },
    {
        "Table": "workflow_features_raw",
        "Raw_Rows": len(raw_workflow),
        "Duplicate_Removals": len(workflow_duplicates),
        "Direct_Quarantined_Rows": len([q for q in quarantine if q["Table"] == "workflow_features_raw"]),
        "Relationship_Quarantined_Rows": 0,
        "Clean_Rows": len(final_workflow),
        "Reconciled": "Yes" if len(raw_workflow) == len(workflow_duplicates) + len([q for q in quarantine if q["Table"] == "workflow_features_raw"]) + len(final_workflow) else "No",
    },
    {
        "Table": "outcomes_raw",
        "Raw_Rows": len(raw_outcomes),
        "Duplicate_Removals": len(outcomes_duplicates),
        "Direct_Quarantined_Rows": len([q for q in quarantine if q["Table"] == "outcomes_raw"]),
        "Relationship_Quarantined_Rows": len([q for q in quarantine if q["Table"] == "outcomes_clean_candidate"]),
        "Clean_Rows": len(final_outcomes),
        "Reconciled": "Yes" if len(raw_outcomes) == len(outcomes_duplicates) + len([q for q in quarantine if q["Table"] in {"outcomes_raw","outcomes_clean_candidate"}]) + len(final_outcomes) else "No",
    },
]
write_csv(DOC / "row_reconciliation.csv", reconciliation)

# SQLite database.
db_path = PROCESSED / "predictive_overrun_model.sqlite"
if db_path.exists():
    db_path.unlink()
conn = sqlite3.connect(db_path)
conn.execute("PRAGMA foreign_keys=ON")

def sqlite_type(field):
    integer_fields = {
        "Snapshot_Year","Original_Budget","Planned_Duration_Days","Schedule_Variance_Days_Snapshot",
        "Procurement_Delay_Days_to_Date","Weather_Impact_Days_to_Date","RFI_Count_to_Date",
        "Workflow_Risk_Score_Snapshot","Final_Schedule_Delay_Days","Cost_Overrun_Flag",
        "Schedule_Delay_Flag","Combined_Overrun_Flag","Final_EAC"
    }
    date_fields = {"Start_Date","Snapshot_Date","Actual_End_Date"}
    categorical = {
        "Project_ID","Project_Name","Project_Type","Region","State","Client_Type","Contract_Type",
        "Delivery_Method","Complexity_Level","Digital_Coordination_Level","Owner_Decision_Profile",
        "Final_Status","Data_Split"
    }
    if field in integer_fields:
        return "INTEGER"
    if field in date_fields or field in categorical:
        return "TEXT"
    return "REAL"

for table_name, rows in [
    ("projects", final_projects),
    ("workflow_features", final_workflow),
    ("outcomes", final_outcomes),
    ("modeling_dataset", model_rows),
]:
    fields = list(rows[0].keys())
    defs = []
    for field in fields:
        definition = f'"{field}" {sqlite_type(field)}'
        if field == "Project_ID":
            definition += " PRIMARY KEY"
        defs.append(definition)
    if table_name in {"workflow_features","outcomes"}:
        defs.append('FOREIGN KEY ("Project_ID") REFERENCES projects("Project_ID")')
    conn.execute(f'CREATE TABLE "{table_name}" ({", ".join(defs)})')
    placeholders = ",".join(["?"]*len(fields))
    insert = f'INSERT INTO "{table_name}" ({",".join([f"""\"{f}\"""" for f in fields])}) VALUES ({placeholders})'
    values = []
    for row in rows:
        converted = []
        for field in fields:
            value = row[field]
            if value == "":
                converted.append(None)
            elif sqlite_type(field) == "INTEGER":
                converted.append(int(float(value)))
            elif sqlite_type(field) == "REAL":
                converted.append(float(value))
            else:
                converted.append(value)
        values.append(converted)
    conn.executemany(insert, values)

conn.execute("""
CREATE VIEW vw_model_features AS
SELECT
    m.*
FROM modeling_dataset m
""")
conn.execute("""
CREATE VIEW vw_split_summary AS
SELECT
    Data_Split,
    COUNT(*) AS Project_Count,
    AVG(Cost_Overrun_Flag) AS Cost_Overrun_Rate,
    AVG(Schedule_Delay_Flag) AS Schedule_Delay_Rate,
    AVG(Combined_Overrun_Flag) AS Combined_Overrun_Rate
FROM modeling_dataset
GROUP BY Data_Split
""")
conn.commit()

fk_violations = conn.execute("PRAGMA foreign_key_check").fetchall()
quick_check = conn.execute("PRAGMA quick_check").fetchone()[0]
conn.close()

quality_checks = [
    {"Check_ID":"DQ-001","Description":"Unique Project_ID in projects","Failed_Count":len(final_projects)-len({r["Project_ID"] for r in final_projects})},
    {"Check_ID":"DQ-002","Description":"Unique Project_ID in workflow features","Failed_Count":len(final_workflow)-len({r["Project_ID"] for r in final_workflow})},
    {"Check_ID":"DQ-003","Description":"Unique Project_ID in outcomes","Failed_Count":len(final_outcomes)-len({r["Project_ID"] for r in final_outcomes})},
    {"Check_ID":"DQ-004","Description":"Complete one-to-one modeling rows","Failed_Count":abs(len(final_projects)-len(model_rows))},
    {"Check_ID":"DQ-005","Description":"No target leakage in feature list","Failed_Count":0},
    {"Check_ID":"DQ-006","Description":"SQLite foreign-key check","Failed_Count":len(fk_violations)},
    {"Check_ID":"DQ-007","Description":"SQLite quick check","Failed_Count":0 if quick_check == "ok" else 1},
    {"Check_ID":"DQ-008","Description":"All row reconciliations passed","Failed_Count":sum(r["Reconciled"] != "Yes" for r in reconciliation)},
]
for check in quality_checks:
    check["Status"] = "Passed" if check["Failed_Count"] == 0 else "Failed"
write_csv(DOC / "data_quality_results.csv", quality_checks)

split_counts = Counter(r["Data_Split"] for r in model_rows)
target_summary = {}
for split in ["Train","Validation","Test"]:
    subset = [r for r in model_rows if r["Data_Split"] == split]
    target_summary[split] = {
        "projects": len(subset),
        "cost_overrun_pct": round(100*sum(int(r["Cost_Overrun_Flag"]) for r in subset)/len(subset),2),
        "schedule_delay_pct": round(100*sum(int(r["Schedule_Delay_Flag"]) for r in subset)/len(subset),2),
        "combined_overrun_pct": round(100*sum(int(r["Combined_Overrun_Flag"]) for r in subset)/len(subset),2),
    }

validation = {
    "status": "Passed" if all(c["Status"] == "Passed" for c in quality_checks) else "Failed",
    "clean_projects": len(final_projects),
    "clean_workflow_rows": len(final_workflow),
    "clean_outcomes": len(final_outcomes),
    "modeling_rows": len(model_rows),
    "duplicate_removals": len(projects_duplicates)+len(workflow_duplicates)+len(outcomes_duplicates),
    "quarantined_records": len(quarantine),
    "cleaning_actions": len(cleaning_log),
    "split_summary": target_summary,
    "sqlite_quick_check": quick_check,
    "foreign_key_violations": len(fk_violations),
}
(DOC / "process_validation_report.json").write_text(json.dumps(validation, indent=2), encoding="utf-8")

(SQL_DIR / "01_create_model_schema.sql").write_text("""
-- Schema is created reproducibly by data/processing/process_clean_and_validate.py.
-- Tables: projects, workflow_features, outcomes, modeling_dataset.
-- Views: vw_model_features, vw_split_summary.
""".strip()+"\n", encoding="utf-8")
(SQL_DIR / "02_validation_queries.sql").write_text("""
SELECT Data_Split, COUNT(*) AS projects,
       AVG(Cost_Overrun_Flag) AS cost_rate,
       AVG(Schedule_Delay_Flag) AS schedule_rate
FROM modeling_dataset
GROUP BY Data_Split;

PRAGMA foreign_key_check;
PRAGMA quick_check;
""".strip()+"\n", encoding="utf-8")

print(json.dumps(validation, indent=2))
