"use client";
import React from "react";

export default function GiscusEmbed({ lang = "zh-CN" }: { lang?: string }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  // Basic config requires repo + category; IDs are optional and improve load performance
  const hasBasicConfig = !!(repo && category);

  const getTheme = () => {
    const t = document.documentElement.getAttribute("data-theme");
    return t === "dark" ? "dark" : "light";
  };

  React.useEffect(() => {
    if (!hasBasicConfig || !containerRef.current) return;
    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo!);
    if (repoId) script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category!);
    if (categoryId) script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", getTheme());
    script.setAttribute("data-lang", lang);
    containerRef.current.appendChild(script);
  }, [hasBasicConfig, repo, repoId, category, categoryId, lang]);

  // Sync theme with site
  React.useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      const theme = getTheme();
      const iframe = containerRef.current?.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null;
      // New API
      iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
      // Legacy API
      iframe?.contentWindow?.postMessage({ type: "set-theme", theme }, "https://giscus.app");
    };
    const observer = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "attributes" && r.attributeName === "data-theme") {
          applyTheme();
          break;
        }
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-8">
      {hasBasicConfig ? (
        <div ref={containerRef} className="giscus" />
      ) : (
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 text-sm text-[var(--fg-muted)]">
          论坛讨论未配置：请在环境变量设置 NEXT_PUBLIC_GISCUS_REPO 与 NEXT_PUBLIC_GISCUS_CATEGORY。可选：NEXT_PUBLIC_GISCUS_REPO_ID 与 NEXT_PUBLIC_GISCUS_CATEGORY_ID。
          <div className="mt-3">
            <a className="text-[var(--fg-primary)] hover:underline" href="https://github.com/Absurdity233/Mizore_web/discussions" target="_blank" rel="noreferrer">打开 GitHub Discussions</a>
          </div>
        </div>
      )}
    </div>
  );
}