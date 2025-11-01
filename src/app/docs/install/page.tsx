export default function InstallPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[var(--fg-primary)]">
      <h1 className="text-3xl font-semibold">安装</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">快速开始使用 Mizore 客户端的安装指南。</p>
      <ol className="mt-6 space-y-3 text-sm text-[var(--fg-muted)]">
        <li>1. 前往 <a href="/mizore#download" className="text-[var(--fg-primary)] hover:underline">下载</a> 区域获取安装包。</li>
        <li>2. 双击安装程序并跟随提示完成安装。</li>
        <li>3. 启动客户端，按需调整设置。</li>
      </ol>
      <div className="mt-10 text-xs text-[var(--fg-muted)]">
        <a href="/docs" className="hover:text-[var(--fg-primary)]">返回文档索引</a>
      </div>
    </main>
  );
}