$ErrorActionPreference = "Stop"
Write-Host "Step 1: Generate synthetic data"
python data\generation\generate_synthetic_overrun_data.py
Write-Host "Step 2: Process and validate"
python data\processing\process_clean_and_validate.py
Write-Host "Step 3: Run modeling"
python analysis\run_modeling.py
Write-Host "Step 4: Score sample projects"
python automation\score_new_projects.py analysis\scoring\sample_new_projects.csv automation\output\sample_scored_projects.csv
Write-Host "Pipeline complete. Open dashboards in the dashboards folder."
