from __future__ import annotations

import csv
import json
import math
import random
from collections import Counter
from datetime import date, timedelta
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = PROJECT_ROOT / "data" / "raw"
DOC_DIR = PROJECT_ROOT / "documentation"
RAW_DIR.mkdir(parents=True, exist_ok=True)
DOC_DIR.mkdir(parents=True, exist_ok=True)

SEED = 20260804
N_PROJECTS = 2400
rng = random.Random(SEED)

PROJECT_TYPES = [
    ("Residential", 0.20), ("Commercial", 0.18), ("Institutional", 0.15),
    ("Industrial", 0.12), ("Heavy Civil", 0.13), ("Mixed-Use", 0.12),
    ("Infrastructure", 0.10),
]
REGIONS = [
    ("West", 0.22), ("Mountain", 0.20), ("Southwest", 0.14),
    ("Midwest", 0.16), ("Southeast", 0.16), ("Northeast", 0.12),
]
STATES = {
    "West": ["CA", "OR", "WA", "NV"],
    "Mountain": ["UT", "CO", "ID", "MT", "WY"],
    "Southwest": ["AZ", "NM", "TX"],
    "Midwest": ["IL", "OH", "MI", "MN", "MO"],
    "Southeast": ["FL", "GA", "NC", "TN", "VA"],
    "Northeast": ["NY", "PA", "MA", "NJ", "CT"],
}
CLIENT_TYPES = [("Private", 0.56), ("Public", 0.34), ("Public-Private Partnership", 0.10)]
CONTRACT_TYPES = [
    ("Lump Sum", 0.28), ("Guaranteed Maximum Price", 0.32),
    ("Cost Plus", 0.20), ("Unit Price", 0.20),
]
DELIVERY_METHODS = [
    ("Design-Bid-Build", 0.32), ("Design-Build", 0.28),
    ("CMAR", 0.25), ("IPD", 0.15),
]
COMPLEXITY = [("Low", 0.14), ("Moderate", 0.38), ("High", 0.32), ("Very High", 0.16)]
DIGITAL = [("Low", 0.24), ("Moderate", 0.48), ("High", 0.28)]
OWNER_DECISION = [("Fast", 0.26), ("Standard", 0.50), ("Slow", 0.24)]

PROJECT_NOUNS = [
    "Canyon", "Summit", "Harbor", "Northstar", "Evergreen", "Redwood",
    "Pioneer", "Liberty", "Aspen", "Riverside", "Gateway", "Horizon",
    "Crescent", "Mesa", "Cedar", "Granite", "Lakeview", "Copper",
]
PROJECT_SUFFIX = {
    "Residential": ["Residences", "Apartments", "Housing", "Neighborhood"],
    "Commercial": ["Corporate Center", "Office Campus", "Retail Center", "Marketplace"],
    "Institutional": ["Medical Center", "Civic Complex", "Education Center", "Research Facility"],
    "Industrial": ["Manufacturing Facility", "Distribution Hub", "Process Plant", "Logistics Center"],
    "Heavy Civil": ["Bridge Program", "Highway Improvements", "Water Program", "Earthworks Package"],
    "Mixed-Use": ["Urban Village", "Transit-Oriented Development", "Town Center", "District"],
    "Infrastructure": ["Transit Program", "Utility Corridor", "Airport Improvements", "Public Works Program"],
}

def weighted_choice(options):
    pick = rng.random()
    cumulative = 0.0
    for value, weight in options:
        cumulative += weight
        if pick <= cumulative:
            return value
    return options[-1][0]

def clamp(value, low, high):
    return max(low, min(high, value))

def logistic(x):
    return 1.0 / (1.0 + math.exp(-x))

def round_money(value):
    return int(round(value / 100.0) * 100)

projects = []
workflow = []
outcomes = []

year_weights = [(2019,0.10),(2020,0.11),(2021,0.13),(2022,0.15),(2023,0.17),(2024,0.16),(2025,0.18)]

