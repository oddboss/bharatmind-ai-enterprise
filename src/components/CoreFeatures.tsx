import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Mic, 
  Cpu, 
  BarChart3, 
  Globe, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  ChevronDown,
  ArrowRight,
  Database
} from "lucide-react";

// Feature structure
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  ctaText: string;
  icon: React.ComponentType<any>;
  accentColor: string;
  glowColor: string;
  gridClass: string; // Tailwind Grid layout classes for desktop
  illustrationType: "copilot" | "finance" | "gst" | "voice" | "agents" | "dashboard" | "market" | "workflow";
}

// Data Array matching the exact requested features
const FEATURES_DATA: FeatureItem[] = [
  {
    id: 0,
    title: "AI Copilot",
    description: "Bilingual business companion trained on localized commerce guidelines. Ingests PDFs, regional contracts, and receipts instantly.",
    metricLabel: "VERIFICATION PRECISION",
    metricValue: "99.8%",
    ctaText: "Launch Workspace",
    icon: Bot,
    accentColor: "#F7C844",
    glowColor: "rgba(247, 200, 68, 0.15)",
    gridClass: "col-span-12 md:col-span-8 lg:col-span-8 h-[280px]",
    illustrationType: "copilot"
  },
  {
    id: 1,
    title: "Finance Suite",
    description: "Autonomous local ledgers audit. Resolves pending mismatches and matches bank statements with 100% security compliance.",
    metricLabel: "FUNDS VERIFIED",
    metricValue: "₹14.2L+",
    ctaText: "Audit Ledgers",
    icon: TrendingUp,
    accentColor: "#FF9933",
    glowColor: "rgba(255, 153, 51, 0.15)",
    gridClass: "col-span-12 md:col-span-4 lg:col-span-4 h-[280px]",
    illustrationType: "finance"
  },
  {
    id: 2,
    title: "GST Intelligence",
    description: "Real-time compliance checks. Cross-checks GSTR-1 & 3B files with zero export risk. Predicts audit mismatch alerts.",
    metricLabel: "AUDIT ALERT SYSTEM",
    metricValue: "Tax-Shield",
    ctaText: "View Portal Link",
    icon: ShieldCheck,
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.15)",
    gridClass: "col-span-12 md:col-span-4 lg:col-span-4 h-[260px]",
    illustrationType: "gst"
  },
  {
    id: 3,
    title: "Voice AI",
    description: "Natural-cadence regional calling agents. Delivers automated payment reminders and order follow-ups in 4 languages.",
    metricLabel: "LANGUAGES SUPPORTED",
    metricValue: "4 Regional",
    ctaText: "Listen to Demos",
    icon: Mic,
    accentColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.15)",
    gridClass: "col-span-12 md:col-span-8 lg:col-span-8 h-[260px]",
    illustrationType: "voice"
  },
  {
    id: 4,
    title: "AI Agents",
    description: "Task-driven intelligent workers deployed to fulfill inventory updates, vendor chat sequences and delivery trackers.",
    metricLabel: "AUTOMATION METRIC",
    metricValue: "94 tasks/hr",
    ctaText: "Deploy Worker",
    icon: Cpu,
    accentColor: "#A7F3D0",
    glowColor: "rgba(167, 243, 208, 0.15)",
    gridClass: "col-span-12 md:col-span-8 lg:col-span-8 h-[280px]",
    illustrationType: "agents"
  },
  {
    id: 5,
    title: "Executive Dashboard",
    description: "Consolidated decision console presenting real-time business analytics, profit margins and cash cycles.",
    metricLabel: "SYNC LATENCY",
    metricValue: "25ms Live",
    ctaText: "Open Console",
    icon: BarChart3,
    accentColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.15)",
    gridClass: "col-span-12 md:col-span-4 lg:col-span-4 h-[280px]",
    illustrationType: "dashboard"
  },
  {
    id: 6,
    title: "Market Intelligence",
    description: "Scans local competitor pricing shifts within seconds. Feeds localized Basmati or edible oil rates straight into your plan.",
    metricLabel: "RADIUS RANGE SCAN",
    metricValue: "3km Kiranas",
    ctaText: "Scan Market",
    icon: Globe,
    accentColor: "#E37400",
    glowColor: "rgba(227, 116, 0, 0.15)",
    gridClass: "col-span-12 md:col-span-4 lg:col-span-4 h-[260px]",
    illustrationType: "market"
  },
  {
    id: 7,
    title: "Workflow Automation",
    description: "Seamless triggers connecting shop platforms and delivery fleets with zero friction or complex developer overhead.",
    metricLabel: "DISRUPTION INDEX",
    metricValue: "0.0% Delay",
    ctaText: "Configure Flows",
    icon: Zap,
    accentColor: "#0078D4",
    glowColor: "rgba(0, 120, 212, 0.15)",
    gridClass: "col-span-12 md:col-span-8 lg:col-span-8 h-[260px]",
    illustrationType: "workflow"
  }
];

