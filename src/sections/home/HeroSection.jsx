import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Sparkles, Flame, Shield, MapPin, Play, Activity } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import CanvasContainer from "../../components/three/CanvasContainer";
import MagneticButton from "../../components/common/MagneticButton";
import { GsapTiltCard, AnimeStatCounter, AnimeECGPulse } from "../../components/animations";

export default function HeroSection({ onOpenTrial, onOpenVideo }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);

  // Scroll parallax logic
  const { scrollY } = useScroll();
  const rawHeadlineY = useTransform(scrollY, [0, 500], [0, -50]);
  const rawBadgesY = useTransform(scrollY, [0, 500], [0, -25]);
  const rawCanvasScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const rawIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  const headlineY = useSpring(rawHeadlineY, { stiffness: 100, damping: 25 });
  const badgesY = useSpring(rawBadgesY, { stiffness: 100, damping: 25 });
  const canvasScale = useSpring(rawCanvasScale, { stiffness: 100, damping: 25 });
  const indicatorOpacity = useSpring(rawIndicatorOpacity, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2
      })
      .from(".hero-word", {
        opacity: 0,
        y: 60,
        rotationX: -45,
        stagger: 0.08,
        duration: 1.0
      }, "-=0.4")
      .from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, "-=0.6")
      .from(ctaRef.current?.children, {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.7
      }, "-=0.5")
      .from(badgesRef.current?.children, {
        opacity: 0,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.8
      }, "-=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden bg-mesh-dark bg-grain"
    >
      {/* 3D Canvas Background Overlay with subtle scroll scale parallax */}
      <motion.div
        style={{ scale: canvasScale }}
        className="absolute inset-0 z-0 opacity-80 pointer-events-auto will-change-transform"
      >
        <CanvasContainer />
      </motion.div>

      {/* Radial Vignette */}
      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent via-black/40 to-[#050505] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          style={{ y: headlineY }}
          className="max-w-4xl flex flex-col items-start text-left will-change-transform"
        >
          {/* Top Telemetry Badge */}
          <div className="hero-badge flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2FF00]/10 border border-[#E2FF00]/40 text-[#E2FF00] text-xs font-mono-tech uppercase tracking-widest shadow-[0_0_15px_rgba(226,255,0,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#E2FF00] animate-ping" />
              <span>NEXT-GEN ATHLETIC PERFORMANCE</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono-tech">
              <MapPin className="w-3 h-3 text-[#00F0FF]" />
              <span>Baner, Pune</span>
            </div>
          </div>

          {/* Giant Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6"
          >
            <span className="block hero-word">BUILD YOUR</span>
            <span className="block hero-word text-metallic">STRONGEST</span>
            <span className="block hero-word text-volt-gradient">SELF.</span>
          </h1>

          {/* Supporting Subtitle */}
          <p
            ref={subtitleRef}
            className="text-zinc-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed mb-8"
          >
            Train harder. Move smarter. Become unstoppable. Science-backed strength biomechanics, Olympic lifting rigs, and elite recovery chambers engineered for high performers.
          </p>

          {/* Hero CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-10">
            <MagneticButton
              onClick={onOpenTrial}
              variant="primary"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              START YOUR JOURNEY
            </MagneticButton>

            <Link to="/programs">
              <MagneticButton variant="outline" size="lg">
                EXPLORE PROGRAMS
              </MagneticButton>
            </Link>

            {/* Video Teaser Button */}
            <button
              onClick={onOpenVideo}
              className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono-tech uppercase text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#E2FF00] text-black flex items-center justify-center">
                <Play className="w-3 h-3 fill-black translate-x-0.5" />
              </div>
              <span>WATCH FILM (1:20)</span>
            </button>
          </div>

          {/* Floating Live Telemetry Badges with 3D Tilt & Kinetic Number Counters */}
          <motion.div
            ref={badgesRef}
            style={{ y: badgesY }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl pt-6 border-t border-white/10 will-change-transform"
          >
            <GsapTiltCard
              maxTilt={12}
              className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md hover:border-[#E2FF00]/40 transition-colors"
              spotlightColor="rgba(226, 255, 0, 0.2)"
            >
              <AnimeStatCounter
                targetValue={10000}
                suffix="+"
                label="Active Elite Members"
                icon={Flame}
                className="w-full"
              />
            </GsapTiltCard>

            <GsapTiltCard
              maxTilt={12}
              className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md hover:border-[#00F0FF]/40 transition-colors"
              spotlightColor="rgba(0, 240, 255, 0.2)"
            >
              <AnimeStatCounter
                targetValue={50}
                suffix="+ MASTER"
                label="CSCS & DPT Certified"
                icon={Shield}
                className="w-full"
              />
            </GsapTiltCard>

            <GsapTiltCard
              maxTilt={12}
              className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md hover:border-green-400/40 transition-colors"
              spotlightColor="rgba(34, 197, 94, 0.2)"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono-tech text-zinc-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>ACCESS</span>
              </div>
              <div className="font-display font-black text-xl text-white">24/7 OPEN</div>
              <div className="text-[10px] text-zinc-500 font-mono-tech">Biometric RFID Gates</div>
            </GsapTiltCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator with smooth scroll fade */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-500 pointer-events-none will-change-transform"
      >
        <span className="text-[10px] font-mono-tech uppercase tracking-widest">SCROLL DOWN</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#E2FF00]" />
      </motion.div>
    </section>
  );
}

