import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Package, 
  HeartPulse, 
  GraduationCap, 
  LineChart, 
  Utensils, 
  Truck, 
  ShoppingBag,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  ArrowRightLeft,
  Clock
} from "lucide-react";

// Metric Card Interface
interface MetricItem {
  id: number;
  value: string;
  targetNum: number;
  prefix: string;
  suffix: string;
  label: string;
  color: string;
  glow: string;
  chartPath: string;
}

const METRICS_DATA: MetricItem[] = [
  {
    id: 1,
    value: "72%",
    targetNum: 72,
    prefix: "",
    suffix: "%",
    label: "Less Manual Work",
    color: "#F7C844",
    glow: "rgba(247, 200, 68, 0.15)",
    chartPath: "M0,30 Q20,10 40,25 T80,5 T120,18"
  },
  {
    id: 2,
    value: "4×",
    targetNum: 4,
    prefix: "",
    suffix: "×",
    label: "Faster Decision Making",
    color: "#FF9933",
    glow: "rgba(255, 153, 51, 0.15)",
    chartPath: "M0,25 Q30,5 60,20 T120,2"
  },
  {
    id: 3,
    value: "₹18L+",
    targetNum: 18,
    prefix: "₹",
    suffix: "L+",
    label: "Average Annual Savings",
    color: "#10B981",
    glow: "rgba(16, 185, 129, 0.15)",
    chartPath: "M0,35 Q20,20 50,28 T100,8 T120,1"
  },
  {
    id: 4,
    value: "98%",
    targetNum: 98,
    prefix: "",
    suffix: "%",
    label: "AI Accuracy",
    color: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.15)",
    chartPath: "M0,20 Q40,15 80,18 T120,4"
  },
  {
    id: 5,
    value: "24/7",
    targetNum: 24,
    prefix: "",
    suffix: "/7",
    label: "Business Monitoring",
    color: "#A7F3D0",
    glow: "rgba(167, 243, 208, 0.15)",
    chartPath: "M0,30 L30,30 L45,10 L60,45 L75,15 L90,30 L120,30"
  },
  {
    id: 6,
    value: "6.3 Cr+",
    targetNum: 6.3,
    prefix: "",
    suffix: " Cr+",
    label: "SMBs Addressable",
    color: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.15)",
    chartPath: "M0,40 Q40,20 80,30 T120,8"
  }
];

