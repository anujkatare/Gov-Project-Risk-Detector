import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import HomeDashboard from "./components/HomeDashboard";
import ProjectDetailView from "./components/ProjectDetailView";
import AIChatbotDrawer from "./components/AIChatbotDrawer";
import { PROJECTS_DATA } from "./data/projectData";
import { Sparkles, ArrowUp } from "lucide-react";

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

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      // Search query
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

      // Sector filter
      if (selectedSector !== "All Sectors" && !p.sector.includes(selectedSector.replace(" & Power", "").replace("Roads & ", ""))) {
        return false;
      }

      // Ministry filter
      if (selectedMinistry !== "All Ministries" && p.ministry !== selectedMinistry) {
        return false;
      }

      // Risk filter
      if (selectedRisk !== "All Risks") {
        if (selectedRisk === "High Risk" && p.riskBand !== "Red") return false;
        if (selectedRisk === "Medium Risk" && p.riskBand !== "Yellow") return false;
        if (selectedRisk === "Low Risk" && p.riskBand !== "Green") return false;
      }

      // Cost filter
      if (selectedCostRange !== "All Budget Ranges") {
        if (selectedCostRange === "₹150 Cr - ₹500 Cr" && (p.originalCost < 150 || p.originalCost > 500)) return false;
        if (selectedCostRange === "₹500 Cr - ₹2000 Cr" && (p.originalCost < 500 || p.originalCost > 2000)) return false;
        if (selectedCostRange === "₹2000 Cr+" && p.originalCost < 2000) return false;
      }

      return true;
    });
  }, [searchQuery, selectedSector, selectedMinistry, selectedRisk, selectedCostRange]);

  // Selected project object for detail view
  const selectedProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];
  }, [selectedProjectId]);

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
            Ministry of Statistics and Programme Implementation (MoSPI) Infrastructure Analytics Division · Powered by Machine Learning & Explainable AI
          </p>
        </div>
      </footer>

    </div>
  );
}
