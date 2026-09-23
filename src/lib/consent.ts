/**
 * Einwilligung für Google Analytics.
 *
 * Grundsatz: Ohne ausdrückliche Zustimmung wird Analytics überhaupt nicht geladen –
 * kein Skript, kein Cookie, keine Anfrage an Google. Erst nach "Akzeptieren" wird
 * gtag.js nachgeladen. Seitenwechsel innerhalb der Website erfasst Google Analytics 4
 * selbst ("Seitenaufrufe bei Änderungen des Browserverlaufs" ist im Web-Stream aktiv).
 */

export const GA_MEASUREMENT_ID = "G-ZVSXZ08HZ9";

const STORAGE_KEY = "cookie-einwilligung";
/** Nach einem Jahr wird erneut gefragt. */
const GUELTIGKEIT_MS = 365 * 24 * 60 * 60 * 1000;

export type Einwilligung = "akzeptiert" | "abgelehnt";

interface Gespeichert {
  wahl: Einwilligung;
  zeitpunkt: number;
}

/** Ereignis, mit dem die Fußzeile den Banner erneut öffnen kann. */
export const CONSENT_OEFFNEN_EVENT = "cookie-einwilligung-oeffnen";

export const leseEinwilligung = (): Einwilligung | null => {
  try {
    const roh = window.localStorage.getItem(STORAGE_KEY);
    if (!roh) return null;
    const daten = JSON.parse(roh) as Gespeichert;
    if (daten.wahl !== "akzeptiert" && daten.wahl !== "abgelehnt") return null;
    if (Date.now() - daten.zeitpunkt > GUELTIGKEIT_MS) return null;
    return daten.wahl;
  } catch {
    return null;
  }
};

export const speichereEinwilligung = (wahl: Einwilligung) => {
  try {
    const daten: Gespeichert = { wahl, zeitpunkt: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(daten));
  } catch {
    // Speicher nicht verfügbar (z. B. privates Fenster) – dann gilt die Wahl nur für diesen Besuch
  }
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let geladen = false;

export const ladeAnalytics = () => {
  if (geladen || typeof window === "undefined") return;
  geladen = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag erwartet das arguments-Objekt, nicht ein Array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const skript = document.createElement("script");
  skript.async = true;
  skript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(skript);
};

/**
 * Widerruf: Die Wahl wird gelöscht und die Analytics-Cookies dieser Domain entfernt.
 * Ein bereits geladenes Skript lässt sich nicht "entladen" – deshalb wird die Seite
 * danach neu geladen, damit ab sofort nichts mehr an Google geht.
 */
export const widerrufeEinwilligung = () => {
  speichereEinwilligung("abgelehnt");
  const domain = window.location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((eintrag) => {
    const name = eintrag.split("=")[0].trim();
    if (name.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  });
  if (geladen) window.location.reload();
};
