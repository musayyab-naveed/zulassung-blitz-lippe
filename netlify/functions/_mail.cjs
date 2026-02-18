const nodemailer = require("nodemailer");

function safeText(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "string") return value.trim() || "-";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function hasValue(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "" && value.trim() !== "-";
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function formatSectionLines(title, fields) {
  const visible = fields.filter((entry) => hasValue(entry.value));
  if (visible.length === 0) return [];
  return [title, ...visible.map((entry) => `- ${entry.label}: ${safeText(entry.value)}`), ""];
}

function isRedundantWebsiteNotes(value) {
  const text = String(value || "").trim();
  return text.startsWith("Vorauswahl Dienstleistungen:");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderHtmlSection(title, fields) {
  const visible = fields.filter((entry) => hasValue(entry.value));
  if (visible.length === 0) return "";
  const rows = visible
    .map(
      (entry) =>
        `<tr><td style="padding:6px 10px;color:#64748b;vertical-align:top;">${escapeHtml(entry.label)}</td><td style="padding:6px 10px;font-weight:600;color:#0f172a;">${escapeHtml(safeText(entry.value))}</td></tr>`
    )
    .join("");
  return `<table style="width:100%;border:1px solid #e2e8f0;border-radius:10px;margin:0 0 14px 0;border-collapse:separate;border-spacing:0;">
    <thead><tr><th colspan="2" style="text-align:left;padding:10px 12px;background:#f8fafc;color:#0f172a;font-size:15px;">${escapeHtml(
      title
    )}</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function getSmtpConfig() {
  const smtpHost = process.env.SMTP_HOST || "smtppro.zoho.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const smtpUser = process.env.SMTP_USER || "";
  const smtpPass = process.env.SMTP_PASS || "";
  const smtpFrom = process.env.SMTP_FROM || smtpUser;
  const leadReceiver = process.env.LEAD_RECEIVER || "info@sofortzulassung.com";
  return { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass, smtpFrom, leadReceiver };
}

function createTransport(config) {
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    requireTLS: !config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });
}

function mapSmtpError(error) {
  const code = error?.code || "SMTP_ERROR";
  const message = error?.message || "smtp_send_failed";

  if (code === "EAUTH") {
    return {
      code,
      detail: "SMTP Auth fehlgeschlagen. Prüfe SMTP_USER und Zoho App Password (SMTP_PASS).",
      raw: message,
    };
  }
  if (code === "ESOCKET" || code === "ECONNECTION") {
    return {
      code,
      detail: "SMTP Verbindung fehlgeschlagen. Prüfe SMTP_HOST/SMTP_PORT/Firewall.",
      raw: message,
    };
  }
  return {
    code,
    detail: "SMTP Versand fehlgeschlagen. Prüfe SMTP-Konfiguration.",
    raw: message,
  };
}

function getWebsiteLeadSummary(data) {
  const fahrzeugdaten = data?.fahrzeugdaten || {};
  const modelText = [fahrzeugdaten.marke, fahrzeugdaten.modell].filter(Boolean).join(" ");
  return {
    paket: safeText(data?.paket),
    fahrzeug: modelText || "-",
  };
}

function formatWebsiteLeadEmail(lead) {
  const data = lead.responses || {};
  const fahrzeugdaten = data.fahrzeugdaten || {};
  const services = Array.isArray(data.services) ? data.services : [];
  const notes = isRedundantWebsiteNotes(data.notes) ? "" : data.notes;

  const lines = [
    "Neue Anfrage vom Website-Formular",
    "",
    ...formatSectionLines("Service-Auswahl", [
      { label: "Paket", value: data.paket },
      { label: "Fahrzeugankauf", value: data.fahrzeugankauf },
      { label: "Premium-Abwicklung", value: data.premiumAbwicklung },
      { label: "Dienstleistungen", value: services.join(", ") },
    ]),
    ...formatSectionLines("Fahrzeugdaten", [
      { label: "Marke", value: fahrzeugdaten.marke },
      { label: "Modell", value: fahrzeugdaten.modell },
      { label: "Baujahr", value: fahrzeugdaten.baujahr },
      { label: "Kilometerstand", value: fahrzeugdaten.kilometerstand },
    ]),
    ...formatSectionLines("Kontakt", [
      { label: "Name", value: lead.name },
      { label: "E-Mail", value: lead.email },
      { label: "Telefon", value: lead.phone },
    ]),
    ...formatSectionLines("Termin", [
      { label: "Start", value: lead.startTime },
      { label: "Ende", value: lead.endTime },
      { label: "Ort", value: lead.location },
    ]),
    ...formatSectionLines("Zusätzliche Notizen", [{ label: "Notiz", value: notes }]),
    ...formatSectionLines("Übermittelt", [{ label: "Zeit", value: data.submittedAt }]),
  ];

  return lines.join("\n").trim();
}

function formatLeadEmail(lead) {
  if (String(lead.eventType || "").startsWith("website.")) {
    return formatWebsiteLeadEmail(lead);
  }
  return [
    "Neue Anfrage von der Website / Cal.com",
    `Ereignis: ${safeText(lead.eventType)}`,
    `Name: ${safeText(lead.name)}`,
    `E-Mail: ${safeText(lead.email)}`,
    `Telefon: ${safeText(lead.phone)}`,
    `Termin Start: ${safeText(lead.startTime)}`,
    `Termin Ende: ${safeText(lead.endTime)}`,
  ].join("\n");
}

function formatLeadEmailHtml(lead) {
  if (String(lead.eventType || "").startsWith("website.")) {
    const data = lead.responses || {};
    const fahrzeugdaten = data.fahrzeugdaten || {};
    const services = Array.isArray(data.services) ? data.services : [];
    const notes = isRedundantWebsiteNotes(data.notes) ? "" : data.notes;

    return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f1f5f9;margin:0;padding:20px;">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:20px;">
        <h2 style="margin:0 0 14px 0;color:#0f172a;">Neue Anfrage vom Website-Formular</h2>
        ${renderHtmlSection("Service-Auswahl", [
          { label: "Paket", value: data.paket },
          { label: "Fahrzeugankauf", value: data.fahrzeugankauf },
          { label: "Premium-Abwicklung", value: data.premiumAbwicklung },
          { label: "Dienstleistungen", value: services.join(", ") },
        ])}
        ${renderHtmlSection("Fahrzeugdaten", [
          { label: "Marke", value: fahrzeugdaten.marke },
          { label: "Modell", value: fahrzeugdaten.modell },
          { label: "Baujahr", value: fahrzeugdaten.baujahr },
          { label: "Kilometerstand", value: fahrzeugdaten.kilometerstand },
        ])}
        ${renderHtmlSection("Kontakt", [
          { label: "Name", value: lead.name },
          { label: "E-Mail", value: lead.email },
          { label: "Telefon", value: lead.phone },
        ])}
        ${renderHtmlSection("Termin", [
          { label: "Start", value: lead.startTime },
          { label: "Ende", value: lead.endTime },
          { label: "Ort", value: lead.location },
        ])}
        ${renderHtmlSection("Zusätzliche Notizen", [{ label: "Notiz", value: notes }])}
      </div>
    </body></html>`;
  }
  return `<pre style="font-family:Arial,sans-serif;white-space:pre-wrap;">${escapeHtml(
    formatLeadEmail(lead)
  )}</pre>`;
}

function formatLeadSubject(lead) {
  if (String(lead.eventType || "").startsWith("website.")) {
    const summary = getWebsiteLeadSummary(lead.responses || {});
    return `[Website] ${summary.paket} | ${summary.fahrzeug}`;
  }
  return `[Cal.com] Neue Buchung ${lead.name ? `- ${lead.name}` : ""}`;
}

function parseJsonBody(event) {
  if (!event?.body) return {};
  try {
    return JSON.parse(event.body);
  } catch {
    return {};
  }
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify(body),
  };
}

module.exports = {
  getSmtpConfig,
  createTransport,
  mapSmtpError,
  formatLeadEmail,
  formatLeadEmailHtml,
  formatLeadSubject,
  parseJsonBody,
  json,
};
