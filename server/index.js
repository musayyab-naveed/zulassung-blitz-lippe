import crypto from "node:crypto";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT || 8787);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",").map((entry) => entry.trim())
      : true,
  })
);

app.use(
  express.json({
    limit: "20mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

const smtpHost = process.env.SMTP_HOST || "smtppro.zoho.com";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const smtpFrom = process.env.SMTP_FROM || smtpUser;
const leadReceiver = process.env.LEAD_RECEIVER || "info@sofortzulassung.com";
const calWebhookSecret = process.env.CAL_WEBHOOK_SECRET || "";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  requireTLS: !smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

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

function safeText(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "string") return value.trim() || "-";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function normalizeImageAttachments(body = {}) {
  const raw = Array.isArray(body.imageAttachments) ? body.imageAttachments : [];
  return raw
    .filter((item) => typeof item?.dataUrl === "string" && item.dataUrl.startsWith("data:"))
    .map((item, index) => {
      const matches = item.dataUrl.match(/^data:(.+?);base64,(.+)$/);
      if (!matches) return null;
      const contentType = String(item.type || matches[1] || "image/jpeg");
      const extension = contentType.split("/")[1] || "jpg";
      const safeName = String(item.name || `fahrzeugbild-${index + 1}.${extension}`)
        .replace(/[^\w.\-() ]/g, "_")
        .slice(0, 120);
      return {
        filename: safeName || `fahrzeugbild-${index + 1}.${extension}`,
        content: matches[2],
        encoding: "base64",
        contentType,
      };
    })
    .filter(Boolean);
}

function verifyCalSignature(req) {
  if (!calWebhookSecret) return true;

  const signatureHeader =
    req.header("x-cal-signature-256") ||
    req.header("x-cal-signature") ||
    req.header("cal-signature");

  if (!signatureHeader || !req.rawBody) return false;

  const received = signatureHeader.replace(/^sha256=/i, "").trim();
  const expected = crypto.createHmac("sha256", calWebhookSecret).update(req.rawBody).digest("hex");

  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

function flattenObject(value, prefix = "", result = []) {
  if (value === null || value === undefined) return result;

  if (typeof value !== "object") {
    result.push([prefix || "value", safeText(value)]);
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      flattenObject(item, `${prefix}[${index}]`, result);
    });
    return result;
  }

  Object.entries(value).forEach(([key, nested]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    flattenObject(nested, nextKey, result);
  });

  return result;
}

function extractCalLead(payload) {
  const attendee = Array.isArray(payload?.payload?.attendees) ? payload.payload.attendees[0] : undefined;
  const responses = payload?.payload?.responses || {};
  const metadata = payload?.payload?.metadata || {};
  const notes =
    responses?.notes ||
    responses?.additionalNotes ||
    responses?.zusaetzliche_notizen ||
    responses?.["Zusätzliche Notizen"] ||
    metadata?.notes ||
    metadata?.additionalNotes ||
    metadata?.zusaetzliche_notizen ||
    metadata?.["Zusätzliche Notizen"] ||
    payload?.payload?.notes;
  const eventType = payload?.triggerEvent || payload?.event || "cal.booking";

  return {
    eventType,
    bookingId: payload?.payload?.bookingId || payload?.payload?.uid || payload?.id,
    name: attendee?.name || responses.name || responses.fullName || responses.full_name,
    email: attendee?.email || responses.email,
    phone: attendee?.phoneNumber || responses.phone || responses.telefonnummer,
    startTime: payload?.payload?.startTime || payload?.payload?.start,
    endTime: payload?.payload?.endTime || payload?.payload?.end,
    location: payload?.payload?.location || payload?.payload?.eventType?.locations,
    responses,
    metadata,
    notes,
    raw: payload,
  };
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
  const fahrzeugbilder = Array.isArray(data.fahrzeugbilder) ? data.fahrzeugbilder : [];
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
      { label: "Bilder", value: fahrzeugbilder.length > 0 ? fahrzeugbilder.map((img) => img.name).join(", ") : "-" },
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

function formatLeadEmailHtml(lead) {
  if (String(lead.eventType || "").startsWith("website.")) {
    const data = lead.responses || {};
    const fahrzeugdaten = data.fahrzeugdaten || {};
    const services = Array.isArray(data.services) ? data.services : [];
    const fahrzeugbilder = Array.isArray(data.fahrzeugbilder) ? data.fahrzeugbilder : [];
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
          { label: "Bilder", value: fahrzeugbilder.length > 0 ? fahrzeugbilder.map((img) => img.name).join(", ") : "-" },
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
        ${renderHtmlSection("Übermittelt", [{ label: "Zeit", value: data.submittedAt }])}
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

function formatLeadEmail(lead) {
  if (String(lead.eventType || "").startsWith("website.")) {
    return formatWebsiteLeadEmail(lead);
  }

  const responseLines = flattenObject(lead.responses || {})
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  const metadataLines = flattenObject(lead.metadata || {})
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  const text = [
    "Neue Anfrage von der Website / Cal.com",
    "",
    `Ereignis: ${safeText(lead.eventType)}`,
    `Buchungs-ID: ${safeText(lead.bookingId)}`,
    `Name: ${safeText(lead.name)}`,
    `E-Mail: ${safeText(lead.email)}`,
    `Telefon: ${safeText(lead.phone)}`,
    `Termin Start: ${safeText(lead.startTime)}`,
    `Termin Ende: ${safeText(lead.endTime)}`,
    `Ort: ${safeText(lead.location)}`,
    "",
    "Website-Kontext (Paket/Ankauf):",
    safeText(lead.notes),
    "",
    "Formularfelder:",
    responseLines || "- Keine zusätzlichen Felder",
    "",
    "Metadaten:",
    metadataLines || "- Keine Metadaten",
  ].join("\n");

  return text;
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    smtpHost,
    smtpPort,
    smtpSecure,
    leadReceiver,
    smtpConfigured: Boolean(smtpUser && smtpPass && smtpFrom),
    webhookSecretConfigured: Boolean(calWebhookSecret),
  });
});

app.post("/api/smtp/test", async (_req, res) => {
  if (!smtpUser || !smtpPass || !smtpFrom) {
    return res.status(400).json({
      ok: false,
      error: "smtp_not_configured",
      detail: "SMTP_USER/SMTP_PASS/SMTP_FROM fehlt.",
    });
  }

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: leadReceiver,
      subject: "[SMTP Test] KFZ-Sofortzulassung",
      text: `SMTP Test erfolgreich.\nZeit: ${new Date().toISOString()}\nEmpfaenger: ${leadReceiver}`,
    });

    return res.status(200).json({ ok: true, message: "smtp_test_sent" });
  } catch (error) {
    console.error("SMTP test failed:", error);
    const mapped = mapSmtpError(error);
    return res.status(500).json({ ok: false, error: mapped.code, detail: mapped.detail, raw: mapped.raw });
  }
});

