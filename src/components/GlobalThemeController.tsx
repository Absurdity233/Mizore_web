"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function GlobalThemeController() {
  const pathname = usePathname();
  const hideOnMizore = pathname?.startsWith("/mizore");

  if (hideOnMizore) return null;

  return (
    <div className="fixed top-3 right-3 z-[1000]">
      <ThemeToggle />
    </div>
  );
}