"use client";

import * as React from "react";
import { useLocale } from "./LocaleProvider";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  const isZh = locale === "zh";
  return (
    <div className="inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] p-[2px]">
      <button
        className={`rounded-full px-2 py-1 text-xs ${isZh ? "bg-[var(--hover-bg)] text-[var(--fg-primary)]" : "text-[var(--fg-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--fg-primary)]"}`}
        onClick={() => setLocale("zh")}
        aria-pressed={isZh}
      >中</button>
      <button
        className={`rounded-full px-2 py-1 text-xs ${!isZh ? "bg-[var(--hover-bg)] text-[var(--fg-primary)]" : "text-[var(--fg-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--fg-primary)]"}`}
        onClick={() => setLocale("en")}
        aria-pressed={!isZh}
      >EN</button>
    </div>
  );
}