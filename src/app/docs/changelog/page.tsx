import entries from "./data.json";

export default function ChangelogPage() {

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[var(--fg-primary)]">
      <h1 className="text-3xl font-semibold">更新日志</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">
        这里记录近期的更新与改动。版本时间与内容仅供参考。
      </p>

      <div className="mt-6 space-y-6">
        {entries.map((e) => (
          <section key={e.version} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">{e.version}</h2>
              <span className="text-xs text-[var(--fg-muted)]">{e.date}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--fg-muted)]">
              {e.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[6px] block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--border-color)' }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 text-xs text-[var(--fg-muted)]">
        <a href="/mizore" className="hover:text-[var(--fg-primary)]">返回 Mizore</a>
      </div>
    </main>
  );
}