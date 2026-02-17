import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { findPostBySlug } from "@/content/blogPosts";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock3, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = findPostBySlug(slug);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${post.title} | KFZ-Sofortzulassung`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image="/favicon.ico"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          inLanguage: "de-DE",
          author: {
            "@type": "Organization",
            name: "KFZ-Sofortzulassung",
          },
          publisher: {
            "@type": "Organization",
            name: "KFZ-Sofortzulassung",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `/blog/${post.slug}`,
          },
          keywords: post.keywords.join(", "),
        }}
      />
      <Header />

      <article className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button asChild variant="outline" size="sm">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zum Blog
              </Link>
            </Button>
          </div>

          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">{post.category}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-5 leading-tight">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-5 text-sm text-muted-foreground border-y py-4 mb-10">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <div className="space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-2xl font-bold text-secondary">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-foreground leading-8">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <section className="mt-10 p-6 rounded-xl border bg-muted/40 space-y-3">
            <h2 className="text-2xl font-bold text-secondary">Häufige Fragen</h2>
            {post.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-secondary">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </section>

          <section className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5">
            <h2 className="text-2xl font-bold text-secondary mb-3">Nächster Schritt</h2>
            <p className="text-muted-foreground mb-5">
              Sie möchten direkt starten? Wählen Sie Ihr Paket und buchen Sie Ihren Termin online.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="cta">
                <Link to="/angebot">
                  Jetzt beauftragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/fahrzeugankauf">Fahrzeugankauf ansehen</Link>
              </Button>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