app.post("/api/lead", async (req, res) => {
  try {
    const attachments = normalizeImageAttachments(req.body || {});
    const lead = {
      eventType: req.body?.eventType || "website.manual",
      bookingId: req.body?.bookingId,
      name: req.body?.name,
      email: req.body?.email,
      phone: req.body?.phone,
      startTime: req.body?.startTime,
      endTime: req.body?.endTime,
      location: req.body?.location,
      responses: req.body || {},
    };

    await transporter.sendMail({
      from: smtpFrom,
      to: leadReceiver,
      replyTo: lead.email || undefined,
      subject: formatLeadSubject(lead),
      text: formatLeadEmail(lead),
      html: formatLeadEmailHtml(lead),
      attachments,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("SMTP send failed:", error);
    const mapped = mapSmtpError(error);
    res.status(500).json({ ok: false, error: mapped.code, detail: mapped.detail, raw: mapped.raw });
  }
});

app.post("/api/cal/webhook", async (req, res) => {
  try {
    if (!verifyCalSignature(req)) {
      return res.status(401).json({ ok: false, error: "invalid_signature" });
    }

    const lead = extractCalLead(req.body);

    await transporter.sendMail({
      from: smtpFrom,
      to: leadReceiver,
      replyTo: lead.email || undefined,
      subject: formatLeadSubject(lead),
      text: formatLeadEmail(lead),
      html: formatLeadEmailHtml(lead),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Cal webhook processing failed:", error);
    const mapped = mapSmtpError(error);
    return res.status(500).json({
      ok: false,
      error: "webhook_processing_failed",
      smtp: mapped,
    });
  }
});

app.listen(port, () => {
  console.log(`Lead API listening on http://localhost:${port}`);
});
