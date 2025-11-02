export type Locale = "zh" | "en";
export const DEFAULT_LOCALE: Locale = "zh";

export const translations: Record<Locale, Record<string, string>> = {
  zh: {
    // Nav
    "nav.store": "商店",
    "nav.features": "特性",
    "nav.download": "下载",
    "nav.faq": "FAQ",
    "nav.community": "社区",
    "nav.dev": "开发组",
    "nav.menu": "菜单",

    // Hero
    "hero.subtitle": "一款为 Minecraft 1.20.1 设计的全新客户端",
    "aria.scrollDown": "向下滚动",

    // CTAs
    "cta.download": "立即下载",
    "cta.docs": "查看文档",

    // About intro inside Features
    "about.title": "Mizore 是什么？",
    "about.p1": "我们是一款为 Minecraft 1.20.1 设计的全新免费客户端，致力于提供独特、现代且易于使用的游戏体验。",
    "about.p2": "Mizore 注重核心体验的打磨，我们从零开始重构了渲染与资源管理，带来了更快的启动速度、更平滑的帧率，并移除了不必要的视觉干扰，让你的每一次点击都精准响应。我们相信设计与性能同样重要。Mizore 拥有简洁优雅的界面，并提供恰到好处的定制化选项，让你在享受极致性能的同时，也能拥有属于自己的个性化风格。",
    "about.p3": "Mizore 的诞生源于一个简单的想法：创造一款真正专注于玩家、回归游戏本质的客户端。在当前众多功能冗余、设计同质化的选择中，我们希望提供一个清爽、高效且充满美感的替代方案。我们不追求功能的堆砌，只关心能否让你更纯粹地享受 Minecraft 的乐趣。",
    "about.p4": "欢迎加入我们的社区，与我们一同见证 Mizore 的成长，体验属于未来的 Minecraft 客户端！",

    // Features cards
    "features.fast.title": "更快",
    "features.fast.desc": "冷启动与资源加载更短，交互延迟显著降低。",
    "features.stable.title": "更稳",
    "features.stable.desc": "更平滑的帧率曲线，长时间游玩依然稳定。",
    "features.simple.title": "更简",
    "features.simple.desc": "去除不必要的噪点，重要设置触手可及。",

    // Download section
    "download.title": "立即上手",
    "download.desc": "下载后即可使用，无需繁琐配置。支持 1.20.1。",
    "download.btn.install": "下载安装包",
    "download.btn.github": "GitHub",

    // Community
    "community.title": "社区与支持",
    "community.desc": "加入我们的 Discord 或 QQ 群，获取帮助、反馈问题，与开发组交流。",
    "community.btn.discord": "加入 Discord",
    "community.btn.qq": "加入 QQ 群",
    "community.btn.forum": "进入论坛",

    // FAQ
    "faq.title": "常见问题",
    "faq.q1.q": "是否支持 1.20.1?",
    "faq.q1.a": "是，面向 1.20.1 版本适配与优化。",
    "faq.q2.q": "是否需要复杂配置？",
    "faq.q2.a": "不需要。下载后即可使用，常用选项已预设。",
    "faq.q3.q": "性能如何？",
    "faq.q3.a": "启动更快、内存占用更稳，游玩体验更顺滑。",
    "faq.q4.q": "是否开源？",
    "faq.q4.a": "可在 GitHub 查看源代码与更新计划。",
    "faq.q5.q": "如何购买 Coin？",
    "faq.q5.a": "在导航打开右侧商店抽屉，选择对应套餐并下单。",
    "faq.q6.q": "支持哪些操作系统？",
    "faq.q6.a": "当前以 Windows 为主，后续将逐步完善其他平台支持。",
    "faq.q7.q": "如何反馈问题？",
    "faq.q7.a": "可在 GitHub 提交 Issue，或在文档中查看联系方式。",
    "faq.q8.q": "是否支持多语言？",
    "faq.q8.a": "计划后续引入多语言支持与国际化文档。",

    // Dev
    "dev.title": "开发组",
    "dev.subtitle": "核心团队与贡献者。",
    "store.open": "立即打开商店",
  },
  en: {
    // Nav
    "nav.store": "Store",
    "nav.features": "Features",
    "nav.download": "Download",
    "nav.faq": "FAQ",
    "nav.community": "Community",
    "nav.dev": "Team",
    "nav.menu": "Menu",

    // Hero
    "hero.subtitle": "A free client for Minecraft 1.20.1",
    "aria.scrollDown": "Scroll down",

    // CTAs
    "cta.download": "Download now",
    "cta.docs": "Docs",

    // About intro inside Features
    "about.title": "What is Mizore?",
    "about.p1": "A modern, free client designed for Minecraft 1.20.1, focused on simplicity and usability.",
    "about.p2": "We rebuilt rendering and resource management from the ground up—faster startup, smoother frame pacing, and reduced visual noise. Design and performance matter equally, with a clean UI and sensible customization.",
    "about.p3": "Mizore aims to bring a player-first experience back to the core of the game—clean, efficient, and beautiful, without feature bloat.",
    "about.p4": "Join our community and witness Mizore grow—experience the future client for Minecraft.",

    // Features cards
    "features.fast.title": "Faster",
    "features.fast.desc": "Shorter cold start and resource loading, noticeably lower input latency.",
    "features.stable.title": "Smoother",
    "features.stable.desc": "More stable frame pacing—even during long sessions.",
    "features.simple.title": "Simpler",
    "features.simple.desc": "Less visual noise, essential settings at your fingertips.",

    // Download section
    "download.title": "Get started",
    "download.desc": "Ready to use after download—no complex setup. Supports 1.20.1.",
    "download.btn.install": "Installer",
    "download.btn.github": "GitHub",

    // Community
    "community.title": "Community & Support",
    "community.desc": "Join our Discord or QQ group for help, feedback, and discussion.",
    "community.btn.discord": "Join Discord",
    "community.btn.qq": "Join QQ Group",
    "community.btn.forum": "Open Forum",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1.q": "Does it support 1.20.1?",
    "faq.q1.a": "Yes. Optimized for version 1.20.1.",
    "faq.q2.q": "Is complex configuration required?",
    "faq.q2.a": "No. It works out of the box with sensible defaults.",
    "faq.q3.q": "How about performance?",
    "faq.q3.a": "Faster startup, steadier memory usage, smoother experience.",
    "faq.q4.q": "Is it open-source?",
    "faq.q4.a": "Source code and roadmap available on GitHub.",
    "faq.q5.q": "How to purchase Coin?",
    "faq.q5.a": "Open the store drawer from the nav, select a plan and checkout.",
    "faq.q6.q": "Which OS are supported?",
    "faq.q6.a": "Primarily Windows for now; other platforms to follow.",
    "faq.q7.q": "How to report issues?",
    "faq.q7.a": "Open an issue on GitHub or check contacts in docs.",
    "faq.q8.q": "Is multi-language supported?",
    "faq.q8.a": "Planned with future internationalized documentation.",

    // Dev
    "dev.title": "Team",
    "dev.subtitle": "Core team and contributors.",
    "store.open": "Open Store",
  },
};

export function getTranslation(locale: Locale, key: string, fallback?: string) {
  return translations[locale]?.[key] ?? fallback ?? key;
}