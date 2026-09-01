import React, { useRef } from "react";
import { Sparkles, Flame, Zap, Shield, Target, Trophy } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function MarqueeSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawSkew = useTransform(scrollYProgress, [0, 0.5, 1], [-1.5, 0, 1.5]);
  const skew = useSpring(rawSkew, { stiffness: 100, damping: 25 });

  const words1 = [
    { text: "TRAIN HARD", icon: Flame },
    { text: "STAY DISCIPLINED", icon: Shield },
    { text: "GET STRONGER", icon: Zap },
    { text: "NEVER STOP", icon: Target },
    { text: "HIGH PERFORMANCE", icon: Trophy },
    { text: "PURE POWER", icon: Sparkles }
  ];

  const words2 = [
    { text: "SPORTS BIOMECHANICS", icon: Zap },
    { text: "UNSTOPPABLE MINDSET", icon: Target },
    { text: "CRYO RECOVERY", icon: Sparkles },
    { text: "TACTICAL CROSSFIT", icon: Flame },
    { text: "OLYMPIC STANDARDS", icon: Trophy },
    { text: "PEAK OUTPUT", icon: Shield }
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-black border-y border-zinc-800/80 overflow-hidden relative select-none">
      <motion.div
        style={{ skewX: skew }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="will-change-transform"
      >
        {/* Top track (Left animation) */}
        <div className="flex overflow-hidden py-2">
          <div className="animate-marquee-left flex items-center gap-8 whitespace-nowrap">
            {[...words1, ...words1, ...words1].map((item, idx) => {
              return (
                <div key={idx} className="flex items-center gap-6 group cursor-default">
                  <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white/90 group-hover:text-[#E2FF00] transition-colors">
                    {item.text}
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#E2FF00] shadow-[0_0_8px_#E2FF00]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom track (Right animation) */}
        <div className="flex overflow-hidden py-2 mt-2">
          <div className="animate-marquee-right flex items-center gap-8 whitespace-nowrap">
            {[...words2, ...words2, ...words2].map((item, idx) => {
              return (
                <div key={idx} className="flex items-center gap-6 group cursor-default">
                  <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-600 group-hover:text-[#00F0FF] transition-colors">
                    {item.text}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

