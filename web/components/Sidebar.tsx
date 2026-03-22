"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookBookmark, Robot, PlugsConnected, CheckCircle, Sliders, BracketsCurly,
  Database, Package, FileText, Terminal, ShieldCheck, Gear, Lock,
  Files, Scales, Sparkle, GitPullRequest, ArrowLeft,
  Cube, PaintBrush, CaretRight,
} from "@phosphor-icons/react";
import type { DocMeta } from "@/lib/docs";

interface Props {
  domains: DocMeta[];
  governance: DocMeta[];
}

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  ai: Robot, "api-design": PlugsConnected, "code-quality": CheckCircle,
  "control-plane": Sliders, "data-management": Database, dependencies: Package,
  documentation: FileText, python: Terminal, reliability: ShieldCheck,
  rust: Gear, security: Lock, typescript: BracketsCurly,
};

// Top-level codex entries
const TOP_LEVEL = [
  {
    id: "engineering",
    label: "Engineering Codex",
    icon: BookBookmark,
    description: "How we build software",
    prefix: "/engineering",
  },
  {
    id: "product",
    label: "Product Codex",
    icon: Cube,
    description: "How we define & ship product",
    prefix: "/product",
  },
  {
    id: "design",
    label: "Design Codex",
    icon: PaintBrush,
    description: "Design principles & systems",
    prefix: "/design",
  },
];

function navItemClass(active: boolean) {
  return `flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors w-full text-left ${
    active
      ? "bg-brand-50 dark:bg-brand-950/30 dark:bg-brand-950/40 text-brand-600 dark:text-brand-dark dark:text-brand-600 dark:text-brand-dark font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100"
  }`;
}

export default function Sidebar({ domains, governance }: Props) {
  const pathname = usePathname();

  const inEngineering =
    pathname === "/engineering" ||
    pathname === "/" ||
    pathname.startsWith("/domains");

  const inProduct = pathname === "/product" || pathname.startsWith("/product/");
  const inDesign = pathname === "/design" || pathname.startsWith("/design/");

  // ── PRODUCT CODEX DRILL-IN VIEW ──
  if (inProduct) {
    return (
      <nav className="p-3 py-4 space-y-5">
        <div>
          <Link href="/select" className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <ArrowLeft size={13} />
            Back to Codex
          </Link>
        </div>
        <div>
          <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Product Codex
          </p>
          <ul className="space-y-0.5">
            <li>
              <Link href="/product" className={navItemClass(pathname === "/product")}>
                <Files size={13} weight="duotone" className="shrink-0 opacity-70" />
                Overview
              </Link>
            </li>
            <li>
              <Link href="/product/how-we-ship" className={navItemClass(pathname === "/product/how-we-ship")}>
                <GitPullRequest size={13} className="shrink-0 opacity-70" />
                How We Ship
              </Link>
            </li>
            <li>
              <Link href="/product/discovery" className={navItemClass(pathname === "/product/discovery")}>
                <Sparkle size={13} weight="duotone" className="shrink-0 opacity-70" />
                Discovery
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  // ── DESIGN CODEX DRILL-IN VIEW ──
  if (inDesign) {
    return (
      <nav className="p-3 py-4 space-y-5">
        <div>
          <Link href="/select" className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <ArrowLeft size={13} />
            Back to Codex
          </Link>
        </div>
        <div>
          <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Design Codex
          </p>
          <ul className="space-y-0.5">
            <li>
              <Link href="/design" className={navItemClass(pathname === "/design")}>
                <Files size={13} weight="duotone" className="shrink-0 opacity-70" />
                Overview
              </Link>
            </li>
            <li>
              <Link href="/design/accessibility" className={navItemClass(pathname === "/design/accessibility")}>
                <CheckCircle size={13} weight="duotone" className="shrink-0 opacity-70" />
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/design/research" className={navItemClass(pathname === "/design/research")}>
                <Sparkle size={13} weight="duotone" className="shrink-0 opacity-70" />
                User Research
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  // ── TOP LEVEL VIEW ──
  if (!inEngineering) {
    return (
      <nav className="p-3 py-5 space-y-5">
        {/* OVERVIEW — top-level, applies to all codexes */}
        <div>
          <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Overview
          </p>
          <ul className="space-y-0.5">
            <li>
              <Link href="/select" className={navItemClass(pathname === "/select")}>
                <Files size={13} weight="duotone" className="shrink-0 opacity-70" />
                What is a Codex?
              </Link>
            </li>
            <li>
              <Link href="/skills" className={navItemClass(pathname === "/skills")}>
                <Sparkle size={13} weight="duotone" className="shrink-0 opacity-70" />
                Codex Skill for AI Agents
              </Link>
            </li>
            <li>
              <Link href="/rfc" className={navItemClass(pathname === "/rfc")}>
                <GitPullRequest size={13} className="shrink-0 opacity-70" />
                Writing RFCs
              </Link>
            </li>
          </ul>
        </div>

        {/* GOVERNANCE — top-level, applies to all codexes */}
        <div>
          <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Governance
          </p>
          <ul className="space-y-0.5">
            {governance.map((g) => {
              const active = pathname === `/governance/${g.slug}`;
              return (
                <li key={g.slug}>
                  <Link href={`/governance/${g.slug}`} className={navItemClass(active)}>
                    <Scales size={13} weight="duotone" className="shrink-0 opacity-70" />
                    {g.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CODEX LIST */}
        <div>
          <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Codex
          </p>
          <ul className="space-y-0.5">
            {TOP_LEVEL.map((c) => {
              const Icon = c.icon;
              if ((c as any).comingSoon) {
                return (
                  <li key={c.id}>
                    <div className="flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed select-none">
                      <span className="flex items-center gap-2">
                        <Icon size={13} weight="duotone" className="shrink-0" />
                        {c.label}
                      </span>
                      <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full shrink-0">
                        soon
                      </span>
                    </div>
                  </li>
                );
              }
              return (
                <li key={c.id}>
                  <Link
                    href={c.prefix}
                    className={navItemClass(false)}
                  >
                    <Icon size={13} weight="duotone" className="shrink-0 opacity-70" />
                    {c.label}
                    <CaretRight size={11} className="ml-auto text-gray-400 shrink-0" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }

  // ── ENGINEERING CODEX DRILL-IN VIEW ──
  return (
    <nav className="p-3 py-4 space-y-5">
      {/* Back button */}
      <div>
        <Link
          href="/select"
          className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Codex
        </Link>
      </div>

      {/* ENGINEERING OVERVIEW */}
      <div>
        <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Engineering Codex
        </p>
        <ul className="space-y-0.5">
          <li>
            <Link href="/engineering" className={navItemClass(pathname === "/engineering" || pathname === "/")}>
              <Files size={13} weight="duotone" className="shrink-0 opacity-70" />
              Overview
            </Link>
          </li>
        </ul>
      </div>

      {/* DOMAINS */}
      <div>
        <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Domains
        </p>
        <ul className="space-y-0.5">
          {domains.map((d) => {
            const DomainIcon = DOMAIN_ICONS[d.slug] ?? Files;
            const active = pathname === `/domains/${d.slug}`;
            return (
              <li key={d.slug}>
                <Link href={`/domains/${d.slug}`} className={navItemClass(active)}>
                  <DomainIcon size={13} weight="duotone" className="shrink-0 opacity-70" />
                  <span className="flex-1 min-w-0 truncate">{d.title}</span>
                  {d.ruleCount !== undefined && (
                    <span className="text-[11px] tabular-nums text-gray-400 dark:text-gray-600 shrink-0">
                      {d.ruleCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </nav>
  );
}
