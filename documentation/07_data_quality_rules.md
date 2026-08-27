# Data Quality Rules

## Projects

- Project_ID must be unique and nonblank.
- Original_Budget and Planned_Duration_Days must be positive.
- Snapshot_Date must be on or after Start_Date.
- Percent-complete fields must be between 0 and 1.
- CPI, SPI, productivity, and completeness must be within defined plausible ranges.
- Controlled categorical values must be standardized.

## Workflow features

- Project_ID must reference a valid project.
- Rates and percentages must be between 0 and defined upper bounds.
- Cycle-time and lag values must be nonnegative.
- Missing critical values require deterministic repair or quarantine.

## Outcomes

- Project_ID must reference a valid project.
- Cost and schedule flags must equal the threshold-derived values.
- Combined flag must equal the logical OR of cost and schedule flags.
- Final outcome fields may not enter model feature matrices.

## Reconciliation

For each raw table:

`raw rows = clean rows + exact duplicates removed + quarantined rows`
