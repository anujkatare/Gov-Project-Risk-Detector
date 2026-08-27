# Model Performance

## Cost-overrun champion

| Metric | Test result |
|---|---:|
| ROC-AUC | 0.899 |
| PR-AUC | 0.774 |
| Brier score | 0.123 |
| Precision | 0.625 |
| Recall | 0.811 |
| F1 | 0.706 |
| Specificity | 0.834 |
| Threshold | 0.435 |

## Schedule-delay champion

| Metric | Test result |
|---|---:|
| ROC-AUC | 0.756 |
| PR-AUC | 0.524 |
| Brier score | 0.183 |
| Precision | 0.520 |
| Recall | 0.453 |
| F1 | 0.484 |
| Specificity | 0.897 |
| Threshold | 0.695 |

## Regression performance

The final cost-overrun model achieved approximately 3.25 percentage points MAE on the test set. The schedule-delay models achieved approximately 15–16 days MAE.

## Important interpretation

- Cost classification generalizes strongly in the synthetic time split.
- Schedule classification shows meaningful temporal degradation.
- The degradation requires monitoring, recalibration, and potentially retraining before real deployment.
- No metric establishes causality.
- Model predictions do not replace project-controls judgment.
