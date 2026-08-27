# Analyze Phase

## Objective

Train, validate, test, interpret, and compare predictive models for construction cost overrun and schedule delay.

## Time-based split

- Train: 1,577 projects from 2019–2023
- Validation: 349 projects from 2024
- Test: 436 projects from 2025

The 2025 test set was not used for model selection or threshold tuning.

## Classification targets

- Cost overrun ≥10%
- Schedule delay ≥30 days

## Regression targets

- Final cost-overrun percentage
- Final schedule-delay days

## Champion classification models

### Cost overrun

- Model: **Random Forest**
- Test ROC-AUC: **0.899**
- Test PR-AUC: **0.774**
- Test recall: **0.811**
- Test precision: **0.625**
- Test F1: **0.706**

### Schedule delay

- Model: **Logistic Regression**
- Test ROC-AUC: **0.756**
- Test PR-AUC: **0.524**
- Test recall: **0.453**
- Test precision: **0.520**
- Test F1: **0.484**

## Temporal generalization

Schedule-delay performance decreased from validation to test. The result is intentionally retained because temporal degradation is a critical governance signal rather than a result to hide.

## Risk scoring

The overall risk probability is calculated as:

`1 - (1 - cost probability) × (1 - schedule probability)`

Risk bands:

- Red: probability ≥0.65
- Yellow: probability ≥0.35 and <0.65
- Green: probability <0.35

Test risk distribution:

- Red: 188
- Yellow: 138
- Green: 110
