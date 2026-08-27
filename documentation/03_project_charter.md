# Project Charter

## Identification

- **Project:** Predictive Construction Project Overrun Model
- **Code:** IP-DA-003
- **Sponsor:** In Project LLC
- **Analyst:** Narciso M. Dickson, PMP®
- **Data classification:** Synthetic portfolio data

## Scope

### Included

- Construction project attributes
- Early and mid-project cost and schedule controls
- CPI, SPI, variance, contingency, procurement, labor, weather, and safety indicators
- RFI and change-workflow indicators derived from Project 2 concepts
- Binary classification for cost and schedule overrun
- Regression for overrun magnitude
- Time-based validation
- Model explainability, monitoring, and human review
- Excel, SQL, Python, Power BI, Tableau, and portfolio outputs

### Excluded

- Real client records
- Automated contractual decisions
- Autonomous approval or rejection of changes
- Safety-critical decisions
- Production deployment without independent validation
- Causal claims

## Constraints

- Data is synthetic.
- Target thresholds are case-study definitions.
- Model performance is not an industry benchmark.
- The final 2025 test set may not be used for threshold tuning.
- Final outcome fields may not be model predictors.

## Deliverables

- Relational raw and clean datasets
- Data dictionary and feature-lineage workbook
- SQLite analytical database
- Reproducible preprocessing and modeling scripts
- Saved model pipelines
- Model performance and risk dashboards
- Model card and governance plan
- Batch scoring and monitoring scripts
- Final DOCX and PDF case-study report
