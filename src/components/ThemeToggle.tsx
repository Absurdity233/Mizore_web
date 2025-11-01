"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("mizore-theme");
  if (saved === "dark" || saved === "light") return saved as "dark" | "light";
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const transitionTimerRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("mizore-theme", next);

    // 切换时短暂启用过渡类，使背景/文字/边框平滑过渡
    const root = document.documentElement;
    root.classList.add("theme-transition");
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      transitionTimerRef.current = undefined;
    }, 240);
  };

  return (
    <Button
      variant="ghost"
      className="h-9 rounded-full px-3"
      aria-label="Toggle theme"
      onClick={toggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="to-light"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center"
          >
            <Sun className="mr-2 h-4 w-4" /> 亮色
          </motion.span>
        ) : (
          <motion.span
            key="to-dark"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center"
          >
            <Moon className="mr-2 h-4 w-4" /> 暗色
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}