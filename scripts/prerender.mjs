/**
 * Erzeugt nach dem Vite-Build für jede Route eine eigene HTML-Datei mit
 * korrektem Titel, Beschreibung, Canonical, Open Graph und JSON-LD.
 *
 * Hintergrund: Die Seite ist eine Single-Page-App. Ohne diesen Schritt liefert
 * der Server für JEDE Unterseite dieselbe index.html aus – mit dem Titel der
 * Startseite und einem Canonical auf "/". Suchmaschinen behandeln die
 * Unterseiten dann als Duplikate der Startseite und indexieren sie nicht.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

// seoRoutes.ts ist TypeScript – wir lesen die benötigten Werte per Regex aus,
// damit der Build ohne zusätzlichen Transpiler auskommt.
const seoSource = readFileSync(join(__dirname, "..", "src", "content", "seoRoutes.ts"), "utf8");

const SITE_URL = "https://sofortzulassung.com";
const OG_IMAGE = "/og-image.jpg";

const routes = [];
const routeBlockRegex =
  /\{\s*path:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)*)",\s*description:\s*\n?\s*"((?:[^"\\]|\\.)*)",/g;
let match;
while ((match = routeBlockRegex.exec(seoSource)) !== null) {
  routes.push({
    path: match[1],
    title: match[2].replace(/\\"/g, '"'),
    description: match[3].replace(/\\"/g, '"'),
  });
}

if (routes.length === 0) {
  console.error("[prerender] Keine Routen gefunden – Abbruch, damit kein kaputtes HTML entsteht.");
  process.exit(1);
}

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = readFileSync(join(distDir, "index.html"), "utf8");

// Seiteninhalt als fertiges HTML (aus dem SSR-Build von src/entry-server.tsx).
// Ohne diesen Schritt steht im HTML nur ein leeres <div id="root"> – Crawler
// und KI-Systeme ohne JavaScript sehen dann keinen einzigen Satz Text.
const { render } = await import(
  pathToFileURL(join(__dirname, "..", "dist-ssr", "entry-server.js")).href
);

// Fragen und Antworten je Route. Dieselbe Datei nutzen auch die React-Seiten,
// damit Text und Auszeichnung nie auseinanderlaufen. Der Grund fuer das
// Einbetten hier: Suchmaschinen-Crawler und KI-Systeme, die kein JavaScript
// ausfuehren, sehen die Antworten sonst ueberhaupt nicht.
const faqByPath = JSON.parse(
  readFileSync(join(__dirname, "..", "src", "content", "faqSchema.json"), "utf8")
);

// Gemeinsames Organisations-/LocalBusiness-Schema für alle Seiten
const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "15:00", closes: "18:00" },
];

const localBusiness = {
  "@type": ["AutomotiveBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "KFZ-Sofortzulassung",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${OG_IMAGE}`,
  logo: `${SITE_URL}${OG_IMAGE}`,
  telephone: "+4915142462280",
  email: "info@sofortzulassung.com",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Bar, EC-Karte, PayPal, Rechnung, SEPA",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Werler Straße 68",
    postalCode: "32105",
    addressLocality: "Bad Salzuflen",
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 52.0828686, longitude: 8.7297261 },
  openingHoursSpecification: openingHours,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: 52,
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: [
    { "@type": "City", name: "Bad Salzuflen" },
    { "@type": "City", name: "Detmold" },
    { "@type": "City", name: "Lemgo" },
    { "@type": "City", name: "Lage" },
    { "@type": "City", name: "Herford" },
    { "@type": "AdministrativeArea", name: "Kreis Lippe" },
  ],
};

const breadcrumbFor = (route) => {
  if (route.path === "/") return null;
  const label = route.title.split(/[–|]/)[0].trim();
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE_URL}${route.path}` },
    ],
  };
};

let written = 0;

for (const route of routes) {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const isLegal = route.path === "/impressum" || route.path === "/datenschutz";

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
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "KFZ-Sofortzulassung",
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];

  const breadcrumb = breadcrumbFor(route);
  if (breadcrumb) graph.push(breadcrumb);

  const faqs = faqByPath[route.path];
  if (Array.isArray(faqs) && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

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
    html = html.replace(
      /<meta name="robots" content="[^"]*" \/>/,
      `<meta name="robots" content="noindex,follow" />`
    );
  }

  const inhalt = render(route.path);
  if (!inhalt || inhalt.length < 500) {
    console.error(`[prerender] Kaum Inhalt für ${route.path} – Abbruch.`);
    process.exit(1);
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${inhalt}</div>`);

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

console.log(`[prerender] ${written} Seiten mit Text, eigenen Meta-Daten und JSON-LD erzeugt.`);
