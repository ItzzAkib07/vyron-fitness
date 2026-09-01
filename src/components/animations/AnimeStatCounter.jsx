import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

/**
 * AnimeStatCounter
 * Interactive kinetic rolling number counter with Anime.js v4.
 * Automatically animates into view and re-triggers with a spring-loaded spin on hover.
 */
export default function AnimeStatCounter({
  targetValue = 100,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  className = "",
  label = "",
  icon: Icon
}) {
  const numRef = useRef(null);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animInstance = useRef(null);

  const startAnimation = (isFast = false) => {
    const el = numRef.current;
    if (!el) return;

    if (animInstance.current && animInstance.current.pause) animInstance.current.pause();

    const obj = { val: 0 };
    animInstance.current = animate(obj, {
      val: targetValue,
      duration: isFast ? 650 : duration,
      ease: isFast ? "outElastic(1, .6)" : "outExpo",
      onUpdate: () => {
        if (el) {
          el.textContent = obj.val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          });
        }
      }
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animInstance.current && animInstance.current.pause) animInstance.current.pause();
    };
  }, [hasAnimated, targetValue]);

  const handleMouseEnter = () => {
    startAnimation(true);
    // Micro pop effect on the badge container
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: [1, 1.05, 1],
        duration: 350,
        ease: "outQuad"
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`group select-none cursor-pointer transition-colors ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 text-[#E2FF00] mb-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />}
      <div className="font-display font-black text-white flex items-baseline tracking-tight">
        {prefix && <span className="mr-0.5 text-zinc-400 font-bold">{prefix}</span>}
        <span ref={numRef} className="tabular-nums">
          {targetValue.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          })}
        </span>
        {suffix && <span className="text-[#E2FF00] ml-0.5">{suffix}</span>}
      </div>
      {label && (
        <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono-tech uppercase mt-0.5 group-hover:text-zinc-300 transition-colors">
          {label}
        </div>
      )}
    </div>
  );
}
