import React from "react";
import { motion } from "framer-motion";

/**
 * Custom motion variants for smooth scroll-triggered animations
 */
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: (staggerDelay = 0.1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05
      }
    })
  },
  staggerItem: {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  }
};

/**
 * ScrollReveal: Universal wrapper for scroll-triggered entry animations
 * @param {string} variant - "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "zoomIn" | "blurIn" | "staggerContainer" | "staggerItem"
 * @param {number} delay - Animation delay in seconds
 * @param {number} duration - Animation duration in seconds (optional)
 * @param {boolean} once - Trigger animation only once (default: true)
 * @param {number} threshold - Viewport threshold amount (default: 0.15)
 * @param {string} className - Extra CSS classes
 * @param {React.ReactNode} children - Children elements
 */
export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration,
  once = true,
  threshold = 0.15,
  staggerDelay = 0.1,
  className = "",
  style = {},
  ...props
}) {
  const selectedVariant = variants[variant] || variants.fadeUp;

  // Clone variant to apply custom duration or delay if specified
  const customVariant = {
    ...selectedVariant,
    visible: (custom) => {
      const baseVisible =
        typeof selectedVariant.visible === "function"
          ? selectedVariant.visible(custom || staggerDelay)
          : selectedVariant.visible;

      return {
        ...baseVisible,
        transition: {
          ...baseVisible.transition,
          ...(duration ? { duration } : {}),
          ...(delay ? { delay } : {})
        }
      };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={customVariant}
      custom={staggerDelay}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollStaggerGroup: Utility wrapper to wrap list/grid items with orchestrated cascading animations
 */
export function ScrollStaggerGroup({
  children,
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1,
  className = "",
  ...props
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollStaggerItem: Single child within a ScrollStaggerGroup
 */
export function ScrollStaggerItem({
  children,
  className = "",
  yOffset = 30,
  scaleFrom = 0.96,
  duration = 0.6,
  ...props
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, scale: scaleFrom },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration, ease: [0.215, 0.61, 0.355, 1] }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
