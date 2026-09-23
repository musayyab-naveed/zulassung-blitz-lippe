/**
 * Menüpunkte mit Aufklappliste im Kopf (Aufbau wie bei großen Zulassungsdiensten).
 * Bewusst ohne Preise – die stehen auf /preise.
 */
export interface MenuePunkt {
  name: string;
  href: string;
}

export const ZULASSUNGSSERVICE: MenuePunkt[] = [
  { name: "KFZ-Zulassung (neu & gebraucht)", href: "/preise" },
  { name: "Auto abmelden", href: "/auto-abmelden" },
  { name: "Auto ummelden & Umschreibung", href: "/auto-ummelden" },
  { name: "Wunschkennzeichen LIP, DT, LE", href: "/wunschkennzeichen" },
  { name: "Kurzzeit- & Ausfuhrkennzeichen", href: "/angebot?vorgang=sonder" },
  { name: "Hol- und Bringservice", href: "/preise" },
  { name: "eVB-Nummer beantragen", href: "/kfz-versicherung" },
  { name: "Für Firmen & Partner", href: "/gewerbekunden" },
];

/** Seiten, auf denen "Zulassungsservice" im Menü als aktiv markiert wird */
export const ZULASSUNGSSERVICE_PFADE = ["/preise", "/auto-abmelden", "/auto-ummelden", "/wunschkennzeichen", "/gewerbekunden"];
