import React from "react";
import { useGsapTilt } from "../../hooks/useGsapTilt";

/**
 * GsapTiltCard - High-performance 3D perspective tilt container with cursor spotlight
 */
export default function GsapTiltCard({
  children,
  className = "",
  spotlightColor = "rgba(226, 255, 0, 0.12)",
  maxTilt = 8,
  scale = 1.02,
  spotlight = true,
  ...props
}) {
  const { cardRef, spotlightRef } = useGsapTilt({
    maxTilt,
    scale,
    spotlight
  });

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      {...props}
    >
      {/* Spotlight Radial Glow following cursor */}
      {spotlight && (
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute -top-32 -left-32 w-64 h-64 rounded-full opacity-0 blur-2xl transition-opacity will-change-transform z-20"
          style={{
            background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`
          }}
        />
      )}

      {/* Content wrapper with preserve-3d */}
      <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </div>
  );
}