// Mini Illustration Renderer for the Bento grid cards (adds unique premium SVG visuals per card)
const MiniIllustration = ({ type, accentColor }: { type: string, accentColor: string }) => {
  switch (type) {
    case "copilot":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <rect x="10" y="10" width="80" height="40" rx="8" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="50" cy="30" r="12" fill={`${accentColor}20`} stroke={accentColor} strokeWidth="2" />
          <line x1="30" y1="30" x2="38" y2="30" stroke={accentColor} strokeWidth="1.5" />
          <line x1="62" y1="30" x2="70" y2="30" stroke={accentColor} strokeWidth="1.5" />
        </svg>
      );
    case "finance":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <path d="M10 50 Q 30 20, 50 35 T 90 15" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="35" r="4" fill={accentColor} />
          <circle cx="90" cy="15" r="4" fill={accentColor} />
          <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" />
        </svg>
      );
    case "gst":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <rect x="25" y="10" width="50" height="40" rx="6" stroke={accentColor} strokeWidth="1.5" />
          <path d="M35 25 H 65 M35 35 H 55" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
          <path d="M60 40 L 70 50" stroke={accentColor} strokeWidth="2" />
        </svg>
      );
    case "voice":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <rect x="42" y="15" width="16" height="30" rx="8" stroke={accentColor} strokeWidth="2" />
          <path d="M30 30 C 30 42, 70 42, 70 30" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
          <line x1="50" y1="45" x2="50" y2="52" stroke={accentColor} strokeWidth="2" />
        </svg>
      );
    case "agents":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <rect x="20" y="15" width="60" height="30" rx="6" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" />
          <circle cx="35" cy="30" r="6" fill={`${accentColor}30`} stroke={accentColor} strokeWidth="1.5" />
          <circle cx="65" cy="30" r="6" fill={`${accentColor}30`} stroke={accentColor} strokeWidth="1.5" />
          <line x1="41" y1="30" x2="59" y2="30" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );
    case "dashboard":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <rect x="15" y="15" width="70" height="30" rx="4" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" />
          <line x1="30" y1="40" x2="30" y2="25" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="40" x2="50" y2="20" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="40" x2="70" y2="30" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "market":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <circle cx="50" cy="30" r="18" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" />
          <circle cx="50" cy="30" r="8" fill={`${accentColor}40`} stroke={accentColor} strokeWidth="1.5" />
          <line x1="50" y1="12" x2="50" y2="48" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
          <line x1="32" y1="30" x2="68" y2="30" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        </svg>
      );
    case "workflow":
      return (
        <svg className="w-24 h-16 opacity-30 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105" viewBox="0 0 100 60" fill="none">
          <path d="M30 15 L50 35 L70 15" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 35 L50 50 L70 35" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="3" fill={accentColor} />
        </svg>
      );
    default:
      return null;
  }
};

// Memoized Bento Card Component to avoid unnecessary re-renders of unrelated cards
const BentoCard = memo(({ 
  feature, 
  isActive, 
  onActivate 
}: { 
  feature: FeatureItem; 
  isActive: boolean; 
  onActivate: () => void;
}) => {
  const Icon = feature.icon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      onMouseEnter={onActivate}
      className={`relative group rounded-2xl p-6 bg-[#152731]/70 border overflow-hidden select-none cursor-pointer transition-all duration-300 flex flex-col justify-between ${
        feature.gridClass
      } ${
        isActive 
          ? "border-[#F7C844]/40 shadow-[0_12px_40px_-15px_rgba(247,200,68,0.15)] -translate-y-1 scale-[1.01]" 
          : "border-white/5 hover:border-white/10 hover:-translate-y-0.5"
      }`}
      style={{
        outline: "none"
      }}
    >
      {/* Back glow overlay on active */}
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[80px] pointer-events-none transition-opacity duration-300"
        style={{ 
          backgroundColor: feature.glowColor,
          opacity: isActive ? 1 : 0.2
        }}
      />

      {/* Top Details bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                color: feature.accentColor
              }}
            >
              <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
            </div>
            
            <div>
              <h3 className="font-sans text-sm font-extrabold text-[#F3F7F9] group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <span className="font-mono text-[8px] text-[#F3F7F9]/30 tracking-widest uppercase font-bold">
                CORE MODULE
              </span>
            </div>
          </div>

          {/* Metric block */}
          <div className="text-right">
            <span className="font-sans text-[8px] text-[#F3F7F9]/40 block uppercase tracking-wider font-semibold">
              {feature.metricLabel}
            </span>
            <span 
              className="font-mono text-xs font-extrabold block leading-none mt-0.5"
              style={{ color: feature.accentColor }}
            >
              {feature.metricValue}
            </span>
          </div>
        </div>

        {/* Feature short description */}
        <p className="font-sans text-xs text-[#F3F7F9]/70 leading-relaxed max-w-md">
          {feature.description}
        </p>
      </div>

      {/* Bottom Area: illustration & mini interactive CTA link */}
      <div className="flex items-end justify-between mt-4">
        <div 
          className="font-sans text-xs font-semibold flex items-center gap-1.5 transition-all duration-300"
          style={{
            color: isActive ? feature.accentColor : "rgba(243, 247, 249, 0.6)"
          }}
        >
          <span>{feature.ctaText}</span>
          <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-0.5"}`} />
        </div>

        <div className="hidden sm:block">
          <MiniIllustration type={feature.illustrationType} accentColor={feature.accentColor} />
        </div>
      </div>
    </div>
  );
});

