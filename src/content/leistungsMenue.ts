/**
 * Menüpunkte mit Aufklappliste im Kopf (Aufbau wie bei großen Zulassungsdiensten).
 * Bewusst ohne Preise – die stehen auf /preise.
 */
export interface MenuePunkt {
  name: string;
  href: string;
}

export const ZULASSUNGSSERVICE: MenuePunkt[] = [
  { name: "Auto anmelden", href: "/auto-anmelden" },
  { name: "Auto abmelden", href: "/auto-abmelden" },
  { name: "Auto ummelden", href: "/auto-ummelden" },
  { name: "Kurzzeit- & Ausfuhrkennzeichen", href: "/angebot?vorgang=sonder" },
  { name: "Saisonkennzeichen", href: "/ratgeber/saisonkennzeichen" },
  { name: "Hol- und Bringservice", href: "/preise" },
  { name: "eVB-Nummer beantragen", href: "/kfz-versicherung" },
  { name: "Für Firmen & Partner", href: "/gewerbekunden" },
];

/** Seiten, auf denen "Zulassungsservice" im Menü als aktiv markiert wird */
export const ZULASSUNGSSERVICE_PFADE = ["/preise", "/auto-anmelden", "/auto-abmelden", "/auto-ummelden", "/wunschkennzeichen", "/gewerbekunden"];
