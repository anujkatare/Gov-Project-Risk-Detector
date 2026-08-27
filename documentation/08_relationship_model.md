# Relationship Model

```text
Projects 1 ─── 1 Workflow Features
Projects 1 ─── 1 Outcomes
```

The clean one-to-one relationships are joined into the model-ready project snapshot dataset.

## Modeling table

`modeling_dataset_clean.csv` contains:

- project metadata;
- early/mid-project predictor fields;
- workflow predictor fields;
- final targets;
- and a deterministic time-split label.

## Feature lineage

`feature_lineage.csv` documents which feature concepts were developed in Projects 1 and 2.
