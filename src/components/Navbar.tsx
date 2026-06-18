import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600">Skip to content</a>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">Texas Apartments</Link>
            <div className="flex items-center gap-2">
              <Link href="/texas" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">Cities</Link>
              <Link href="/login" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">Log in</Link>
              <Link href="/signup" className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Sign up</Link>
            <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
