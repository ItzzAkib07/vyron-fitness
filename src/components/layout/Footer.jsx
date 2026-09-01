import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { InstagramIcon, TwitterIcon, YoutubeIcon } from "../common/SocialIcons";
import MagneticButton from "../common/MagneticButton";
import CreatorCredit from "../common/CreatorCredit";
import { useSoundEffects } from "../../hooks/useSoundEffects";

export default function Footer({ onOpenTrial }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { playSuccess } = useSoundEffects();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      playSuccess();
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#040404] text-white pt-20 pb-12 border-t border-zinc-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E2FF00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Giant Statement Signature Moment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-16 pb-16 border-b border-zinc-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-2">
                THE VYRON MANIFESTO
              </span>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]">
                TRAIN.<br />
                TRANSFORM.<br />
                <span className="text-[#E2FF00]">BECOME.</span>
              </h2>
            </div>

            <div className="max-w-lg lg:text-left flex flex-col items-start">
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                Step beyond conventional fitness. Join an elite community where exercise science, world-class equipment, and master coaching forge peak athletic human performance.
              </p>
              
              <div className="w-full sm:w-auto">
                <MagneticButton
                  onClick={onOpenTrial}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-black font-display tracking-widest bg-gradient-to-r from-[#E2FF00] via-[#E2FF00] to-[#00F0FF] text-black shadow-[0_0_30px_rgba(226,255,0,0.4)] hover:shadow-[0_0_45px_rgba(226,255,0,0.65)] group border-none"
                >
                  <Sparkles className="w-4 h-4 text-black animate-pulse" />
                  <span>CLAIM 7-DAY VIP PASS</span>
                  <ArrowUpRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </MagneticButton>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-4 text-[11px] font-mono-tech text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2FF00]" />
                  All-Zone Access
                </span>
                <span className="text-zinc-700 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  Free InBody 770 Scan
                </span>
                <span className="text-zinc-700 hidden sm:inline">•</span>
                <span className="text-zinc-400">Zero Obligation</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4-Column Directory Grid with Staggered Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16"
        >
          {/* Column 1: Brand & Contact */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="lg:col-span-2 space-y-4"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-[#E2FF00] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(226,255,0,0.3)]">
                <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center font-display font-black text-lg text-[#E2FF00]">
                  V
                </div>
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                VYRON<span className="text-[#E2FF00]">.</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Next-generation athletic club combining biomechanics, sports science diagnostics, and luxury recovery suites.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono-tech text-zinc-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#E2FF00]" />
                <span>Apex Velocity Tower, Baner Road, Baner, Pune 411045</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>+91 (080) 4567-8900 / +91 98765-43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>24/7 RFID Member Access • Staffed 05:30 - 23:00</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Programs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <h4 className="font-mono-tech text-xs uppercase tracking-widest text-[#E2FF00] font-bold mb-4">
              PROGRAMS
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link to="/programs/strength-training" className="hover:text-white transition-colors">
                  Hypertrophy & Strength
                </Link>
              </li>
              <li>
                <Link to="/programs/hiit-burn" className="hover:text-white transition-colors">
                  Metabolic HIIT & Ignite
                </Link>
              </li>
              <li>
                <Link to="/programs/crossfit-elite" className="hover:text-white transition-colors">
                  Tactical CrossFit
                </Link>
              </li>
              <li>
                <Link to="/programs/boxing-conditioning" className="hover:text-white transition-colors">
                  Apex Boxing Strike
                </Link>
              </li>
              <li>
                <Link to="/programs/functional-longevity" className="hover:text-white transition-colors">
                  Mobility & Longevity
                </Link>
              </li>
              <li>
                <Link to="/programs/personal-coaching" className="hover:text-white transition-colors">
                  VIP 1-on-1 Coaching
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <h4 className="font-mono-tech text-xs uppercase tracking-widest text-[#00F0FF] font-bold mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & Science
                </Link>
              </li>
              <li>
                <Link to="/trainers" className="hover:text-white transition-colors">
                  Master Coaches
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-white transition-colors">
                  8 Facility Zones
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-white transition-colors">
                  Pricing & Tiers
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link to="/transformations" className="hover:text-white transition-colors">
                  Member Transformations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Performance Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <h4 className="font-mono-tech text-xs uppercase tracking-widest text-white font-bold mb-4">
              RESEARCH DISPATCH
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Receive weekly scientific training protocols and nutrition breakdowns directly from our biomechanics team.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#E2FF00]/10 border border-[#E2FF00]/40 text-[#E2FF00] text-xs font-mono-tech">
                ✓ Subscribed to VYRON Research.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E2FF00]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-[#E2FF00] hover:text-black text-xs font-mono-tech uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
                >
                  Join Research Dispatch
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Middle Bar: Creator Credit + Socials */}
        <div className="pt-8 pb-6 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-[11px] font-mono-tech text-zinc-500 uppercase tracking-widest font-semibold">
              EXPERIENCE ARCHITECTURE:
            </span>
            <CreatorCredit variant="footer" />
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-[#E2FF00] border border-white/5 hover:border-[#E2FF00]/30 transition-all duration-300 shadow-md"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-[#E2FF00] border border-white/5 hover:border-[#E2FF00]/30 transition-all duration-300 shadow-md"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-[#E2FF00] border border-white/5 hover:border-[#E2FF00]/30 transition-all duration-300 shadow-md"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Sub-bar: Copyright + Policies */}
        <div className="pt-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-zinc-500">
          <div>
            © {new Date().getFullYear()} VYRON FITNESS LABS INC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/faq" className="hover:text-zinc-300 transition-colors">FAQ</Link>
            <a href="#privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">Terms & Safety</a>
            <a href="/sitemap.xml" className="hover:text-zinc-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

