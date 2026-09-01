import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Dumbbell, Sparkles } from "lucide-react";
import SEO from "../components/common/SEO";
import MagneticButton from "../components/common/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center pt-28 pb-20 px-4">
      <SEO
        title="404 — Page Not Found | VYRON Fitness"
        description="The requested athletic route does not exist. Return to VYRON home."
        canonical="https://vyronfitness.com/404"
      />

      <div className="max-w-xl text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono-tech uppercase tracking-widest mb-6">
          <span>ERROR CODE 404 • ROUTE UNRECOGNIZED</span>
        </div>

        <h1 className="font-display text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800 tracking-tight leading-none mb-4">
          404
        </h1>

        <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-4">
          YOU'VE VENTURED <span className="text-[#E2FF00]">OFF THE GRID.</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
          The protocol or training division you are searching for does not exist or has been relocated.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <MagneticButton variant="primary" size="lg">
              <Home className="w-4 h-4 mr-1" />
              Return to Home
            </MagneticButton>
          </Link>
          <Link to="/programs">
            <MagneticButton variant="outline" size="lg">
              <Dumbbell className="w-4 h-4 mr-1" />
              Explore Programs
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
