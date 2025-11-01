"use client";

import * as React from "react";
import { DEFAULT_LOCALE, type Locale, getTranslation } from "../lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>(DEFAULT_LOCALE);

  // initialize from localStorage / navigator
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("mizore-locale");
      if (saved === "zh" || saved === "en") {
        setLocale(saved);
        return;
      }
      const nav = (typeof navigator !== "undefined" && navigator.language) || "zh-CN";
      const guess: Locale = nav.toLowerCase().startsWith("en") ? "en" : "zh";
      setLocale(guess);
    } catch {
      setLocale(DEFAULT_LOCALE);
    }
  }, []);

  const onSetLocale = React.useCallback((l: Locale) => {
    setLocale(l);
    try {
      localStorage.setItem("mizore-locale", l);
    } catch {}
  }, []);

  const value: LocaleContextValue = React.useMemo(() => ({
    locale,
    setLocale: onSetLocale,
    t: (key: string, fallback?: string) => getTranslation(locale, key, fallback),
  }), [locale, onSetLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}