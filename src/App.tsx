import React, { useState, useEffect, useRef } from "react";
import BackgroundEffects from "./components/BackgroundEffects";
import Navbar from "./components/Navbar";
import MarketingHero from "./components/MarketingHero";
import DashboardPreview from "./components/DashboardPreview";
import WatchDemoModal from "./components/WatchDemoModal";
import IntegrationStory from "./components/IntegrationStory";
import CoreFeatures from "./components/CoreFeatures";
import BusinessOutcomes from "./components/BusinessOutcomes";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import { Sparkles, Shield, ArrowRight, Zap } from "lucide-react";

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoTriggerCount, setDemoTriggerCount] = useState(0);
  const [highlightedChip, setHighlightedChip] = useState("");
  
  // Intersection Observer Reveal States
  const [badgeSectionInView, setBadgeSectionInView] = useState(false);
  const badgeSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check reduced motion to skip animations if requested
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setBadgeSectionInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBadgeSectionInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (badgeSectionRef.current) {
      observer.observe(badgeSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleWatchDemo = () => {
    setIsDemoOpen(true);
  };

  const handleTriggerDashboardDemo = () => {
    setDemoTriggerCount(prev => prev + 1);
  };

  const handleExploreFeature = (featureName: string) => {
    setHighlightedChip(featureName);
    // Auto-scroll to the dashboard view so the user immediately notices the AI reasoning update!
    const dashboardElement = document.getElementById("dashboard-container");
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#172B36] text-[#F3F7F9] font-sans antialiased overflow-x-hidden selection:bg-[#F7C844] selection:text-[#172B36]">
      {/* Premium Background Effects & Mesh Gradients */}
      <BackgroundEffects />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Two-Column Hero Grid Section */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0 min-h-screen flex items-center">
        <section 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full py-12 lg:py-24"
          aria-label="BharatMind AI Enterprise Overview"
        >
          {/* Left Column: Premium Marketing Content */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <MarketingHero 
              onWatchDemo={handleWatchDemo}
              onExploreFeature={handleExploreFeature}
            />
          </div>

          {/* Right Column: Live Interactive Executive Dashboard with Page Load scale-in sequence */}
          <div className="lg:col-span-7 w-full flex items-center justify-center">
            <div className="w-full relative animate-float transition-all duration-1000 delay-[500ms] entrance-scale-in">
              {/* Premium Top Glow Badge over Dashboard */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 transition-transform hover:scale-105">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#152731] border border-[#F7C844]/30 rounded-full text-[10px] font-mono text-[#F7C844] font-semibold tracking-wider uppercase shadow-md hover:border-[#F7C844]/50">
                  <Zap className="w-3 h-3 text-[#FF9933] animate-pulse" />
                  Live System Sandbox
                </div>
              </div>

              {/* Real-time Interactive Dashboard Console component */}
              <DashboardPreview 
                demoTriggerCount={demoTriggerCount}
                highlightedChip={highlightedChip}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Trust Badging Section - Under the Hero with Intersection Observer reveal */}
      <section 
        ref={badgeSectionRef}
        className={`border-t border-white/5 bg-[#152731]/30 py-12 relative overflow-hidden transition-all duration-[600ms] ease-out transform ${
          badgeSectionInView 
            ? "opacity-100 translate-y-0 filter-none" 
            : "opacity-0 translate-y-8 blur-[4px]"
        }`}
        aria-label="System Certifications"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            <div className="flex items-center gap-4 border-r border-white/5 last:border-0 md:pr-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#114C5A]/50 flex items-center justify-center text-[#F7C844] shrink-0 border border-white/5 group-hover:border-[#F7C844]/30 transition-all duration-300 group-hover:scale-110">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-[#F3F7F9] group-hover:text-white transition-colors">
                  Enterprise-Grade Security
                </h4>
                <p className="font-sans text-xs text-[#F3F7F9]/50 leading-relaxed mt-0.5">
                  Private localized LLM models ensure your private financial ledgers are never trained on publicly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-r border-white/5 last:border-0 md:pr-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#114C5A]/50 flex items-center justify-center text-[#F7C844] shrink-0 border border-white/5 group-hover:border-[#F7C844]/30 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-[#F3F7F9] group-hover:text-white transition-colors">
                  GST & Tally Integration
                </h4>
                <p className="font-sans text-xs text-[#F3F7F9]/50 leading-relaxed mt-0.5">
                  Deep technical hooks to verify ledger mismatches, prevent penalty warnings, and optimize tax cashflow.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 last:border-0 group">
              <div className="w-10 h-10 rounded-xl bg-[#114C5A]/50 flex items-center justify-center text-[#F7C844] shrink-0 border border-white/5 group-hover:border-[#F7C844]/30 transition-all duration-300 group-hover:scale-110">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-[#F3F7F9] group-hover:text-white transition-colors">
                  Autonomous Agent Workflows
                </h4>
                <p className="font-sans text-xs text-[#F3F7F9]/50 leading-relaxed mt-0.5">
                  Execute background check reconciliations, generate custom billing spreadsheets, and optimize retail prices.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Integration Compatibility Story: Works with the tools Indian businesses already trust */}
      <IntegrationStory />

      {/* Core Features Suite: Bento Grid with Context Lock & Responsive Accordion */}
      <CoreFeatures />

      {/* Business Outcomes & Industry Case Studies Section */}
      <BusinessOutcomes />

      {/* Premium Pricing Matrix Section */}
      <PricingSection />

      {/* Premium FAQ Section */}
      <FAQSection />

      {/* Cinematic Final CTA Section */}
      <FinalCTA />

      {/* Watch Demo Tour Walkthrough Modal */}
      <WatchDemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)}
        onTriggerDashboardDemo={handleTriggerDashboardDemo}
      />
    </div>
  );
}
