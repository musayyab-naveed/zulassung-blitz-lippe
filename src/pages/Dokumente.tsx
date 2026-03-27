import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Seo from "@/components/Seo";

const documents = [
  {
    title: "Vollmacht für Zulassung",
    src: "/documents/Vollmacht_Zulassung.pdf",
    type: "pdf" as const,
  },
  {
    title: "SEPA-Lastschriftmandat",
    src: "/documents/SEPA_Lastschriftmandat.pdf",
    type: "pdf" as const,
  },
  {
    title: "Vollmacht zur Außerbetriebsetzung",
    src: "/documents/Antrag_AB_2026-03.pdf",
    type: "pdf" as const,
  },
];

const Dokumente = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Dokumente | Vollmacht, SEPA und Zulassungsformulare"
        description="Druckbare Dokumente für Zulassung, Außerbetriebsetzung und Kurzzeitkennzeichen im Kreis Lippe."
        path="/dokumente"
        image="/favicon.ico"
      />
      <Header />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="section-title mb-3">Dokumente</h1>
            <p className="section-subtitle max-w-3xl">
              Sie können die Dokumente direkt ausdrucken und selbst ausfüllen. Wenn Sie die Unterlagen nicht selbst
              ausfüllen möchten, halten wir die Dokumente auch vor Ort für Sie bereit und füllen sie gemeinsam mit
              Ihnen aus.
            </p>
          </div>

          <div className="space-y-12">
            {documents.map((document) => (
              <section key={document.title} className="space-y-4">
                <h2 className="text-2xl font-bold text-secondary">{document.title}</h2>
                {document.type === "pdf" ? (
                  <object
                    data={document.src}
                    type="application/pdf"
                    className="h-[980px] w-full rounded-2xl border border-border bg-white"
                  >
                    <iframe
                      src={document.src}
                      title={document.title}
                      className="h-[980px] w-full rounded-2xl border border-border bg-white"
                    />
                  </object>
                ) : (
                  <iframe
                    src={document.src}
                    title={document.title}
                    className="h-[920px] w-full rounded-2xl border border-border bg-white"
                  />
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dokumente;
