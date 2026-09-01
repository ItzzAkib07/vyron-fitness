import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * ParallaxImage: An image wrapper with subtle vertical parallax gliding inside its cropped container
 * @param {string} src - Image URL
 * @param {string} alt - Alt text
 * @param {number} intensity - Parallax intensity (0.1 = subtle, 0.3 = dramatic)
 * @param {string} containerClassName - Classes for the outer cropped container
 * @param {string} className - Classes for the image itself
 */
export default function ParallaxImage({
  src,
  alt = "",
  intensity = 0.15,
  containerClassName = "relative overflow-hidden aspect-[16/9] rounded-3xl",
  className = "w-full h-full object-cover",
  children,
  ...props
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate transform range percentage
  const percentOffset = intensity * 100;
  const yRaw = useTransform(scrollYProgress, [0, 1], [`-${percentOffset}%`, `${percentOffset}%`]);
  const y = useSpring(yRaw, { stiffness: 100, damping: 25 });
  const scale = 1 + intensity * 1.5;

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className={`will-change-transform ${className}`}
        loading="lazy"
        {...props}
      />
      {children}
    </div>
  );
}
