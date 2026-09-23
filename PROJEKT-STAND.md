# Projekt-Stand KFZ-Sofortzulassung

Kurzübergabe für die nächste Arbeitssitzung. Alles hier Beschriebene ist live.

## Basics
- Website: sofortzulassung.com (Netlify, baut automatisch bei jedem Push)
- Lokal starten: `npm run dev:web` → **Port 8090** (8080 ist vom Auto-Sniper-Bot belegt)
- Anfragen: **WhatsApp statt Kalender** (seit 23.09.2026). `/angebot` fragt max. 3 Dinge ab und
  baut daraus eine fertige WhatsApp-Nachricht an 01514 2462280. Cal.com ist komplett entfernt.
  Ankauf zusätzlich per Formular mit Fotos (geht per E-Mail über `/api/lead`).

## Was zuletzt gemacht wurde
- Geführter Assistent auf `/angebot` (ersetzt die alte Paketauswahl), Buchung in 3 Schritten
- Cal.com bekommt bei jeder Buchung den kompletten Kontext + "BITTE MITBRINGEN"-Checkliste
  in den Notizen → landet in Kunden-Mail und Kalendereintrag
- SEO-Grundlage: Prerendering (`scripts/prerender.mjs`) erzeugt pro Seite eigene HTML mit
  Titel/Canonical/Schema. Vorher sagte jede Unterseite Google "ich bin die Startseite".
- Schema mit 5,0★ / 46 Bewertungen, Öffnungszeiten, Koordinaten, allen Preisen
- SEO-Texte zentral in `src/content/seoRoutes.ts` (eine Quelle für React + Build-Schritt)
- **Preisseite `/preise`** gebaut: Preistabelle, Pakete im Detail, Zusatzleistungen,
  "enthalten / nicht enthalten", 7 Preis-Fragen mit FAQ-Auszeichnung für Google.
  Verlinkt aus Menü, Fußzeile, Startseite und FAQ; in der Sitemap eingetragen.
- **Preise stehen jetzt nur noch in `src/content/preise.ts`.** Preisseite, Buchungsseite
  `/angebot`, der Assistent und das Google-Schema holen sich die Zahlen von dort.
  Preisänderung = eine Zeile in dieser Datei, überall gleichzeitig korrekt.

## Angebot (Stand jetzt)
| Paket | Preis | Inhalt |
|---|---|---|
| SOFORT | ab 129 € | digital in ca. 20 Min, **Kennzeichen bringt der Kunde selbst mit** |
| BASIS | 129 € | nächster Werktag, Kennzeichen inklusive |
| PREMIUM | 159 € | wie BASIS + Hol-/Bringservice (max. ca. 10 Fahrminuten) oder Versand |
| BLITZABMELDUNG | 40 € | sofort vor Ort, braucht Sicherheitscodes (Zulassung ab 2015) |
| Fahrzeugankauf | kostenlos | Abmeldung beim Ankauf gratis |

Extras: Wunschkennzeichen +13 €, Feinstaubplakette +6 €
Nicht im Angebot: Kurzzeitkennzeichen, Ausfuhrkennzeichen, reine Schilderprägung
(Kennzeichen nur zusammen mit einer Zulassung, Prägung über Partner)

Öffnungszeiten: Mo–Fr 9–18 Uhr, Sa 15–18 Uhr

## Offene Aufgaben

### Im Google-Konto (macht der Betreiber selbst)
1. Buchungslink im Unternehmensprofil auf `sofortzulassung.com/angebot` setzen
2. Fotos ergänzen
3. Google Search Console anlegen + Sitemap `sofortzulassung.com/sitemap.xml` einreichen
   (enthält jetzt auch `/preise`)
4. **Profilnamen NICHT ändern** – die Keywords darin bringen Sichtbarkeit

### Neue Seiten (SEO, noch nicht gebaut)
Reihenfolge nach Wirkung:
1. ~~`/preise`~~ – **erledigt**
2. `/zulassungsstelle-bad-salzuflen` – "zulassungsstelle" ist mit 761 Anfragen der Top-Suchbegriff
3. "Samstags & ohne Termin" prominenter auf der Startseite
4. `/auto-abmelden` (242 Anfragen), `/wunschkennzeichen` (230 Anfragen)
5. Standortseiten Detmold, Lemgo, Herford

### Wichtigste Konkurrenz
- **Zulassungsservice Stavrou**, Radewiger Str. 28, Herford: 15 Min, ab 149,99 € "alles inklusive",
  57 Bewertungen mit 5,0, geöffnet bis 20 Uhr → direktester Wettbewerber.
  **Unser Vorteil: 129 € statt 149,99 €**
- Koring (Bad Salzuflen + Herford): 129 € inkl. Kennzeichen, Website war zeitweise offline
- Tönjes (direkt an der Zulassungsstelle): keine Preise sichtbar, samstags zu
- Kroschke (bundesweit): Online-Zulassung dauert 4 Werktage

Hinweis: Diese Liste ist unvollständig – Websuche findet lokale Google-Maps-Einträge
schlecht. Besser: im eigenen Google nachsehen und Screenshots nutzen.

## Zahlen aus dem Google-Unternehmensprofil (6 Monate)
- 9.295 Profilaufrufe, 3.024 Suchanfragen, 816 Interaktionen, 80 % mobil
- Top-Suchbegriffe: zulassungsstelle (761), kennzeichen bad salzuflen (360),
  auto abmelden (242), wunschkennzeichen (230), kfz zulassungsstelle (202)

## Google Analytics (angelegt am 24.09.2026)
- Konto „KFZ-Sofortzulassung" im Google-Konto kfz.sofortzulassung@gmail.com
- Property „sofortzulassung.com", Zeitzone Deutschland, Euro
- Web-Stream „Website sofortzulassung.com", **Mess-ID `G-ZVSXZ08HZ9`**, Stream-ID 15831551173
- Datenfreigabe an Google: nur „Technischer Support"; DSGVO-Datenverarbeitungsbedingungen akzeptiert
- **Noch NICHT auf der Website eingebaut** – erst zusammen mit einem Cookie-Banner
  (Analytics darf erst nach Zustimmung laden). Danach Datenschutzerklärung ergänzen.
