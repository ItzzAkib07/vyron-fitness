import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Activity, Zap, Heart } from "lucide-react";

/**
 * AnimeECGPulse
 * Interactive athletic biometric telemetry & ECG heartbeat wave visualizer powered by Anime.js v4.
 * Features live SVG path line-drawing, kinetic pulse scanning, and interactive overdrive mode on hover/click.
 */
export default function AnimeECGPulse({
  defaultBpm = 74,
  overdriveBpm = 178,
  compact = false,
  showTelemetry = true,
  className = ""
}) {
  const [isOverdrive, setIsOverdrive] = useState(false);
  const [bpm, setBpm] = useState(defaultBpm);
  const pathRef = useRef(null);
  const pulseDotRef = useRef(null);
  const animationRef = useRef(null);
  const numberAnimRef = useRef(null);

  // SVG ECG Wave Path coordinates
  const ecgPath = "M 0 25 L 30 25 L 42 25 L 48 10 L 54 38 L 62 2 L 70 46 L 76 25 L 90 25 L 98 18 L 106 25 L 140 25 L 152 25 L 158 10 L 164 38 L 172 2 L 180 46 L 186 25 L 200 25 L 208 18 L 216 25 L 260 25";

  useEffect(() => {
    const path = pathRef.current;
    const pulseDot = pulseDotRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const duration = isOverdrive ? 950 : 2200;

    // 1. Anime.js ECG Path Draw Animation
    if (animationRef.current && animationRef.current.pause) animationRef.current.pause();

    animationRef.current = animate(path, {
      strokeDashoffset: [pathLength, 0],
      ease: "linear",
      duration: duration,
      loop: true
    });

    // 2. Anime.js Pulse Blip follower
    if (pulseDot) {
      animate(pulseDot, {
        scale: isOverdrive ? [1, 1.8, 1] : [1, 1.3, 1],
        opacity: isOverdrive ? [0.6, 1, 0.6] : [0.4, 0.9, 0.4],
        ease: "inOutSine",
        duration: isOverdrive ? 475 : 1100,
        loop: true
      });
    }

    // 3. Anime.js Numeric BPM transition
    const targetBpm = isOverdrive ? overdriveBpm : defaultBpm;
    const obj = { val: bpm };
    if (numberAnimRef.current && numberAnimRef.current.pause) numberAnimRef.current.pause();
    numberAnimRef.current = animate(obj, {
      val: targetBpm,
      ease: "outExpo",
      duration: 600,
      onUpdate: () => {
        setBpm(Math.round(obj.val));
      }
    });

    return () => {
      if (animationRef.current && animationRef.current.pause) animationRef.current.pause();
      if (numberAnimRef.current && numberAnimRef.current.pause) numberAnimRef.current.pause();
    };
  }, [isOverdrive, defaultBpm, overdriveBpm]);

  return (
    <div
      onMouseEnter={() => setIsOverdrive(true)}
      onMouseLeave={() => setIsOverdrive(false)}
      onClick={() => setIsOverdrive(!isOverdrive)}
      className={`group relative rounded-2xl bg-zinc-950/80 border transition-all duration-300 select-none cursor-pointer overflow-hidden ${
        isOverdrive
          ? "border-[#E2FF00] shadow-[0_0_25px_rgba(226,255,0,0.25)] bg-zinc-900/90"
          : "border-white/10 hover:border-[#00F0FF]/50"
      } ${compact ? "p-3" : "p-4 sm:p-5"} ${className}`}
    >
      {/* Background glow overlay */}
      <div
        className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${
          isOverdrive ? "bg-[#E2FF00]/15 opacity-100" : "bg-[#00F0FF]/10 opacity-50"
        }`}
      />

      {/* Top Header telemetry */}
      <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <div
            ref={pulseDotRef}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              isOverdrive ? "bg-[#E2FF00] shadow-[0_0_10px_#E2FF00]" : "bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
            }`}
          />
          <span className="font-mono-tech text-[10px] uppercase font-bold tracking-wider text-zinc-400 group-hover:text-white transition-colors">
            {isOverdrive ? "MAX EFFORT • ZONE 5" : "RESTING TELEMETRY"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono-tech text-xs">
          <Heart className={`w-3.5 h-3.5 transition-colors ${isOverdrive ? "text-[#E2FF00] animate-pulse" : "text-[#00F0FF]"}`} />
          <span className={`font-black font-display text-sm sm:text-base ${isOverdrive ? "text-[#E2FF00]" : "text-white"}`}>
            {bpm}
          </span>
          <span className="text-[10px] text-zinc-500">BPM</span>
        </div>
      </div>

      {/* Interactive SVG ECG Waveform */}
      <div className="relative w-full h-12 flex items-center justify-center my-1 z-10">
        {/* Subtle background grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Shadow blurred duplicate for neon glow */}
        <svg
          viewBox="0 0 260 50"
          className="absolute inset-0 w-full h-full opacity-60 blur-[2px] pointer-events-none"
          preserveAspectRatio="none"
        >
          <path
            d={ecgPath}
            fill="none"
            stroke={isOverdrive ? "#E2FF00" : "#00F0FF"}
            strokeWidth={isOverdrive ? "3" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Crisp foreground animated SVG line */}
        <svg
          viewBox="0 0 260 50"
          className="relative w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="50%" stopColor="#E2FF00" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={ecgPath}
            fill="none"
            stroke="url(#ecgGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom Telemetry Metrics */}
      {showTelemetry && (
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5 text-[10px] font-mono-tech text-zinc-400 relative z-10">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#00F0FF]" />
            <span>CNS: {isOverdrive ? "99% PRIME" : "96% READY"}</span>
          </div>
          <div className="flex items-center gap-1 text-[#E2FF00]">
            <Zap className="w-3 h-3" />
            <span>{isOverdrive ? "HYPERDRIVE ACTIVE" : "HOVER TO TEST"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