// Industry Success Story Interface
interface CaseStudyItem {
  id: string;
  industry: string;
  icon: React.ComponentType<any>;
  problem: string;
  solution: string;
  outcome: string;
  badge: string;
  metricLabel: string;
  metricValue: string;
  metricChange: string;
  accent: string;
  glow: string;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "retail",
    industry: "Retail & Kiranas",
    icon: ShoppingBag,
    problem: "Blinkit competitor pricing shifts caused rapid customer churn and basket value decay.",
    solution: "Autonomous localized competitor scans trigger real-time, high-margin dynamic prices.",
    outcome: "Dynamic Pricing increased basmati & oil basket margins by 14.2% within 30 days.",
    badge: "Operational ROI",
    metricLabel: "Basket Size Value",
    metricValue: "+24.8%",
    metricChange: "30-day run",
    accent: "#F7C844",
    glow: "rgba(247, 200, 68, 0.12)"
  },
  {
    id: "mfg",
    industry: "Manufacturing",
    icon: Package,
    problem: "Unpredictable delivery bottlenecks led to massive inventory backup and cash flow lockup.",
    solution: "AI-driven predictive demand modeling synced instantly with local Tally prime logs.",
    outcome: "Reconciled ledger forecast accuracy cut inventory storage waste by ₹12L annually.",
    badge: "Capital Efficiency",
    metricLabel: "Inventory Waste",
    metricValue: "-31.4%",
    metricChange: "Reduced Costs",
    accent: "#FF9933",
    glow: "rgba(255, 153, 51, 0.12)"
  },
  {
    id: "healthcare",
    industry: "Healthcare & Labs",
    icon: HeartPulse,
    problem: "Patient appointment followups and feedback calls overwhelmed front-desk staff.",
    solution: "Vernacular voice agents with natural regional voice cadences deployed for reminders.",
    outcome: "Automated callbacks achieved 94.2% reach, saving clinics 45+ operational hours weekly.",
    badge: "Staff Leverage",
    metricLabel: "No-Show Reduction",
    metricValue: "68.0%",
    metricChange: "Show-up Rate",
    accent: "#10B981",
    glow: "rgba(16, 185, 129, 0.12)"
  },
  {
    id: "education",
    industry: "Education Services",
    icon: GraduationCap,
    problem: "Processing thousands of parent admission queries led to long response delays.",
    solution: "Context-aware bilingual AI Copilot handled multi-channel parent support flows instantly.",
    outcome: "Support query response speed fell from 4 hours to 8 seconds with 96% parent rating.",
    badge: "Inquiry Velocity",
    metricLabel: "Bilingual Res. Rate",
    metricValue: "98.2%",
    metricChange: "Bilingual Response",
    accent: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.12)"
  },
  {
    id: "finance",
    industry: "Finance & Audits",
    icon: LineChart,
    problem: "Double entries and offline ledger mismatches risked compliance audits annually.",
    solution: "Continuous secure backend ledger reconciliation synced with active GST frameworks.",
    outcome: "Reconciliation mismatches resolved automatically with zero secure data cloud export.",
    badge: "Tax Security",
    metricLabel: "Reconciliation Error",
    metricValue: "0.0%",
    metricChange: "Audit Shield",
    accent: "#A7F3D0",
    glow: "rgba(167, 243, 208, 0.12)"
  },
  {
    id: "hospitality",
    industry: "Hospitality & Food",
    icon: Utensils,
    problem: "Procurement price volatility cut restaurant margins on key ingredients.",
    solution: "Autonomous marketplace vendor bidding bot secured ideal wholesale rates.",
    outcome: "Automated ingredient vendor negotiations cut raw material costs by 18.5%.",
    badge: "Purchase Optim.",
    metricLabel: "Ingredient Cost",
    metricValue: "-18.5%",
    metricChange: "Direct Savings",
    accent: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.12)"
  },
  {
    id: "logistics",
    industry: "Logistics & Fleet",
    icon: Truck,
    problem: "Inefficient last-mile routes led to delayed deliveries and fuel waste.",
    solution: "Live AI-assisted route optimizer auto-dispatched dynamic directions to WhatsApp.",
    outcome: "Delivery delays fell from 18% to 2.1% across major regional logistics corridors.",
    badge: "Route Logistics",
    metricLabel: "On-Time Dispatch",
    metricValue: "97.9%",
    metricChange: "Zero Friction",
    accent: "#E37400",
    glow: "rgba(227, 116, 0, 0.12)"
  }
];

// Memoized Individual Metric Card with native incremental count-up effect on enter
const MetricCard = memo(({ 
  metric, 
  startAnimate 
}: { 
  metric: MetricItem; 
  startAnimate: boolean;
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!startAnimate) return;

    // Skip animated count-up if prefers-reduced-motion is requested
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(metric.targetNum);
      return;
    }

    const duration = 1200; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out curve for premium feel
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * metric.targetNum;

      // Handle float decimal if target is decimal (e.g., 6.3)
      if (metric.targetNum % 1 !== 0) {
        setCount(parseFloat(currentVal.toFixed(1)));
      } else {
        setCount(Math.floor(currentVal));
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(metric.targetNum);
      }
    };

    requestAnimationFrame(step);
  }, [startAnimate, metric.targetNum]);

  return (
    <div
      className="relative rounded-2xl p-5 bg-[#152731]/70 border border-white/5 select-none hover:border-white/12 transition-all duration-300 group flex items-center justify-between overflow-hidden hover:-translate-y-1"
      style={{
        willChange: "transform, border-color"
      }}
    >
      {/* Soft back blur element */}
      <div 
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-[40px] pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundColor: metric.glow }}
      />

      <div className="flex-1">
        <span className="font-mono text-[8px] text-[#F3F7F9]/30 tracking-widest block uppercase font-bold">
          VERIFIED METRIC 0{metric.id}
        </span>
        
        {/* Value text block */}
        <div className="flex items-baseline gap-0.5 mt-1.5">
          {metric.prefix && (
            <span className="font-sans text-lg font-bold text-white/50">{metric.prefix}</span>
          )}
          <span 
            className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight leading-none"
            style={{ color: metric.color }}
          >
            {count}
          </span>
          {metric.suffix && (
            <span className="font-sans text-sm font-bold text-white/70 ml-0.5">{metric.suffix}</span>
          )}
        </div>

        <p className="font-sans text-xs text-[#F3F7F9]/75 mt-2 font-medium">
          {metric.label}
        </p>
      </div>

      {/* Tiny inline custom trend sparkline graph */}
      <div className="w-20 h-10 shrink-0 relative opacity-40 group-hover:opacity-85 transition-opacity duration-300">
        <svg className="w-full h-full" viewBox="0 0 120 40">
          <path
            d={metric.chartPath}
            fill="none"
            stroke={metric.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="140"
            strokeDashoffset={startAnimate ? "0" : "140"}
            className="transition-all duration-1000 ease-out"
            style={{ transitionDelay: `${metric.id * 100}ms` }}
          />
        </svg>
      </div>
    </div>
  );
});

