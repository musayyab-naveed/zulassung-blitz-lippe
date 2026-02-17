import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title: string;
  description: string;
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
  title,
  description,
  path,
  image = "/favicon.ico",
  robots = "index, follow",
  structuredData,
}: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const siteName = "KFZ-Sofortzulassung";
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
    const siteUrl = configuredSiteUrl?.replace(/\/+$/, "") || window.location.origin;
    const currentPath = path ?? `${location.pathname}${location.search}`;
    const canonicalUrl = `${siteUrl}${currentPath.startsWith("/") ? currentPath : `/${currentPath}`}`;
    const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

    document.title = title;
    document.documentElement.lang = "de";

    ensureMetaTag('meta[name="description"]', { name: "description" }, description);
    ensureMetaTag('meta[name="author"]', { name: "author" }, siteName);
    ensureMetaTag('meta[name="robots"]', { name: "robots" }, robots);

    ensureMetaTag('meta[property="og:title"]', { property: "og:title" }, title);
    ensureMetaTag('meta[property="og:description"]', { property: "og:description" }, description);
    ensureMetaTag('meta[property="og:type"]', { property: "og:type" }, "website");
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
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

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
  }, [title, description, path, image, robots, structuredData, location.pathname, location.search]);

  return null;
};

export default Seo;
