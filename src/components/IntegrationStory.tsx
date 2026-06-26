import React, { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { 
  CheckCircle, 
  RefreshCw, 
  Database, 
  Terminal, 
  Sparkles, 
  TrendingUp, 
  Cpu, 
  Check, 
  Flame, 
  ShieldCheck,
  ChevronRight,
  Wifi
} from "lucide-react";

interface IntegrationItem {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  iconColor: string;
  example: string;
  details: string;
  metricLabel: string;
  metricValue: string;
  brandGradient: string;
  accentColor: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  // Left Column (1-5)
  {
    id: "tally",
    name: "Tally Prime",
    status: "Synced",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20",
    iconColor: "#4ADE80",
    example: "Localized ledger sync",
    details: "12 credit ledgers reconciled automatically without cloud export.",
    metricLabel: "Cash Flow Stability",
    metricValue: "99.4%",
    brandGradient: "from-[#0F9D58] to-[#0b703e]",
    accentColor: "#0F9D58"
  },
  {
    id: "gst",
    name: "GST Portal",
    status: "Live",
    statusColor: "text-sky-400 bg-sky-400/10 border-sky-500/20",
    iconColor: "#38BDF8",
    example: "Outward supply audit",
    details: "Automated GSTR-1 & 3B cross-check active, mismatch risk zero.",
    metricLabel: "Tax Compliance",
    metricValue: "GSTR-1 Ready",
    brandGradient: "from-[#1A73E8] to-[#1254aa]",
    accentColor: "#1A73E8"
  },
  {
    id: "excel",
    name: "MS Excel",
    status: "Connected",
    iconColor: "#10B981",
    statusColor: "text-teal-400 bg-teal-400/10 border-teal-500/20",
    example: "Manual workbook parse",
    details: "Private local ledger spreadsheets ingested & verified.",
    metricLabel: "Records Ingested",
    metricValue: "1,420 rows",
    brandGradient: "from-[#107C41] to-[#0b542c]",
    accentColor: "#107C41"
  },
  {
    id: "zoho",
    name: "Zoho Books",
    status: "Synced",
    iconColor: "#EF4444",
    statusColor: "text-rose-400 bg-rose-400/10 border-rose-500/20",
    example: "Outstanding payables scan",
    details: "Sharma Distributors outstanding balance reconciled to zero mismatches.",
    metricLabel: "Reconciliation",
    metricValue: "₹0 Pending",
    brandGradient: "from-[#E31837] to-[#991024]",
    accentColor: "#E31837"
  },
  {
    id: "powerbi",
    name: "Power BI",
    status: "Active",
    iconColor: "#F59E0B",
    statusColor: "text-amber-400 bg-[#F59E0B]/10 border-[#F59E0B]/20",
    example: "Real-time query sync",
    details: "BharatMind optimizes executive data pipelines for predictive cash flow models.",
    metricLabel: "Forecast Accuracy",
    metricValue: "96.5% Acc.",
    brandGradient: "from-[#F2C811] to-[#ab8d0c]",
    accentColor: "#F2C811"
  },

  // Right Column (6-10)
  {
    id: "shopify",
    name: "Shopify Store",
    status: "Active",
    iconColor: "#A7F3D0",
    statusColor: "text-green-400 bg-green-400/10 border-green-500/20",
    example: "Live cart recovery stream",
    details: "Vernacular voice agent triggers when cart is abandoned for >30 mins.",
    metricLabel: "Shopify Recoveries",
    metricValue: "+18.4% YoY",
    brandGradient: "from-[#96BF48] to-[#6c8a32]",
    accentColor: "#96BF48"
  },
  {
    id: "whatsapp",
    name: "WhatsApp Biz",
    status: "Live",
    iconColor: "#22C55E",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20",
    example: "Conversational billing",
    details: "Automated outstanding reminders dispatched in 4 regional languages.",
    metricLabel: "Client Response Rate",
    metricValue: "94.2%",
    brandGradient: "from-[#25D366] to-[#128C7E]",
    accentColor: "#25D366"
  },
  {
    id: "razorpay",
    name: "Razorpay",
    status: "Ready",
    iconColor: "#2563EB",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-500/20",
    example: "Settlements matching",
    details: "Transaction fees & settlement payouts reconciled against bank statements.",
    metricLabel: "Settlement Accuracy",
    metricValue: "100.0%",
    brandGradient: "from-[#002B49] to-[#0070BA]",
    accentColor: "#0070BA"
  },
  {
    id: "googleanalytics",
    name: "Google Analytics",
    status: "Synced",
    iconColor: "#F59E0B",
    statusColor: "text-orange-400 bg-orange-400/10 border-orange-500/20",
    example: "Demographics parsing",
    details: "Local footfall mapped against online search intent for baseline pricing.",
    metricLabel: "Footfall Capture",
    metricValue: "+24.1% Lift",
    brandGradient: "from-[#E37400] to-[#b85e00]",
    accentColor: "#E37400"
  },
  {
    id: "m365",
    name: "Microsoft 365",
    status: "Ready",
    iconColor: "#0078D4",
    statusColor: "text-indigo-400 bg-indigo-400/10 border-indigo-500/20",
    example: "Outlook reminders",
    details: "Email statements parsed locally to populate bank ledger models.",
    metricLabel: "Ingestion Pipelines",
    metricValue: "14 Triggers",
    brandGradient: "from-[#0078D4] to-[#005a9e]",
    accentColor: "#0078D4"
  }
];

export default function IntegrationStory() {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: true
  });

  const [revealCards, setRevealCards] = useState(false);
  const [drawLines, setDrawLines] = useState(false);
  const [activeId, setActiveId] = useState<string>("tally");
  const [isHovered, setIsHovered] = useState(false);
  const [pulseSpeed, setPulseSpeed] = useState<string>("duration-[4s]");

  // Terminal log stream simulation
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Initializing BharatMind.ai Orchestrator core...",
    "Localized secure agent online."
  ]);

  // Handle intersection triggers
  useEffect(() => {
    if (isIntersecting) {
      const cardTimer = setTimeout(() => setRevealCards(true), 200);
      const lineTimer = setTimeout(() => setDrawLines(true), 1000);
      return () => {
        clearTimeout(cardTimer);
        clearTimeout(lineTimer);
      };
    }
  }, [isIntersecting]);

  // Auto cycling of active integration to make the dashboard feel incredibly alive!
  useEffect(() => {
    if (isHovered) return; // Freeze cycle when user hovers

    const cycleOrder = ["tally", "gst", "shopify", "whatsapp"];
    let currentIndex = cycleOrder.indexOf(activeId);
    if (currentIndex === -1) currentIndex = 0;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % cycleOrder.length;
      const nextId = cycleOrder[nextIndex];
      setActiveId(nextId);
      
      // Update terminal with unique system events
      const activeObj = INTEGRATIONS.find(item => item.id === nextId);
      if (activeObj) {
        setTerminalLogs(prev => [
          `[Ecosystem Sync] System ${activeObj.name} verified securely.`,
          `[Orchestrator] Active metric: ${activeObj.metricLabel} -> ${activeObj.metricValue}`,
          `[Agent] ${activeObj.details}`,
          ...prev.slice(0, 3)
        ]);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activeId, isHovered]);

  const activeObj = INTEGRATIONS.find(item => item.id === activeId) || INTEGRATIONS[0];

  const handleCardHover = (id: string) => {
    setActiveId(id);
    setIsHovered(true);
    setPulseSpeed("duration-[1.5s]"); // speed up particles on hover to feel high performance!
    
    const cardObj = INTEGRATIONS.find(item => item.id === id);
    if (cardObj) {
      setTerminalLogs(prev => [
        `[Live Query] User highlighted ${cardObj.name} connection.`,
        `[Reconciler] Action: ${cardObj.example}`,
        `[Status] Channel established: ${cardObj.status}`,
        ...prev.slice(0, 3)
      ]);
    }
  };

  const handleCardLeave = () => {
    setIsHovered(false);
    setPulseSpeed("duration-[4s]");
  };

  // Helper to draw beautiful SVG brand icons
  const renderBrandIcon = (id: string, color: string) => {
    switch (id) {
      case "tally":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#tally-grad)" />
            <path d="M7 6H17V8H13V18H11V8H7V6Z" fill="white" />
            <defs>
              <linearGradient id="tally-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "gst":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#gst-grad)" />
            <path d="M6 8 L18 8 M6 12 L18 12 M6 16 L14 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="gst-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "excel":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#excel-grad)" />
            <path d="M7 6 L17 18 M17 6 L7 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="excel-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "zoho":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#zoho-grad)" />
            <circle cx="9" cy="9" r="3" fill="white" />
            <circle cx="15" cy="15" r="3" fill="white" />
            <defs>
              <linearGradient id="zoho-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "powerbi":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#pb-grad)" />
            <rect x="6" y="12" width="3" height="6" fill="white" />
            <rect x="10" y="9" width="3" height="9" fill="white" />
            <rect x="14" y="6" width="3" height="12" fill="white" />
            <defs>
              <linearGradient id="pb-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "shopify":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#shopify-grad)" />
            <path d="M6 9 L8 5 H16 L18 9 M4 9 H20 L18 20 H6 L4 9 Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <defs>
              <linearGradient id="shopify-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "whatsapp":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#wa-grad)" />
            <path d="M12 5 C8.1 5 5 8.1 5 12 C5 13.5 5.5 14.9 6.3 16 L5 20 L9.2 18.8 C10.1 19.3 11 19.5 12 19.5 C15.9 19.5 19 16.4 19 12.5 C19 8.6 15.9 5 12 5 Z" stroke="white" strokeWidth="1.5" />
            <defs>
              <linearGradient id="wa-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "razorpay":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#rp-grad)" />
            <path d="M8 14 L15 6 L12 11 L16 11 L9 18 L11 13 Z" fill="white" />
            <defs>
              <linearGradient id="rp-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "googleanalytics":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#ga-grad)" />
            <path d="M6 18 V12 M12 18 V8 M18 18 V14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="ga-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "m365":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#office-grad)" />
            <path d="M6 6 H11 V11 H6 Z M13 6 H18 V11 H13 Z M6 13 H11 V18 H6 Z M13 13 H18 V18 H13 Z" fill="white" />
            <defs>
              <linearGradient id="office-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
          </svg>
        );
      default:
        return <Database className="w-5 h-5" />;
    }
  };

  return (
    <section 
      ref={ref}
      id="integration-story-section"
      className="relative w-full py-24 border-t border-white/5 bg-[#152731]/10 overflow-hidden select-none"
      aria-label="BharatMind AI Deep Ecosystem Integrations"
    >
      {/* Background Grids and Accents */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] bg-[#114C5A]/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Section Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title and Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#152731] border border-white/5 rounded-full text-[10px] font-mono text-[#F7C844] font-bold tracking-wider uppercase shadow-md mb-4 animate-pulse">
            <Wifi className="w-3 h-3 text-[#FF9933]" />
            Deep Systems Integrations
          </div>
          
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#F3F7F9] tracking-tight">
            Works with the tools <span className="gradient-text from-[#F7C844] to-[#FF9933]">Indian businesses</span> already trust.
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#F3F7F9]/60 leading-relaxed mt-4">
            Connect BharatMind with your existing business stack in minutes. No migrations. No disruption. Just intelligent automation.
          </p>
        </div>

        {/* The Story Grid Arena */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* SVG Connection Paths Canvas Overlay (Desktop Only) */}
          {drawLines && (
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
              viewBox="0 0 1000 600" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ zIndex: 0 }}
            >
              {/* Left Column connectors starting from X=280 to X=420 */}
              {/* Left Card 1 */}
              <path d="M 280 60 C 350 60, 350 300, 415 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 280 60 C 350 60, 350 300, 415 300" 
                stroke={activeId === "tally" ? "#F7C844" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "tally" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "tally" || !isHovered ? 1 : 0.2 }}
              />

              {/* Left Card 2 */}
              <path d="M 280 180 C 350 180, 350 300, 415 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 280 180 C 350 180, 350 300, 415 300" 
                stroke={activeId === "gst" ? "#38BDF8" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "gst" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "gst" || !isHovered ? 1 : 0.2 }}
              />

              {/* Left Card 3 */}
              <path d="M 280 300 L 415 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 280 300 L 415 300" 
                stroke={activeId === "excel" ? "#10B981" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "excel" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "excel" || !isHovered ? 1 : 0.2 }}
              />

              {/* Left Card 4 */}
              <path d="M 280 420 C 350 420, 350 300, 415 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 280 420 C 350 420, 350 300, 415 300" 
                stroke={activeId === "zoho" ? "#EF4444" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "zoho" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "zoho" || !isHovered ? 1 : 0.2 }}
              />

              {/* Left Card 5 */}
              <path d="M 280 540 C 350 540, 350 300, 415 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 280 540 C 350 540, 350 300, 415 300" 
                stroke={activeId === "powerbi" ? "#F59E0B" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "powerbi" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "powerbi" || !isHovered ? 1 : 0.2 }}
              />

              {/* Right Column connectors starting from X=720 to X=585 */}
              {/* Right Card 1 */}
              <path d="M 720 60 C 650 60, 650 300, 585 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 720 60 C 650 60, 650 300, 585 300" 
                stroke={activeId === "shopify" ? "#96BF48" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "shopify" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "shopify" || !isHovered ? 1 : 0.2 }}
              />

              {/* Right Card 2 */}
              <path d="M 720 180 C 650 180, 650 300, 585 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 720 180 C 650 180, 650 300, 585 300" 
                stroke={activeId === "whatsapp" ? "#25D366" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "whatsapp" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "whatsapp" || !isHovered ? 1 : 0.2 }}
              />

              {/* Right Card 3 */}
              <path d="M 720 300 L 585 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 720 300 L 585 300" 
                stroke={activeId === "razorpay" ? "#0070BA" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "razorpay" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "razorpay" || !isHovered ? 1 : 0.2 }}
              />

              {/* Right Card 4 */}
              <path d="M 720 420 C 650 420, 650 300, 585 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 720 420 C 650 420, 650 300, 585 300" 
                stroke={activeId === "googleanalytics" ? "#E37400" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "googleanalytics" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "googleanalytics" || !isHovered ? 1 : 0.2 }}
              />

              {/* Right Card 5 */}
              <path d="M 720 540 C 650 540, 650 300, 585 300" stroke="rgba(243, 247, 249, 0.05)" strokeWidth="1.5" />
              <path 
                d="M 720 540 C 650 540, 650 300, 585 300" 
                stroke={activeId === "m365" ? "#0078D4" : "rgba(243, 247, 249, 0.1)"} 
                strokeWidth={activeId === "m365" ? "2.5" : "1"} 
                strokeDasharray="8 12" 
                className={`transition-all duration-500 animate-pulse-line ${pulseSpeed}`} 
                style={{ opacity: activeId === "m365" || !isHovered ? 1 : 0.2 }}
              />
            </svg>
          )}

          {/* Column 1: Left Integration Cards (5 rows) */}
          <div className="col-span-12 lg:col-span-3 space-y-4 lg:space-y-6" style={{ zIndex: 10 }}>
            {INTEGRATIONS.slice(0, 5).map((card, idx) => {
              const isActive = activeId === card.id;
              return (
                <div
                  key={card.id}
                  onMouseEnter={() => handleCardHover(card.id)}
                  onMouseLeave={handleCardLeave}
                  className={`relative group bg-[#152731]/70 border rounded-2xl p-4 cursor-pointer select-none transition-all duration-300 transform float-card ${
                    revealCards 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-12"
                  } ${
                    isActive 
                      ? "border-[#F7C844]/40 shadow-[0_10px_30px_-10px_rgba(247,200,68,0.12)] -translate-y-1 scale-[1.02]" 
                      : "border-white/5 hover:border-white/10"
                  }`}
                  style={{ 
                    transitionDelay: `${idx * 100}ms`,
                    animationDelay: `${idx * 0.4}s`
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/[0.03] border border-white/5 rounded-xl transition-transform duration-300 group-hover:scale-110">
                        {renderBrandIcon(card.id, card.iconColor)}
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-bold text-[#F3F7F9] group-hover:text-[#F7C844] transition-colors">
                          {card.name}
                        </h4>
                        <span className="font-mono text-[9px] text-[#F3F7F9]/30 tracking-wider">
                          {card.example}
                        </span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-mono font-semibold transition-colors duration-300 ${card.statusColor}`}>
                      <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                      {card.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Central Live BharatMind Orchestrator Hub */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center py-6" style={{ zIndex: 10 }}>
            <div 
              className={`w-full max-w-md bg-[#13232C] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden transition-all duration-1000 ${
                revealCards ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              {/* Internal Mesh Background for Hub */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7C844]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Dynamic Connecting Glow Ring around the central node */}
              <div className="flex justify-center mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-[#F7C844]/20 animate-ping absolute opacity-50" />
                  <div className="w-24 h-24 rounded-full border border-[#FF9933]/10 animate-pulse absolute" />
                </div>
                
                {/* Central Microchip Core */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#152731] to-[#1A3742] border border-[#F7C844]/30 flex items-center justify-center shadow-lg relative">
                  <Cpu className="w-8 h-8 text-[#F7C844] animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border border-[#13232C] flex items-center justify-center">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>

              {/* Orchestrator Header details */}
              <div className="text-center mb-6">
                <h3 className="font-sans text-sm font-bold text-[#F3F7F9] tracking-tight flex items-center justify-center gap-1.5 uppercase">
                  BharatMind AI Core Hub
                  <Sparkles className="w-3.5 h-3.5 text-[#FF9933] animate-spin" style={{ animationDuration: "12s" }} />
                </h3>
                <p className="font-mono text-[9px] text-[#F3F7F9]/30 tracking-wider mt-0.5">
                  CROSS-PLATFORM RECONCILIATION LAYER
                </p>
              </div>

              {/* Active integration reaction panel */}
              <div className="bg-[#172B36] border border-white/5 rounded-xl p-4 mb-4 relative overflow-hidden transition-all duration-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-mono text-[8px] text-[#FF9933] uppercase tracking-widest block leading-none font-bold">
                      ACTIVE FEED: {activeObj.name.toUpperCase()}
                    </span>
                    <h4 className="font-sans text-xs font-extrabold text-[#F3F7F9] mt-1">
                      {activeObj.details}
                    </h4>
                  </div>
                  
                  {/* Big glowing metric pill */}
                  <div className="text-right">
                    <span className="font-sans text-[8px] text-[#F3F7F9]/40 block uppercase tracking-wider font-semibold">
                      {activeObj.metricLabel}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-emerald-400 block mt-0.5">
                      {activeObj.metricValue}
                    </span>
                  </div>
                </div>

                {/* Progress bar simulation representing active reconciliation */}
                <div className="w-full bg-white/[0.02] border border-white/5 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#F7C844] to-[#FF9933] rounded-full transition-all duration-500"
                    style={{ width: isHovered ? "100%" : "65%" }}
                  />
                </div>
              </div>

              {/* Reactive System Terminal Stream */}
              <div className="bg-[#0C171D] border border-white/5 rounded-xl p-3 h-28 overflow-y-hidden font-mono text-[10px] leading-relaxed text-[#F3F7F9]/80 flex flex-col justify-end">
                <div className="flex items-center gap-1.5 pb-2 border-b border-white/5 mb-2 text-white/40">
                  <Terminal className="w-3.5 h-3.5 text-[#F7C844]" />
                  <span>SYSTEM_RECONCILER.LOG</span>
                </div>
                
                <div className="space-y-1 select-none">
                  {terminalLogs.map((log, index) => (
                    <div key={index} className={`truncate transition-all duration-300 ${index === 0 ? "text-emerald-400 font-semibold" : "text-[#F3F7F9]/40"}`}>
                      <span className="text-[#FF9933] mr-1.5">&gt;</span>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Column 3: Right Integration Cards (5 rows) */}
          <div className="col-span-12 lg:col-span-3 space-y-4 lg:space-y-6" style={{ zIndex: 10 }}>
            {INTEGRATIONS.slice(5, 10).map((card, idx) => {
              const isActive = activeId === card.id;
              return (
                <div
                  key={card.id}
                  onMouseEnter={() => handleCardHover(card.id)}
                  onMouseLeave={handleCardLeave}
                  className={`relative group bg-[#152731]/70 border rounded-2xl p-4 cursor-pointer select-none transition-all duration-300 transform float-card ${
                    revealCards 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 translate-x-12"
                  } ${
                    isActive 
                      ? "border-[#F7C844]/40 shadow-[0_10px_30px_-10px_rgba(247,200,68,0.12)] -translate-y-1 scale-[1.02]" 
                      : "border-white/5 hover:border-white/10"
                  }`}
                  style={{ 
                    transitionDelay: `${(idx + 5) * 100}ms`,
                    animationDelay: `${(idx + 5) * 0.4}s`
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/[0.03] border border-white/5 rounded-xl transition-transform duration-300 group-hover:scale-110">
                        {renderBrandIcon(card.id, card.iconColor)}
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-bold text-[#F3F7F9] group-hover:text-[#F7C844] transition-colors">
                          {card.name}
                        </h4>
                        <span className="font-mono text-[9px] text-[#F3F7F9]/30 tracking-wider">
                          {card.example}
                        </span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-mono font-semibold transition-colors duration-300 ${card.statusColor}`}>
                      <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                      {card.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
