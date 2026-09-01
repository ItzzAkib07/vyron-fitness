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
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          onMouseEnter={playHover}
          className="flex items-center gap-3 group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-[#E2FF00] p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(226,255,0,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center font-display font-black text-xl text-[#E2FF00]">
              V
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-[#E2FF00] transition-colors leading-none">
              VYRON<span className="text-[#E2FF00]">.</span>
            </span>
            <span className="text-[9px] font-mono-tech uppercase tracking-widest text-zinc-400 font-semibold mt-0.5">
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

        {/* Right Actions: Calculator, Sound, Join CTA, Menu Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Fitness Calculator Trigger */}
          <button
            onClick={onOpenCalculator}
            onMouseEnter={playHover}
            aria-label="Open Fitness Calculators"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00F0FF]/50 text-xs font-mono-tech text-zinc-300 hover:text-[#00F0FF] transition-all cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden xl:inline">1RM & MACROS</span>
          </button>

          {/* Sound Toggle */}
          <SoundToggle />

          {/* Primary CTA */}
          <MagneticButton
            onClick={onOpenTrial}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN NOW</span>
          </MagneticButton>

          {/* Fullscreen Menu Trigger */}
          <button
            onClick={onOpenMenu}
            onMouseEnter={playHover}
            aria-label="Open Fullscreen Menu"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 border border-white/15 hover:border-[#E2FF00] text-white hover:text-[#E2FF00] transition-all duration-300 cursor-pointer"
          >
            <span className="text-xs font-mono-tech uppercase tracking-wider font-bold hidden sm:inline">
              MENU
            </span>
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
