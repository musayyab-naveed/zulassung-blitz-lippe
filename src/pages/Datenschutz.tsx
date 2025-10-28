import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Database, UserCheck, FileText, Mail } from "lucide-react";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Datenschutz
            </h1>
            <p className="text-lg text-muted-foreground">
              Wir schützen Ihre persönlichen Daten
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Shield className="h-6 w-6 text-primary" />
                Einleitung und Überblick
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Wir haben diese Datenschutzerklärung (DSGVO) verfasst, um Ihnen gemäß den Vorgaben der Datenschutz-Grundverordnung (EU) 2016/679 und anwendbaren nationalen Gesetzen zu erklären, welche personenbezogenen Daten wir verarbeiten, zu welchen Zwecken und wie wir Ihre Daten schützen.
              </p>
              <p className="text-muted-foreground">
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TDDDG). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <UserCheck className="h-6 w-6 text-primary" />
                Verantwortliche Stelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Firma:</span>
                  KFZ-Sofortzulassungsdienst
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Inhaber:</span>
                  Mohammad Massyh Haqparwar
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Adresse:</span>
                  Werler Straße 68, 32105 Bad Salzuflen, Deutschland
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">E-Mail:</span>
                  <a href="mailto:info@sofortzulassung.com" className="text-primary hover:underline">
                    info@sofortzulassung.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Telefon:</span>
                  <a href="tel:+4915142462280" className="text-primary hover:underline">
                    +49 151 42462280
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Processing Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Database className="h-6 w-6 text-primary" />
                Übersicht der Datenverarbeitung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-secondary mb-3">Umfang der Verarbeitung personenbezogener Daten</h3>
                <p className="text-muted-foreground">
                  Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung der Nutzer. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-3">Rechtsgrundlage der Verarbeitung</h3>
                <p className="text-muted-foreground">
                  Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.
                </p>
                <p className="text-muted-foreground mt-2">
                  Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage.
                </p>
                <p className="text-muted-foreground mt-2">
                  Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-3">Datenlöschung und Speicherdauer</h3>
                <p className="text-muted-foreground">
                  Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus dann erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Specific Data Processing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Eye className="h-6 w-6 text-primary" />
                Erfassung von allgemeinen Daten und Informationen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Die Internetseite der KFZ-Sofortzulassungsdienst erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Serverlogfiles des Providers gespeichert.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Erfasste Daten umfassen:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP-Adresse des Nutzers</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer-URL (die zuvor besuchte Seite)</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Anzahl der Abrufe</li>
                </ul>
              </div>
              <p className="text-muted-foreground mt-4">
                Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in der technisch fehlerfreien Darstellung und der Optimierung unserer Website.
              </p>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Mail className="h-6 w-6 text-primary" />
                Kontaktaufnahme über Kontaktformular oder E-Mail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Bei der Kontaktaufnahme mit uns über das Kontaktformular oder per E-Mail werden die von Ihnen übermittelten personenbezogenen Daten von uns gespeichert. Diese Daten speichern wir ausschließlich zu dem Zweck, auf Ihre Anfrage zu antworten.
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Verarbeitete Daten:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer (falls angegeben)</li>
                  <li>Nachrichtentext</li>
                  <li>Fahrzeugdaten (falls im Rahmen der Zulassung angegeben)</li>
                </ul>
              </div>
              <p className="text-muted-foreground mt-4">
                Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO. Ihre Daten werden gelöscht, sofern Ihre Anfrage abschließend beantwortet wurde und die Löschung keinen gesetzlichen Aufbewahrungspflichten entgegensteht.
              </p>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <FileText className="h-6 w-6 text-primary" />
                Rechte der betroffenen Person
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-secondary mb-2">Auskunftsrecht (Art. 15 DSGVO)</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, von uns eine Bestätigung darüber zu verlangen, ob personenbezogene Daten von Ihnen verarbeitet werden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-2">Recht auf Berichtigung (Art. 16 DSGVO)</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, die Berichtigung Sie betreffender unrichtiger personenbezogener Daten zu verlangen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-2">Recht auf Löschung (Art. 17 DSGVO)</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, von uns zu verlangen, dass Sie betreffende personenbezogene Daten unverzüglich gelöscht werden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-2">Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, die Einschränkung der Verarbeitung der Sie betreffenden personenbezogenen Daten zu verlangen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-2">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-2">Recht auf Widerspruch (Art. 21 DSGVO)</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten Widerspruch einzulegen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SSL/TLS Encryption */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Shield className="h-6 w-6 text-primary" />
                SSL/TLS-Verschlüsselung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </CardContent>
          </Card>

          {/* Contact for Data Protection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Mail className="h-6 w-6 text-primary" />
                Kontakt zum Datenschutzbeauftragten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Bei Fragen zum Datenschutz können Sie sich jederzeit direkt an uns wenden. Wir beantworten Ihre Anfragen umgehend und umfassend.
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>
                  <strong>E-Mail:</strong>{" "}
                  <a href="mailto:info@sofortzulassung.com" className="text-primary hover:underline">
                    info@sofortzulassung.com
                  </a>
                </p>
                <p>
                  <strong>Telefon:</strong>{" "}
                  <a href="tel:+4915142462280" className="text-primary hover:underline">
                    +49 151 42462280
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Update Notice */}
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p className="mb-2">
              <strong>Stand der Datenschutzerklärung:</strong> 28. Oktober 2024
            </p>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, um sie stets an die aktuellen rechtlichen Anforderungen anzupassen oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Datenschutz;