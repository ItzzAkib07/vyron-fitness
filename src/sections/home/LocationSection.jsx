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
          badge="CLUB LOCATION"
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
                <span>STATE-OF-THE-ART ATHLETIC CLUB</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-6">
                VYRON PUNE (BANER)
              </h3>

              <div className="space-y-5 text-xs sm:text-sm font-mono-tech text-zinc-300">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#E2FF00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">ADDRESS</span>
                    <span>Apex Velocity Tower, Baner Road, Baner, Pune, Maharashtra 411045</span>
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
                onClick={() => window.open("https://maps.google.com/?q=Baner,+Pune,+Maharashtra", "_blank")}
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

          {/* Right: Real Interactive Embedded Google Map with Dark Theme & Live HUD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 relative min-h-[440px] shadow-2xl flex flex-col group"
          >
            {/* Embedded Google Maps for Baner, Pune */}
            <iframe
              src="https://maps.google.com/maps?q=Baner,+Pune,+Maharashtra&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[440px] rounded-3xl border-0 filter invert-[0.88] hue-rotate-[180deg] contrast-[1.25] opacity-85 group-hover:opacity-100 transition-opacity"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VYRON Location - Baner, Pune"
            />

            {/* Futuristic Live Telemetry Overlay Badge */}
            <motion.div
              style={{ y: hudY }}
              className="absolute top-4 right-4 p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-[#E2FF00]/40 text-left shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(226,255,0,0.15)] max-w-xs pointer-events-none will-change-transform z-10"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono-tech uppercase tracking-widest text-[#E2FF00] font-bold mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#E2FF00]" />
                <span>Baner, Pune</span>
              </div>
              <div className="font-mono-tech text-xs text-zinc-300">
                Apex Velocity Tower, Baner Road, Pune
              </div>
              <div className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] font-mono-tech">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
                <span>Live Valet Bay: Open (48 Spots)</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

