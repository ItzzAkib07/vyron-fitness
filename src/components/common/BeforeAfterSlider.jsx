import React, { useState, useRef, useCallback, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER (16 WEEKS)",
  aspectRatio = "aspect-[4/3]",
  className = ""
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    setIsDragging(true);
    document.body.classList.add("is-dragging");
    window.dispatchEvent(new CustomEvent("slider-drag-start"));
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      document.body.classList.remove("is-dragging");
      window.dispatchEvent(new CustomEvent("slider-drag-end"));
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("is-dragging");
      window.dispatchEvent(new CustomEvent("slider-drag-end"));
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Before and after transformation slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-cursor="none"
      className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl select-none touch-none cursor-ew-resize border border-zinc-800 shadow-2xl group focus:outline-none focus:ring-2 focus:ring-[#E2FF00]/50 ${className}`}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/* After Image (Full background layer) */}
      <img
        src={afterImage}
        alt="After transformation"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        loading="lazy"
      />
      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#E2FF00]/50 text-[#E2FF00] text-xs font-mono-tech uppercase font-bold tracking-wider pointer-events-none">
        {afterLabel}
      </div>

      {/* Before Image (Clipped overlay layer using hardware-accelerated CSS clip-path) */}
      <img
        src={beforeImage}
        alt="Before transformation"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
        loading="lazy"
      />
      <div
        className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-zinc-300 text-xs font-mono-tech uppercase font-bold tracking-wider pointer-events-none transition-opacity"
        style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#E2FF00] shadow-[0_0_12px_#E2FF00] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E2FF00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(226,255,0,0.6)] border-2 border-black transition-transform duration-150 ${
            isDragging ? "scale-110 shadow-[0_0_25px_#E2FF00]" : "group-hover:scale-105"
          }`}
        >
          <MoveHorizontal className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
}
