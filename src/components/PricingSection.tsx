import React, { useState, useMemo, useCallback, memo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Percent, 
  ShieldCheck,
  Zap,
  Globe,
  Database
} from "lucide-react";

// Types for matrix
type BillingCycle = "monthly" | "annual";
type Currency = "INR" | "USD" | "EUR";

interface PricingPlanData {
  id: string;
  name: string;
  desc: string;
  baseMonthlyPrice: {
    INR: number;
    USD: number;
    EUR: number;
  };
  features: string[];
  ctaText: string;
  popular: boolean;
  badge?: string;
}

// Complete multidimensional pricing data matrix matching requested plans
const PRICING_PLANS: PricingPlanData[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "For local Kiranas and growing retailers looking to automate basic reconciliations.",
    baseMonthlyPrice: {
      INR: 1999,
      USD: 29,
      EUR: 25
    },
    features: [
      "1 Tally Sync Integration",
      "Manual GST ledger import",
      "Basic WhatsApp alerts",
      "Standard email support (24h)",
      "Secure local-first sandbox"
    ],
    ctaText: "Start Free Trial",
    popular: false
  },
  {
    id: "growth",
    name: "Growth",
    desc: "Perfect for multi-store retail owners seeking real-time automated workflows.",
    baseMonthlyPrice: {
      INR: 4999,
      USD: 69,
      EUR: 59
    },
    features: [
      "3 Deep Integrations (Tally, GST, Excel)",
      "Daily automated mismatch alerts",
      "Vernacular WhatsApp billing reminders",
      "Priority business support (4h)",
      "Advanced competitor pricing scan (1km)"
    ],
    ctaText: "Start Growth Trial",
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    desc: "Unrestricted intelligent agency. Active automated ledger cross-checks & regional agents.",
    baseMonthlyPrice: {
      INR: 9999,
      USD: 139,
      EUR: 119
    },
    features: [
      "Unlimited systems integrations",
      "Real-time GST compliance (GSTR-1 & 3B)",
      "Custom regional voice assistant calls",
      "Dedicated account engineer response",
      "Full radius competitor intelligence (3km)"
    ],
    ctaText: "Get Professional Active",
    popular: true,
    badge: "Most Popular"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "Tailored deployment for retail chains, franchise systems, and complex distributions.",
    baseMonthlyPrice: {
      INR: 24999,
      USD: 349,
      EUR: 299
    },
    features: [
      "Custom local-first sovereign server models",
      "Unlimited sub-franchise ledgers audit",
      "Custom SLA & compliance guarantees",
      "Infinite volume regional call queues",
      "24/7 dedicated telephone support"
    ],
    ctaText: "Contact Sales",
    popular: false,
    badge: "Sovereign AI"
  }
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€"
};

