import { useState, useEffect, useCallback, useRef } from "react";

// Reliable royalty-free high-energy athletic / synthwave workout track
const AMBIENT_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=workout-cyber-109015.mp3";

// Global audio singleton so navigation doesn't restart the track
let globalAudio = null;

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(false); // Default false until user explicitly clicks
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !globalAudio) {
      globalAudio = new Audio(AMBIENT_MUSIC_URL);
      globalAudio.loop = true;
      globalAudio.volume = 0.35;
      globalAudio.preload = "auto";

      globalAudio.addEventListener("play", () => setIsPlaying(true));
      globalAudio.addEventListener("pause", () => setIsPlaying(false));
      globalAudio.addEventListener("ended", () => setIsPlaying(false));
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (!globalAudio) {
      globalAudio = new Audio(AMBIENT_MUSIC_URL);
      globalAudio.loop = true;
      globalAudio.volume = 0.35;
    }

    if (soundEnabled) {
      // Fade out and pause
      let vol = globalAudio.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          globalAudio.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeOut);
          globalAudio.pause();
          setIsPlaying(false);
        }
      }, 30);
      setSoundEnabled(false);
    } else {
      // Play and fade in
      globalAudio.volume = 0.05;
      const playPromise = globalAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            let vol = 0.05;
            const fadeIn = setInterval(() => {
              if (vol < 0.35) {
                vol += 0.05;
                globalAudio.volume = Math.min(0.35, vol);
              } else {
                clearInterval(fadeIn);
              }
            }, 40);
          })
          .catch((err) => {
            console.warn("Audio playback prevented by browser:", err);
          });
      }
      setSoundEnabled(true);
    }
  }, [soundEnabled]);

  const playTone = useCallback((freq = 440, type = "sine", duration = 0.08, gainVal = 0.03) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  const playHover = useCallback(() => {
    playTone(520, "sine", 0.04, 0.015);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(880, "triangle", 0.06, 0.03);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.02, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.15);
      });
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  return {
    soundEnabled,
    isPlaying,
    toggleSound,
    playHover,
    playClick,
    playSuccess
  };
}
