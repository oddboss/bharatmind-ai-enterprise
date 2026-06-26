import React, { useEffect, useState } from "react";
import { ArrowRight, Play, Star, Sparkles } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface MarketingHeroProps {
  onWatchDemo: () => void;
  onExploreFeature: (featureName: string) => void;
}

export default function MarketingHero({ onWatchDemo, onExploreFeature }: MarketingHeroProps) {
  const [step, setStep] = useState(0);
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
  });

  // Rounded trust chips for Indian businesses
  const trustChips = [
    { name: "Claude AI", key: "claude" },
    { name: "Gemini", key: "gemini" },
    { name: "25 Indian Languages", key: "languages" },
    { name: "Tally", key: "tally" },
    { name: "GST Intelligence", key: "gst" },
    { name: "Shopify", key: "shopify" },
    { name: "Voice AI", key: "voice" },
    { name: "AI Agents", key: "agents" }
  ];

  useEffect(() => {
    if (!isInView) return;

    // Sequence stages of 100ms apart for perfect choreography
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < 6) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div 
      ref={ref}
      className={`flex flex-col justify-center text-left pt-24 lg:pt-32 pb-12 lg:pb-20 transition-all duration-[1000ms] ease-out transform ${
        isInView ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-8 blur-[2px]"
      }`}
    >
      {/* 1. Hero Badge Pill - Step 1 */}
      <div 
        className={`inline-flex mb-6 self-start transition-all duration-700 ease-out transform ${
          step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#114C5A]/40 border border-[#F7C844]/20 text-xs font-mono text-[#F7C844] font-medium shadow-inner transition-all duration-300 hover:border-[#F7C844]/50 hover:bg-[#114C5A]/60">
          <span className="flex items-center justify-center w-4 h-4 rounded-full overflow-hidden shadow-sm">
            🇮🇳
          </span>
          <span className="tracking-wide">INDIA'S AI BUSINESS OPERATING SYSTEM</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FF9933] animate-pulse" />
        </div>
      </div>

      {/* 2. Hero Headline - Step 2 */}
      <h1 
        className={`font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#F3F7F9] mb-6 transition-all duration-700 ease-out transform ${
          step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Run Your Entire <br className="hidden sm:inline" />
        Business with{" "}
        <span className="text-gradient-gold relative">
          One AI Copilot
        </span>
      </h1>

      {/* 3. Hero Description - Step 3 */}
      <p 
        className={`font-sans text-base sm:text-lg text-[#F3F7F9]/75 max-w-xl leading-relaxed mb-8 transition-all duration-700 ease-out transform ${
          step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Automate workflows, analyze finances, monitor competitors, generate executive reports and make faster business decisions using one unified AI platform tailored for Indian enterprises.
      </p>

      {/* 4. CTA Buttons - Step 4 */}
      <div 
        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 transition-all duration-700 ease-out transform ${
          step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <a
          href="#trial"
          className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F7C844] to-[#FF9933] text-[#172B36] font-sans font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#F7C844]/5 hover:shadow-[#F7C844]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          id="cta-hero-trial"
        >
          Start Free Trial
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </a>
        <button
          onClick={onWatchDemo}
          className="group inline-flex items-center justify-center gap-2 bg-white/[0.03] hover:bg-white/[0.08] text-[#F3F7F9] font-sans font-semibold text-base px-7 py-4 rounded-xl border border-white/10 hover:border-[#F7C844]/30 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-[#F7C844]/5"
          id="cta-hero-demo"
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#F7C844]/10 transition-colors duration-200">
            <Play className="w-3 h-3 fill-[#F3F7F9] text-[#F3F7F9] group-hover:text-[#F7C844] group-hover:fill-[#F7C844] group-hover:rotate-12 translate-x-[1px] transition-all duration-200" />
          </span>
          Watch Demo
        </button>
      </div>

      {/* 5. Social Proof / Trust Indicators - Step 5 */}
      <div 
        className={`flex flex-wrap items-center gap-4 pb-8 border-b border-white/5 mb-8 transition-all duration-700 ease-out transform ${
          step >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Avatar Stack */}
        <div className="flex -space-x-2.5">
          {[
            { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80", label: "Meera" },
            { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80", label: "Anand" },
            { img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&fit=crop&q=80", label: "Kabir" },
            { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&fit=crop&q=80", label: "Priya" }
          ].map((user, i) => (
            <img
              key={i}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#172B36] border border-white/10 shadow-md hover:scale-110 hover:-translate-y-0.5 hover:z-10 transition-all duration-200"
              src={user.img}
              alt={`${user.label} Profile`}
              referrerPolicy="no-referrer"
            />
          ))}
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#114C5A] ring-2 ring-[#172B36] border border-white/10 text-[10px] font-bold text-[#F7C844] shadow-md hover:scale-110 hover:-translate-y-0.5 hover:z-10 transition-all duration-200">
            +10k
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[#F7C844]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current text-[#F7C844] hover:scale-125 transition-transform" />
            ))}
          </div>
          <p className="font-sans text-xs text-[#F3F7F9]/70 leading-none mt-1">
            Trusted by <span className="text-[#F3F7F9] font-semibold">10,000+</span> Indian Businesses
          </p>
        </div>
      </div>

      {/* 6. Integrated Ecosystem Trust Chips - Step 6 */}
      <div 
        className={`transition-all duration-700 ease-out transform ${
          step >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="font-mono text-[10px] tracking-widest text-[#FF9933] font-bold mb-4 uppercase">
          INTEGRATIONS & CAPABILITIES
        </p>
        <div className="flex flex-wrap gap-2.5">
          {trustChips.map((chip, idx) => (
            <button
              key={chip.key}
              onClick={() => onExploreFeature(chip.name)}
              className="font-sans text-xs font-medium text-[#F3F7F9]/80 bg-[#152731] hover:bg-[#1D3543] border border-white/5 hover:border-[#F7C844]/30 hover:text-[#F7C844] px-3.5 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#F7C844]/5"
              id={`chip-${chip.key}`}
              style={{
                transitionDelay: `${idx * 20}ms`
              }}
            >
              {chip.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
