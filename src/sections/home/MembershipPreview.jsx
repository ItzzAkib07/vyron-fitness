import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Check, X as XIcon, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { membershipPlans } from "../../data/membershipData";
import SectionHeader from "../../components/common/SectionHeader";
import MagneticButton from "../../components/common/MagneticButton";
import { GsapTiltCard, AnimeStatCounter } from "../../components/animations";

export default function MembershipPreview({ onOpenTrial }) {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "annual"
  const isAnnual = billingCycle === "annual";
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawGlowY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const glowY = useSpring(rawGlowY, { stiffness: 100, damping: 25 });

  return (
    <section ref={sectionRef} className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-zinc-800/80">
      {/* Background ambient lighting with parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E2FF00]/5 rounded-full blur-[140px] pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="TRANSPARENT PRICING"
          title="CHOOSE YOUR"
          accentWord="MEMBERSHIP."
          subtitle="All memberships include zero initiation fees, 24/7 RFID member privileges, and our 7-Day Risk-Free guarantee."
        />

        {/* Billing Cycle Toggle Switch with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <span className={`text-xs font-mono-tech uppercase font-bold tracking-wider ${
            !isAnnual ? "text-white" : "text-zinc-500"
          }`}>
            MONTHLY BILLING
          </span>
          <button
            onClick={() => setBillingCycle(isAnnual ? "monthly" : "annual")}
            aria-label="Toggle Annual vs Monthly billing"
            className="w-14 h-8 rounded-full bg-zinc-800 p-1 relative border border-zinc-700 transition-colors cursor-pointer"
          >
            <div
              className={`w-6 h-6 rounded-full bg-[#E2FF00] shadow-md transition-transform duration-300 ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono-tech uppercase font-bold tracking-wider ${
              isAnnual ? "text-[#E2FF00]" : "text-zinc-500"
            }`}>
              ANNUAL BILLING
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#E2FF00]/15 text-[#E2FF00] text-[10px] font-mono-tech uppercase font-bold border border-[#E2FF00]/30">
              SAVE 20%
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards Grid with Staggered Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.05 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {membershipPlans.map((plan) => {
            const price = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.id}
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.95 },
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
                  className={`h-full relative rounded-3xl p-7 flex flex-col justify-between transition-colors duration-500 ${
                    plan.isPopular
                      ? "bg-gradient-to-b from-[#141c03] via-zinc-900 to-black border-2 border-[#E2FF00] shadow-[0_0_40px_rgba(226,255,0,0.18)]"
                      : "bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700"
                  }`}
                  spotlightColor={plan.isPopular ? "rgba(226, 255, 0, 0.25)" : "rgba(255, 255, 255, 0.08)"}
                >
                  {/* Popular Pill */}
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E2FF00] text-black text-[11px] font-mono-tech uppercase font-black tracking-widest shadow-lg z-30">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                        {plan.name}
                      </h3>
                      <span className="text-[11px] font-mono-tech uppercase text-zinc-500">
                        {plan.badge}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 min-h-[32px] mb-6">
                      {plan.tagline}
                    </p>

                    {/* Dynamic Rolling Price */}
                    <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-zinc-800">
                      <AnimeStatCounter
                        key={`${plan.id}-${billingCycle}`}
                        targetValue={price}
                        prefix={plan.currency}
                        duration={800}
                        className="text-4xl sm:text-5xl"
                      />
                      <span className="text-xs text-zinc-400 font-mono-tech">
                        / {plan.period}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-500 font-bold block mb-2">
                        INCLUDED PRIVILEGES
                      </span>
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#E2FF00] shrink-0 mt-0.5" />
                          <span className="text-xs text-zinc-300 font-medium leading-tight">{feat}</span>
                        </div>
                      ))}
                      {plan.notIncluded?.map((notFeat, i) => (
                        <div key={i} className="flex items-start gap-2.5 opacity-40">
                          <XIcon className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-zinc-500 line-through leading-tight">{notFeat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                    <MagneticButton
                      onClick={onOpenTrial}
                      variant={plan.isPopular ? "primary" : "outline"}
                      size="md"
                      className="w-full justify-center"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      {plan.ctaText}
                    </MagneticButton>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 font-mono-tech">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E2FF00]" />
                      <span>Includes 7-Day Free Trial</span>
                    </div>
                  </div>
                </GsapTiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Link to full comparison */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link to="/membership" className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-[#E2FF00] hover:underline">
            <span>View Full Feature Comparison Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