for i in range(1, N_PROJECTS + 1):
    project_id = f"PRJ3-{i:05d}"
    project_type = weighted_choice(PROJECT_TYPES)
    region = weighted_choice(REGIONS)
    state = rng.choice(STATES[region])
    client_type = weighted_choice(CLIENT_TYPES)
    contract_type = weighted_choice(CONTRACT_TYPES)
    delivery = weighted_choice(DELIVERY_METHODS)
    complexity = weighted_choice(COMPLEXITY)
    digital = weighted_choice(DIGITAL)
    owner = weighted_choice(OWNER_DECISION)
    snapshot_year = weighted_choice(year_weights)

    complexity_score = {"Low":0.0,"Moderate":0.35,"High":0.75,"Very High":1.15}[complexity]
    digital_risk = {"High":-0.35,"Moderate":0.0,"Low":0.45}[digital]
    owner_risk = {"Fast":-0.30,"Standard":0.0,"Slow":0.55}[owner]
    delivery_risk = {"Design-Build":-0.15,"IPD":-0.25,"CMAR":0.05,"Design-Bid-Build":0.25}[delivery]
    contract_cost_risk = {"Guaranteed Maximum Price":-0.10,"Lump Sum":0.05,"Cost Plus":0.18,"Unit Price":0.10}[contract_type]
    project_type_risk = {
        "Residential":0.00,"Commercial":0.10,"Institutional":0.15,
        "Industrial":0.22,"Heavy Civil":0.28,"Mixed-Use":0.30,"Infrastructure":0.25
    }[project_type]

    budget_base = {
        "Residential":45e6,"Commercial":75e6,"Institutional":110e6,
        "Industrial":150e6,"Heavy Civil":190e6,"Mixed-Use":165e6,"Infrastructure":240e6
    }[project_type]
    budget = round_money(clamp(rng.lognormvariate(math.log(budget_base), 0.55), 8e6, 950e6))
    planned_duration = int(clamp(rng.gauss(
        {"Residential":520,"Commercial":600,"Institutional":780,"Industrial":850,
         "Heavy Civil":1050,"Mixed-Use":900,"Infrastructure":1150}[project_type]
        + 120*complexity_score, 130), 240, 1800))

    start_month = rng.randint(1, 12)
    start_day = rng.randint(1, 25)
    start_year = snapshot_year - rng.choice([0,0,0,1])
    start_date = date(start_year, start_month, start_day)
    planned_pct = round(rng.uniform(0.35, 0.60), 3)
    snapshot_date = start_date + timedelta(days=int(planned_duration * planned_pct))
    if snapshot_date.year != snapshot_year:
        delta_years = snapshot_year - snapshot_date.year
        snapshot_date = date(snapshot_date.year + delta_years, snapshot_date.month, min(snapshot_date.day, 28))
        start_date = snapshot_date - timedelta(days=int(planned_duration * planned_pct))

    latent = complexity_score + digital_risk + owner_risk + delivery_risk + project_type_risk
    schedule_pressure = latent + rng.gauss(0, 0.50)
    cost_pressure = latent + contract_cost_risk + rng.gauss(0, 0.50)

    spi = clamp(1.015 - 0.065*schedule_pressure + rng.gauss(0,0.045), 0.72, 1.12)
    cpi = clamp(1.02 - 0.070*cost_pressure + rng.gauss(0,0.045), 0.70, 1.15)
    actual_pct = clamp(planned_pct * spi + rng.gauss(0,0.018), 0.20, 0.72)
    cost_variance_pct = round((1.0/cpi - 1.0) * actual_pct + rng.gauss(0,0.012), 4)
    schedule_variance_days = int(round((planned_pct - actual_pct) * planned_duration))

    labor_productivity = clamp(1.03 - 0.07*latent + rng.gauss(0,0.055), 0.72, 1.16)
    procurement_delay = int(clamp(rng.gauss(6 + 11*max(latent,0), 11), 0, 95))
    weather_base = {"West":4,"Mountain":12,"Southwest":6,"Midwest":14,"Southeast":13,"Northeast":15}[region]
    weather_days = int(clamp(rng.gauss(weather_base + 4*complexity_score, 6), 0, 55))
    safety_rate = round(clamp(rng.gauss(0.45 + 0.16*complexity_score + 0.10*max(latent,0), 0.22), 0, 2.8), 3)

    budget_10m = max(budget / 10_000_000, 0.8)
    rfi_count = int(clamp(rng.gauss(
        budget_10m * (4.0 + 1.0*complexity_score + 0.7*max(latent,0)), 8
    ), 4, 240))
    rfi_per_10m = rfi_count / budget_10m
    avg_rfi_days = clamp(rng.gauss(
        7.5 + 3.2*owner_risk + 2.0*digital_risk + 1.7*complexity_score, 2.6
    ), 2, 30)
    on_time_rate = clamp(0.78 - 0.055*avg_rfi_days - 0.04*complexity_score + rng.gauss(0,0.08), 0.08, 0.95)
    overdue_rate = clamp(0.05 + 0.030*avg_rfi_days + 0.05*owner_risk + rng.gauss(0,0.055), 0, 0.70)
    highcrit_rate = clamp(0.015 + 0.18*overdue_rate + 0.02*complexity_score + rng.gauss(0,0.018), 0, 0.22)
    rfi_revision_rate = clamp(0.05 + 0.10*complexity_score + 0.10*max(digital_risk,0) + rng.gauss(0,0.05), 0, 0.55)
    rfi_reopen_rate = clamp(0.015 + 0.22*rfi_revision_rate + rng.gauss(0,0.018), 0, 0.18)
    rfi_to_change = clamp(0.07 + 0.15*complexity_score + 0.08*max(digital_risk,0) + rng.gauss(0,0.055), 0.02, 0.55)

    approved_change_pct = clamp(
        rng.gauss(0.012 + 0.018*complexity_score + 0.015*project_type_risk + 0.012*max(latent,0), 0.018),
        0, 0.15
    )
    pending_change_pct = clamp(
        rng.gauss(0.006 + 0.010*owner_risk + 0.010*complexity_score + 0.010*max(latent,0), 0.012),
        0, 0.10
    )
    approval_cycle = clamp(rng.gauss(
        16 + 10*owner_risk + 5*complexity_score + 2.2*avg_rfi_days/10, 7
    ), 5, 75)
    old_pending_rate = clamp(0.06 + 0.009*approval_cycle + 0.08*max(owner_risk,0) + rng.gauss(0,0.06), 0, 0.75)
    forecast_lag = clamp(rng.gauss(
        3.0 + 2.8*owner_risk + 2.5*pending_change_pct*10 + 0.7*complexity_score, 2.7
    ), 0, 25)
    contingency_util = clamp(
        0.18 + 0.45*max(1-cpi,0) + 0.95*approved_change_pct + 0.55*pending_change_pct
        + 0.08*complexity_score + rng.gauss(0,0.09), 0.03, 1.25
    )
    revision_loop_rate = clamp(0.04 + 0.45*rfi_revision_rate + 0.006*approval_cycle + rng.gauss(0,0.045), 0, 0.65)
    handoff_rate = clamp(0.28 + 0.10*complexity_score + 0.12*max(owner_risk,0) + rng.gauss(0,0.07), 0.08, 0.80)
    workflow_risk_score = int(clamp(round(
        2.0*max(avg_rfi_days-8,0)/10 +
        2.0*overdue_rate +
        2.5*highcrit_rate +
        1.4*max(approval_cycle-18,0)/20 +
        2.0*pending_change_pct/0.05 +
        1.2*forecast_lag/10 +
        1.3*revision_loop_rate
    ), 0, 14))

    completeness = clamp(rng.gauss(0.975 - 0.012*max(latent,0), 0.012), 0.88, 1.0)

    final_cost = (
        -0.030
        + 0.55*max(1-cpi, 0)
        + 0.45*approved_change_pct
        + 0.40*pending_change_pct
        + 0.030*contingency_util
        + 0.040*overdue_rate
        + 0.030*old_pending_rate
        + 0.035*rfi_revision_rate
        + 0.050*max(1-labor_productivity, 0)
        + 0.00030*procurement_delay
        + 0.006*complexity_score
        + 0.006*project_type_risk
        + rng.gauss(0,0.040)
    )
    final_cost = clamp(final_cost, -0.08, 0.48)

    final_delay = (
        -42
        + 145*max(1-spi, 0)
        + 0.35*procurement_delay
        + 0.35*weather_days
        + 25*overdue_rate
        + 40*highcrit_rate
        + 0.35*approval_cycle
        + 25*old_pending_rate
        + 25*revision_loop_rate
        + 25*max(1-labor_productivity, 0)
        + 5*complexity_score
        + 4*project_type_risk
        + rng.gauss(0,20)
    )
    final_delay = int(round(clamp(final_delay, -25, 210)))

    cost_flag = int(final_cost >= 0.10)
    schedule_flag = int(final_delay >= 30)
    combined_flag = int(cost_flag or schedule_flag)
    final_cpi = clamp(1.0 / (1.0 + final_cost), 0.60, 1.15)
    final_spi = clamp(planned_duration / max(planned_duration + final_delay, 1), 0.65, 1.08)
    actual_end = start_date + timedelta(days=planned_duration + final_delay)
    final_eac = round_money(budget * (1 + final_cost))

    project_name = f"{rng.choice(PROJECT_NOUNS)} {rng.choice(PROJECT_SUFFIX[project_type])} {i}"
    projects.append({
        "Project_ID": project_id,
        "Project_Name": project_name,
        "Project_Type": project_type,
        "Region": region,
        "State": state,
        "Client_Type": client_type,
        "Contract_Type": contract_type,
        "Delivery_Method": delivery,
        "Complexity_Level": complexity,
        "Digital_Coordination_Level": digital,
        "Owner_Decision_Profile": owner,
        "Start_Date": start_date.isoformat(),
        "Snapshot_Date": snapshot_date.isoformat(),
        "Snapshot_Year": snapshot_year,
        "Original_Budget": budget,
        "Planned_Duration_Days": planned_duration,
        "Planned_Percent_Complete": round(planned_pct,4),
        "Actual_Percent_Complete": round(actual_pct,4),
        "CPI_Snapshot": round(cpi,4),
        "SPI_Snapshot": round(spi,4),
        "Cost_Variance_Pct_Snapshot": round(cost_variance_pct,4),
        "Schedule_Variance_Days_Snapshot": schedule_variance_days,
        "Labor_Productivity_Index": round(labor_productivity,4),
        "Procurement_Delay_Days_to_Date": procurement_delay,
        "Weather_Impact_Days_to_Date": weather_days,
        "Safety_Incident_Rate_to_Date": safety_rate,
        "Snapshot_Data_Completeness_Pct": round(completeness,4),
    })

    workflow.append({
        "Project_ID": project_id,
        "RFI_Count_to_Date": rfi_count,
        "RFI_Count_per_10M": round(rfi_per_10m,3),
        "Avg_RFI_Response_Days": round(avg_rfi_days,3),
        "RFI_On_Time_Rate": round(on_time_rate,4),
        "Overdue_RFI_Rate": round(overdue_rate,4),
        "High_Critical_Overdue_Rate": round(highcrit_rate,4),
        "RFI_Revision_Rate": round(rfi_revision_rate,4),
        "RFI_Reopen_Rate": round(rfi_reopen_rate,4),
        "RFI_to_Change_Rate": round(rfi_to_change,4),
        "Approved_Change_Value_Pct_Budget": round(approved_change_pct,4),
        "Pending_Change_Exposure_Pct_Budget": round(pending_change_pct,4),
        "Change_Approval_Cycle_Days": round(approval_cycle,3),
        "Old_Pending_Change_Rate": round(old_pending_rate,4),
        "Forecast_Incorporation_Lag_Days": round(forecast_lag,3),
        "Contingency_Utilization_Pct": round(contingency_util,4),
        "Revision_Loop_Rate": round(revision_loop_rate,4),
        "Workflow_Handoff_Rate": round(handoff_rate,4),
        "Workflow_Risk_Score_Snapshot": workflow_risk_score,
    })

    outcomes.append({
        "Project_ID": project_id,
        "Final_Cost_Overrun_Pct": round(final_cost,4),
        "Final_Schedule_Delay_Days": final_delay,
        "Cost_Overrun_Flag": cost_flag,
        "Schedule_Delay_Flag": schedule_flag,
        "Combined_Overrun_Flag": combined_flag,
        "Final_CPI": round(final_cpi,4),
        "Final_SPI": round(final_spi,4),
        "Final_Status": "Complete",
        "Actual_End_Date": actual_end.isoformat(),
        "Final_EAC": final_eac,
    })

