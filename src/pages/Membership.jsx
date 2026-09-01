import React, { useState } from "react";
import { Check, X as XIcon, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import MagneticButton from "../components/common/MagneticButton";
import { membershipPlans, comparisonFeatures } from "../data/membershipData";

export default function Membership({ onOpenTrial }) {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const isAnnual = billingCycle === "annual";

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Membership Plans & Pricing — BASIC, PRO & ELITE"
        description="Choose your VYRON Fitness membership. Transparent pricing starting at ₹1,499/mo. 24/7 access, InBody scans, and whole-body cryotherapy."
        canonical="https://vyronfitness.com/membership"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="TIER SELECTION"
          title="MEMBERSHIP"
          accentWord="LEVELS."
          subtitle="Engineered for total flexibility with month-to-month contracts, annual discounts, and a 7-day risk-free guarantee."
        />

        {/* Annual Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
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

        {/* Pricing Cards with Staggered Entrance */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24"
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
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-[#141c03] via-zinc-900 to-black border-2 border-[#E2FF00] shadow-[0_0_40px_rgba(226,255,0,0.18)] -translate-y-2 hover:-translate-y-3"
                    : "bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 hover:-translate-y-1"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E2FF00] text-black text-[11px] font-mono-tech uppercase font-black tracking-widest shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
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

                  <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-zinc-800">
                    <span className="text-zinc-400 text-lg font-bold">{plan.currency}</span>
                    <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono-tech">
                      / {plan.period}
                    </span>
                  </div>

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
              </motion.div>
            );
          })}
        </motion.div>

        {/* Complete Feature Comparison Matrix */}
        <div className="mb-24">
          <SectionHeader
            badge="DETAILED BREAKDOWN"
            title="FEATURE COMPARISON"
            accentWord="MATRIX."
            subtitle="Compare all privileges across our three tiers side-by-side."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-tech border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80">
                    <th className="p-5 font-bold text-zinc-400 uppercase w-2/5">PRIVILEGE</th>
                    <th className="p-5 font-bold text-white uppercase text-center w-1/5">BASIC</th>
                    <th className="p-5 font-bold text-[#E2FF00] uppercase text-center w-1/5 bg-[#E2FF00]/5">PRO (POPULAR)</th>
                    <th className="p-5 font-bold text-[#00F0FF] uppercase text-center w-1/5">ELITE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {comparisonFeatures.map((group, gIdx) => (
                    <React.Fragment key={gIdx}>
                      <tr className="bg-zinc-900/40">
                        <td colSpan={4} className="p-3.5 px-5 font-bold text-xs text-white uppercase tracking-wider bg-zinc-900/50">
                          {group.category}
                        </td>
                      </tr>
                      {group.features.map((feat, fIdx) => (
                        <tr key={fIdx} className="hover:bg-zinc-900/30 transition-colors">
                          <td className="p-4 px-5 text-zinc-300 font-sans text-xs sm:text-sm font-medium">
                            {feat.name}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feat.basic === "boolean" ? (
                              feat.basic ? <Check className="w-4 h-4 text-[#E2FF00] mx-auto" /> : <XIcon className="w-4 h-4 text-zinc-600 mx-auto" />
                            ) : (
                              <span className="text-zinc-400">{feat.basic}</span>
                            )}
                          </td>
                          <td className="p-4 text-center bg-[#E2FF00]/5">
                            {typeof feat.pro === "boolean" ? (
                              feat.pro ? <Check className="w-4 h-4 text-[#E2FF00] mx-auto" /> : <XIcon className="w-4 h-4 text-zinc-600 mx-auto" />
                            ) : (
                              <span className="text-[#E2FF00] font-bold">{feat.pro}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feat.elite === "boolean" ? (
                              feat.elite ? <Check className="w-4 h-4 text-[#00F0FF] mx-auto" /> : <XIcon className="w-4 h-4 text-zinc-600 mx-auto" />
                            ) : (
                              <span className="text-[#00F0FF] font-bold">{feat.elite}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

