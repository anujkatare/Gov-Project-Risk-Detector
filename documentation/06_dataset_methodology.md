# Dataset Methodology

## Generation approach

A deterministic generator uses seed `20260804` to create 2,400 fictional construction projects. Projects vary by type, region, delivery method, contract type, complexity, digital-coordination maturity, owner decision profile, budget, and duration.

Predictors represent information available at an early/mid-project snapshot between approximately 35% and 60% planned completion.

Final outcomes are generated after the snapshot using latent project conditions, predictor relationships, random noise, and bounded distributions.

## Leakage boundary

The following final fields are targets or post-outcome reference fields and may not be used as predictors:

- Final_Cost_Overrun_Pct
- Final_Schedule_Delay_Days
- Cost_Overrun_Flag
- Schedule_Delay_Flag
- Combined_Overrun_Flag
- Final_CPI
- Final_SPI
- Actual_End_Date
- Final_EAC
- Final_Status

## Outcome definitions

- Cost overrun: final cost overrun ≥10% of original budget.
- Schedule delay: final delay ≥30 calendar days.
- Combined overrun: either condition is true.

## Project dependency

Feature definitions intentionally build on concepts demonstrated in Projects 1 and 2. Project 3 uses a new independent synthetic dataset and separate folder.
