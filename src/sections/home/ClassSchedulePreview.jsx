import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, User, Flame, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scheduleDays, scheduleClasses } from "../../data/scheduleData";
import SectionHeader from "../../components/common/SectionHeader";
import MagneticButton from "../../components/common/MagneticButton";

const categories = ["All", "CrossFit", "Strength", "HIIT", "Boxing", "Yoga", "Mobility"];

export default function ClassSchedulePreview({ onBookClass }) {
  const [activeDay, setActiveDay] = useState("MON");
  const [activeCat, setActiveCat] = useState("All");

  const dayClasses = scheduleClasses[activeDay] || [];
  const filtered = activeCat === "All"
    ? dayClasses
    : dayClasses.filter((c) => c.category === activeCat);

  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="LIVE WEEKLY TIMETABLE"
            title="STUDIO CLASS"
            accentWord="SCHEDULE."
            subtitle="Explore our daily masterclasses. Real-time slot availability updated live."
            align="left"
            className="mb-0 max-w-xl"
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <Link to="/schedule">
              <MagneticButton variant="outline" size="md">
                Full 7-Day Timetable <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Day Selector Tabs with scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none"
        >
          {scheduleDays.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-3 rounded-2xl font-display font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeDay === day
                  ? "bg-[#E2FF00] text-black shadow-[0_0_20px_rgba(226,255,0,0.35)] scale-105"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {day}
            </button>
          ))}
        </motion.div>

        {/* Category Filters with scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tech uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                activeCat === cat
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Class Row Cards with Cascading Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07, delayChildren: 0.05 }
            }
          }}
          className="space-y-3"
        >
          {filtered.map((cls) => (
            <motion.div
              key={cls.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-lg"
            >
              {/* Left Details */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                {/* Time Badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono-tech text-sm font-bold text-[#E2FF00] w-fit">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>{cls.time}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono-tech uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {cls.category}
                    </span>
                    <span className="text-xs font-mono-tech text-zinc-500">
                      {cls.duration}
                    </span>
                    <span className="text-xs font-mono-tech text-[#00F0FF]">
                      • {cls.difficulty}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-[#E2FF00] transition-colors">
                    {cls.title}
                  </h3>
                </div>
              </div>

              {/* Middle Coach & Room */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono-tech">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-zinc-500" />
                  <span>Coach: {cls.trainer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span>{cls.room}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#E2FF00]">
                  <Flame className="w-4 h-4" />
                  <span>{cls.spotsLeft} Spots Left</span>
                </div>
              </div>

              {/* Book Button */}
              <div className="shrink-0">
                <MagneticButton
                  onClick={() => onBookClass(cls)}
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  BOOK CLASS
                </MagneticButton>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-zinc-500 font-mono-tech text-sm">
              No classes match the selected filter on {activeDay}. Try another category or day.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

