// Real-life Project Data extracted directly from sample_new_projects.csv & paimana_scored_projects.csv

export const PORTFOLIO_KPIS = {
  totalProjects: 20,
  originalCostLakhCr: 5.82,
  revisedCostLakhCr: 6.36,
  costEscalationPct: 9.3,
  highRiskCount: 2,
  mediumRiskCount: 6,
  lowRiskCount: 12,
  avgScheduleDelayMonths: -0.1,
};

export const SECTORS = [
  "All Sectors",
  "Electricity Generation",
  "Metals & Mining",
  "Oil & Gas",
  "Railways",
  "Real Estate",
  "Roads & Highways",
  "Steel",
  "Urban Public Transport"
];

export const MINISTRIES = [
  "All Ministries",
  "Ministry of Electricity",
  "Ministry of Metals",
  "Ministry of Oil",
  "Ministry of Railways",
  "Ministry of Real",
  "Ministry of Roads",
  "Ministry of Steel",
  "Ministry of Urban"
];

export const RISK_LEVELS = ["All Risks", "High Risk", "Medium Risk", "Low Risk"];

export const COST_RANGES = ["All Budget Ranges", "₹100 Cr - ₹10,000 Cr", "₹10,000 Cr - ₹50,000 Cr", "₹50,000 Cr+"];

export const STATE_RISK_HEATMAP = [
  { state: "Arunachal Pradesh", highRiskCount: 2, totalProjects: 2, avgDelay: 22.4, color: "#cf202f" },
  { state: "Jammu & Kashmir", highRiskCount: 1, totalProjects: 1, avgDelay: 19.8, color: "#cf202f" },
  { state: "Rajasthan", highRiskCount: 2, totalProjects: 2, avgDelay: 14.5, color: "#d97706" },
  { state: "Uttar Pradesh", highRiskCount: 2, totalProjects: 2, avgDelay: 15.1, color: "#d97706" },
  { state: "Tamil Nadu", highRiskCount: 1, totalProjects: 1, avgDelay: 12.2, color: "#d97706" },
  { state: "Gujarat", highRiskCount: 2, totalProjects: 2, avgDelay: 8.5, color: "#05b169" },
  { state: "Karnataka", highRiskCount: 1, totalProjects: 1, avgDelay: 10.4, color: "#05b169" },
  { state: "Odisha", highRiskCount: 1, totalProjects: 1, avgDelay: 16.7, color: "#d97706" },
];

export const SECTORAL_RISK_DISTRIBUTION = [
  { sector: "Electricity Generation", highRisk: 2, medRisk: 2, lowRisk: 0 },
  { sector: "Railways", highRisk: 0, medRisk: 1, lowRisk: 2 },
  { sector: "Roads & Highways", highRisk: 0, medRisk: 0, lowRisk: 3 },
  { sector: "Urban Public Transport", highRisk: 0, medRisk: 1, lowRisk: 2 },
  { sector: "Oil & Gas", highRisk: 0, medRisk: 1, lowRisk: 4 },
];

