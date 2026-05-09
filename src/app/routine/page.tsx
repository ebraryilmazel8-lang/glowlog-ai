"use client";
import Link from "next/link";
import { CalendarCheck, Crown, Lock, CheckCircle2, Sparkles } from "lucide-react";

export default function RoutinePage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <CalendarCheck className="w-4 h-4 text-sage-400" />
            <span className="text-sm text-gray-600">Daily tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3">
            Routine Tracker
          </h1>
          <p className="text-gray-500">
            Log your morning and evening skincare routine, track your progress.
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
              Routine Tracker is a premium feature. Upgrade to log your daily skincare steps, track consistency, and build better habits.
            </p>
            <div className="bg-gradient-to-r from-glow-50 to-blush-50 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Unlimited AI analyses
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Morning & evening tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Customizable routine steps
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Full analysis history
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-sage-400" /> Skin feeling journal
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
