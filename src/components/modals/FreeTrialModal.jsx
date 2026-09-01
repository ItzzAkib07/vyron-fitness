import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Sparkles, Shield, ArrowRight, QrCode } from "lucide-react";
import confetti from "canvas-confetti";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import MagneticButton from "../common/MagneticButton";

export default function FreeTrialModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "Strength & Muscle Building",
    preferredTime: "Morning (06:00 - 10:00 AM)"
  });
  const [errors, setErrors] = useState({});
  const { playSuccess, playClick } = useSoundEffects();

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      playSuccess();
      setStep(2);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E2FF00", "#00F0FF", "#FFFFFF"]
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleClose = () => {
    playClick();
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#0d0d0d] border border-zinc-800 p-6 md:p-8 text-white shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 1 ? (
            <div>
              <div className="flex items-center gap-2 text-[#E2FF00] font-mono-tech text-xs uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Zero Risk • No Credit Card Required</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                Claim 7-Day VIP <span className="text-[#E2FF00]">Trial Pass</span>
              </h3>
              <p className="text-zinc-400 text-sm mt-1 mb-6">
                Full 24/7 access to all 8 facility zones, one free masterclass, and an InBody composition scan.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Cole"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E2FF00] transition-colors text-sm"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcus@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E2FF00] transition-colors text-sm"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E2FF00] transition-colors text-sm"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">Primary Fitness Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#E2FF00] transition-colors text-sm"
                  >
                    <option value="Strength & Muscle Building">Hypertrophy & Max Strength</option>
                    <option value="Fat Loss & EPOC Conditioning">Fat Loss & EPOC Conditioning</option>
                    <option value="CrossFit & Athleticism">Tactical CrossFit & Agility</option>
                    <option value="Boxing & Combat">Boxing & Combat Striking</option>
                    <option value="Mobility & Longevity">Mobility, Breathwork & Longevity</option>
                  </select>
                </div>

                <div className="pt-2">
                  <MagneticButton type="submit" variant="primary" size="lg" className="w-full justify-center">
                    Generate Digital VIP Pass
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </MagneticButton>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono-tech pt-2">
                  <Shield className="w-3.5 h-3.5 text-[#E2FF00]" />
                  <span>Instant pass activation • Encrypted & private</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#E2FF00]/10 border border-[#E2FF00] flex items-center justify-center mx-auto mb-4 text-[#E2FF00]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                VIP Access <span className="text-[#E2FF00]">Confirmed</span>
              </h3>
              <p className="text-zinc-400 text-sm mt-1 mb-6">
                Your 7-Day Access Pass has been generated and sent to <span className="text-white font-medium">{formData.email}</span>.
              </p>

              {/* Digital Pass Card */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-[#E2FF00]/40 text-left relative overflow-hidden mb-6 shadow-inner">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono-tech uppercase text-[#E2FF00] tracking-widest font-bold">VYRON DIGITAL VIP PASS</span>
                    <h4 className="text-lg font-bold text-white uppercase">{formData.name}</h4>
                    <p className="text-xs text-zinc-400">Valid for 7 Days from First Scan</p>
                  </div>
                  <div className="p-2 rounded-lg bg-black border border-zinc-700 text-[#E2FF00]">
                    <QrCode className="w-9 h-9" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-zinc-800">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">PASS ID</span>
                    <span className="font-mono text-white">VYR-7D-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">PROGRAM FOCUS</span>
                    <span className="text-zinc-300 truncate block">{formData.goal}</span>
                  </div>
                </div>
              </div>

              <MagneticButton onClick={handleClose} variant="primary" size="md" className="w-full justify-center">
                Done & Return to Site
              </MagneticButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
