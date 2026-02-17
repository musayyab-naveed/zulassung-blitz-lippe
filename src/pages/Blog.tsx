import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { blogPosts } from "@/content/blogPosts";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Blog | KFZ-Zulassung, Abmeldung und Fahrzeugankauf"
        description="Ratgeber rund um KFZ-Zulassung, Abmeldung und Fahrzeugankauf in Bad Salzuflen und Kreis Lippe."
        path="/blog"
        image="/favicon.ico"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "KFZ-Sofortzulassung Blog",
          description: "Ratgeber rund um Zulassung, Abmeldung und Fahrzeugankauf",
          inLanguage: "de-DE",
          url: "/blog",
        }}
      />
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary text-primary-foreground py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 right-12 h-36 w-36 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute bottom-0 left-12 h-28 w-28 rounded-full bg-cyan-200/60 blur-2xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Ratgeber & Blog</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Praktische Anleitungen für KFZ-Zulassung, Abmeldung und Fahrzeugankauf in Bad Salzuflen.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="surface-card h-full flex flex-col">
                <CardHeader>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">{post.category}</p>
                  <CardTitle className="text-2xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-muted-foreground mb-5 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <Button asChild variant="cta" className="w-full">
                    <Link to={`/blog/${post.slug}`}>
                      Artikel lesen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
