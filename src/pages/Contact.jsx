import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Car, Sparkles, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import MagneticButton from "../components/common/MagneticButton";
import { useSoundEffects } from "../hooks/useSoundEffects";

export default function Contact({ onOpenTrial }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "Strength & Muscle Building",
    program: "Hypertrophy & Max Strength",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { playSuccess } = useSoundEffects();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        playSuccess();
        try {
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#E2FF00", "#00F0FF", "#FFFFFF"]
          });
        } catch {
          // Fallback
        }
      }, 700);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Contact & Location — VYRON Fitness (Baner, Pune)"
        description="Get in touch with the VYRON concierge team. Schedule a private tour or claim your 7-day all-access trial pass in Baner, Pune."
        canonical="https://vyronfitness.com/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          badge="CONCIERGE & HEADQUARTERS"
          title="GET IN"
          accentWord="TOUCH."
          subtitle="Whether you are an aspiring athlete or looking for executive private training, our team is at your service 24/7."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left: Contact Form with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E2FF00]/10 border border-[#E2FF00] flex items-center justify-center mx-auto mb-4 text-[#E2FF00]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-black uppercase text-white tracking-tight">
                  Inquiry Received <span className="text-[#E2FF00]">Successfully</span>
                </h3>
                <p className="text-zinc-400 text-sm mt-2 mb-8 max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. A Master Coach and VIP Concierge officer will contact you within 2 business hours.
                </p>
                <MagneticButton
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", goal: "Strength & Muscle Building", program: "Hypertrophy & Max Strength", message: "" });
                  }}
                  variant="outline"
                  size="md"
                >
                  Send Another Inquiry
                </MagneticButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mb-1">
                    Direct Inquiry & Consultation
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6">
                    Fill out the form below and we'll craft an individualized orientation itinerary for your visit.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1.5">
                    Full Name *
                  </label>
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
                    <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
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
                    <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Phone Number *
                    </label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#E2FF00] text-sm"
                    >
                      <option value="Strength & Muscle Building">Hypertrophy & Max Strength</option>
                      <option value="Fat Loss & EPOC Conditioning">Fat Loss & EPOC Conditioning</option>
                      <option value="Tactical CrossFit">Tactical CrossFit & Agility</option>
                      <option value="Boxing & Combat">Boxing & Combat Striking</option>
                      <option value="Mobility & Longevity">Mobility, Breathwork & Longevity</option>
                      <option value="VIP 1-on-1 Coaching">VIP 1-on-1 Personal Coaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Preferred Program
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#E2FF00] text-sm"
                    >
                      <option value="Hypertrophy & Max Strength">Hypertrophy & Max Strength</option>
                      <option value="Metabolic HIIT & Ignite">Metabolic HIIT & Ignite</option>
                      <option value="VYRON Tactical CrossFit">VYRON Tactical CrossFit</option>
                      <option value="Apex Boxing Conditioning">Apex Boxing Conditioning</option>
                      <option value="Neuro-Flow Yoga & Breath">Neuro-Flow Yoga & Breath</option>
                      <option value="VIP 1-on-1 Elite Coaching">VIP 1-on-1 Elite Coaching</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1.5">
                    Message or Specific Inquiries (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about previous injuries, current lifting numbers, or tour scheduling preferences..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E2FF00] transition-colors text-sm"
                  />
                </div>

                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="w-full justify-center"
                  >
                    {loading ? (
                      <span>TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        SUBMIT INQUIRY TO CONCIERGE
                      </>
                    )}
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Headquarters Information with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-2xl">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-1">
                  LOCATION SPECIFICATIONS
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  VYRON PUNE (BANER)
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono-tech text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E2FF00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">ADDRESS</span>
                    <span>Apex Velocity Tower, Baner Road, Baner, Pune, Maharashtra 411045</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">FACILITY TIMINGS</span>
                    <span className="text-[#00F0FF] font-bold">24/7 Member RFID Access</span>
                    <p className="text-zinc-500 text-xs">Staff & Coaching: 05:30 AM – 11:00 PM Daily</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#E2FF00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">PHONE</span>
                    <span>+91 (080) 4567-8900 / +91 98765-43210</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">EMAIL</span>
                    <span>concierge@vyronfitness.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">VALET & PARKING</span>
                    <span>Complimentary 3-level underground parking with 8 EV fast chargers.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <MagneticButton
                  onClick={() => window.open("https://maps.google.com", "_blank")}
                  variant="outline"
                  size="md"
                  className="w-full justify-center"
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Open Navigation in Maps
                </MagneticButton>
              </div>
            </div>

            {/* Free Trial Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#141c03] to-zinc-950 border border-[#E2FF00]/40 text-center">
              <span className="text-[10px] font-mono-tech uppercase text-[#E2FF00] font-bold block mb-1">
                INSTANT PASS GENERATOR
              </span>
              <h4 className="font-display text-xl font-bold uppercase text-white mb-2">
                CLAIM 7-DAY VIP PASS ONLINE
              </h4>
              <p className="text-xs text-zinc-400 mb-4">
                Skip the wait and get your digital barcode pass delivered directly to your device.
              </p>
              <MagneticButton onClick={onOpenTrial} variant="primary" size="sm" className="w-full justify-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Generate Pass in 60 Seconds
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

