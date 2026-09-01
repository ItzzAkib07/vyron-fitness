import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundEffects } from "../../hooks/useSoundEffects";

export default function SoundToggle({ className = "" }) {
  const { soundEnabled, isPlaying, toggleSound } = useSoundEffects();

  return (
    <button
      onClick={toggleSound}
      aria-label={soundEnabled ? "Mute soundtrack and sound" : "Play athletic soundtrack"}
      title={soundEnabled ? "Mute Soundtrack" : "Play Athletic Soundtrack"}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-full glass-panel border transition-all duration-300 active:scale-95 cursor-pointer ${
        soundEnabled
          ? "border-[#E2FF00]/50 bg-[#E2FF00]/10 text-[#E2FF00] shadow-[0_0_15px_rgba(226,255,0,0.25)]"
          : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
      } ${className}`}
    >
      {soundEnabled ? (
        <>
          {/* Animated Equalizer Wave Bars */}
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className="w-0.5 bg-[#E2FF00] rounded-full animate-pulse h-full" style={{ animationDuration: "0.5s" }} />
            <span className="w-0.5 bg-[#E2FF00] rounded-full animate-pulse h-2/3" style={{ animationDuration: "0.8s" }} />
            <span className="w-0.5 bg-[#E2FF00] rounded-full animate-pulse h-4/5" style={{ animationDuration: "0.6s" }} />
          </div>
          <span className="text-[10px] font-mono-tech uppercase font-bold tracking-wider hidden md:inline text-[#E2FF00]">
            MUSIC ON
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-zinc-500" />
          <span className="text-[10px] font-mono-tech uppercase font-bold tracking-wider hidden md:inline text-zinc-400">
            SOUND OFF
          </span>
        </>
      )}
    </button>
  );
}