# Controlled raw-data quality issues.
quality_issues = []

def add_issue(table, record_id, issue_type, field, raw_value, intended_action):
    quality_issues.append({
        "Table": table, "Record_ID": record_id, "Issue_Type": issue_type,
        "Field": field, "Raw_Value": raw_value, "Intended_Process_Action": intended_action
    })

# Category variants.
for idx in rng.sample(range(len(projects)), 36):
    row = projects[idx]
    field = rng.choice(["Delivery_Method","Complexity_Level","Digital_Coordination_Level","Owner_Decision_Profile"])
    mappings = {
        "Delivery_Method": {"Design-Bid-Build":"DBB","Design-Build":"Design Build","CMAR":"CM at Risk","IPD":"Integrated Project Delivery"},
        "Complexity_Level": {"Very High":"VERY HIGH","High":"high","Moderate":"MODERATE","Low":"low "},
        "Digital_Coordination_Level": {"High":"HIGH","Moderate":"moderate ","Low":"LOW"},
        "Owner_Decision_Profile": {"Fast":"FAST","Standard":"standard ","Slow":"SLOW"},
    }
    original = row[field]
    row[field] = mappings[field][original]
    add_issue("projects_raw", row["Project_ID"], "Categorical standardization", field, row[field], f"Map to {original}")

