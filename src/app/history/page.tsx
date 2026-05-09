"use client";
import Link from "next/link";
import { Clock, Crown, Lock, CheckCircle2, Sparkles } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Clock className="w-4 h-4 text-glow-400" />
            <span className="text-sm text-gray-600">Track Your Progress</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3">
            Analysis History
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            View your past skin analyses and track how your skin changes over time.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="glass-strong rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Premium Feature
            </h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              Analysis History is a premium feature. Upgrade to track your skin progress over time, compare past results, and see how your skin improves.
            </p>
            <div className="bg-gradient-to-r from-glow-50 to-blush-50 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Unlimited AI analyses
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Full analysis history
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Routine tracker
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Progress tracking & trends
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Personalized product picks
              </div>
            </div>
            <button
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-amber-400/30 transition-all flex items-center justify-center gap-2"
              onClick={() => window.open("https://glowlog.lemonsqueezy.com/checkout/buy/a53c85e9-3150-4efc-acab-e91af26ab7a6", "_blank")}
            >
              <Lock className="w-5 h-5" /> Unlock Premium — $4.99/mo
            </button>
            <p className="text-xs text-gray-400">Cancel anytime · Instant access</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 mb-3">{"Haven't tried your free analysis yet?"}</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold hover:shadow-lg hover:shadow-glow-400/20 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Try Free Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}
