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
              AI destekli cilt analizi - ucretsiz dene
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Cildini Tani,
            <br />
            <span className="text-gradient">Guzelligini Kesfet</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bir selfie yukle, yapay zeka cildini analiz etsin. Kisisel bakim
            rutini ve urun onerileri aninda hazir - kayit bile gerekmez.
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

          <p className="mt-6 text-sm text-gray-400">
            Kayit gerektirmez &middot; Sonuclar aninda &middot; 100% ucretsiz
          </p>
        </div>
      </section>

      {/* Interactive Try Now */}
      <section className="relative py-10 px-4">
        <div className="max-w-xl mx-auto">
          <Link href="/analyze" className="block group">
            <div className="glass-strong rounded-3xl p-8 text-center hover:shadow-xl hover:shadow-blush-100/30 transition-all hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-glow-200 to-blush-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7 text-gray-700" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                Hemen Dene
              </h3>
              <p className="text-gray-500 mb-4">
                Bir selfie yukle, AI cildini 30 saniyede analiz etsin
              </p>
              <div className="inline-flex items-center gap-1 text-blush-500 font-medium text-sm">
                Analizi Baslat <ChevronRight className="w-4 h-4" />
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
              Glow Log ile cilt bakim rutinini bir ust seviyeye tasi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Camera className="w-6 h-6" />}
              title="AI Cilt Analizi"
              description="Bir selfie yukle, yapay zeka cilt tipini, sorunlarini ve nem seviyeni analiz etsin."
              gradient="from-glow-100 to-glow-50"
              iconBg="bg-glow-200"
            />
            <FeatureCard
              icon={<CalendarCheck className="w-6 h-6" />}
              title="Rutin Takibi"
              description="Sabah ve aksam bakim rutinini logla. Hangi urunleri kullandigini kaydet."
              gradient="from-blush-100 to-blush-50"
              iconBg="bg-blush-200"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Akilli Oneriler"
              description="Cilt analizine gore kisisel rutin onerileri ve urun tavsiyeleri al."
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
              Kullananlar Ne Diyor?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Elif K."
              text="Cilt tipimi hic bu kadar iyi anlamamistim. AI analizi gercekten isabetli!"
              rating={5}
            />
            <TestimonialCard
              name="Zeynep A."
              text="Sabah aksam rutinimi takip etmek harika. Cildim 2 haftada fark yaratti."
              rating={5}
            />
            <TestimonialCard
              name="Merve T."
              text="Urun onerileri cok mantikli. Gereksiz urunlerden kurtuldum."
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Skincare Guide */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Skincare Rehberi
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              En etkili cilt bakim ingredientleri hakkinda bilgi edin.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <IngredientCard
              icon={<Droplets className="w-5 h-5" />}
              name="Niacinamide"
              benefit="Gozenekleri sikilastirir, leke giderici"
              color="bg-glow-100 text-glow-600"
            />
            <IngredientCard
              icon={<Heart className="w-5 h-5" />}
              name="Hyaluronic Acid"
              benefit="Derin nemlendirme, kirisilik onleyici"
              color="bg-blush-100 text-blush-600"
            />
            <IngredientCard
              icon={<Star className="w-5 h-5" />}
              name="Retinol"
              benefit="Anti-aging, hucre yenilenme"
              color="bg-amber-100 text-amber-600"
            />
            <IngredientCard
              icon={<Leaf className="w-5 h-5" />}
              name="Centella Asiatica"
              benefit="Yatistirici, onarici, hassas ciltler icin"
              color="bg-sage-100 text-sage-600"
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
              { step: "1", icon: <Camera className="w-5 h-5" />, title: "Foto yukle", desc: "Temiz cildinin bir fotografini cek ve yukle." },
              { step: "2", icon: <Zap className="w-5 h-5" />, title: "AI analiz etsin", desc: "Gemini AI cildini detayli sekilde analiz eder." },
              { step: "3", icon: <Shield className="w-5 h-5" />, title: "Rutinini olustur", desc: "Kisisel onerilerle bakim rutinini takip et." },
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
              { icon: <Sparkles className="w-5 h-5" />, value: "100%", label: "Kisisel" },
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

      {/* CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Cildine Ozen Gostermeye Basla
          </h2>
          <p className="text-gray-500 mb-8">
            Ucretsiz AI cilt analizi ile bakim rutinini kesfet.
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

function TestimonialCard({ name, text, rating }: { name: string; text: string; rating: number }) {
  return (
    <div className="glass-strong rounded-3xl p-6 hover:shadow-lg transition-all">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{text}</p>
      <div className="text-sm font-semibold text-gray-900">{name}</div>
    </div>
  );
}

function IngredientCard({
  icon,
  name,
  benefit,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  benefit: string;
  color: string;
}) {
  return (
    <div className="glass-strong rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <h4 className="font-display font-semibold text-gray-900 mb-1">{name}</h4>
      <p className="text-xs text-gray-500">{benefit}</p>
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
