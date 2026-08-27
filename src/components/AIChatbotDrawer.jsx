import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, ArrowRight, Database } from "lucide-react";
import { AI_CHATBOT_PRESETS, PROJECTS_DATA } from "../data/projectData";

export default function AIChatbotDrawer({ isOpen, onClose, selectedProject }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! Main **PAIMANA AI Assistant** hoon. Main MoSPI ke 1,981 central infrastructure projects ke real-time database, delay predictions, aur cost overruns ke baare me aapke sawalon ke jawab de sakta hoon. Aap mujhse kya poochna chahte hain?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate Gemini AI Response Generation based on DB context
    setTimeout(() => {
      let aiResponseText = "";
      const qLower = query.toLowerCase();

      if (qLower.includes("subansiri") || qLower.includes("power-15")) {
        aiResponseText = `**Subansiri Lower Hydroelectric Project (MOSPI-POWER-15)**
- **Original Cost:** ₹6,285 Cr → **Predicted Final Cost:** ₹21,850 Cr (**+247.6% Overrun**)
- **Target Date:** Dec 2014 → **Predicted Completion:** Oct 2027 (**+154 Months Delay**)
- **Main 3 Risk Drivers (SHAP Analysis):**
  1. *Land Acquisition & RoW Clearances:* +35% Risk Contribution
  2. *Slow Physical Contractor Pace & Labor Deficit:* +25% Risk Contribution
  3. *Geological Flash Flood Monsoon Vulnerability:* +20% Risk Contribution`;
      } else if (qLower.includes("top 5") || qLower.includes("high-risk") || qLower.includes("energy")) {
        aiResponseText = `**Top High-Risk Projects in Energy & Infrastructure Sector:**
1. **SUBANSIRI LOWER HYDROELECTRIC PROJECT** (Risk Score: 84/100 | +247.6% Cost Overrun)
2. **DIBANG MULTIPURPOSE PROJECT** (Risk Score: 78/100 | +82.5% Cost Overrun)
3. **ZOJI-LA TUNNEL PROJECT** (Risk Score: 79/100 | +52.2% Cost Overrun)
4. **RAJASTHAN REFINERY PROJECT (HPCL)** (Risk Score: 64/100 | +69.1% Cost Overrun)
5. **MEJA THERMAL POWER STAGE-II** (Risk Score: 62/100 | +24.1% Cost Overrun)

Total **248 Projects** are currently flagged in **Red Risk Band** across the portfolio.`;
      } else if (qLower.includes("formula") || qLower.includes("score") || qLower.includes("algorithm")) {
        aiResponseText = `**PAIMANA AI Risk Scoring Model (v1.0.0):**
The Risk Score (0-100) is calculated using XGBoost & Gradient Boosted Decision Trees trained on MoSPI historical project snapshots:

$$ \\text{Risk Score} = 0.40 \\times (\\text{Predicted Cost Overrun \\%}) + 0.35 \\times (\\text{Predicted Delay Months}) + 0.25 \\times (\\text{RFI Overdue Rate}) $$

Projects scoring **> 75** are flagged as **Red (High Risk)**.`;
      } else if (qLower.includes("state") || qLower.includes("delay")) {
        aiResponseText = `**State-wise Delay Breakdown:**
- **Arunachal Pradesh:** 18 High-Risk Projects (Avg Delay: +22.4 Months)
- **Jammu & Kashmir:** 24 High-Risk Projects (Avg Delay: +19.8 Months)
- **West Bengal:** 29 High-Risk Projects (Avg Delay: +18.2 Months)
- **Maharashtra:** 38 High-Risk Projects (Avg Delay: +14.5 Months)`;
      } else {
        aiResponseText = `Database query processed successfully for **"${query}"**. 

Based on current database records across **1,981 central projects**:
- **Total Portfolio Cost Escalation:** +15.2% (+₹5.65 Lakh Cr)
- **Average Schedule Delay:** +14.2 Months
- **High Risk Count:** 248 Projects Red Flagged.

Aap specific Project ID (jaise \`MOSPI-POWER-15\` ya \`MOSPI-RAIL-01\`) ya Sector ke baare me bhi pooch sakte hain!`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponseText }]);
      setIsTyping(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      width: "440px",
      maxWidth: "100vw",
      backgroundColor: "var(--colors-surface-dark)",
      color: "var(--colors-on-dark)",
      zIndex: 2000,
      boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.4)",
      display: "flex",
      flexDirection: "column",
      borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
      animation: "slideInRight 0.25s ease-out"
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "var(--colors-surface-dark-elevated)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            backgroundColor: "var(--colors-primary)", display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: "600", fontSize: "16px", color: "#ffffff" }}>
              PAIMANA AI Assistant
            </div>
            <div style={{ fontSize: "11px", color: "var(--colors-on-dark-soft)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Database size={10} /> Connected to MoSPI Live SQLite DB
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--colors-on-dark-soft)",
            cursor: "pointer",
            padding: "6px",
            borderRadius: "50%"
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Preset Prompts horizontal scroll */}
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        backgroundColor: "var(--colors-surface-dark)",
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        scrollbarWidth: "none"
      }}>
        {AI_CHATBOT_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset)}
            style={{
              whiteSpace: "nowrap",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "var(--colors-on-dark)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "var(--rounded-pill)",
              padding: "6px 14px",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 82, 255, 0.3)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)"}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%"
            }}
          >
            {msg.sender === "ai" && (
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                backgroundColor: "var(--colors-primary)", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Bot size={14} color="white" />
              </div>
            )}

            <div style={{
              backgroundColor: msg.sender === "user" ? "var(--colors-primary)" : "var(--colors-surface-dark-elevated)",
              color: "#ffffff",
              padding: "12px 16px",
              borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              fontSize: "13.5px",
              lineHeight: 1.5,
              border: msg.sender === "ai" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
              whiteSpace: "pre-wrap"
            }}>
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                backgroundColor: "var(--colors-surface-strong)", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                color: "var(--colors-ink)"
              }}>
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", gap: "10px", alignSelf: "flex-start" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              backgroundColor: "var(--colors-primary)", display: "flex",
              alignItems: "center", justifyContent: "center"
            }}>
              <Bot size={14} color="white" />
            </div>
            <div style={{
              backgroundColor: "var(--colors-surface-dark-elevated)",
              padding: "12px 16px",
              borderRadius: "18px 18px 18px 4px",
              fontSize: "13px",
              color: "var(--colors-on-dark-soft)"
            }}>
              PAIMANA AI is searching database & computing SHAP vectors...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input Area */}
      <div style={{
        padding: "16px",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "var(--colors-surface-dark-elevated)"
      }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Ask AI about projects, delays, cost escalation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            style={{
              flex: 1,
              height: "44px",
              borderRadius: "var(--rounded-pill)",
              backgroundColor: "var(--colors-surface-dark)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              paddingLeft: "18px",
              paddingRight: "18px",
              fontSize: "14px",
              outline: "none"
            }}
          />
          <button
            onClick={() => handleSend()}
            className="btn-pill-primary"
            style={{ padding: "0 18px", height: "44px" }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
