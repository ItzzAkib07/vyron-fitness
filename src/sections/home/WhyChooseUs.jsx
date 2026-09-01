import React, { useRef } from "react";
import { Shield, Cpu, Activity, Utensils, Sparkles, Users } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionHeader from "../../components/common/SectionHeader";
import { GsapTiltCard } from "../../components/animations";

const pillars = [
  {
    icon: Shield,
    title: "EXPERT COACHING",
    subtitle: "CSCS & Kinesiology Certified",
    description: "Every master trainer brings collegiate athletic background, biomechanical form audits, and rigorous sports safety standards."
  },
  {
    icon: Cpu,
    title: "PREMIUM EQUIPMENT",
    subtitle: "Eleiko, Keiser & Hammer Strength",
    description: "Calibrated competition iron, motorless Woodway treadmills, pneumatic cable velocity rigs, and custom Olympic drop zones."
  },
  {
    icon: Activity,
    title: "INDIVIDUALIZED PROGRAMS",
    subtitle: "Periodized Wave Loading",
    description: "Tailored 12-week strength and conditioning protocols designed specifically to shatter plateaus and protect joint longevity."
  },
  {
    icon: Utensils,
    title: "NUTRITION & MACROS",
    subtitle: "Leucine Trigger & Carb Timing",
    description: "Customized sports nutrition calculations and dietitian-curated meal blue-prints synchronized with your workout timing."
  },
  {
    icon: Sparkles,
    title: "RECOVERY FACILITIES",
    subtitle: "-110°C Cryo & Infrared Saunas",
    description: "Medical-grade whole-body cryotherapy, 3°C cold plunge tubs, and full-spectrum infrared thermal heat suites."
  },
  {
    icon: Users,
    title: "HIGH-OUTPUT COMMUNITY",
    subtitle: "Zero Ego • 100% Discipline",
    description: "A culture of high performers, collegiate athletes, and relentless lifters pushing each other to achieve physical greatness."
  }
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawGlowY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const glowY = useSpring(rawGlowY, { stiffness: 100, damping: 25 });

  return (
    <section ref={sectionRef} className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-zinc-800/80">
      {/* Parallax Ambient Glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="THE VYRON DIFFERENCE"
          title="WHY ATHLETES CHOOSE"
          accentWord="VYRON."
          subtitle="Engineered from the ground up for high performers who refuse to compromise on coaching standards, equipment, or recovery science."
        />

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
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
                  maxTilt={10}
                  className="h-full p-7 rounded-3xl bg-zinc-950 border border-zinc-800/90 hover:border-[#E2FF00]/40 transition-colors duration-300 group shadow-xl hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(226,255,0,0.1)]"
                  spotlightColor="rgba(226, 255, 0, 0.18)"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#E2FF00] group-hover:bg-[#E2FF00] group-hover:text-black transition-all duration-300 mb-5 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-mono-tech uppercase text-[#00F0FF] tracking-wider mb-1">
                    {pillar.subtitle}
                  </div>
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-tight mb-2.5 group-hover:text-[#E2FF00] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </GsapTiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

