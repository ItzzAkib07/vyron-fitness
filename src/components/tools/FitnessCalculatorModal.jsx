import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, Dumbbell, PieChart, Sparkles } from "lucide-react";
import { calculate1RM, calculateMacros } from "../../utils/formatters";
import MagneticButton from "../common/MagneticButton";
import { GsapTiltCard, AnimeStatCounter } from "../animations";

export default function FitnessCalculatorModal({ isOpen, onClose }) {
  const [tab, setTab] = useState("1rm"); // "1rm" | "macro"

  // 1RM states
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);

  // Macro states
  const [bodyWeight, setBodyWeight] = useState(75);
  const [goal, setGoal] = useState("cut"); // "cut", "maintain", "bulk"
  const [activity, setActivity] = useState("moderate");

  if (!isOpen) return null;

  const estimated1RM = calculate1RM(weight, reps);
  const macroResults = calculateMacros({
    weight: bodyWeight,
    goal,
    activityLevel: activity
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-[#0e0e0e] border border-zinc-800 p-6 md:p-8 text-white shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#E2FF00] font-mono-tech text-xs uppercase tracking-widest mb-1">
            <Calculator className="w-4 h-4" />
            <span>VYRON Performance Analytics Lab</span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
            Scientific <span className="text-[#E2FF00]">Fitness Tools</span>
          </h3>

          {/* Tab Switcher */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 mt-5 mb-6">
            <button
              onClick={() => setTab("1rm")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono-tech uppercase font-bold transition-all cursor-pointer ${
                tab === "1rm"
                  ? "bg-[#E2FF00] text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              1-Rep Max (1RM)
            </button>
            <button
              onClick={() => setTab("macro")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono-tech uppercase font-bold transition-all cursor-pointer ${
                tab === "macro"
                  ? "bg-[#00F0FF] text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <PieChart className="w-4 h-4" />
              Macro & Calories
            </button>
          </div>

          {tab === "1rm" ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">
                    Lifted Weight (KG)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-lg focus:outline-none focus:border-[#E2FF00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">
                    Repetitions Performed
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-lg focus:outline-none focus:border-[#E2FF00]"
                  />
                </div>
              </div>

              {/* 1RM Result Card */}
              <GsapTiltCard
                maxTilt={6}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#1a2405] to-zinc-900 border border-[#E2FF00]/40 text-center relative overflow-hidden"
                spotlightColor="rgba(226, 255, 0, 0.25)"
              >
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold">
                  ESTIMATED 1-REP MAX
                </span>
                <div className="flex justify-center items-baseline my-2">
                  <AnimeStatCounter
                    key={`1rm-${estimated1RM}`}
                    targetValue={estimated1RM}
                    suffix=" KG"
                    duration={600}
                    className="text-5xl"
                  />
                </div>
                <p className="text-xs text-zinc-300">
                  Based on the Epley formula: 1RM = Weight × (1 + Reps/30)
                </p>

                {/* Percentage breakdown */}
                <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">95% (2 reps)</span>
                    <span className="font-bold text-white font-mono">{Math.round(estimated1RM * 0.95)} kg</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">90% (4 reps)</span>
                    <span className="font-bold text-white font-mono">{Math.round(estimated1RM * 0.90)} kg</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">80% (8 reps)</span>
                    <span className="font-bold text-white font-mono">{Math.round(estimated1RM * 0.80)} kg</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">70% (12 reps)</span>
                    <span className="font-bold text-white font-mono">{Math.round(estimated1RM * 0.70)} kg</span>
                  </div>
                </div>
              </GsapTiltCard>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">
                    Body Weight (KG)
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="200"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">
                    Target Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-[#00F0FF]"
                  >
                    <option value="cut">Fat Loss (-500 kcal)</option>
                    <option value="maintain">Maintenance (TDEE)</option>
                    <option value="bulk">Hypertrophy (+400 kcal)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">
                    Activity Level
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-[#00F0FF]"
                  >
                    <option value="sedentary">Desk Job (1.2x)</option>
                    <option value="moderate">3-4 Workouts (1.45x)</option>
                    <option value="intense">5-6 Heavy Days (1.7x)</option>
                    <option value="elite">Athlete / 2x Day (1.9x)</option>
                  </select>
                </div>
              </div>

              {macroResults && (
                <GsapTiltCard
                  maxTilt={6}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#061e27] to-zinc-900 border border-[#00F0FF]/40 text-center"
                  spotlightColor="rgba(0, 240, 255, 0.25)"
                >
                  <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#00F0FF] font-bold">
                    DAILY TARGET ENERGY INTAKE
                  </span>
                  <div className="flex justify-center items-baseline my-2">
                    <AnimeStatCounter
                      key={`macro-${macroResults.calories}`}
                      targetValue={macroResults.calories}
                      suffix=" KCAL / DAY"
                      duration={600}
                      className="text-4xl"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block font-mono-tech uppercase">PROTEIN</span>
                      <span className="font-bold text-[#E2FF00] font-mono text-base">{macroResults.protein}g</span>
                      <span className="text-[10px] text-zinc-500 block">2.2g / kg</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block font-mono-tech uppercase">CARBOHYDRATES</span>
                      <span className="font-bold text-[#00F0FF] font-mono text-base">{macroResults.carbs}g</span>
                      <span className="text-[10px] text-zinc-500 block">Glycogen fill</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block font-mono-tech uppercase">HEALTHY FATS</span>
                      <span className="font-bold text-white font-mono text-base">{macroResults.fats}g</span>
                      <span className="text-[10px] text-zinc-500 block">25% Energy</span>
                    </div>
                  </div>
                </GsapTiltCard>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <MagneticButton onClick={onClose} variant="ghost" size="sm">
              Close Calculator
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
