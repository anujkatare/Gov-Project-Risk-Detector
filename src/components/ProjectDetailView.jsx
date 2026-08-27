import React, { useState } from "react";
import { 
  ArrowLeft, AlertTriangle, Calendar, TrendingUp, DollarSign, 
  CheckCircle2, Clock, Activity, BarChart3, Layers, Compass, 
  Cpu, FileSpreadsheet, ShieldAlert, Sparkles, ChevronRight
} from "lucide-react";
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  Legend, BarChart, Bar, Cell
} from "recharts";

export default function ProjectDetailView({ project, onBack, onOpenAI }) {
  const [activeTab, setActiveTab] = useState("TabA"); // 'TabA', 'TabB', 'TabC'

  if (!project) return null;

  const badgeClass = project.riskBand === "Red" ? "badge-red" : project.riskBand === "Yellow" ? "badge-yellow" : "badge-green";

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px 64px 24px" }}>
      
      {/* Back button */}
      <button 
        onClick={onBack}
        className="btn-pill-secondary"
        style={{ marginBottom: "24px" }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Header Banner (Dark Elevated Coinbase Card) */}
      <div style={{
        backgroundColor: "var(--colors-surface-dark)",
        borderRadius: "var(--rounded-xl)",
        padding: "36px",
        marginBottom: "32px",
        color: "var(--colors-on-dark)",
        boxShadow: "var(--shadow-dark)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px"
      }}>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
            <span className="num-mono" style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.1)", 
              padding: "4px 12px", 
              borderRadius: "var(--rounded-pill)", 
              fontSize: "13px",
              color: "#93c5fd"
            }}>
              {project.id}
            </span>
            <span className="badge-pill" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff" }}>
              {project.sector}
            </span>
            <span className={`badge-pill ${badgeClass}`}>
              {project.statusBadge}
            </span>
          </div>

          <h1 className="display-lg" style={{ color: "#ffffff", marginBottom: "8px" }}>
            {project.name}
          </h1>

          <p style={{ fontSize: "14px", color: "var(--colors-on-dark-soft)" }}>
            Implementing Agency: <strong style={{ color: "#ffffff" }}>{project.agency}</strong> · State: <strong style={{ color: "#ffffff" }}>{project.state}</strong>
          </p>
        </div>

        {/* Prominent Risk Score Gauge Badge */}
        <div style={{
          backgroundColor: "var(--colors-surface-dark-elevated)",
          border: `2px solid ${project.riskBand === 'Red' ? '#cf202f' : project.riskBand === 'Yellow' ? '#d97706' : '#05b169'}`,
          borderRadius: "var(--rounded-xl)",
          padding: "24px 32px",
          textAlign: "center",
          minWidth: "200px"
        }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--colors-on-dark-soft)", marginBottom: "4px" }}>
            PAIMANA Risk Score
          </div>
          <div className="num-mono" style={{ 
            fontSize: "44px", 
            fontWeight: "700", 
            color: project.riskBand === 'Red' ? '#cf202f' : project.riskBand === 'Yellow' ? '#d97706' : '#05b169',
            lineHeight: 1
          }}>
            {project.riskScore}
            <span style={{ fontSize: "20px", color: "var(--colors-on-dark-soft)" }}>/100</span>
          </div>
          <div className={`badge-pill ${badgeClass}`} style={{ marginTop: "10px", fontSize: "11px" }}>
            {project.riskBand.toUpperCase()} RISK ALERT
          </div>
        </div>
      </div>

      {/* Key Performance Row (4 Metrics Cards) */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "20px", 
        marginBottom: "36px" 
      }}>
        {/* Metric 1: Original Cost vs Spent */}
        <div className="card-coinbase">
          <div style={{ fontSize: "13px", color: "var(--colors-muted)", fontWeight: "500", marginBottom: "8px" }}>
            Original Budget vs Spent
          </div>
          <div className="num-mono" style={{ fontSize: "24px", fontWeight: "700", color: "var(--colors-ink)" }}>
            ₹{project.originalCost.toLocaleString()} Cr
          </div>
          <div style={{ fontSize: "13px", color: "var(--colors-body)", marginTop: "4px" }}>
            Spent to Date: <strong className="num-mono">₹{project.currentSpent.toLocaleString()} Cr</strong>
          </div>
        </div>

        {/* Metric 2: Predicted Cost Overrun */}
        <div className="card-coinbase">
          <div style={{ fontSize: "13px", color: "var(--colors-muted)", fontWeight: "500", marginBottom: "8px" }}>
            Predicted Cost Overrun
          </div>
          <div className="num-mono" style={{ fontSize: "24px", fontWeight: "700", color: "var(--colors-semantic-down)" }}>
            ₹{project.predictedCost.toLocaleString()} Cr
          </div>
          <div style={{ fontSize: "13px", color: "var(--colors-semantic-down)", fontWeight: "600", marginTop: "4px" }}>
            +{project.costEscalationPct}% Escalation
          </div>
        </div>

        {/* Metric 3: Target vs Predicted Completion */}
        <div className="card-coinbase">
          <div style={{ fontSize: "13px", color: "var(--colors-muted)", fontWeight: "500", marginBottom: "8px" }}>
            Target vs Predicted Completion
          </div>
          <div className="num-mono" style={{ fontSize: "20px", fontWeight: "700", color: "var(--colors-ink)" }}>
            {project.originalDate} → {project.predictedDate}
          </div>
          <div style={{ fontSize: "13px", color: "var(--colors-semantic-yellow)", fontWeight: "600", marginTop: "4px" }}>
            +{project.delayMonths} Months Schedule Delay
          </div>
        </div>

        {/* Metric 4: Physical Progress Rate */}
        <div className="card-coinbase">
          <div style={{ fontSize: "13px", color: "var(--colors-muted)", fontWeight: "500", marginBottom: "8px" }}>
            Physical Progress Rate
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span className="num-mono" style={{ fontSize: "28px", fontWeight: "700", color: "var(--colors-primary)" }}>
              {project.physicalProgress}%
            </span>
            <span style={{ fontSize: "13px", color: "var(--colors-muted)" }}>
              vs {project.expectedProgress}% Expected
            </span>
          </div>
          {/* Progress Bar */}
          <div style={{
            width: "100%", height: "8px", borderRadius: "4px", backgroundColor: "var(--colors-surface-strong)",
            overflow: "hidden", marginTop: "8px"
          }}>
            <div style={{
              width: `${project.physicalProgress}%`, height: "100%", backgroundColor: "var(--colors-primary)",
              borderRadius: "4px"
            }} />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "2px solid var(--colors-hairline)",
        marginBottom: "32px",
        paddingBottom: "4px"
      }}>
        <button
          onClick={() => setActiveTab("TabA")}
          style={{
            padding: "12px 24px",
            borderRadius: "var(--rounded-pill)",
            border: "none",
            backgroundColor: activeTab === "TabA" ? "var(--colors-surface-dark)" : "transparent",
            color: activeTab === "TabA" ? "var(--colors-on-dark)" : "var(--colors-body)",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease"
          }}
        >
          <Activity size={16} /> Tab A: Predictive Analysis & Timeline Forecasting
        </button>

        <button
          onClick={() => setActiveTab("TabB")}
          style={{
            padding: "12px 24px",
            borderRadius: "var(--rounded-pill)",
            border: "none",
            backgroundColor: activeTab === "TabB" ? "var(--colors-surface-dark)" : "transparent",
            color: activeTab === "TabB" ? "var(--colors-on-dark)" : "var(--colors-body)",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease"
          }}
        >
          <Cpu size={16} /> Tab B: Driver Analysis & Explainable AI (SHAP)
        </button>

        <button
          onClick={() => setActiveTab("TabC")}
          style={{
            padding: "12px 24px",
            borderRadius: "var(--rounded-pill)",
            border: "none",
            backgroundColor: activeTab === "TabC" ? "var(--colors-surface-dark)" : "transparent",
            color: activeTab === "TabC" ? "var(--colors-on-dark)" : "var(--colors-body)",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease"
          }}
        >
          <Layers size={16} /> Tab C: Benchmarking & Peer Analytics
        </button>
      </div>

      {/* Tab A Content: Predictive Analysis & Timeline Forecasting */}
      {activeTab === "TabA" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Line Chart Component */}
          <div className="card-coinbase">
            <h3 className="display-md" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
              Cost & Schedule Variance Graph
            </h3>
            <p style={{ fontSize: "13px", color: "var(--colors-body)", marginBottom: "20px" }}>
              Line Chart showing Original Baseline Progress vs Actual Progress vs AI Predicted Forecast Curve
            </p>

            <div style={{ height: "340px", width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={project.timelineCurve} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
                  <YAxis unit="%" tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="baseline" 
                    name="Original Baseline Target (%)" 
                    stroke="#a8acb3" 
                    strokeDasharray="5 5" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Recorded Progress (%)" 
                    stroke="#0052ff" 
                    strokeWidth={3} 
                    dot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aiForecast" 
                    name="AI Predicted Forecast Curve (%)" 
                    stroke="#cf202f" 
                    strokeWidth={3} 
                    strokeDasharray="3 3"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Milestone Risk Status Table */}
          <div className="card-coinbase">
            <h3 className="display-md" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
              Milestone Risk Status
            </h3>
            <p style={{ fontSize: "13px", color: "var(--colors-body)", marginBottom: "20px" }}>
              Key engineering & regulatory milestones with completion confidence
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--colors-hairline)", color: "var(--colors-muted)", fontSize: "12px", textTransform: "uppercase" }}>
                    <th style={{ padding: "12px" }}>Milestone Name</th>
                    <th style={{ padding: "12px" }}>Target Completion</th>
                    <th style={{ padding: "12px" }}>Delay Slippage</th>
                    <th style={{ padding: "12px" }}>Status Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {project.milestones.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--colors-hairline-soft)" }}>
                      <td style={{ padding: "14px 12px", fontWeight: "600" }}>{m.name}</td>
                      <td className="num-mono" style={{ padding: "14px 12px" }}>{m.target}</td>
                      <td className="num-mono" style={{ padding: "14px 12px", color: m.delay !== "0 M" ? "var(--colors-semantic-down)" : "var(--colors-semantic-up)" }}>
                        {m.delay}
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        <span className={`badge-pill ${
                          m.status === 'Completed' ? 'badge-green' : m.status === 'High Delay Risk' ? 'badge-red' : 'badge-yellow'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab B Content: Driver Analysis & Explainable AI (SHAP Module) */}
      {activeTab === "TabB" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          <div className="card-coinbase">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <h3 className="display-md" style={{ fontSize: "20px", fontWeight: "600" }}>
                  Feature Impact Bar / Waterfall Chart (SHAP Module)
                </h3>
                <p style={{ fontSize: "13px", color: "var(--colors-body)", marginTop: "2px" }}>
                  Top risk contribution factors identified by the AI model for this project
                </p>
              </div>
              <span className="badge-pill badge-red">
                Explainable AI (XAI) Active
              </span>
            </div>

            <div style={{ height: "280px", width: "100%", marginTop: "12px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={project.shapDrivers} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
                  <XAxis type="number" unit="%" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="factor" tick={{ fontSize: 11 }} width={220} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                  />
                  <Bar dataKey="impactPct" name="Risk Contribution (%)" radius={[0, 8, 8, 0]}>
                    {project.shapDrivers.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "#cf202f" : index === 1 ? "#d97706" : "#0052ff"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CUF vs Non-CUF Impact Indicator */}
          <div style={{
            backgroundColor: "var(--colors-surface-dark)",
            color: "var(--colors-on-dark)",
            borderRadius: "var(--rounded-xl)",
            padding: "32px",
            boxShadow: "var(--shadow-dark)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={20} color="var(--colors-primary)" />
                <h4 style={{ fontSize: "18px", fontWeight: "600" }}>
                  CUF vs Non-CUF Impact Indicator (External Macro Variables)
                </h4>
              </div>
              <span className="badge-pill" style={{ backgroundColor: "rgba(0, 82, 255, 0.2)", color: "#60a5fa" }}>
                {project.cufIndicator.accuracyBoost}
              </span>
            </div>

            <p style={{ fontSize: "14px", color: "var(--colors-on-dark-soft)", marginBottom: "20px" }}>
              External environmental and commodity indicators (Monsoon rainfall indices, steel price inflation, tribunal stay orders) 
              integrated into the prediction pipeline to maximize model fidelity.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {project.cufIndicator.externalFactors.map((ef, idx) => (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: "var(--colors-surface-dark-elevated)",
                    borderRadius: "var(--rounded-md)",
                    padding: "16px",
                    borderLeft: "4px solid var(--colors-primary)"
                  }}
                >
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "#ffffff", marginBottom: "4px" }}>
                    {ef.name}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--colors-on-dark-soft)" }}>
                    {ef.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab C Content: Benchmarking & Peer Analytics */}
      {activeTab === "TabC" && (
        <div className="card-coinbase">
          <h3 className="display-md" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
            Peer Project Comparison Table
          </h3>
          <p style={{ fontSize: "13px", color: "var(--colors-body)", marginBottom: "20px" }}>
            Comparative analytics against 3 peer projects in the same sector & budget range
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--colors-hairline)", color: "var(--colors-muted)", fontSize: "12px", textTransform: "uppercase" }}>
                  <th style={{ padding: "12px" }}>Peer Project ID & Name</th>
                  <th style={{ padding: "12px" }}>Budget (Cr)</th>
                  <th style={{ padding: "12px" }}>Physical Progress</th>
                  <th style={{ padding: "12px" }}>Schedule Delay</th>
                  <th style={{ padding: "12px" }}>Cost Escalation</th>
                  <th style={{ padding: "12px" }}>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {/* Active Project Highlight Row */}
                <tr style={{ backgroundColor: "rgba(0, 82, 255, 0.05)", borderBottom: "2px solid var(--colors-primary)" }}>
                  <td style={{ padding: "16px 12px", fontWeight: "700" }}>
                    ⭐ {project.id} - {project.name} (THIS PROJECT)
                  </td>
                  <td className="num-mono" style={{ padding: "16px 12px", fontWeight: "700" }}>₹{project.originalCost} Cr</td>
                  <td className="num-mono" style={{ padding: "16px 12px", fontWeight: "700" }}>{project.physicalProgress}%</td>
                  <td className="num-mono" style={{ padding: "16px 12px", fontWeight: "700", color: "var(--colors-semantic-down)" }}>+{project.delayMonths} M</td>
                  <td className="num-mono" style={{ padding: "16px 12px", fontWeight: "700", color: "var(--colors-semantic-down)" }}>+{project.costEscalationPct}%</td>
                  <td style={{ padding: "16px 12px" }}>
                    <span className={`badge-pill ${badgeClass}`}>{project.riskBand}</span>
                  </td>
                </tr>

                {/* Peer rows */}
                {project.peers.map((peer) => (
                  <tr key={peer.id} style={{ borderBottom: "1px solid var(--colors-hairline-soft)" }}>
                    <td style={{ padding: "14px 12px", fontWeight: "600", color: "var(--colors-ink)" }}>
                      {peer.id} - {peer.name}
                    </td>
                    <td className="num-mono" style={{ padding: "14px 12px" }}>₹{peer.budget.toLocaleString()} Cr</td>
                    <td className="num-mono" style={{ padding: "14px 12px" }}>{peer.progress}%</td>
                    <td className="num-mono" style={{ padding: "14px 12px" }}>+{peer.delayMonths} M</td>
                    <td className="num-mono" style={{ padding: "14px 12px" }}>+{peer.costEscPct}%</td>
                    <td style={{ padding: "14px 12px" }}>
                      <span className={`badge-pill ${
                        peer.risk === 'High' ? 'badge-red' : peer.risk === 'Medium' ? 'badge-yellow' : 'badge-green'
                      }`}>
                        {peer.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Floating prompt button inside detail view */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button 
          onClick={onOpenAI}
          className="btn-pill-primary"
          style={{ padding: "14px 32px", fontSize: "16px", boxShadow: "0 8px 24px rgba(0, 82, 255, 0.3)" }}
        >
          <Sparkles size={18} /> Ask PAIMANA AI about {project.id}
        </button>
      </div>

    </div>
  );
}
