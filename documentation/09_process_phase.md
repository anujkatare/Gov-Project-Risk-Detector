# Process Phase

## Objective

Transform the intentionally imperfect raw relational data into a validated, model-ready project-snapshot dataset.

## Processing controls

- Remove exact duplicates.
- Standardize controlled categorical variants.
- Recalculate target flags from final outcome values.
- Quarantine invalid dates, missing critical predictors, invalid numerical values, and orphan relationships.
- Require complete one-to-one Project–Workflow–Outcome relationships.
- Assign a deterministic time split.
- Load clean data into SQLite with keys and validation views.

## Outputs

- `data/cleaned/projects_clean.csv`
- `data/cleaned/workflow_features_clean.csv`
- `data/cleaned/outcomes_clean.csv`
- `data/processed/modeling_dataset_clean.csv`
- `data/processed/predictive_overrun_model.sqlite`
- `documentation/cleaning_log.csv`
- `documentation/quarantine_records.csv`
- `documentation/row_reconciliation.csv`
- `documentation/data_quality_results.csv`
