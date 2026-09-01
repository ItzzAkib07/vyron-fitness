import React, { useState, useEffect, useRef } from "react";
import { Heart, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffects } from "../../hooks/useSoundEffects";

const heartColors = [
  "text-rose-400 fill-rose-400",
  "text-pink-400 fill-pink-400",
  "text-rose-500 fill-rose-500",
  "text-red-400 fill-red-400",
  "text-pink-300 fill-pink-300",
  "text-rose-300 fill-rose-300",
  "text-pink-500 fill-pink-500",
  "text-rose-200 fill-rose-200"
];

function createHeartParticle() {
  const startX = (Math.random() - 0.5) * 80;
  const driftX = startX + (Math.random() - 0.5) * 50;
  const targetY = -70 - Math.random() * 80;
  const scale = 0.6 + Math.random() * 0.75;
  const rotate = (Math.random() - 0.5) * 50;
  const size = 11 + Math.floor(Math.random() * 8);
  const color = heartColors[Math.floor(Math.random() * heartColors.length)];
  const duration = 1.2 + Math.random() * 0.5;

  return {
    id: Math.random().toString(36).substring(2, 9) + Date.now(),
    startX,
    driftX,
    targetY,
    scale,
    rotate,
    size,
    color,
    duration,
  };
}

export default function CreatorCredit({
  variant = "navbar",
  className = "",
  showSparkles = true
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const intervalRef = useRef(null);
  const { playHover } = useSoundEffects();
  const portfolioUrl = "https://dezifolio.netlify.app/";

  useEffect(() => {
    if (isHovered) {
      // Spawn initial burst of 4-5 hearts immediately
      const initialBatch = Array.from({ length: 4 }, createHeartParticle);
      setParticles(initialBatch);

      // Continuously spawn 1-2 new hearts every 140ms while hovered
      intervalRef.current = setInterval(() => {
        const newHearts = [createHeartParticle()];
        if (Math.random() > 0.4) {
          newHearts.push(createHeartParticle());
        }

        setParticles((prev) => {
          // Keep active array manageable (last 24 particles)
          const updated = [...prev, ...newHearts];
          return updated.slice(-24);
        });
      }, 140);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Give lingering particles time to animate out naturally
      const timeout = setTimeout(() => {
        setParticles([]);
      }, 600);
      return () => clearTimeout(timeout);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Continuous Popping Hearts Component
  const renderContinuousHearts = () => (
    <div className="absolute inset-x-0 bottom-full h-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0,
              x: p.startX,
              y: 0,
              scale: 0.2,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 0.95, 0],
              x: [p.startX, (p.startX + p.driftX) / 2, p.driftX],
              y: [0, p.targetY * 0.4, p.targetY],
              scale: [0.2, p.scale * 1.2, p.scale, p.scale * 0.6],
              rotate: [0, p.rotate * 0.5, p.rotate],
            }}
            exit={{
              opacity: 0,
              y: p.targetY - 20,
              scale: 0.2,
              transition: { duration: 0.3 }
            }}
            transition={{
              duration: p.duration,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="absolute will-change-transform"
          >
            <Heart
              className={`${p.color} drop-shadow-[0_0_8px_rgba(244,63,94,0.9)]`}
              style={{ width: p.size, height: p.size }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  if (variant === "navbar") {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-950/40 via-pink-950/30 to-rose-950/40 hover:from-rose-900/60 hover:via-pink-900/50 hover:to-rose-900/60 border border-rose-500/30 hover:border-rose-400/80 backdrop-blur-md transition-all duration-500 shadow-[0_0_18px_rgba(244,63,94,0.18)] hover:shadow-[0_0_30px_rgba(251,113,133,0.45)] select-none cursor-pointer ${className}`}
      >
        {renderContinuousHearts()}

        <span className="text-[11px] font-mono-tech text-rose-100/90 tracking-tight flex items-center gap-1">
          Crafted with
          <span className="inline-flex items-center justify-center text-rose-500 animate-heartbeat drop-shadow-[0_0_8px_rgba(244,63,94,0.9)]">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
          </span>
          by
        </span>

        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Akib's Portfolio"
          className="relative inline-flex items-center gap-0.5 text-[11px] font-mono-tech font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF9EBD] via-[#FFFFFF] to-[#FF5E8E] bg-clip-text text-transparent hover:brightness-125 transition-all duration-300 group/link"
        >
          <span>Akib</span>
          <ArrowUpRight className="w-3 h-3 text-rose-400 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-pink-300" />
        </a>

        {/* Ambient rose glow behind badge on hover */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500/25 via-pink-500/20 to-rose-500/25 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10 pointer-events-none" />
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-950/45 via-pink-950/35 to-rose-950/45 hover:from-rose-900/65 hover:via-pink-900/55 hover:to-rose-900/65 border border-rose-500/35 hover:border-rose-400/85 transition-all duration-500 shadow-[0_0_22px_rgba(244,63,94,0.2)] hover:shadow-[0_0_35px_rgba(251,113,133,0.5)] cursor-pointer ${className}`}
      >
        {renderContinuousHearts()}

        {showSparkles && (
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse opacity-85 group-hover:opacity-100 transition-opacity" />
        )}

        <span className="text-xs font-mono-tech text-rose-100/90 group-hover:text-white transition-colors flex items-center gap-1.5">
          <span>Crafted with</span>
          <span className="inline-flex items-center justify-center text-rose-500 animate-heartbeat drop-shadow-[0_0_10px_rgba(244,63,94,0.95)]">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </span>
          <span>by</span>
        </span>

        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono-tech font-bold uppercase tracking-wider bg-gradient-to-r from-[#FFB3C6] via-[#FFFFFF] to-[#FF4D80] bg-clip-text text-transparent hover:brightness-125 transition-all duration-300 group/link"
        >
          <span className="underline decoration-rose-400/50 decoration-wavy underline-offset-4 group-hover/link:decoration-pink-300">
            Akib
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-rose-400 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-pink-300" />
        </a>

        {/* Ambient background glow */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/25 to-rose-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10 pointer-events-none" />
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-950/40 via-pink-950/30 to-rose-950/40 hover:from-rose-900/60 hover:via-pink-900/50 hover:to-rose-900/60 border border-rose-500/30 hover:border-rose-400/80 transition-all duration-500 text-xs font-mono-tech text-rose-100/90 shadow-[0_0_18px_rgba(244,63,94,0.18)] hover:shadow-[0_0_30px_rgba(251,113,133,0.45)] cursor-pointer ${className}`}
      >
        {renderContinuousHearts()}

        <span className="flex items-center gap-1.5">
          Crafted with
          <span className="text-rose-500 animate-heartbeat drop-shadow-[0_0_8px_rgba(244,63,94,0.9)]">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </span>
          by
        </span>
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold bg-gradient-to-r from-[#FFB3C6] via-[#FFFFFF] to-[#FF4D80] bg-clip-text text-transparent hover:brightness-125 transition-colors group/link"
        >
          <span>Akib</span>
          <ArrowUpRight className="w-3 h-3 text-rose-400 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    );
  }

  // Default inline / minimal
  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 hover:border-rose-400/80 text-xs font-mono-tech text-rose-100/90 shadow-[0_0_15px_rgba(244,63,94,0.18)] cursor-pointer ${className}`}
    >
      {renderContinuousHearts()}

      <span>Crafted with</span>
      <span className="text-rose-500 animate-heartbeat drop-shadow-[0_0_8px_rgba(244,63,94,0.9)]">
        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
      </span>
      <span>by</span>
      <a
        href={portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold bg-gradient-to-r from-[#FFB3C6] via-[#FFFFFF] to-[#FF4D80] bg-clip-text text-transparent inline-flex items-center gap-0.5 hover:brightness-125 transition-colors"
      >
        <span>Akib</span>
        <ArrowUpRight className="w-3 h-3 text-rose-400" />
      </a>
    </span>
  );
}


