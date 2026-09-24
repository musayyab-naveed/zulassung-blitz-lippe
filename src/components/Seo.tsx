import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OG_IMAGE, SITE_URL, getRouteSeo } from "@/content/seoRoutes";

interface SeoProps {
  /** Optional – ohne Angabe wird der Titel aus src/content/seoRoutes.ts genutzt */
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  robots?: string;
  structuredData?: Record<string, unknown>;
}

const ensureMetaTag = (selector: string, attrs: Record<string, string>, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const Seo = ({
  title: titleProp,
  description: descriptionProp,
  path,
  image = OG_IMAGE,
  robots: robotsProp,
  structuredData,
}: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const siteName = "KFZ-Sofortzulassung";
    const configuredSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined) || SITE_URL;
    const siteUrl = configuredSiteUrl.replace(/\/+$/, "");
    const routeSeo = getRouteSeo(path ?? location.pathname);
    const title = titleProp ?? routeSeo?.title ?? siteName;
    const description = descriptionProp ?? routeSeo?.description ?? "";
    // Ohne Suchparameter – sonst zeigt z. B. /angebot?vorgang=… auf sich selbst als eigene Seite
    const currentPath = path ?? location.pathname;
    const robots = robotsProp ?? (routeSeo?.noindex ? "noindex, follow" : "index, follow");
    const nichtIndexieren = robots.includes("noindex");
    const canonicalUrl = `${siteUrl}${currentPath.startsWith("/") ? currentPath : `/${currentPath}`}`;
    const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

    document.title = title;
    document.documentElement.lang = "de";

    ensureMetaTag('meta[name="description"]', { name: "description" }, description);
    ensureMetaTag('meta[name="author"]', { name: "author" }, siteName);
    ensureMetaTag('meta[name="robots"]', { name: "robots" }, robots);

    ensureMetaTag('meta[property="og:title"]', { property: "og:title" }, title);
    ensureMetaTag('meta[property="og:description"]', { property: "og:description" }, description);
    ensureMetaTag('meta[property="og:type"]', { property: "og:type" }, currentPath.startsWith("/ratgeber/") ? "article" : "website");
    ensureMetaTag('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    ensureMetaTag('meta[property="og:image"]', { property: "og:image" }, imageUrl);
    ensureMetaTag('meta[property="og:site_name"]', { property: "og:site_name" }, siteName);
    ensureMetaTag('meta[property="og:locale"]', { property: "og:locale" }, "de_DE");

    ensureMetaTag('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    ensureMetaTag('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    ensureMetaTag('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    ensureMetaTag('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);
    ensureMetaTag('meta[name="twitter:url"]', { name: "twitter:url" }, canonicalUrl);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (nichtIndexieren) {
      canonicalLink?.remove();
      canonicalLink = null;
    } else if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink?.setAttribute("href", canonicalUrl);

    const existingSchema = document.head.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"][data-seo="page"]'
    );

    if (structuredData) {
      const schemaScript = existingSchema ?? document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.setAttribute("data-seo", "page");
      schemaScript.textContent = JSON.stringify(structuredData);
      if (!existingSchema) {
        document.head.appendChild(schemaScript);
      }
    } else if (existingSchema) {
      existingSchema.remove();
    }
  }, [titleProp, descriptionProp, path, image, robotsProp, structuredData, location.pathname]);

  return null;
};

export default Seo;
