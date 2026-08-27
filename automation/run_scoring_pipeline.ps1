$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$InputFile = Join-Path $ProjectRoot "analysis\scoring\sample_new_projects.csv"
$OutputFile = Join-Path $PSScriptRoot "output\sample_scored_projects.csv"

python (Join-Path $PSScriptRoot "score_new_projects.py") $InputFile $OutputFile
if ($LASTEXITCODE -ne 0) { throw "Scoring failed." }
