import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Clock, MapPin, User, Flame, Calendar, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import MagneticButton from "../common/MagneticButton";

export default function ClassBookingModal({ isOpen, onClose, selectedClass }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const { playSuccess, playClick } = useSoundEffects();

  if (!isOpen || !selectedClass) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (validate()) {
      playSuccess();
      setStep(2);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#00F0FF", "#E2FF00", "#FFFFFF"]
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-mono-tech uppercase mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Instant Class Reservation</span>
              </div>

              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                Reserve <span className="text-[#00F0FF]">Your Spot</span>
              </h3>

              {/* Class Summary Badge */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-base">{selectedClass.title}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E2FF00]/10 text-[#E2FF00] font-mono-tech">
                    {selectedClass.category}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{selectedClass.time} ({selectedClass.duration})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{selectedClass.trainer}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{selectedClass.room}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#E2FF00]" />
                    <span className="text-[#E2FF00] font-medium">{selectedClass.spotsLeft} spots available</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBook} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Cole"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00F0FF] transition-colors text-sm"
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00F0FF] transition-colors text-sm"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00F0FF] transition-colors text-sm"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="pt-2">
                  <MagneticButton type="submit" variant="cyan" size="lg" className="w-full justify-center">
                    Confirm Class Booking
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </MagneticButton>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center justify-center mx-auto mb-4 text-[#00F0FF]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                Class Reserved <span className="text-[#00F0FF]">Successfully!</span>
              </h3>
              <p className="text-zinc-400 text-sm mt-2 mb-6">
                We've locked your spot for <span className="text-white font-semibold">{selectedClass.title}</span> at <span className="text-[#00F0FF] font-medium">{selectedClass.time}</span> in the {selectedClass.room}.
              </p>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 text-left space-y-1.5 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Attendee:</span>
                  <span className="font-semibold text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Instructor:</span>
                  <span className="text-white">{selectedClass.trainer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Pass Reference:</span>
                  <span className="font-mono text-[#E2FF00]">VYR-BK-{Math.floor(10000 + Math.random() * 90000)}</span>
                </div>
              </div>

              <MagneticButton onClick={handleClose} variant="primary" size="md" className="w-full justify-center">
                Close & View Schedule
              </MagneticButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
