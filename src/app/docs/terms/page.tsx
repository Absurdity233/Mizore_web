"use client";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen text-[var(--fg-primary)] bg-[var(--bg-page)] selection:bg-[var(--fg-primary)]/10 selection:text-[var(--fg-primary)]">
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <a href="/mizore" className="inline-flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors mb-6">
          <ArrowLeft size={16} />
          返回主页
        </a>
        <Card className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-semibold text-[var(--fg-primary)]">服务条款</CardTitle>
            <div className="mt-2 text-xs text-[var(--fg-muted)]">更新日期：2025年11月1日</div>
          </CardHeader>
          <CardContent className="space-y-5">
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">1. 接受条款</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">访问或使用 Mizore 客户端（“本服务”），即表示您同意遵守这些服务条款（“条款”）。如果您不同意所有条款，请勿使用本服务。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">2. 服务描述</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">Mizore 是一款为 Minecraft 提供的客户端软件，旨在优化性能和用户体验。本服务按“原样”和“可用”的基础提供，我们保留随时修改或中止服务的权利，恕不另行通知。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">3. 用户行为</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">您同意不将本服务用于任何非法或未经授权的目的。您不得干扰或破坏本服务的完整性或性能。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">4. 知识产权</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">本服务及其所有原始内容、特性和功能均为 Mizore 开发组的专有财产，并受版权、商标和其他知识产权法律的保护。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">5. 免责声明</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">在任何情况下，Mizore 及其开发者均不对因使用或无法使用本服务而导致的任何直接、间接、附带、特殊或后果性损害承担责任。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">6. 条款变更</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">我们保留随时修改这些条款的权利。所有修改将在发布后立即生效。您在条款修改后继续使用本服务，即表示您接受新的条款。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">7. 联系我们</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">如果您对这些条款有任何疑问，请通过我们的官方渠道与我们联系。</p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}