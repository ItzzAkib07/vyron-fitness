import React, { useRef } from "react";
import { MapPin, Clock, Phone, Mail, Navigation, Car, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionHeader from "../../components/common/SectionHeader";
import MagneticButton from "../../components/common/MagneticButton";

export default function LocationSection({ onOpenTrial }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawHudY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rawBgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);

  const hudY = useSpring(rawHudY, { stiffness: 100, damping: 25 });
  const bgScale = useSpring(rawBgScale, { stiffness: 100, damping: 25 });

  return (
    <section ref={sectionRef} className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="FLAGSHIP HEADQUARTERS"
          title="VISIT OUR"
          accentWord="FACILITY."
          subtitle="Located in the heart of Baner's prime high-street and executive corridor, Pune, with dedicated underground valet parking and 24/7 security."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Info Card with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#E2FF00] uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>STATE-OF-THE-ART FLAGSHIP</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-6">
                VYRON PUNE (BANER)
              </h3>

              <div className="space-y-5 text-xs sm:text-sm font-mono-tech text-zinc-300">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#E2FF00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">ADDRESS</span>
                    <span>Apex Velocity Tower, Baner Road, Baner, Pune, MH 411045</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">OPERATING HOURS</span>
                    <span className="text-[#00F0FF] font-bold">24/7 RFID Member Access</span>
                    <p className="text-zinc-500 text-xs mt-0.5">Staff & Coaching: 05:30 AM – 11:00 PM Daily</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#E2FF00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">DIRECT CONCIERGE</span>
                    <span>+91 (080) 4567-8900 / +91 98765-43210</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">EMAIL INQUIRIES</span>
                    <span>concierge@vyronfitness.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Car className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">PARKING & TRANSIT</span>
                    <span>Complimentary 3-level underground valet parking with EV fast-chargers.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800 flex flex-wrap gap-3">
              <MagneticButton
                onClick={() => window.open("https://maps.google.com", "_blank")}
                variant="primary"
                size="md"
              >
                <Navigation className="w-4 h-4 mr-1" />
                GET DIRECTIONS
              </MagneticButton>
              <MagneticButton onClick={onOpenTrial} variant="outline" size="md">
                Book VIP Tour
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: High-tech Futuristic Visual Map with Parallax Scale & Floating HUD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 relative min-h-[380px] shadow-2xl flex items-center justify-center p-6"
          >
            <motion.img
              style={{ scale: bgScale }}
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop"
              alt="VYRON Architectural Facility"
              className="absolute inset-0 w-full h-full object-cover opacity-35 will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

            {/* Futuristic Map Overlay HUD with Floating Parallax */}
            <motion.div
              style={{ y: hudY }}
              className="relative z-10 p-6 rounded-2xl bg-black/85 backdrop-blur-xl border border-[#E2FF00]/40 max-w-md text-center shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(226,255,0,0.15)] will-change-transform"
            >
              <div className="w-14 h-14 rounded-full bg-[#E2FF00]/15 border border-[#E2FF00] flex items-center justify-center mx-auto mb-3 text-[#E2FF00]">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold block mb-1">
                GPS COORDINATES
              </span>
              <div className="font-mono-tech text-xl font-bold text-white mb-2">
                18.5590° N, 73.7868° E
              </div>
              <p className="text-xs text-zinc-300 mb-4">
                Flagship facility is located on Baner Road, near Balewadi High Street junction.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-xs font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                <span>Live Valet Bay Status: Open (48 Spots)</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