MetricCard.displayName = "MetricCard";

// Success Industry Carousel case study card
const CaseStudyCard = memo(({
  study,
  isActive,
  onActivate
}: {
  study: CaseStudyItem;
  isActive: boolean;
  onActivate: () => void;
}) => {
  const Icon = study.icon;

  return (
    <div
      onClick={onActivate}
      className={`relative rounded-3xl p-6 bg-[#152731]/70 border overflow-hidden select-none cursor-pointer transition-all duration-300 flex flex-col justify-between ${
        isActive 
          ? "border-[#F7C844]/40 bg-[#17303B]/85 shadow-[0_15px_35px_-12px_rgba(247,200,68,0.12)] scale-[1.01]" 
          : "border-white/5 hover:border-white/10 hover:translate-x-1"
      }`}
    >
      {/* Background glow overlay */}
      <div 
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-[60px] pointer-events-none transition-opacity duration-300"
        style={{ 
          backgroundColor: study.glow,
          opacity: isActive ? 1 : 0.2
        }}
      />

      {/* Top sector */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-transform duration-300"
              style={{ color: study.accent }}
            >
              <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="font-sans text-xs font-extrabold text-[#F3F7F9]">
                {study.industry}
              </h4>
              <span className="font-mono text-[8px] text-[#F3F7F9]/30 tracking-widest block uppercase font-bold leading-none mt-0.5">
                REAL BUSINESS STORY
              </span>
            </div>
          </div>

          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[8px] font-mono font-extrabold uppercase rounded-full tracking-wider ${
            isActive 
              ? "bg-[#F7C844] text-[#172B36] shadow-sm shadow-[#F7C844]/20" 
              : "bg-white/5 text-[#F3F7F9]/40 border border-white/5"
          }`}>
            {study.badge}
          </span>
        </div>

        {/* Narrative flow mapping: Problem -> AI Solution -> Outcome */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex gap-2 group/step">
            <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 text-rose-400 mt-0.5">
              <ShieldAlert className="w-3 h-3" />
            </div>
            <div>
              <span className="font-mono text-[8px] text-rose-400/70 uppercase tracking-widest block font-bold leading-none mb-1">
                CHALLENGE / PROBLEM
              </span>
              <p className="font-sans text-[11px] text-[#F3F7F9]/75 leading-relaxed">
                {study.problem}
              </p>
            </div>
          </div>

          <div className="flex gap-2 group/step">
            <div className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 text-sky-400 mt-0.5">
              <ArrowRightLeft className="w-3 h-3" />
            </div>
            <div>
              <span className="font-mono text-[8px] text-sky-400/70 uppercase tracking-widest block font-bold leading-none mb-1">
                AI COGNITIVE SOLUTION
              </span>
              <p className="font-sans text-[11px] text-[#F3F7F9]/75 leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          <div className="flex gap-2 group/step">
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-mono text-[8px] text-emerald-400/70 uppercase tracking-widest block font-bold leading-none mb-1">
                MEASURED BUSINESS OUTCOME
              </span>
              <p className="font-sans text-[11px] text-[#F3F7F9]/75 leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic bottom outcome analytics bar */}
      <div 
        className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between transition-colors duration-300"
        style={{
          color: isActive ? study.accent : "rgba(243, 247, 249, 0.4)"
        }}
      >
        <div>
          <span className="font-sans text-[8px] text-[#F3F7F9]/30 block uppercase tracking-wider font-semibold">
            {study.metricLabel}
          </span>
          <span className="font-mono text-sm font-extrabold block leading-none mt-0.5">
            {study.metricValue}
          </span>
        </div>

        <span className="font-mono text-[9px] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded-full">
          {study.metricChange}
        </span>
      </div>

    </div>
  );
});

CaseStudyCard.displayName = "CaseStudyCard";

export default function BusinessOutcomes() {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true
  });

  const [activeStudyId, setActiveStudyId] = useState<string>("retail");

  // Filter to active selection
  const activeStudy = useMemo(() => {
    return CASE_STUDIES.find(item => item.id === activeStudyId) || CASE_STUDIES[0];
  }, [activeStudyId]);

  return (
    <section
      ref={ref}
      id="business-outcomes-section"
      className={`relative w-full py-24 bg-[#172B36] border-t border-white/5 overflow-hidden transition-all duration-[1000ms] ease-out transform ${
        isIntersecting 
          ? "opacity-100 translate-y-0 filter-none" 
          : "opacity-0 translate-y-12 blur-[4px]"
      }`}
      aria-label="BharatMind Business Outcomes & Industry Case Studies"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] bg-[#114C5A]/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Centered Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#152731] border border-white/5 rounded-full text-[10px] font-mono text-[#F7C844] font-bold tracking-wider uppercase shadow-md mb-4">
            <Activity className="w-3 h-3 text-[#FF9933] animate-pulse" />
            Verified Case Studies
          </div>
          
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#F3F7F9] tracking-tight">
            Real Business Outcomes. <span className="gradient-text from-[#F7C844] to-[#FF9933]">Not Just AI Features.</span>
          </h2>
          
          <p className="font-sans text-sm text-[#F3F7F9]/60 leading-relaxed mt-4 max-w-xl mx-auto">
            Every workflow, automation and insight inside BharatMind is designed to help businesses save time, reduce costs and make faster decisions.
          </p>
        </div>

        {/* Two-Column Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative">
          
          {/* Column 1: Large animated metrics (LEFT) */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="mb-4">
              <span className="font-mono text-[9px] text-[#FF9933] uppercase tracking-widest font-extrabold">
                ENTERPRISE SYSTEM IMPACT
              </span>
              <h3 className="font-sans text-lg font-bold text-[#F3F7F9] mt-1">
                Aggregated Operational Performance
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {METRICS_DATA.map((metric) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  startAnimate={isIntersecting}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Interactive success case study carousel (RIGHT) */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            
            {/* Dynamic Connecting Line Overlay effect indicating metric-to-outcome connection */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-[#F7C844] uppercase tracking-widest font-extrabold">
                  SUCCESS STORYBOOK
                </span>
                <h3 className="font-sans text-lg font-bold text-[#F3F7F9] mt-1">
                  How BharatMind works in your sector
                </h3>
              </div>

              {/* Connected pipeline badge indicator */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#13232C] border border-white/5 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "14s" }} />
                <span className="font-mono text-[9px] text-white/55 font-bold uppercase tracking-wide">
                  COGNITIVE PIPELINE ACTIVE
                </span>
              </div>
            </div>

            {/* Quick Industry selector chips */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              {CASE_STUDIES.map((study) => (
                <button
                  key={study.id}
                  onClick={() => setActiveStudyId(study.id)}
                  className={`px-3.5 py-2 font-sans text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeStudyId === study.id
                      ? "bg-[#114C5A] text-[#F7C844] border border-[#F7C844]/25 shadow-sm"
                      : "bg-[#152731]/50 text-[#F3F7F9]/50 border border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {study.industry}
                </button>
              ))}
            </div>

            {/* Selected Active Success Card View with Detailed Breakdown */}
            <div className="relative">
              <CaseStudyCard
                study={activeStudy}
                isActive={true}
                onActivate={() => {}}
              />
            </div>

            {/* Micro-Interaction Guidance footer */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-sans text-[10px] text-[#F3F7F9]/50">
                  Select other industries above to witness cognitive outcomes.
                </span>
              </div>
              
              <button 
                onClick={() => {
                  const pricingSection = document.getElementById("pricing-story-section");
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="font-sans text-xs font-bold text-[#F7C844] flex items-center gap-1 group/link cursor-pointer hover:text-white"
              >
                <span>Select Your Plan</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
