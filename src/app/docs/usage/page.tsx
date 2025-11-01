export default function UsagePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[var(--fg-primary)]">
      <h1 className="text-3xl font-semibold">使用</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">了解常用功能与最佳实践。</p>
      <div className="mt-6 space-y-4 text-sm text-[var(--fg-muted)]">
        <section>
          <h2 className="text-base text-[var(--fg-primary)]">快速开始</h2>
          <p className="mt-2">首次启动后可直接游玩，常用选项已预设。</p>
        </section>
        <section>
          <h2 className="text-base text-[var(--fg-primary)]">商店与购买</h2>
          <p className="mt-2">通过导航打开右侧商店抽屉，选择 Coin 套餐进行购买。</p>
        </section>
      </div>
      <div className="mt-10 text-xs text-[var(--fg-muted)]">
        <a href="/docs" className="hover:text-[var(--fg-primary)]">返回文档索引</a>
      </div>
    </main>
  );
}