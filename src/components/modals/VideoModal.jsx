import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, ShieldCheck, Activity } from "lucide-react";

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black border border-zinc-700 shadow-2xl z-10 flex items-center justify-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Cinematic Simulated Video Stream Player with HUD elements */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
              alt="VYRON Cinematic Training Film"
              className="w-full h-full object-cover opacity-60 scale-105 animate-pulse"
              style={{ animationDuration: "6s" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />

            {/* High-tech HUD overlays */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2FF00]/10 border border-[#E2FF00]/40 text-[#E2FF00] text-xs font-mono-tech uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>4K CINEMA STREAM • 60 FPS</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 font-mono-tech">
                <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>HEART RATE TELEMETRY: 168 BPM</span>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-[#E2FF00] text-black flex items-center justify-center shadow-[0_0_50px_rgba(226,255,0,0.6)] mb-6 animate-bounce">
                <Play className="w-8 h-8 fill-black translate-x-0.5" />
              </div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold mb-2">
                VYRON CINEMATIC BRAND MANIFESTO
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight max-w-2xl">
                YOUR LIMITS ARE <span className="text-[#E2FF00]">MENTAL CONSTRUCTS</span>
              </h2>
              <p className="text-zinc-300 text-sm max-w-md mt-3">
                Experience how science-backed coaching, telemetry feedback, and raw community work together to forge unstoppable human performance.
              </p>
            </div>

            {/* Bottom Status bar */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs font-mono-tech text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E2FF00]" />
                <span>DIRECTED BY VYRON CREATIVE LABS</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-zinc-300" />
                <span>DOLBY ATMOS SPATIAL SOUND</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
