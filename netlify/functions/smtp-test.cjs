const { getSmtpConfig, createTransport, mapSmtpError, json } = require("./_mail.cjs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  const config = getSmtpConfig();
  if (!config.smtpUser || !config.smtpPass || !config.smtpFrom) {
    return json(400, {
      ok: false,
      error: "smtp_not_configured",
      detail: "SMTP_USER/SMTP_PASS/SMTP_FROM fehlt.",
    });
  }

  try {
    const transporter = createTransport(config);
    await transporter.sendMail({
      from: config.smtpFrom,
      to: config.leadReceiver,
      subject: "[SMTP Test] KFZ-Sofortzulassung",
      text: `SMTP Test erfolgreich.\nZeit: ${new Date().toISOString()}\nEmpfaenger: ${config.leadReceiver}`,
    });
    return json(200, { ok: true, message: "smtp_test_sent" });
  } catch (error) {
    const mapped = mapSmtpError(error);
    return json(500, { ok: false, error: mapped.code, detail: mapped.detail, raw: mapped.raw });
  }
};
