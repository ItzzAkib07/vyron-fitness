import React, { useRef } from "react";
import { Play, Sparkles, Shield, Activity } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MagneticButton from "../../components/common/MagneticButton";

export default function CinematicVideoSection({ onOpenVideo, onOpenTrial }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawBgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const rawBgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.02]);
  const rawPlayY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const bgY = useSpring(rawBgY, { stiffness: 100, damping: 25 });
  const bgScale = useSpring(rawBgScale, { stiffness: 100, damping: 25 });
  const playY = useSpring(rawPlayY, { stiffness: 100, damping: 25 });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden border-y border-zinc-800 text-white"
    >
      {/* Cinematic Background with Parallax and Scale */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop"
          alt="Athletes pushing limits"
          className="w-full h-full object-cover opacity-35"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Play Button Trigger with Parallax Floating */}
        <motion.div
          style={{ y: playY }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8 will-change-transform"
        >
          <button
            onClick={onOpenVideo}
            aria-label="Play Brand Video"
            className="group relative w-24 h-24 rounded-full bg-[#E2FF00] text-black flex items-center justify-center shadow-[0_0_50px_rgba(226,255,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-[#E2FF00] animate-ping opacity-30" />
            <Play className="w-9 h-9 fill-black translate-x-0.5" />
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.05 }
            }
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-3"
          >
            EXPERIENCE THE VYRON ATMOSPHERE
          </motion.span>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
            }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] max-w-4xl mx-auto mb-6"
          >
            YOUR LIMITS ARE <span className="text-metallic">MENTAL.</span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            When high-level coaching meets an uncompromising training arena, what felt impossible becomes your daily warm-up. Step inside our world.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton onClick={onOpenTrial} variant="primary" size="lg">
              <Sparkles className="w-4 h-4 mr-1" />
              CLAIM 7-DAY VIP PASS
            </MagneticButton>
            <MagneticButton onClick={onOpenVideo} variant="outline" size="lg">
              WATCH BRAND FILM (1:20)
            </MagneticButton>
          </motion.div>

          {/* Telemetry Footer with Staggered Entrance */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
            className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-8 border-t border-zinc-800/80 text-xs font-mono-tech text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>HEART-RATE TELEMETRY ZONES</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#E2FF00]" />
              <span>ELEIKO & HAMMER STRENGTH EQUIPPED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E2FF00]" />
              <span>24/7 BIOMETRIC RFID ACCESS</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

