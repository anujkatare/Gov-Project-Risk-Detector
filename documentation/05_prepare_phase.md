# Prepare Phase

## Objective

Design and generate a reproducible synthetic relational dataset that supports early-warning prediction without using final-outcome leakage.

## Raw tables

- `projects_raw.csv`
- `workflow_features_raw.csv`
- `outcomes_raw.csv`

## Modeling grain

One row per project snapshot after validated one-to-one joins.

## Time split

- Training: snapshot years 2019–2023
- Validation: snapshot year 2024
- Test: snapshot year 2025

The 2025 test set is held out from threshold tuning and model selection.

## Feature groups

- Project and contract attributes
- Early cost and schedule controls
- Labor, procurement, weather, and safety indicators
- RFI and change-workflow indicators
- Contingency and forecast-control indicators

## Synthetic-data disclosure

All records are fictional and created for education, portfolio demonstration, and analytical-methodology development.
