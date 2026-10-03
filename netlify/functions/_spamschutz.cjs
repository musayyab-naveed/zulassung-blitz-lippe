/**
 * Spamschutz für /api/lead – ohne Captcha und ohne Fremdanbieter.
 * Die Formulare schicken ein unsichtbares Lockfeld ("zusatz") und die Ausfüllzeit ("dauer") mit.
 * Telefon- und E-Mail-Regeln müssen zu src/lib/spamschutz.ts passen.
 */

/** Nur diese Formulare der Website schicken Anfragen */
const ERLAUBTE_ANFRAGEN = new Set(["website.gewerbe", "website.ankauf"]);

/** Schneller füllt kein Mensch ein Formular aus – Programme schon */
const MINDEST_DAUER_MS = 1500;

function telefonGueltig(wert) {
  const roh = String(wert || "").trim();
  if (!/^[+0-9 ()/.-]+$/.test(roh)) return false;
  const ziffern = roh.replace(/\D/g, "");
  if (ziffern.length < 7 || ziffern.length > 17) return false;
  return roh.startsWith("+") || ziffern.startsWith("0");
}

function emailVerdaechtig(wert) {
  const email = String(wert || "").trim().toLowerCase();
  if (!email) return false;
  const teile = email.split("@");
  if (teile.length !== 2 || !/^[^\s@]+$/.test(teile[0]) || !/^[^\s@]+\.[a-z]{2,}$/.test(teile[1])) return true;
  const [lokal, domain] = teile;
  const punkte = lokal.split(".").length - 1;
  return (domain === "gmail.com" || domain === "googlemail.com") && punkte >= 3;
}

/**
 * null → echte Anfrage
 * { ergebnis: "programm" } → still verwerfen
 * { ergebnis: "ungueltig" } → Formular zeigt eine Fehlermeldung
 */
function pruefeAnfrage(body) {
  if (!ERLAUBTE_ANFRAGEN.has(body.eventType)) return { ergebnis: "programm", grund: "unbekannte Anfrage" };
  if (String(body.zusatz ?? "").trim() !== "") return { ergebnis: "programm", grund: "Lockfeld ausgefüllt" };
  if (typeof body.dauer !== "number" || body.dauer < MINDEST_DAUER_MS) {
    return { ergebnis: "programm", grund: "zu schnell ausgefüllt" };
  }
  if (!telefonGueltig(body.phone)) return { ergebnis: "ungueltig", grund: "Telefonnummer" };
  if (emailVerdaechtig(body.email)) return { ergebnis: "ungueltig", grund: "E-Mail-Adresse" };
  return null;
}

module.exports = { pruefeAnfrage, telefonGueltig, emailVerdaechtig };
