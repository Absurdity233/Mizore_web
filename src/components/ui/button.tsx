"use client";

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "primary";
};

export function Button({ variant = "default", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap leading-none font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<string, string> = {
    default: "bg-[var(--hover-bg)] text-[var(--fg-primary)] hover:opacity-90",
    ghost: "bg-transparent text-[var(--fg-primary)] hover:bg-[var(--hover-bg)]",
    primary: "bg-[var(--brand)] text-white hover:opacity-90",
  };
  const cls = `${base} ${variants[variant] ?? variants.default} ${className}`.trim();
  return <button className={cls} {...props} />;
}