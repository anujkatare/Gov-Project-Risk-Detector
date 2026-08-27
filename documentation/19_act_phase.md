# Act Phase

## Objective

Convert the predictive analysis into a controlled-pilot operating plan with human review, monitoring, overrides, retraining, incident response, and explicit go/no-go governance.

## Current authorization

**Production use is not authorized.**

All current models, scores, dashboards, and monitoring results use synthetic data.

## Proposed pilot sequence

### Days 0–30

- Approve model charter and prohibited uses.
- Complete independent model-risk review.
- Re-run the full pipeline in a controlled environment.
- Define source-data mapping and critical quality gates.
- Train reviewers on probability, uncertainty, and overrides.

### Days 31–60

- Conduct de-identified silent scoring.
- Review drift, completeness, and feature distributions.
- Review validation thresholds against management capacity.
- Test model suspension and incident communication.

### Days 61–90

- Conduct a limited visible human-reviewed pilot.
- Record accepts, overrides, escalations, and actions.
- Measure calibration, segment performance, override rate, and action completion.
- Make a formal continue, redesign, retrain, or stop decision.

## Monitoring demonstration

The synthetic monitoring demonstration produced:

- Cost ROC-AUC: 0.909
- Schedule ROC-AUC: 0.718
- Cost probability PSI: 0.009
- Schedule probability PSI: 0.105

The schedule probability PSI exceeded the proposed Yellow threshold of 0.10, correctly generating a review trigger.

## Human decision rule

Every score must result in one documented decision:

- Accept
- Override
- Escalate
- Defer

The reviewer must document context, evidence, action, owner, and due date.
