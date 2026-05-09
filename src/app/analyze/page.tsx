"use client";
import { useState, useRef, useEffect } from "react";
import {
  Camera, Upload, Loader2, Sparkles, Droplets,
  AlertCircle, CheckCircle2, Sun, Moon, X, ChevronRight, ArrowLeft, Tag, ShoppingBag, Lock, Crown,
} from "lucide-react";
import type { SkinAnalysisResult } from "@/types";

export default function AnalyzePage() {
  const [image, setImage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    skinType: "",
    concerns: [] as string[],
    ageRange: "",
    routine: "",
    budget: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const FREE_ANALYSIS_KEY = "glowlog-analysis-count";
  const [hasUsedFree, setHasUsedFree] = useState(false);

  useEffect(() => {
    const count = parseInt(localStorage.getItem(FREE_ANALYSIS_KEY) || "0", 10);
    if (count >= 1) setHasUsedFree(true);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("File size must be under 10MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      setImage(dataUrl.split(",")[1]);
      setError(null);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const toggleConcern = (c: string) => {
    setAnswers((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(c)
        ? prev.concerns.filter((x) => x !== c)
        : [...prev.concerns, c],
    }));
  };

  const saveToHistory = (analysisResult: SkinAnalysisResult) => {
    try {
      const historyKey = "glowlog-analysis-history";
      const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");
      const entry = {
        id: `analysis-${Date.now()}`,
        date: new Date().toISOString(),
        answers: { ...answers },
        result: analysisResult,
      };
      existing.unshift(entry);
      // Keep max 50 entries
      if (existing.length > 50) existing.length = 50;
      localStorage.setItem(historyKey, JSON.stringify(existing));
    } catch {
      // Silently fail if localStorage is full
    }
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          mimeType: "image/jpeg",
          userInfo: {
            skinType: answers.skinType,
            concerns: answers.concerns,
            ageRange: answers.ageRange,
            routine: answers.routine,
            budget: answers.budget,
          },
        }),
      });
      if (!res.ok) throw new Error("Analysis failed.");
      const data = await res.json();
      setResult(data);
      saveToHistory(data);
      // Increment usage counter
      const currentCount = parseInt(localStorage.getItem(FREE_ANALYSIS_KEY) || "0", 10);
      localStorage.setItem(FREE_ANALYSIS_KEY, String(currentCount + 1));
      setHasUsedFree(true);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const concernOptions = [
    "Acne", "Wrinkles", "Dark Spots", "Redness",
    "Dryness", "Oiliness", "Large Pores", "Uneven Tone",
  ];

  const stepLabels = ["Photo", "Questions", "Results"];

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Camera className="w-4 h-4 text-glow-400" />
            <span className="text-sm text-gray-600">Powered by Gemini AI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3">
            AI Skin Analysis
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Upload a photo and answer a few quick questions for a personalized skin analysis.
          </p>
          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step >= s
                      ? "bg-gradient-to-r from-glow-400 to-blush-400 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-8 h-0.5 ${step > s ? "bg-blush-400" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2 text-xs text-gray-400">
            {stepLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        
        {/* PAYWALL - Premium Required */}
        {hasUsedFree && step !== 3 && (
          <div className="max-w-lg mx-auto">
            <div className="glass-strong rounded-3xl p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Premium Analysis
              </h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                {"You've used your free analysis! Upgrade to Premium for unlimited AI skin analyses, detailed reports, and personalized product recommendations."}
              </p>
              <div className="bg-gradient-to-r from-glow-50 to-blush-50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-sage-400" /> Unlimited AI analyses
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-sage-400" /> Detailed skin reports
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-sage-400" /> Product recommendations
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-sage-400" /> Progress tracking
                </div>
              </div>
              <button
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-amber-400/30 transition-all flex items-center justify-center gap-2"
                onClick={() => window.open("https://glowlog.lemonsqueezy.com/checkout/buy/a53c85e9-3150-4efc-acab-e91af26ab7a6", "_blank")}
              >
                <Lock className="w-5 h-5" /> Get Premium Access
              </button>
              <p className="text-xs text-gray-400">169.99 TL/month - Cancel anytime</p>
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {!hasUsedFree && step === 1 && (
          <div className="max-w-lg mx-auto space-y-4">
            <div
              onClick={() => fileRef.current?.click()}
              className={`relative rounded-3xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                preview
                  ? "border-transparent"
                  : "border-blush-200 hover:border-blush-300 bg-white/50 hover:bg-white/70"
              }`}
              style={{ minHeight: "320px" }}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Uploaded photo"
                    className="w-full h-80 object-cover rounded-3xl"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(null);
                      setImage(null);
                      setResult(null);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center p-6">
                  <Upload className="w-10 h-10 text-blush-300 mb-4" />
                  <p className="font-medium text-gray-700 mb-1">Upload your photo</p>
                  <p className="text-sm text-gray-400">Click or drag & drop - Max 10MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
            {image && (
              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold text-lg hover:shadow-lg hover:shadow-glow-400/20 transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-5 h-5" />
              </button>
            )}
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {!hasUsedFree && step === 2 && (
          <div className="max-w-lg mx-auto space-y-6">
            {/* Q1 */}
            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                1. What is your skin type?
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {["Oily", "Dry", "Combination", "Normal", "Sensitive", "Not Sure"].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => setAnswers((p) => ({ ...p, skinType: t }))}
                      className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                        answers.skinType === t
                          ? "bg-gradient-to-r from-glow-400 to-blush-400 text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-blush-300"
                      }`}
                    >
                      {t}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Q2 */}
            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">
                2. What are your main skin concerns?
              </h3>
              <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {concernOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleConcern(c)}
                    className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                      answers.concerns.includes(c)
                        ? "bg-gradient-to-r from-glow-400 to-blush-400 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-blush-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                3. What is your age range?
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {["Under 18", "18-25", "26-35", "36-45", "46+"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAnswers((p) => ({ ...p, ageRange: a }))}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      answers.ageRange === a
                        ? "bg-gradient-to-r from-glow-400 to-blush-400 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-blush-300"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4 */}
            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                4. Describe your current skincare routine
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "None", desc: "I don't have one" },
                  { label: "Basic", desc: "Cleanser + moisturizer" },
                  { label: "Moderate", desc: "3-5 products" },
                  { label: "Extensive", desc: "6+ products" },
                ].map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setAnswers((p) => ({ ...p, routine: r.label }))}
                    className={`py-3 px-4 rounded-xl text-left transition-all ${
                      answers.routine === r.label
                        ? "bg-gradient-to-r from-glow-400 to-blush-400 text-white shadow-md"
                        : "bg-white border border-gray-200 hover:border-blush-300"
                    }`}
                  >
                    <div
                      className={`font-medium text-sm ${
                        answers.routine === r.label ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {r.label}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${
                        answers.routine === r.label ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {r.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 5: Budget */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Tag className="w-5 h-5 text-glow-500" />
                {"What's your skincare budget?"}
              </h3>
              <p className="text-sm text-gray-500 mb-3">This helps us recommend products in your price range</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Budget-Friendly", desc: "Under $15 per product" },
                  { label: "Mid-Range", desc: "$15 - $40 per product" },
                  { label: "Premium", desc: "$40 - $80 per product" },
                  { label: "Luxury", desc: "$80+ per product" },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setAnswers({ ...answers, budget: b.label })}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      answers.budget === b.label
                        ? "border-glow-500 bg-glow-500 text-white shadow-lg shadow-glow-500/25"
                        : "border-gray-200 hover:border-glow-300 hover:shadow-md"
                    }`}
                  >
                    <div className="font-medium text-sm">{b.label}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        answers.budget === b.label ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {b.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-4 px-6 rounded-2xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={analyze}
                disabled={loading}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold text-lg hover:shadow-lg hover:shadow-glow-400/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Start Analysis
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && result ? (
          <div className="space-y-4">
            <div className="glass-strong rounded-3xl p-6 text-center">
              <div className="text-5xl font-display font-bold text-gradient mb-2">
                {result.overallScore}
              </div>
              <div className="text-sm text-gray-500">Overall Skin Score</div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-glow-400 to-blush-400 transition-all duration-1000"
                  style={{ width: `${result.overallScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-strong rounded-2xl p-4">
                <div className="text-xs text-gray-400 mb-1">Skin Type</div>
                <div className="font-semibold text-gray-900 capitalize">
                  {result.skinType}
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-4">
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                  <Droplets className="w-3 h-3" />
                  Hydration
                </div>
                <div className="font-semibold text-gray-900 capitalize">
                  {result.hydrationLevel}
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-4">
              <div className="text-xs text-gray-400 mb-2">Detected Concerns</div>
              <div className="flex flex-wrap gap-2">
                {result.concerns.map((c: string) => (
                  <span
                    key={c}
                    className="px-3 py-1 rounded-full bg-blush-50 text-blush-600 text-xs font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-4">
              <div className="text-xs text-gray-400 mb-3">Recommendations</div>
              <div className="space-y-2">
                {result.recommendations.map((r: string) => (
                  <div key={r} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-sage-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-strong rounded-2xl p-4">
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                  <Sun className="w-3 h-3" />
                  Morning Routine
                </div>
                <div className="space-y-1">
                  {result.routineSuggestion.morning.map((s: string) => (
                    <div key={s} className="text-xs text-gray-600">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-4">
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                  <Moon className="w-3 h-3" />
                  Evening Routine
                </div>
                <div className="space-y-1">
                  {result.routineSuggestion.evening.map((s: string) => (
                    <div key={s} className="text-xs text-gray-600">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Recommendations */}
            {result.productRecommendations && result.productRecommendations.length > 0 && (
              <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-glow-500" />
                  Recommended Products
                </h3>
                <div className="grid gap-3">
                  {result.productRecommendations.map((product: {name: string; type: string; price: string; reason: string}, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-glow-50/50 to-purple-50/50 border border-glow-100"
                    >
                      <div className="w-10 h-10 rounded-xl bg-glow-500/10 flex items-center justify-center flex-shrink-0">
                        <Tag className="w-5 h-5 text-glow-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-800">{product.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-glow-100 text-glow-700 font-medium">
                            {product.type}
                          </span>
                        </div>
                        <div className="text-sm text-glow-600 font-medium mt-0.5">{product.price}</div>
                        <p className="text-sm text-gray-500 mt-1">{product.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setStep(1);
                setPreview(null);
                setImage(null);
                setResult(null);
                setAnswers({ skinType: "", concerns: [], ageRange: "", routine: "", budget: "" });
              }}
              className="w-full py-4 rounded-2xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
            >
              Analyze Another Photo
            </button>
          </div>
        ) : (
          step === 3 && (
            <div className="glass-strong rounded-3xl p-10 text-center">
              <Sparkles className="w-10 h-10 text-blush-200 mb-4 mx-auto" />
              <p className="text-gray-400">No results yet.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
