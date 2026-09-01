import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Flame, Dumbbell, Shield, CheckCircle2, User, Sparkles, ArrowRight, Activity, Calendar } from "lucide-react";
import SEO from "../components/common/SEO";
import MagneticButton from "../components/common/MagneticButton";
import { programsData } from "../data/programsData";

export default function ProgramDetail({ onOpenTrial }) {
  const { id } = useParams();
  const program = programsData.find((p) => p.id === id || p.slug === id);

  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title={`${program.title} — VYRON Training Division`}
        description={program.shortDesc}
        canonical={`https://vyronfitness.com/programs/${program.id}`}
        image={program.image}
      />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-zinc-400 hover:text-[#E2FF00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Programs</span>
        </Link>
      </div>

      {/* Program Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[500px] border border-zinc-800 shadow-2xl flex flex-col justify-end p-6 sm:p-12">
          <img
            src={program.image}
            alt={program.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[#E2FF00] text-black text-xs font-mono-tech uppercase font-black">
                {program.category}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-black/70 border border-white/20 text-zinc-300 text-xs font-mono-tech">
                {program.difficulty} LEVEL
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[0.98] mb-4">
              {program.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
              {program.shortDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton onClick={onOpenTrial} variant="primary" size="lg">
                <Sparkles className="w-4 h-4 mr-1" />
                START THIS PROGRAM (7-DAY TRIAL)
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Specs Metrics Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 uppercase mb-1">
              <Clock className="w-4 h-4 text-[#00F0FF]" />
              <span>DURATION</span>
            </div>
            <div className="font-display text-2xl font-black text-white">{program.duration}</div>
            <div className="text-[11px] text-zinc-400 font-mono-tech mt-0.5">{program.frequency}</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 uppercase mb-1">
              <Flame className="w-4 h-4 text-[#E2FF00]" />
              <span>CALORIE BURN</span>
            </div>
            <div className="font-display text-2xl font-black text-white">{program.calorieBurn}</div>
            <div className="text-[11px] text-zinc-400 font-mono-tech mt-0.5">High EPOC Afterburn</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 uppercase mb-1">
              <Dumbbell className="w-4 h-4 text-[#E2FF00]" />
              <span>PRIMARY GOAL</span>
            </div>
            <div className="font-display text-2xl font-black text-white">{program.goal}</div>
            <div className="text-[11px] text-zinc-400 font-mono-tech mt-0.5">Objective Benchmark</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-500 uppercase mb-1">
              <User className="w-4 h-4 text-[#00F0FF]" />
              <span>LEAD COACH</span>
            </div>
            <div className="font-display text-2xl font-black text-white">{program.trainerName}</div>
            <div className="text-[11px] text-zinc-400 font-mono-tech mt-0.5">{program.trainerRole}</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Curriculum Breakdown & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Full Science Breakdown + 4-Phase Curriculum */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-2">
                EXERCISE BIOMECHANICS
              </span>
              <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight mb-4">
                THE PHYSIOLOGICAL PROTOCOL
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                {program.fullDesc}
              </p>
            </div>

            {/* Program Highlights */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="font-display text-xl font-black uppercase text-white tracking-tight mb-4">
                KEY TRAINING INNOVATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.highlights?.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E2FF00] shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300 leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Phase Periodized Curriculum */}
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#00F0FF] font-bold block mb-2">
                STRUCTURED PROGRESSION
              </span>
              <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight mb-6">
                PHASE-BY-PHASE CURRICULUM
              </h2>

              <div className="space-y-4">
                {program.curriculum?.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono-tech uppercase text-[#E2FF00] font-bold">
                          {phase.week}
                        </span>
                        <span className="text-zinc-500">•</span>
                        <h4 className="font-display text-lg font-bold text-white uppercase">
                          {phase.phase}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {phase.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Used */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-3">
                EQUIPMENT & TECHNOLOGY USED
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.equipmentUsed?.map((eq, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono-tech text-zinc-300">
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Coach Profile + Booking Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coach Card */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 text-center shadow-xl">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-4">
                ASSIGNED MASTER COACH
              </span>
              <img
                src={program.trainerImage}
                alt={program.trainerName}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[#E2FF00]/40 shadow-lg"
              />
              <h4 className="font-display text-xl font-black uppercase text-white">
                {program.trainerName}
              </h4>
              <p className="text-xs text-zinc-400 font-mono-tech mb-6">
                {program.trainerRole}
              </p>

              <Link to={`/trainers/${program.trainerId}`}>
                <button className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono-tech uppercase font-bold text-zinc-300 hover:text-white transition-all cursor-pointer">
                  View Coach Profile →
                </button>
              </Link>
            </div>

            {/* Enrollment Trial Box */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#162104] via-zinc-950 to-black border border-[#E2FF00]/50 shadow-2xl space-y-4">
              <span className="text-xs font-mono-tech uppercase text-[#E2FF00] font-bold block">
                COMPLIMENTARY ACCESS
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                START WITH 7-DAY FREE TRIAL
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Test this exact program for 7 full days with zero risk. Includes 1 free guided coaching session and InBody baseline scan.
              </p>
              <MagneticButton onClick={onOpenTrial} variant="primary" size="md" className="w-full justify-center">
                Claim Program Pass Now
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
