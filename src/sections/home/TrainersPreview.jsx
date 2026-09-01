import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { trainersData } from "../../data/trainersData";
import SectionHeader from "../../components/common/SectionHeader";
import MagneticButton from "../../components/common/MagneticButton";
import { GsapTiltCard } from "../../components/animations";

export default function TrainersPreview() {
  return (
    <section className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="MASTER COACHING STAFF"
            title="THE WORLD-CLASS"
            accentWord="FACULTY."
            subtitle="Led by collegiate strength coaches, Doctor of Physical Therapy specialists, and Olympic lifters with proven championship pedigrees."
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
            <Link to="/trainers">
              <MagneticButton variant="outline" size="md">
                Meet All 6 Master Coaches <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Trainers Grid with uniform card heights and staggered scroll reveal */}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {trainersData.slice(0, 4).map((trainer) => (
            <motion.div
              key={trainer.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              className="h-full flex flex-col"
            >
              <GsapTiltCard
                maxTilt={10}
                className="h-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-[#E2FF00]/50 transition-colors duration-500 group shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(226,255,0,0.1)]"
                spotlightColor="rgba(0, 240, 255, 0.18)"
              >
                <Link
                  to={`/trainers/${trainer.id}`}
                  className="flex flex-col justify-between h-full w-full relative"
                >
                  {/* Photo with zoom and consistent aspect ratio */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden shrink-0 bg-zinc-950">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/30 to-transparent" />

                    {/* Top Specialty Badge */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#E2FF00]/30 text-[#E2FF00] text-[10px] sm:text-[11px] font-mono-tech uppercase font-bold truncate max-w-[70%]">
                        {trainer.specialty}
                      </span>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-xs font-mono-tech text-yellow-400 shrink-0">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        <span>{trainer.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bio Section */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider block mb-1">
                        {trainer.role}
                      </span>
                      <h3 className="font-display text-xl font-black uppercase text-white tracking-tight group-hover:text-[#E2FF00] transition-colors mb-2 line-clamp-1">
                        {trainer.name}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 min-h-[2rem]">
                        {trainer.bio}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono-tech text-zinc-400 mt-auto">
                      <span>{trainer.experience} Exp</span>
                      <span className="text-[#00F0FF] group-hover:text-[#E2FF00] transition-colors flex items-center gap-1 font-bold">
                        VIEW PROFILE <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
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

