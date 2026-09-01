import React from "react";
import SEO from "../components/common/SEO";
import HeroSection from "../sections/home/HeroSection";
import MarqueeSection from "../sections/home/MarqueeSection";
import AboutSection from "../sections/home/AboutSection";
import HorizontalPrograms from "../sections/home/HorizontalPrograms";
import FitnessJourneyTimeline from "../sections/home/FitnessJourneyTimeline";
import CinematicVideoSection from "../sections/home/CinematicVideoSection";
import TransformationsSection from "../sections/home/TransformationsSection";
import TrainersPreview from "../sections/home/TrainersPreview";
import FacilitiesPreview from "../sections/home/FacilitiesPreview";
import MembershipPreview from "../sections/home/MembershipPreview";
import ClassSchedulePreview from "../sections/home/ClassSchedulePreview";
import WhyChooseUs from "../sections/home/WhyChooseUs";
import TestimonialsSection from "../sections/home/TestimonialsSection";
import LocationSection from "../sections/home/LocationSection";
import FAQSection from "../sections/home/FAQSection";

export default function Home({ onOpenTrial, onOpenVideo, onBookClass }) {
  return (
    <>
      <SEO
        title="VYRON Fitness — Next-Gen 3D Athletic Club & Performance Tech"
        description="Experience VYRON Fitness. A high-performance luxury athletic club engineered with sports science, bio-metrics, master coaching, and elite training environments."
        canonical="https://vyronfitness.com/"
      />

      <HeroSection onOpenTrial={onOpenTrial} onOpenVideo={onOpenVideo} />
      <MarqueeSection />
      <AboutSection onOpenTrial={onOpenTrial} />
      <HorizontalPrograms />
      <FitnessJourneyTimeline />
      <CinematicVideoSection onOpenVideo={onOpenVideo} onOpenTrial={onOpenTrial} />
      <TransformationsSection onOpenTrial={onOpenTrial} />
      <TrainersPreview onOpenTrial={onOpenTrial} />
      <FacilitiesPreview onOpenTrial={onOpenTrial} />
      <MembershipPreview onOpenTrial={onOpenTrial} />
      <ClassSchedulePreview onBookClass={onBookClass} />
      <WhyChooseUs />
      <TestimonialsSection />
      <LocationSection onOpenTrial={onOpenTrial} />
      <FAQSection onOpenTrial={onOpenTrial} />
    </>
  );
}
