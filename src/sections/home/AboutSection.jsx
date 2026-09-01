import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Activity, Shield, Award, Users, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MagneticButton from "../../components/common/MagneticButton";
import { GsapTiltCard, AnimeStatCounter, AnimeECGPulse } from "../../components/animations";

export default function AboutSection({ onOpenTrial }) {
  const sectionRef = useRef(null);

  // Multi-speed parallax setup for left visual elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawImageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const rawBadge1Y = useTransform(scrollYProgress, [0, 1], [40, -40]); // glides faster upward
  const rawBadge2Y = useTransform(scrollYProgress, [0, 1], [-30, 30]); // glides counter downward
  const rawGlowY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const imageY = useSpring(rawImageY, { stiffness: 100, damping: 25 });
  const badge1Y = useSpring(rawBadge1Y, { stiffness: 100, damping: 25 });
  const badge2Y = useSpring(rawBadge2Y, { stiffness: 100, damping: 25 });
  const glowY = useSpring(rawGlowY, { stiffness: 100, damping: 25 });

  const stats = [
    { value: 15, suffix: "+", label: "Years Experience", icon: Award },
    { value: 50, suffix: "+", label: "Expert Coaches", icon: Shield },
    { value: 10, suffix: "K+", label: "Active Members", icon: Users },
    { value: 25, suffix: "K+", label: "Transformations", icon: Activity }
  ];

  const features = [
    "Biomechanical movement screening for every new athlete",
    "Eleiko IPF certified Olympic powerlifting & barbell stations",
    "Medical-grade -110°C cryotherapy & infrared recovery suites",
    "Continuous heart-rate telemetry on studio overhead screens"
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-[#080808] text-white relative overflow-hidden">
      {/* Parallax Ambient Glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E2FF00]/5 rounded-full blur-[120px] pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Storytelling + Parallax Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group">
              <motion.img
                style={{ y: imageY, scale: 1.08 }}
                src="https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1200&auto=format&fit=crop"
                alt="VYRON Athlete Training"
                className="w-full h-[460px] sm:h-[540px] object-cover transition-transform duration-700 group-hover:scale-112 will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Floating Statistic Badge 1 with independent vertical parallax & 3D Tilt */}
              <motion.div
                style={{ y: badge1Y }}
                className="absolute top-6 left-6 max-w-[210px] z-10 will-change-transform"
              >
                <GsapTiltCard
                  maxTilt={14}
                  className="p-4 rounded-2xl bg-black/90 backdrop-blur-md border border-[#E2FF00]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(226,255,0,0.2)]"
                  spotlightColor="rgba(226, 255, 0, 0.25)"
                >
                  <AnimeStatCounter
                    targetValue={98.4}
                    decimals={1}
                    suffix="%"
                    label="Verified Member Goal Rate"
                    className="text-2xl sm:text-3xl"
                  />
                </GsapTiltCard>
              </motion.div>

              {/* Floating Badge 2 with counter parallax & Live Interactive ECG Telemetry */}
              <motion.div
                style={{ y: badge2Y }}
                className="absolute bottom-6 right-6 max-w-[240px] z-10 will-change-transform"
              >
                <GsapTiltCard
                  maxTilt={14}
                  className="rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.2)]"
                  spotlightColor="rgba(0, 240, 255, 0.25)"
                >
                  <AnimeECGPulse
                    compact={true}
                    showTelemetry={false}
                    defaultBpm={72}
                    overdriveBpm={172}
                  />
                </GsapTiltCard>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Copy & Value Proposition with Staggered Scroll Reveals */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 }
              }
            }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2FF00]/10 border border-[#E2FF00]/30 text-[#E2FF00] text-xs font-mono-tech uppercase tracking-widest mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ENGINEERED FOR SUPREMACY</span>
            </motion.div>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.05] mb-6"
            >
              THE NEXT GENERATION OF <span className="text-[#E2FF00]">ATHLETIC MASTERY.</span>
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6"
            >
              VYRON was built to dismantle the mediocrity of standard commercial gyms. We merge clinical sports science, professional Olympic strength equipment, and comprehensive bio-recovery protocols to create an environment where extraordinary physical breakthroughs happen daily.
            </motion.p>

            {/* Feature List with Staggered Checks */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="space-y-3.5 mb-8 w-full"
            >
              {features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#E2FF00] shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300 font-medium leading-normal">{feat}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Grid with 3D Tilt & Kinetic Counters */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, staggerChildren: 0.06 }
                }
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 mb-8 border-t border-zinc-800"
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                    }}
                  >
                    <GsapTiltCard
                      maxTilt={10}
                      className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-[#E2FF00]/30 transition-colors h-full"
                      spotlightColor="rgba(226, 255, 0, 0.15)"
                    >
                      <AnimeStatCounter
                        targetValue={stat.value}
                        suffix={stat.suffix}
                        label={stat.label}
                        icon={Icon}
                        className="text-2xl sm:text-3xl"
                      />
                    </GsapTiltCard>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton onClick={onOpenTrial} variant="primary" size="md">
                Claim 7-Day VIP Pass
              </MagneticButton>
              <Link to="/about">
                <MagneticButton variant="ghost" size="md">
                  Our Philosophy <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

