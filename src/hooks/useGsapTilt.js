import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * useGsapTilt - Interactive 3D Card Tilt with GSAP
 * Creates buttery smooth 60fps 3D perspective tilt and mouse-tracking spotlight coordinates.
 */
export function useGsapTilt({
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  speed = 0.45,
  ease = "power2.out",
  spotlight = true
} = {}) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Check for reduced motion or touch device
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    // Fast GSAP setters with quickTo
    const setRotateX = gsap.quickTo(card, "rotationX", { duration: speed, ease });
    const setRotateY = gsap.quickTo(card, "rotationY", { duration: speed, ease });
    const setScale = gsap.quickTo(card, "scale", { duration: speed, ease });
    const setZ = gsap.quickTo(card, "z", { duration: speed, ease });

    let setSpotlightX, setSpotlightY, setSpotlightOpacity;
    if (spotlight && spotlightRef.current) {
      setSpotlightX = gsap.quickTo(spotlightRef.current, "x", { duration: 0.15, ease: "power1.out" });
      setSpotlightY = gsap.quickTo(spotlightRef.current, "y", { duration: 0.15, ease: "power1.out" });
      setSpotlightOpacity = gsap.quickTo(spotlightRef.current, "opacity", { duration: 0.25, ease: "power2.out" });
    }

    gsap.set(card, {
      transformPerspective: perspective,
      transformStyle: "preserve-3d"
    });

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      // Calculate tilt angles
      const rotY = deltaX * maxTilt;
      const rotX = -deltaY * maxTilt;

      setRotateX(rotX);
      setRotateY(rotY);
      setScale(scale);
      setZ(16);

      if (spotlight && spotlightRef.current) {
        setSpotlightX(x);
        setSpotlightY(y);
        setSpotlightOpacity(1);
      }
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setScale(1);
      setZ(0);

      if (spotlight && spotlightRef.current) {
        setSpotlightOpacity(0);
      }
    };

    const handleMouseEnter = () => {
      if (spotlight && spotlightRef.current) {
        setSpotlightOpacity(1);
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
      gsap.set(card, { clearProps: "all" });
    };
  }, [maxTilt, perspective, scale, speed, ease, spotlight]);

  return { cardRef, spotlightRef };
}
