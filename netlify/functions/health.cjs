const { getSmtpConfig, json } = require("./_mail.cjs");

exports.handler = async () => {
  const config = getSmtpConfig();
  return json(200, {
    ok: true,
    smtpHost: config.smtpHost,
    smtpPort: config.smtpPort,
    smtpSecure: config.smtpSecure,
    leadReceiver: config.leadReceiver,
    smtpConfigured: Boolean(config.smtpUser && config.smtpPass && config.smtpFrom),
    webhookSecretConfigured: Boolean(process.env.CAL_WEBHOOK_SECRET),
  });
};
