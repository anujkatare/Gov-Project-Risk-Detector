import React from "react";
import { Search, Sparkles, AlertTriangle, ShieldCheck, Activity } from "lucide-react";

export default function Header({ searchQuery, setSearchQuery, onOpenAI, onGoHome, currentScreen }) {
  return (
    <header style={{
      backgroundColor: "var(--colors-surface-dark)",
      color: "var(--colors-on-dark)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "16px 32px",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px"
      }}>
        {/* Left: Brand Wordmark & Portal Title */}
        <div 
          onClick={onGoHome} 
          style={{ display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" }}
        >
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "var(--rounded-full)",
            backgroundColor: "var(--colors-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "content",
            placeContent: "center",
            fontWeight: "bold",
            color: "white",
            fontSize: "20px",
            boxShadow: "0 0 16px rgba(0, 82, 255, 0.4)"
          }}>
            <Activity size={22} color="white" />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "18px", 
                fontWeight: "600", 
                letterSpacing: "-0.5px",
                color: "#ffffff"
              }}>
                PAIMANA AI
              </span>
              <span className="badge-pill" style={{ 
                backgroundColor: "rgba(0, 82, 255, 0.2)", 
                color: "#60a5fa",
                border: "1px solid rgba(0, 82, 255, 0.4)",
                padding: "2px 8px",
                fontSize: "10px"
              }}>
                v2.0 PRO
              </span>
            </div>
            <p style={{ 
              fontSize: "12px", 
              color: "var(--colors-on-dark-soft)", 
              margin: 0, 
              letterSpacing: "0.2px" 
            }}>
              Infrastructure Early Warning System
            </p>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div style={{ flex: 1, maxWidth: "460px", position: "relative" }}>
          <Search 
            size={18} 
            color="var(--colors-muted)" 
            style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Search by Project ID, Name, State or Ministry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: "44px",
              paddingLeft: "46px",
              paddingRight: "16px",
              borderRadius: "var(--rounded-pill)",
              backgroundColor: "var(--colors-surface-dark-elevated)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--colors-on-dark)",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--colors-primary)"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.15)"}
          />
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {currentScreen === "detail" && (
            <button 
              onClick={onGoHome}
              className="btn-pill-dark"
              style={{ fontSize: "13px" }}
            >
              ← Back to Dashboard
            </button>
          )}

          <button 
            onClick={onOpenAI}
            className="btn-pill-primary"
            style={{
              boxShadow: "0 4px 14px rgba(0, 82, 255, 0.35)",
              padding: "10px 20px"
            }}
          >
            <Sparkles size={16} />
            <span>Ask PAIMANA AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
