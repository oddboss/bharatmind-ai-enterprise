import React, { useState, useRef, useEffect, memo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Languages, 
  Database, 
  CheckCircle,
  MessagesSquare,
  Network,
  Settings,
  Cpu,
  BookmarkCheck
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  takeaway: string;
  chipText: string;
  chipIcon: React.ComponentType<any>;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "Can BharatMind integrate with Tally?",
    answer: "Yes. BharatMind features deep local ledger integrations. It establishes a secure channel to read offline ledger spreadsheets or Tally databases, automatically reconciling statements locally with zero cloud migration or configuration overhead.",
    takeaway: "No migration required",
    chipText: "Accounting Ready",
    chipIcon: Database
  },
  {
    id: 2,
    question: "Does BharatMind support GST automation?",
    answer: "Absolutely. BharatMind cross-checks GSTR-1 and GSTR-3B filings continuously against local invoices. The built-in compliance checker flags mismatches instantly, ensuring you avoid audits and compliance delays on your returns.",
    takeaway: "Tax-Shield Compliant",
    chipText: "Audit Ready",
    chipIcon: ShieldCheck
  },
  {
    id: 3,
    question: "How many Indian languages are supported?",
    answer: "Our vernacular cognitive engine supports major Indian languages including Hindi, Tamil, Telugu, and Kannada. The AI easily handles mixed languages ('Hinglish') to ensure fluid, natural customer and vendor communications.",
    takeaway: "94% engagement rate",
    chipText: "Multilingual",
    chipIcon: Languages
  },
  {
    id: 4,
    question: "Is my business data secure?",
    answer: "Data privacy is our highest priority. BharatMind employs bank-grade, end-to-end local encryption protocols. Your financial databases, customer records, and ledger balances never leave your trusted local systems.",
    takeaway: "Bank-grade privacy",
    chipText: "Secure Core",
    chipIcon: ShieldCheck
  },
  {
    id: 5,
    question: "Can I connect Shopify and WhatsApp Business?",
    answer: "Yes. BharatMind hooks directly into Shopify webhooks to track abandoned carts or shipping events. It then auto-triggers customized regional WhatsApp follow-ups, recovering lost sales without developer overhead.",
    takeaway: "+18% recovery lift",
    chipText: "Workflow Sync",
    chipIcon: Network
  },
  {
    id: 6,
    question: "How long does onboarding take?",
    answer: "Onboarding is exceptionally fast. Our pre-built adapters connect with Tally, GST logs, and Excel sheets in under 5 minutes. You can start dispatching reminders and reviewing reports on day one.",
    takeaway: "Under 5 minutes setup",
    chipText: "Instant Boot",
    chipIcon: Clock
  },
  {
    id: 7,
    question: "Does BharatMind support enterprise deployments?",
    answer: "Yes. We offer robust multi-franchise architectures, customized SLA response guarantees, and private sovereign server model options. We adapt our orchestration capabilities to suit large regional distribution systems.",
    takeaway: "Enterprise-ready scale",
    chipText: "Sovereign AI",
    chipIcon: Cpu
  },
  {
    id: 8,
    question: "Can I customize AI workflows?",
    answer: "Yes. Our visual automation board allows non-technical business managers to configure triggers, rules, and AI response parameters, enabling tailor-made solutions with no code updates.",
    takeaway: "No-code optimization",
    chipText: "Adaptive",
    chipIcon: Settings
  },
  {
    id: 9,
    question: "Do you provide API access?",
    answer: "Yes. Our enterprise tier includes access to developer documentation and robust REST APIs. You can easily integrate custom databases, legacy POS platforms, and internal logistics frameworks with BharatMind.",
    takeaway: "Rich integration API",
    chipText: "API Available",
    chipIcon: Network
  },
  {
    id: 10,
    question: "Can BharatMind replace multiple business tools?",
    answer: "Absolutely. By bundling automated reconciliation, bilingual calling agents, pricing intelligence, and WhatsApp integrations, BharatMind replaces fragmented, costly platforms with a unified command hub.",
    takeaway: "Consolidated ROI",
    chipText: "All-in-One",
    chipIcon: BookmarkCheck
  }
];

