import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCard from "@/components/PriceCard";
import Seo from "@/components/Seo";
import { CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type PackageKey = "basis" | "premium" | "abmeldung" | "ankauf_only";

interface PackageDef {
  key: PackageKey;
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  buttonVariant?: "default" | "cta";
}

const PACKAGES: PackageDef[] = [
  {
    key: "basis",
    title: "BASIS",
    price: "129 €",
    features: [
      "Zulassung innerhalb von 24h",
      "Unterlagen vor Ort abgeben",
      "Verwaltungsgebühren inkl.",
      "Sie möchten Ihr altes Fahrzeug verkaufen? Wir kaufen es gerne an",
      "Kostenlose Abmeldung bei Ankauf",
    ],
    buttonText: "BASIS WÄHLEN",
    buttonVariant: "cta" as const,
  },
  {
    key: "premium",
    title: "PREMIUM",
    price: "159 €",
    popular: true,
    features: [
      "Alles vom BASIS",
      "Hol- und Bringservice möglich",
      "Express-Rückversand inklusive",
      "Sie möchten Ihr altes Fahrzeug verkaufen? Wir kaufen es gerne an",
      "Kostenlose Abmeldung bei Ankauf",
    ],
    buttonText: "PREMIUM WÄHLEN",
    buttonVariant: "cta" as const,
  },
  {
    key: "abmeldung",
    title: "ABMELDUNG",
    price: "30 €",
    features: [
      "Abmeldung innerhalb 24h",
      "Verwaltungsgebühren inkl.",
      "Sie möchten Ihr altes Fahrzeug verkaufen? Wir kaufen es gerne an",
      "Kostenlose Abmeldung bei Ankauf",
    ],
    buttonText: "ABMELDUNG WÄHLEN",
    buttonVariant: "cta" as const,
  },
  {
    key: "ankauf_only",
    title: "NUR FAHRZEUGVERKAUF",
    price: "0 €",
    features: [
      "Unverbindliche Ankaufanfrage ohne Zulassungspaket",
      "Fahrzeugdaten erfassen und Termin vereinbaren",
      "Fachgerechte Verwertung nicht fahrbereiter Fahrzeuge möglich",
    ],
    buttonText: "NUR FAHRZEUGVERKAUF WÄHLEN",
    buttonVariant: "cta" as const,
  },
];

const Angebot = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const wantsAnkaufFromParam = searchParams.get("ankauf") === "1";
  const [selectedPackageKey, setSelectedPackageKey] = useState<PackageKey | null>(null);
  const [sellDecision, setSellDecision] = useState<"yes" | "no" | null>(null);
  const [sellVehicleData, setSellVehicleData] = useState({
    marke: "",
    modell: "",
    baujahr: "",
    kilometerstand: "",
  });

  const [pickupChoice, setPickupChoice] = useState<"pickup" | "shipping" | null>(null);
  const [pickupAddress, setPickupAddress] = useState({
    street: "",
    postalCode: "",
    city: "Bad Salzuflen",
  });
  const [pickupCheckResult, setPickupCheckResult] = useState<{
    eligible: boolean;
    oneWayMinutes: number;
    roundTripMinutes: number;
    message: string;
  } | null>(null);
  const [pickupCheckError, setPickupCheckError] = useState("");
  const [isSendingLead, setIsSendingLead] = useState(false);
  const [leadSendMessage, setLeadSendMessage] = useState("");
  const [leadSendError, setLeadSendError] = useState("");
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const selectedPackage = PACKAGES.find((pkg) => pkg.key === selectedPackageKey) ?? null;
  const isPremium = selectedPackageKey === "premium";
  const isAnkaufOnly = selectedPackageKey === "ankauf_only";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#63ccff" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  useEffect(() => {
    const paketParam = (searchParams.get("paket") || "").trim().toLowerCase();
    const packageFromParam = PACKAGES.find(
      (pkg) => pkg.key === paketParam || pkg.title.toLowerCase() === paketParam
    );

    if (!packageFromParam) return;
    if (selectedPackageKey === packageFromParam.key) return;

    setSelectedPackageKey(packageFromParam.key);
    setSellDecision(packageFromParam.key === "ankauf_only" ? "yes" : wantsAnkaufFromParam ? "yes" : null);
    setSellVehicleData({
      marke: "",
      modell: "",
      baujahr: "",
      kilometerstand: "",
    });
    setPickupChoice(null);
    setPickupCheckResult(null);
    setPickupCheckError("");
    setCurrentStep(2);
  }, [searchParams, selectedPackageKey, wantsAnkaufFromParam]);

  useEffect(() => {
    if (selectedPackageKey) return;
    setCurrentStep(1);
  }, [selectedPackageKey]);

  const normalize = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const selectPackage = (pkg: PackageDef) => {
    setSelectedPackageKey(pkg.key);
    setSellDecision(pkg.key === "ankauf_only" ? "yes" : wantsAnkaufFromParam ? "yes" : null);
    setSellVehicleData({
      marke: "",
      modell: "",
      baujahr: "",
      kilometerstand: "",
    });
    setPickupChoice(null);
    setPickupCheckResult(null);
    setPickupCheckError("");
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetWizard = () => {
    setSearchParams({});
    setSelectedPackageKey(null);
    setSellDecision(null);
    setSellVehicleData({
      marke: "",
      modell: "",
      baujahr: "",
      kilometerstand: "",
    });
    setPickupChoice(null);
    setPickupCheckResult(null);
    setPickupCheckError("");
    setLeadSendError("");
    setLeadSendMessage("");
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkPickupEligibility = () => {
    setPickupCheckError("");
    setPickupCheckResult(null);

    if (!pickupAddress.street || !pickupAddress.postalCode || !pickupAddress.city) {
      setPickupCheckError("Bitte vollständige Adresse eingeben.");
      return;
    }

    const city = normalize(pickupAddress.city);
    const postalCode = pickupAddress.postalCode.trim();

    const cityMinuteMap: Record<string, number> = {
      "bad salzuflen": 8,
      herford: 12,
      lage: 13,
      bielefeld: 16,
      lemgo: 18,
      detmold: 20,
    };

    let oneWayMinutes = cityMinuteMap[city];
    if (!oneWayMinutes) {
      if (postalCode.startsWith("321")) oneWayMinutes = 12;
      else if (postalCode.startsWith("320")) oneWayMinutes = 13;
      else if (postalCode.startsWith("336")) oneWayMinutes = 16;
      else oneWayMinutes = 20;
    }

    const roundTripMinutes = oneWayMinutes * 2;
    const eligible = roundTripMinutes <= 25;

    setPickupCheckResult({
      eligible,
      oneWayMinutes,
      roundTripMinutes,
      message: eligible
        ? "Hol- und Bringservice ist möglich."
        : "Hol- und Bringservice ist nicht möglich. Premium per Versand bleibt möglich.",
    });
  };

  const resetPickupCheck = () => {
    setPickupCheckResult(null);
    setPickupCheckError("");
  };

  const pickupRequirementMet =
    !isPremium ||
    pickupChoice === "shipping" ||
    (pickupChoice === "pickup" && pickupCheckResult?.eligible === true);

  const sellVehicleDataComplete =
    sellDecision !== "yes" ||
    Boolean(
      sellVehicleData.marke.trim() &&
        sellVehicleData.modell.trim() &&
        sellVehicleData.baujahr.trim()
    );

  const stepTwoCompleted = sellDecision !== null && sellVehicleDataComplete && pickupRequirementMet;

  const canBookAppointment = selectedPackage !== null && stepTwoCompleted;
  const leadApiUrl = import.meta.env.VITE_LEAD_API_URL || "/api/lead";

  const calendarServiceBase =
    selectedPackageKey === "abmeldung"
      ? "Abmeldung"
      : selectedPackageKey === "ankauf_only"
      ? "Fahrzeugankauf"
      : selectedPackageKey
      ? "Zulassung"
      : "";

  const calendarServices = [
    calendarServiceBase,
    ...(sellDecision === "yes" && calendarServiceBase !== "Fahrzeugankauf" ? ["Fahrzeugankauf"] : []),
  ].filter(Boolean);

  const calServicePrefill = calendarServices as string[];
  const premiumMode =
    !isPremium
      ? "nicht relevant"
      : pickupChoice === "pickup" && pickupCheckResult?.eligible
      ? "Hol- und Bringservice"
      : pickupChoice === "shipping"
      ? "Versand"
      : "noch nicht festgelegt";

  const vehicleDetails =
    sellDecision === "yes"
      ? [
          `Marke: ${sellVehicleData.marke || "-"}`,
          `Modell: ${sellVehicleData.modell || "-"}`,
          `Baujahr: ${sellVehicleData.baujahr || "-"}`,
          `Kilometerstand: ${sellVehicleData.kilometerstand || "-"}`,
        ].join(", ")
      : "kein Fahrzeugankauf";

  const calNotesPrefill = [
    `Vorauswahl Dienstleistungen: ${calServicePrefill.join(", ") || "-"}`,
    `Gewähltes Paket: ${selectedPackage?.title || "-"}`,
    `Fahrzeugankauf: ${sellDecision === "yes" ? "Ja" : "Nein"}`,
    `Fahrzeugdaten: ${vehicleDetails}`,
    `Premium-Abwicklung: ${premiumMode}`,
  ].join("\n");

  const calServiceQuery = new URLSearchParams();
  calServicePrefill.forEach((value) => {
    calServiceQuery.append("dienstleistung", value);
    calServiceQuery.append("service", value);
    calServiceQuery.append("Dienstleistung wählen", value);
    calServiceQuery.append("Dienstleistung waehlen", value);
    calServiceQuery.append("dienstleistung_waehlen", value);
    calServiceQuery.append("dienstleistung_wahlen", value);
  });
  calServiceQuery.append("notes", calNotesPrefill);
  calServiceQuery.append("Zusätzliche Notizen", calNotesPrefill);
  calServiceQuery.append("zusaetzliche_notizen", calNotesPrefill);
  calServiceQuery.append("additionalNotes", calNotesPrefill);
  const calLinkWithPrefill = `sofortzulassung/15min${calServiceQuery.toString() ? `?${calServiceQuery.toString()}` : ""}`;

  const sendOptionsByEmail = async () => {
    if (!selectedPackage || !stepTwoCompleted) {
      setLeadSendError("Bitte zuerst alle Pflichtangaben in Schritt 2 ausfüllen.");
      setLeadSendMessage("");
      return false;
    }

    setIsSendingLead(true);
    setLeadSendError("");
    setLeadSendMessage("");

    try {
      const response = await fetch(leadApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "website.options_form",
          paket: selectedPackage.title,
          fahrzeugankauf: sellDecision === "yes" ? "Ja" : "Nein",
          fahrzeugdaten: sellDecision === "yes" ? sellVehicleData : null,
          premiumAbwicklung: premiumMode,
          premiumAdresse: isPremium && pickupChoice === "pickup" ? pickupAddress : null,
          pickupPruefung: pickupCheckResult,
          services: calServicePrefill,
          notes: calNotesPrefill,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        let detail = "";
        try {
          const data = await response.json();
          detail = data?.detail || data?.error || "";
        } catch {
          try {
            const text = await response.text();
            detail = text?.slice(0, 180) || "";
          } catch {
            detail = "";
          }
        }
        throw new Error(detail || `send_failed (HTTP ${response.status})`);
      }

      setLeadSendMessage("Formulardaten wurden per E-Mail an info@sofortzulassung.com gesendet.");
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.toLowerCase().includes("failed to fetch")) {
        setLeadSendError(
          "Direktmail aktuell nicht erreichbar. Sie können trotzdem fortfahren; die Daten werden mit der Terminbuchung übertragen."
        );
      } else {
        setLeadSendError(
          `Direktmail aktuell nicht verfügbar.${message ? ` ${message}` : " Sie können trotzdem fortfahren."}`
        );
      }
      return false;
    } finally {
      setIsSendingLead(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Jetzt Beauftragen | KFZ-Zulassung, Premium oder Abmeldung"
        description="Wählen Sie Ihr Paket: Basis, Premium oder Abmeldung. Optional Fahrzeugankauf hinzufügen und Termin direkt online buchen."
        path="/angebot"
        image="/favicon.ico"
      />
      <Header />

      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Jetzt beauftragen</h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Klare 3-Schritt-Abwicklung: Paket wählen, Ankauf/Service klären, Termin buchen.
          </p>
          <div className="flex justify-center gap-3 text-sm flex-wrap">
            {[
              { id: 1, label: "1. Paket" },
              { id: 2, label: "2. Optionen" },
              { id: 3, label: "3. Termin" },
            ].map((step) => (
              <span
                key={step.id}
                className={`rounded-full px-4 py-2 ${
                  currentStep === step.id
                    ? "bg-white text-secondary font-semibold"
                    : "bg-primary-foreground/20"
                }`}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {currentStep === 1 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4">1. Paket auswählen</h2>
              <p className="text-lg text-muted-foreground">Wählen Sie nur die für Sie passende Serviceart.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PACKAGES.filter((pkg) => pkg.key !== "ankauf_only").map((pkg) => (
                <PriceCard
                  key={pkg.key}
                  title={pkg.title}
                  price={pkg.price}
                  popular={pkg.popular}
                  features={pkg.features}
                  buttonText={pkg.buttonText}
                  buttonVariant={pkg.buttonVariant}
                  onSelect={() => selectPackage(pkg)}
                />
              ))}
            </div>
            <Card className="mt-8 border-2 border-primary/30 bg-primary/5">
              <CardContent className="py-6 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-secondary">
                    Keines dieser Pakete? Ich möchte nur mein Fahrzeug verkaufen.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ohne Zulassungspaket direkt zur Ankaufanfrage mit Termin.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="cta"
                  onClick={() => selectPackage(PACKAGES.find((pkg) => pkg.key === "ankauf_only")!)}
                >
                  Nur Fahrzeugverkauf
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {selectedPackage && currentStep === 2 && (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-secondary">2. Optionen festlegen</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={resetWizard}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Paket ändern
                    </Button>
                  </div>
                  <p className="text-muted-foreground">
                    Gewählt: <span className="font-semibold text-secondary">{selectedPackage.title}</span>
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  {isAnkaufOnly ? (
                    <div className="rounded-lg border border-primary/25 bg-primary/5 p-4">
                      <Label className="text-base font-semibold text-secondary">
                        Nur Fahrzeugverkauf aktiv
                      </Label>
                      <p className="text-sm text-muted-foreground mt-2">
                        Sie haben „Nur Fahrzeugverkauf“ gewählt. Es wird kein Zulassungspaket gebucht.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Label className="text-base font-semibold text-secondary">
                        Möchten Sie Ihr altes Fahrzeug verkaufen?
                      </Label>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Gerne kaufen wir Ihr altes Fahrzeug an. Falls es nicht mehr fahrbereit ist,
                        kümmern wir uns auch um die fachgerechte Verwertung.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <Button
                          type="button"
                          variant={sellDecision === "yes" ? "cta" : "outline"}
                          onClick={() => setSellDecision("yes")}
                        >
                          Ja, Ankauf hinzufügen
                        </Button>
                        <Button
                          type="button"
                          variant={sellDecision === "no" ? "secondary" : "outline"}
                        onClick={() => {
                          setSellDecision("no");
                          setSellVehicleData({
                            marke: "",
                            modell: "",
                            baujahr: "",
                            kilometerstand: "",
                          });
                        }}
                        >
                          Nein, kein Ankauf
                        </Button>
                      </div>
                    </div>
                  )}

                  {sellDecision === "yes" && (
                    <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-4">
                      <Label className="text-base font-semibold text-secondary">
                        Basisfragen zum Fahrzeugankauf
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sell-marke">Marke</Label>
                          <Input
                            id="sell-marke"
                            placeholder="z. B. BMW"
                            value={sellVehicleData.marke}
                            onChange={(event) =>
                              setSellVehicleData((prev) => ({ ...prev, marke: event.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sell-modell">Modell</Label>
                          <Input
                            id="sell-modell"
                            placeholder="z. B. iX"
                            value={sellVehicleData.modell}
                            onChange={(event) =>
                              setSellVehicleData((prev) => ({ ...prev, modell: event.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sell-baujahr">Baujahr</Label>
                          <Input
                            id="sell-baujahr"
                            placeholder="z. B. 2022"
                            value={sellVehicleData.baujahr}
                            onChange={(event) =>
                              setSellVehicleData((prev) => ({ ...prev, baujahr: event.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sell-kilometerstand">Kilometerstand</Label>
                          <Input
                            id="sell-kilometerstand"
                            placeholder="z. B. 58.000 km"
                            value={sellVehicleData.kilometerstand}
                            onChange={(event) =>
                              setSellVehicleData((prev) => ({ ...prev, kilometerstand: event.target.value }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {isPremium && (
                    <div className="border-t pt-5 space-y-4">
                      <Label className="text-base font-semibold text-secondary">
                        Premium-Abwicklung wählen
                      </Label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant={pickupChoice === "pickup" ? "cta" : "outline"}
                          onClick={() => {
                            setPickupChoice("pickup");
                            resetPickupCheck();
                          }}
                        >
                          Hol- und Bringservice prüfen
                        </Button>
                        <Button
                          type="button"
                          variant={pickupChoice === "shipping" ? "secondary" : "outline"}
                          onClick={() => {
                            setPickupChoice("shipping");
                            resetPickupCheck();
                          }}
                        >
                          Premium per Versand
                        </Button>
                      </div>

                      {pickupChoice === "shipping" && (
                        <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Sie bleiben im Premium-Paket. Unterlagen per Versand zu uns,
                            nach Bearbeitung per Express zurück.
                          </p>
                          <div className="text-sm">
                            <p className="font-semibold text-secondary">Versandadresse:</p>
                            <p className="text-muted-foreground">
                              Kfz-Sofortzulassung
                              <br />
                              Werler Straße 68
                              <br />
                              32105 Bad Salzuflen
                            </p>
                          </div>
                          <div className="text-sm">
                            <p className="font-semibold text-secondary">Wichtige Unterlagen:</p>
                            <p className="text-muted-foreground">
                              Bitte Fahrzeugbrief und Fahrzeugschein sicher verpacken.
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Empfehlung: Versand mit Sendungsverfolgung und Versicherung (z. B. DHL/UPS).
                          </p>
                        </div>
                      )}

                      {pickupChoice === "pickup" && (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Prüfung mit Regel: Hin- und Rückweg zusammen maximal 25 Minuten.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="pickup-street">Straße und Hausnummer</Label>
                              <Input
                                id="pickup-street"
                                placeholder="z. B. Musterstraße 12"
                                value={pickupAddress.street}
                                onChange={(event) =>
                                  setPickupAddress((prev) => ({ ...prev, street: event.target.value }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pickup-postalCode">PLZ</Label>
                              <Input
                                id="pickup-postalCode"
                                placeholder="z. B. 32105"
                                value={pickupAddress.postalCode}
                                onChange={(event) =>
                                  setPickupAddress((prev) => ({ ...prev, postalCode: event.target.value }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pickup-city">Ort</Label>
                              <Input
                                id="pickup-city"
                                placeholder="z. B. Bad Salzuflen"
                                value={pickupAddress.city}
                                onChange={(event) =>
                                  setPickupAddress((prev) => ({ ...prev, city: event.target.value }))
                                }
                              />
                            </div>
                          </div>

                          <Button type="button" variant="cta" onClick={checkPickupEligibility}>
                            Adresse prüfen
                          </Button>

                          {pickupCheckError && <p className="text-sm text-destructive">{pickupCheckError}</p>}

                          {pickupCheckResult && (
                            <div
                              className={`rounded-lg border p-4 ${
                                pickupCheckResult.eligible
                                  ? "border-trust-green/40 bg-trust-green/10"
                                  : "border-destructive/40 bg-destructive/10"
                              }`}
                            >
                              <p className="font-medium text-secondary">{pickupCheckResult.message}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Fahrzeit: ca. {pickupCheckResult.oneWayMinutes} Min. je Strecke (gesamt ca. {pickupCheckResult.roundTripMinutes} Min.)
                              </p>
                              {!pickupCheckResult.eligible && (
                                <div className="mt-3">
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => {
                                      setPickupChoice("shipping");
                                      setPickupCheckResult(null);
                                    }}
                                  >
                                    Statt Abholung: Premium per Versand
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t pt-5">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <p className="text-sm text-muted-foreground">
                        Diese Angaben jetzt direkt an <span className="font-semibold">info@sofortzulassung.com</span> senden.
                      </p>
                    </div>
                    {leadSendMessage && <p className="mt-3 text-sm text-trust-green">{leadSendMessage}</p>}
                    {leadSendError && <p className="mt-3 text-sm text-destructive">{leadSendError}</p>}
                  </div>
                  <div className="border-t pt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button type="button" variant="outline" onClick={resetWizard}>
                      Zurück zu Paketen
                    </Button>
                    <Button
                      type="button"
                      variant="cta"
                      disabled={!stepTwoCompleted || isSendingLead}
                      onClick={async () => {
                        await sendOptionsByEmail();
                        setCurrentStep(3);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {isSendingLead ? "Wird gesendet..." : "Senden & weiter zu Termin"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </section>
      )}

      {selectedPackage && currentStep === 3 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-secondary">3. Termin buchen</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setCurrentStep(2);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Zurück zu Optionen
                    </Button>
                    <Button type="button" variant="outline" onClick={resetWizard}>
                      Paket neu wählen
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground">Wählen Sie jetzt Ihren passenden Termin.</p>
              </CardHeader>
              <CardContent>
                {canBookAppointment ? (
                  <>
                    <div className="mb-6 rounded-xl border bg-background p-4 text-sm text-muted-foreground">
                      <p>
                        Paket: <span className="font-semibold text-secondary">{selectedPackage?.title}</span>
                      </p>
                      <p>
                        Fahrzeugankauf:{" "}
                        <span className="font-semibold text-secondary">
                          {sellDecision === "yes" ? "inklusive" : "exklusive"}
                        </span>
                      </p>
                      {sellDecision === "yes" && (
                        <p>
                          Ankaufdaten:{" "}
                          <span className="font-semibold text-secondary">
                            {sellVehicleData.marke} {sellVehicleData.modell}, Baujahr {sellVehicleData.baujahr}
                            {sellVehicleData.kilometerstand ? `, ${sellVehicleData.kilometerstand}` : ""}
                          </span>
                        </p>
                      )}
                      {isPremium && (
                        <p>
                          Premium-Zustellung:{" "}
                          <span className="font-semibold text-secondary">
                            {pickupChoice === "pickup" && pickupCheckResult?.eligible
                              ? "Abholung inklusive"
                              : "Versand"}
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="bg-background rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-hidden">
                      <Cal
                        namespace="15min"
                        calLink={calLinkWithPrefill}
                        style={{ width: "100%", height: "70vh", overflow: "scroll" }}
                        config={{
                          layout: "month_view",
                          theme: "light",
                          dienstleistung: calServicePrefill,
                          service: calServicePrefill,
                          services: calServicePrefill,
                          "Dienstleistung wählen": calServicePrefill,
                          "Dienstleistung waehlen": calServicePrefill,
                          dienstleistung_waehlen: calServicePrefill,
                          dienstleistung_wahlen: calServicePrefill,
                          fahrzeugankauf: sellDecision === "yes" ? "Ja" : "Nein",
                          ankauf: sellDecision === "yes" ? "Ja" : "Nein",
                          notes: calNotesPrefill,
                          additionalNotes: calNotesPrefill,
                          "Zusätzliche Notizen": calNotesPrefill,
                          zusaetzliche_notizen: calNotesPrefill,
                          metadata: {
                            paket: selectedPackage?.title || "-",
                            dienstleistungen: calServicePrefill.join(", ") || "-",
                            fahrzeugankauf: sellDecision === "yes" ? "Ja" : "Nein",
                            fahrzeugdaten: vehicleDetails,
                            premiumAbwicklung: premiumMode,
                          },
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <Card className="border-2 border-dashed border-primary/30 bg-background">
                    <CardContent className="py-10 text-center">
                      <h2 className="text-2xl font-bold text-secondary mb-3">3. Termin buchen</h2>
                      <p className="text-muted-foreground">
                        Bitte Schritt 2 abschließen, dann wird der Kalender freigeschaltet.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Fragen? Rufen Sie uns an:{" "}
                <a href="tel:+4915142462280" className="text-primary hover:underline">
                  +4915142462280
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-6">Fragen? Wir helfen gerne!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Rufen Sie uns an oder schreiben Sie uns, wir beraten Sie kostenlos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="flex items-center" asChild>
              <a href="tel:+4915142462280">
                <Phone className="mr-2 h-5 w-5" />
                +4915142462280
              </a>
            </Button>
            <Button size="lg" variant="cta" className="flex items-center" asChild>
              <a href="mailto:info@sofortzulassung.com">
                <Mail className="mr-2 h-5 w-5" />
                E-Mail schreiben
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Angebot;
