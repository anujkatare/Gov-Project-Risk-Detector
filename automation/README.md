# Project 3 Scoring and Monitoring Automation

## Score new projects

```powershell
python automation\score_new_projects.py input.csv output.csv
```

The input must contain all fields listed in `analysis/models/model_manifest.json`.

## Monitoring demonstration

```powershell
python automation\monitor_model.py reference.csv monitoring.csv report.json
```

The monitoring script calculates outcome metrics when labels are available and a probability-based Population Stability Index demonstration.

## Important controls

- No live schedule is created.
- No external notifications are sent.
- Scoring must stop after critical data-quality failure.
- Human review is required.
- The model may not be used for contractual, safety-critical, or personnel decisions.