// Memoized Accordion Card for premium performance
const AccordionCard = memo(({
  faq,
  isOpen,
  onToggle,
  idx
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  idx: number;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const ChipIcon = faq.chipIcon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className={`group rounded-2xl bg-[#152731]/70 border overflow-hidden select-none transition-all duration-300 transform ${
        isOpen 
          ? "border-[#F7C844]/45 bg-[#17303B]/85 shadow-[0_15px_35px_-12px_rgba(247,200,68,0.12)] -translate-y-0.5" 
          : "border-white/5 hover:border-white/12 hover:-translate-y-0.5"
      }`}
      style={{
        transitionDelay: `${idx * 40}ms`
      }}
    >
      <button
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${faq.id}`}
        id={`faq-btn-${faq.id}`}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-1 focus:ring-[#F7C844]/30"
      >
        <span className="font-sans text-xs sm:text-sm font-bold text-[#F3F7F9] group-hover:text-white transition-colors">
          {faq.question}
        </span>

        <span 
          className="ml-4 transition-transform duration-300 text-[#F3F7F9]/40 group-hover:text-[#F3F7F9]"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
          }}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      {/* Answer Area */}
      <div
        id={`faq-content-${faq.id}`}
        role="region"
        aria-labelledby={`faq-btn-${faq.id}`}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 200}px` : "0px",
          opacity: isOpen ? 1 : 0
        }}
      >
        <div ref={contentRef} className="p-5 pt-0 border-t border-white/5 bg-[#172B36]/30">
          <p className="font-sans text-xs text-[#F3F7F9]/75 leading-relaxed mb-4 mt-3.5">
            {faq.answer}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.03]">
            {/* Takeaway badge */}
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{faq.takeaway}</span>
            </div>

            {/* Feature pill chip */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-full text-[9px] font-mono font-semibold text-[#F3F7F9]/55">
              <ChipIcon className="w-3 h-3 text-[#F7C844]" />
              <span>{faq.chipText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AccordionCard.displayName = "AccordionCard";

export default function FAQSection() {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true
  });

  const [openId, setOpenId] = useState<number | null>(1); // Default first open

  const handleToggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section
      ref={ref}
      id="faq-section"
      className={`relative w-full py-24 bg-[#152731]/15 border-t border-white/5 overflow-hidden transition-all duration-[1000ms] ease-out transform ${
        isIntersecting 
          ? "opacity-100 translate-y-0 filter-none" 
          : "opacity-0 translate-y-12 blur-[4px]"
      }`}
      aria-label="Frequently Asked Questions"
    >
      {/* Background Grids and Soft Mesh */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[60vw] h-[60vw] max-w-[800px] bg-[#114C5A]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#152731] border border-white/5 rounded-full text-[10px] font-mono text-[#F7C844] font-bold tracking-wider uppercase shadow-md mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF9933]" />
            Frequently Asked Questions
          </div>
          
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#F3F7F9] tracking-tight">
            Everything You Need Before You Get Started.
          </h2>
          
          <p className="font-sans text-sm text-[#F3F7F9]/60 leading-relaxed mt-4">
            Questions answered before your first workflow even begins. Clear, professional, and reliable explanations.
          </p>
        </div>

        {/* Split Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative">
          
          {/* LEFT COLUMN: Support Panel Glass Card */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-[#152731]/70 border border-white/5 overflow-hidden shadow-2xl">
              {/* Internal Accent Lighting */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7C844]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#F7C844] mb-4">
                  <MessagesSquare className="w-5 h-5" />
                </div>
                
                <h3 className="font-sans text-base font-extrabold text-[#F3F7F9]">
                  Need More Help?
                </h3>
                
                <p className="font-sans text-xs text-[#F3F7F9]/60 leading-relaxed mt-2">
                  Talk with our AI product specialists and discover how BharatMind fits into your business without disrupting daily operations.
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    const demoSection = document.getElementById("core-features-section");
                    if (demoSection) {
                      demoSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl font-sans text-xs font-bold text-[#172B36] bg-[#F7C844] hover:bg-[#FF9933] shadow-md shadow-[#F7C844]/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Schedule Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button 
                  onClick={() => {
                    const pricingSection = document.getElementById("pricing-story-section");
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl font-sans text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Premium Accordion */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {FAQ_DATA.map((faq, idx) => (
              <AccordionCard
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
                idx={idx}
              />
            ))}

            {/* Bottom Final CTA Block inside FAQ */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
              <div>
                <h4 className="font-sans text-xs font-bold text-[#F3F7F9]">
                  Still have questions?
                </h4>
                <p className="font-sans text-[11px] text-[#F3F7F9]/50 mt-1">
                  Schedule a personalized demo with our AI specialists.
                </p>
              </div>

              <button 
                onClick={() => {
                  const pricingSection = document.getElementById("pricing-story-section");
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="py-2.5 px-4 rounded-xl font-sans text-xs font-bold bg-[#F7C844] text-[#172B36] hover:bg-[#FF9933] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-[#F7C844]/10"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
