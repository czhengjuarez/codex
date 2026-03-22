import Link from "next/link";
import {
  Robot,
  PlugsConnected,
  CheckCircle,
  Sliders,
  Database,
  Package,
  FileText,
  Terminal,
  ShieldCheck,
  Gear,
  Lock,
  Files,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { getAllDomains, getAllGovernance } from "@/lib/docs";
import type { Icon } from "@phosphor-icons/react";

const domainIcons: Record<string, Icon> = {
  ai: Robot,
  "api-design": PlugsConnected,
  "code-quality": CheckCircle,
  "control-plane": Sliders,
  "data-management": Database,
  dependencies: Package,
  documentation: FileText,
  python: Terminal,
  reliability: ShieldCheck,
  rust: Gear,
  security: Lock,
};

export default function Home() {
  const domains = getAllDomains();
  const governance = getAllGovernance();
  const totalRules = domains.reduce((sum, d) => sum + (d.ruleCount ?? 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-dark font-semibold text-sm mb-4 bg-brand-50 dark:bg-brand-950/30 px-3 py-1 rounded-full">
          <Files size={14} weight="bold" />
          Engineering Codex
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          [Your Org] Engineering Standards
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          A living, version-controlled set of engineering rules organized by domain.
          Integrate these rules into your AI coding assistant and code reviewer.
        </p>
        <div className="flex gap-6 mt-6 text-sm text-gray-500">
          <span><strong className="text-gray-900">{totalRules}</strong> total rules</span>
          <span><strong className="text-gray-900">{domains.length}</strong> domains</span>
          <span><strong className="text-gray-900">{governance.length}</strong> governance docs</span>
        </div>
      </div>

      {/* Domains grid */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Domains</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {domains.map((d) => {
            const DomainIcon = domainIcons[d.slug] ?? Files;
            return (
              <Link
                key={d.slug}
                href={`/domains/${d.slug}`}
                className="group flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-300 dark:border-brand-700 hover:bg-brand-50/50 dark:bg-brand-950/20 transition-all"
              >
                <DomainIcon
                  size={22}
                  weight="duotone"
                  className="shrink-0 mt-0.5 text-brand-600 dark:text-brand-dark group-hover:text-brand-600 dark:text-brand-dark transition-colors"
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-brand-600 dark:text-brand-dark transition-colors truncate">
                    {d.title}
                  </p>
                  {d.ruleCount !== undefined && (
                    <p className="text-xs text-gray-400 mt-0.5">{d.ruleCount} rules</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Governance + Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Governance</h2>
          <ul className="space-y-2">
            {governance.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/governance/${g.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-600 dark:text-brand-dark transition-colors"
                >
                  <ArrowRight size={14} className="text-gray-300 shrink-0" />
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/skills" className="flex items-center gap-2 text-gray-700 hover:text-brand-600 dark:text-brand-dark transition-colors">
                <ArrowRight size={14} className="text-gray-300 shrink-0" />
                AI Skills Setup (OpenCode, Cursor, Copilot)
              </Link>
            </li>
            <li>
              <Link href="/rfc" className="flex items-center gap-2 text-gray-700 hover:text-brand-600 dark:text-brand-dark transition-colors">
                <ArrowRight size={14} className="text-gray-300 shrink-0" />
                RFC Template — propose a new rule
              </Link>
            </li>
            <li>
              <a href="https://github.com/your-org/engineering-codex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-brand-600 dark:text-brand-dark transition-colors">
                <ArrowRight size={14} className="text-gray-300 shrink-0" />
                GitHub repository
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
