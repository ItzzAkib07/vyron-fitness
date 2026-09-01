import React, { useEffect, useRef } from "react";
import { animate, random } from "animejs";

/**
 * AnimeParticleBurst
 * Global high-octane click shockwave and volt/cyan spark particle generator powered by Anime.js v4.
 * Automatically catches clicks on interactive elements (buttons, links, cards, badges)
 * and generates vibrant kinetic energy bursts and expanding shockwaves.
 */
export default function AnimeParticleBurst() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const colors = [
      "#E2FF00", // Volt Neon
      "#00F0FF", // Cyber Cyan
      "#FFFFFF", // Pure White Flash
      "#CCFF00", // Lime Energy
      "#00B4D8"  // Electric Blue
    ];

    const createBurst = (x, y) => {
      const container = containerRef.current;
      if (!container) return;

      // 1. Create expanding shockwave ring
      const ring = document.createElement("div");
      ring.className = "pointer-events-none fixed rounded-full border border-[#E2FF00] z-50 -translate-x-1/2 -translate-y-1/2";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = "10px";
      ring.style.height = "10px";
      ring.style.boxShadow = "0 0 15px rgba(226, 255, 0, 0.6), inset 0 0 15px rgba(0, 240, 255, 0.4)";
      container.appendChild(ring);

      animate(ring, {
        width: ["10px", "95px"],
        height: ["10px", "95px"],
        opacity: [0.95, 0],
        borderWidth: ["2px", "0.5px"],
        duration: 650,
        ease: "outExpo",
        onComplete: () => {
          if (ring.parentNode) ring.parentNode.removeChild(ring);
        }
      });

      // 2. Create kinetic sparks / particles
      const particleCount = 14;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "pointer-events-none fixed rounded-full z-50 -translate-x-1/2 -translate-y-1/2";
        
        const size = random(3, 7);
        const color = colors[random(0, colors.length - 1)];
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        container.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
        const distance = random(25, 75);
        const destX = Math.cos(angle) * distance;
        const destY = Math.sin(angle) * distance;

        animate(particle, {
          translateX: destX,
          translateY: destY,
          scale: [
            { to: random(1.2, 1.8), duration: 150, ease: "outQuad" },
            { to: 0, duration: 450, ease: "inQuad" }
          ],
          opacity: [
            { to: 1, duration: 100 },
            { to: 0, duration: 500, ease: "outSine" }
          ],
          duration: random(500, 750),
          ease: "outExpo",
          onComplete: () => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
          }
        });
      }
    };

    const handleClick = (e) => {
      // Trigger burst on buttons, links, cards, tabs, and elements with data-spark
      const isInteractive = e.target.closest(
        "button, a, [role='button'], input[type='submit'], .cursor-pointer, [data-spark]"
      );

      if (isInteractive) {
        createBurst(e.clientX, e.clientY);
      }
    };

    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    />
  );
}
