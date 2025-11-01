export default function ContributePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[var(--fg-primary)]">
      <h1 className="text-3xl font-semibold">贡献指南</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">参与贡献、提交 Issue 与 Pull Request 的基本流程。</p>
      <div className="mt-6 space-y-4 text-sm text-[var(--fg-muted)]">
        <section>
          <h2 className="text-base text-[var(--fg-primary)]">代码贡献</h2>
          <p className="mt-2">Fork 仓库，创建分支，提交 PR。建议遵循 ESLint 与格式化规范。</p>
        </section>
        <section>
          <h2 className="text-base text-[var(--fg-primary)]">问题反馈</h2>
          <p className="mt-2">在 GitHub 提交 Issue，包含重现步骤、期望行为与环境信息。</p>
        </section>
      </div>
      <div className="mt-10 text-xs text-[var(--fg-muted)]">
        <a href="/docs" className="hover:text-[var(--fg-primary)]">返回文档索引</a>
      </div>
    </main>
  );
}