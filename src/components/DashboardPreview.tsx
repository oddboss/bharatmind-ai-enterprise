import React, { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Bot,
  MessageSquareCode,
  DollarSign,
  Briefcase,
  Layers,
  ArrowUpRight,
  Sparkles,
  Search,
  ChevronRight,
  Globe,
  Bell,
  HelpCircle,
  Smartphone,
  ChevronDown,
  CornerDownRight,
  Zap,
  ShoppingBag,
  FileText,
  Settings,
  Users
} from "lucide-react";

interface DashboardPreviewProps {
  demoTriggerCount: number;
  highlightedChip: string;
}

export default function DashboardPreview({ demoTriggerCount, highlightedChip }: DashboardPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const currentElement = containerRef.current;
    if (!currentElement) return;

    // Fast resolution using IntersectionObserver to pause off-screen operations
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.02, rootMargin: "100px" }
    );

    observer.observe(currentElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  // Dashboard Interactive States
  const [revenueTimeframe, setRevenueTimeframe] = useState("This Month");
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState(`**Namaste! I am your BharatMind AI Copilot.** 

Select any capability on the left or type your query below to analyze your live systems (Tally, GST, Shopify).

*Try clicking:*
• **"Analyze GST Outward Supplies for optimization"**
• **"Compare retail pricing with local Kirana competitors"**`);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Stats target and current animated states
  const targetStats = {
    healthScore: 94,
    revenue: 1428500,
    cashFlow: 890400,
    tasksAutomated: 1240
  };

  const [stats, setStats] = useState({
    healthScore: 0,
    revenue: 0,
    cashFlow: 0,
    tasksAutomated: 0
  });

  // Load Animation triggering
  const [animateChart, setAnimateChart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Live typing effect on response change
  useEffect(() => {
    let index = 0;
    setDisplayedResponse("");
    const speed = chatResponse.length > 300 ? 5 : 8;
    const timer = setInterval(() => {
      setDisplayedResponse(chatResponse.slice(0, index));
      index++;
      if (index > chatResponse.length) {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [chatResponse]);

  // Redraw SVG path when revenueTimeframe changes
  useEffect(() => {
    setAnimateChart(false);
    const timer = setTimeout(() => setAnimateChart(true), 150);
    return () => clearTimeout(timer);
  }, [revenueTimeframe]);

  // Multidimensional paths mapping
  const chartPaths = useMemo(() => ({
    "Today": {
      path1: "M0 130 C 80 125, 150 75, 220 85 C 290 95, 360 45, 430 55 L 500 25",
      path2: "M0 145 C 90 138, 180 118, 270 122 C 360 128, 450 78, 500 68",
      peak: "₹18K/hr"
    },
    "This Week": {
      path1: "M0 120 C 50 110, 100 90, 150 100 C 200 110, 250 50, 300 45 C 350 40, 400 80, 450 60 L 500 40",
      path2: "M0 140 C 60 130, 120 120, 180 115 C 240 110, 300 80, 360 85 C 420 90, 480 65, 500 55",
      peak: "₹1.8L/day"
    },
    "This Month": {
      path1: "M0 105 C 80 115, 160 115, 240 75 C 320 35, 400 55, 450 35 L 500 20",
      path2: "M0 125 C 70 130, 140 135, 210 120 C 280 105, 350 90, 420 95 L 500 55",
      peak: "₹14.2L/mo"
    },
    "FY 2026-27": {
      path1: "M0 145 C 100 135, 200 55, 300 65 C 400 75, 450 25, 500 15",
      path2: "M0 148 C 100 142, 200 112, 300 118 C 400 122, 450 82, 500 42",
      peak: "₹1.6Cr/Yr"
    }
  }), []);

  // Rolling alert logs matrix
  const [alerts, setAlerts] = useState([
    { id: 1, text: "Blinkit Competitor pricing shift: Basmati Rice reduced to ₹105/kg (Suggested margin adjustment is active).", type: "market" },
    { id: 2, text: "Tally Ledger reconciled: Outstanding balance of ₹4,20,000 for Sharma Distributors verified.", type: "tally" }
  ]);

  useEffect(() => {
    if (!isInView) return;
    const alertPool = [
      { text: "Blinkit Competitor pricing shift: Basmati Rice reduced to ₹105/kg (Suggested margin adjustment is active).", type: "market" },
      { text: "Tally Ledger reconciled: Outstanding balance of ₹4,20,000 for Sharma Distributors verified.", type: "tally" },
      { text: "Quick Commerce pricing shift: Refined Oil raised to ₹185/L in local radius.", type: "market" },
      { text: "Tally Prime: Synced 14 credit ledgers automatically with zero mismatch risk.", type: "tally" },
      { text: "GSTR-1 mismatch check: 100% matched with zero anomalies found.", type: "gst" },
      { text: "GST Invoice verified: Input Tax Credit automated reconciliation saved ₹42,000.", type: "gst" },
      { text: "WhatsApp: Dispatching custom regional payment reminder to Sharma Distributors.", type: "whatsapp" },
      { text: "Shopify Recovered: Tamil language Voice AI recovered abandoned shopping cart valued at ₹3,499.", type: "shopify" },
      { text: "Sovereign Core: Private localized LLM security audit check passed with zero packet exports.", type: "system" }
    ];

    const interval = setInterval(() => {
      setAlerts(prev => {
        const lastAlert = prev[prev.length - 1];
        const currentPoolIndex = alertPool.findIndex(item => item.text === lastAlert?.text);
        const nextIndex = (currentPoolIndex + 1) % alertPool.length;
        const nextAlert = alertPool[nextIndex];
        const nextId = lastAlert ? lastAlert.id + 1 : 1;
        return [lastAlert, { id: nextId, ...nextAlert }];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    // Staggered trigger for chart path drawing
    const chartTimer = setTimeout(() => setAnimateChart(true), 600);
    // Notification delayed slide-in
    const notifyTimer = setTimeout(() => setShowNotification(true), 1200);

    // Stats elegant count up
    const duration = 1200; // ms
    const startTime = performance.now();

    let animFrame: number;

    const animateStats = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setStats({
        healthScore: Math.floor(easeProgress * targetStats.healthScore),
        revenue: Math.floor(easeProgress * targetStats.revenue),
        cashFlow: Math.floor(easeProgress * targetStats.cashFlow),
        tasksAutomated: Math.floor(easeProgress * targetStats.tasksAutomated)
      });

      if (progress < 1) {
        animFrame = requestAnimationFrame(animateStats);
      } else {
        // Stabilize at target
        setStats(targetStats);
      }
    };

    animFrame = requestAnimationFrame(animateStats);

    return () => {
      clearTimeout(chartTimer);
      clearTimeout(notifyTimer);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Periodic health score micro-fluctuations representing active diagnostic heartbeat
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setStats(prev => {
        if (prev.healthScore === 0) return prev;
        const drift = Math.random() > 0.5 ? 1 : -1;
        const newScore = Math.max(92, Math.min(97, prev.healthScore + drift));
        return {
          ...prev,
          healthScore: newScore
        };
      });
    }, 8000);
    return () => clearInterval(timer);
  }, [isInView]);

  // Small live activity updates simulated
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 450) + 50,
        tasksAutomated: prev.tasksAutomated + (Math.random() > 0.7 ? 1 : 0),
        cashFlow: prev.cashFlow + Math.floor(Math.random() * 200) - 50
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Sync state if demo is triggered
  useEffect(() => {
    if (demoTriggerCount > 0) {
      handleAskCopilot("Draft shopify cart recovery voice script");
    }
  }, [demoTriggerCount]);

  // Sync state if a chip is clicked in Marketing Section
  useEffect(() => {
    if (highlightedChip) {
      if (highlightedChip === "GST Intelligence") {
        handleAskCopilot("Analyze GST Outward Supplies for optimization");
      } else if (highlightedChip === "25 Indian Languages") {
        handleAskCopilot("Translate Invoice into Tamil & Hindi");
      } else if (highlightedChip === "Shopify") {
        handleAskCopilot("Draft shopify cart recovery voice script");
      } else if (highlightedChip === "Tally") {
        handleAskCopilot("Analyze GST Outward Supplies for optimization");
      } else {
        handleAskCopilot(`Explain how ${highlightedChip} connects to my business dashboard`);
      }
    }
  }, [highlightedChip]);

  // Live Copilot handler
  const handleAskCopilot = async (promptText: string) => {
    const promptToUse = promptText || chatInput;
    if (!promptToUse.trim()) return;

    setIsTyping(true);
    setChatInput("");
    setChatResponse("");

    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToUse })
      });
      const data = await response.json();
      setChatResponse(data.text || "No response received.");
    } catch (err) {
      console.error(err);
      setChatResponse("Error reaching BharatMind Server. Please check configuration.");
    } finally {
      setIsTyping(false);
    }
  };

  // Quick suggestions inside dashboard copilot card
  const quickPrompts = [
    "Analyze GST Outward Supplies for optimization",
    "Compare retail pricing with local Kirana competitors",
    "Translate Invoice into Tamil & Hindi"
  ];

  // Helper to format currency
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full relative" id="dashboard-container" ref={containerRef}>
      {/* Interactive Floater Accent */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#114C5A]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Browser Container */}
      <div className="w-full glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5 shadow-black/40 transition-all duration-300 hover:border-white/10 hover:shadow-shadow-[#F7C844]/5">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#152731] border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 transition-transform hover:scale-110" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 transition-transform hover:scale-110" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 transition-transform hover:scale-110" />
            <span className="ml-3 font-mono text-[10px] text-[#F3F7F9]/30 tracking-widest uppercase select-none">
              BHARATMIND.AI/CONSOLE
            </span>
          </div>

          {/* Connected Systems Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#172B36] border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[9px] text-[#F3F7F9]/50 tracking-wider">
              TALLY + SHOPIFY CONNECTED
            </span>
          </div>
        </div>

        {/* Dashboard Shell Grid */}
        <div className="grid grid-cols-12 min-h-[580px] lg:min-h-[620px] bg-[#172B36]/90">
          
          {/* A. Left Sidebar (Premium mini dashboard navigation) */}
          <div className="col-span-3 border-r border-white/5 bg-[#152731]/70 p-3.5 flex flex-col justify-between hidden md:flex">
            <div>
              {/* User Workspace Profile */}
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/[0.02] border border-white/5 mb-5 transition-colors hover:bg-white/[0.04]">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#F7C844] to-[#FF9933] flex items-center justify-center text-[#172B36] font-bold text-xs shadow-inner">
                  K
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-sans text-xs font-semibold text-[#F3F7F9] truncate leading-tight">
                    Karan Exports
                  </h4>
                  <p className="font-sans text-[9px] text-[#F3F7F9]/40 truncate">
                    GSTIN: 27AADCK8...
                  </p>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1" aria-label="Dashboard Sidebar">
                {[
                  { name: "Dashboard", icon: Layers },
                  { name: "AI Copilot", icon: Bot },
                  { name: "Market Intelligence", icon: Globe },
                  { name: "Finance", icon: DollarSign },
                  { name: "Inventory", icon: ShoppingBag },
                  { name: "GST", icon: FileText },
                  { name: "AI Agents", icon: Briefcase },
                  { name: "Settings", icon: Settings }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.name;
                  return (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-sans text-xs font-medium transition-all duration-300 text-left focus:outline-none focus:ring-1 focus:ring-[#F7C844]/40 active:scale-95 ${
                        isActive
                          ? "bg-[#114C5A]/50 text-[#F7C844] border-l-2 border-[#F7C844] translate-x-1"
                          : "text-[#F3F7F9]/60 hover:text-[#F3F7F9] hover:bg-white/[0.02]"
                      }`}
                      id={`sidebar-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-[#F7C844] rotate-6" : "text-[#F3F7F9]/40"}`} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Agent Status Footer */}
            <div className="p-2.5 rounded-xl bg-[#172B36] border border-white/5 transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-ping" />
                <span className="font-mono text-[9px] text-[#FF9933] tracking-wide uppercase font-bold">
                  AGENT RUNNING
                </span>
              </div>
              <p className="font-sans text-[10px] text-[#F3F7F9]/50 leading-tight">
                GST Outward audit agent reconciled 12 ledgers.
              </p>
            </div>
          </div>

          {/* B. Main Dashboard Panel */}
          <div className="col-span-12 md:col-span-9 p-4 sm:p-6 overflow-y-auto space-y-5 flex flex-col justify-between max-h-[580px] lg:max-h-[620px]">
            
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] tracking-widest text-[#FF9933] uppercase leading-none font-bold">
                  SYSTEM OVERVIEW
                </p>
                <h2 className="font-sans text-lg font-extrabold text-[#F3F7F9] tracking-tight mt-1 transition-all">
                  {activeTab === "Dashboard" ? "Executive Control Room" : `${activeTab}`}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <select
                  value={revenueTimeframe}
                  onChange={(e) => setRevenueTimeframe(e.target.value)}
                  className="bg-[#152731] border border-white/5 text-[#F3F7F9]/80 font-sans text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F7C844] cursor-pointer transition-colors hover:border-white/10"
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>FY 2026-27</option>
                </select>
                <button 
                  onClick={() => handleAskCopilot("Analyze GST Outward Supplies for optimization")}
                  className="flex items-center gap-1 bg-[#114C5A] border border-[#F7C844]/20 hover:border-[#F7C844]/50 text-[#F7C844] font-sans text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                  id="btn-re-audit"
                >
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  Audit System
                </button>
              </div>
            </div>

            {/* Dashboard grid structure inside */}
            <div className="grid grid-cols-12 gap-4">
              
              {/* Stat Cards Row with Entrance Transition */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#152731] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <div>
                  <span className="font-sans text-[10px] text-[#F3F7F9]/50 block uppercase tracking-wider font-semibold">
                    HEALTH SCORE
                  </span>
                  <span className="font-mono text-xl font-bold text-[#F3F7F9] block mt-1.5 transition-all">
                    {stats.healthScore}%
                  </span>
                  <span className="font-sans text-[9px] text-[#F7C844] flex items-center gap-0.5 mt-1 leading-none font-medium">
                    <TrendingUp className="w-3 h-3" />
                    +1.2% this week
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#114C5A]/40 flex items-center justify-center text-[#F7C844] transition-transform hover:rotate-12">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#152731] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <div>
                  <span className="font-sans text-[10px] text-[#F3F7F9]/50 block uppercase tracking-wider font-semibold">
                    REVENUE
                  </span>
                  <span className="font-mono text-xl font-bold text-[#F3F7F9] block mt-1.5 transition-all">
                    {formatINR(stats.revenue)}
                  </span>
                  <span className="font-sans text-[9px] text-green-400 flex items-center gap-0.5 mt-1 leading-none font-medium">
                    <TrendingUp className="w-3 h-3" />
                    +18.4% YoY
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#114C5A]/40 flex items-center justify-center text-green-400 transition-transform hover:rotate-12">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#152731] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <div>
                  <span className="font-sans text-[10px] text-[#F3F7F9]/50 block uppercase tracking-wider font-semibold">
                    CASH FLOW
                  </span>
                  <span className="font-mono text-xl font-bold text-[#F3F7F9] block mt-1.5 transition-all">
                    {formatINR(stats.cashFlow)}
                  </span>
                  <span className="font-sans text-[9px] text-[#F7C844] flex items-center gap-0.5 mt-1 leading-none font-medium">
                    <TrendingUp className="w-3 h-3" />
                    Healthy cycle
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#FF9933]/15 flex items-center justify-center text-[#FF9933] transition-transform hover:rotate-12">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#152731] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5">
                <div>
                  <span className="font-sans text-[10px] text-[#F3F7F9]/50 block uppercase tracking-wider font-semibold">
                    TASKS AUTOMATED
                  </span>
                  <span className="font-mono text-xl font-bold text-[#F3F7F9] block mt-1.5 transition-all">
                    {stats.tasksAutomated}
                  </span>
                  <span className="font-sans text-[9px] text-[#F7C844] flex items-center gap-0.5 mt-1 leading-none font-medium">
                    <Zap className="w-3 h-3" />
                    99.8% precision
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#F7C844]/15 flex items-center justify-center text-[#F7C844] transition-transform hover:rotate-12">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              {/* Left Column: Revenue chart and Real-time Alerts */}
              <div className="col-span-12 lg:col-span-7 space-y-4">
                {/* Revenue and GST Trends Chart */}
                <div className="bg-[#152731] border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-sans text-xs font-semibold text-[#F3F7F9]">
                        Operational Performance Trends
                      </h3>
                      <p className="font-sans text-[10px] text-[#F3F7F9]/50">
                        Unified Shopify Inward + GST Outward trends
                      </p>
                    </div>
                    {/* Tiny Legend */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-sans text-[9px] text-[#F3F7F9]/70 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#F7C844]" /> Shopify sales
                      </span>
                      <span className="flex items-center gap-1 font-sans text-[9px] text-[#F3F7F9]/70 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#FF9933]" /> GST Outward
                      </span>
                    </div>
                  </div>

                  {/* Clean SVG Chart Area with Line Draw effect */}
                  <div className="relative h-44 w-full overflow-hidden">
                    {/* SVG Graph path drawing */}
                    <svg className="w-full h-full" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(243, 247, 249, 0.03)" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(243, 247, 249, 0.03)" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(243, 247, 249, 0.03)" />

                      {/* Line 1 Gradient */}
                      <defs>
                        <linearGradient id="chart-grad-1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F7C844" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#F7C844" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="chart-grad-2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF9933" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Shaded Area Chart 1 */}
                      <path
                        d={`${chartPaths[revenueTimeframe as keyof typeof chartPaths]?.path1 || chartPaths["This Month"].path1} L 500 150 L 0 150 Z`}
                        fill="url(#chart-grad-1)"
                        className="transition-all duration-700"
                        style={{ opacity: animateChart ? 1 : 0 }}
                      />

                      {/* Path Line 1 (Drawn dynamically) */}
                      <path
                        d={chartPaths[revenueTimeframe as keyof typeof chartPaths]?.path1 || chartPaths["This Month"].path1}
                        stroke="#F7C844"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className={animateChart ? "animate-draw-svg" : ""}
                      />

                      {/* Path Line 2 (Drawn dynamically) */}
                      <path
                        d={chartPaths[revenueTimeframe as keyof typeof chartPaths]?.path2 || chartPaths["This Month"].path2}
                        stroke="#FF9933"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        strokeLinecap="round"
                        className={animateChart ? "animate-draw-svg" : ""}
                        style={{ animationDelay: "200ms" }}
                      />

                      {/* Interactive Nodes */}
                      <circle cx="300" cy="45" r="4" fill="#F7C844" stroke="#152731" strokeWidth="1.5" className="animate-ping" />
                      <circle cx="300" cy="45" r="3.5" fill="#F7C844" stroke="#152731" strokeWidth="1.5" />
                      <circle cx="500" cy="40" r="3.5" fill="#F7C844" stroke="#152731" strokeWidth="1.5" />
                    </svg>

                    {/* Dynamic Floating Label */}
                    <div className="absolute top-2 left-[58%] transform -translate-x-1/2 bg-[#172B36]/90 border border-[#F7C844]/30 px-2 py-1 rounded-md text-[9px] font-mono shadow-md transition-all hover:scale-105">
                      <span className="text-[#F3F7F9]/50">Peak:</span>{" "}
                      <span className="text-[#F7C844] font-bold">{chartPaths[revenueTimeframe as keyof typeof chartPaths]?.peak || chartPaths["This Month"].peak}</span>
                    </div>

                    {/* Chart X Axis Labels */}
                    <div className="flex justify-between items-center px-1 mt-2 font-mono text-[9px] text-[#F3F7F9]/40">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Real-time GST & Competitor Intelligence Alert card with staggered slide up */}
                <div 
                  className={`bg-[#152731] border border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-700 transform ${
                    showNotification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF9933]/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933] flex items-center justify-center relative">
                        <span className="w-full h-full rounded-full bg-[#FF9933] animate-ping absolute opacity-75" />
                      </span>
                      <h4 className="font-sans text-xs font-semibold text-[#F3F7F9]">
                        Competitor intelligence & Market Alerts
                      </h4>
                    </div>
                    <span className="font-mono text-[9px] bg-[#FF9933]/15 text-[#FF9933] px-2 py-0.5 rounded-md font-bold">
                      LIVE MONITOR
                    </span>
                  </div>

                  {/* Warning / Intelligence dynamic rotating content */}
                  <div className="mt-3.5 space-y-2.5">
                    {alerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className="flex gap-2 p-2 rounded-lg bg-[#172B36]/50 border border-white/5 transition-all duration-500 hover:bg-white/[0.01] animate-fade-in-up"
                      >
                        {alert.type === "market" ? (
                          <Globe className="w-4 h-4 text-[#F7C844] shrink-0 mt-0.5 animate-spin" style={{ animationDuration: "12s" }} />
                        ) : (
                          <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <p className="font-sans text-xs text-[#F3F7F9]/75 leading-normal">
                          <span className="text-white font-semibold">
                            {alert.type === "market" ? "Market Intelligence" : "System Reconciler"}
                          </span>: {alert.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Copilot Interfacing Console */}
              <div className="col-span-12 lg:col-span-5 flex flex-col justify-between bg-[#152731] border border-white/5 rounded-2xl p-4 relative">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#114C5A] flex items-center justify-center text-[#F7C844] border border-white/10 transition-transform hover:rotate-6">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-sans text-xs font-bold text-[#F3F7F9] flex items-center gap-1">
                        BharatMind AI Copilot
                        <Sparkles className="w-3 h-3 text-[#FF9933] animate-pulse" />
                      </h3>
                      <p className="font-mono text-[8px] text-[#F3F7F9]/40 tracking-wider">
                        SECURE PRIVATE LLM HANDLER
                      </p>
                    </div>
                  </div>

                  {/* Bilingual Voice Waveform Indicator */}
                  <div className="flex items-center gap-[3px] h-3.5 px-1.5 py-0.5 bg-[#114C5A]/40 border border-white/5 rounded-md">
                    <span className="font-mono text-[7px] text-[#F7C844] font-bold tracking-widest mr-1">VOICE</span>
                    <span className="w-[1.5px] h-2 bg-[#F7C844] rounded-full origin-bottom animate-[voice-bounce_0.8s_infinite_ease-in-out]" />
                    <span className="w-[1.5px] h-2.5 bg-[#FF9933] rounded-full origin-bottom animate-[voice-bounce_1.2s_infinite_ease-in-out] [animation-delay:0.2s]" />
                    <span className="w-[1.5px] h-1.5 bg-[#F7C844] rounded-full origin-bottom animate-[voice-bounce_0.9s_infinite_ease-in-out] [animation-delay:0.4s]" />
                    <span className="w-[1.5px] h-3 bg-[#FF9933] rounded-full origin-bottom animate-[voice-bounce_1s_infinite_ease-in-out] [animation-delay:0.1s]" />
                  </div>
                </div>

                {/* Copilot Response Terminal view */}
                <div className="flex-1 bg-[#172B36] border border-white/5 rounded-xl p-3.5 h-[190px] overflow-y-auto mb-4 text-xs font-sans leading-relaxed text-[#F3F7F9]/90 relative scrollbar">
                  {isTyping ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2.5">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F7C844] animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933] animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F7C844] animate-bounce" />
                      </div>
                      <span className="font-mono text-[9px] text-[#F3F7F9]/40 tracking-widest uppercase">
                        AI Reasoning & Auditing...
                      </span>
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-xs">
                      {displayedResponse.split("\n").map((line, idx) => {
                        // Very simple markdown presentation for boldness & bullet points
                        let formattedLine = line;
                        
                        // Bold title/header helper
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return (
                            <h5 key={idx} className="text-[#F7C844] font-bold text-xs tracking-tight mb-2.5 mt-1">
                              {line.replace(/\*\*/g, "")}
                            </h5>
                          );
                        }

                        // Bold inline elements
                        const boldParts = line.split("**");
                        if (boldParts.length > 2) {
                          return (
                            <p key={idx} className="mb-2">
                              {boldParts.map((part, i) => (
                                <span key={i} className={i % 2 === 1 ? "text-[#F7C844] font-semibold" : "text-[#F3F7F9]/80"}>
                                  {part}
                                </span>
                              ))}
                            </p>
                          );
                        }

                        // Bullet point presenter
                        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
                          return (
                            <div key={idx} className="flex gap-2 mb-2 pl-1.5">
                              <span className="text-[#FF9933] shrink-0 mt-1">•</span>
                              <span className="text-[#F3F7F9]/80">{line.replace(/^[•\-\s]+/, "")}</span>
                            </div>
                          );
                        }

                        return (
                          <p key={idx} className="text-[#F3F7F9]/80 mb-2">
                            {line}
                          </p>
                        );
                      })}
                      {displayedResponse.length < chatResponse.length && (
                        <span className="inline-block w-1.5 h-3 bg-[#F7C844] ml-0.5 animate-pulse" />
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Prompts Panel */}
                <div className="mb-3.5 space-y-1.5">
                  <p className="font-sans text-[9px] text-[#F3F7F9]/40 uppercase font-bold tracking-wider mb-1">
                    SUGGESTED ACTIONS:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {quickPrompts.map((p, index) => (
                      <button
                        key={index}
                        onClick={() => handleAskCopilot(p)}
                        className="w-full text-left font-sans text-[10px] text-[#F3F7F9]/70 hover:text-[#F7C844] bg-[#172B36]/60 hover:bg-[#114C5A]/30 border border-white/5 hover:border-[#F7C844]/20 p-2 rounded-lg transition-all duration-200 hover:translate-x-1 focus:outline-none flex items-center justify-between group cursor-pointer"
                        id={`dashboard-prompt-${index}`}
                      >
                        <span className="truncate pr-2">{p}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#F3F7F9]/30 group-hover:text-[#F7C844] shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Search Console */}
                <div className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskCopilot("")}
                    placeholder="Ask Copilot (e.g. Translate Invoice to Tamil)"
                    className="w-full bg-[#172B36] border border-white/10 rounded-xl pl-3.5 pr-12 py-3 text-xs text-[#F3F7F9] placeholder-[#F3F7F9]/30 focus:outline-none focus:ring-1 focus:ring-[#F7C844] focus:border-[#F7C844] transition-all"
                    id="chat-input-field"
                  />
                  <button
                    onClick={() => handleAskCopilot("")}
                    className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-[#114C5A] hover:bg-[#114C5A]/80 border border-[#F7C844]/20 hover:border-[#F7C844]/40 text-[#F7C844] rounded-lg transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                    id="btn-send-chat"
                    aria-label="Send Query"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
