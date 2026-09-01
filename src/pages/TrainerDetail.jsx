import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Star, Award, Shield, Calendar, Clock, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { InstagramIcon, TwitterIcon, LinkedinIcon } from "../components/common/SocialIcons";
import SEO from "../components/common/SEO";
import MagneticButton from "../components/common/MagneticButton";
import { trainersData } from "../data/trainersData";

export default function TrainerDetail({ onOpenTrial }) {
  const { id } = useParams();
  const trainer = trainersData.find((t) => t.id === id || t.slug === id);
  const [consultBooked, setConsultBooked] = useState(false);
  const [consultData, setConsultData] = useState({ name: "", email: "", goal: "Strength & Muscle Building" });

  if (!trainer) {
    return <Navigate to="/trainers" replace />;
  }

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (consultData.name && consultData.email) {
      setConsultBooked(true);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title={`${trainer.name} — Master Coach at VYRON`}
        description={trainer.bio}
        canonical={`https://vyronfitness.com/trainers/${trainer.id}`}
        image={trainer.image}
      />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to="/trainers"
          className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-zinc-400 hover:text-[#E2FF00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Coaches</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait + Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-zinc-800 shadow-2xl">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono-tech">
                <span className="px-3 py-1 rounded-full bg-[#E2FF00] text-black font-bold">
                  {trainer.specialty}
                </span>
                <div className="flex items-center gap-1 text-yellow-400 font-bold bg-black/70 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  <span>{trainer.rating} (120+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-mono-tech uppercase block">EXPERIENCE</span>
                <span className="font-display text-2xl font-black text-white">{trainer.experience}</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-mono-tech uppercase block">CLIENTS TRAINED</span>
                <span className="font-display text-2xl font-black text-[#E2FF00]">{trainer.clientsTrained}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono-tech text-zinc-400 uppercase">Connect with Coach</span>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-[#E2FF00] transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-[#E2FF00] transition-colors">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-[#E2FF00] transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy, Certifications & Weekly Schedule */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#00F0FF] font-bold block mb-2">
                {trainer.role}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-4">
                {trainer.name}
              </h1>
              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                {trainer.bio}
              </p>

              {/* Philosophy Quote */}
              <div className="p-6 rounded-2xl bg-zinc-950 border-l-4 border-[#E2FF00] mb-8">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-1">
                  COACHING PHILOSOPHY
                </span>
                <p className="text-sm sm:text-base text-zinc-200 italic leading-relaxed">
                  "{trainer.trainingPhilosophy}"
                </p>
              </div>
            </div>

            {/* Certifications List */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="font-display text-lg font-bold uppercase text-white tracking-tight">
                CERTIFICATIONS & ACADEMIC CREDENTIALS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trainer.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono-tech">
                    <Shield className="w-4 h-4 text-[#00F0FF] shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Schedule */}
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-2">
                TIMETABLE
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mb-4">
                WEEKLY STUDIO SESSIONS
              </h3>

              <div className="space-y-3">
                {trainer.weeklySchedule.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-zinc-900 text-xs font-mono-tech uppercase text-[#E2FF00] font-bold">
                        {item.day}
                      </span>
                      <span className="font-bold text-white text-sm">{item.class}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1-on-1 Consultation Booking Form */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 to-[#0e1402] border border-[#E2FF00]/40 shadow-2xl">
              <span className="text-xs font-mono-tech uppercase text-[#E2FF00] font-bold block mb-1">
                PRIVATE COACHING
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mb-2">
                BOOK A 1-ON-1 CONSULTATION WITH {trainer.name.toUpperCase()}
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Receive a 45-minute movement diagnostic, individualized programming review, and goal setting session.
              </p>

              {consultBooked ? (
                <div className="p-4 rounded-2xl bg-[#E2FF00]/10 border border-[#E2FF00] text-[#E2FF00] text-sm font-mono-tech text-center">
                  ✓ Consultation request received! Coach {trainer.name} will reach out within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        required
                        value={consultData.name}
                        onChange={(e) => setConsultData({ ...consultData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E2FF00]"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={consultData.email}
                        onChange={(e) => setConsultData({ ...consultData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E2FF00]"
                      />
                    </div>
                  </div>
                  <MagneticButton type="submit" variant="primary" size="md" className="w-full justify-center">
                    Request 1-on-1 Consultation
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
