/**
 * Erzeugt nach dem Vite-Build für jede Route eine eigene HTML-Datei mit
 * korrektem Titel, Beschreibung, Canonical, Open Graph und JSON-LD.
 *
 * Hintergrund: Die Seite ist eine Single-Page-App. Ohne diesen Schritt liefert
 * der Server für JEDE Unterseite dieselbe index.html aus – mit dem Titel der
 * Startseite und einem Canonical auf "/". Suchmaschinen behandeln die
 * Unterseiten dann als Duplikate der Startseite und indexieren sie nicht.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import Beasties from "beasties";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

// Alles Seitenbezogene kommt aus dem SSR-Build von src/entry-server.tsx – also
// direkt aus den TypeScript-Quellen (seoRoutes.ts, strukturDaten.ts). Dadurch
// gibt es für Titel, Beschreibung, Bewertungszahl und FAQ nur EINE Quelle.
const { render, ROUTE_SEO, SITE_URL, OG_IMAGE, RATGEBER, RATGEBER_PFAD, localBusinessSchema, websiteSchema, seitenSchema } =
  await import(pathToFileURL(join(__dirname, "..", "dist-ssr", "entry-server.js")).href);

const routes = ROUTE_SEO;

if (routes.length === 0) {
  console.error("[prerender] Keine Routen gefunden – Abbruch, damit kein kaputtes HTML entsteht.");
  process.exit(1);
}

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = readFileSync(join(distDir, "index.html"), "utf8");

const localBusiness = localBusinessSchema();

// Tempo: Die Schriften der ersten Bildschirmhöhe sofort mitladen (sonst erst,
// nachdem das CSS da ist) …
const schriften = readdirSync(join(distDir, "assets")).filter((datei) =>
  /^(sora-latin-700|manrope-latin-(400|700))-normal-.*\.woff2$/.test(datei)
);
const schriftPreloads = schriften
  .map((datei) => `<link rel="preload" href="/assets/${datei}" as="font" type="font/woff2" crossorigin>`)
  .join("\n    ");

// … und nur das CSS, das für den sichtbaren Bereich nötig ist, direkt ins HTML
// schreiben. Der Rest lädt nach, ohne die Anzeige zu blockieren.
const beasties = new Beasties({
  path: distDir,
  publicPath: "/",
  preload: "swap",
  pruneSource: false,
  reduceInlineStyles: false,
  logLevel: "warn",
});

const breadcrumbFor = (route) => {
  if (route.path === "/") return null;
  const label = route.title.split(/[–|?:]/)[0].trim();
  const stufen = [{ name: "Startseite", item: `${SITE_URL}/` }];
  // Ratgeber-Artikel hängen unter der Ratgeber-Übersicht
  if (route.path.startsWith(`${RATGEBER_PFAD}/`)) {
    stufen.push({ name: "Ratgeber", item: `${SITE_URL}${RATGEBER_PFAD}` });
  }
  stufen.push({ name: label, item: `${SITE_URL}${route.path}` });
  return {
    "@type": "BreadcrumbList",
    itemListElement: stufen.map((stufe, index) => ({ "@type": "ListItem", position: index + 1, ...stufe })),
  };
};

let written = 0;

for (const route of routes) {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const isLegal = Boolean(route.noindex);

  const graph = [
    localBusiness,
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: route.title,
      description: route.description,
      inLanguage: "de-DE",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
    websiteSchema(),
  ];

  const breadcrumb = breadcrumbFor(route);
  if (breadcrumb) graph.push(breadcrumb);

  graph.push(...seitenSchema(route.path));

  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<meta name="twitter:url" content="[^"]*" \/>/,
      `<meta name="twitter:url" content="${canonical}" />`
    );

  if (isLegal) {
    html = html
      .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="noindex,follow" />`)
      .replace(/\s*<link rel="canonical" href="[^"]*" \/>/, "");
  }
  if (route.path.startsWith(`${RATGEBER_PFAD}/`)) {
    html = html.replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />');
  }

  const inhalt = render(route.path);
  if (!inhalt || inhalt.length < 500) {
    console.error(`[prerender] Kaum Inhalt für ${route.path} – Abbruch.`);
    process.exit(1);
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${inhalt}</div>`);

  html = html.replace("</head>", `  ${schriftPreloads}\n  </head>`);
  html = await beasties.process(html);

  // JSON-LD direkt vor </head> einfügen
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json" data-seo="static">${jsonLd}</script>\n  </head>`
  );

  // Flache Dateien (faq.html statt faq/index.html): Netlify liefert /faq dann
  // direkt aus, ohne 301-Umleitung auf /faq/ – sonst widerspricht die
  // ausgelieferte URL dem Canonical-Tag.
  if (route.path === "/") {
    writeFileSync(join(distDir, "index.html"), html, "utf8");
  } else {
    const target = join(distDir, `${route.path.replace(/^\//, "")}.html`);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html, "utf8");
  }
  written += 1;
}

// Fehlerseite für unbekannte Adressen (Netlify liefert sie mit Status 404 aus)
{
  const inhalt = render("/diese-seite-gibt-es-nicht");
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, "<title>Seite nicht gefunden | KFZ-Sofortzulassung</title>")
    .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex,follow" />')
    .replace(/\s*<link rel="canonical" href="[^"]*" \/>/, "")
    .replace('<div id="root"></div>', `<div id="root">${inhalt}</div>`);
  html = html.replace("</head>", `  ${schriftPreloads}\n  </head>`);
  html = await beasties.process(html);
  writeFileSync(join(distDir, "404.html"), html, "utf8");
}

// Sitemap aus denselben Routen erzeugen – neue Seiten und Artikel landen automatisch darin
const artikelDatum = new Map(RATGEBER.map((a) => [`${RATGEBER_PFAD}/${a.slug}`, a.aktualisiert]));
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes
    .filter((route) => !route.noindex)
    .map((route) => {
      const lastmod = artikelDatum.get(route.path);
      return `  <url>\n    <loc>${SITE_URL}${route.path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`;
    }),
  "</urlset>",
  "",
].join("\n");
writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");

console.log(`[prerender] ${written} Seiten mit Text, eigenen Meta-Daten und JSON-LD erzeugt.`);
