# Model Card

## Model purpose

Estimate early/mid-project probability of:

- final cost overrun of at least 10%; and
- final schedule delay of at least 30 days.

The model supports management prioritization. It does not authorize contractual, employment, safety, or financial decisions.

## Data

- Synthetic projects: 2,362
- Train: 1,577 projects from 2019–2023
- Validation: 349 projects from 2024
- Test: 436 projects from 2025
- Predictor fields: 40
- Final-outcome fields excluded from predictors.

## Champion models

### Cost overrun

- Model: Random Forest
- Validation threshold: 0.435
- Test ROC-AUC: 0.899
- Test PR-AUC: 0.774
- Test recall: 0.811
- Test precision: 0.625
- Test Brier score: 0.123

### Schedule delay

- Model: Logistic Regression
- Validation threshold: 0.695
- Test ROC-AUC: 0.756
- Test PR-AUC: 0.524
- Test recall: 0.453
- Test precision: 0.520
- Test Brier score: 0.183

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
