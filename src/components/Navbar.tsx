"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-glow-300 to-blush-300 flex items-center justify-center group-hover:scale-110 transition-all">
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
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all"
            >
              Skin Analysis
            </Link>
            <Link
              href="/routine"
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all"
            >
              Routine Tracker
            </Link>
            <Link
              href="/history"
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all"
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
          <div className="md:hidden py-3 border-t border-white/20">
            <Link
              href="/analyze"
              className="block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50"
              onClick={() => setMenuOpen(false)}
            >
              Skin Analysis
            </Link>
            <Link
              href="/routine"
              className="block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50"
              onClick={() => setMenuOpen(false)}
            >
              Routine Tracker
            </Link>
            <Link
              href="/history"
              className="block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50"
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
