import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDraggingGlobal, setIsDraggingGlobal] = useState(false);

  useEffect(() => {
    // Check if device has touch capability
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (document.body.classList.contains("is-dragging")) {
        setCursorVariant("hidden");
        return;
      }

      const target = e.target.closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        const text = target.getAttribute("data-cursor-text") || "";
        if (type === "none" || type === "hidden") {
          setCursorVariant("hidden");
        } else {
          setCursorVariant(type || "hover");
          setCursorText(text);
        }
      } else if (e.target.closest("button, a, input, select, textarea, [role='button'], [role='slider']")) {
        setCursorVariant("button");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    // Listen for custom dragging events
    const handleDragStart = () => {
      setIsDraggingGlobal(true);
      setCursorVariant("hidden");
    };

    const handleDragEnd = () => {
      setIsDraggingGlobal(false);
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("slider-drag-start", handleDragStart);
    window.addEventListener("slider-drag-end", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("slider-drag-start", handleDragStart);
      window.removeEventListener("slider-drag-end", handleDragEnd);
    };
  }, []);

  if (isTouchDevice) return null;

  const variants = {
    default: {
      opacity: 1,
      scale: 1,
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: "#E2FF00",
      mixBlendMode: "difference"
    },
    button: {
      opacity: 1,
      scale: 1,
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      backgroundColor: "rgba(226, 255, 0, 0.15)",
      borderColor: "#E2FF00",
      borderWidth: 1.5,
      mixBlendMode: "normal"
    },
    view: {
      opacity: 1,
      scale: 1,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      width: 64,
      height: 64,
      backgroundColor: "rgba(0, 240, 255, 0.85)",
      mixBlendMode: "normal"
    },
    drag: {
      opacity: isDraggingGlobal ? 0 : 0.9,
      scale: isDraggingGlobal ? 0 : 1,
      x: mousePosition.x - 28,
      y: mousePosition.y - 28,
      width: 56,
      height: 56,
      backgroundColor: "rgba(226, 255, 0, 0.9)",
      mixBlendMode: "normal"
    },
    hidden: {
      opacity: 0,
      scale: 0,
      x: mousePosition.x,
      y: mousePosition.y,
      width: 0,
      height: 0
    }
  };

  const activeVariant = isDraggingGlobal ? "hidden" : cursorVariant;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer follow circle */}
      <motion.div
        className="rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-black font-mono-tech pointer-events-none"
        animate={activeVariant}
        variants={variants}
        transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.5 }}
      >
        {activeVariant !== "hidden" && cursorText}
      </motion.div>
    </div>
  );
}
