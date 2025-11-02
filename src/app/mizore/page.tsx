"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowRight, ArrowDown, Github, Download, Zap, Activity, Layout, Coins, Check, X, Menu } from "lucide-react";
import { ThemeToggle } from "../../components/ThemeToggle";
import { LocaleToggle } from "../../components/LocaleToggle";
import { useLocale } from "../../components/LocaleProvider";

/**
 * Mizore — Linear-style landing page
 * Tech: React + Tailwind + Framer Motion + shadcn/ui + Lucide
 * Accent color: #5B8CFF
 * Language: 简体中文，尽量简洁
 */

// Accent brand color
const BRAND = "#5B8CFF";

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function MizoreLinearLanding() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [storeOpen, setStoreOpen] = React.useState(false);
  const [downloadOpen, setDownloadOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("features");
  const { t } = useLocale();
  // 顶部滚动进度条（更丝滑的动画）
  const { scrollYProgress } = useScroll();
  const scrollBarX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);
  // 仅在开发环境运行简单断言
  React.useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      runDevTests();
    }
  }, []);

  // 导航激活态：根据页面区块可见性高亮对应导航项
  React.useEffect(() => {
    const ids = ["features", "community", "faq", "dev"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is Element => !!el);
    if (elements.length === 0) return;

    let current = "";
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible.length > 0) {
          const id = (visible[0].target as HTMLElement).id;
          if (id && id !== current) {
            current = id;
            setActiveSection(id);
          }
        }
      },
      { root: null, threshold: [0.6], rootMargin: "0px 0px -40% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 已由 useScroll + useSpring 驱动，无需手动监听滚动

  // 打开商店抽屉时，激活“商店”项
  React.useEffect(() => {
    if (storeOpen) {
      setActiveSection("store");
    }
  }, [storeOpen]);

  // 下载抽屉打开时不改变导航激活态（已移除下载导航项）
  React.useEffect(() => {
    // no-op
  }, [downloadOpen]);

  // 关闭商店后，立即根据当前视口重新计算激活态
  React.useEffect(() => {
    if (!storeOpen && !downloadOpen) {
      const ids = ["features", "community", "faq", "dev"];
      const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
      let bestId = "";
      let bestVisible = -1;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        if (visible > bestVisible) {
          bestVisible = visible;
          bestId = id;
        }
      });
      setActiveSection(bestId || "");
    }
  }, [storeOpen]);

  return (
    <div className="min-h-screen text-[var(--fg-primary)] bg-[var(--bg-page)] selection:bg-[var(--fg-primary)]/10 selection:text-[var(--fg-primary)]">
      {/* Background grid + radial glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 0%, rgba(91,140,255,0.18) 0%, rgba(11,15,25,0) 60%)",
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" style={{ stroke: 'var(--border-color)' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* top accent line */}
        <div
          className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
          }}
        />
        {/* texture layers */}
        <div className="absolute inset-0 texture-noise" />
        <div className="absolute inset-0 texture-vignette" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg-page)]/60">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,1fr,auto] items-center gap-3 px-4 py-3">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden sm:inline text-sm text-[var(--fg-muted)]">Minecraft 1.20.1 客户端</span>
          </div>
          {/* Center: nav (desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-1">
            <NavItem href="#store" onClick={() => setStoreOpen(true)} active={activeSection === "store"}>{t("nav.store")}</NavItem>
            <NavItem href="#features" active={activeSection === "features"}>{t("nav.features")}</NavItem>
            <NavItem href="#community" active={activeSection === "community"}>{t("nav.community")}</NavItem>
            <NavItem href="#faq" active={activeSection === "faq"}>{t("nav.faq")}</NavItem>
            <NavItem href="#dev" active={activeSection === "dev"}>{t("nav.dev")}</NavItem>
          </nav>
          {/* Right: actions */}
          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
            <LocaleToggle />
            <div className="hidden md:inline-flex">
              <Button variant="primary" className="focus-ring h-9 rounded-full px-3 border-0" onClick={() => setDownloadOpen(true)}>
                <Download aria-hidden="true" className="mr-2 h-4 w-4" /> {t("nav.download")}
              </Button>
            </div>
            <Button
              variant="ghost"
              className="focus-ring h-9 rounded-full px-3 md:hidden"
              aria-label={t("nav.menu")}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <Menu aria-hidden="true" className="mr-2 h-4 w-4" /> {t("nav.menu")}
            </Button>
          </div>
        </div>
        {/* Mobile nav overlay */}
        <MobileNav
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpenStore={() => { setStoreOpen(true); setMobileMenuOpen(false); }}
          active={activeSection}
        />
      </header>

      {/* 顶部滚动进度条 */}
      <div className="fixed left-0 top-0 z-[50] h-[2px] w-full pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--brand)] to-transparent shadow-[0_0_12px_rgba(91,140,255,0.4)]"
          style={{ scaleX: scrollBarX, transformOrigin: 'left' }}
        />
      </div>

      {/* Hero */}
      <main className="mx-auto w-full max-w-6xl px-4">
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative mx-auto min-h-screen flex flex-col items-center justify-center text-center -translate-y-4 md:-translate-y-8"
        >
          <motion.h1
            variants={fade}
            className="relative text-5xl md:text-6xl font-semibold"
          >
          <span className="cyber-title" data-text="Mizore">Mizore</span>
            <span className="cyber-reflect" aria-hidden="true">Mizore</span>
          </motion.h1>
          <motion.p variants={fade} className="relative z-10 mt-4 max-w-xl text-base md:text-lg text-[var(--fg-muted)]">
            {t("hero.subtitle")}
          </motion.p>


          <motion.div variants={fade} className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => setDownloadOpen(true)}
              variant="primary"
              className="btn-brand-gradient focus-ring h-11 rounded-full px-5 text-base font-medium transition-transform"
            >
              {t("cta.download")} <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Button>
            <a href="#faq">
              <Button
                variant="ghost"
                className="focus-ring h-11 rounded-full px-5 text-base transition-transform active:translate-y-[1px]"
              >
                {t("cta.docs")}
              </Button>
            </a>
          </motion.div>
          <a
            href="#features"
            aria-label={t("aria.scrollDown")}
            className="group absolute bottom-16 left-1/2 -translate-x-1/2 z-20 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/40 px-3 py-3 text-[var(--fg-muted)] backdrop-blur-sm shadow-[0_8px_24px_rgba(91,140,255,0.18)] hover:text-[var(--fg-primary)] hover:shadow-[0_8px_32px_rgba(91,140,255,0.3)] transition-colors"
          >
            <ArrowDown aria-hidden="true" className="h-5 w-5 animate-bounce" />
          </a>
        </motion.section>

        {/* Divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* Features */}
        <motion.section
          id="features"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-5 md:mt-28 md:grid-cols-3 scroll-mt-28"
        >
          <motion.div variants={fade} className="col-span-1 md:col-span-3 mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold text-[var(--fg-primary)]">{t("about.title")}</h2>
            <div className="mt-4 space-y-5 text-base text-[var(--fg-muted)] leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
              <p>{t("about.p4")}</p>
            </div>
          </motion.div>
          {[
            {
              title: t("features.fast.title"),
              desc: t("features.fast.desc"),
              icon: <Zap className="h-4 w-4" />,
            },
            {
              title: t("features.stable.title"),
              desc: t("features.stable.desc"),
              icon: <Activity className="h-4 w-4" />,
            },
            {
              title: t("features.simple.title"),
              desc: t("features.simple.desc"),
              icon: <Layout className="h-4 w-4" />,
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fade}>
              <Card className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-all hover:-translate-y-0.5 hover:bg-[var(--hover-bg)] hover:shadow-[0_8px_24px_rgba(91,140,255,0.18)]">
              <CardHeader className="pb-1">
                <div className="mb-2 flex items-center gap-2 text-sm text-[var(--fg-muted)]" style={{ color: BRAND }}>
                  {item.icon}
                </div>
                <CardTitle className="text-xl text-[var(--fg-primary)]">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-[var(--fg-muted)]">{item.desc}</p>
              </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Download removed: replaced by right-side drawer */}

        {/* Community moved above; removing duplicate section here */}

        {/* FAQ */}
        <motion.section
          id="faq"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-20 max-w-6xl md:mt-28 scroll-mt-28"
        >
          <h3 className="text-2xl text-[var(--fg-primary)]">{t("faq.title")}</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <motion.div variants={fade}><FaqItem q={t("faq.q1.q")} a={t("faq.q1.a")} /></motion.div>
            <motion.div variants={fade}><FaqItem q={t("faq.q2.q")} a={t("faq.q2.a")} /></motion.div>
            <motion.div variants={fade}><FaqItem q={t("faq.q3.q")} a={t("faq.q3.a")} /></motion.div>
            <motion.div variants={fade}><FaqItem q={t("faq.q4.q")} a={t("faq.q4.a")} /></motion.div>
            <motion.div variants={fade}>
              <FaqItem q={t("faq.q5.q")} a={t("faq.q5.a")}>
                <div className="mt-3">
                  <Button variant="primary" className="h-9 rounded-full px-3" onClick={() => setStoreOpen(true)}>
                    {t("store.open")}
                  </Button>
                </div>
              </FaqItem>
            </motion.div>
            <motion.div variants={fade}><FaqItem q={t("faq.q6.q")} a={t("faq.q6.a")} /></motion.div>
            <motion.div variants={fade}><FaqItem q={t("faq.q7.q")} a={t("faq.q7.a")} /></motion.div>
            <motion.div variants={fade}><FaqItem q={t("faq.q8.q")} a={t("faq.q8.a")} /></motion.div>
          </div>
        </motion.section>

        {/* Community & Support */}
        <motion.section
          id="community"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-20 max-w-6xl md:mt-28 scroll-mt-28"
        >
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--bg-card)] to-transparent p-6 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-2xl text-[var(--fg-primary)]">{t("community.title")}</h3>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{t("community.desc")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#" target="_blank" rel="noreferrer">
                <Button variant="primary" className="btn-brand-gradient focus-ring h-11 rounded-full px-5">
                  <ArrowRight aria-hidden="true" className="mr-2 h-4 w-4" /> {t("community.btn.discord")}
                </Button>
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <Button variant="ghost" className="focus-ring h-11 rounded-full px-5">
                  <ArrowRight aria-hidden="true" className="mr-2 h-4 w-4" /> {t("community.btn.qq")}
                </Button>
              </a>
            </div>
          </div>
        </motion.section>

        {/* Store: 已改为右侧内嵌窗口抽屉，通过导航打开 */}

        {/* Dev */}
        <motion.section
          id="dev"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-20 max-w-6xl md:mt-28 scroll-mt-28"
        >
          <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 md:p-8">
            <h2 className="text-2xl text-[var(--fg-primary)]">{t("dev.title")}</h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{t("dev.subtitle")}</p>
            <div className="mt-6 overflow-hidden relative">
               {/* Left Fade */}
              <div className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-card)] to-transparent" />
              {(() => {
                const members = [
                  { name: "Absurdity", role: "全栈 / Java · Go", gh: "Absurdity233", initials: "A" },
                  { name: "Limerence", role: "客户端", gh: "Limerence", initials: "L" },
                  { name: "Haohao", role: "客户端", gh: "Haohao", initials: "H" },
                  { name: "Ag²O", role: "客户端", gh: "Ag²O", initials: "A" },
                ];
                const items = [...members, ...members, ...members];
                return (
                  <motion.div
                    className="flex gap-4 py-1"
                    drag="x"
                    dragConstraints={{ left: -2000, right: 0 }}
                    dragElastic={0.05}
                    whileDrag={{ cursor: "grabbing" }}
                    animate={shouldReduceMotion || isHovered ? undefined : { x: "-66.6667%" }}
                    transition={shouldReduceMotion ? undefined : { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 36 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    style={{ willChange: shouldReduceMotion ? undefined : "transform" }}
                  >
                    {items.map((m, i) => (
                      <Card
                        key={`${m.gh}-${i}`}
                        className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[320px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-all hover:-translate-y-0.5 hover:bg-[var(--hover-bg)] hover:shadow-[0_8px_24px_rgba(91,140,255,0.18)]"
                      >
                        <CardHeader className="pb-1">
                          <div className="flex items-center gap-3">
                            <div
                              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-sm"
                              style={{ boxShadow: `inset 0 0 0 1px ${BRAND}40` }}
                            >
                              {m.initials}
                            </div>
                            <div>
                              <div className="text-base text-[var(--fg-primary)]">{m.name}</div>
                              <div className="text-sm text-[var(--fg-muted)]">{m.role}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <a
                            className="inline-flex items-center text-sm text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                            href={`https://github.com/${m.gh}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Github className="mr-1 h-4 w-4" /> {m.gh}
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                );
              })()}
              {/* Right Fade */}
              <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-card)] to-transparent" />
            </div>
          </div>
        </motion.section>

        <footer className="mx-auto mt-20 max-w-6xl px-4 pb-10 text-xs text-[var(--fg-muted)]">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
          <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="flex items-center gap-2">
              <Logo small />
              <span>© {new Date().getFullYear()} Mizore</span>
            </div>
            <div className="flex items-center gap-4">
              <a className="hover:text-[var(--fg-primary)]" href="/docs">文档</a>
              <a className="hover:text-[var(--fg-primary)]" href="/docs/terms">条款</a>
              <a className="hover:text-[var(--fg-primary)]" href="/docs/privacy">隐私</a>
              <a className="hover:text-[var(--fg-primary)]" href="/docs/forum">论坛</a>
              <a className="hover:text-[var(--fg-primary)]" href="/docs/changelog">更新日志</a>
            </div>
          </div>
        </footer>
      </main>
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      <StoreWindow open={storeOpen} onClose={() => setStoreOpen(false)} />
      <DownloadWindow open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </div>
  );
}

function NavItem({ href, children, onClick, active = false }: { href: string; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <a
      href={href}
      onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
      className={`nav-ink focus-ring rounded-full px-3 py-1 text-sm transition ${active ? "bg-[var(--hover-bg)] text-[var(--fg-primary)]" : "text-[var(--fg-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--fg-primary)]"}`}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : "false"}
    >
      {children}
    </a>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={"grid place-items-center rounded-xl p-[2px]"}
        style={{
          background: `linear-gradient(135deg, ${BRAND}, ${blend(BRAND, "#000000", 0.5)})`,
        }}
      >
        <div className={`${small ? "h-5 w-5" : "h-7 w-7"} rounded-[10px] bg-[var(--bg-page)]`}>
          <div className="h-full w-full rounded-[10px]" style={{ boxShadow: `inset 0 0 0 1px ${BRAND}40` }} />
        </div>
      </div>
      <span className={`font-medium ${small ? "text-sm" : "text-base"} text-[var(--fg-primary)]`}>Mizore</span>
    </div>
  );
}

function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
      <div className="w-[90%] max-w-sm rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5">
        <div className="text-lg font-medium text-[var(--fg-primary)]">登录</div>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">此为占位弹窗。后续可对接账户与购买记录。</p>
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" className="rounded-full" onClick={onClose}>关闭</Button>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ open, onClose, onOpenStore, active }: { open: boolean; onClose: () => void; onOpenStore: () => void; active?: string }) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const prevActive = document.activeElement as HTMLElement | null;
    if (first) first.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        if (focusables.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="fixed left-0 right-0 top-0 z-[45] mt-[56px] mx-auto w-full max-w-6xl px-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.menu")}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3 shadow-xl"
            >
              <div className="grid grid-cols-1">
                <a
                  href="#features"
                  onClick={onClose} // eslint-disable-line
                  className={`rounded-xl px-3 py-3 text-base ${active === 'features' ? 'bg-[var(--hover-bg)] text-[var(--fg-primary)]' : 'text-[var(--fg-primary)] hover:bg-[var(--hover-bg)]'}`}
                >
                  {t("nav.features")}
                </a>
                
                {/* Download removed from mobile menu */}
                <a
                  href="#community"
                  onClick={onClose} // eslint-disable-line
                  className={`rounded-xl px-3 py-3 text-base ${active === 'community' ? 'bg-[var(--hover-bg)] text-[var(--fg-primary)]' : 'text-[var(--fg-primary)] hover:bg-[var(--hover-bg)]'}`}
                >
                  {t("nav.community")}
                </a>
                <a
                  href="#faq"
                  onClick={onClose} // eslint-disable-line
                  className={`rounded-xl px-3 py-3 text-base ${active === 'faq' ? 'bg-[var(--hover-bg)] text-[var(--fg-primary)]' : 'text-[var(--fg-primary)] hover:bg-[var(--hover-bg)]'}`}
                >
                  {t("nav.faq")}
                </a>
                <a
                  href="#dev"
                  onClick={onClose} // eslint-disable-line
                  className={`rounded-xl px-3 py-3 text-base ${active === 'dev' ? 'bg-[var(--hover-bg)] text-[var(--fg-primary)]' : 'text-[var(--fg-primary)] hover:bg-[var(--hover-bg)]'}`}
                >
                  {t("nav.dev")}
                </a>
                <button
                  onClick={onOpenStore}
                  className={`text-left rounded-xl px-3 py-3 text-base ${active === 'store' ? 'bg-[var(--hover-bg)] text-[var(--fg-primary)]' : 'text-[var(--fg-primary)] hover:bg-[var(--hover-bg)]'}`}
                >
                  {t("nav.store")}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StoreWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const prevActive = document.activeElement as HTMLElement | null;
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        if (focusables.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            id="store-window"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-title"
            className="fixed right-0 top-0 bottom-0 z-[60] w-[min(92vw,560px)] border-l border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-[var(--fg-primary)]">
                <Coins className="h-4 w-4" />
                <span id="store-title" className="text-sm">商店</span>
              </div>
              <Button variant="ghost" className="rounded-full" onClick={onClose}>
                <X className="mr-2 h-4 w-4" /> 关闭
              </Button>
            </div>
            <div className="h-full overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "100 Coin", price: "¥3", features: ["通用消费", "无过期"], cta: "购买 Coin" },
                  { name: "250 Coin", price: "¥7", features: ["通用消费", "无过期"], cta: "购买 Coin" },
                  { name: "500 Coin", price: "¥12", features: ["更优单价", "无过期"], cta: "购买 Coin" },
                  { name: "1000 Coin", price: "¥23", features: ["更优单价", "优先更新权益"], cta: "购买 Coin" },
                  { name: "2000 Coin", price: "¥45", features: ["更优单价", "优先更新权益"], cta: "购买 Coin" },
                  { name: "5000 Coin", price: "¥85", features: ["最佳单价", "优先支持"], cta: "购买 Coin" },
                ].map((p, i) => (
                  <Card key={i} className="rounded-2xl">
                    <CardHeader className="pb-0">
                      <CardTitle className="text-xl text-[var(--fg-primary)]">{p.name}</CardTitle>
                      <div className="mt-1 text-3xl font-semibold" style={{ color: BRAND }}>{p.price}</div>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <ul className="space-y-2 text-sm text-[var(--fg-muted)]">
                        {p.features.map((f: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Button variant="primary" className="w-full h-10 rounded-full">
                          <Coins className="mr-2 h-4 w-4" /> {p.cta}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DownloadWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLocale();
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const prevActive = document.activeElement as HTMLElement | null;
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        if (focusables.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            id="download-window"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-title"
            className="fixed right-0 top-0 bottom-0 z-[60] w-[min(92vw,560px)] border-l border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-[var(--fg-primary)]">
                <Download className="h-4 w-4" />
                <span id="download-title" className="text-sm">{t("download.title")}</span>
              </div>
              <Button variant="ghost" className="rounded-full" onClick={onClose}>
                <X className="mr-2 h-4 w-4" /> 关闭
              </Button>
            </div>
            <div className="h-full overflow-y-auto p-4">
              <div className="space-y-4">
                <p className="text-sm text-[var(--fg-muted)]">{t("download.desc")}</p>
                <div className="grid grid-cols-1 gap-4">
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-0">
                      <CardTitle className="text-xl text-[var(--fg-primary)]">{t("download.btn.install")}</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <Button variant="primary" className="w-full h-10 rounded-full">
                        <Download className="mr-2 h-4 w-4" /> {t("download.btn.install")}
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-0">
                      <CardTitle className="text-xl text-[var(--fg-primary)]">{t("download.btn.github")}</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <Button variant="ghost" className="w-full h-10 rounded-full">
                        <Github className="mr-2 h-4 w-4" /> {t("download.btn.github")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FaqItem({ q, a, children }: { q: string; a: string; children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <motion.div
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]"
      animate={{ height: isOpen ? "auto" : "auto" }}
    >
      <button
        className="focus-ring list-none cursor-pointer rounded-2xl px-4 py-3 md:px-5 md:py-4 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className="text-base text-[var(--fg-primary)]">{q}</span>
          <ArrowDown aria-hidden="true" className={`h-4 w-4 text-[var(--fg-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 md:px-5 md:pb-5">
              <p className="text-sm leading-6 text-[var(--fg-muted)]">{a}</p>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Utility: blend two hex colors
function blend(hexA: string, hexB: string, t: number) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const m = {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
  return `rgb(${m.r}, ${m.g}, ${m.b})`;
}

function hexToRgb(hex: string) {
  try {
    if (!hex) throw new Error("empty");
    let h = hex.trim();
    if (h.startsWith("#")) h = h.slice(1);

    // 允许 3/6/8 位；其他视为非法
    if (h.length === 3) {
      h = h.split("").map((ch) => ch + ch).join("");
    }

    if (h.length !== 6 && h.length !== 8) throw new Error("bad length");
    if (!/^[0-9a-fA-F]{6,8}$/.test(h)) throw new Error("non-hex");

    const bigint = Number.parseInt(h, 16);
    if (Number.isNaN(bigint)) throw new Error("nan");

    if (h.length === 8) {
      // 忽略 alpha，仅取 RGB（ARGB 或 RGBA 推断按高位在前处理）
      const r = (bigint >> 24) & 255;
      const g = (bigint >> 16) & 255;
      const b = (bigint >> 8) & 255;
      return { r, g, b };
    }

    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  } catch {
    // 回退到品牌色，以保证 UI 不中断
    return { r: 91, g: 140, b: 255 };
  }
}

// ---- Dev-only tiny tests ----
function runDevTests() {
  try {
    const cases = [
      { input: "#5B8CFF", expect: { r: 91, g: 140, b: 255 } },
      { input: "5B8CFF", expect: { r: 91, g: 140, b: 255 } },
      { input: "#abc", expect: { r: 170, g: 187, b: 204 } },
      { input: "#FF00FF80", expect: { r: 255, g: 0, b: 255 } },
      { input: "not-a-color", expect: { r: 91, g: 140, b: 255 } },
    ];
    cases.forEach((c, i) => {
      const out = hexToRgb(c.input);
      const ok = out.r === c.expect.r && out.g === c.expect.g && out.b === c.expect.b;
      // eslint-disable-next-line no-console
      console.assert(ok, `hexToRgb case ${i} failed:`, c.input, out, c.expect);
    });

    const blended = blend("#000000", "#ffffff", 0.5);
    // eslint-disable-next-line no-console
    console.assert(/^rgb\(\d+, \d+, \d+\)$/.test(blended), "blend should return rgb() string", blended);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Dev tests encountered an error:", e);
  }
}