// Memoized individual Pricing Card to prevent unnecessary layout updates or parent re-renders
const PricingCard = memo(({
  plan,
  billingCycle,
  currency,
  isHoveredPlan,
  anyPlanHovered,
  onHover,
  onLeave
}: {
  plan: PricingPlanData;
  billingCycle: BillingCycle;
  currency: Currency;
  isHoveredPlan: boolean;
  anyPlanHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  // Multidimensional matrix pricing math engine
  const priceInfo = useMemo(() => {
    const baseMonthly = plan.baseMonthlyPrice[currency];
    const discountFactor = billingCycle === "annual" ? 0.8 : 1.0; // 20% Discount
    const finalPrice = Math.round(baseMonthly * discountFactor);
    const displayedPrice = billingCycle === "annual" ? finalPrice : baseMonthly;
    
    return {
      symbol: CURRENCY_SYMBOLS[currency],
      price: displayedPrice.toLocaleString(),
      subtext: billingCycle === "annual" ? "/month, billed annually" : "/month"
    };
  }, [plan, billingCycle, currency]);

  // Determine dim state
  const isDimmed = anyPlanHovered && !isHoveredPlan;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out select-none transform border ${
        plan.popular 
          ? "bg-[#18313D]/90 border-[#F7C844]/45 shadow-[0_20px_40px_-15px_rgba(247,200,68,0.15)] md:scale-[1.04] md:-translate-y-2 z-10" 
          : "bg-[#152731]/70 border-white/5 shadow-xl hover:border-white/15"
      } ${
        isHoveredPlan 
          ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] -translate-y-2 border-[#F7C844]/30" 
          : ""
      } ${
        isDimmed ? "opacity-65 scale-[0.98]" : ""
      }`}
      style={{
        willChange: "transform, opacity, border-color"
      }}
    >
      {/* Background soft glowing accent for Professional / Popular */}
      {plan.popular && (
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#F7C844]/10 rounded-full blur-[80px] pointer-events-none" />
      )}

      {/* Plan Header block */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans text-lg font-bold text-white tracking-tight">
            {plan.name}
          </h3>
          
          {plan.badge && (
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-[9px] font-mono font-extrabold uppercase rounded-full tracking-wider ${
              plan.popular 
                ? "bg-[#F7C844] text-[#172B36] shadow-sm shadow-[#F7C844]/40 animate-pulse" 
                : "bg-white/10 text-[#F3F7F9]/80 border border-white/10"
            }`}>
              <Sparkles className="w-2.5 h-2.5" />
              {plan.badge}
            </span>
          )}
        </div>

        <p className="font-sans text-xs text-[#F3F7F9]/60 leading-relaxed min-h-[48px] mb-6">
          {plan.desc}
        </p>

        {/* Dynamic transition friendly pricing segment */}
        <div className="mb-6 relative min-h-[44px] flex items-baseline gap-1.5 overflow-hidden">
          <span className="font-sans text-2xl font-bold text-[#F3F7F9]/40 leading-none">
            {priceInfo.symbol}
          </span>
          
          {/* Animated counter container */}
          <div className="inline-block relative">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none animate-price-pulse">
              {priceInfo.price}
            </span>
          </div>

          <span className="font-sans text-[10px] text-[#F3F7F9]/40 font-medium ml-1">
            {priceInfo.subtext}
          </span>
        </div>

        {/* Feature listings */}
        <div className="space-y-3.5 border-t border-white/5 pt-6 mb-8">
          <span className="font-mono text-[8px] text-[#F3F7F9]/30 tracking-widest block uppercase font-extrabold mb-1">
            INCLUDED CAPABILITIES
          </span>
          {plan.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5 group/feat">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5 group-hover/feat:bg-emerald-500/20 transition-colors">
                <Check className="w-2.5 h-2.5 text-emerald-400" />
              </div>
              <span className="font-sans text-[11px] text-[#F3F7F9]/75 group-hover/feat:text-[#F3F7F9] transition-colors leading-normal">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Button CTA Block */}
      <div>
        <button
          className={`w-full py-3.5 px-4 rounded-xl font-sans text-xs font-bold tracking-wide flex items-center justify-center gap-2 group/btn cursor-pointer transition-all duration-300 ${
            plan.popular
              ? "bg-[#F7C844] hover:bg-[#FF9933] text-[#172B36] shadow-lg shadow-[#F7C844]/15 hover:shadow-[#FF9933]/20 hover:-translate-y-0.5 active:translate-y-0"
              : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0"
          }`}
          aria-label={`${plan.ctaText} for ${plan.name} plan`}
        >
          <span>{plan.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>

    </div>
  );
});

PricingCard.displayName = "PricingCard";

