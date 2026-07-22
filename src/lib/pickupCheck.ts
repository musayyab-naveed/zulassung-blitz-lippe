// Prüfung, ob eine Adresse im Abholbereich des Hol- & Bringservice liegt.
// Regel: maximal ca. 10 Minuten Fahrweg (einfache Strecke) ab Werler Straße 68,
// Bad Salzuflen – praktisch also der Raum Bad Salzuflen.

export interface PickupCheckResult {
  eligible: boolean;
  oneWayMinutes: number;
  roundTripMinutes: number;
  message: string;
}

export const MAX_ONE_WAY_MINUTES = 10;

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const CITY_MINUTE_MAP: Record<string, number> = {
  "bad salzuflen": 8,
  herford: 12,
  lage: 13,
  bielefeld: 16,
  lemgo: 18,
  detmold: 20,
};

export function checkPickupAddress(city: string, postalCode: string): PickupCheckResult {
  const normalizedCity = normalize(city);
  const plz = postalCode.trim();

  let oneWayMinutes = CITY_MINUTE_MAP[normalizedCity];
  if (!oneWayMinutes) {
    if (plz.startsWith("3210")) oneWayMinutes = 8; // Bad Salzufler PLZ-Bereich
    else if (plz.startsWith("321")) oneWayMinutes = 12;
    else if (plz.startsWith("320")) oneWayMinutes = 13;
    else if (plz.startsWith("336")) oneWayMinutes = 16;
    else oneWayMinutes = 20;
  }

  const eligible = oneWayMinutes <= MAX_ONE_WAY_MINUTES;

  return {
    eligible,
    oneWayMinutes,
    roundTripMinutes: oneWayMinutes * 2,
    message: eligible
      ? "Hol- und Bringservice ist möglich."
      : "Die Adresse liegt außerhalb unseres Abholbereichs (max. ca. 10 Minuten Fahrweg rund um Bad Salzuflen).",
  };
}
