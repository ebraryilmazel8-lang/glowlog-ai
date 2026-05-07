"use client";
import { useState, useRef } from "react";
import {
  Camera, Upload, Loader2, Sparkles, Droplets,
  AlertCircle, CheckCircle2, Sun, Moon, X,
} from "lucide-react";
import type { SkinAnalysisResult } from "@/types";

export default function AnalyzePage() {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, mimeType: "image/jpeg" }),
      });
      if (!res.ok) throw new Error("Analysis failed.");
      setResult(await res.json());
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Camera className="w-4 h-4 text-glow-400" />
            <span className="text-sm text-gray-600">Powered by Gemini AI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3">AI Skin Analysis</h1>
          <p className="text-gray-500 max-w-lg mx-auto">Upload a photo of your skin and let AI provide a detailed analysis with personalized recommendations.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div onClick={() => fileRef.current?.click()} className={`relative rounded-3xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${preview ? "border-transparent" : "border-blush-200 hover:border-blush-300 bg-white/50 hover:bg-white/70"}`} style={{ minHeight: "320px" }}>
              {preview ? (
                <>
                  <img src={preview} alt="Uploaded photo" className="w-full h-80 object-cover rounded-3xl" />
                  <button onClick={(e) => { e.stopPropagation(); setPreview(null); setImage(null); setResult(null); }} className="absolute top-3 right-3 p-2 rounded-full bg-black/30 text-white hover:bg-black/50"><X className="w-4 h-4" /></button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center p-6">
                  <Upload className="w-10 h-10 text-blush-300 mb-4" />
                  <p className="font-medium text-gray-700 mb-1">Upload your photo</p>
                  <p className="text-sm text-gray-400">Click or drag & drop &middot; Max 10MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {image && !result && (
              <button onClick={analyze} disabled={loading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blush-200/50 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? (<><Loader2 className="w-5 h-5 animate-spin" />Analyzing...</>) : (<><Sparkles className="w-5 h-5" />Start Analysis</>)}
              </button>
            )}
            {error && (<div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 text-sm"><AlertCircle className="w-4 h-4 flex-shrink-0" />{error}</div>)}
          </div>
          <div>
            {result ? (
              <div className="space-y-4">
                <div className="glass-strong rounded-3xl p-6 text-center">
                  <div className="text-5xl font-display font-bold text-gradient mb-2">{result.overallScore}</div>
                  <p className="text-sm text-gray-500">Overall Skin Score</p>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-glow-400 to-blush-400 transition-all duration-1000" style={{ width: `${result.overallScore}%` }} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-strong rounded-2xl p-4"><div className="text-xs text-gray-400 mb-1">Skin Type</div><div className="font-semibold text-gray-900 capitalize">{result.skinType}</div></div>
                  <div className="glass-strong rounded-2xl p-4"><div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><Droplets className="w-3 h-3" /> Hydration</div><div className="font-semibold text-gray-900 capitalize">{result.hydrationLevel}</div></div>
                </div>
                <div className="glass-strong rounded-2xl p-4"><div className="text-xs text-gray-400 mb-2">Detected Concerns</div><div className="flex flex-wrap gap-2">{result.concerns.map((c, i) => (<span key={i} className="px-3 py-1 rounded-full bg-blush-50 text-blush-600 text-xs font-medium">{c}</span>))}</div></div>
                <div className="glass-strong rounded-2xl p-4"><div className="text-xs text-gray-400 mb-3">Recommendations</div><div className="space-y-2">{result.recommendations.map((r, i) => (<div key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-sage-400 flex-shrink-0 mt-0.5" /><span className="text-gray-700">{r}</span></div>))}</div></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-strong rounded-2xl p-4">
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-2"><Sun className="w-3 h-3" /> Morning Routine</div>
                    <div className="space-y-1">{result.routineSuggestion.morning.map((s, i) => (<div key={i} className="text-xs text-gray-600">{i + 1}. {s}</div>))}</div>
                  </div>
                  <div className="glass-strong rounded-2xl p-4">
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-2"><Moon className="w-3 h-3" /> Evening Routine</div>
                    <div className="space-y-1">{result.routineSuggestion.evening.map((s, i) => (<div key={i} className="text-xs text-gray-600">{i + 1}. {s}</div>))}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-strong rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center">
                <Sparkles className="w-10 h-10 text-blush-200 mb-4" />
                <p className="text-gray-400">Upload your photo and hit the analyze button.<br />Results will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
