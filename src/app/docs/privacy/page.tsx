import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-[var(--fg-primary)] bg-[var(--bg-page)] selection:bg-[var(--fg-primary)]/10 selection:text-[var(--fg-primary)]">
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <a href="/mizore" className="inline-flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors mb-6">
          <ArrowLeft size={16} />
          返回主页
        </a>
        <Card className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-semibold text-[var(--fg-primary)]">隐私政策</CardTitle>
            <div className="mt-2 text-xs text-[var(--fg-muted)]">更新日期：2024年7月26日</div>
          </CardHeader>
          <CardContent className="space-y-5">
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">1. 我们收集的信息</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">为了提供和改进服务，我们可能会收集必要的设备信息、使用数据以及与账户相关的信息（若您使用账户功能）。我们不会收集与您的个人身份直接关联的敏感信息，除非您主动提供并明确授权。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">2. 信息的使用</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">我们使用收集到的信息用于：提供服务、优化性能、排查问题、保障安全以及改进用户体验。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">3. 信息的共享</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">除法律要求或为履行服务所必需外，我们不会与第三方共享您的信息。在需要与合作方共享时，我们将采取合理的安全措施。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">4. 数据安全</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">我们采取合理的技术与组织措施保护您的数据安全，但任何系统都无法保证绝对安全。请妥善保管您的账户与设备。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">5. 数据保留</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">我们仅在实现本政策所述目的所需期间内保留数据，或法律要求的保留期限内。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">6. 您的权利</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">在适用法律允许的范围内，您可以请求访问、更正或删除您的数据。如需行使权利，请通过官方渠道联系我们。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">7. 政策更新</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">我们可能不时更新本隐私政策。更新内容将在页面上公布，重要变更可能通过公告通知。</p>
            </section>
            <section>
              <h2 className="text-xl text-[var(--fg-primary)]">8. 联系我们</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">如对本隐私政策有任何疑问，请通过官方渠道与我们联系。</p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}