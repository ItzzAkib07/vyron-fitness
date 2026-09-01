import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, MapPin, Clock, Phone, Sparkles } from "lucide-react";
import { InstagramIcon, TwitterIcon, YoutubeIcon } from "../common/SocialIcons";
import CreatorCredit from "../common/CreatorCredit";
import { useSoundEffects } from "../../hooks/useSoundEffects";

const menuItems = [
  { title: "Home", path: "/", number: "01", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" },
  { title: "About", path: "/about", number: "02", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop" },
  { title: "Programs", path: "/programs", number: "03", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" },
  { title: "Trainers", path: "/trainers", number: "04", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop" },
  { title: "Membership", path: "/membership", number: "05", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop" },
  { title: "Transformations", path: "/transformations", number: "06", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop" },
  { title: "Facilities", path: "/facilities", number: "07", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop" },
  { title: "Schedule", path: "/schedule", number: "08", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop" },
  { title: "Blog", path: "/blog", number: "09", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop" },
  { title: "Contact", path: "/contact", number: "10", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" },
  { title: "FAQ", path: "/faq", number: "11", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" }
];

export default function FullscreenMenu({ isOpen, onClose, onOpenTrial }) {
  const [activeImage, setActiveImage] = useState(menuItems[0].image);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const { playHover, playClick } = useSoundEffects();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between overflow-y-auto px-4 py-5 sm:px-10 md:px-12 sm:py-8 md:py-10"
      >
        {/* Top bar inside menu */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 sm:pb-6">
          <Link
            to="/"
            onClick={() => { playClick(); onClose(); }}
            className="flex items-center gap-2.5 sm:gap-3 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#00F0FF] to-[#E2FF00] p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(226,255,0,0.3)]">
              <div className="w-full h-full bg-[#050505] rounded-[6px] sm:rounded-[10px] flex items-center justify-center font-display font-black text-base sm:text-xl text-[#E2FF00]">
                V
              </div>
            </div>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-[#E2FF00] transition-colors">
              VYRON<span className="text-[#E2FF00]">.</span>
            </span>
          </Link>

          {/* Time & Coordinates Telemetry */}
          <div className="hidden md:flex items-center gap-6 font-mono-tech text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#E2FF00]" />
              <span>HQ TIME: {currentTime || "00:00:00"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>18.5590° N, 73.7868° E</span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => { playClick(); onClose(); }}
            className="group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 hover:border-[#E2FF00] bg-zinc-900/90 hover:bg-[#E2FF00]/10 text-white hover:text-[#E2FF00] transition-all duration-300 cursor-pointer"
          >
            <span className="text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider font-bold">CLOSE</span>
            <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Main Content: Links Grid + Preview Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-5 sm:py-8">
          {/* Links Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-1 sm:space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.35 }}
                >
                  <Link
                    to={item.path}
                    onMouseEnter={() => {
                      playHover();
                      setActiveImage(item.image);
                    }}
                    onClick={() => {
                      playClick();
                      onClose();
                    }}
                    className="group flex items-baseline gap-3 sm:gap-4 py-1 sm:py-1.5 transition-all duration-300"
                  >
                    <span className="font-mono-tech text-[10px] sm:text-xs text-zinc-500 group-hover:text-[#E2FF00] transition-colors w-5 sm:w-6 shrink-0">
                      {item.number}
                    </span>
                    <span className={`font-display text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight transition-all duration-300 ${
                      isActive ? "text-[#E2FF00] pl-2 sm:pl-3" : "text-zinc-300 group-hover:text-white group-hover:pl-2 sm:group-hover:pl-3"
                    }`}>
                      {item.title}
                    </span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-[#E2FF00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Hover Preview Card (Desktop) */}
          <div className="hidden lg:col-span-5 lg:flex flex-col justify-center items-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl p-1 bg-zinc-900">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={activeImage}
                alt="Navigation preview"
                className="w-full h-full object-cover rounded-[22px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[22px]" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono-tech uppercase text-[#E2FF00] tracking-widest font-bold block mb-1">
                  VYRON ATHLETIC LABS
                </span>
                <p className="text-sm font-semibold text-white">
                  Next-Generation High Performance Experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quick Info, Creator Credit & Socials */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono-tech">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <button
              onClick={() => {
                onClose();
                if (onOpenTrial) onOpenTrial();
              }}
              className="flex items-center gap-2 text-[#E2FF00] font-bold hover:underline cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>CLAIM 7-DAY VIP PASS</span>
            </button>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>+91 98765 43210</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CreatorCredit variant="menu" />

            <div className="flex items-center gap-4 border-l border-zinc-800 pl-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E2FF00] transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#E2FF00] transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#E2FF00] transition-colors" aria-label="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
