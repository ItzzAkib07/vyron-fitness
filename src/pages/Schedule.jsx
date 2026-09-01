import React, { useState } from "react";
import { Clock, MapPin, User, Flame, Calendar, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import MagneticButton from "../components/common/MagneticButton";
import { scheduleDays, scheduleClasses } from "../data/scheduleData";

const categories = ["All", "CrossFit", "Strength", "HIIT", "Boxing", "Yoga", "Mobility", "Functional"];

export default function Schedule({ onBookClass }) {
  const [activeDay, setActiveDay] = useState("MON");
  const [activeCat, setActiveCat] = useState("All");

  const dayClasses = scheduleClasses[activeDay] || [];
  const filtered = activeCat === "All"
    ? dayClasses
    : dayClasses.filter((c) => c.category === activeCat);

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Class Schedule & Weekly Timetable — VYRON"
        description="Book your daily CrossFit, HIIT, Olympic lifting, boxing, and yoga classes at VYRON Fitness. Live spot reservation."
        canonical="https://vyronfitness.com/schedule"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="WEEKLY TIMETABLE"
          title="MASTERCLASS"
          accentWord="SCHEDULE."
          subtitle="Reserve your spot in high-output studio classes. All sessions are coached by certified Master Practitioners."
        />

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {scheduleDays.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3.5 rounded-2xl font-display font-black text-base uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeDay === day
                  ? "bg-[#E2FF00] text-black shadow-[0_0_20px_rgba(226,255,0,0.35)] scale-105"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                activeCat === cat
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Class Row Cards */}
        <div className="space-y-4 mb-16">
          {filtered.map((cls) => (
            <div
              key={cls.id}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                {/* Time Badge */}
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono-tech text-base font-bold text-[#E2FF00] w-fit">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>{cls.time}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono-tech uppercase px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                      {cls.category}
                    </span>
                    <span className="text-xs font-mono-tech text-zinc-500">
                      {cls.duration}
                    </span>
                    <span className="text-xs font-mono-tech text-[#00F0FF]">
                      • {cls.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-[#E2FF00] transition-colors">
                    {cls.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono-tech">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-zinc-500" />
                  <span>Coach: {cls.trainer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span>{cls.room}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#E2FF00] font-bold">
                  <Flame className="w-4 h-4" />
                  <span>{cls.spotsLeft} Spots Available</span>
                </div>
              </div>

              <div className="shrink-0">
                <MagneticButton
                  onClick={() => onBookClass(cls)}
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  RESERVE SPOT
                </MagneticButton>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-500 font-mono-tech text-base">
              No classes scheduled under the selected filter on {activeDay}. Try another category or day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
