import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";

// Common Layout & UI
import CustomCursor from "./components/common/CustomCursor";
import ScrollProgress from "./components/common/ScrollProgress";
import Navbar from "./components/layout/Navbar";
import FullscreenMenu from "./components/layout/FullscreenMenu";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/layout/PageTransition";
import AnimeParticleBurst from "./components/animations/AnimeParticleBurst";

// Modals & Tools
import FreeTrialModal from "./components/modals/FreeTrialModal";
import VideoModal from "./components/modals/VideoModal";
import ClassBookingModal from "./components/modals/ClassBookingModal";
import FitnessCalculatorModal from "./components/tools/FitnessCalculatorModal";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import Trainers from "./pages/Trainers";
import TrainerDetail from "./pages/TrainerDetail";
import Membership from "./pages/Membership";
import Facilities from "./pages/Facilities";
import Schedule from "./pages/Schedule";
import Transformations from "./pages/Transformations";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

export default function App() {
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  // Modals & Menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [bookingClass, setBookingClass] = useState(null);

  const handleBookClass = (classItem) => {
    setBookingClass(classItem);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#ECECEC] font-sans antialiased overflow-x-hidden selection:bg-[#E2FF00] selection:text-black">
      {/* Top scroll progress indicator */}
      <ScrollProgress />

      {/* Desktop magnetic custom cursor */}
      <CustomCursor />

      {/* Global Anime.js tactile shockwave & spark particle emitter */}
      <AnimeParticleBurst />

      {/* Sticky glassmorphic navbar */}
      <Navbar
        onOpenMenu={() => setMenuOpen(true)}
        onOpenTrial={() => setTrialOpen(true)}
        onOpenCalculator={() => setCalcOpen(true)}
      />

      {/* Fullscreen agency menu */}
      <FullscreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenTrial={() => setTrialOpen(true)}
      />

      {/* Page Routing */}
      <main className="flex-1 flex flex-col">
        <PageTransition>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenTrial={() => setTrialOpen(true)}
                  onOpenVideo={() => setVideoOpen(true)}
                  onBookClass={handleBookClass}
                />
              }
            />
            <Route path="/about" element={<About onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/programs" element={<Programs onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/programs/:id" element={<ProgramDetail onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/trainers" element={<Trainers onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/trainers/:id" element={<TrainerDetail onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/membership" element={<Membership onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/facilities" element={<Facilities onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/schedule" element={<Schedule onBookClass={handleBookClass} />} />
            <Route path="/transformations" element={<Transformations onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/contact" element={<Contact onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="/faq" element={<FAQ onOpenTrial={() => setTrialOpen(true)} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      {/* Footer */}
      <Footer onOpenTrial={() => setTrialOpen(true)} />

      {/* Global Interactive Modals */}
      <FreeTrialModal
        isOpen={trialOpen}
        onClose={() => setTrialOpen(false)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      <ClassBookingModal
        isOpen={!!bookingClass}
        selectedClass={bookingClass}
        onClose={() => setBookingClass(null)}
      />

      <FitnessCalculatorModal
        isOpen={calcOpen}
        onClose={() => setCalcOpen(false)}
      />
    </div>
  );
}
