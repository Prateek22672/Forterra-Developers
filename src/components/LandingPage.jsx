"use client";
import ForterraHero from "./ForterraHero";
import InvestmentSection from "./InvestmentSection";
import RoadmapSection from "./RoadmapSection";
import ApplicationSection from "./ApplicationSection";
import ProjectsSection from "./ProjectsSection";
import BenefitsSection from "./BenefitsSection";
import PartnershipSection from "./PartnershipSection";
import FAQFooterSection from "./FAQFooterSection";

export default function LandingPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body { background: #F4F2EC; overflow-x: hidden; }
        ::selection { background: #C9A96E; color: #0E0E0E; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F4F2EC; }
        ::-webkit-scrollbar-thumb { background: #C9A96E; }
        img { max-width: 100%; display: block; }
        input, textarea, button { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: rgba(14,14,14,0.3); }
        section, footer { max-width: 100vw; }
        a, button { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* 1 — HERO */}
      <div id="home" style={{ padding: "10px 10px 0", background: "#F4F2EC" }}>
        <ForterraHero />
      </div>

      {/* 2 — INVESTMENT / OUR STORY */}
      <div id="about">
        <InvestmentSection />
      </div>

      {/* 3 — ROADMAP / PROCESS */}
      <div id="process">
        <RoadmapSection />
      </div>

      {/* 4 — APPLICATION / EB-5 PROGRAM */}
      <div id="investment">
        <ApplicationSection />
      </div>

      {/* 5 — PROJECTS */}
      {/* id="projects" is already set inside ProjectsSection */}
      <ProjectsSection />

      {/* 6 — BENEFITS */}
      <div id="benefits">
        <BenefitsSection />
      </div>

      {/* 7 — PARTNERSHIP */}
      <div id="partnership">
        <PartnershipSection />
      </div>

      {/* 8 — FAQ + FOOTER */}
      {/* id="faq" is already set inside FAQFooterSection */}
      <FAQFooterSection />
    </>
  );
}