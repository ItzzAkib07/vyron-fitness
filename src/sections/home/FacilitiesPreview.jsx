import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { facilitiesData } from "../../data/facilitiesData";
import SectionHeader from "../../components/common/SectionHeader";
import MagneticButton from "../../components/common/MagneticButton";

export default function FacilitiesPreview() {
  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="LUXURY ATHLETIC SPACES"
            title="EIGHT SPECIALIZED"
            accentWord="ZONES."
            subtitle="Explore 45,000+ square feet of acoustically treated training environments, Olympic platforms, and medical-grade bio-recovery suites."
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
            <Link to="/facilities">
              <MagneticButton variant="outline" size="md">
                Explore All 8 Zones <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Facilities Grid with Staggered Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {facilitiesData.slice(0, 4).map((zone) => (
            <motion.div
              key={zone.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
            >
              <Link
                to="/facilities"
                className="group relative block h-[380px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-[#00F0FF]/50 transition-all duration-500 hover:-translate-y-2 shadow-xl"
              >
                <img
                  src={zone.image}
                  alt={zone.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00F0FF]/30 text-[#00F0FF] text-[11px] font-mono-tech uppercase font-bold">
                    {zone.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 text-[11px] font-mono-tech">
                    {zone.squareFeet}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-tight group-hover:text-[#00F0FF] transition-colors mb-1 leading-tight">
                    {zone.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                    {zone.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-mono-tech uppercase text-[#00F0FF] font-semibold">
                    <span>EXPLORE ZONE SPECS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

