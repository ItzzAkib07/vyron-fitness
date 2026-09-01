import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Compass, Dumbbell, Trophy, CheckCircle2 } from "lucide-react";
import SectionHeader from "../../components/common/SectionHeader";

const steps = [
  {
    number: "01",
    id: "assess",
    title: "ASSESS & DIAGNOSE",
    icon: Activity,
    badge: "STAGE 1",
    tagline: "Clinical Biomechanics & InBody Scan",
    description: "Every athlete begins with a multi-planar movement screen, assessing ankle dorsiflexion, hip rotational angles, thoracic spine freedom, and InBody 770 body composition metrics to detect asymmetries.",
    metrics: [
      "InBody 770 Dual-Frequency Segmental Lean Analysis",
      "Dynamic 3D joint range-of-motion screen (CARs)",
      "Neuromuscular power & baseline force assessment"
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "02",
    id: "plan",
    title: "CUSTOM BLUEPRINT",
    icon: Compass,
    badge: "STAGE 2",
    tagline: "Periodized Loading & Macro Nutrition",
    description: "Our sports scientists translate your diagnostics into an exact 12-week wave-loaded training plan and precision macro nutrition blueprint synchronized with your workout timing.",
    metrics: [
      "Individualized 1RM percentage wave load curves",
      "Leucine-threshold targeted protein timing blueprint",
      "Recovery frequency & deload week synchronization"
    ],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "03",
    id: "train",
    title: "EXECUTE & ADAPT",
    icon: Dumbbell,
    badge: "STAGE 3",
    tagline: "Master Coach Feedback & Telemetry",
    description: "Execute under the active eye of Master Coaches. Lift with calibrated Eleiko bars, push limits on curved Woodway decks, and monitor real-time heart rate zones on studio monitors.",
    metrics: [
      "Live heart rate zone telemetry on overhead screens",
      "Real-time barbell velocity tracking (VBT)",
      "Daily technique feedback and bar path audit"
    ],
    image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "04",
    id: "transform",
    title: "RECOVER & TRANSCEND",
    icon: Trophy,
    badge: "STAGE 4",
    tagline: "Cryo Regeneration & Peak Output",
    description: "Flush systemic inflammation in -110°C cryotherapy chambers and full-spectrum infrared saunas. Watch your power metrics surge, body composition transform, and athletic endurance peak.",
    metrics: [
      "Whole-body cryotherapy & contrast cold plunging",
      "Continuous bi-weekly progress benchmarking",
      "Unstoppable mental discipline and lifelong physical baseline"
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
  }
];

export default function FitnessJourneyTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <section className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="THE 4-STAGE METHODOLOGY"
          title="THE TRANSFORMATION"
          accentWord="TIMELINE."
          subtitle="How sports science, biomechanics, and relentless accountability combine into an engineered roadmap to your ultimate physical potential."
        />

        {/* Step Tabs with Staggered Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
        >
          {steps.map((s, index) => {
            const isSelected = activeStep === index;
            const StepIcon = s.icon;
            return (
              <motion.button
                key={s.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                onClick={() => setActiveStep(index)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? "bg-zinc-900 border-2 border-[#E2FF00] shadow-[0_0_25px_rgba(226,255,0,0.2)]"
                    : "bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-mono-tech text-xs uppercase font-bold ${
                    isSelected ? "text-[#E2FF00]" : "text-zinc-500"
                  }`}>
                    {s.number}
                  </span>
                  <StepIcon className={`w-4 h-4 ${isSelected ? "text-[#E2FF00]" : "text-zinc-500"}`} />
                </div>
                <div className="font-display font-black text-lg uppercase text-white tracking-tight">
                  {s.title}
                </div>
                <div className="text-xs text-zinc-400 truncate mt-1">
                  {s.tagline}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Detailed Stage Showcase with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient stage glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E2FF00]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#E2FF00]/10 text-[#E2FF00] font-mono-tech text-xs uppercase font-bold border border-[#E2FF00]/30">
                {current.badge}
              </span>
              <span className="font-mono-tech text-xs text-zinc-500">
                STAGE {current.number} OF 04
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-2">
              {current.title}
            </h3>

            <p className="text-sm font-semibold text-[#00F0FF] font-mono-tech uppercase mb-4">
              {current.tagline}
            </p>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="space-y-3 pt-2 border-t border-zinc-800">
              {current.metrics.map((m, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E2FF00] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Photographic Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-zinc-800 shadow-xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-[#E2FF00]">
                <span>STAGE PROTOCOL {current.number}</span>
                <span className="text-white">VERIFIED METHOD</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

