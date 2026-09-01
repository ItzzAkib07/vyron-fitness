import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Flame, Clock } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { programsData } from "../../data/programsData";
import SectionHeader from "../../components/common/SectionHeader";
import MagneticButton from "../../components/common/MagneticButton";
import { GsapTiltCard } from "../../components/animations";

const filterCategories = ["All", "Strength", "Cardio & HIIT", "CrossFit", "Combat", "Mind & Recovery", "Athletic Performance"];

export default function HorizontalPrograms() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawGlowY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glowY = useSpring(rawGlowY, { stiffness: 100, damping: 25 });

  const filteredPrograms = activeFilter === "All"
    ? programsData
    : programsData.filter((p) => p.category === activeFilter);

  return (
    <section ref={sectionRef} className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Parallax Glow Aura */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/3 -left-48 w-96 h-96 bg-[#E2FF00]/5 rounded-full blur-[140px] pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="ELITE TRAINING PROTOCOLS"
            title="SCIENTIFICALLY"
            accentWord="PERIODIZED."
            subtitle="Explore our specialized training divisions engineered for rapid neurological adaptation, maximum force production, and cardiovascular supremacy."
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
            <Link to="/programs">
              <MagneticButton variant="outline" size="md">
                View All 10 Programs <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Filter categories with scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none"
        >
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase font-bold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-[#E2FF00] text-black shadow-[0_0_15px_rgba(226,255,0,0.35)]"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Staggered Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPrograms.slice(0, 6).map((prog) => (
            <motion.div
              key={prog.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              className="h-full"
            >
              <GsapTiltCard
                maxTilt={8}
                className="h-full rounded-3xl overflow-hidden group shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(226,255,0,0.15)]"
                spotlightColor="rgba(226, 255, 0, 0.2)"
              >
                <Link
                  to={`/programs/${prog.id}`}
                  className="relative block h-[480px] w-full bg-zinc-900 border border-zinc-800/80 group-hover:border-[#E2FF00]/50 transition-colors duration-500"
                >
                  {/* Background Image with Zoom */}
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E2FF00]/30 text-[#E2FF00] text-xs font-mono-tech uppercase font-bold">
                      {prog.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-zinc-300 text-xs font-mono-tech">
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
              </GsapTiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

