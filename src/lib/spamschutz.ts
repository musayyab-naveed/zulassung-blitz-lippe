import { useRef } from "react";

/**
 * Schutz der Formulare vor Spam-Programmen – ohne Captcha, ohne Fremdanbieter, ohne Kosten.
 * Die Netlify-Funktion /api/lead prüft dieselben Regeln (netlify/functions/_spamschutz.cjs).
 */

/** Gültig sind deutsche Nummern mit Vorwahl (0…) und internationale (+… oder 00…) */
export const telefonGueltig = (wert: string) => {
  const roh = wert.trim();
  if (!/^[+0-9 ()/.-]+$/.test(roh)) return false;
  const ziffern = roh.replace(/\D/g, "");
  if (ziffern.length < 7 || ziffern.length > 17) return false;
  return roh.startsWith("+") || ziffern.startsWith("0");
};

/** Spam-Programme nutzen Gmail-Adressen voller Punkte (Gmail ignoriert Punkte), z. B. m.a.x.m.u.s.t.e.r@gmail.com */
export const emailVerdaechtig = (wert: string) => {
  const email = wert.trim().toLowerCase();
  if (!email) return false;
  const teile = email.split("@");
  if (teile.length !== 2 || !/^[^\s@]+$/.test(teile[0]) || !/^[^\s@]+\.[a-z]{2,}$/.test(teile[1])) return true;
  const [lokal, domain] = teile;
  const punkte = lokal.split(".").length - 1;
  return (domain === "gmail.com" || domain === "googlemail.com") && punkte >= 3;
};

/** Lockfeld und Ausfüllzeit, die jedes Formular an /api/lead mitschickt */
export const useSpamschutz = () => {
  const geladen = useRef(Date.now());
  const honigtopf = useRef<HTMLInputElement>(null);
  const pruefwerte = () => ({
    zusatz: honigtopf.current?.value ?? "",
    dauer: Date.now() - geladen.current,
  });
  return { honigtopf, pruefwerte };
};
