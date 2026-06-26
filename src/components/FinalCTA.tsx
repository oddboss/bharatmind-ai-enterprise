import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Heart, 
  Activity, 
  Globe2, 
  LineChart, 
  BadgeCheck 
} from "lucide-react";

interface TrustMetric {
  id: number;
  value: string;
  targetVal: number;
  suffix: string;
  label: string;
}

const TRUST_METRICS: TrustMetric[] = [
  { id: 1, value: "24/7", targetVal: 24, suffix: "/7", label: "AI Business Intelligence" },
  { id: 2, value: "25+", targetVal: 25, suffix: "+", label: "Regional Languages" },
  { id: 3, value: "6.3 Cr+", targetVal: 6.3, suffix: " Cr+", label: "SMBs Supported" },
  { id: 4, value: "99.9%", targetVal: 99.9, suffix: "%", label: "Enterprise Security" }
];

// Floating badge elements around the main block
const FLOATING_BADGES = [
  { text: "✓ GST Connected", top: "12%", left: "8%", delay: "0s" },
  { text: "Voice AI Ready", top: "22%", right: "10%", delay: "0.5s" },
  { text: "Revenue Increased", bottom: "35%", left: "6%", delay: "1s" },
  { text: "AI Agent Running", bottom: "25%", right: "8%", delay: "1.5s" },
  { text: "Insights Generated", top: "45%", right: "5%", delay: "2s" },
  { text: "Business Healthy", bottom: "12%", left: "12%", delay: "2.5s" }
];

