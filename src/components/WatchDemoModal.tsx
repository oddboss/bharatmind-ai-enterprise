import React, { useState } from "react";
import { X, Play, ShieldAlert, CheckCircle2, Sparkles, PhoneCall, ShoppingBag, Landmark, Languages } from "lucide-react";

interface WatchDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerDashboardDemo: () => void;
}

export default function WatchDemoModal({ isOpen, onClose, onTriggerDashboardDemo }: WatchDemoModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: "GST intelligence & Tally Reconciliation",
      desc: "Automatically monitors state-level GSTR collections, reconciles purchases with GSTR-2B, and flags optimization anomalies instantly.",
      stat: "₹2.4L Unclaimed ITC Found",
      icon: Landmark,
      color: "text-[#F7C844]"
    },
    {
      title: "Omnichannel Shopify & Retail Sync",
      desc: "Synchronizes live physical warehouse inventories, orders, and retail pricing directly with online storefronts, highlighting profit margins.",
      stat: "12% Basmati Price Advantage",
      icon: ShoppingBag,
      color: "text-emerald-400"
    },
    {
      title: "Automated Conversational Voice AI Agent",
      desc: "Deploys custom high-fidelity, low-latency, localized voice calls in over 25 Indian languages to recover abandoned customer carts or verify COD deliveries.",
      stat: "45% Abandoned Cart Recovery",
      icon: PhoneCall,
      color: "text-[#FF9933]"
    },
    {
      title: "Multilingual Invoicing & Localization",
      desc: "Translate, compose, and send localized invoices and WhatsApp status updates in Hindi, Tamil, Telugu, Marathi, and more on-the-fly.",
      stat: "25+ Indian Languages Built-In",
      icon: Languages,
      color: "text-sky-400"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172B36]/90 backdrop-blur-md">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-[#152731] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
        id="watch-demo-modal"
      >
        {/* Decorative Grid Accent */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F7C844]" />
            <span className="font-sans font-bold text-base text-[#F3F7F9]">
              BharatMind AI Executive Tour
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#F3F7F9]/50 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all focus:outline-none focus:ring-1 focus:ring-[#F7C844]"
            aria-label="Close Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 relative z-10">
          
          {/* Main Visualizer Container */}
          <div className="bg-[#172B36] border border-white/5 rounded-xl p-5 flex flex-col justify-between min-h-[160px] relative">
            <div className="absolute top-4 right-4 text-[10px] font-mono text-[#F3F7F9]/30 uppercase">
              Step {activeStep + 1} of {demoSteps.length}
            </div>

            {/* Active Step Graphic */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center ${demoSteps[activeStep].color} shadow-inner`}>
                {React.createElement(demoSteps[activeStep].icon, { className: "w-6 h-6" })}
              </div>
              <div className="space-y-1.5 flex-1 pr-12">
                <h4 className="font-sans text-sm font-bold text-[#F3F7F9]">
                  {demoSteps[activeStep].title}
                </h4>
                <p className="font-sans text-xs text-[#F3F7F9]/75 leading-relaxed">
                  {demoSteps[activeStep].desc}
                </p>
              </div>
            </div>

            {/* Key Stat pill */}
            <div className="mt-5 flex items-center justify-between bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-lg">
              <span className="font-sans text-xs text-[#F3F7F9]/50">Enterprise impact verified:</span>
              <span className={`font-mono text-xs font-bold ${demoSteps[activeStep].color}`}>
                {demoSteps[activeStep].stat}
              </span>
            </div>
          </div>

          {/* Stepper Dots & Interactivity */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {demoSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeStep ? "w-6 bg-[#F7C844]" : "w-2 bg-white/10 hover:bg-white/20"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Demo Trigger Link to Live Dashboard */}
            <button
              onClick={() => {
                onTriggerDashboardDemo();
                onClose();
              }}
              className="flex items-center gap-1.5 bg-[#114C5A] hover:bg-[#114C5A]/80 border border-[#F7C844]/30 text-[#F7C844] font-sans text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
              id="btn-simulate-interactive"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Simulate in Dashboard
            </button>
          </div>

          <div className="h-px bg-white/5" />

          {/* Core Operating Principles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-sans text-xs font-bold text-[#F3F7F9]">
                  Zero Mock Data Policy
                </h5>
                <p className="font-sans text-[10px] text-[#F3F7F9]/50 leading-relaxed mt-0.5">
                  Connects to your real live GST, Tally accounts privately with military grade security.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-sans text-xs font-bold text-[#F3F7F9]">
                  Built for Bharat
                </h5>
                <p className="font-sans text-[10px] text-[#F3F7F9]/50 leading-relaxed mt-0.5">
                  Deep intelligence localized for Indian tax compliance and Kirana supply-chains.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#152731] border-t border-white/5">
          <button
            onClick={onClose}
            className="font-sans text-xs text-[#F3F7F9]/70 hover:text-white px-4 py-2 transition-all"
          >
            Close Tour
          </button>
          <button
            onClick={() => {
              onTriggerDashboardDemo();
              onClose();
            }}
            className="bg-gradient-to-r from-[#F7C844] to-[#FF9933] text-[#172B36] font-sans font-bold text-xs px-4.5 py-2.5 rounded-xl hover:shadow-lg transition-all"
          >
            Launch Interactive System
          </button>
        </div>
      </div>
    </div>
  );
}
