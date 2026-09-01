import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowUpRight, Search, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import MagneticButton from "../components/common/MagneticButton";
import { blogPosts } from "../data/blogData";

const categories = ["All", "Strength", "Workout", "Recovery", "Nutrition"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts[0];

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Performance Science Journal & Fitness Articles — VYRON"
        description="Explore research-backed sports science articles, progressive overload guides, metabolic HIIT breakdowns, and recovery protocols."
        canonical="https://vyronfitness.com/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="RESEARCH & INSIGHTS"
          title="PERFORMANCE"
          accentWord="JOURNAL."
          subtitle="Peer-reviewed training protocols, exercise physiology breakdowns, and sports nutrition strategies from our coaching faculty."
        />

        {/* Search & Category Filter */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 mb-12 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search research topics, authors, or training tags..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#E2FF00] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tech uppercase font-bold tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#E2FF00] text-black shadow-md"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post Banner */}
        {featured && activeCategory === "All" && !search && (
          <div className="mb-16">
            <Link
              to={`/blog/${featured.id}`}
              className="group block relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-[#E2FF00]/50 transition-all duration-500 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:h-[460px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-mono-tech text-[#E2FF00] uppercase font-bold mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#E2FF00]/10 border border-[#E2FF00]/30">
                      FEATURED ARTICLE
                    </span>
                    <span className="text-zinc-400">• {featured.readTime}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight group-hover:text-[#E2FF00] transition-colors leading-tight mb-4">
                    {featured.title}
                  </h3>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                    <img
                      src={featured.authorAvatar}
                      alt={featured.author}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />
                    <div>
                      <div className="font-bold text-xs text-white">{featured.author}</div>
                      <div className="text-[11px] text-zinc-500 font-mono-tech">{featured.publishDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                to={`/blog/${post.id}`}
                className="group block rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-[#00F0FF]/50 transition-all duration-500 hover:-translate-y-1.5 shadow-xl h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#00F0FF] border border-[#00F0FF]/30 text-[11px] font-mono-tech uppercase font-bold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.publishDate}</span>
                    </div>

                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight group-hover:text-[#00F0FF] transition-colors mb-3 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-xs font-mono-tech text-zinc-400">
                    <span>By {post.author}</span>
                    <span className="text-[#00F0FF] group-hover:text-[#E2FF00] transition-colors flex items-center gap-1 font-bold">
                      READ POST <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
