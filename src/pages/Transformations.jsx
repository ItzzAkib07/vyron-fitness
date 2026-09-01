import React from "react";
import { Trophy, Star, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import BeforeAfterSlider from "../components/common/BeforeAfterSlider";
import MagneticButton from "../components/common/MagneticButton";
import { transformationsData } from "../data/transformationsData";

export default function Transformations({ onOpenTrial }) {
  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Member Transformations & Case Studies — VYRON"
        description="Explore verified before-and-after physical transformations at VYRON Fitness. Read athlete stories and biometric data."
        canonical="https://vyronfitness.com/transformations"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="PROVEN CASE STUDIES"
          title="ATHLETE"
          accentWord="TRANSFORMATIONS."
          subtitle="Real members. Real biometric scans. Discover how clinical sports science and disciplined periodization redefine what is possible."
        />

        {/* Transformations Cards List */}
        <div className="space-y-20 mb-24">
          {transformationsData.map((item, idx) => (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl overflow-hidden"
            >
              {/* Left Draggable Slider */}
              <div className="lg:col-span-7">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel="STARTING DAY 01"
                  afterLabel={`TRANSFORMATION (${item.duration.toUpperCase()})`}
                  aspectRatio="aspect-[4/3]"
                />
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-tech mt-3 px-1">
                  <span>◄ DRAG DIVIDER TO COMPARE BEFORE & AFTER ►</span>
                  <span className="text-[#E2FF00]">INBODY 770 VERIFIED</span>
                </div>
              </div>

              {/* Right Story & Data */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-[#E2FF00] uppercase mb-2">
                  <Trophy className="w-4 h-4" />
                  <span>{item.program}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 font-mono-tech mb-6">{item.role} • {item.duration} Protocol</p>

                {/* Stat Badges Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 font-mono-tech uppercase block">BODY FAT SHIFT</span>
                    <span className="font-display text-2xl font-black text-[#00F0FF]">{item.stats.bodyFatChange}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 font-mono-tech uppercase block">LEAN TISSUE GAIN</span>
                    <span className="font-display text-2xl font-black text-[#E2FF00]">{item.stats.muscleGain}</span>
                  </div>
                </div>

                {/* Quote Box */}
                <div className="p-5 rounded-2xl bg-zinc-900 border-l-3 border-[#E2FF00] mb-6">
                  <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                {/* Key Metrics Checklist */}
                <div className="space-y-2 mb-6">
                  {item.keyMetrics.map((km, i) => (
                    <div key={i} className="flex justify-between text-xs py-1 border-b border-zinc-800/60">
                      <span className="text-zinc-400">{km.label}:</span>
                      <span className="font-mono-tech font-bold text-white">{km.value}</span>
                    </div>
                  ))}
                </div>

                <MagneticButton onClick={onOpenTrial} variant="primary" size="md" className="w-full justify-center">
                  Claim 7-Day Free Trial
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
