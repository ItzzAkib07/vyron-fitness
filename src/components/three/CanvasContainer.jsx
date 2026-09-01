import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MetallicDumbbell } from "./MetallicDumbbell";
import { ParticleField } from "./ParticleField";

function FallbackVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-72 h-72 rounded-full border border-[#E2FF00]/30 animate-pulse flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-[#00F0FF]/30 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#E2FF00]/20 to-[#00F0FF]/20 backdrop-blur-md flex items-center justify-center text-xs font-mono tracking-widest text-[#E2FF00]">
            VYRON-3D
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CanvasContainer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
      }
    } catch {
      setIsSupported(false);
    }

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isSupported) {
    return <FallbackVisual />;
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Suspense fallback={<FallbackVisual />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-4, -2, -2]} intensity={2.0} color="#00F0FF" />
          <pointLight position={[4, 3, 2]} intensity={2.5} color="#E2FF00" />
          <spotLight position={[0, 6, 2]} angle={0.6} penumbra={1} intensity={1.2} color="#ffffff" />

          {/* 3D Elements */}
          <MetallicDumbbell mousePos={mousePos} />
          <ParticleField count={160} />
        </Canvas>
      </Suspense>
    </div>
  );
}