# Missing values.
for idx in rng.sample(range(len(projects)), 10):
    row = projects[idx]
    field = rng.choice(["CPI_Snapshot","SPI_Snapshot","Labor_Productivity_Index"])
    add_issue("projects_raw", row["Project_ID"], "Missing critical value", field, row[field], "Repair only if deterministic evidence exists; otherwise quarantine")
    row[field] = ""

for idx in rng.sample(range(len(workflow)), 10):
    row = workflow[idx]
    field = rng.choice(["Avg_RFI_Response_Days","Change_Approval_Cycle_Days","Contingency_Utilization_Pct"])
    add_issue("workflow_features_raw", row["Project_ID"], "Missing critical value", field, row[field], "Repair from related metrics when unambiguous; otherwise quarantine")
    row[field] = ""

# Invalid numeric values.
for idx in rng.sample(range(len(projects)), 6):
    row = projects[idx]
    field = rng.choice(["Original_Budget","Planned_Duration_Days","Snapshot_Data_Completeness_Pct"])
    row[field] = -abs(float(row[field]))
    add_issue("projects_raw", row["Project_ID"], "Invalid numeric value", field, row[field], "Quarantine project row")

for idx in rng.sample(range(len(workflow)), 6):
    row = workflow[idx]
    field = rng.choice(["Overdue_RFI_Rate","Pending_Change_Exposure_Pct_Budget","RFI_On_Time_Rate"])
    row[field] = 1.5 if "Rate" in field or "Pct" in field else -1
    add_issue("workflow_features_raw", row["Project_ID"], "Invalid numeric value", field, row[field], "Quarantine workflow row")

