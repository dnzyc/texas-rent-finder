"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600">Skip to content</a>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-950/80 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">Texas Rent Finder</Link>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/texas" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors">Cities</Link>
              <Link href="/login" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors">Log in</Link>
              <Link href="/signup" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">Sign up</Link>
              <ThemeToggle />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="sm:hidden border-t border-gray-100 dark:border-gray-800 py-3 space-y-1">
              <Link href="/texas" onClick={() => setMobileOpen(false)} className="block min-h-[44px] px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors">Cities</Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block min-h-[44px] px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors">Log in</Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="block min-h-[44px] px-4 py-3 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors text-center">Sign up</Link>
              <div className="px-4 py-2"><ThemeToggle /></div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
