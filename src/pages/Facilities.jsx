import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import MagneticButton from "../components/common/MagneticButton";
import { facilitiesData } from "../data/facilitiesData";

export default function Facilities({ onOpenTrial }) {
  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Luxury Facilities & 8 Athletic Zones — VYRON"
        description="Explore 45,000 sq ft of Olympic lifting platforms, 60m sprint turf, -110°C cryotherapy chambers, and luxury locker suites."
        canonical="https://vyronfitness.com/facilities"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="ARCHITECTURAL BLUEPRINT"
          title="FACILITIES &"
          accentWord="ZONES."
          subtitle="Engineered with acoustic vibration dampening, reverse-osmosis air filtration, and competition-calibrated training apparatus."
        />

        {/* 8 Zones Grid */}
        <div className="space-y-16 mb-24">
          {facilitiesData.map((zone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl overflow-hidden"
              >
                {/* Photo (Order alternates on desktop) */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-zinc-800 shadow-xl group">
                    <img
                      src={zone.image}
                      alt={zone.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#E2FF00] border border-[#E2FF00]/30 font-bold">
                        {zone.squareFeet}
                      </span>
                      <span className="text-zinc-300 bg-black/70 px-2.5 py-1 rounded-full">
                        ZONE {idx + 1} OF 08
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"} flex flex-col justify-center`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-mono-tech uppercase font-bold border border-[#00F0FF]/30 w-fit mb-3">
                    <span>{zone.category}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-3">
                    {zone.title}
                  </h3>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                    {zone.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6">
                    <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-1">
                      FEATURED HARDWARE & RIGS
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono-tech">
                      {zone.featuredEquipment}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-zinc-800">
                    {zone.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E2FF00] shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-300 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Virtual Tour Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="p-10 sm:p-14 rounded-3xl bg-zinc-950 border border-zinc-800 text-center relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block">
              SCHEDULE PRIVATE ORIENTATION
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              TOUR THE 45,000 SQ FT ATHLETIC LAB
            </h3>
            <p className="text-zinc-400 text-sm">
              Experience the equipment, meet our Master Coaches, and receive a movement diagnostic with our team.
            </p>
            <div className="pt-2 flex justify-center">
              <MagneticButton onClick={onOpenTrial} variant="primary" size="lg">
                <Sparkles className="w-4 h-4 mr-1" />
                Schedule VIP Tour & 7-Day Pass
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

