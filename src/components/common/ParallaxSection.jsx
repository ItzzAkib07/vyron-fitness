import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * ParallaxLayer: Offsets a single layer based on scroll progress through its parent
 * @param {number} speed - Parallax speed multiplier (positive moves up as user scrolls down, negative moves down)
 * @param {Array<number>} offsetRange - Pixel range for transform, e.g. [-50, 50]
 * @param {boolean} smooth - Enable spring smoothing
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  offsetRange,
  smooth = true,
  className = "",
  style = {},
  ...props
}) {
  const layerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ["start end", "end start"]
  });

  const range = offsetRange || [-100 * speed, 100 * speed];
  const yRaw = useTransform(scrollYProgress, [0, 1], range);
  const y = smooth ? useSpring(yRaw, { stiffness: 120, damping: 25, restDelta: 0.001 }) : yRaw;

  return (
    <motion.div
      ref={layerRef}
      style={{ y, ...style }}
      className={`will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxSection: Wrapper around a whole section or banner to apply parallax depth to background and floating items
 */
export default function ParallaxSection({
  children,
  speed = 0.2,
  offsetRange,
  smooth = true,
  className = "",
  style = {},
  ...props
}) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const range = offsetRange || [-80 * speed, 80 * speed];
  const yRaw = useTransform(scrollYProgress, [0, 1], range);
  const y = smooth ? useSpring(yRaw, { stiffness: 120, damping: 25, restDelta: 0.001 }) : yRaw;

  return (
    <div ref={sectionRef} className={`relative ${className}`} {...props}>
      <motion.div style={{ y, ...style }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
