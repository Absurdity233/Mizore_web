import type { Metadata } from "next";
import "./globals.css";
import { GlobalThemeController } from "../components/GlobalThemeController";
import { LocaleProvider } from "../components/LocaleProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Mizore", template: "%s | Mizore" },
  description: "一款为我的世界 1.20.1 打造的客户端，启动更快、体验更稳，重要设置触手可及。",
  keywords: ["Minecraft", "我的世界", "1.20.1", "客户端", "性能优化", "Mizore"],
  applicationName: "Mizore",
  category: "gaming",
  openGraph: {
    title: "Mizore",
    description: "一款为我的世界 1.20.1 打造的客户端，启动更快、体验更稳，重要设置触手可及。",
    url: "/mizore",
    siteName: "Mizore",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mizore",
    description: "一款为我的世界 1.20.1 打造的客户端，启动更快、体验更稳。",
  },
  alternates: {
    canonical: "/mizore",
  },
  manifest: "/manifest.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* 早期主题初始化，避免首次渲染闪烁 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    var saved = localStorage.getItem('mizore-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (saved === 'dark' || saved === 'light') ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`,
          }}
        />
      </head>
      <body className={inter.className}>
        <LocaleProvider>
          <GlobalThemeController />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}