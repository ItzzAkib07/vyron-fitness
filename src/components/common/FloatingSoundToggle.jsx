import React from "react";
import { VolumeX } from "lucide-react";
import { useSoundEffects } from "../../hooks/useSoundEffects";

/**
 * FloatingSoundToggle
 * Mobile-specific floating sound button positioned at the bottom left corner.
 */
export default function FloatingSoundToggle() {
  const { soundEnabled, toggleSound } = useSoundEffects();

  return (
    <div className="fixed bottom-5 left-5 z-40 md:hidden pointer-events-auto">
      <button
        onClick={toggleSound}
        aria-label={soundEnabled ? "Mute soundtrack" : "Play athletic soundtrack"}
        title={soundEnabled ? "Mute Soundtrack" : "Play Athletic Soundtrack"}
        className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)] active:scale-90 cursor-pointer ${
          soundEnabled
            ? "bg-zinc-900/95 border-[#E2FF00] text-[#E2FF00] shadow-[0_0_20px_rgba(226,255,0,0.35)]"
            : "bg-zinc-900/90 border-white/20 text-zinc-400 hover:text-white hover:border-[#E2FF00]/50"
        }`}
      >
        {soundEnabled ? (
          <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
            <span className="w-0.5 bg-[#E2FF00] rounded-full animate-pulse h-full" style={{ animationDuration: "0.5s" }} />
            <span className="w-0.5 bg-[#E2FF00] rounded-full animate-pulse h-2/3" style={{ animationDuration: "0.8s" }} />
            <span className="w-0.5 bg-[#E2FF00] rounded-full animate-pulse h-4/5" style={{ animationDuration: "0.6s" }} />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-zinc-400" />
        )}
      </button>
    </div>
  );
}
