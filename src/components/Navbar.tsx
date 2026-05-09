"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled gradient-border" : "nav-top"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-glow-300 to-blush-300 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-glow-300/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-semibold text-gray-800">
              Glow Log
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/analyze"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${pathname === "/analyze" ? "text-gray-900 bg-white/70 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
            >
              Skin Analysis
            </Link>
            <Link
              href="/routine"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${pathname === "/routine" ? "text-gray-900 bg-white/70 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
            >
              Routine Tracker
            </Link>
            <Link
              href="/history"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${pathname === "/history" ? "text-gray-900 bg-white/70 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
            >
              History
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/50 transition-all"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-white/20 animate-in">
            <Link
              href="/analyze"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === "/analyze" ? "text-gray-900 bg-white/70" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
              onClick={() => setMenuOpen(false)}
            >
              Skin Analysis
            </Link>
            <Link
              href="/routine"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === "/routine" ? "text-gray-900 bg-white/70" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
              onClick={() => setMenuOpen(false)}
            >
              Routine Tracker
            </Link>
            <Link
              href="/history"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === "/history" ? "text-gray-900 bg-white/70" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
              onClick={() => setMenuOpen(false)}
            >
              History
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
