import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Flame, Clock, Zap, Search, Sparkles, Filter } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import MagneticButton from "../components/common/MagneticButton";
import { programsData } from "../data/programsData";

const categories = ["All", "Strength", "Cardio & HIIT", "CrossFit", "Combat", "Mind & Recovery", "Athletic Performance", "Personal Training"];
const difficulties = ["All", "All Levels", "Intermediate", "Advanced"];

export default function Programs({ onOpenTrial }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDiff, setActiveDiff] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = programsData.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchDiff = activeDiff === "All" || p.difficulty === activeDiff;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      p.goal.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Training Programs — Strength, HIIT, CrossFit & Combat"
        description="Discover our 10 periodized training divisions engineered for maximum strength, fat loss, athletic conditioning, and longevity."
        canonical="https://vyronfitness.com/programs"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="PERIODIZED PROTOCOLS"
          title="TRAINING"
          accentWord="DIVISIONS."
          subtitle="Engineered with clinical biomechanics and wave-loading percentages to produce maximum physical transformation without overtraining."
        />

        {/* Filters and Search Bar */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 mb-12 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs by goal, name, or focus (e.g., 'hypertrophy', 'fat loss', 'boxing')..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#E2FF00] transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-900">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
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

            {/* Difficulty Selector */}
            <div className="flex items-center gap-2 shrink-0 text-xs font-mono-tech">
              <span className="text-zinc-500">LEVEL:</span>
              <select
                value={activeDiff}
                onChange={(e) => setActiveDiff(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#E2FF00]"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                to={`/programs/${prog.id}`}
                className="group relative block h-[500px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-[#E2FF00]/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#E2FF00]/30 text-[#E2FF00] text-xs font-mono-tech uppercase font-bold">
                    {prog.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-zinc-300 text-xs font-mono-tech">
                    {prog.difficulty}
                  </span>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-transparent pt-12">
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono-tech mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>{prog.duration}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#E2FF00]" />
                      <span>{prog.calorieBurn}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight group-hover:text-[#E2FF00] transition-colors leading-tight mb-2">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    {prog.shortDesc}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono-tech uppercase font-bold text-white group-hover:text-[#E2FF00] transition-colors">
                    <span>EXPLORE CURRICULUM</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#E2FF00] group-hover:text-black flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-zinc-500 font-mono-tech text-base">
            No training programs found matching your search. Try resetting your filters.
          </div>
        )}
      </div>
    </div>
  );
}
