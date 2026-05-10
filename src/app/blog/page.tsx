import Link from "next/link";
import { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import { BookOpen, ArrowRight, Calendar, Clock, Sparkles, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Skincare Blog — Tips, Routines & Ingredient Guides | Glow Log",
  description:
    "Expert skincare guides: build the perfect routine for your skin type, understand ingredients, and learn science-backed tips for healthier skin.",
  openGraph: {
    title: "Skincare Blog — Tips, Routines & Ingredient Guides | Glow Log",
    description:
      "Expert skincare guides: build the perfect routine, understand ingredients, and get science-backed tips.",
    url: "https://glow-log.com/blog",
    siteName: "Glow Log",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-glow-50/30 via-transparent to-blush-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-glow-200/50 text-sm font-medium text-glow-600 mb-6 shadow-sm">
            <BookOpen className="w-4 h-4" />
            Skincare Knowledge Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            The Glow Log Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Science-backed skincare guides to help you build better routines, understand ingredients, and get real results.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-glow-200/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-glow-50 text-glow-600 text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-glow-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-glow-500 group-hover:gap-2 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-glow-50/30 via-transparent to-blush-50/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-glow-200/50 text-sm font-medium text-glow-600 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Free AI Analysis
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your Routine?
          </h2>
          <p className="text-gray-600 mb-8">
            Stop guessing. Get a personalized skincare routine based on AI analysis of your unique skin.
          </p>
          <Link
            href="/analyze"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-glow-400 to-blush-400 text-white rounded-2xl font-semibold shadow-lg shadow-glow-400/25 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Camera className="w-5 h-5" />
            Analyze My Skin — Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
