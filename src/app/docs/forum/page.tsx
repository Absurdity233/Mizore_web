import GiscusEmbed from "../../../components/GiscusEmbed";

export default function ForumPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[var(--fg-primary)]">
      <h1 className="text-3xl font-semibold">论坛</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">讨论交流与支持。</p>
      <div className="mt-6 space-y-4 text-sm text-[var(--fg-muted)]">
        <section>
          <h2 className="text-base text-[var(--fg-primary)]">公告与更新</h2>
          <p className="mt-2">查看最新公告与版本更新讨论。</p>
        </section>
        <section>
          <h2 className="text-base text-[var(--fg-primary)]">使用交流</h2>
          <p className="mt-2">分享使用心得、提问与答疑。</p>
        </section>
        <section>
          <h2 className="text-base text-[var(--fg-primary)]">功能建议</h2>
          <p className="mt-2">提出新功能与改进建议。</p>
        </section>
      </div>

      {/* Discussions (GitHub Discussions + giscus) */}
      <GiscusEmbed theme="light" lang="zh-CN" />

      <div className="mt-10 text-xs text-[var(--fg-muted)]">
        <a href="/docs" className="hover:text-[var(--fg-primary)]">返回文档索引</a>
      </div>
    </main>
  );
}