# Invalid dates.
for idx in rng.sample(range(len(projects)), 6):
    row = projects[idx]
    row["Snapshot_Date"], row["Start_Date"] = row["Start_Date"], row["Snapshot_Date"]
    add_issue("projects_raw", row["Project_ID"], "Invalid date sequence", "Snapshot_Date", row["Snapshot_Date"], "Quarantine project row")

# Invalid outcomes.
for idx in rng.sample(range(len(outcomes)), 4):
    row = outcomes[idx]
    row["Cost_Overrun_Flag"] = 9
    add_issue("outcomes_raw", row["Project_ID"], "Invalid target value", "Cost_Overrun_Flag", 9, "Recalculate from final cost overrun percentage")

# Exact duplicates.
for table_name, rows, count in [
    ("projects_raw", projects, 12), ("workflow_features_raw", workflow, 12), ("outcomes_raw", outcomes, 12)
]:
    for idx in rng.sample(range(len(rows)), count):
        rows.append(dict(rows[idx]))
        add_issue(table_name, rows[idx]["Project_ID"], "Exact duplicate", "Entire row", "Duplicate", "Remove exact duplicate")

# Orphan rows.
for n in range(1, 6):
    orphan_id = f"ORPHAN-WF-{n:02d}"
    orphan = dict(workflow[n-1])
    orphan["Project_ID"] = orphan_id
    workflow.append(orphan)
    add_issue("workflow_features_raw", orphan_id, "Invalid foreign key", "Project_ID", orphan_id, "Quarantine orphan")

