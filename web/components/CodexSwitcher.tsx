"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookBookmark, Cube, PaintBrush } from "@phosphor-icons/react";

const codexes = [
  {
    id: "engineering",
    label: "Engineering Codex",
    icon: BookBookmark,
    href: "/",
    active: true,
  },
  {
    id: "product",
    label: "Product Codex",
    icon: Cube,
    href: "/product",
    active: false, // coming soon
  },
  {
    id: "design",
    label: "Design Codex",
    icon: PaintBrush,
    href: "/design",
    active: false, // coming soon
  },
];

export default function CodexSwitcher() {
  const pathname = usePathname();
  const isEngineering = !pathname.startsWith("/product") && !pathname.startsWith("/design");

  return (
    <div className="flex items-center gap-1">
      {codexes.map((c) => {
        const Icon = c.icon;
        const isActive = c.id === "engineering" ? isEngineering : pathname.startsWith(c.href);

        if (!c.active) {
          return (
            <span
              key={c.id}
              title="Coming soon"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed select-none"
            >
              <Icon size={14} weight="duotone" />
              <span className="hidden sm:inline">{c.label}</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 px-1.5 py-0.5 rounded-full ml-0.5">
                soon
              </span>
            </span>
          );
        }

        return (
          <Link
            key={c.id}
            href={c.href}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-brand-50 dark:bg-brand-950/30 dark:bg-brand-950/40 text-brand-600 dark:text-brand-dark dark:text-brand-600 dark:text-brand-dark font-medium"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Icon size={14} weight={isActive ? "fill" : "duotone"} />
            <span className="hidden sm:inline">{c.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
