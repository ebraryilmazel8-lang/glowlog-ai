"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Camera,
  ArrowRight,
  Droplets,
  Shield,
  Leaf,
  ChevronRight,
  ChevronDown,
  Upload,
  Sun,
  Moon,
  TrendingUp,
  BookOpen,
} from "lucide-react";


// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
          const duration = 1500;
          const start = performance.now();
          const isDecimal = target.includes(".");
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericTarget * eased;
            setCount(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Global scroll reveal observer for all .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blush-200/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-60 -right-40 w-96 h-96 bg-glow-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glow-100/60 text-glow-600 text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Powered by Google Gemini AI
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight mb-6">
              Your skin deserves
              <span className="block shimmer">
                intelligent care
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload a selfie and get an instant AI-powered skin analysis with personalized routines, ingredient recommendations, and progress tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/analyze"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-glow-400 to-blush-400 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-glow-300/30 hover:shadow-2xl hover:shadow-glow-300/40 hover:-translate-y-0.5 transition-all"
              >
                <Camera className="w-5 h-5" />
                Try Free Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 px-6 py-4 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Learn how it works
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mt-16 max-w-4xl mx-auto reveal">
            <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl card-hover">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-glow-50 to-blush-50 border border-glow-100">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-glow-300 to-blush-300 flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 text-center">Upload a selfie to begin</p>
                </div>
                <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                  <div className="glass p-4 rounded-xl">
                    <div className="text-3xl font-bold text-glow-500 mb-1">87</div>
                    <div className="text-xs text-gray-500">Skin Score</div>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-gradient-to-r from-glow-400 to-blush-300 rounded-full" />
                    </div>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <div className="text-sm font-semibold text-gray-700 mb-1">Combination</div>
                    <div className="text-xs text-gray-500">Skin Type</div>
                    <div className="mt-2 flex gap-1">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      <Sun className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <div className="text-sm font-semibold text-gray-700 mb-1">3 Concerns</div>
                    <div className="text-xs text-gray-500">Detected</div>
                    <div className="mt-2 flex gap-1">
                      <span className="px-2 py-0.5 text-xs bg-blush-100 text-blush-600 rounded-full">Dryness</span>
                    </div>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <div className="text-sm font-semibold text-gray-700 mb-1">8 Steps</div>
                    <div className="text-xs text-gray-500">AM + PM Routine</div>
                    <div className="mt-2 flex gap-1">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <Moon className="w-4 h-4 text-indigo-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Animated Counters */}
      <section className="py-12 px-4 border-y border-gray-100/50">
        <div className="reveal max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900"><AnimatedCounter target="50" suffix="K+" /></div>
              <div className="text-sm text-gray-500 mt-1">Skin Analyses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900"><AnimatedCounter target="4.9" /></div>
              <div className="text-sm text-gray-500 mt-1">User Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900"><AnimatedCounter target="92" suffix="%" /></div>
              <div className="text-sm text-gray-500 mt-1">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900"><AnimatedCounter target="30" suffix="s" /></div>
              <div className="text-sm text-gray-500 mt-1">Average Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Three simple steps to understand your skin better than ever before.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Upload, title: "Upload Your Photo", desc: "Take a clear selfie in natural light. Our AI works best with well-lit, front-facing photos.", color: "from-glow-400 to-glow-500" },
              { step: "02", icon: Sparkles, title: "AI Analyzes Your Skin", desc: "Google Gemini AI examines your skin for type, hydration, concerns, and overall health in seconds.", color: "from-blush-400 to-blush-500" },
              { step: "03", icon: BookOpen, title: "Get Your Routine", desc: "Receive a personalized AM/PM skincare routine with product recommendations tailored to your needs.", color: "from-sage-400 to-sage-500" },
            ].map((item, i) => (
              <div key={item.step} className={`reveal reveal-delay-${i + 1} group relative`}>
                <div className="glass-strong rounded-2xl p-8 h-full card-hover">
                  <div className="text-6xl font-bold text-gray-100 absolute top-4 right-6 select-none">{item.step}</div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-gradient-to-b from-white/0 via-glow-50/30 to-white/0">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Everything Your Skin Needs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Comprehensive AI-powered skincare tools designed to give you clarity and confidence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Camera, title: "AI Skin Analysis", desc: "Upload a photo and get detailed insights about your skin type, hydration, and concerns.", tag: "Core" },
              { icon: Droplets, title: "Hydration Tracking", desc: "Monitor your skin moisture levels over time and adjust your routine accordingly.", tag: "Smart" },
              { icon: Sun, title: "AM/PM Routines", desc: "Personalized morning and evening routines based on your unique skin profile.", tag: "Personal" },
              { icon: Shield, title: "Ingredient Scanner", desc: "Learn which ingredients work best for your skin type and which ones to avoid.", tag: "Safety" },
              { icon: TrendingUp, title: "Progress Tracking", desc: "Track your skin health score over weeks and months to see real improvement.", tag: "Growth" },
              { icon: Leaf, title: "Clean Beauty Focus", desc: "Recommendations prioritize clean, sustainable, and cruelty-free products.", tag: "Ethical" },
            ].map((f, i) => (
              <div key={f.title} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="glass-strong rounded-2xl p-6 card-hover group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glow-100 to-blush-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <f.icon className="w-6 h-6 text-glow-500" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">{f.tag}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skincare Knowledge Hub */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Skincare Knowledge Hub</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Expert-backed insights to help you build the perfect routine.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { emoji: "\u2600\uFE0F", title: "Why Sunscreen is Non-Negotiable", preview: "UV damage is the #1 cause of premature aging. Even on cloudy days, up to 80% of UV rays penetrate through. A broad-spectrum SPF 30+ should be the last step of every morning routine.", tag: "Essentials" },
              { emoji: "\uD83E\uDDEA", title: "Understanding Your Skin Barrier", preview: "Your skin barrier is the outermost layer that locks in moisture and keeps irritants out. Over-exfoliating, harsh cleansers, and skipping moisturizer can compromise it.", tag: "Science" },
              { emoji: "\u2728", title: "The Right Order to Layer Products", preview: "Always go thinnest to thickest: cleanser, toner, serum, moisturizer, SPF. At night, swap SPF for a richer night cream or sleeping mask after your serums.", tag: "Routine" },
              { emoji: "\uD83C\uDF3F", title: "Ingredients That Actually Work", preview: "Retinol for anti-aging, niacinamide for pores, hyaluronic acid for hydration, vitamin C for brightening. These are the gold-standard ingredients backed by decades of research.", tag: "Ingredients" },
            ].map((article, i) => (
              <div key={article.title} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="glass-strong rounded-2xl p-6 card-hover group h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{article.emoji}</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sage-100 text-sage-600">{article.tag}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-glow-600 transition-colors">{article.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{article.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Interactive Accordion */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Is the first skin analysis free?", a: "Yes! Your first analysis is completely free. After that, upgrade to Premium for unlimited analyses, detailed reports, and personalized product recommendations." },
              { q: "How accurate is the AI analysis?", a: "Our AI is powered by Google Gemini and has a 92% accuracy rate for skin type detection. However, it is not a replacement for professional dermatological advice." },
              { q: "Is my photo stored or shared?", a: "No. Your photo is processed in real-time and is never stored on our servers. We take your privacy seriously." },
              { q: "What should I do with my results?", a: "Use your personalized routine as a starting guide. Introduce new products one at a time and give each product 4-6 weeks before judging results." },
            ].map((faq, i) => (
              <div key={faq.q} className="reveal reveal-delay-1">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full glass-strong rounded-2xl p-6 text-left transition-all hover:shadow-md group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="reveal">
            <div className="glass-strong rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-glow-100/40 via-blush-100/30 to-sage-100/40" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-glow-400 to-blush-400 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Ready to know your skin?</h2>
                <p className="text-gray-500 max-w-lg mx-auto mb-8">Join thousands who have already discovered their perfect skincare routine with AI-powered analysis.</p>
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-glow-400 to-blush-400 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-glow-300/30 hover:shadow-2xl hover:shadow-glow-300/40 hover:-translate-y-0.5 transition-all"
                >
                  <Camera className="w-5 h-5" />
                  Start Free Analysis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 border-t border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-50/20 to-blush-50/30" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-glow-300 to-blush-300 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-semibold text-gray-800 text-lg">Glow Log</span>
                <p className="text-xs text-gray-400">AI Skincare Companion</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <Link href="/analyze" className="hover:text-glow-500 transition-colors">Analysis</Link>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <Link href="/routine" className="hover:text-glow-500 transition-colors">Routine</Link>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <Link href="/history" className="hover:text-glow-500 transition-colors">History</Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Glow Log</p>
              <p className="text-xs text-gray-300 mt-1">Powered by Gemini AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
