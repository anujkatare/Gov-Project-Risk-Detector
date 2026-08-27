# Model Governance

## Roles

- **Executive Sponsor:** approves purpose, scope, prohibited uses, and go/no-go decisions.
- **Project Controls Lead:** owns the business review process and project actions.
- **Project Manager:** makes the project-level human decision.
- **Data Engineer:** owns source mapping, validation, access, and refresh reliability.
- **Data Scientist:** owns code, models, manifest, model card, and retraining.
- **Model Risk Reviewer:** independently reviews methodology, performance, drift, segments, incidents, and releases.

## Prohibited uses

- Autonomous project approval or rejection
- Contractual entitlement decisions
- Safety-critical decisions
- Personnel evaluation
- Legal conclusions
- Causal claims
- Scoring outside the approved data and review process

## Release controls

A model version may be released only when:

1. The feature manifest is locked.
2. Critical data-quality tests pass.
3. Time-based validation is documented.
4. Calibration and segment behavior are reviewed.
5. Thresholds and review capacity are approved.
6. The model card is current.
7. Independent risk review is complete.
8. The rollback and suspension procedure is tested.

## Model version

Current portfolio model version: **1.0.0**