export default function FinalCTA() {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true
  });

  // State representing metric count-up
  const [animateMetrics, setAnimateMetrics] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  // Mouse spotlight coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Monitor mouse spotlight
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Trigger metrics animation on scroll visibility
  useEffect(() => {
    if (isIntersecting) {
      setAnimateMetrics(true);
      const duration = 1500;
      const startTime = performance.now();

      const runCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeVal = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const nextCounts = TRUST_METRICS.map(m => {
          const val = m.targetVal * easeVal;
          return m.targetVal % 1 !== 0 ? parseFloat(val.toFixed(1)) : Math.floor(val);
        });

        setCounts(nextCounts);

        if (progress < 1) {
          requestAnimationFrame(runCount);
        } else {
          setCounts(TRUST_METRICS.map(m => m.targetVal));
        }
      };

      requestAnimationFrame(runCount);
    }
  }, [isIntersecting]);

  return (
    <section
      ref={ref}
      id="final-cta-section"
      onMouseMove={handleMouseMove}
      className={`relative w-full min-h-[100vh] py-24 bg-[#13232C] border-t border-white/5 flex flex-col justify-center items-center overflow-hidden transition-all duration-[1200ms] ease-out select-none ${
        isIntersecting ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      aria-label="BharatMind Cinematic Enterprise Call To Action"
    >
      {/* Cinematic Aurora Mesh Gradients */}
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
      <div className="absolute -top-1/4 left-1/4 w-[80vw] h-[80vw] max-w-[800px] bg-[#114C5A]/20 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-1/4 right-1/4 w-[70vw] h-[70vw] max-w-[700px] bg-[#FF9933]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Mouse dynamic spotlight pointer tracker */}
      <div 
        className="absolute w-[450px] h-[450px] bg-[#F7C844]/5 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      {/* FLOATING SYSTEM ELEMENTS (Desktop and Tablet sizes) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {FLOATING_BADGES.map((badge, index) => (
          <div
            key={index}
            className="absolute px-3 py-1.5 bg-[#152731]/80 border border-white/5 rounded-full text-[10px] font-mono text-[#F3F7F9]/80 shadow-lg float-slow"
            style={{
              top: badge.top,
              left: badge.left,
              right: badge.right,
              animationDelay: badge.delay,
              willChange: "transform"
            }}
          >
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F7C844] animate-ping" />
              {badge.text}
            </span>
          </div>
        ))}
      </div>

      {/* TWO FLOATING GLASS PANELS (Desktop Side panels) */}
      <div className="absolute left-[8%] top-1/3 hidden lg:block w-52 p-4 bg-[#152731]/60 border border-white/5 rounded-2xl shadow-xl backdrop-blur-md transform hover:rotate-1 hover:scale-105 transition-all duration-300 pointer-events-auto">
        <div className="flex items-center gap-2 mb-2">
          <BadgeCheck className="w-4 h-4 text-[#F7C844]" />
          <span className="font-mono text-[9px] text-[#F7C844] uppercase tracking-widest font-extrabold">
            Recommendation
          </span>
        </div>
        <p className="font-sans text-[11px] text-[#F3F7F9]/80 leading-relaxed font-semibold">
          Reduce operational data pipeline costs by 18% with continuous Tally syncs.
        </p>
      </div>

      <div className="absolute right-[8%] bottom-1/3 hidden lg:block w-48 p-4 bg-[#152731]/60 border border-white/5 rounded-2xl shadow-xl backdrop-blur-md transform hover:-rotate-1 hover:scale-105 transition-all duration-300 pointer-events-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] text-[#FF9933] uppercase tracking-widest font-extrabold">
            Business Health
          </span>
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-extrabold text-white">98</span>
          <span className="font-sans text-xs text-white/45">/ 100</span>
        </div>
        <p className="font-sans text-[10px] text-[#F3F7F9]/50 mt-1">
          Optimization Score Stable
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#152731]/80 border border-white/5 rounded-full text-[10px] font-mono text-white/80 font-bold tracking-wider uppercase shadow-xl backdrop-blur-sm mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#F7C844]" />
          <span>✨ BharatMind AI | The Future of Business Intelligence</span>
        </div>

        {/* Cinematic Headline */}
        <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-3xl">
          One AI Operating System. <br />
          <span className="gradient-text from-[#F7C844] via-[#FF9933] to-[#E37400]">
            Every Business Decision.
          </span>
        </h2>

        {/* Cinematic Subtitle */}
        <p className="font-sans text-sm sm:text-base text-[#F3F7F9]/70 leading-relaxed max-w-xl mt-6">
          Join thousands of modern enterprises transforming bookkeeping, compliance, automated reporting, and strategic growth with one secure offline-first agent platform.
        </p>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto relative z-10">
          <button 
            onClick={() => {
              const pricingSection = document.getElementById("pricing-story-section");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full sm:w-auto py-4 px-8 rounded-xl font-sans text-xs font-bold tracking-wider text-[#172B36] bg-[#F7C844] hover:bg-[#FF9933] shadow-lg shadow-[#F7C844]/15 hover:shadow-[#FF9933]/25 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer transition-all duration-300"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button 
            onClick={() => {
              const pricingSection = document.getElementById("pricing-story-section");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full sm:w-auto py-4 px-8 rounded-xl font-sans text-xs font-bold tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            Book a Live Demo
          </button>
        </div>

        {/* Elegant Trust Metrics Block (Counting up) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-20 w-full max-w-3xl">
          {TRUST_METRICS.map((metric, idx) => (
            <div 
              key={metric.id}
              className="relative rounded-2xl p-4 bg-white/[0.02] border border-white/5 backdrop-blur-sm select-none hover:border-[#F7C844]/20 transition-all duration-300"
            >
              <span className="font-mono text-[8px] text-[#F3F7F9]/30 tracking-widest block uppercase font-bold">
                SYSTEM VERIFICATION
              </span>
              <div className="font-mono text-xl sm:text-2xl font-extrabold text-[#F7C844] mt-1">
                {animateMetrics ? counts[idx] : 0}
                <span className="font-sans text-sm text-white/50">{metric.suffix}</span>
              </div>
              <p className="font-sans text-[10px] text-[#F3F7F9]/60 mt-1 leading-normal">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Minor visual anchor line leading to the clean footer */}
        <div className="w-px h-16 bg-gradient-to-b from-[#F7C844]/25 to-transparent mt-16 opacity-50" />

      </div>
    </section>
  );
}
