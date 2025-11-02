import GiscusEmbed from "../../../components/GiscusEmbed";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, ExternalLink, Plus } from "lucide-react";

export default function ForumPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 text-[var(--fg-primary)]">
      {/* 返回 */}
      <a href="/mizore" className="inline-flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors mb-6">
        <ArrowLeft size={16} /> 返回主页
      </a>

      {/* 头部卡片 */}
      <Card className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-semibold">社区论坛</CardTitle>
          <div className="mt-2 text-xs text-[var(--fg-muted)]">在此直接发帖与回复，自动与 GitHub Discussions 同步。</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/Absurdity233/Mizore_web/discussions" target="_blank" rel="noreferrer">
              <Button variant="primary" className="btn-brand-gradient focus-ring h-10 rounded-full px-4">
                <ExternalLink className="mr-2 h-4 w-4" /> 打开 GitHub Discussions
              </Button>
            </a>
            <a href="https://github.com/Absurdity233/Mizore_web/discussions/new/choose" target="_blank" rel="noreferrer">
              <Button variant="ghost" className="focus-ring h-10 rounded-full px-4">
                <Plus className="mr-2 h-4 w-4" /> 发起新讨论
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* 概览统计（占位） */}
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "最近 30 天帖子", value: "—" },
          { label: "回复数", value: "—" },
          { label: "参与者", value: "—" },
        ].map((s, i) => (
          <Card key={i} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
            <CardContent className="flex items-center justify-between">
              <div className="text-sm text-[var(--fg-muted)]">{s.label}</div>
              <div className="text-xl font-semibold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* 分类导航 */}
      <section className="mt-6">
        <div className="mb-3 text-sm text-[var(--fg-muted)]">常见话题：</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: "公告与更新", desc: "查看最新公告与版本讨论", href: "https://github.com/Absurdity233/Mizore_web/discussions" },
            { title: "使用交流", desc: "分享使用心得、提问与答疑", href: "https://github.com/Absurdity233/Mizore_web/discussions" },
            { title: "功能建议", desc: "提出新功能或改进建议", href: "https://github.com/Absurdity233/Mizore_web/discussions" },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 hover:bg-[var(--hover-bg)]">
              <div className="text-base">{c.title}</div>
              <div className="mt-1 text-xs text-[var(--fg-muted)]">{c.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* 讨论区（GitHub Discussions + giscus） */}
      <section className="mt-8">
        <Card className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">讨论区</CardTitle>
            <div className="mt-1 text-xs text-[var(--fg-muted)]">在此页面直接参与讨论；支持主题自动跟随站点。</div>
          </CardHeader>
          <CardContent>
            <GiscusEmbed lang="zh-CN" />
            <div className="mt-3 text-xs text-[var(--fg-muted)]">
              <a
                href="https://github.com/Absurdity233/Mizore_web/discussions"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--fg-primary)]"
              >
                <ExternalLink className="h-3 w-3" /> 无法加载？前往 GitHub Discussions
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}