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
  ChevronDown,
  Upload,
  Sun,
  Moon,
  TrendingUp,
  BookOpen,
  Crown,
  Lock,
  CheckCircle2,
  Zap,
  Eye,
  Smartphone,
  X,
  Heart,
} from "lucide-react";

// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));
          const duration = 2000;
          const steps = 60;
          const increment = numericTarget / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current).toString());
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// Scroll reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const hero = useReveal();
  const stats = useReveal();
  const howItWorks = useReveal();
  const whyGlow = useReveal();
  const features = useReveal();
  const privacy = useReveal();
  const premium = useReveal();
  const knowledge = useReveal();
  const faq = useReveal();
  const finalCta = useReveal();

  const faqItems = [
    { q: "Is the skin analysis really free?", a: "Yes! Your first analysis is completely free — no account, no credit card, no strings attached. Premium unlocks unlimited analyses for $4.99/month." },
    { q: "How does AI analyze my skin?", a: "You upload a selfie and answer 4 quick questions about your skin. Our AI (powered by Google Gemini) analyzes your skin type, concerns, and goals to generate a personalized AM/PM routine with specific product recommendations." },
    { q: "Is my photo stored or shared?", a: "Never. Your photo is processed in real-time and immediately discarded. We don't store images, don't build facial databases, and don't share data with third parties. Privacy isn't a feature — it's our architecture." },
    { q: "How is this different from other skincare apps?", a: "Most apps require downloads, accounts, and lengthy quizzes. Glow Log works instantly in your browser — one selfie, 10 seconds, personalized routine. No app to install, no account to create." },
    { q: "What skin types does it work for?", a: "All of them. Our AI is trained to analyze oily, dry, combination, sensitive, and normal skin types. It also detects specific concerns like acne, hyperpigmentation, fine lines, and dehydration." },
    { q: "Can I track my skincare progress?", a: "Yes! Use our Routine Tracker to log your AM/PM steps daily and build consistency. Premium users get unlimited analyses to compare results over time." },
    { q: "Is this medical advice?", a: "No. Glow Log provides AI-powered skincare suggestions for informational purposes only. It is not a substitute for professional dermatological advice. If you have a skin condition, please consult a dermatologist." },
  ];

  return (
    <div className="min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={hero.ref}
        className="relative pt-28 pb-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-glow-50 via-white to-blush-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-glow-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blush-200/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative max-w-4xl mx-auto text-center transition-all duration-1000 opacity-100 translate-y-0">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-glow-200/50 text-sm font-medium text-gray-700 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-glow-500" />
            Powered by Google Gemini AI
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Free AI Skin Analysis
            <span className="block bg-gradient-to-r from-glow-500 via-blush-400 to-glow-400 bg-clip-text text-transparent">
              in 10 Seconds
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Upload a selfie, get a personalized AM/PM skincare routine with real product recommendations.
            No download, no quiz, no sign-up required.
          </p>

          {/* Messaging pillar badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200/50">
              <Zap className="w-3.5 h-3.5" /> Smart, Not Overwhelming
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200/50">
              <Eye className="w-3.5 h-3.5" /> Ingredient-Honest
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-medium border border-purple-200/50">
              <Lock className="w-3.5 h-3.5" /> Private by Default
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-glow-400 to-blush-400 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-glow-400/25 hover:shadow-xl hover:shadow-glow-400/30 transition-all hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              Analyze My Skin — Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-4 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              See How It Works
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section
        ref={stats.ref}
        className="py-8 border-y border-gray-100 bg-white/50"
      >
        <div className={`max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center transition-all duration-700 ${stats.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              <AnimatedCounter target="10" suffix="sec" />
            </div>
            <div className="text-sm text-gray-500 mt-1">Analysis Time</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              <AnimatedCounter target="6" />
            </div>
            <div className="text-sm text-gray-500 mt-1">Skin Types Detected</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              <AnimatedCounter target="0" suffix="" />
            </div>
            <div className="text-sm text-gray-500 mt-1">Photos Stored</div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section
        id="how-it-works"
        ref={howItWorks.ref}
        className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50"
      >
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${howItWorks.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three Steps to Your Perfect Routine
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              No downloads. No lengthy quizzes. Just one selfie and honest answers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, step: "01", title: "Upload a Selfie", desc: "Take a quick photo in natural lighting. Your image is analyzed in real-time and never stored.", color: "from-glow-400 to-glow-500" },
              { icon: Sparkles, step: "02", title: "AI Analyzes Your Skin", desc: "Google Gemini detects your skin type, concerns, and goals — then builds a routine just for you.", color: "from-blush-400 to-blush-500" },
              { icon: Droplets, step: "03", title: "Get Your Routine", desc: "Receive a personalized AM/PM routine with specific product picks matched to your budget.", color: "from-glow-400 to-blush-400" },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-glow-200/50 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="text-xs font-bold text-gray-300 tracking-widest mb-4">STEP {item.step}</div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY GLOW LOG ═══════════ */}
      <section
        ref={whyGlow.ref}
        className="py-20 px-4 bg-white"
      >
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${whyGlow.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Glow Log?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We removed every barrier between you and better skin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: "No App to Download", desc: "Works instantly in your browser. Mobile, tablet, or desktop — just open and go." },
              { icon: Zap, title: "No Lengthy Quiz", desc: "Other apps ask 20+ questions. We need one selfie and 4 quick answers." },
              { icon: Lock, title: "No Photo Storage", desc: "Your selfie is analyzed in real-time and immediately discarded. Zero data retention." },
              { icon: Heart, title: "Free to Start", desc: "Your first full analysis is free. No credit card, no account, no trial expiration." },
              { icon: Sparkles, title: "Gemini AI Powered", desc: "Built on Google's most advanced AI model for accurate skin type detection and analysis." },
              { icon: Droplets, title: "Real Product Picks", desc: "Not generic advice — actual products matched to your skin type, concerns, and budget." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-glow-50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-glow-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section
        ref={features.ref}
        className="py-20 px-4 bg-gradient-to-b from-gray-50/50 to-white"
      >
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${features.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Skin
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Smart analysis, honest recommendations, and daily tracking — all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Camera, title: "AI Skin Analysis", desc: "Upload a selfie and get an instant breakdown of your skin type, hydration levels, and key concerns.", gradient: "from-glow-400 to-glow-500" },
              { icon: Sun, title: "AM/PM Routines", desc: "Separate morning and evening routines tailored to your specific needs — cleanse, treat, moisturize, protect.", gradient: "from-amber-400 to-orange-400" },
              { icon: TrendingUp, title: "Routine Tracker", desc: "Log your daily skincare steps, build streaks, and stay consistent with your personalized routine.", gradient: "from-emerald-400 to-teal-500" },
              { icon: Leaf, title: "Ingredient-Aware", desc: "Every recommendation explains why — what each ingredient does and why it works for your skin type.", gradient: "from-blush-400 to-rose-400" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PRIVACY TRUST ═══════════ */}
      <section
        ref={privacy.ref}
        className="py-20 px-4 bg-white"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${privacy.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.1),transparent_50%)]" />

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Your Photo Never Leaves the Moment
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
                Privacy isn&apos;t a feature we added — it&apos;s how we built the product. Your selfie is analyzed in real-time and immediately discarded. No cloud storage. No facial databases. No third-party sharing. Ever.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Lock, text: "Zero data retention" },
                  { icon: Shield, text: "No facial databases" },
                  { icon: X, text: "No third-party sharing" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm">
                    <item.icon className="w-4 h-4" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PREMIUM ═══════════ */}
      <section
        ref={premium.ref}
        className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/30"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${premium.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 sm:p-14 border border-amber-200/50 overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
              MOST POPULAR
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-6 h-6 text-amber-600" />
                  <span className="text-sm font-bold text-amber-700 tracking-wide uppercase">Glow Log Premium</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Unlimited Analyses
                </h2>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-extrabold text-gray-900">$4.99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited AI skin analyses",
                    "Track skin changes over time",
                    "Priority analysis processing",
                    "Detailed ingredient breakdowns",
                    "Budget-matched product picks",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://glowlog.lemonsqueezy.com/checkout/buy/a53c85e9-3150-4efc-acab-e91af26ab7a6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Crown className="w-5 h-5" />
                  Get Premium
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="flex-1 max-w-sm">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
                  <div className="text-sm font-medium text-gray-500 mb-4">What you get with Premium:</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                      <span className="text-sm text-gray-700">Free Plan</span>
                      <span className="text-sm font-bold text-gray-900">1 analysis</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border border-amber-200/50">
                      <span className="text-sm font-medium text-amber-800">Premium</span>
                      <span className="text-sm font-bold text-amber-900">Unlimited</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ KNOWLEDGE HUB ═══════════ */}
      <section
        ref={knowledge.ref}
        className="py-20 px-4 bg-white"
      >
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${knowledge.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-glow-50 text-glow-600 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Knowledge Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Understand Your Skin Better
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sun, title: "AM Routine Basics", desc: "Why morning skincare matters: cleanse, vitamin C, moisturize, SPF — in that order.", tag: "Beginner" },
              { icon: Moon, title: "PM Recovery Routine", desc: "Nighttime is when skin repairs. Learn the double-cleanse, retinol, and overnight hydration flow.", tag: "Beginner" },
              { icon: Leaf, title: "Ingredient Deep Dives", desc: "Niacinamide, hyaluronic acid, salicylic acid — what works, what's hype, and what to avoid mixing.", tag: "Advanced" },
              { icon: Droplets, title: "Hydration Science", desc: "Understanding humectants, occlusives, and emollients — the three pillars of moisturized skin.", tag: "Intermediate" },
              { icon: Shield, title: "SPF: The #1 Anti-Ager", desc: "Why dermatologists call sunscreen the single most effective anti-aging product you can use.", tag: "Essential" },
              { icon: TrendingUp, title: "Tracking Progress", desc: "How to measure skincare results: what to photograph, how often to check, and when to pivot.", tag: "Practical" },
            ].map((item, i) => (
              <div key={i} className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-glow-200/50 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="w-5 h-5 text-glow-500" />
                  <span className="text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded-full">{item.tag}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-glow-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section
        ref={faq.ref}
        className="py-20 px-4 bg-gray-50/50"
      >
        <div className={`max-w-3xl mx-auto transition-all duration-700 ${faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA — FREE ANALYSIS ═══════════ */}
      <section
        ref={finalCta.ref}
        className="py-24 px-4 bg-gradient-to-br from-glow-50 via-white to-blush-50 relative overflow-hidden"
      >
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-glow-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blush-200/20 rounded-full blur-3xl" />

        <div className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ${finalCta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-glow-200/50 text-sm font-medium text-glow-600 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            100% Free — No Account Needed
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Your Personalized Routine
            <span className="block bg-gradient-to-r from-glow-500 to-blush-400 bg-clip-text text-transparent">
              Is One Selfie Away
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands discovering their perfect skincare routine. One selfie, 10 seconds, completely free.
          </p>

          <Link
            href="/analyze"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-glow-400 to-blush-400 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-glow-400/25 hover:shadow-xl hover:shadow-glow-400/30 transition-all hover:scale-105"
          >
            <Camera className="w-6 h-6" />
            Start My Free Analysis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-6 text-sm text-gray-400">
            No download · No sign-up · Results in 10 seconds
          </p>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-glow-400 to-blush-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Glow Log</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI-powered skincare analysis that turns a single selfie into a personalized routine in 10 seconds.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/analyze" className="hover:text-white transition-colors">Skin Analysis</Link></li>
                <li><Link href="/routine" className="hover:text-white transition-colors">Routine Tracker</Link></li>
                <li><Link href="/history" className="hover:text-white transition-colors">History</Link></li>
                <li>
                  <a href="https://glowlog.lemonsqueezy.com/checkout/buy/a53c85e9-3150-4efc-acab-e91af26ab7a6" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" /> Premium
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skincare Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ingredient Glossary</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://instagram.com/glowlog.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="https://tiktok.com/@glowlog.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Glow Log. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 text-center sm:text-right max-w-md">
                Glow Log provides AI-powered skincare suggestions for informational purposes only. Not a substitute for professional dermatological advice.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
