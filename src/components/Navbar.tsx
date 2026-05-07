"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, Sparkles, User, LogOut } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-glow-300 to-blush-300 flex items-center justify-center group-hover:scale-110 transition-transform">
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

            {session ? (
              <div className="flex items-center gap-3 ml-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-700">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="ml-4 px-5 py-2 rounded-xl bg-gradient-to-r from-glow-400 to-blush-400 text-white text-sm font-medium hover:shadow-lg hover:shadow-glow-200/50 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/50"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link href="/analyze" className="block px-4 py-2 rounded-xl text-gray-600 hover:bg-white/50" onClick={() => setMenuOpen(false)}>
              Skin Analysis
            </Link>
            <Link href="/routine" className="block px-4 py-2 rounded-xl text-gray-600 hover:bg-white/50" onClick={() => setMenuOpen(false)}>
              Routine Tracker
            </Link>
            {session ? (
              <button onClick={() => signOut()} className="w-full text-left px-4 py-2 rounded-xl text-gray-600 hover:bg-white/50">
                Sign Out
              </button>
            ) : (
              <button onClick={() => signIn()} className="w-full text-left px-4 py-2 rounded-xl text-glow-500 font-medium hover:bg-white/50">
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
