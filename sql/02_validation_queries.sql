SELECT Data_Split, COUNT(*) AS projects,
       AVG(Cost_Overrun_Flag) AS cost_rate,
       AVG(Schedule_Delay_Flag) AS schedule_rate
FROM modeling_dataset
GROUP BY Data_Split;

PRAGMA foreign_key_check;
PRAGMA quick_check;
