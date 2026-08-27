# Monitoring and Controls

## Monitoring domains

### Data quality

- Required fields present
- Types and ranges valid
- Controlled categories valid
- No outcome leakage
- Scoring success rate
- Critical check pass rate

### Drift

- Predictor distributions
- Cost probability PSI
- Schedule probability PSI
- Risk-band distribution
- Missing and unknown-category rates

### Performance

When outcomes are available:

- ROC-AUC
- PR-AUC
- Brier score
- precision
- recall
- F1
- specificity
- calibration
- regression MAE and RMSE

### Segment behavior

Review by:

- project type
- complexity
- delivery method
- digital coordination
- owner decision profile

### Human process

- review completion rate
- override rate
- override reasons
- action completion
- unresolved Red-project count
- reviewer usefulness rating

## Proposed trigger levels

- Probability PSI >0.10: Yellow review
- Probability PSI >0.20: Red retraining or suspension review
- Critical data-quality failure: stop scoring
- Cost ROC-AUC <0.78: Red review
- Schedule ROC-AUC <0.70: Red review
- Segment AUC gap >0.15: Red review
- Override rate >50%: Red process/model review
- Model age >18 months: mandatory retraining decision

## Incident response

1. Stop scoring when required.
2. Preserve the failed input and logs.
3. Notify the business owner and risk reviewer.
4. Determine data, code, model, or process cause.
5. Correct, validate, and document.
6. Re-release with version control or retire the model.
