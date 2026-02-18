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
    limit: "1mb",
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

function formatWebsiteLeadEmail(lead) {
  const data = lead.responses || {};
  const fahrzeugdaten = data.fahrzeugdaten || {};
  const services = Array.isArray(data.services) ? data.services : [];

  const lines = [
    "Neue Anfrage vom Website-Formular",
    "",
    "Service-Auswahl",
    `- Paket: ${safeText(data.paket)}`,
    `- Fahrzeugankauf: ${safeText(data.fahrzeugankauf)}`,
    `- Premium-Abwicklung: ${safeText(data.premiumAbwicklung)}`,
    `- Dienstleistungen: ${services.length ? services.join(", ") : "-"}`,
    "",
    "Fahrzeugdaten",
    `- Marke: ${safeText(fahrzeugdaten.marke)}`,
    `- Modell: ${safeText(fahrzeugdaten.modell)}`,
    `- Baujahr: ${safeText(fahrzeugdaten.baujahr)}`,
    `- Kilometerstand: ${safeText(fahrzeugdaten.kilometerstand)}`,
    "",
    "Kontakt",
    `- Name: ${safeText(lead.name)}`,
    `- E-Mail: ${safeText(lead.email)}`,
    `- Telefon: ${safeText(lead.phone)}`,
    "",
    "Termin",
    `- Start: ${safeText(lead.startTime)}`,
    `- Ende: ${safeText(lead.endTime)}`,
    `- Ort: ${safeText(lead.location)}`,
    "",
    "Zusätzliche Notizen",
    safeText(data.notes),
    "",
    "Meta",
    `- Anfrage-Typ: ${safeText(lead.eventType)}`,
    `- Anfrage-ID: ${safeText(lead.bookingId)}`,
    `- Übermittelt am: ${safeText(data.submittedAt)}`,
  ];

  return lines.join("\n");
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
      subject: `[Website] Neue Anfrage ${lead.name ? `- ${lead.name}` : ""}`,
      text: formatLeadEmail(lead),
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
      subject: `[Cal.com] Neue Buchung ${lead.name ? `- ${lead.name}` : ""}`,
      text: formatLeadEmail(lead),
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