export default function PricingSection() {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true
  });

  // State Management isolated perfectly within pricing component (no layout triggers)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [hoveredPlanId, setHoveredPlanId] = useState<string | null>(null);

  // Quick helper to select and clear hover actions
  const handleHover = useCallback((id: string) => {
    setHoveredPlanId(id);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredPlanId(null);
  }, []);

  return (
    <section
      ref={ref}
      id="pricing-story-section"
      className={`relative w-full py-24 bg-[#152731]/10 border-t border-white/5 overflow-hidden transition-all duration-[1000ms] ease-out transform ${
        isIntersecting 
          ? "opacity-100 translate-y-0 filter-none" 
          : "opacity-0 translate-y-12 blur-[4px]"
      }`}
      aria-label="BharatMind AI Pricing & Plans Matrix"
    >
      {/* Aesthetic Mesh Background */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] max-w-[600px] bg-[#114C5A]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#152731] border border-white/5 rounded-full text-[10px] font-mono text-[#F7C844] font-bold tracking-wider uppercase shadow-md mb-4">
            <Percent className="w-3 h-3 text-[#FF9933]" />
            Transparent Pricing Structure
          </div>
          
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#F3F7F9] tracking-tight">
            Choose the Perfect Plan for Your Business
          </h2>
          
          <p className="font-sans text-sm text-[#F3F7F9]/60 leading-relaxed mt-4 max-w-xl mx-auto">
            Start free. Scale effortlessly. Upgrade only when your business grows. No hidden transaction fees. No lock-in contracts.
          </p>
        </div>

        {/* Dual Premium Control Segment (Billing Cycle & Currency Switcher) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-10">
          
          {/* Segment 1: Monthly vs Annual Switcher */}
          <div className="bg-[#13232C]/80 border border-white/5 p-1 rounded-xl flex items-center shadow-lg relative">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-4 py-1.5 font-sans text-xs font-bold rounded-lg cursor-pointer transition-all duration-300 ${
                billingCycle === "monthly" 
                  ? "bg-[#114C5A] text-[#F7C844] shadow-md" 
                  : "text-[#F3F7F9]/60 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`relative z-10 px-4 py-1.5 font-sans text-xs font-bold rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                billingCycle === "annual" 
                  ? "bg-[#114C5A] text-[#F7C844] shadow-md" 
                  : "text-[#F3F7F9]/60 hover:text-white"
              }`}
            >
              <span>Annual</span>
              <span className="bg-[#FF9933]/15 text-[#FF9933] text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>

          {/* Segment 2: Currency Segment Selector */}
          <div className="bg-[#13232C]/80 border border-white/5 p-1 rounded-xl flex items-center shadow-lg">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1.5 font-sans text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                currency === "INR" ? "bg-[#114C5A] text-[#F7C844]" : "text-[#F3F7F9]/50 hover:text-white"
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 font-sans text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                currency === "USD" ? "bg-[#114C5A] text-[#F7C844]" : "text-[#F3F7F9]/50 hover:text-white"
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency("EUR")}
              className={`px-3 py-1.5 font-sans text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                currency === "EUR" ? "bg-[#114C5A] text-[#F7C844]" : "text-[#F3F7F9]/50 hover:text-white"
              }`}
            >
              € EUR
            </button>
          </div>

        </div>

        {/* 4-Column Grid matrix container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              currency={currency}
              isHoveredPlan={hoveredPlanId === plan.id}
              anyPlanHovered={hoveredPlanId !== null}
              onHover={() => handleHover(plan.id)}
              onLeave={handleLeave}
            />
          ))}
        </div>

        {/* Trust row indicator representing deep credentials */}
        <div className="mt-20 border-t border-white/5 pt-10 text-center">
          <p className="font-sans text-xs text-[#F3F7F9]/45 uppercase tracking-wider font-semibold">
            Trusted by founders, finance teams and enterprise leaders across India.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6">
            {["GST Portal", "Tally Prime", "Shopify Store", "WhatsApp Biz", "Excel Data", "Power BI"].map((item, index) => (
              <span 
                key={index} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#152731] border border-white/5 rounded-full text-[10px] font-mono text-[#F3F7F9]/75 hover:border-[#F7C844]/30 hover:text-[#F7C844] transition-all cursor-pointer select-none shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#F7C844]/80 animate-pulse" />
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