export const PROJECTS_DATA = [
  {
    "id": "MOSPI-RAIL-01",
    "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
    "agency": "Public Agency / Railways",
    "ministry": "Ministry of Railways",
    "sector": "Railways",
    "state": "Gujarat",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 23,
    "riskBand": "Green",
    "originalCost": 108000.0,
    "currentSpent": 67132.8,
    "predictedCost": 118044.0,
    "costEscalationPct": 9.3,
    "originalDate": "Planned Target",
    "predictedDate": "+-8.1 Days",
    "delayDays": -8.1,
    "delayMonths": -0.3,
    "physicalProgress": 62.2,
    "expectedProgress": 62.2,
    "cpi": 0.84,
    "spi": 1.0,
    "rfiCount": 120,
    "overdueRfiRate": 15.0,
    "complexity": "Very High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 15.6,
        "actual": 15.6,
        "aiForecast": 15.6
      },
      {
        "quarter": "Q4 2022",
        "baseline": 31.1,
        "actual": 31.1,
        "aiForecast": 31.1
      },
      {
        "quarter": "Q4 2023",
        "baseline": 46.7,
        "actual": 46.7,
        "aiForecast": 46.7
      },
      {
        "quarter": "Q4 2024",
        "baseline": 62.2,
        "actual": 62.2,
        "aiForecast": 62.2
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 77.2
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 97.2
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (120 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+0 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-8.1 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-8.1 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.84) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (15.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+98.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (0 Days)",
          "impact": "Schedule Impact (+0 Days)"
        },
        {
          "name": "Weather Impact (0 Days)",
          "impact": "Seasonal Slippage (+0 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-04",
        "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
        "budget": 43367.0,
        "progress": 33.5,
        "delayMonths": -0.9,
        "costEscPct": 11.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-METRO-02",
    "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
    "agency": "Public Agency / Urban Public Transport",
    "ministry": "Ministry of Urban",
    "sector": "Urban Public Transport",
    "state": "Tamil Nadu",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 28,
    "riskBand": "Green",
    "originalCost": 63246.0,
    "currentSpent": 35247.0,
    "predictedCost": 70329.55,
    "costEscalationPct": 11.2,
    "originalDate": "Planned Target",
    "predictedDate": "+-18.3 Days",
    "delayDays": -18.3,
    "delayMonths": -0.6,
    "physicalProgress": 55.7,
    "expectedProgress": 55.7,
    "cpi": 0.55,
    "spi": 1.0,
    "rfiCount": 85,
    "overdueRfiRate": 20.0,
    "complexity": "High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 13.9,
        "actual": 13.9,
        "aiForecast": 13.9
      },
      {
        "quarter": "Q4 2022",
        "baseline": 27.9,
        "actual": 27.9,
        "aiForecast": 27.9
      },
      {
        "quarter": "Q4 2023",
        "baseline": 41.8,
        "actual": 41.8,
        "aiForecast": 41.8
      },
      {
        "quarter": "Q4 2024",
        "baseline": 55.7,
        "actual": 55.7,
        "aiForecast": 55.7
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 70.7
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 90.7
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (85 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+10 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-18.3 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-18.3 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.55) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (20.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+95.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (10 Days)",
          "impact": "Schedule Impact (+10 Days)"
        },
        {
          "name": "Weather Impact (5 Days)",
          "impact": "Seasonal Slippage (+5 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-04",
        "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
        "budget": 43367.0,
        "progress": 33.5,
        "delayMonths": -0.9,
        "costEscPct": 11.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-RAIL-03",
    "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
    "agency": "Public Agency / Railways",
    "ministry": "Ministry of Railways",
    "sector": "Railways",
    "state": "Gujarat",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 16,
    "riskBand": "Green",
    "originalCost": 51101.0,
    "currentSpent": 49056.96,
    "predictedCost": 52480.73,
    "costEscalationPct": 2.7,
    "originalDate": "Planned Target",
    "predictedDate": "+-12.9 Days",
    "delayDays": -12.9,
    "delayMonths": -0.4,
    "physicalProgress": 96.0,
    "expectedProgress": 96.0,
    "cpi": 1.0,
    "spi": 1.0,
    "rfiCount": 150,
    "overdueRfiRate": 10.0,
    "complexity": "High",
    "deliveryMethod": "Design-Bid-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 24.0,
        "actual": 24.0,
        "aiForecast": 24.0
      },
      {
        "quarter": "Q4 2022",
        "baseline": 48.0,
        "actual": 48.0,
        "aiForecast": 48.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 72.0,
        "actual": 72.0,
        "aiForecast": 72.0
      },
      {
        "quarter": "Q4 2024",
        "baseline": 96.0,
        "actual": 96.0,
        "aiForecast": 96.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Bid-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (150 RFIs)",
        "target": "Phase 2",
        "status": "Completed",
        "delay": "+0 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-12.9 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-12.9 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "No dominant rule-based trigger",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (1.0) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (10.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+99.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (0 Days)",
          "impact": "Schedule Impact (+0 Days)"
        },
        {
          "name": "Weather Impact (0 Days)",
          "impact": "Seasonal Slippage (+0 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-04",
        "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
        "budget": 43367.0,
        "progress": 33.5,
        "delayMonths": -0.9,
        "costEscPct": 11.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-PETRO-04",
    "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
    "agency": "Public Agency / Oil & Gas",
    "ministry": "Ministry of Oil",
    "sector": "Oil & Gas",
    "state": "Madhya Pradesh",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 30,
    "riskBand": "Green",
    "originalCost": 43367.0,
    "currentSpent": 14527.95,
    "predictedCost": 48440.94,
    "costEscalationPct": 11.7,
    "originalDate": "Planned Target",
    "predictedDate": "+-28.5 Days",
    "delayDays": -28.5,
    "delayMonths": -0.9,
    "physicalProgress": 33.5,
    "expectedProgress": 33.5,
    "cpi": 0.14,
    "spi": 1.0,
    "rfiCount": 45,
    "overdueRfiRate": 22.0,
    "complexity": "Very High",
    "deliveryMethod": "EPC",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 8.4,
        "actual": 8.4,
        "aiForecast": 8.4
      },
      {
        "quarter": "Q4 2022",
        "baseline": 16.8,
        "actual": 16.8,
        "aiForecast": 16.8
      },
      {
        "quarter": "Q4 2023",
        "baseline": 25.1,
        "actual": 25.1,
        "aiForecast": 25.1
      },
      {
        "quarter": "Q4 2024",
        "baseline": 33.5,
        "actual": 33.5,
        "aiForecast": 33.5
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 48.5
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 68.5
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (EPC)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (45 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+15 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-28.5 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-28.5 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.14) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (22.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+92.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (15 Days)",
          "impact": "Schedule Impact (+15 Days)"
        },
        {
          "name": "Weather Impact (10 Days)",
          "impact": "Seasonal Slippage (+10 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-PETRO-05",
        "name": "RAJASTHAN REFINERY PROJECT (HPCL)",
        "budget": 43129.0,
        "progress": 92.0,
        "delayMonths": 0.5,
        "costEscPct": 13.2,
        "risk": "Yellow"
      },
      {
        "id": "MOSPI-PETRO-07",
        "name": "CAPACITY EXPANSION OF PANIPAT REFINERY",
        "budget": 34627.0,
        "progress": 94.3,
        "delayMonths": -0.5,
        "costEscPct": 11.9,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-08",
        "name": "KG-DWN-98/2 CLUSTER-II DEVELOPMENT PROJECT",
        "budget": 34012.0,
        "progress": 96.9,
        "delayMonths": -0.4,
        "costEscPct": 2.1,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-PETRO-05",
    "name": "RAJASTHAN REFINERY PROJECT (HPCL)",
    "agency": "Public Agency / Oil & Gas",
    "ministry": "Ministry of Oil",
    "sector": "Oil & Gas",
    "state": "Rajasthan",
    "statusBadge": "Under Execution - Delayed",
    "riskScore": 50,
    "riskBand": "Yellow",
    "originalCost": 43129.0,
    "currentSpent": 39678.68,
    "predictedCost": 48822.03,
    "costEscalationPct": 13.2,
    "originalDate": "Planned Target",
    "predictedDate": "+14.9 Days",
    "delayDays": 14.9,
    "delayMonths": 0.5,
    "physicalProgress": 92.0,
    "expectedProgress": 92.0,
    "cpi": 0.54,
    "spi": 1.0,
    "rfiCount": 95,
    "overdueRfiRate": 18.0,
    "complexity": "Very High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 23.0,
        "actual": 23.0,
        "aiForecast": 23.0
      },
      {
        "quarter": "Q4 2022",
        "baseline": 46.0,
        "actual": 46.0,
        "aiForecast": 46.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 69.0,
        "actual": 69.0,
        "aiForecast": 69.0
      },
      {
        "quarter": "Q4 2024",
        "baseline": 92.0,
        "actual": 92.0,
        "aiForecast": 92.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (95 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+12 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+14.9 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+14.9 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.54) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (18.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+94.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (12 Days)",
          "impact": "Schedule Impact (+12 Days)"
        },
        {
          "name": "Weather Impact (8 Days)",
          "impact": "Seasonal Slippage (+8 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-PETRO-04",
        "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
        "budget": 43367.0,
        "progress": 33.5,
        "delayMonths": -0.9,
        "costEscPct": 11.7,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-07",
        "name": "CAPACITY EXPANSION OF PANIPAT REFINERY",
        "budget": 34627.0,
        "progress": 94.3,
        "delayMonths": -0.5,
        "costEscPct": 11.9,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-08",
        "name": "KG-DWN-98/2 CLUSTER-II DEVELOPMENT PROJECT",
        "budget": 34012.0,
        "progress": 96.9,
        "delayMonths": -0.4,
        "costEscPct": 2.1,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-POWER-06",
    "name": "MEJA THERMAL POWER PROJECT STAGE-II",
    "agency": "Public Agency / Electricity Generation",
    "ministry": "Ministry of Electricity",
    "sector": "Electricity Generation",
    "state": "Uttar Pradesh",
    "statusBadge": "Under Execution - On Track",
    "riskScore": 62,
    "riskBand": "Yellow",
    "originalCost": 38358.0,
    "currentSpent": 7.67,
    "predictedCost": 43382.9,
    "costEscalationPct": 13.1,
    "originalDate": "Planned Target",
    "predictedDate": "+-12.7 Days",
    "delayDays": -12.7,
    "delayMonths": -0.4,
    "physicalProgress": 0.0,
    "expectedProgress": 0.0,
    "cpi": 0.03,
    "spi": 1.0,
    "rfiCount": 20,
    "overdueRfiRate": 35.0,
    "complexity": "Very High",
    "deliveryMethod": "Design-Bid-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 0.0,
        "actual": 0.0,
        "aiForecast": 0.0
      },
      {
        "quarter": "Q4 2022",
        "baseline": 0.0,
        "actual": 0.0,
        "aiForecast": 0.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 0.0,
        "actual": 0.0,
        "aiForecast": 0.0
      },
      {
        "quarter": "Q4 2024",
        "baseline": 0.0,
        "actual": 0.0,
        "aiForecast": 0.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 15.0
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 35.0
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Bid-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (20 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+45 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-12.7 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-12.7 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Slow change approval",
        "impactPct": 25,
        "category": "Operational"
      },
      {
        "factor": "Overdue RFI backlog",
        "impactPct": 20,
        "category": "Operational"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+88.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (45 Days)",
          "impact": "Schedule Impact (+45 Days)"
        },
        {
          "name": "Weather Impact (30 Days)",
          "impact": "Seasonal Slippage (+30 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-PETRO-07",
    "name": "CAPACITY EXPANSION OF PANIPAT REFINERY",
    "agency": "Public Agency / Oil & Gas",
    "ministry": "Ministry of Oil",
    "sector": "Oil & Gas",
    "state": "Haryana",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 27,
    "riskBand": "Green",
    "originalCost": 34627.0,
    "currentSpent": 32653.26,
    "predictedCost": 38747.61,
    "costEscalationPct": 11.9,
    "originalDate": "Planned Target",
    "predictedDate": "+-14.1 Days",
    "delayDays": -14.1,
    "delayMonths": -0.5,
    "physicalProgress": 94.3,
    "expectedProgress": 94.3,
    "cpi": 0.77,
    "spi": 1.0,
    "rfiCount": 60,
    "overdueRfiRate": 18.0,
    "complexity": "High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 23.6,
        "actual": 23.6,
        "aiForecast": 23.6
      },
      {
        "quarter": "Q4 2022",
        "baseline": 47.1,
        "actual": 47.1,
        "aiForecast": 47.1
      },
      {
        "quarter": "Q4 2023",
        "baseline": 70.7,
        "actual": 70.7,
        "aiForecast": 70.7
      },
      {
        "quarter": "Q4 2024",
        "baseline": 94.3,
        "actual": 94.3,
        "aiForecast": 94.3
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (60 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+5 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-14.1 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-14.1 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.77) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (18.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+96.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (5 Days)",
          "impact": "Schedule Impact (+5 Days)"
        },
        {
          "name": "Weather Impact (2 Days)",
          "impact": "Seasonal Slippage (+2 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-PETRO-04",
        "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
        "budget": 43367.0,
        "progress": 33.5,
        "delayMonths": -0.9,
        "costEscPct": 11.7,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-05",
        "name": "RAJASTHAN REFINERY PROJECT (HPCL)",
        "budget": 43129.0,
        "progress": 92.0,
        "delayMonths": 0.5,
        "costEscPct": 13.2,
        "risk": "Yellow"
      },
      {
        "id": "MOSPI-PETRO-08",
        "name": "KG-DWN-98/2 CLUSTER-II DEVELOPMENT PROJECT",
        "budget": 34012.0,
        "progress": 96.9,
        "delayMonths": -0.4,
        "costEscPct": 2.1,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-PETRO-08",
    "name": "KG-DWN-98/2 CLUSTER-II DEVELOPMENT PROJECT",
    "agency": "Public Agency / Oil & Gas",
    "ministry": "Ministry of Oil",
    "sector": "Oil & Gas",
    "state": "Andhra Pradesh",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 10,
    "riskBand": "Green",
    "originalCost": 34012.0,
    "currentSpent": 32957.63,
    "predictedCost": 34726.25,
    "costEscalationPct": 2.1,
    "originalDate": "Planned Target",
    "predictedDate": "+-10.7 Days",
    "delayDays": -10.7,
    "delayMonths": -0.4,
    "physicalProgress": 96.9,
    "expectedProgress": 96.9,
    "cpi": 0.98,
    "spi": 1.0,
    "rfiCount": 75,
    "overdueRfiRate": 12.0,
    "complexity": "Very High",
    "deliveryMethod": "EPC",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 24.2,
        "actual": 24.2,
        "aiForecast": 24.2
      },
      {
        "quarter": "Q4 2022",
        "baseline": 48.5,
        "actual": 48.5,
        "aiForecast": 48.5
      },
      {
        "quarter": "Q4 2023",
        "baseline": 72.7,
        "actual": 72.7,
        "aiForecast": 72.7
      },
      {
        "quarter": "Q4 2024",
        "baseline": 96.9,
        "actual": 96.9,
        "aiForecast": 96.9
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (EPC)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (75 RFIs)",
        "target": "Phase 2",
        "status": "Completed",
        "delay": "+0 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-10.7 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-10.7 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "No dominant rule-based trigger",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.98) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (12.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+97.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (0 Days)",
          "impact": "Schedule Impact (+0 Days)"
        },
        {
          "name": "Weather Impact (12 Days)",
          "impact": "Seasonal Slippage (+12 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-PETRO-04",
        "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
        "budget": 43367.0,
        "progress": 33.5,
        "delayMonths": -0.9,
        "costEscPct": 11.7,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-05",
        "name": "RAJASTHAN REFINERY PROJECT (HPCL)",
        "budget": 43129.0,
        "progress": 92.0,
        "delayMonths": 0.5,
        "costEscPct": 13.2,
        "risk": "Yellow"
      },
      {
        "id": "MOSPI-PETRO-07",
        "name": "CAPACITY EXPANSION OF PANIPAT REFINERY",
        "budget": 34627.0,
        "progress": 94.3,
        "delayMonths": -0.5,
        "costEscPct": 11.9,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-HOUS-09",
    "name": "REDEVELOPMENT OF SEVEN GPRA COLONIES IN DELHI",
    "agency": "Public Agency / Real Estate",
    "ministry": "Ministry of Real",
    "sector": "Real Estate",
    "state": "Delhi",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 26,
    "riskBand": "Green",
    "originalCost": 32850.0,
    "currentSpent": 15439.5,
    "predictedCost": 34886.7,
    "costEscalationPct": 6.2,
    "originalDate": "Planned Target",
    "predictedDate": "+-8.7 Days",
    "delayDays": -8.7,
    "delayMonths": -0.3,
    "physicalProgress": 47.0,
    "expectedProgress": 47.0,
    "cpi": 0.91,
    "spi": 1.0,
    "rfiCount": 110,
    "overdueRfiRate": 21.0,
    "complexity": "Moderate",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 11.8,
        "actual": 11.8,
        "aiForecast": 11.8
      },
      {
        "quarter": "Q4 2022",
        "baseline": 23.5,
        "actual": 23.5,
        "aiForecast": 23.5
      },
      {
        "quarter": "Q4 2023",
        "baseline": 35.2,
        "actual": 35.2,
        "aiForecast": 35.2
      },
      {
        "quarter": "Q4 2024",
        "baseline": 47.0,
        "actual": 47.0,
        "aiForecast": 47.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 62.0
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 82.0
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (110 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+20 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-8.7 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-8.7 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.91) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (21.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+93.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (20 Days)",
          "impact": "Schedule Impact (+20 Days)"
        },
        {
          "name": "Weather Impact (10 Days)",
          "impact": "Seasonal Slippage (+10 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-POWER-10",
    "name": "DIBANG MULTIPURPOSE PROJECT",
    "agency": "Public Agency / Electricity Generation",
    "ministry": "Ministry of Electricity",
    "sector": "Electricity Generation",
    "state": "Arunachal Pradesh",
    "statusBadge": "Under Execution - On Track",
    "riskScore": 62,
    "riskBand": "Yellow",
    "originalCost": 31876.0,
    "currentSpent": 5715.37,
    "predictedCost": 35860.5,
    "costEscalationPct": 12.5,
    "originalDate": "Planned Target",
    "predictedDate": "+-5.3 Days",
    "delayDays": -5.3,
    "delayMonths": -0.2,
    "physicalProgress": 17.9,
    "expectedProgress": 17.9,
    "cpi": 0.15,
    "spi": 1.0,
    "rfiCount": 30,
    "overdueRfiRate": 30.0,
    "complexity": "Very High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 4.5,
        "actual": 4.5,
        "aiForecast": 4.5
      },
      {
        "quarter": "Q4 2022",
        "baseline": 8.9,
        "actual": 8.9,
        "aiForecast": 8.9
      },
      {
        "quarter": "Q4 2023",
        "baseline": 13.4,
        "actual": 13.4,
        "aiForecast": 13.4
      },
      {
        "quarter": "Q4 2024",
        "baseline": 17.9,
        "actual": 17.9,
        "aiForecast": 17.9
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 32.9
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 52.9
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (30 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+60 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-5.3 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-5.3 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Overdue RFI backlog",
        "impactPct": 25,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.15) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (30.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+85.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (60 Days)",
          "impact": "Schedule Impact (+60 Days)"
        },
        {
          "name": "Weather Impact (45 Days)",
          "impact": "Seasonal Slippage (+45 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-RAIL-11",
    "name": "EASTERN DEDICATED FREIGHT CORRIDOR",
    "agency": "Public Agency / Railways",
    "ministry": "Ministry of Railways",
    "sector": "Railways",
    "state": "Uttar Pradesh",
    "statusBadge": "Under Execution - Delayed",
    "riskScore": 37,
    "riskBand": "Yellow",
    "originalCost": 30358.0,
    "currentSpent": 29750.84,
    "predictedCost": 31238.38,
    "costEscalationPct": 2.9,
    "originalDate": "Planned Target",
    "predictedDate": "+16.1 Days",
    "delayDays": 16.1,
    "delayMonths": 0.5,
    "physicalProgress": 98.0,
    "expectedProgress": 98.0,
    "cpi": 0.99,
    "spi": 1.0,
    "rfiCount": 135,
    "overdueRfiRate": 11.0,
    "complexity": "High",
    "deliveryMethod": "Design-Bid-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 24.5,
        "actual": 24.5,
        "aiForecast": 24.5
      },
      {
        "quarter": "Q4 2022",
        "baseline": 49.0,
        "actual": 49.0,
        "aiForecast": 49.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 73.5,
        "actual": 73.5,
        "aiForecast": 73.5
      },
      {
        "quarter": "Q4 2024",
        "baseline": 98.0,
        "actual": 98.0,
        "aiForecast": 98.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Bid-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (135 RFIs)",
        "target": "Phase 2",
        "status": "Completed",
        "delay": "+2 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+16.1 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+16.1 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "No dominant rule-based trigger",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.99) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (11.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+98.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (2 Days)",
          "impact": "Schedule Impact (+2 Days)"
        },
        {
          "name": "Weather Impact (0 Days)",
          "impact": "Seasonal Slippage (+0 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-METRO-12",
    "name": "BANGALORE METRO RAIL PROJECT PHASE-2",
    "agency": "Public Agency / Urban Public Transport",
    "ministry": "Ministry of Urban",
    "sector": "Urban Public Transport",
    "state": "Karnataka",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 33,
    "riskBand": "Green",
    "originalCost": 26405.0,
    "currentSpent": 20648.71,
    "predictedCost": 29864.06,
    "costEscalationPct": 13.1,
    "originalDate": "Planned Target",
    "predictedDate": "+-9.1 Days",
    "delayDays": -9.1,
    "delayMonths": -0.3,
    "physicalProgress": 78.2,
    "expectedProgress": 78.2,
    "cpi": 0.74,
    "spi": 1.0,
    "rfiCount": 90,
    "overdueRfiRate": 17.0,
    "complexity": "High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 19.6,
        "actual": 19.6,
        "aiForecast": 19.6
      },
      {
        "quarter": "Q4 2022",
        "baseline": 39.1,
        "actual": 39.1,
        "aiForecast": 39.1
      },
      {
        "quarter": "Q4 2023",
        "baseline": 58.7,
        "actual": 58.7,
        "aiForecast": 58.7
      },
      {
        "quarter": "Q4 2024",
        "baseline": 78.2,
        "actual": 78.2,
        "aiForecast": 78.2
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 93.2
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (90 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+15 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-9.1 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-9.1 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.74) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (17.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+95.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (15 Days)",
          "impact": "Schedule Impact (+15 Days)"
        },
        {
          "name": "Weather Impact (10 Days)",
          "impact": "Seasonal Slippage (+10 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-METRO-13",
    "name": "JAIPUR METRO RAIL PROJECT PHASE 2",
    "agency": "Public Agency / Urban Public Transport",
    "ministry": "Ministry of Urban",
    "sector": "Urban Public Transport",
    "state": "Rajasthan",
    "statusBadge": "Under Execution - On Track",
    "riskScore": 57,
    "riskBand": "Yellow",
    "originalCost": 13037.66,
    "currentSpent": 651.88,
    "predictedCost": 14706.48,
    "costEscalationPct": 12.8,
    "originalDate": "Planned Target",
    "predictedDate": "+-20.6 Days",
    "delayDays": -20.6,
    "delayMonths": -0.7,
    "physicalProgress": 5.0,
    "expectedProgress": 5.0,
    "cpi": 0.12,
    "spi": 1.0,
    "rfiCount": 15,
    "overdueRfiRate": 32.0,
    "complexity": "High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 1.2,
        "actual": 1.2,
        "aiForecast": 1.2
      },
      {
        "quarter": "Q4 2022",
        "baseline": 2.5,
        "actual": 2.5,
        "aiForecast": 2.5
      },
      {
        "quarter": "Q4 2023",
        "baseline": 3.8,
        "actual": 3.8,
        "aiForecast": 3.8
      },
      {
        "quarter": "Q4 2024",
        "baseline": 5.0,
        "actual": 5.0,
        "aiForecast": 5.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 20.0
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 40.0
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (15 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+40 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-20.6 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-20.6 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Overdue RFI backlog",
        "impactPct": 25,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.12) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (32.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+86.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (40 Days)",
          "impact": "Schedule Impact (+40 Days)"
        },
        {
          "name": "Weather Impact (15 Days)",
          "impact": "Seasonal Slippage (+15 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-ROAD-14",
    "name": "ZOJI-LA TUNNEL ACROSS ZOJILA PASS ON NH-01",
    "agency": "Public Agency / Roads & Highways",
    "ministry": "Ministry of Roads",
    "sector": "Roads & Highways",
    "state": "Jammu & Kashmir",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 30,
    "riskBand": "Green",
    "originalCost": 6809.0,
    "currentSpent": 4684.59,
    "predictedCost": 7632.89,
    "costEscalationPct": 12.1,
    "originalDate": "Planned Target",
    "predictedDate": "+-13.8 Days",
    "delayDays": -13.8,
    "delayMonths": -0.5,
    "physicalProgress": 68.8,
    "expectedProgress": 68.8,
    "cpi": 0.53,
    "spi": 1.0,
    "rfiCount": 40,
    "overdueRfiRate": 20.0,
    "complexity": "High",
    "deliveryMethod": "Design-Bid-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 17.2,
        "actual": 17.2,
        "aiForecast": 17.2
      },
      {
        "quarter": "Q4 2022",
        "baseline": 34.4,
        "actual": 34.4,
        "aiForecast": 34.4
      },
      {
        "quarter": "Q4 2023",
        "baseline": 51.6,
        "actual": 51.6,
        "aiForecast": 51.6
      },
      {
        "quarter": "Q4 2024",
        "baseline": 68.8,
        "actual": 68.8,
        "aiForecast": 68.8
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 83.8
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Bid-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (40 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+20 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-13.8 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-13.8 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.53) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (20.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+94.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (20 Days)",
          "impact": "Schedule Impact (+20 Days)"
        },
        {
          "name": "Weather Impact (60 Days)",
          "impact": "Seasonal Slippage (+60 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-POWER-15",
    "name": "SUBANSIRI LOWER HYDROELECTRIC PROJECT (2000 MW)",
    "agency": "Public Agency / Electricity Generation",
    "ministry": "Ministry of Electricity",
    "sector": "Electricity Generation",
    "state": "Arunachal Pradesh",
    "statusBadge": "Under Execution - Severe Delay",
    "riskScore": 100,
    "riskBand": "Red",
    "originalCost": 6285.33,
    "currentSpent": 5562.52,
    "predictedCost": 7158.99,
    "costEscalationPct": 13.9,
    "originalDate": "Planned Target",
    "predictedDate": "+105.2 Days",
    "delayDays": 105.2,
    "delayMonths": 3.5,
    "physicalProgress": 88.5,
    "expectedProgress": 88.5,
    "cpi": 0.81,
    "spi": 1.0,
    "rfiCount": 55,
    "overdueRfiRate": 24.0,
    "complexity": "Very High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 22.1,
        "actual": 22.1,
        "aiForecast": 22.1
      },
      {
        "quarter": "Q4 2022",
        "baseline": 44.2,
        "actual": 44.2,
        "aiForecast": 44.2
      },
      {
        "quarter": "Q4 2023",
        "baseline": 66.4,
        "actual": 66.4,
        "aiForecast": 66.4
      },
      {
        "quarter": "Q4 2024",
        "baseline": 88.5,
        "actual": 88.5,
        "aiForecast": 88.5
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (55 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+25 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+105.2 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+105.2 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.81) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (24.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+92.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (25 Days)",
          "impact": "Schedule Impact (+25 Days)"
        },
        {
          "name": "Weather Impact (50 Days)",
          "impact": "Seasonal Slippage (+50 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-ROAD-16",
    "name": "PATNA RING ROAD 6L BRIDGE GANGA RIVER",
    "agency": "Public Agency / Roads & Highways",
    "ministry": "Ministry of Roads",
    "sector": "Roads & Highways",
    "state": "Bihar",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 30,
    "riskBand": "Green",
    "originalCost": 6292.0,
    "currentSpent": 1387.39,
    "predictedCost": 7047.04,
    "costEscalationPct": 12.0,
    "originalDate": "Planned Target",
    "predictedDate": "+-43.9 Days",
    "delayDays": -43.9,
    "delayMonths": -1.5,
    "physicalProgress": 22.1,
    "expectedProgress": 22.1,
    "cpi": 0.22,
    "spi": 1.0,
    "rfiCount": 25,
    "overdueRfiRate": 25.0,
    "complexity": "Moderate",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 5.5,
        "actual": 5.5,
        "aiForecast": 5.5
      },
      {
        "quarter": "Q4 2022",
        "baseline": 11.1,
        "actual": 11.1,
        "aiForecast": 11.1
      },
      {
        "quarter": "Q4 2023",
        "baseline": 16.6,
        "actual": 16.6,
        "aiForecast": 16.6
      },
      {
        "quarter": "Q4 2024",
        "baseline": 22.1,
        "actual": 22.1,
        "aiForecast": 22.1
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 37.1
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 57.1
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (25 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+30 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-43.9 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-43.9 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.22) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (25.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+91.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (30 Days)",
          "impact": "Schedule Impact (+30 Days)"
        },
        {
          "name": "Weather Impact (20 Days)",
          "impact": "Seasonal Slippage (+20 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-PETRO-17",
    "name": "EXPANSION OF ALUMINA REFINERY PLANT (NALCO)",
    "agency": "Public Agency / Metals & Mining",
    "ministry": "Ministry of Metals",
    "sector": "Metals & Mining",
    "state": "Odisha",
    "statusBadge": "Under Execution - Delayed",
    "riskScore": 38,
    "riskBand": "Yellow",
    "originalCost": 4103.0,
    "currentSpent": 3856.82,
    "predictedCost": 4521.51,
    "costEscalationPct": 10.2,
    "originalDate": "Planned Target",
    "predictedDate": "+4.0 Days",
    "delayDays": 4.0,
    "delayMonths": 0.1,
    "physicalProgress": 94.0,
    "expectedProgress": 94.0,
    "cpi": 0.88,
    "spi": 1.0,
    "rfiCount": 48,
    "overdueRfiRate": 16.0,
    "complexity": "High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 23.5,
        "actual": 23.5,
        "aiForecast": 23.5
      },
      {
        "quarter": "Q4 2022",
        "baseline": 47.0,
        "actual": 47.0,
        "aiForecast": 47.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 70.5,
        "actual": 70.5,
        "aiForecast": 70.5
      },
      {
        "quarter": "Q4 2024",
        "baseline": 94.0,
        "actual": 94.0,
        "aiForecast": 94.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (48 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+8 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+4.0 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+4.0 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.88) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (16.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+95.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (8 Days)",
          "impact": "Schedule Impact (+8 Days)"
        },
        {
          "name": "Weather Impact (5 Days)",
          "impact": "Seasonal Slippage (+5 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-PETRO-18",
    "name": "NMDC SLURRY PIPELINE PROJECT PHASE-1",
    "agency": "Public Agency / Steel",
    "ministry": "Ministry of Steel",
    "sector": "Steel",
    "state": "Chhattisgarh",
    "statusBadge": "Under Execution - Severe Delay",
    "riskScore": 73,
    "riskBand": "Red",
    "originalCost": 2907.0,
    "currentSpent": 2732.58,
    "predictedCost": 3200.61,
    "costEscalationPct": 10.1,
    "originalDate": "Planned Target",
    "predictedDate": "+27.9 Days",
    "delayDays": 27.9,
    "delayMonths": 0.9,
    "physicalProgress": 94.0,
    "expectedProgress": 94.0,
    "cpi": 0.86,
    "spi": 1.0,
    "rfiCount": 35,
    "overdueRfiRate": 19.0,
    "complexity": "High",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 23.5,
        "actual": 23.5,
        "aiForecast": 23.5
      },
      {
        "quarter": "Q4 2022",
        "baseline": 47.0,
        "actual": 47.0,
        "aiForecast": 47.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 70.5,
        "actual": 70.5,
        "aiForecast": 70.5
      },
      {
        "quarter": "Q4 2024",
        "baseline": 94.0,
        "actual": 94.0,
        "aiForecast": 94.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (35 RFIs)",
        "target": "Phase 2",
        "status": "High Delay Risk",
        "delay": "+12 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+27.9 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+27.9 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "Low CPI",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (0.86) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (19.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+93.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (12 Days)",
          "impact": "Schedule Impact (+12 Days)"
        },
        {
          "name": "Weather Impact (15 Days)",
          "impact": "Seasonal Slippage (+15 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-PETRO-19",
    "name": "SRIKAKULAM-ANGUL GAS PIPELINE PROJECT",
    "agency": "Public Agency / Oil & Gas",
    "ministry": "Ministry of Oil",
    "sector": "Oil & Gas",
    "state": "Andhra Pradesh",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 10,
    "riskBand": "Green",
    "originalCost": 2810.0,
    "currentSpent": 2810.0,
    "predictedCost": 2812.81,
    "costEscalationPct": 0.1,
    "originalDate": "Planned Target",
    "predictedDate": "+-16.8 Days",
    "delayDays": -16.8,
    "delayMonths": -0.6,
    "physicalProgress": 100.0,
    "expectedProgress": 100.0,
    "cpi": 1.0,
    "spi": 1.0,
    "rfiCount": 30,
    "overdueRfiRate": 8.0,
    "complexity": "Moderate",
    "deliveryMethod": "EPC",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 25.0,
        "actual": 25.0,
        "aiForecast": 25.0
      },
      {
        "quarter": "Q4 2022",
        "baseline": 50.0,
        "actual": 50.0,
        "aiForecast": 50.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 75.0,
        "actual": 75.0,
        "aiForecast": 75.0
      },
      {
        "quarter": "Q4 2024",
        "baseline": 100.0,
        "actual": 100.0,
        "aiForecast": 100.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (EPC)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (30 RFIs)",
        "target": "Phase 2",
        "status": "Completed",
        "delay": "+0 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-16.8 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-16.8 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "No dominant rule-based trigger",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (1.0) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (8.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+99.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (0 Days)",
          "impact": "Schedule Impact (+0 Days)"
        },
        {
          "name": "Weather Impact (0 Days)",
          "impact": "Seasonal Slippage (+0 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-PETRO-04",
        "name": "ETHYLENE CRACKER PROJECT AT BINA REFINERY",
        "budget": 43367.0,
        "progress": 33.5,
        "delayMonths": -0.9,
        "costEscPct": 11.7,
        "risk": "Green"
      },
      {
        "id": "MOSPI-PETRO-05",
        "name": "RAJASTHAN REFINERY PROJECT (HPCL)",
        "budget": 43129.0,
        "progress": 92.0,
        "delayMonths": 0.5,
        "costEscPct": 13.2,
        "risk": "Yellow"
      },
      {
        "id": "MOSPI-PETRO-07",
        "name": "CAPACITY EXPANSION OF PANIPAT REFINERY",
        "budget": 34627.0,
        "progress": 94.3,
        "delayMonths": -0.5,
        "costEscPct": 11.9,
        "risk": "Green"
      }
    ]
  },
  {
    "id": "MOSPI-ROAD-20",
    "name": "DWARKA EXPRESSWAY PACKAGE III",
    "agency": "Public Agency / Roads & Highways",
    "ministry": "Ministry of Roads",
    "sector": "Roads & Highways",
    "state": "Haryana",
    "statusBadge": "Under Execution - On Schedule",
    "riskScore": 8,
    "riskBand": "Green",
    "originalCost": 2298.37,
    "currentSpent": 2298.37,
    "predictedCost": 2300.67,
    "costEscalationPct": 0.1,
    "originalDate": "Planned Target",
    "predictedDate": "+-15.0 Days",
    "delayDays": -15.0,
    "delayMonths": -0.5,
    "physicalProgress": 100.0,
    "expectedProgress": 100.0,
    "cpi": 1.0,
    "spi": 1.0,
    "rfiCount": 28,
    "overdueRfiRate": 6.0,
    "complexity": "Moderate",
    "deliveryMethod": "Design-Build",
    "timelineCurve": [
      {
        "quarter": "Q1 2021",
        "baseline": 25.0,
        "actual": 25.0,
        "aiForecast": 25.0
      },
      {
        "quarter": "Q4 2022",
        "baseline": 50.0,
        "actual": 50.0,
        "aiForecast": 50.0
      },
      {
        "quarter": "Q4 2023",
        "baseline": 75.0,
        "actual": 75.0,
        "aiForecast": 75.0
      },
      {
        "quarter": "Q4 2024",
        "baseline": 100.0,
        "actual": 100.0,
        "aiForecast": 100.0
      },
      {
        "quarter": "Q4 2025",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2026",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      },
      {
        "quarter": "Q4 2027",
        "baseline": 100,
        "actual": null,
        "aiForecast": 100
      }
    ],
    "milestones": [
      {
        "name": "Stage 1 Site Clearances (Design-Build)",
        "target": "Phase 1",
        "status": "Completed",
        "delay": "0 Days"
      },
      {
        "name": "RFI Resolution & Engineering Approvals (28 RFIs)",
        "target": "Phase 2",
        "status": "Completed",
        "delay": "+0 Days"
      },
      {
        "name": "Main Construction & Structural Erection",
        "target": "Phase 3",
        "status": "Pending",
        "delay": "+-15.0 Days"
      },
      {
        "name": "Final Commissioning & Handover",
        "target": "Phase 4",
        "status": "Pending",
        "delay": "+-15.0 Days"
      }
    ],
    "shapDrivers": [
      {
        "factor": "No dominant rule-based trigger",
        "impactPct": 35,
        "category": "Operational"
      },
      {
        "factor": "Low CPI (1.0) Snapshot Exposure",
        "impactPct": 25,
        "category": "Cost Performance"
      },
      {
        "factor": "RFI Overdue Rate (6.0%)",
        "impactPct": 20,
        "category": "Workflow Lag"
      }
    ],
    "cufIndicator": {
      "isHighCUF": true,
      "accuracyBoost": "+99.0% Completeness Precision",
      "externalFactors": [
        {
          "name": "Procurement Delay (0 Days)",
          "impact": "Schedule Impact (+0 Days)"
        },
        {
          "name": "Weather Impact (0 Days)",
          "impact": "Seasonal Slippage (+0 Days)"
        },
        {
          "name": "Pending Change Exposure (0.0% Budget)",
          "impact": "Financial Exposure Risk"
        }
      ]
    },
    "peers": [
      {
        "id": "MOSPI-RAIL-01",
        "name": "MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT-508 KM",
        "budget": 108000.0,
        "progress": 62.2,
        "delayMonths": -0.3,
        "costEscPct": 9.3,
        "risk": "Green"
      },
      {
        "id": "MOSPI-METRO-02",
        "name": "CHENNAI METRO RAIL PHASE-II DEVELOPMENT PROJECT",
        "budget": 63246.0,
        "progress": 55.7,
        "delayMonths": -0.6,
        "costEscPct": 11.2,
        "risk": "Green"
      },
      {
        "id": "MOSPI-RAIL-03",
        "name": "WESTERN DEDICATED FREIGHT CORRIDOR",
        "budget": 51101.0,
        "progress": 96.0,
        "delayMonths": -0.4,
        "costEscPct": 2.7,
        "risk": "Green"
      }
    ]
  }
];

export const AI_CHATBOT_PRESETS = [
  "Subansiri Hydroelectric Project me cost overrun kyu ho rha hai?",
  "Sample_new_projects.csv me kon se 2 Red High Risk projects hain?",
  "Which sectors have maximum delay in the MoSPI database?",
  "PAIMANA AI Model v1.0.0 ki prediction accuracy kya hai?",
];
