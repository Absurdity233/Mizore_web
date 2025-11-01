export default function DocsFaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[var(--fg-primary)]">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">更详细的常见问题与解答。</p>
      <div className="mt-6 space-y-4 text-sm text-[var(--fg-muted)]">
        <div>
          <div className="text-base text-[var(--fg-primary)]">是否支持 1.20.1?</div>
          <p className="mt-2">是，面向 1.20.1 版本适配与优化。</p>
        </div>
        <div>
          <div className="text-base text-[var(--fg-primary)]">如何购买 Coin？</div>
          <p className="mt-2">通过导航打开右侧商店抽屉，选择 Coin 套餐进行购买。</p>
        </div>
      </div>
      <div className="mt-10 text-xs text-[var(--fg-muted)]">
        <a href="/docs" className="hover:text-[var(--fg-primary)]">返回文档索引</a>
      </div>
    </main>
  );
}