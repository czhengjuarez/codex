import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getAllDomains, getAllGovernance } from "@/lib/docs";
import { BookBookmark } from "@phosphor-icons/react/dist/ssr";
import { ThemeProvider, ThemeToggle } from "@/components/ThemeProvider";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineering Codex",
  description: "A living set of engineering standards for your organization.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const domains = getAllDomains();
  const governance = getAllGovernance();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <body className="h-full flex flex-col bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 antialiased">
        <ThemeProvider>
          {/* ── Top bar ── */}
          <header className="sticky top-0 z-50 h-14 flex items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] px-5 gap-3 shrink-0">
            <Link
              href="/select"
              className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 hover:text-brand-600 dark:text-brand-dark dark:hover:text-brand-600 dark:text-brand-dark transition-colors"
            >
              <BookBookmark size={20} weight="duotone" className="text-brand-600 dark:text-brand-dark" />
              <span>Codex</span>
            </Link>

            <div className="flex-1" />

            <span className="text-sm text-gray-400 dark:text-gray-500 hidden sm:block">[Your Org]</span>
            <ThemeToggle />
          </header>

          {/* ── Body: sidebar + content ── */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar — white in light mode, dark in dark mode */}
            <aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto bg-white dark:bg-[#0d1117]">
              <Sidebar domains={domains} governance={governance} />
            </aside>

            {/* Main content area — also properly themed */}
            <main className="flex-1 overflow-y-auto bg-white dark:bg-[#0d1117]">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
