import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sparkles, Calculator } from "lucide-react";
import MagneticButton from "../common/MagneticButton";
import SoundToggle from "../common/SoundToggle";
import { useSoundEffects } from "../../hooks/useSoundEffects";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Programs", path: "/programs" },
  { name: "Trainers", path: "/trainers" },
  { name: "Membership", path: "/membership" },
  { name: "Facilities", path: "/facilities" },
  { name: "Schedule", path: "/schedule" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" }
];

export default function Navbar({ onOpenMenu, onOpenTrial, onOpenCalculator }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { playHover } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="w-full px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          onMouseEnter={playHover}
          className="flex items-center gap-2 sm:gap-3 group select-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#00F0FF] to-[#E2FF00] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(226,255,0,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#050505] rounded-[6px] sm:rounded-[10px] flex items-center justify-center font-display font-black text-base sm:text-xl text-[#E2FF00]">
              V
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-2xl tracking-tight text-white group-hover:text-[#E2FF00] transition-colors leading-none">
              VYRON<span className="text-[#E2FF00]">.</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono-tech uppercase tracking-widest text-zinc-400 font-semibold mt-0.5">
              ATHLETIC LAB
            </span>
          </div>
        </Link>

        {/* Desktop & Laptop Navigation Links (1024px+) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1.5 rounded-full bg-zinc-900/70 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={playHover}
                className={`relative px-3.5 xl:px-4 py-2 rounded-full text-xs font-mono-tech uppercase font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-black bg-[#E2FF00] shadow-[0_0_15px_rgba(226,255,0,0.4)]"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Tablet Quick Navigation Links (md screens: 768px - 1023px) */}
        <nav className="hidden md:flex lg:hidden items-center gap-1 p-1.5 rounded-full bg-zinc-900/70 border border-white/10 backdrop-blur-md">
          {[
            { name: "Programs", path: "/programs" },
            { name: "Trainers", path: "/trainers" },
            { name: "Membership", path: "/membership" },
            { name: "Facilities", path: "/facilities" }
          ].map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-black bg-[#E2FF00] shadow-[0_0_12px_rgba(226,255,0,0.35)]"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Quick Join (Mobile), Calculator, Sound, Join CTA (Desktop), Hamburger Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Mobile Quick VIP Join Pill */}
          <button
            onClick={onOpenTrial}
            onMouseEnter={playHover}
            aria-label="Join VIP Trial"
            className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#E2FF00] text-black font-mono-tech text-[10px] font-black uppercase tracking-wider shadow-[0_0_10px_rgba(226,255,0,0.35)] active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>JOIN</span>
          </button>

          {/* Fitness Calculator Trigger (Desktop/Tablet) */}
          <button
            onClick={onOpenCalculator}
            onMouseEnter={playHover}
            aria-label="Open Fitness Calculators"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00F0FF]/50 text-xs font-mono-tech text-zinc-300 hover:text-[#00F0FF] transition-all cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden xl:inline">1RM & MACROS</span>
          </button>

          {/* Sound Toggle (Available on all devices) */}
          <div className="shrink-0">
            <SoundToggle />
          </div>

          {/* Primary CTA (Desktop/Tablet) */}
          <MagneticButton
            onClick={onOpenTrial}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN NOW</span>
          </MagneticButton>

          {/* High-Tech Hamburger Menu Trigger Button */}
          <button
            onClick={onOpenMenu}
            onMouseEnter={playHover}
            aria-label="Open Navigation Menu"
            className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800/90 border border-white/15 hover:border-[#E2FF00] text-white hover:text-[#E2FF00] shadow-[0_2px_10px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider font-bold text-zinc-200 group-hover:text-[#E2FF00] transition-colors">
              MENU
            </span>
            <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#E2FF00]/10 flex items-center justify-center transition-colors">
              <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E2FF00] transition-transform duration-300 group-hover:scale-110" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
