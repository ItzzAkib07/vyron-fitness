import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { transformationsData } from "../../data/transformationsData";
import SectionHeader from "../../components/common/SectionHeader";
import BeforeAfterSlider from "../../components/common/BeforeAfterSlider";
import MagneticButton from "../../components/common/MagneticButton";

export default function TransformationsSection({ onOpenTrial }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = transformationsData[selectedIdx];

  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="PROVEN RESULTS"
            title="REAL"
            accentWord="TRANSFORMATIONS."
            subtitle="Explore verified physical transformations driven by biomechanical coaching, InBody tracking, and disciplined metabolic protocols."
            align="left"
            className="mb-0 max-w-xl"
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <Link to="/transformations">
              <MagneticButton variant="outline" size="md">
                View All Client Stories <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Member Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 overflow-x-auto pb-3 mb-8"
        >
          {transformationsData.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                selectedIdx === idx
                  ? "bg-zinc-900 border-[#E2FF00] shadow-[0_0_20px_rgba(226,255,0,0.18)]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-white">
                {idx + 1}
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-white">{t.name}</div>
                <div className="text-[11px] text-zinc-400 font-mono-tech">{t.duration}</div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Interactive Comparison Showcase with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl"
        >
          {/* Left: Draggable Before/After Slider */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage={current.beforeImage}
              afterImage={current.afterImage}
              beforeLabel="BEFORE"
              afterLabel={`AFTER (${current.duration.toUpperCase()})`}
              aspectRatio="aspect-[4/3]"
            />
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-tech mt-3 px-1">
              <span>◄ SLIDE TO COMPARE RESULTS ►</span>
              <span className="text-[#E2FF00]">VERIFIED INBODY LOG</span>
            </div>
          </div>

          {/* Right: Metrics & Story */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#E2FF00] uppercase mb-2">
              <Trophy className="w-4 h-4" />
              <span>{current.program}</span>
            </div>

            <h3 className="font-display text-3xl font-black uppercase text-white tracking-tight">
              {current.name}
            </h3>
            <p className="text-xs text-zinc-400 font-mono-tech mb-4">{current.role}</p>

            {/* Stat Badges Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-mono-tech uppercase block">BODY FAT CHANGE</span>
                <span className="font-display text-2xl font-black text-[#00F0FF]">{current.stats.bodyFatChange}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-mono-tech uppercase block">LEAN MUSCLE GAIN</span>
                <span className="font-display text-2xl font-black text-[#E2FF00]">{current.stats.muscleGain}</span>
              </div>
            </div>

            {/* Quote */}
            <div className="p-4 rounded-2xl bg-zinc-900 border-l-2 border-[#E2FF00] mb-6">
              <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                "{current.quote}"
              </p>
            </div>

            {/* Metric Checklist */}
            <div className="space-y-2 mb-6">
              {current.keyMetrics.map((km, i) => (
                <div key={i} className="flex justify-between text-xs py-1 border-b border-zinc-800/60">
                  <span className="text-zinc-400">{km.label}:</span>
                  <span className="font-mono-tech font-bold text-white">{km.value}</span>
                </div>
              ))}
            </div>

            <MagneticButton onClick={onOpenTrial} variant="primary" size="md" className="w-full justify-center">
              Start Your Transformation Today
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

