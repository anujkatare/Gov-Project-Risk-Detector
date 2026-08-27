import React from "react";
import { 
  Building2, TrendingUp, AlertTriangle, Clock, Filter, 
  MapPin, PieChart as PieIcon, ArrowUpRight, ChevronRight, ShieldAlert, Layers 
} from "lucide-react";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ScatterChart, Scatter, Cell, Legend, PieChart, Pie
} from "recharts";
import { 
  PORTFOLIO_KPIS, SECTORS, MINISTRIES, RISK_LEVELS, 
  COST_RANGES, STATE_RISK_HEATMAP, SECTORAL_RISK_DISTRIBUTION 
} from "../data/projectData";

export default function HomeDashboard({ 
  projects, 
  selectedSector, 
  setSelectedSector,
  selectedMinistry, 
  setSelectedMinistry,
  selectedRisk, 
  setSelectedRisk,
  selectedCostRange, 
  setSelectedCostRange,
  onSelectProject 
}) {
  // Sector distribution data formatted for Recharts
  const barChartData = SECTORAL_RISK_DISTRIBUTION.map((item) => ({
    name: item.sector.replace(" & Natural Gas", "").replace(" & High", ""),
    "High Risk": item.highRisk,
    "Medium Risk": item.medRisk,
    "Low Risk": item.lowRisk,
  }));

  // Scatter plot data for Original Cost vs Predicted Cost Overrun %
  const scatterData = projects.map((p) => ({
    id: p.id,
    name: p.name,
    originalCost: p.originalCost,
    predictedCost: p.predictedCost,
    overrunPct: p.costEscalationPct,
    riskScore: p.riskScore,
    riskBand: p.riskBand,
    color: p.riskBand === "Red" ? "#cf202f" : p.riskBand === "Yellow" ? "#d97706" : "#05b169"
  }));

  // Pie chart data for risk breakdown
  const pieData = [
    { name: "High Risk (Red)", value: 248, color: "#cf202f" },
    { name: "Medium Risk (Amber)", value: 612, color: "#d97706" },
    { name: "Low Risk (Green)", value: 1121, color: "#05b169" },
  ];

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px 64px 24px" }}>
      
      {/* Dark Editorial Hero Band matching Coinbase System */}
      <div style={{
        backgroundColor: "var(--colors-surface-dark)",
        borderRadius: "var(--rounded-xl)",
        padding: "40px",
        marginBottom: "32px",
        color: "var(--colors-on-dark)",
        boxShadow: "var(--shadow-dark)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle decorative glow */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,82,255,0.2) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="badge-pill badge-red" style={{ marginBottom: "16px", textTransform: "uppercase" }}>
            <ShieldAlert size={14} /> MoSPI Executive Risk Watch
          </div>
          <h1 className="display-hero" style={{ marginBottom: "12px", color: "#ffffff" }}>
            Infrastructure Early Warning System
          </h1>
          <p style={{ 
            fontSize: "17px", 
            color: "var(--colors-on-dark-soft)", 
            maxWidth: "760px",
            lineHeight: 1.6
          }}>
            Real-time machine learning portfolio intelligence monitoring 1,981 central infrastructure projects across India. 
            Detect cost escalation, timeline slip, and critical regulatory bottlenecks before budget exhaustion.
          </p>
        </div>
      </div>

      {/* 4 Top Metric KPI Cards */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
        gap: "20px", 
        marginBottom: "32px" 
      }}>
        {/* Card 1: Total Projects */}
        <div className="card-coinbase">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "14px", color: "var(--colors-muted)", fontWeight: "500" }}>
              Total Monitored Projects
            </span>
            <div style={{ 
              width: "36px", height: "36px", borderRadius: "var(--rounded-full)", 
              backgroundColor: "var(--colors-surface-strong)", display: "flex", 
              alignItems: "center", justifyContent: "center" 
            }}>
              <Building2 size={18} color="var(--colors-primary)" />
            </div>
          </div>
          <div className="num-mono" style={{ fontSize: "36px", fontWeight: "700", color: "var(--colors-ink)" }}>
            {PORTFOLIO_KPIS.totalProjects.toLocaleString()}
          </div>
          <div style={{ fontSize: "13px", color: "var(--colors-body)", marginTop: "6px" }}>
            Across 14 Central Ministries
          </div>
        </div>

        {/* Card 2: Cost Escalation */}
        <div className="card-coinbase">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "14px", color: "var(--colors-muted)", fontWeight: "500" }}>
              Aggregate Cost Escalation
            </span>
            <div style={{ 
              width: "36px", height: "36px", borderRadius: "var(--rounded-full)", 
              backgroundColor: "rgba(207, 32, 47, 0.1)", display: "flex", 
              alignItems: "center", justifyContent: "center" 
            }}>
              <TrendingUp size={18} color="var(--colors-semantic-down)" />
            </div>
          </div>
          <div className="num-mono" style={{ fontSize: "28px", fontWeight: "700", color: "var(--colors-ink)" }}>
            ₹{PORTFOLIO_KPIS.originalCostLakhCr}L Cr → ₹{PORTFOLIO_KPIS.revisedCostLakhCr}L Cr
          </div>
          <div style={{ fontSize: "13px", color: "var(--colors-semantic-down)", fontWeight: "600", marginTop: "6px" }}>
            +{PORTFOLIO_KPIS.costEscalationPct}% Cost Overrun (+₹5.65 Lakh Cr)
          </div>
        </div>

        {/* Card 3: High Risk Count */}
        <div className="card-coinbase" style={{ borderLeft: "4px solid var(--colors-semantic-down)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "14px", color: "var(--colors-muted)", fontWeight: "500" }}>
              High-Risk Projects Count
            </span>
            <div style={{ 
              width: "36px", height: "36px", borderRadius: "var(--rounded-full)", 
              backgroundColor: "rgba(207, 32, 47, 0.1)", display: "flex", 
              alignItems: "center", justifyContent: "center" 
            }}>
              <AlertTriangle size={18} color="var(--colors-semantic-down)" />
            </div>
          </div>
          <div className="num-mono" style={{ fontSize: "36px", fontWeight: "700", color: "var(--colors-semantic-down)" }}>
            {PORTFOLIO_KPIS.highRiskCount}
          </div>
          <div style={{ fontSize: "13px", color: "var(--colors-body)", marginTop: "6px" }}>
            Red Flags Alert (Cost/Delay &gt; 30%)
          </div>
        </div>

        {/* Card 4: Avg Schedule Delay */}
        <div className="card-coinbase">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "14px", color: "var(--colors-muted)", fontWeight: "500" }}>
              Average Schedule Delay
            </span>
            <div style={{ 
              width: "36px", height: "36px", borderRadius: "var(--rounded-full)", 
              backgroundColor: "rgba(217, 119, 6, 0.1)", display: "flex", 
              alignItems: "center", justifyContent: "center" 
            }}>
              <Clock size={18} color="var(--colors-semantic-yellow)" />
            </div>
          </div>
          <div className="num-mono" style={{ fontSize: "36px", fontWeight: "700", color: "var(--colors-semantic-yellow)" }}>
            +{PORTFOLIO_KPIS.avgScheduleDelayMonths} Months
          </div>
          <div style={{ fontSize: "13px", color: "var(--colors-body)", marginTop: "6px" }}>
            Weighted Avg Slippage
          </div>
        </div>
      </div>

      {/* Multi-Select Filter Bar */}
      <div style={{
        backgroundColor: "var(--colors-surface-soft)",
        border: "1px solid var(--colors-hairline)",
        borderRadius: "var(--rounded-xl)",
        padding: "20px 24px",
        marginBottom: "32px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "14px", color: "var(--colors-ink)" }}>
          <Filter size={16} color="var(--colors-primary)" />
          Filters:
        </div>

        {/* Sector Filter */}
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--rounded-pill)",
            border: "1px solid var(--colors-hairline)",
            backgroundColor: "white",
            fontSize: "13px",
            fontWeight: "500",
            outline: "none",
            cursor: "pointer"
          }}
        >
          {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Ministry Filter */}
        <select
          value={selectedMinistry}
          onChange={(e) => setSelectedMinistry(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--rounded-pill)",
            border: "1px solid var(--colors-hairline)",
            backgroundColor: "white",
            fontSize: "13px",
            fontWeight: "500",
            outline: "none",
            cursor: "pointer"
          }}
        >
          {MINISTRIES.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        {/* Risk Filter */}
        <select
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--rounded-pill)",
            border: "1px solid var(--colors-hairline)",
            backgroundColor: "white",
            fontSize: "13px",
            fontWeight: "500",
            outline: "none",
            cursor: "pointer"
          }}
        >
          {RISK_LEVELS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        {/* Cost Filter */}
        <select
          value={selectedCostRange}
          onChange={(e) => setSelectedCostRange(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--rounded-pill)",
            border: "1px solid var(--colors-hairline)",
            backgroundColor: "white",
            fontSize: "13px",
            fontWeight: "500",
            outline: "none",
            cursor: "pointer"
          }}
        >
          {COST_RANGES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Reset Filters button */}
        {(selectedSector !== "All Sectors" || selectedMinistry !== "All Ministries" || selectedRisk !== "All Risks" || selectedCostRange !== "All Budget Ranges") && (
          <button
            onClick={() => {
              setSelectedSector("All Sectors");
              setSelectedMinistry("All Ministries");
              setSelectedRisk("All Risks");
              setSelectedCostRange("All Budget Ranges");
            }}
            className="btn-pill-secondary"
            style={{ padding: "6px 14px", fontSize: "12px" }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Main Visual Section (Split Screen Grid) */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", 
        gap: "24px", 
        marginBottom: "40px" 
      }}>
        
        {/* Left Component: Geographical & Sectoral Risk Heatmap */}
        <div className="card-coinbase">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h3 className="display-md" style={{ fontSize: "20px", fontWeight: "600" }}>
                Geographical & Sectoral Risk Heatmap
              </h3>
              <p style={{ fontSize: "13px", color: "var(--colors-body)", marginTop: "2px" }}>
                High-risk project density across Indian States & Sectors
              </p>
            </div>
            <MapPin size={20} color="var(--colors-primary)" />
          </div>

          {/* India State Risk Cards Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(2, 1fr)", 
            gap: "10px",
            marginBottom: "24px"
          }}>
            {STATE_RISK_HEATMAP.slice(0, 6).map((st) => (
              <div 
                key={st.state}
                style={{
                  backgroundColor: "var(--colors-surface-soft)",
                  borderRadius: "var(--rounded-md)",
                  padding: "12px 14px",
                  borderLeft: `4px solid ${st.color}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontWeight: "600", fontSize: "13px" }}>{st.state}</div>
                  <div style={{ fontSize: "11px", color: "var(--colors-muted)" }}>{st.totalProjects} Projects</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="num-mono" style={{ fontWeight: "700", color: st.color, fontSize: "14px" }}>
                    {st.highRiskCount} High Risk
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--colors-muted)" }}>+{st.avgDelay}m Delay</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sectoral Breakdown Bar Chart */}
          <div style={{ height: "200px", marginTop: "12px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }} 
                />
                <Bar dataKey="High Risk" fill="#cf202f" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Medium Risk" fill="#d97706" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Low Risk" fill="#05b169" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Component: Overall Risk & Cost Overrun Distribution */}
        <div className="card-coinbase">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h3 className="display-md" style={{ fontSize: "20px", fontWeight: "600" }}>
                Risk & Cost Overrun Distribution
              </h3>
              <p style={{ fontSize: "13px", color: "var(--colors-body)", marginTop: "2px" }}>
                Original Budget vs Predicted Cost Escalation Scatter
              </p>
            </div>
            <PieIcon size={20} color="var(--colors-primary)" />
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ width: "160px", height: "160px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ flex: 1 }}>
              {pieData.map((pd) => (
                <div key={pd.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: pd.color }} />
                    <span>{pd.name}</span>
                  </div>
                  <span className="num-mono" style={{ fontWeight: "700", fontSize: "14px" }}>{pd.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scatter Chart for Cost Escalation vs Original Budget */}
          <div style={{ height: "180px", marginTop: "12px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis type="number" dataKey="originalCost" name="Original Cost" unit=" Cr" tick={{ fontSize: 11 }} />
                <YAxis type="number" dataKey="overrunPct" name="Cost Overrun" unit="%" tick={{ fontSize: 11 }} />
                <Tooltip 
                  cursor={{ strokeDasharray: "3 3" }} 
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div style={{ background: "white", padding: "10px 14px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", fontSize: "12px" }}>
                          <div style={{ fontWeight: "bold" }}>{data.name}</div>
                          <div>Original: ₹{data.originalCost} Cr</div>
                          <div>Predicted: ₹{data.predictedCost} Cr (+{data.overrunPct}%)</div>
                          <div style={{ color: data.color, fontWeight: "bold" }}>Risk Score: {data.riskScore}/100</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Projects" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`scatter-cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Table: Critical Projects Alert Table (RAG Flagged) */}
      <div className="card-coinbase" style={{ padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h3 className="display-md" style={{ fontSize: "22px", fontWeight: "600" }}>
              Critical Projects Alert Table (RAG Flagged)
            </h3>
            <p style={{ fontSize: "14px", color: "var(--colors-body)", marginTop: "4px" }}>
              Showing {projects.length} evaluated central infrastructure projects
            </p>
          </div>
          <span className="badge-pill badge-red">
            RAG Machine Learning Risk Model 1.0.0
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ 
                borderBottom: "2px solid var(--colors-hairline)", 
                color: "var(--colors-muted)", 
                fontSize: "12px", 
                textTransform: "uppercase", 
                letterSpacing: "0.5px" 
              }}>
                <th style={{ padding: "14px 16px" }}>Project ID</th>
                <th style={{ padding: "14px 16px" }}>Project Name</th>
                <th style={{ padding: "14px 16px" }}>Ministry</th>
                <th style={{ padding: "14px 16px" }}>Original Cost</th>
                <th style={{ padding: "14px 16px" }}>Predicted Final Cost</th>
                <th style={{ padding: "14px 16px" }}>Risk Score</th>
                <th style={{ padding: "14px 16px" }}>Status Flag</th>
                <th style={{ padding: "14px 16px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "var(--colors-muted)" }}>
                    No projects found matching the selected filters.
                  </td>
                </tr>
              ) : (
                projects.map((p) => {
                  const badgeClass = p.riskBand === "Red" ? "badge-red" : p.riskBand === "Yellow" ? "badge-yellow" : "badge-green";
                  return (
                    <tr 
                      key={p.id}
                      onClick={() => onSelectProject(p.id)}
                      style={{ 
                        borderBottom: "1px solid var(--colors-hairline-soft)",
                        cursor: "pointer",
                        transition: "background-color 0.15s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--colors-surface-soft)"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td className="num-mono" style={{ padding: "16px", fontWeight: "600", color: "var(--colors-primary)" }}>
                        {p.id}
                      </td>
                      <td style={{ padding: "16px", fontWeight: "600", color: "var(--colors-ink)", maxWidth: "280px" }}>
                        {p.name}
                        <div style={{ fontSize: "12px", color: "var(--colors-muted)", fontWeight: "normal", marginTop: "2px" }}>
                          {p.sector} · {p.state}
                        </div>
                      </td>
                      <td style={{ padding: "16px", color: "var(--colors-body)" }}>
                        {p.ministry}
                      </td>
                      <td className="num-mono" style={{ padding: "16px", color: "var(--colors-body)" }}>
                        ₹{p.originalCost.toLocaleString()} Cr
                      </td>
                      <td className="num-mono" style={{ padding: "16px", fontWeight: "700" }}>
                        ₹{p.predictedCost.toLocaleString()} Cr
                        <span style={{ fontSize: "11px", color: "var(--colors-semantic-down)", display: "block" }}>
                          (+{p.costEscalationPct}%)
                        </span>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span className="num-mono" style={{ fontWeight: "700", fontSize: "16px" }}>
                            {p.riskScore}/100
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span className={`badge-pill ${badgeClass}`}>
                          {p.riskBand} Risk
                        </span>
                      </td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(p.id);
                          }}
                          className="btn-pill-primary"
                          style={{ padding: "6px 16px", fontSize: "12px" }}
                        >
                          View Details <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
