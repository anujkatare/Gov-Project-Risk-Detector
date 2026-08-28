// Telegram Bot Alert Service for PAIMANA AI

export const TELEGRAM_CONFIG = {
  chatId: "7613523329",
  botToken: "8891945925:AAEw7HUakcT3cCnOlCwzls8qtW1Bbmhued8",
  botUsername: "paimana_alert_bot"
};

/**
 * Send a project risk alert to Telegram Chat ID 8951589926
 * @param {Object} project - The project object
 * @param {string} triggerReason - Reason for dispatch ('Automated 85+ Threshold' | 'Manual Dispatch')
 */
export async function sendTelegramAlert(project, triggerReason = "Manual Dispatch") {
  const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

  const isCritical = project.riskScore >= 85;
  const alertHeader = isCritical
    ? `🚨 *PAIMANA AI CRITICAL RISK ALERT (85+ SCORE)* 🚨`
    : `⚠️ *PAIMANA AI PROJECT RISK REPORT* ⚠️`;

  const messageText = `${alertHeader}

📌 *Project ID:* \`${project.id}\`
🏗️ *Project Name:* *${project.name}*
🏛️ *Agency/Sector:* ${project.agency || project.sector}
📍 *State:* ${project.state}
🎯 *Attached Telegram Chat ID:* \`${TELEGRAM_CONFIG.chatId}\`

📊 *PAIMANA Risk Score:* *${project.riskScore}/100* (${project.riskBand.toUpperCase()} RISK)
💰 *Original Budget:* ₹${project.originalCost.toLocaleString()} Cr
🔮 *Predicted Final Cost:* ₹${project.predictedCost.toLocaleString()} Cr (+${project.costEscalationPct}% Escalation)
⏱️ *Predicted Schedule Slippage:* +${project.delayDays} Days (+${project.delayMonths} Months)
📈 *Physical Progress:* ${project.physicalProgress}% (vs ${project.expectedProgress}% Expected)

⚡ *Primary Risk Factors:*
${project.shapDrivers ? project.shapDrivers.map(d => `• ${d.factor} (${d.impactPct}% impact)`).join("\n") : `• Low CPI Snapshot (${project.cpi})\n• RFI Overdue Backlog (${project.overdueRfiRate}%)`}

📢 *Trigger Type:* ${triggerReason}
🕒 *Timestamp:* ${new Date().toLocaleString()}

_Direct executive alert dispatched to Chat ID ${TELEGRAM_CONFIG.chatId}_`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.chatId,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true, data };
    } else {
      console.error("Telegram API Error:", data);
      return { success: false, error: data.description || "Telegram API failed" };
    }
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Send summary alert for all projects with Risk Score >= 85
 */
export async function sendHighRiskSummaryAlert(projects) {
  const highRiskProjects = projects.filter((p) => p.riskScore >= 85);
  const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

  let projectListText = highRiskProjects.map(p =>
    `• *${p.id}* - ${p.name}\n  *Risk Score:* ${p.riskScore}/100 | *Cost Overrun:* +${p.costEscalationPct}% | *Delay:* +${p.delayDays} Days`
  ).join("\n\n");

  const messageText = `🚨 *PAIMANA AI PORTFOLIO HIGH RISK SUMMARY ALERT* 🚨

Target Chat ID: \`${TELEGRAM_CONFIG.chatId}\`
Detected *${highRiskProjects.length} Projects* breaching the *85/100 Risk Threshold*:

${projectListText}

⚡ _Automated Executive Escalation Notice from PAIMANA AI Engine_`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.chatId,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    return await response.json();
  } catch (err) {
    console.error("Error sending summary alert:", err);
    return { ok: false, error: err.message };
  }
}
