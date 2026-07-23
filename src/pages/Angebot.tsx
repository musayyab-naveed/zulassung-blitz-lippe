import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import ZulassungsAssistent, { AnswerCard, clearSavedWizardState } from "@/components/ZulassungsAssistent";
import { checkPickupAddress } from "@/lib/pickupCheck";
import { CheckCircle, Phone, Mail, ArrowLeft, ArrowRight, Car, ImagePlus, Upload, ArrowUp, ArrowDown, X, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useLocation, useNavigate, useNavigationType, useSearchParams } from "react-router-dom";

type PackageKey = "sofort" | "basis" | "premium" | "abmeldung" | "ankauf_only";

interface PackageDef {
  key: PackageKey;
  title: string;
  price: string;
  subtitle?: string;
  features: string[];
  highlight?: string;
  buttonText: string;
  popular?: boolean;
  buttonVariant?: "default" | "cta";
}

interface UploadImageItem {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

const PACKAGES: PackageDef[] = [
  {
    key: "sofort",
    title: "SOFORT",
    price: "ab 129 €",
    subtitle:
      "Fertig in ca. 20 Min – Sie warten kurz vor Ort. Kennzeichen besorgen Sie selbst, vor oder nach der Zulassung – zugelassen sind Sie in jedem Fall.",
    popular: true,
    features: [
      "Zulassung digital in ca. 20 Minuten",
      "Direkt losfahren",
      "Wunschkennzeichen möglich (+13 €)",
      "Verwaltungsgebühren inkl.",
    ],
    buttonText: "SOFORT WÄHLEN",
    buttonVariant: "cta" as const,
  },
  {
    key: "basis",
    title: "BASIS",
    price: "129 €",
    subtitle: "Fertig am nächsten Werktag – Sie bringen & holen die Unterlagen",
    features: [
      "Fertig am nächsten Werktag",
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
    subtitle: "Fertig am nächsten Werktag – wir holen & bringen alles",
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
    title: "BLITZABMELDUNG",
    price: "40 €",
    subtitle: "Sofort vor Ort abgemeldet – Sie warten kurz",
    features: [
      "Abmeldung digital direkt vor Ort",
      "Verwaltungsgebühren inkl.",
      "Sie möchten Ihr altes Fahrzeug verkaufen? Wir kaufen es gerne an",
      "Kostenlose Abmeldung bei Ankauf",
    ],
    highlight:
      "Voraussetzung: Sicherheitscodes zum Freirubbeln auf Fahrzeugschein und Kennzeichen (Zulassung ab 2015)",
    buttonText: "BLITZABMELDUNG WÄHLEN",
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

const geoFaqs = [
  {
    question: "Welche Pakete kann ich online buchen?",
    answer:
      "Sie können SOFORT (Zulassung in ca. 20 Minuten), BASIS, PREMIUM, BLITZABMELDUNG oder nur Fahrzeugverkauf wählen. Die Auswahl erfolgt über den Assistenten – er führt Sie in wenigen Klicks zum passenden Paket.",
  },
  {
    question: "Kann ich Fahrzeugankauf ohne Zulassung beauftragen?",
    answer:
      "Ja. Über die Option „Nur Fahrzeugverkauf“ können Sie Ihr Fahrzeug unabhängig von einer Zulassung anbieten.",
  },
  {
    question: "Wann ist der Termin-Kalender freigeschaltet?",
    answer:
      "Sobald der Assistent durchlaufen ist und die Pflichtangaben vollständig sind, öffnet sich der Kalender.",
  },
];

const Angebot = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();


  const wantsAnkaufFromParam = searchParams.get("ankauf") === "1";
  const paketParam = (searchParams.get("paket") || "").trim().toLowerCase();
  const packageFromQuery =
    PACKAGES.find((pkg) => pkg.key === paketParam || pkg.title.toLowerCase() === paketParam) ?? null;

  const [selectedPackageKey, setSelectedPackageKey] = useState<PackageKey | null>(
    packageFromQuery?.key ?? null
  );
  const [sellDecision, setSellDecision] = useState<"yes" | "no" | null>(
    packageFromQuery
      ? packageFromQuery.key === "ankauf_only"
        ? "yes"
        : wantsAnkaufFromParam
        ? "yes"
        : null
      : null
  );
  const [sellVehicleData, setSellVehicleData] = useState({
    marke: "",
    modell: "",
    baujahr: "",
    kilometerstand: "",
    telefon: "",
  });
  const [vehicleImages, setVehicleImages] = useState<UploadImageItem[]>([]);
  const [vehicleImagesError, setVehicleImagesError] = useState("");
  const [isUploadDragActive, setIsUploadDragActive] = useState(false);
  const vehicleImagesInputRef = useRef<HTMLInputElement | null>(null);

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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(packageFromQuery ? 2 : 1);
  // Nur Fahrzeugverkauf: Kunde wählt zwischen Termin und Rückruf
  const [ankaufContactChoice, setAnkaufContactChoice] = useState<"termin" | "rueckruf" | null>(null);
  // Premium-Abwicklung wurde bereits im Assistenten geklärt -> in Schritt 2 nur Zusammenfassung
  const [premiumFromWizard, setPremiumFromWizard] = useState(false);
  // Antwort-Weg aus dem Assistenten (Chips) – wird an Terminbuchung und Lead-Mail übergeben
  const [wizardSummary, setWizardSummary] = useState("");
  // "Bitte mitbringen"-Liste passend zum gewaehlten Paket
  const [wizardChecklist, setWizardChecklist] = useState<string[]>([]);
  // Zaehler: bei bewusstem Klick auf einen Start-Button wird der Assistent frisch gemountet
  const [wizardEpoch, setWizardEpoch] = useState(0);

  const selectedPackage = PACKAGES.find((pkg) => pkg.key === selectedPackageKey) ?? null;

  const selectPackage = (pkg: PackageDef) => {
    setSelectedPackageKey(pkg.key);
    setSellDecision(pkg.key === "ankauf_only" ? "yes" : wantsAnkaufFromParam ? "yes" : null);
    setSellVehicleData({
      marke: "",
      modell: "",
      baujahr: "",
      kilometerstand: "",
      telefon: "",
    });
    setVehicleImages([]);
    setVehicleImagesError("");
    setPickupChoice(null);
    setPickupCheckResult(null);
    setPickupCheckError("");
    setAnkaufContactChoice(null);
    setPremiumFromWizard(false);
    setLeadSendError("");
    setLeadSendMessage("");
    setCurrentStep(2);
    window.history.pushState({ buchung: 2 }, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Spiegel-Refs fuer den popstate-Handler
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;
  const selectedPackageKeyRef = useRef(selectedPackageKey);
  selectedPackageKeyRef.current = selectedPackageKey;
  // Kam der Kunde per Direktlink (?paket=...) in Schritt 2? Dann gibt es keinen
  // Assistenten-Verlauf darunter.
  const enteredViaQueryRef = useRef(Boolean(packageFromQuery));

  const goToStep = (step: 2 | 3) => {
    setCurrentStep(step);
    window.history.pushState({ buchung: step }, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Browser-Zurueck/-Vorwaerts bewegt sich zwischen Assistent (1), Optionen (2)
  // und Termin (3) – ohne Eingaben zu verlieren (A1)
  useEffect(() => {
    const onPop = (event: PopStateEvent) => {
      const state = event.state as { buchung?: 2 | 3; assistent?: boolean } | null;
      if (state?.buchung && selectedPackageKeyRef.current) {
        setCurrentStep(state.buchung);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (currentStepRef.current > 1) {
        // Assistent- oder Basis-Eintrag erreicht -> zurueck zu Schritt 1,
        // der Assistent stellt sich aus dem Zwischenspeicher wieder her
        setCurrentStep(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Bewusster Klick auf einen Start-Button (Header/Hero/Checkliste/FAQ) = frischer
  // Durchlauf. Nur Browser-Zurueck (POP) stellt einen angefangenen Durchlauf wieder her.
  useEffect(() => {
    // Link-Klick auf die aktuelle Seite ist in React Router ein REPLACE –
    // nur echtes Browser-Zurueck/Vorwaerts (POP) darf wiederherstellen
    if (navigationType === "POP") return;
    clearSavedWizardState();
    setWizardEpoch((epoch) => epoch + 1);
    if (!packageFromQuery) {
      setSelectedPackageKey(null);
      setSellDecision(null);
      setSellVehicleData({ marke: "", modell: "", baujahr: "", kilometerstand: "", telefon: "" });
      setVehicleImages([]);
      setVehicleImagesError("");
      setPickupChoice(null);
      setPickupCheckResult(null);
      setPickupCheckError("");
      setLeadSendError("");
      setLeadSendMessage("");
      setAnkaufContactChoice(null);
      setPremiumFromWizard(false);
      setWizardSummary("");
      setWizardChecklist([]);
      setCurrentStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // Direktlink ?paket=...: Schritt 2 als Verlaufs-Zustand markieren, ohne Extra-Eintrag
  useEffect(() => {
    if (enteredViaQueryRef.current) {
      window.history.replaceState({ buchung: 2 }, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Zurueck zum Assistenten: einen bzw. zwei Verlaufsschritte zurueck –
  // die Antworten des Assistenten bleiben dank Zwischenspeicher erhalten
  const backToPakete = () => {
    const state = window.history.state as { buchung?: 2 | 3 } | null;
    if (enteredViaQueryRef.current) {
      // Ohne Assistenten-Verlauf: klassisch zuruecksetzen
      setSelectedPackageKey(null);
      setAnkaufContactChoice(null);
      setCurrentStep(1);
      navigate("/angebot", { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (state?.buchung) {
      window.history.go(state.buchung === 3 ? -2 : -1);
    } else {
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentStepScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  void currentStepScrollTop;

  // Kompletter Neustart (wischt alle Eingaben + Assistenten-Antworten)
  const resetAll = () => {
    clearSavedWizardState();
    setSelectedPackageKey(null);
    setSellDecision(null);
    setSellVehicleData({ marke: "", modell: "", baujahr: "", kilometerstand: "", telefon: "" });
    setVehicleImages([]);
    setVehicleImagesError("");
    setPickupChoice(null);
    setPickupCheckResult(null);
    setPickupCheckError("");
    setLeadSendError("");
    setLeadSendMessage("");
    setAnkaufContactChoice(null);
    setPremiumFromWizard(false);
    setWizardSummary("");
    setCurrentStep(1);
    navigate("/angebot", { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const isPremium = selectedPackageKey === "premium";
  const isAnkaufOnly = selectedPackageKey === "ankauf_only";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#63ccff" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  useEffect(() => {
    const packageFromParam = packageFromQuery;

    if (!packageFromParam) return;
    if (selectedPackageKey === packageFromParam.key) return;

    setSelectedPackageKey(packageFromParam.key);
    setSellDecision(packageFromParam.key === "ankauf_only" ? "yes" : wantsAnkaufFromParam ? "yes" : null);
    setSellVehicleData({
      marke: "",
      modell: "",
      baujahr: "",
      kilometerstand: "",
      telefon: "",
    });
    setVehicleImages([]);
    setVehicleImagesError("");
    setPickupChoice(null);
    setPickupCheckResult(null);
    setPickupCheckError("");
    setCurrentStep(2);
  }, [packageFromQuery, selectedPackageKey, wantsAnkaufFromParam]);



  const checkPickupEligibility = () => {
    setPickupCheckError("");
    setPickupCheckResult(null);

    if (!pickupAddress.street || !pickupAddress.postalCode || !pickupAddress.city) {
      setPickupCheckError("Bitte vollständige Adresse eingeben.");
      return;
    }

    setPickupCheckResult(checkPickupAddress(pickupAddress.city, pickupAddress.postalCode));
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
        sellVehicleData.baujahr.trim() &&
        sellVehicleData.telefon.trim()
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
          `Telefon: ${sellVehicleData.telefon || "-"}`,
        ].join(", ")
      : "kein Fahrzeugankauf";

  const vehicleImagesText =
    vehicleImages.length > 0 ? `${vehicleImages.length} Bild(er): ${vehicleImages.map((img) => img.name).join(", ")}` : "keine Bilder";

  const premiumAdresseText =
    isPremium && pickupChoice === "pickup"
      ? `${pickupAddress.street}, ${pickupAddress.postalCode} ${pickupAddress.city}`
      : isPremium && pickupChoice === "shipping"
      ? "Versand an uns, Express zurück"
      : "-";

  // Fallback-Checklisten fuer Direktlinks ohne Assistenten-Durchlauf
  const FALLBACK_CHECKLIST: Record<string, string[]> = {
    sofort: [
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Personalausweis oder Reisepass",
      "Zulassungsbescheinigung Teil I und II",
      "IBAN für die KFZ-Steuer",
      "Kennzeichen besorgen Sie selbst – vor oder nach dem Termin",
    ],
    basis: [
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Personalausweis oder Reisepass",
      "Zulassungsbescheinigung Teil I und II",
      "HU-Nachweis – nicht nötig, wenn die HU im Fahrzeugschein eingetragen ist",
      "IBAN für die KFZ-Steuer",
    ],
    premium: [
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Personalausweis oder Reisepass",
      "Zulassungsbescheinigung Teil I und II",
      "HU-Nachweis – nicht nötig, wenn die HU im Fahrzeugschein eingetragen ist",
      "IBAN für die KFZ-Steuer",
    ],
    abmeldung: [
      "Beide Kennzeichenschilder",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Personalausweis oder Reisepass",
    ],
  };
  const effectiveChecklist =
    wizardChecklist.length > 0
      ? wizardChecklist
      : selectedPackageKey && selectedPackageKey !== "ankauf_only"
      ? FALLBACK_CHECKLIST[selectedPackageKey] ?? []
      : [];
  // Leerzeile davor, Ueberschrift in Grossbuchstaben, jeder Punkt in eigener Zeile
  const checklistText =
    effectiveChecklist.length > 0
      ? `\nBITTE MITBRINGEN:\n${effectiveChecklist.map((item) => `– ${item}`).join("\n")}`
      : null;

  const calNotesPrefill = [
    `Gewähltes Paket: ${selectedPackage?.title || "-"}`,
    wizardSummary ? `Assistent: ${wizardSummary}` : null,
    `Vorauswahl Dienstleistungen: ${calServicePrefill.join(", ") || "-"}`,
    `Fahrzeugankauf: ${sellDecision === "yes" ? "Ja" : "Nein"}`,
    `Fahrzeugdaten: ${vehicleDetails}`,
    `Fahrzeugbilder: ${vehicleImagesText}`,
    `Premium-Abwicklung: ${premiumMode}`,
    `Premium-Adresse: ${premiumAdresseText}`,
    checklistText,
  ]
    .filter(Boolean)
    .join("\n");

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
  const calLinkWithPrefill = `sofortzulassung/30min${calServiceQuery.toString() ? `?${calServiceQuery.toString()}` : ""}`;

  const sendOptionsByEmail = async (kontaktwunsch: "termin" | "rueckruf" = "termin") => {
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
          fahrzeugbilder:
            sellDecision === "yes"
              ? vehicleImages.map((image) => ({
                  name: image.name,
                  type: image.type,
                  size: image.size,
                }))
              : [],
          imageAttachments: sellDecision === "yes" ? vehicleImages : [],
          premiumAbwicklung: premiumMode,
          assistentAntworten: wizardSummary || "-",
          checkliste: effectiveChecklist,
          premiumAdresse: isPremium && pickupChoice === "pickup" ? pickupAddress : null,
          pickupPruefung: pickupCheckResult,
          services: calServicePrefill,
          notes: calNotesPrefill,
          kontaktwunsch:
            kontaktwunsch === "rueckruf"
              ? "Rückruf gewünscht – bitte innerhalb von 24h melden"
              : "Termin wird online gebucht",
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
      setLeadSendError(
        "Senden fehlgeschlagen – bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut. Ihre Eingaben bleiben erhalten." +
          (message && !message.toLowerCase().includes("failed to fetch") ? ` (${message})` : "")
      );
      return false;
    } finally {
      setIsSendingLead(false);
    }
  };

  const handleVehicleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const MAX_IMAGES = 4;
    const freeSlots = Math.max(0, MAX_IMAGES - vehicleImages.length);
    if (freeSlots === 0) {
      setVehicleImagesError("Maximal 4 Bilder möglich.");
      return;
    }

    const incoming = Array.from(files).slice(0, freeSlots);
    const invalid = incoming.filter((file) => !file.type.startsWith("image/"));
    if (invalid.length > 0) {
      setVehicleImagesError("Nur Bilddateien sind erlaubt.");
      return;
    }

    const oversized = incoming.find((file) => file.size > 15 * 1024 * 1024);
    if (oversized) {
      setVehicleImagesError("Ein Bild ist größer als 15 MB. Bitte kleinere Bilder wählen.");
      return;
    }

    // Bilder vor dem Versand verkleinern (max. 1280px, JPEG) – sonst sprengen
    // vier Handyfotos das Limit des E-Mail-Versands
    const asDataUrl = (file: File) =>
      new Promise<UploadImageItem>((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          const maxDim = 1280;
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("canvas_failed"));
            return;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          const approxBytes = Math.round((dataUrl.length * 3) / 4);
          resolve({
            id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 9)}`,
            name: file.name.replace(/\.[^.]+$/, "") + ".jpg",
            type: "image/jpeg",
            size: approxBytes,
            dataUrl,
          });
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("file_read_failed"));
        };
        img.src = objectUrl;
      });

    try {
      const next = await Promise.all(incoming.map(asDataUrl));
      setVehicleImages((prev) => [...prev, ...next]);
      setVehicleImagesError("");
    } catch {
      setVehicleImagesError("Bilder konnten nicht gelesen werden. Bitte erneut versuchen.");
    }
  };

  const removeVehicleImage = (imageId: string) => {
    setVehicleImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  const moveVehicleImage = (index: number, direction: "up" | "down") => {
    setVehicleImages((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      const current = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = current;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Zulassung starten | KFZ-Sofortzulassung Bad Salzuflen"
        description="Unser Assistent führt Sie in wenigen Klicks zur passenden Zulassung, Blitzabmeldung oder Ankaufanfrage – Termin direkt online buchen."
        path="/angebot"
        image="/favicon.ico"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Online Auftragsformular KFZ-Sofortzulassung",
              provider: {
                "@type": "LocalBusiness",
                name: "KFZ-Sofortzulassung",
                telephone: "+49 1514 2462280",
                email: "info@sofortzulassung.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Werler Straße 68",
                  postalCode: "32105",
                  addressLocality: "Bad Salzuflen",
                  addressCountry: "DE",
                },
              },
              areaServed: "Kreis Lippe",
              serviceType: ["KFZ-Zulassung", "Abmeldung", "Fahrzeugankauf"],
              url: "/angebot",
            },
            {
              "@type": "FAQPage",
              mainEntity: geoFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ],
        }}
      />
      <Header />

      {currentStep === 1 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ZulassungsAssistent
              key={wizardEpoch}
              initialScreen={searchParams.get("start") === "verkauf" ? "verkauf" : undefined}
              onSelectPackage={(key, premium, summary, checklist) => {
                selectPackage(PACKAGES.find((pkg) => pkg.key === key)!);
                setWizardSummary(summary || "");
                setWizardChecklist(checklist ?? []);
                if (key === "premium" && premium) {
                  setPremiumFromWizard(true);
                  setPickupChoice(premium.mode);
                  if (premium.mode === "pickup" && premium.address && premium.result) {
                    setPickupAddress(premium.address);
                    setPickupCheckResult(premium.result);
                  }
                }
              }}
            />
          </div>
        </section>
      )}

      {selectedPackage && currentStep === 2 && (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="-ml-2 mb-2"
                        onClick={backToPakete}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Zurück
                      </Button>
                      <CardTitle className="text-secondary">Optionen festlegen</CardTitle>
                    </div>
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
                      <h3 className="mb-4 text-center text-xl font-bold text-secondary sm:text-2xl">
                        Möchten Sie Ihr altes Fahrzeug verkaufen?
                      </h3>
                      <div className="space-y-3">
                        <AnswerCard
                          icon={<Car className="h-7 w-7 text-primary" />}
                          title="Ja, Fahrzeug verkaufen"
                          sub="Wir kaufen es direkt mit an – auch nicht fahrbereite Fahrzeuge"
                          selected={sellDecision === "yes"}
                          onClick={() => {
                            setSellDecision("yes");
                            setLeadSendError("");
                            setLeadSendMessage("");
                          }}
                        />
                        <AnswerCard
                          icon={<ArrowRight className="h-7 w-7 text-primary" />}
                          title="Nein, kein Verkauf"
                          sub="Direkt weiter zur Terminbuchung"
                          selected={sellDecision === "no"}
                          onClick={() => {
                            setSellDecision("no");
                            setSellVehicleData({
                              marke: "",
                              modell: "",
                              baujahr: "",
                              kilometerstand: "",
                              telefon: "",
                            });
                            setVehicleImages([]);
                            setVehicleImagesError("");
                            setLeadSendError("");
                            setLeadSendMessage("");
                            if (!isPremium || premiumFromWizard) {
                              goToStep(3);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {sellDecision === "yes" && selectedPackageKey === "abmeldung" && (
                    <div className="flex items-start gap-2 rounded-lg border border-trust-green/40 bg-trust-green/10 px-3 py-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-trust-green" />
                      <span className="text-sm font-semibold text-secondary">
                        Super: Beim Ankauf ist die Abmeldung gratis – die 40 € entfallen.
                      </span>
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
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="sell-telefon">Telefonnummer</Label>
                          <div className="relative">
                            <Input
                              id="sell-telefon"
                              type="tel"
                              placeholder="z. B. 0151 23456789"
                              value={sellVehicleData.telefon}
                              onChange={(event) =>
                                setSellVehicleData((prev) => ({ ...prev, telefon: event.target.value }))
                              }
                            />
                            {sellVehicleData.telefon.replace(/[^0-9]/g, "").length >= 8 && (
                              <CheckCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-trust-green" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sell-bilder">Bilder (empfohlen)</Label>
                        <input
                          ref={vehicleImagesInputRef}
                          id="sell-bilder"
                          className="sr-only"
                          type="file"
                          accept="image/*"
                          multiple
                          onClick={(event) => {
                            event.currentTarget.value = "";
                          }}
                          onChange={(event) => void handleVehicleImageUpload(event.target.files)}
                        />
                        <button
                          type="button"
                          onClick={() => vehicleImagesInputRef.current?.click()}
                          onDragOver={(event) => {
                            event.preventDefault();
                            setIsUploadDragActive(true);
                          }}
                          onDragLeave={() => setIsUploadDragActive(false)}
                          onDrop={(event) => {
                            event.preventDefault();
                            setIsUploadDragActive(false);
                            void handleVehicleImageUpload(event.dataTransfer.files);
                          }}
                          className={`w-full rounded-xl border-2 border-dashed p-4 text-left transition-colors sm:p-6 ${
                            isUploadDragActive
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="grid h-14 w-14 place-items-center rounded-lg border bg-background text-primary">
                              <ImagePlus className="h-7 w-7" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-secondary sm:text-base">
                                Bilder hinzufügen
                              </p>
                              <p className="text-xs text-muted-foreground sm:text-sm">
                                Auf dem Handy antippen oder am PC per Drag & Drop hochladen
                              </p>
                            </div>
                          </div>
                        </button>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Upload className="h-3.5 w-3.5" />
                            Optional: bis zu 4 Bilder
                          </span>
                          <span>Bilder werden automatisch verkleinert</span>
                          <span>Ohne Bilder können Sie normal fortfahren</span>
                        </div>
                        {vehicleImagesError && (
                          <p className="text-xs text-destructive">{vehicleImagesError}</p>
                        )}
                      </div>
                      {vehicleImages.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {vehicleImages.map((image, index) => (
                            <div key={image.id} className="rounded-lg border bg-background p-2">
                              <img
                                src={image.dataUrl}
                                alt={`Fahrzeugbild ${image.name}`}
                                className="h-32 w-full rounded object-cover"
                              />
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <p className="truncate text-[11px] text-muted-foreground">{image.name}</p>
                                <span className="text-[11px] font-semibold text-secondary">#{index + 1}</span>
                              </div>
                              <div className="mt-2 grid grid-cols-3 gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  disabled={index === 0}
                                  onClick={() => moveVehicleImage(index, "up")}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  disabled={index === vehicleImages.length - 1}
                                  onClick={() => moveVehicleImage(index, "down")}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeVehicleImage(image.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {isPremium && premiumFromWizard && (
                    <div className="border-t pt-5 space-y-3">
                      <Label className="text-base font-semibold text-secondary">
                        Premium-Abwicklung
                      </Label>
                      {pickupChoice === "pickup" ? (
                        <div className="flex items-start gap-2 rounded-lg border border-trust-green/40 bg-trust-green/10 px-3 py-2.5">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-trust-green" />
                          <span className="text-sm text-foreground">
                            <span className="font-semibold text-secondary">Abholung & Rückbringung:</span>{" "}
                            {pickupAddress.street}, {pickupAddress.postalCode} {pickupAddress.city}
                          </span>
                        </div>
                      ) : (
                        <div className="rounded-lg border bg-muted/40 px-3 py-2.5 text-sm">
                          <p>
                            <span className="font-semibold text-secondary">Versand:</span>{" "}
                            Senden Sie Ihre Unterlagen an{" "}
                            <span className="font-semibold text-secondary">
                              KFZ-Sofortzulassung · Werler Straße 68 · 32105 Bad Salzuflen
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Am besten versichert mit Sendungsverfolgung (z. B. DHL). Den Express-Rückversand übernehmen wir.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {isPremium && !premiumFromWizard && (
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
                          variant={pickupChoice === "shipping" ? "cta" : "outline"}
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
                            Abholung möglich im Umkreis von ca. 10 Minuten Fahrweg rund um Bad Salzuflen.
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

                  {sellDecision === "yes" && (
                    <div className="border-t pt-5">
                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                          Diese Angaben jetzt direkt an <span className="font-semibold">info@sofortzulassung.com</span> senden.
                        </p>
                      </div>
                      {leadSendMessage && <p className="mt-3 text-sm text-trust-green">{leadSendMessage}</p>}
                      {leadSendError && <p className="mt-3 text-sm text-destructive">{leadSendError}</p>}
                    </div>
                  )}
                  <div className="border-t pt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button type="button" variant="outline" onClick={backToPakete}>
                      Zurück zum Start
                    </Button>
                    {isAnkaufOnly && (
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!stepTwoCompleted || isSendingLead}
                        onClick={async () => {
                          const ok = await sendOptionsByEmail("rueckruf");
                          if (!ok) return;
                          setAnkaufContactChoice("rueckruf");
                          goToStep(3);
                        }}
                      >
                        {isSendingLead ? "Wird gesendet..." : "Senden & Rückruf erhalten"}
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="cta"
                      disabled={!stepTwoCompleted || isSendingLead}
                      onClick={async () => {
                        if (sellDecision === "yes") {
                          const ok = await sendOptionsByEmail("termin");
                          if (!ok) return;
                        }
                        setAnkaufContactChoice("termin");
                        goToStep(3);
                      }}
                    >
                      {isSendingLead
                        ? "Wird gesendet..."
                        : sellDecision === "yes"
                        ? "Senden & Termin aussuchen"
                        : "Weiter zu Termin"}
                    </Button>
                  </div>
                  {!stepTwoCompleted && (
                    <p className="pt-2 text-right text-xs text-muted-foreground">
                      Bitte beantworten Sie zuerst die Fragen oben, dann geht es weiter.
                    </p>
                  )}
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="-ml-2 mb-2"
                      onClick={() => window.history.back()}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Zurück
                    </Button>
                    <CardTitle className="text-secondary">
                      {isAnkaufOnly && ankaufContactChoice === "rueckruf"
                        ? "Anfrage eingegangen"
                        : "Termin buchen"}
                    </CardTitle>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={resetAll}>
                    Neu starten
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  {isAnkaufOnly && ankaufContactChoice === "rueckruf"
                    ? "Vielen Dank für Ihre Ankaufanfrage!"
                    : "Wählen Sie jetzt Ihren passenden Termin."}
                </p>
              </CardHeader>
              <CardContent>
                {isAnkaufOnly && ankaufContactChoice === "rueckruf" ? (
                  <div className="rounded-xl border border-trust-green/40 bg-trust-green/10 p-6 text-center">
                    <CheckCircle className="mx-auto mb-3 h-10 w-10 text-trust-green" />
                    <h3 className="mb-2 text-xl font-bold text-secondary">
                      Ihre Anfrage ist bei uns eingegangen
                    </h3>
                    <p className="text-muted-foreground">
                      Wir melden uns innerhalb von 24 Stunden
                      {sellVehicleData.telefon ? (
                        <>
                          {" "}unter <span className="font-semibold text-secondary">{sellVehicleData.telefon}</span>
                        </>
                      ) : null}{" "}
                      mit einer ersten Einschätzung zu Ihrem Fahrzeug
                      {sellVehicleData.marke ? (
                        <>
                          {" "}(<span className="font-semibold text-secondary">
                            {sellVehicleData.marke} {sellVehicleData.modell}
                          </span>)
                        </>
                      ) : null}
                      .
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Sie möchten doch lieber direkt einen Termin?{" "}
                      <button
                        type="button"
                        className="font-semibold text-primary hover:underline"
                        onClick={() => setAnkaufContactChoice("termin")}
                      >
                        Hier Termin aussuchen
                      </button>
                    </p>
                  </div>
                ) : canBookAppointment ? (
                  <>
                    <div className="mb-6 rounded-xl border bg-background p-4 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        Paket: <span className="font-semibold text-secondary">{selectedPackage?.title}</span>
                        <button
                          type="button"
                          title="Paket ändern"
                          onClick={backToPakete}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </p>
                      <p className="flex items-center gap-2">
                        Fahrzeugankauf:{" "}
                        <span className="font-semibold text-secondary">
                          {sellDecision === "yes" ? "inklusive" : "exklusive"}
                        </span>
                        <button
                          type="button"
                          title="Optionen ändern"
                          onClick={() => window.history.back()}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </p>
                      {sellDecision === "yes" && (
                        <p>
                          Ankaufdaten:{" "}
                          <span className="font-semibold text-secondary">
                            {sellVehicleData.marke} {sellVehicleData.modell}, Baujahr {sellVehicleData.baujahr}
                            {sellVehicleData.kilometerstand ? `, ${sellVehicleData.kilometerstand}` : ""}
                            {sellVehicleData.telefon ? `, Tel. ${sellVehicleData.telefon}` : ""}
                          </span>
                        </p>
                      )}
                      {sellDecision === "yes" && (
                        <p>
                          Bilder:{" "}
                          <span className="font-semibold text-secondary">
                            {vehicleImages.length > 0 ? `${vehicleImages.length} hochgeladen` : "keine"}
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
                        namespace="30min"
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
          assistentAntworten: wizardSummary || "-",
          checkliste: effectiveChecklist,
                          },
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <Card className="border-2 border-dashed border-primary/30 bg-background">
                    <CardContent className="py-10 text-center">
                      <h2 className="text-2xl font-bold text-secondary mb-3">Termin buchen</h2>
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

      <section className="py-12 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary mb-3">Direkte Antworten</h2>
            <p className="text-muted-foreground">Kurz und klar für schnelle Entscheidungen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {geoFaqs.map((faq) => (
              <Card key={faq.question} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base leading-snug text-secondary">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
