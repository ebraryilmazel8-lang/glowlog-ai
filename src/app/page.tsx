"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  Camera,
  CalendarCheck,
  ArrowRight,
  Droplets,
  Shield,
  Zap,
  Star,
  Heart,
  Leaf,
  ChevronRight,
  Upload,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blush-200/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-60 -right-40 w-96 h-96 bg-glow-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-glow-400" />
            <span className="text-sm text-gray-600">
              AI destekli cilt analizi â ucretsiz dene
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Cildini Tani,
            <br />
            <span className="text-gradient">Guzelligini Kesfet</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bir selfie yukle, yapay zeka cildini analiz etsin. Kisisel bakim
            rutini ve urun onerileri aninda hazir â kayit bile gerekmez.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blush-200/50 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Ucretsiz Analiz Yap
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/routine"
              className="px-8 py-4 rounded-2xl glass text-gray-700 font-semibold text-lg hover:bg-white/80 transition-all hover:-translate-y-1"
            >
              Rutin Takibi
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Kayit gerektirmez &middot; Sonuclar aninda &middot; 100% ucretsiz
          </p>
        </div>
      </section>

      {/* Try Now - Interactive CTA */}
      <section className="relative py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/analyze" className="block group">
            <div className="relative glass-strong rounded-3xl p-8 sm:p-12 text-center hover:shadow-2xl hover:shadow-blush-100/40 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-glow-50/50 to-blush-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-glow-200 to-blush-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-9 h-9 text-glow-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-3">
                  Cildini Simdi Analiz Et
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Bir selfie yukle, Gemini AI cilt tipini, nem seviyeni ve sorunlarini 
                  analiz etsin. Kisisel bakim onerileri aninda hazir.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-medium group-hover:shadow-lg transition-all">
                  <Upload className="w-4 h-4" />
                  Fotografini Yukle
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      {/* Features */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Neler Yapabilirsin?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Glow Log ile cilt bakim rutinini bir ust seviyeye tasimak cok kolay.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Camera className="w-6 h-6" />}
              title="AI Cilt Analizi"
              description="Bir selfie yukle, yapay zeka cilt tipini, sorunlarini ve nem seviyeni analiz etsin. Kisisellestirilmis oneriler al."
              gradient="from-glow-100 to-glow-50"
              iconBg="bg-glow-200"
            />
            <FeatureCard
              icon={<CalendarCheck className="w-6 h-6" />}
              title="Rutin Takibi"
              description="Sabah ve aksam bakim rutinini logla. Hangi urunleri kullandigini ve cildinin nasil hissettigini kaydet."
              gradient="from-blush-100 to-blush-50"
              iconBg="bg-blush-200"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Akilli Oneriler"
              description="Cilt analizine gore kisisel rutin onerileri, urun tavsiyeleri ve haftalik bakim plani olustur."
              gradient="from-sage-100 to-sage-50"
              iconBg="bg-sage-200"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Kullanicilar Ne Diyor?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Binlerce kisi Glow Log ile cilt bakim rutinini donusturdu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Elif K."
              role="2 aydir kullaniyor"
              text="Cilt tipimi hep yag saniyordum ama aslinda dehidre oldugunu ogrenidum. Onerilen rutinle cildimdeki fark inanilmaz!"
              rating={5}
              emoji="â¨"
            />
            <TestimonialCard
              name="Zeynep A."
              role="3 aydir kullaniyor"
              text="Sabah ve aksam rutinlerimi takip etmek cok kolaylasti. Artik hangi urunun ne ise yaradigini biliyorum."
              rating={5}
              emoji="ð¸"
            />
            <TestimonialCard
              name="Merve S."
              role="1 aydir kullaniyor"
              text="AI analizin verdigi niacinamide onerisi hayatimi degistirdi. Goz alti morluklar gozle gorulur azaldi!"
              rating={5}
              emoji="ð§"
            />
          </div>
        </div>
      </section>

      {/* Skincare Tips */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Skincare Rehberi
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              En etkili ingredientler ve ne ise yaradiklari.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <IngredientCard
              name="Niacinamide"
              benefit="Gozenek kusultme & parlaklik"
              icon={<Sparkles className="w-5 h-5" />}
              color="from-glow-100 to-glow-50"
            />
            <IngredientCard
              name="Hyaluronic Acid"
              benefit="Derin nemlendirme & dolgunluk"
              icon={<Droplets className="w-5 h-5" />}
              color="from-blue-100 to-blue-50"
            />
            <IngredientCard
              name="Retinol"
              benefit="Anti-aging & cilt yenileme"
              icon={<Zap className="w-5 h-5" />}
              color="from-blush-100 to-blush-50"
            />
            <IngredientCard
              name="Centella Asiatica"
              benefit="Yatistirma & onarim"
              icon={<Leaf className="w-5 h-5" />}
              color="from-sage-100 to-sage-50"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Nasil Calisir?
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", icon: <Camera className="w-5 h-5" />, title: "Foto yukle", desc: "Temiz cildinin bir fotografini cek ve yukle. Kayit gerekmez!" },
              { step: "2", icon: <Zap className="w-5 h-5" />, title: "AI analiz etsin", desc: "Gemini AI cildini detayli sekilde analiz eder â saniyeler icinde." },
              { step: "3", icon: <Shield className="w-5 h-5" />, title: "Rutinini olustur", desc: "Kisisel onerilerle bakim rutinini takip et ve sonuclari gor." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center mx-auto mb-4 text-glow-500">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-blush-400 mb-2">
                  ADIM {item.step}
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto glass-strong rounded-3xl p-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { icon: <Droplets className="w-5 h-5" />, value: "AI", label: "Destekli Analiz" },
              { icon: <Shield className="w-5 h-5" />, value: "7/24", label: "Erisim" },
              { icon: <Sparkles className="w-5 h-5" />, value: "100%", label: "Ucretsiz" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-center mb-2 text-blush-400">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Cilt Bakim Yolculuguna
            <br />
            <span className="text-gradient">Simdi Basla</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8">
            Kayit gerektirmez. Fotografini yukle, AI cildini analiz etsin,
            sana ozel bakim rutinini kesfet.
          </p>
          <Link
            href="/analyze"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-glow-400 to-blush-400 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blush-200/50 transition-all hover:-translate-y-1"
          >
            Ucretsiz Analiz Yap
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-glow-300 to-blush-300 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-semibold text-gray-700">Glow Log</span>
        </div>
        <p className="text-sm text-gray-400">
          Yapay zeka destekli cilt bakim asistanin. &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
}) {
  return (
    <div
      className={`group p-6 rounded-3xl bg-gradient-to-br ${gradient} border border-white/60 hover:shadow-xl hover:shadow-blush-100/30 transition-all hover:-translate-y-1`}
    >
      <div
        className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-4 text-gray-700 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({
  name,
  role,
  text,
  rating,
  emoji,
}: {
  name: string;
  role: string;
  text: string;
  rating: number;
  emoji: string;
}) {
  return (
    <div className="glass-strong rounded-3xl p-6 hover:shadow-lg hover:shadow-blush-100/20 transition-all hover:-translate-y-1">
      <div className="text-3xl mb-4">{emoji}</div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-cream-400 text-cream-400" />
        ))}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div>
        <div className="font-semibold text-gray-900 text-sm">{name}</div>
        <div className="text-xs text-gray-400">{role}</div>
      </div>
    </div>
  );
}

function IngredientCard({
  name,
  benefit,
  icon,
  color,
}: {
  name: string;
  benefit: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} p-5 border border-white/60 hover:shadow-md transition-all hover:-translate-y-0.5`}>
      <div className="text-glow-500 mb-3">{icon}</div>
      <div className="font-display font-semibold text-gray-900 text-sm mb-1">{name}</div>
      <div className="text-xs text-gray-500">{benefit}</div>
    </div>
  );
}
