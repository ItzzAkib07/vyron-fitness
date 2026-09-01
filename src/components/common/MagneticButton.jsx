import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSoundEffects } from "../../hooks/useSoundEffects";

export default function MagneticButton({
  children,
  className = "",
  wrapperClassName = "",
  variant = "primary", // primary, secondary, outline, ghost
  onClick,
  href,
  as: Component = "button",
  size = "md",
  icon: Icon,
  disabled = false,
  ...props
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playHover, playClick } = useSoundEffects();

  const handleMouseMove = (e) => {
    if (disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm font-semibold",
    lg: "px-8 py-4 text-base font-bold"
  };

  const variantClasses = {
    primary:
      "bg-[#E2FF00] text-black font-bold hover:bg-[#c9e600] shadow-[0_0_20px_rgba(226,255,0,0.3)] hover:shadow-[0_0_30px_rgba(226,255,0,0.5)] border border-transparent",
    secondary:
      "bg-white text-black font-bold hover:bg-zinc-200 shadow-md border border-transparent",
    cyan:
      "bg-[#00F0FF] text-black font-bold hover:bg-[#00d6e6] shadow-[0_0_20px_rgba(0,240,255,0.3)] border border-transparent",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-[#E2FF00] hover:text-[#E2FF00] hover:bg-[#E2FF00]/10",
    ghost:
      "bg-transparent text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent"
  };

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.1 }}
      className={`inline-block ${wrapperClassName}`}
    >
      <Component
        onMouseEnter={playHover}
        onClick={handleClick}
        disabled={disabled}
        href={href}
        className={`relative inline-flex items-center justify-center gap-2.5 rounded-full uppercase tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
        {...props}
      >
        {children}
        {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </Component>
    </motion.div>
  );
}
