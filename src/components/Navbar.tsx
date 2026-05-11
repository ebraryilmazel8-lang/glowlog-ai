"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Crown } from "lucide-react";

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

  const navLinks = [
    { href: "/analyze", label: "Skin Analysis" },
    { href: "/routine", label: "Routine Tracker" },
    { href: "/history", label: "History" },
    { href: "/blog", label: "Glow Guide" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "nav-scrolled gradient-border" : "nav-top"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-glow-300 to-blush-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-glow-400 to-blush-400 bg-clip-text text-transparent tracking-tight">
              Glow Log
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href ? "text-gray-900 bg-white/70" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://glowlog.lemonsqueezy.com/checkout/buy/a53c85e9-3150-4efc-acab-e91af26ab7a6"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Crown className="w-4 h-4" />
              Premium
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/50 transition-all"
                          aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden py-3 px-2 border-t border-white/20 animate-in bg-white/95 backdrop-blur-xl shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href ? "text-gray-900 bg-white/70" : "text-gray-600 hover:text-gray-900 hover:bg-white/50"}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://glowlog.lemonsqueezy.com/checkout/buy/a53c85e9-3150-4efc-acab-e91af26ab7a6"
            target="_blank"
            rel="noopener noreferrer"
            className="block mx-4 mt-2 text-center px-4 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-md"
            onClick={() => setMenuOpen(false)}
          >
            <Crown className="w-4 h-4 inline mr-1.5" />
            Get Premium
          </a>
        </div>
      )}
    </nav>
  );
}