BentoCard.displayName = "BentoCard";

// Accordion Panel component for Mobile screen sizes (inherits the same active Index - CONTEXT LOCK)
const AccordionPanel = memo(({ 
  feature, 
  isOpen, 
  onToggle 
}: { 
  feature: FeatureItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  const Icon = feature.icon;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`border rounded-2xl bg-[#152731]/50 overflow-hidden transition-all duration-300 select-none ${
        isOpen ? "border-[#F7C844]/35 bg-[#152731]/80" : "border-white/5"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${feature.id}`}
        id={`accordion-btn-${feature.id}`}
        className="w-full flex items-center justify-between p-4 focus:outline-none focus:ring-1 focus:ring-[#F7C844]/40"
      >
        <div className="flex items-center gap-3 text-left">
          <div 
            className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center"
            style={{ color: feature.accentColor }}
          >
            <Icon className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold text-[#F3F7F9]">
              {feature.title}
            </h4>
            <span className="font-mono text-[8px] text-[#F3F7F9]/30 tracking-wider">
              {feature.metricLabel}: {feature.metricValue}
            </span>
          </div>
        </div>

        <div 
          className="transition-transform duration-300"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
          }}
        >
          <ChevronDown className="w-4 h-4 text-[#F3F7F9]/40" />
        </div>
      </button>

      {/* Accordion smooth expansion panel */}
      <div
        id={`accordion-content-${feature.id}`}
        role="region"
        aria-labelledby={`accordion-btn-${feature.id}`}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 180}px` : "0px",
          opacity: isOpen ? 1 : 0
        }}
      >
        <div ref={contentRef} className="p-4 pt-0 border-t border-white/5 bg-[#172B36]/30">
          <p className="font-sans text-xs text-[#F3F7F9]/70 leading-relaxed mb-4 mt-3">
            {feature.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              • INTEGRATION SYNCED
            </span>

            <button className="font-sans text-xs font-bold flex items-center gap-1.5" style={{ color: feature.accentColor }}>
              <span>{feature.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

AccordionPanel.displayName = "AccordionPanel";

export default function CoreFeatures() {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true
  });

  // State context active index representing selected Bento card or Accordion panel
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Monitor keyboard layout arrow keys navigation across cards
  const containerRef = useRef<HTMLDivElement>(null);

  const handleArrowKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % FEATURES_DATA.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + FEATURES_DATA.length) % FEATURES_DATA.length);
    }
  };

  return (
    <section
      ref={ref}
      id="core-features-section"
      onKeyDown={handleArrowKeys}
      className={`relative w-full py-24 bg-[#172B36] border-t border-white/5 overflow-hidden transition-all duration-[1000ms] ease-out transform ${
        isIntersecting 
          ? "opacity-100 translate-y-0 filter-none" 
          : "opacity-0 translate-y-12 blur-[4px]"
      }`}
      aria-label="BharatMind Core Features Suite"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[60vw] h-[60vw] max-w-[800px] bg-[#114C5A]/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Title Grid Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#152731] border border-white/5 rounded-full text-[10px] font-mono text-[#F7C844] font-bold tracking-wider uppercase shadow-md mb-4">
              <Sparkles className="w-3 h-3 text-[#FF9933] animate-pulse" />
              Comprehensive AI capabilities
            </div>
            
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#F3F7F9] tracking-tight">
              One platform. <span className="gradient-text from-[#F7C844] to-[#FF9933]">Unlimited scale.</span>
            </h2>
            
            <p className="font-sans text-sm text-[#F3F7F9]/60 leading-relaxed mt-2">
              Our secure operational engines run inside your workflows to eliminate double entries, manual reconciliations, and costly delays.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#F3F7F9]/30">ACTIVE ENGINE ID:</span>
            <span className="font-mono text-[10px] text-[#F7C844] bg-[#114C5A]/40 border border-[#F7C844]/20 px-2 py-0.5 rounded font-bold">
              MOD-0{activeIndex + 1}
            </span>
          </div>
        </div>

        {/* Responsive Content Arenas with Context Lock */}
        
        {/* 1. DESKTOP/TABLET VIEW: Premium Bento Grid (Hidden on Mobile screens < md) */}
        <div 
          ref={containerRef}
          className="hidden md:grid grid-cols-12 gap-6 relative"
          style={{ zIndex: 10 }}
        >
          {FEATURES_DATA.map((feature) => (
            <BentoCard
              key={feature.id}
              feature={feature}
              isActive={activeIndex === feature.id}
              onActivate={() => setActiveIndex(feature.id)}
            />
          ))}
        </div>

        {/* 2. MOBILE VIEW: Touch-Friendly Accordion (Hidden on Desktop/Tablet screens >= md) */}
        <div className="block md:hidden space-y-4">
          {FEATURES_DATA.map((feature) => (
            <AccordionPanel
              key={feature.id}
              feature={feature}
              isOpen={activeIndex === feature.id}
              onToggle={() => setActiveIndex(feature.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
