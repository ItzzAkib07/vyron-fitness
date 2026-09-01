import React from "react";
import SEO from "../components/common/SEO";
import FAQSection from "../sections/home/FAQSection";

export default function FAQ({ onOpenTrial }) {
  return (
    <div className="pt-28 pb-20 bg-[#050505] text-white">
      <SEO
        title="Frequently Asked Questions — VYRON Fitness"
        description="Find answers to all questions regarding memberships, training programs, 7-day free trial, facilities, and personal training."
        canonical="https://vyronfitness.com/faq"
      />

      <FAQSection onOpenTrial={onOpenTrial} />
    </div>
  );
}
