const {
  getSmtpConfig,
  createTransport,
  mapSmtpError,
  formatLeadEmail,
  formatLeadEmailHtml,
  formatLeadSubject,
  parseJsonBody,
  json,
} = require("./_mail.cjs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  const config = getSmtpConfig();
  if (!config.smtpUser || !config.smtpPass || !config.smtpFrom) {
    return json(500, {
      ok: false,
      error: "smtp_not_configured",
      detail: "SMTP_USER/SMTP_PASS/SMTP_FROM fehlt in Netlify Environment Variables.",
    });
  }

  const body = parseJsonBody(event);
  const lead = {
    eventType: body?.eventType || "website.manual",
    bookingId: body?.bookingId,
    name: body?.name,
    email: body?.email,
    phone: body?.phone,
    startTime: body?.startTime,
    endTime: body?.endTime,
    location: body?.location,
    responses: body || {},
  };

  try {
    const transporter = createTransport(config);
    await transporter.sendMail({
      from: config.smtpFrom,
      to: config.leadReceiver,
      replyTo: lead.email || undefined,
      subject: formatLeadSubject(lead),
      text: formatLeadEmail(lead),
      html: formatLeadEmailHtml(lead),
    });
    return json(200, { ok: true });
  } catch (error) {
    const mapped = mapSmtpError(error);
    return json(500, { ok: false, error: mapped.code, detail: mapped.detail, raw: mapped.raw });
  }
};
