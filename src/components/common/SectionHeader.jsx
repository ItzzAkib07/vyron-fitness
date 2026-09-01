import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center", // "center" | "left"
  accentWord = null,
  className = ""
}) {
  const isCenter = align === "center";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className={`mb-12 md:mb-16 w-full ${
        isCenter
          ? "flex flex-col items-center justify-center text-center mx-auto max-w-4xl px-2"
          : "max-w-2xl text-left"
      } ${className}`}
    >
      {badge && (
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2FF00]/10 border border-[#E2FF00]/30 text-[#E2FF00] text-xs font-mono-tech uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(226,255,0,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E2FF00] animate-ping" />
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        variants={titleVariants}
        className={`font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1] w-full ${
          isCenter ? "text-center" : "text-left"
        }`}
      >
        <span>{title}</span>
        {accentWord && (
          <>
            {" "}
            <span className="text-[#E2FF00] inline-block text-glow-volt">{accentWord}</span>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          className={`mt-4 text-sm sm:text-base md:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl ${
            isCenter ? "text-center mx-auto" : "text-left"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

