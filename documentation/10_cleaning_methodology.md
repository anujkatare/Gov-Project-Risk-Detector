# Cleaning Methodology

## Repairs allowed

- Controlled category mapping.
- Threshold flags recalculated from final outcome values.
- Exact duplicate removal.

## Quarantine required

- Missing CPI, SPI, labor-productivity, or required workflow predictors.
- Invalid project budget or duration.
- Snapshot date before project start.
- Rates outside defined bounds.
- Orphan workflow or outcome records.
- Incomplete one-to-one modeling relationships.

## Reasoning

Predictive modeling requires consistent training rows. Guessing missing critical predictors would add undocumented assumptions and weaken reproducibility.

## Reconciliation

Each raw table is reconciled to duplicates, quarantine, and clean output. SQLite foreign-key and integrity checks must pass before modeling.
