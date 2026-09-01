import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Activity, Users, Sparkles, Cpu } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import MagneticButton from "../components/common/MagneticButton";

const milestones = [
  { year: "2016", title: "Genesis & Biomechanics Lab", desc: "Founded with the conviction that sports science and telemetry should be accessible to all dedicated lifters." },
  { year: "2019", title: "Expansion to 45,000 sq ft", desc: "Built the 8 specialized zones, adding the -110°C CryoChamber and 60m indoor sprint turf track." },
  { year: "2022", title: "InBody & Telemetry HUD Integration", desc: "Installed real-time heart rate and velocity-based barbell tracking throughout all training floors." },
  { year: "2026", title: "The Next-Gen Performance Standard", desc: "Recognized as the premier athletic training facility with over 25,000 verified athlete transformations." }
];

const values = [
  {
    icon: Cpu,
    title: "SPORTS SCIENCE OVER HYPE",
    desc: "Every workout protocol and recovery session is grounded in human kinesiology, peer-reviewed exercise physiology, and objective InBody diagnostic metrics."
  },
  {
    icon: Shield,
    title: "UNCOMPROMISING STANDARDS",
    desc: "We invest in calibrated Olympic competition bars, Eleiko platforms, and certified Master Coaches who prioritize kinetic safety above all."
  },
  {
    icon: Activity,
    title: "RECOVERY AS A DISCIPLINE",
    desc: "True muscular hypertrophy and power adaptations happen during cellular recovery. We treat cryotherapy and infrared sauna therapy as essential training."
  },
  {
    icon: Users,
    title: "HIGH-OUTPUT COMMUNITY",
    desc: "An electric environment devoid of egos. Everyone from beginners to professional athletes trains with mutual respect and shared intensity."
  }
];

export default function About({ onOpenTrial }) {
  const bannerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"]
  });

  const rawBannerScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);
  const rawBannerY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const bannerScale = useSpring(rawBannerScale, { stiffness: 100, damping: 25 });
  const bannerY = useSpring(rawBannerY, { stiffness: 100, damping: 25 });

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="About VYRON — Science, Biomechanics & Mission"
        description="Learn the philosophy and technology behind VYRON Fitness. Our mission is to elevate human athletic performance through sports science, master coaching, and luxury recovery."
        canonical="https://vyronfitness.com/about"
      />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2FF00]/10 border border-[#E2FF00]/30 text-[#E2FF00] text-xs font-mono-tech uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGIN & MISSION</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6">
            WHERE SPORTS SCIENCE <span className="text-[#E2FF00]">FORGES POWER.</span>
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            VYRON was founded with a singular purpose: to replace commercial gym gimmicks with the exact sports science, Olympic equipment, and bio-recovery protocols utilized by elite collegiate and professional athletic institutions.
          </p>
        </motion.div>
      </div>

      {/* Split Story Image Banner with Parallax */}
      <div ref={bannerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[320px] border border-zinc-800 shadow-2xl"
        >
          <motion.img
            style={{ scale: bannerScale, y: bannerY }}
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
            alt="VYRON Training Facility"
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl">
            <span className="text-xs font-mono-tech uppercase text-[#E2FF00] font-bold block mb-1">
              45,000 SQ FT ATHLETIC LAB
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              ENGINEERED FOR PEAK HUMAN OUTPUT
            </h3>
          </div>
        </motion.div>
      </div>

      {/* Core Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <SectionHeader
          badge="OUR CODE"
          title="CORE"
          accentWord="PILLARS."
          subtitle="The foundational philosophies that guide every program, coaching interaction, and recovery session at VYRON."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
                  }
                }}
                className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/90 shadow-xl group hover:border-[#E2FF00]/40 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#E2FF00] group-hover:bg-[#E2FF00] group-hover:text-black transition-all mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight mb-2 group-hover:text-[#E2FF00] transition-colors">
                  {v.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Milestone Timeline with Staggered Entrance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <SectionHeader
          badge="A DECADE OF INNOVATION"
          title="OUR"
          accentWord="EVOLUTION."
          subtitle="From a boutique biomechanics laboratory to the benchmark luxury athletic facility."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 relative hover:border-zinc-700 transition-colors"
            >
              <div className="font-display text-4xl font-black text-[#E2FF00] mb-2">{m.year}</div>
              <h4 className="font-display font-bold text-lg text-white uppercase mb-2">{m.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA Banner with Scroll Reveal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-[#E2FF00]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-1">
              EXPERIENCE VYRON FIRSTHAND
            </span>
            <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              JOIN THE ELITE MOVEMENT
            </h3>
            <p className="text-zinc-400 text-sm max-w-lg mt-2">
              Claim your 7-day all-access trial pass. Includes 1 free masterclass and an InBody movement screen.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-4 justify-center">
            <MagneticButton onClick={onOpenTrial} variant="primary" size="lg">
              <Sparkles className="w-4 h-4 mr-1" />
              CLAIM 7-DAY VIP PASS
            </MagneticButton>
            <Link to="/contact">
              <MagneticButton variant="outline" size="lg">
                Schedule Private Tour
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

