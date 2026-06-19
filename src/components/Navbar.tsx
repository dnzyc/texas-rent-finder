"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-blue-600 focus:rounded-lg focus:m-4">Skip to content</a>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl rounded-full border border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-black/5 dark:shadow-black/20">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Texas Rent Finder
            </Link>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-1">
              <Link href="/texas" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-200">
                Cities
              </Link>
              <Link href="/login" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-all duration-200">
                Log in
              </Link>
              <Link href="/signup" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-500/20 active:scale-[0.98]">
                Sign up
              </Link>
              <div className="ml-1"><ThemeToggle /></div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu — expanded glass panel */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-gray-200/50 dark:border-gray-800/50 py-3 px-3 space-y-1">
            <Link href="/texas" onClick={() => setMobileOpen(false)} className="block min-h-[44px] px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors">Cities</Link>
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block min-h-[44px] px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors">Log in</Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)} className="block min-h-[44px] px-4 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors text-center">Sign up</Link>
            <div className="px-4 py-2"><ThemeToggle /></div>
          </div>
        )}
      </nav>
    </>
  );
}
