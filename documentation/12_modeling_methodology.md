# Modeling Methodology

## Predictor boundary

Only fields available at the project snapshot are included. Identifiers, names, dates, split fields, final outcomes, final CPI/SPI, final status, actual end date, and final EAC are excluded.

## Preprocessing

### Numeric features

- Standardized for logistic and ridge models.
- Passed directly to tree models.

### Categorical features

- One-hot encoded.
- Unknown categories ignored at scoring time.

## Candidate models

### Classification

- Logistic Regression
- Random Forest Classifier

### Regression

- Ridge Regression
- Random Forest Regressor

## Selection

- Classification champion selected by validation PR-AUC.
- Classification threshold selected by maximum validation F1.
- Regression champion selected by validation MAE.
- Test metrics are reported only after selection.

## Evaluation

Classification:

- ROC-AUC
- PR-AUC
- Brier score
- accuracy
- precision
- recall
- F1
- specificity
- confusion matrix
- calibration bins

Regression:

- MAE
- RMSE
- R²

## Explainability

- Original-feature permutation importance on the held-out test set.
- Rule-based project triggers supplement but do not replace model interpretation.
