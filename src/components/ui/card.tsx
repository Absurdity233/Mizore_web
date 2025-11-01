import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: DivProps) {
  const base = "rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]";
  return <div className={`${base} ${className}`.trim()} {...props} />;
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`${className} p-4`.trim()} {...props} />;
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`${className} p-4`.trim()} {...props} />;
}

export function CardTitle({ className = "", ...props }: DivProps) {
  return <div className={`${className} font-medium`.trim()} {...props} />;
}