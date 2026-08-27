import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import HomeDashboard from "./components/HomeDashboard";
import ProjectDetailView from "./components/ProjectDetailView";
import AIChatbotDrawer from "./components/AIChatbotDrawer";
import { PROJECTS_DATA } from "./data/projectData";
import { sendTelegramAlert, TELEGRAM_CONFIG } from "./services/telegramService";
import { Sparkles, Send, ShieldAlert, X } from "lucide-react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home"); // 'home' | 'detail'
  const [selectedProjectId, setSelectedProjectId] = useState("MOSPI-POWER-15");
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedMinistry, setSelectedMinistry] = useState("All Ministries");
  const [selectedRisk, setSelectedRisk] = useState("All Risks");
  const [selectedCostRange, setSelectedCostRange] = useState("All Budget Ranges");

  // AI Drawer State
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Automated 85+ Risk Alert State
  const [autoAlertProject, setAutoAlertProject] = useState(null);
  const [autoAlertStatus, setAutoAlertStatus] = useState("idle"); // 'idle' | 'sending' | 'sent'

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          p.id.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.ministry.toLowerCase().includes(q) ||
          p.sector.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      if (selectedSector !== "All Sectors" && !p.sector.includes(selectedSector.replace(" & Power", "").replace("Roads & ", ""))) {
        return false;
      }

      if (selectedMinistry !== "All Ministries" && p.ministry !== selectedMinistry) {
        return false;
      }

      if (selectedRisk !== "All Risks") {
        if (selectedRisk === "High Risk" && p.riskBand !== "Red") return false;
        if (selectedRisk === "Medium Risk" && p.riskBand !== "Yellow") return false;
        if (selectedRisk === "Low Risk" && p.riskBand !== "Green") return false;
      }

      if (selectedCostRange !== "All Budget Ranges") {
        if (selectedCostRange === "₹100 Cr - ₹10,000 Cr" && (p.originalCost < 100 || p.originalCost > 10000)) return false;
        if (selectedCostRange === "₹10,000 Cr - ₹50,000 Cr" && (p.originalCost < 10000 || p.originalCost > 50000)) return false;
        if (selectedCostRange === "₹50,000 Cr+" && p.originalCost < 50000) return false;
      }

      return true;
    });
  }, [searchQuery, selectedSector, selectedMinistry, selectedRisk, selectedCostRange]);

  // Selected project object for detail view
  const selectedProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];
  }, [selectedProjectId]);

  // Check for projects with Risk Score >= 85 on mount
  useEffect(() => {
    const highRisk = PROJECTS_DATA.find((p) => p.riskScore >= 85);
    if (highRisk) {
      setAutoAlertProject(highRisk);
    }
  }, []);

  const handleDispatchAutoTelegramAlert = async () => {
    if (!autoAlertProject) return;
    setAutoAlertStatus("sending");
    const res = await sendTelegramAlert(autoAlertProject, "Automated 85+ Risk Threshold Trigger");
    if (res.success) {
      setAutoAlertStatus("sent");
    } else {
      setAutoAlertStatus("idle");
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentScreen("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    setCurrentScreen("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--colors-canvas)" }}>
      
      {/* 85+ Risk Threshold Automated Telegram Alert Top Banner */}
      {autoAlertProject && (
        <div style={{
          backgroundColor: "#0a0b0d",
          color: "#ffffff",
          borderBottom: "2px solid var(--colors-semantic-down)",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          fontSize: "13.5px",
          zIndex: 1000,
          position: "relative"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="badge-pill badge-red" style={{ padding: "3px 10px", fontSize: "11px" }}>
              <ShieldAlert size={12} /> AUTOMATED BOT ALERT (&ge; 85 SCORE)
            </span>
            <span>
              Project <strong>{autoAlertProject.id} ({autoAlertProject.name})</strong> has breached the 85+ risk threshold (Score: <strong style={{ color: "#cf202f" }}>{autoAlertProject.riskScore}/100</strong>). Attached Telegram ID: <strong className="num-mono" style={{ color: "#38bdf8" }}>{TELEGRAM_CONFIG.chatId}</strong>.
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={handleDispatchAutoTelegramAlert}
              disabled={autoAlertStatus === "sending" || autoAlertStatus === "sent"}
              className="btn-pill-primary"
              style={{
                backgroundColor: autoAlertStatus === "sent" ? "#05b169" : "#0088cc",
                padding: "6px 16px",
                fontSize: "12px"
              }}
            >
              <Send size={13} /> {autoAlertStatus === "sending" ? "Dispatching Bot Alert..." : autoAlertStatus === "sent" ? `✅ Alert Dispatched to ${TELEGRAM_CONFIG.chatId}` : `Dispatch Telegram Alert to ${TELEGRAM_CONFIG.chatId}`}
            </button>

            <button 
              onClick={() => setAutoAlertProject(null)}
              style={{ background: "transparent", border: "none", color: "var(--colors-muted)", cursor: "pointer" }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAI={() => setIsAIOpen(true)}
        onGoHome={handleGoHome}
        currentScreen={currentScreen}
      />

      {/* Screen Views */}
      <main>
        {currentScreen === "home" ? (
          <HomeDashboard 
            projects={filteredProjects}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            selectedMinistry={selectedMinistry}
            setSelectedMinistry={setSelectedMinistry}
            selectedRisk={selectedRisk}
            setSelectedRisk={setSelectedRisk}
            selectedCostRange={selectedCostRange}
            setSelectedCostRange={setSelectedCostRange}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <ProjectDetailView 
            project={selectedProject}
            onBack={handleGoHome}
            onOpenAI={() => setIsAIOpen(true)}
          />
        )}
      </main>

      {/* Floating AI Assistant Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsAIOpen(!isAIOpen)}
        className="btn-pill-primary"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 1500,
          padding: "14px 24px",
          fontSize: "15px",
          boxShadow: "0 10px 30px rgba(0, 82, 255, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.3)"
        }}
      >
        <Sparkles size={18} />
        <span>Ask PAIMANA AI</span>
      </button>

      {/* Screen 3: AI Intelligence Assistant Drawer */}
      <AIChatbotDrawer 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        selectedProject={selectedProject}
      />

      {/* Footer */}
      <footer style={{
        backgroundColor: "var(--colors-surface-dark)",
        color: "var(--colors-on-dark-soft)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "40px 24px",
        marginTop: "80px",
        fontSize: "13px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ color: "#ffffff", fontWeight: "600", fontSize: "15px", marginBottom: "8px" }}>
            PAIMANA AI - Infrastructure Early Warning System
          </p>
          <p style={{ color: "var(--colors-muted-soft)" }}>
            Ministry of Statistics and Programme Implementation (MoSPI) Infrastructure Analytics Division · Telegram Executive Alerts Attached to Chat ID <strong>{TELEGRAM_CONFIG.chatId}</strong>
          </p>
        </div>
      </footer>

    </div>
  );
}