for n in range(1, 5):
    orphan_id = f"ORPHAN-OUT-{n:02d}"
    orphan = dict(outcomes[n-1])
    orphan["Project_ID"] = orphan_id
    outcomes.append(orphan)
    add_issue("outcomes_raw", orphan_id, "Invalid foreign key", "Project_ID", orphan_id, "Quarantine orphan")

def write_csv(path, rows):
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

write_csv(RAW_DIR / "projects_raw.csv", projects)
write_csv(RAW_DIR / "workflow_features_raw.csv", workflow)
write_csv(RAW_DIR / "outcomes_raw.csv", outcomes)
write_csv(DOC_DIR / "known_raw_data_quality_issues.csv", quality_issues)

feature_lineage = [
    ["CPI_Snapshot","Project 1","Cost performance index at snapshot","Early cost-efficiency signal"],
    ["SPI_Snapshot","Project 1","Schedule performance index at snapshot","Early schedule-efficiency signal"],
    ["Cost_Variance_Pct_Snapshot","Project 1","Snapshot cost variance percentage","Current cost deviation"],
    ["Schedule_Variance_Days_Snapshot","Project 1","Snapshot schedule variance in days","Current schedule deviation"],
    ["Contingency_Utilization_Pct","Project 1","Contingency used divided by original contingency","Cost-risk absorption"],
    ["Avg_RFI_Response_Days","Project 2","Average final response days for RFIs to date","Decision-cycle condition"],
    ["Overdue_RFI_Rate","Project 2","Overdue open RFIs divided by RFIs to date","Backlog condition"],
    ["High_Critical_Overdue_Rate","Project 2","High/Critical overdue RFIs divided by RFIs to date","Critical decision exposure"],
    ["RFI_Revision_Rate","Project 2","RFIs with revisions divided by RFIs to date","Workflow quality"],
    ["RFI_to_Change_Rate","Project 2","RFIs linked to change divided by RFIs to date","Commercial conversion"],
    ["Approved_Change_Value_Pct_Budget","Projects 1 and 2","Approved change value divided by original budget","Approved commercial growth"],
    ["Pending_Change_Exposure_Pct_Budget","Project 2","Pending submitted value divided by original budget","Unresolved exposure"],
    ["Change_Approval_Cycle_Days","Project 2","Average approved change cycle at snapshot","Decision speed"],
    ["Old_Pending_Change_Rate","Project 2","Pending changes older than threshold divided by pending changes","Aging condition"],
    ["Forecast_Incorporation_Lag_Days","Project 2","Average days from approval to forecast incorporation","Forecast-control discipline"],
    ["Revision_Loop_Rate","Project 2","Workflow returns divided by relevant workflow events","Rework and quality"],
    ["Workflow_Handoff_Rate","Project 2","Role handoffs divided by workflow events","Coordination complexity"],
    ["Workflow_Risk_Score_Snapshot","Project 2","Transparent snapshot workflow-risk score","Composite operational signal"],
]
with (DOC_DIR / "feature_lineage.csv").open("w", newline="", encoding="utf-8-sig") as handle:
    writer = csv.writer(handle)
    writer.writerow(["Feature","Source Project","Definition","Modeling Role"])
    writer.writerows(feature_lineage)

profile = {
    "seed": SEED,
    "intended_projects": N_PROJECTS,
    "raw_counts": {
        "projects_raw": len(projects),
        "workflow_features_raw": len(workflow),
        "outcomes_raw": len(outcomes),
    },
    "quality_issue_count": len(quality_issues),
    "quality_issue_types": dict(Counter(row["Issue_Type"] for row in quality_issues)),
    "target_prevalence_before_quality_injection": {
        "cost_overrun_flag_pct": round(100*sum(r["Cost_Overrun_Flag"] == 1 for r in outcomes[:N_PROJECTS])/N_PROJECTS, 2),
        "schedule_delay_flag_pct": round(100*sum(r["Schedule_Delay_Flag"] == 1 for r in outcomes[:N_PROJECTS])/N_PROJECTS, 2),
        "combined_overrun_flag_pct": round(100*sum(r["Combined_Overrun_Flag"] == 1 for r in outcomes[:N_PROJECTS])/N_PROJECTS, 2),
    }
}
(DOC_DIR / "raw_dataset_profile.json").write_text(json.dumps(profile, indent=2), encoding="utf-8")
print(json.dumps(profile, indent=2))
