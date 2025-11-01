export default function DocsIndexPage() {
  const nav = [
    { href: "/docs/install", label: "安装" },
    { href: "/docs/usage", label: "使用" },
    { href: "/docs/faq", label: "FAQ" },
    { href: "/docs/changelog", label: "更新日志" },
    { href: "/docs/contribute", label: "贡献指南" },
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-[var(--fg-primary)]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px,1fr]">
        {/* Side nav */}
        <aside className="md:sticky md:top-16">
          <nav className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3">
            <div className="text-sm text-[var(--fg-muted)] mb-2">文档</div>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="block rounded-xl px-3 py-2 text-sm text-[var(--fg-primary)] hover:bg-[var(--hover-bg)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <section className="space-y-6">
          <header>
            <h1 className="text-3xl font-semibold">文档索引</h1>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">快速导航至安装、使用、FAQ、更新日志与贡献指南。</p>
          </header>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 hover:bg-[var(--hover-bg)]">
                <div className="text-base">{n.label}</div>
                <div className="mt-2 text-xs text-[var(--fg-muted)]">点击查看详细文档</div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}