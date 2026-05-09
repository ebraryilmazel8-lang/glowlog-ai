"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock, Trash2, ChevronDown, ChevronUp, Sparkles, Droplets,
  Sun, Moon, CheckCircle2, ShoppingBag, Tag, Camera, ArrowLeft,
} from "lucide-react";
import type { SkinAnalysisResult } from "@/types";

interface AnalysisEntry {
  id: string;
  date: string;
  answers: {
    skinType: string;
    concerns: string[];
    ageRange: string;
    routine: string;
    budget: string;
  };
  result: SkinAnalysisResult;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("glowlog-analysis-history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const deleteEntry = (id: string) => {
    const updated = history.filter((e) => e.id !== id);
    setHistory(updated);
    localStorage.setItem("glowlog-analysis-history", JSON.stringify(updated));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem("glowlog-analysis-history");
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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

        {history.length === 0 ? (
          <div className="glass-strong rounded-3xl p-10 text-center">
            <Camera className="w-12 h-12 text-blush-200 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No analyses yet</h3>
            <p className="text-gray-400 mb-6">
              Your analysis results will appear here after you complete your first skin analysis.
            </p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold hover:shadow-lg hover:shadow-glow-400/20 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Start Your First Analysis
            </Link>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-strong rounded-2xl p-4 text-center">
                <div className="text-2xl font-display font-bold text-gray-900">
                  {history.length}
                </div>
                <div className="text-xs text-gray-400">Total Analyses</div>
              </div>
              <div className="glass-strong rounded-2xl p-4 text-center">
                <div className={`text-2xl font-display font-bold ${getScoreColor(history[0]?.result?.overallScore || 0)}`}>
                  {history[0]?.result?.overallScore || 0}
                </div>
                <div className="text-xs text-gray-400">Latest Score</div>
              </div>
              <div className="glass-strong rounded-2xl p-4 text-center">
                <div className="text-2xl font-display font-bold text-gray-900">
                  {history.length >= 2
                    ? (history[0].result.overallScore - history[1].result.overallScore > 0 ? "+" : "") +
                      (history[0].result.overallScore - history[1].result.overallScore)
                    : "--"}
                </div>
                <div className="text-xs text-gray-400">Score Change</div>
              </div>
            </div>

            {/* Clear All */}
            <div className="flex justify-end mb-4">
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear All History
              </button>
            </div>

            {/* History List */}
            <div className="space-y-4">
              {history.map((entry) => {
                const isExpanded = expandedId === entry.id;
                const r = entry.result;

                return (
                  <div
                    key={entry.id}
                    className="glass-strong rounded-2xl overflow-hidden transition-all"
                  >
                    {/* Collapsed Header */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glow-100 to-blush-100 flex items-center justify-center">
                          <span className={`text-lg font-bold ${getScoreColor(r.overallScore)}`}>
                            {r.overallScore}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {r.skinType} Skin Â· {r.hydrationLevel} Hydration
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {formatDate(entry.date)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-wrap gap-1 max-w-xs">
                          {r.concerns.slice(0, 3).map((c: string) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded-full bg-blush-50 text-blush-600 text-xs"
                            >
                              {c}
                            </span>
                          ))}
                          {r.concerns.length > 3 && (
                            <span className="text-xs text-gray-400">
                              +{r.concerns.length - 3}
                            </span>
                          )}
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 space-y-4 border-t border-gray-100/50">
                        {/* Your Answers */}
                        <div className="pt-4">
                          <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                            Your Answers
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {entry.answers.skinType && (
                              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                {entry.answers.skinType} skin
                              </span>
                            )}
                            {entry.answers.ageRange && (
                              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                Age: {entry.answers.ageRange}
                              </span>
                            )}
                            {entry.answers.routine && (
                              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                {entry.answers.routine} routine
                              </span>
                            )}
                            {entry.answers.budget && (
                              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                {entry.answers.budget}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Score Bar */}
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Overall Score</span>
                            <span>{r.overallScore}/100</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-glow-400 to-blush-400"
                              style={{ width: `${r.overallScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Skin Details */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl bg-white/50 p-3">
                            <div className="text-xs text-gray-400 mb-1">Skin Type</div>
                            <div className="font-semibold text-gray-900 text-sm capitalize">
                              {r.skinType}
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/50 p-3">
                            <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                              <Droplets className="w-3 h-3" /> Hydration
                            </div>
                            <div className="font-semibold text-gray-900 text-sm capitalize">
                              {r.hydrationLevel}
                            </div>
                          </div>
                        </div>

                        {/* Concerns */}
                        <div>
                          <div className="text-xs text-gray-400 mb-2">Detected Concerns</div>
                          <div className="flex flex-wrap gap-2">
                            {r.concerns.map((c: string) => (
                              <span
                                key={c}
                                className="px-3 py-1 rounded-full bg-blush-50 text-blush-600 text-xs font-medium"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                          <div className="text-xs text-gray-400 mb-2">Recommendations</div>
                          <div className="space-y-1.5">
                            {r.recommendations.map((rec: string) => (
                              <div key={rec} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-sage-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Routine Suggestion */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl bg-white/50 p-3">
                            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                              <Sun className="w-3 h-3" /> Morning
                            </div>
                            <div className="space-y-1">
                              {r.routineSuggestion.morning.map((s: string) => (
                                <div key={s} className="text-xs text-gray-600">{s}</div>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/50 p-3">
                            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                              <Moon className="w-3 h-3" /> Evening
                            </div>
                            <div className="space-y-1">
                              {r.routineSuggestion.evening.map((s: string) => (
                                <div key={s} className="text-xs text-gray-600">{s}</div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Product Recommendations */}
                        {r.productRecommendations && r.productRecommendations.length > 0 && (
                          <div>
                            <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3" /> Product Recommendations
                            </div>
                            <div className="space-y-2">
                              {r.productRecommendations.map((product: {name: string; type: string; price: string; reason: string}, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-glow-50/50 to-purple-50/50 border border-glow-100"
                                >
                                  <Tag className="w-4 h-4 text-glow-500 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-medium text-gray-800 text-sm">{product.name}</span>
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-glow-100 text-glow-700">
                                        {product.type}
                                      </span>
                                    </div>
                                    <div className="text-xs text-glow-600 font-medium mt-0.5">{product.price}</div>
                                    <p className="text-xs text-gray-500 mt-1">{product.reason}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Delete */}
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete this analysis
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* New Analysis Button */}
            <div className="mt-8 text-center">
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold hover:shadow-lg hover:shadow-glow-400/20 transition-all"
              >
                <Camera className="w-5 h-5" />
                New Analysis
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
