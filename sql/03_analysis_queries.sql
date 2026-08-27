-- Split and prevalence
SELECT Data_Split, COUNT(*) AS Project_Count,
       AVG(Cost_Overrun_Flag) AS Cost_Overrun_Rate,
       AVG(Schedule_Delay_Flag) AS Schedule_Delay_Rate
FROM modeling_dataset
GROUP BY Data_Split;

-- Early project-control indicators by cost target
SELECT Cost_Overrun_Flag,
       AVG(CPI_Snapshot) AS Avg_CPI,
       AVG(Cost_Variance_Pct_Snapshot) AS Avg_Cost_Variance,
       AVG(Contingency_Utilization_Pct) AS Avg_Contingency_Utilization,
       AVG(Pending_Change_Exposure_Pct_Budget) AS Avg_Pending_Exposure
FROM modeling_dataset
WHERE Data_Split='Test'
GROUP BY Cost_Overrun_Flag;

-- Workflow indicators by schedule target
SELECT Schedule_Delay_Flag,
       AVG(SPI_Snapshot) AS Avg_SPI,
       AVG(Avg_RFI_Response_Days) AS Avg_RFI_Response,
       AVG(Overdue_RFI_Rate) AS Avg_Overdue_RFI_Rate,
       AVG(Change_Approval_Cycle_Days) AS Avg_Change_Approval
FROM modeling_dataset
WHERE Data_Split='Test'
GROUP BY Schedule_Delay_Flag;
