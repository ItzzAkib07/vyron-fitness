import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import { trainersData } from "../data/trainersData";

const specialties = ["All", "Strength & Powerlifting", "HIIT & Weight Loss", "CrossFit & Olympic Lifting", "Functional Movement & Rehab", "Boxing & Combat", "Yoga, Mobility & Breath Science"];

export default function Trainers() {
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  const filtered = activeSpecialty === "All"
    ? trainersData
    : trainersData.filter((t) => t.specialty === activeSpecialty);

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Master Coaches & Biomechanics Specialists — VYRON"
        description="Meet the elite coaching staff at VYRON Fitness. CSCS certified collegiate strength coaches, Doctor of Physical Therapy specialists, and Olympic lifters."
        canonical="https://vyronfitness.com/trainers"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="FACULTY DIRECTORY"
          title="MASTER COACHING"
          accentWord="STAFF."
          subtitle="World-class strength practitioners and clinical movement experts dedicated to unlocking your absolute peak performance."
        />

        {/* Specialty Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase font-bold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeSpecialty === spec
                  ? "bg-[#E2FF00] text-black shadow-[0_0_15px_rgba(226,255,0,0.35)]"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Trainers Grid with uniform equal height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filtered.map((trainer, idx) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full flex flex-col"
            >
              <Link
                to={`/trainers/${trainer.id}`}
                className="group flex flex-col justify-between h-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-[#E2FF00]/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                {/* Photo with zoom and consistent aspect ratio */}
                <div className="relative aspect-[4/5] w-full overflow-hidden shrink-0 bg-zinc-900">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/20 to-transparent" />

                  {/* Top Specialty Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#E2FF00]/30 text-[#E2FF00] text-[10px] sm:text-[11px] font-mono-tech uppercase font-bold truncate max-w-[70%]">
                      {trainer.specialty}
                    </span>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-xs font-mono-tech text-yellow-400 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>{trainer.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Details (Equal height flex container) */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider block mb-1">
                      {trainer.role}
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight group-hover:text-[#E2FF00] transition-colors mb-2 line-clamp-1">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-6 min-h-[2rem]">
                      {trainer.bio}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-xs font-mono-tech text-zinc-400 mt-auto">
                    <span>{trainer.experience} Experience</span>
                    <span className="text-[#00F0FF] group-hover:text-[#E2FF00] transition-colors flex items-center gap-1 font-bold">
                      VIEW PROFILE <ArrowUpRight className="w-4 h-4" />
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
