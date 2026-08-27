# 🏗️ Predictive Construction Project Overrun Model

> **An ML-driven Early Warning System** aligned with MoSPI PAIMANA portal standards that predicts **cost overruns** and **schedule delays** in Central Sector Infrastructure Projects — enabling proactive risk management across Railways, Highways, Power, Petroleum, and Metro sectors.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.5+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-Dashboard-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)](https://streamlit.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production--Ready-blue?style=for-the-badge)]()

---

## 📌 Problem Statement

India's Central Sector Infrastructure Projects regularly face **cost overruns exceeding 10%** and **schedule delays beyond 30 days**, costing the exchequer billions annually. Traditional monitoring is reactive — problems are identified only after they escalate.

This project builds a **machine learning-powered Early Warning System** that:
- 🔍 Flags at-risk projects **before** overruns materialise
- 📊 Quantifies likely overrun magnitude for budget planning
- 🎯 Identifies the **top 3 risk drivers** per project for targeted intervention
- 🏛️ Uses indicators directly mappable to **MoSPI PAIMANA** reporting standards

---

## ✨ Key Features

### 🤖 Dual ML Engine — Classification + Regression
- **Cost Overrun Classifier** (Random Forest, ROC-AUC: **0.899**): Predicts probability of ≥10% final cost overrun
- **Schedule Delay Classifier** (Logistic Regression, ROC-AUC: **0.756**): Predicts probability of ≥30-day delay
- **Cost Regression** (MAE: ~3.25 pp): Forecasts exact overrun percentage
- **Schedule Regression** (MAE: ~15–16 days): Forecasts exact delay in days

### 🏛️ Real MoSPI PAIMANA Alignment
- Tested on Central Sector Infrastructure Projects mirroring the **MoSPI Flash Report** format
- Covers sectors: Railways, National Highways, Power, Petroleum Pipelines, Metro Rail
- Feature engineering based on **Earned Value Management (CPI/SPI)**, RFI backlogs, change-order workflows, and contingency consumption

### 🚦 Automated 3-Tier Risk Banding
| Band | Colour | Trigger | Action |
|------|--------|---------|--------|
| High Risk | 🔴 Red | Overall probability ≥ threshold | Immediate escalation & recovery plan |
| Medium Risk | 🟡 Yellow | Moderate combined probability | Enhanced monitoring & review |
| Low Risk | 🟢 Green | Below alert thresholds | Routine tracking |

### 🧠 Explainable AI (XAI) — Top Risk Drivers
Rule-based trigger system surfaces the **top 3 project-specific risk drivers** per prediction:
- Low CPI / SPI (Earned Value underperformance)
- Overdue RFI Backlog Rate
- Slow Change-Approval Cycle
- High Contingency Utilisation
- Pending Change Exposure (% of Budget)
- Elevated Workflow Risk Score

### 📊 Live Interactive Streamlit Dashboard
- Colour-coded risk table with project-level drill-down
- Bar charts for cost overrun probability and predicted delay days
- KPI summary tiles (Total Projects, High/Medium Risk Count, Green Projects)

### 🗃️ Full Data & Governance Pipeline
- SQLite analytical database (`predictive_overrun_model.sqlite`)
- Data dictionary, feature lineage workbook, cleaning logs, and quarantine records
- Model card, governance plan, and monitoring scripts included

---

## 🛠️ Tech Stack

| Category | Tool / Library | Version |
|---|---|---|
| **Language** | Python | ≥ 3.11 |
| **Data Manipulation** | Pandas | ≥ 2.2 |
| **Numerical Computing** | NumPy | ≥ 2.0 |
| **ML Framework** | Scikit-learn | ≥ 1.5 |
| **Model Serialisation** | Joblib | ≥ 1.4 |
| **Frontend / Dashboard** | Streamlit | Latest |
| **Visualisation** | Matplotlib | Latest |
| **Database** | SQLite3 | Built-in |
| **Automation** | PowerShell | 5.1+ |
| **Reporting** | Excel (openpyxl), CSV | — |

---

## 📁 Repository Structure

```
Gov-Project-Risk-Detector/
│
├── analysis/                        # ML training & evaluation
│   ├── run_modeling.py              # Full modeling pipeline (train, validate, test, save)
│   ├── models/                      # Saved model pipelines & manifest JSON
│   ├── scoring/                     # Sample input CSVs for scoring
│   ├── tables/                      # Output metrics tables
│   ├── visualization/               # Performance charts & dashboards
│   └── excel/                       # Excel report outputs
│
├── automation/                      # Batch inference & monitoring
│   ├── score_new_projects.py        # CLI scoring script for new PAIMANA data
│   ├── monitor_model.py             # Model drift & performance monitoring
│   ├── run_scoring_pipeline.ps1     # PowerShell automation for scoring
│   └── output/                      # Scored project CSV outputs
│
├── data/                            # All data assets
│   ├── generation/                  # Synthetic data generation scripts
│   ├── processing/                  # Cleaning & validation scripts
│   ├── raw/                         # Raw synthetic datasets
│   ├── cleaned/                     # Post-cleaning datasets
│   └── processed/
│       ├── modeling_dataset_clean.csv        # Final ML-ready dataset (2,362 projects)
│       └── predictive_overrun_model.sqlite   # SQLite analytical database
│
├── documentation/                   # Full project methodology (APPASA phases)
│   ├── model_card.md                # Model Card (purpose, metrics, limitations)
│   ├── 01_ask_phase.md → 22_act_phase_gate.md  # 22-phase documentation
│   ├── feature_lineage.csv          # Feature-level lineage tracking
│   ├── cleaning_log.csv             # Row-level cleaning decisions
│   ├── predictive_overrun_data_dictionary.xlsx
│   └── final_validation_report.json
│
├── assets/                          # Dashboard screenshots & visual outputs
│   ├── project_risk_dashboard.png
│   ├── model_performance_dashboard.png
│   ├── feature_driver_dashboard.png
│   └── executive_model_dashboard.png
│
├── dashboards/                      # Static HTML / Power BI dashboard exports
├── reports/                         # Final case-study report outputs
├── sql/                             # SQL query scripts for analytical database
├── portfolio/                       # Portfolio presentation materials
│
├── app.py                           # 🚀 Streamlit Dashboard (main entry point)
├── run_project_pipeline.ps1         # ⚡ Master end-to-end automation script
├── requirements.txt                 # Python dependencies
├── CITATION.cff                     # Academic citation file
├── DATA_LICENSE.md                  # Data usage terms
└── LICENSE                          # MIT License
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Python ≥ 3.11
- PowerShell 5.1+ (Windows) or `pwsh` (cross-platform)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/anujkatare/Gov-Project-Risk-Detector.git
cd Gov-Project-Risk-Detector
```

### 2. Create a Virtual Environment (Recommended)
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
# Also install Streamlit and Matplotlib for the dashboard
pip install streamlit matplotlib openpyxl
```

---

## 🚀 How to Run

### Option A — Full End-to-End Pipeline (Recommended for first run)
Runs synthetic data generation → cleaning → ML training → batch scoring in one command:
```powershell
.\run_project_pipeline.ps1
```

### Option B — Run Individual Steps

**Step 1: Generate Synthetic Training Data**
```bash
python data/generation/generate_synthetic_overrun_data.py
```

**Step 2: Clean & Validate Data**
```bash
python data/processing/process_clean_and_validate.py
```

**Step 3: Train & Evaluate Models**
```bash
python analysis/run_modeling.py
```

**Step 4: Score New / Real PAIMANA Projects**
```bash
python automation/score_new_projects.py \
  analysis/scoring/sample_new_projects.csv \
  automation/output/scored_output.csv
```

**Step 5: Launch the Interactive Dashboard**
```bash
python -m streamlit run app.py
```
Then open `http://localhost:8501` in your browser.

---

## 📊 Sample Predictions — MoSPI-Style Projects

The table below shows indicative outputs from the scoring engine on representative Central Sector Infrastructure projects:

| Project Name | Sector | Risk Band | Cost Overrun Prob | Predicted Delay | Primary Risk Drivers |
|---|---|---|---|---|---|
| Mumbai–Ahmedabad HSR | Railways | 🟢 Green | 21.5% | -8 days | Low CPI |
| Zoji-la Tunnel | Highways | 🟡 Yellow | 38.2% | +22 days | Low SPI; Slow change approval |
| Dibang Multipurpose Dam | Power | 🟡 Yellow | 44.9% | -5 days | Low CPI; Overdue RFI backlog |
| Subansiri Lower HEP | Power | 🔴 Red | 67.3% | +41 days | Low CPI; Low SPI; High contingency use |
| Delhi–Meerut RRTS | Metro | 🟢 Green | 18.1% | -12 days | No dominant trigger |

> **Note:** These are illustrative outputs based on synthetic model inputs aligned to known project profiles. They are not official MoSPI data or forecasts.

---

## 📈 Model Performance & Validation

### Dataset
| Split | Period | Projects |
|---|---|---|
| Training | 2019–2023 | 1,577 |
| Validation | 2024 | 349 |
| Test (hold-out) | 2025 | 436 |
| **Total** | | **2,362** |

> Models were selected on **validation PR-AUC** and thresholds on **validation F1**. Test metrics were locked until after model selection.

### 🎯 Cost Overrun Model — Random Forest Classifier

| Metric | Test Result |
|---|---:|
| **ROC-AUC** | **0.899** |
| **PR-AUC** | **0.774** |
| Precision | 0.625 |
| Recall | 0.811 |
| F1 Score | 0.706 |
| Specificity | 0.834 |
| Brier Score | 0.123 |
| Decision Threshold | 0.435 |

### ⏱️ Schedule Delay Model — Logistic Regression

| Metric | Test Result |
|---|---:|
| **ROC-AUC** | **0.756** |
| **PR-AUC** | **0.524** |
| Precision | 0.520 |
| Recall | 0.453 |
| F1 Score | 0.484 |
| Specificity | 0.897 |
| Brier Score | 0.183 |
| Decision Threshold | 0.695 |

### 📐 Regression Performance

| Target | Algorithm | MAE |
|---|---|---|
| Final Cost Overrun (%) | Random Forest Regressor | ~3.25 percentage points |
| Final Schedule Delay (days) | Random Forest Regressor | ~15–16 days |

> ℹ️ **Interpretation Note:** Cost classification generalises strongly in the time-split. Schedule classification shows meaningful temporal degradation and requires monitoring, recalibration, and potentially retraining before any real-world deployment.

---


## 🏛️ Methodology & Documentation

This project follows a structured **APPASA** (Ask → Prepare → Process → Analyse → Share → Act) data analytics lifecycle. All 22 phase documents are in the [`documentation/`](documentation/) folder:

| Phase | Key Documents |
|---|---|
| **Ask** | Problem framing, stakeholder needs, project charter |
| **Prepare** | Dataset design, feature lineage, data dictionary |
| **Process** | Cleaning methodology, quality rules, quarantine log |
| **Analyse** | Modeling methodology, champion selection, XAI |
| **Share** | Dashboard design, portfolio storytelling |
| **Act** | Model governance, monitoring plan, model card |

Full model card: [`documentation/model_card.md`](documentation/model_card.md)

---

## ⚠️ Important Limitations

- **All training data is synthetic** — generated to reflect real-world construction project distributions but not sourced from actual projects.
- Model performance figures are **not industry benchmarks**.
- **Not for autonomous decisions**: This system must not be used for contractual entitlements, project approvals/rejections, safety-critical decisions, or personnel evaluation.
- Any production deployment on real projects **requires independent validation**, drift monitoring, and recalibration.
- Risk driver explanations are **rule-based supplements**, not causal inference.

---

## 📄 License & Citation

### License
This project is released under the **MIT License**. See [`LICENSE`](LICENSE) for full terms.

Data usage terms are governed by [`DATA_LICENSE.md`](DATA_LICENSE.md).

### Data Source Alignment
Feature engineering and sector classification are aligned with:
> **MoSPI PAIMANA Portal** — Ministry of Statistics and Programme Implementation, Government of India
> Flash Reports on Central Sector Projects of ₹150 Crore and above.

### Citation
If you use this work in research or professional practice, please cite using [`CITATION.cff`](CITATION.cff).

---

## 🙏 Acknowledgements

- **MoSPI, Government of India** for the PAIMANA portal framework that inspired project structure and sector taxonomy
- **Scikit-learn community** for the robust ML pipeline infrastructure
- **Streamlit** for enabling rapid, interactive data application development
- Project developed as part of the **In Project LLC** data analytics portfolio (Code: IP-DA-003)

---

<div align="center">

**Built with ❤️ for smarter infrastructure governance**

⭐ If this project helps you, please give it a star!

</div>
