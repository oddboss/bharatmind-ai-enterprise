import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Mic, 
  Cpu, 
  Layers, 
  FileText, 
  Globe, 
  Briefcase, 
  ChevronDown 
} from "lucide-react";

interface DropdownItem {
  name: string;
  desc: string;
  icon: React.ComponentType<any>;
}

const DROPDOWNS_CONTENT: Record<string, DropdownItem[]> = {
  Platform: [
    { name: "AI Copilot", desc: "Bilingual business companion trained on localized guidelines.", icon: Bot },
    { name: "Finance Suite", desc: "Autonomous local ledgers audit & bank matches.", icon: TrendingUp },
    { name: "GST Intelligence", desc: "Real-time compliance checks & audit-shield alerts.", icon: ShieldCheck },
    { name: "Voice AI", desc: "Regional voice calling agents in 4 languages.", icon: Mic }
  ],
  Solutions: [
    { name: "Retail & Kiranas", desc: "Dynamic pricing & local inventory dispatchers.", icon: Cpu },
    { name: "Manufacturing", desc: "Demand forecasting synced with active ledger entries.", icon: Layers },
    { name: "Sovereign Enterprise", desc: "SLA compliance & private server deployments.", icon: ShieldCheck }
  ],
  Resources: [
    { name: "Documentation", desc: "Step-by-step developer guides & local API adapters.", icon: FileText },
    { name: "Success Stories", desc: "Verified case studies & operational ROI benchmarks.", icon: TrendingUp },
    { name: "API Reference", desc: "Robust endpoints for ERP & custom POS syncs.", icon: Cpu }
  ],
  Company: [
    { name: "About Us", desc: "Empowering 6.3 Cr+ Indian SMBs with secure AI.", icon: Globe },
    { name: "Careers", desc: "Join our team in building the next cognitive layer.", icon: Briefcase },
    { name: "Press Kit", desc: "Latest news, media releases & enterprise branding.", icon: FileText }
  ]
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  // Mouse spotlight coordinates
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    // Orchestrated entry trigger (Fade -> TranslateY -16px -> Opacity 0->1 -> Blur 8px->0)
    const timer = setTimeout(() => setIsMounted(true), 150);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleHashChange = () => {
      setActiveItem(window.location.hash || "#platform");
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleGlobalKeyDown);

    handleHashChange();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleGlobalKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15; // 15% attraction force
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setCtaOffset({ x, y });
  };

  const handleCtaMouseLeave = () => {
    setCtaOffset({ x: 0, y: 0 });
  };

  return (
    <header
      ref={headerRef}
      onMouseMove={handleMouseMove}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform ${
        isMounted 
          ? "opacity-100 translate-y-0 filter-none" 
          : "opacity-0 -translate-y-4 blur-[8px]"
      } ${
        isScrolled
          ? "bg-[#172B36]/80 backdrop-blur-[20px] saturate-[1.2] border-b border-white/5 py-4 shadow-lg shadow-black/10"
          : "bg-transparent py-6"
      }`}
      style={{
        willChange: "transform, opacity, filter"
      }}
    >
      {/* CSS custom keyframe injected dynamically */}
      <style>{`
        @keyframes mobileMenuSlideIn {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Subtle mouse track radial spotlight background layer */}
      <div 
        className="absolute pointer-events-none w-64 h-64 bg-[#F7C844]/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out hidden md:block"
        style={{
          left: `${spotlightPos.x}px`,
          top: `${spotlightPos.y}px`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          
          {/* LOGO with enterprise hover metrics */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#F7C844] rounded-lg p-1 transition-all duration-200 active:scale-95"
            id="nav-logo"
          >
            <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#114C5A] to-[#152731] border border-white/10 rounded-xl shadow-inner group-hover:border-[#F7C844]/60 group-hover:scale-[1.02] group-hover:shadow-[0_0_12px_rgba(247,200,68,0.25)] transition-all duration-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F7C844] group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300"
              >
                <path
                  d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  className="opacity-40"
                />
                <circle cx="12" cy="12" r="3" fill="#FF9933" />
                <path
                  d="M12 5V19M5 12H19M7 7L17 17M17 7L7 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-[#F7C844]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg tracking-tight text-[#F3F7F9] group-hover:text-white transition-colors">
                BharatMind <span className="text-[#F7C844]">AI</span>
              </span>
              <span className="font-mono text-[8px] tracking-widest text-[#FF9933]/60 group-hover:text-[#FF9933] uppercase leading-none font-bold transition-colors duration-200">
                Enterprise
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS - Premium Micro Interactions & Dropdowns */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {["Platform", "Solutions", "Pricing", "Customers", "Resources", "Company"].map((item) => {
              const isActive = activeItem === `#${item.toLowerCase()}`;
              const hasDropdown = ["Platform", "Solutions", "Resources", "Company"].includes(item);

              return (
                <div 
                  key={item} 
                  className="relative group py-2"
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`font-sans text-sm font-medium px-3.5 py-1.5 rounded-md transition-all duration-180 ease-out relative flex items-center gap-1 hover:-translate-y-0.5 hover:tracking-wider hover:bg-white/[0.03] focus:outline-none focus:text-white ${
                      isActive 
                        ? "text-[#F7C844] font-bold" 
                        : "text-[#F3F7F9]/75 hover:text-white"
                    }`}
                  >
                    <span>{item}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                    
                    {/* Glowing Underline Grows from Center */}
                    <span className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F7C844] transition-all duration-200 origin-center ${
                      isActive 
                        ? "scale-x-100 shadow-[0_0_8px_rgba(247,200,68,0.6)]" 
                        : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                    
                    {/* Top Dot Accent Indicator */}
                    {isActive && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#F7C844] rounded-full shadow-[0_0_6px_rgba(247,200,68,0.8)]" />
                    )}
                  </a>

                  {/* Dropdown Menu Glass Panel */}
                  {hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 p-3 rounded-2xl bg-[#152731]/95 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-250 ease-out z-50 transform origin-top pointer-events-none opacity-0 -translate-y-1 scale-95 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
                      <div className="space-y-0.5">
                        {DROPDOWNS_CONTENT[item].map((dropItem, idx) => {
                          const DropIcon = dropItem.icon;
                          return (
                            <a
                              key={dropItem.name}
                              href={`#${dropItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                              className="relative pl-4 pr-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.03] group/item flex items-start gap-3 transform translate-y-1.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                              style={{ transitionDelay: `${idx * 60}ms` }}
                            >
                              {/* Growing left accent bar */}
                              <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#F7C844] rounded-r-full transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-center" />
                              
                              {/* Rotating icon */}
                              <div className="text-[#F7C844]/80 group-hover/item:text-[#F7C844] group-hover/item:rotate-6 transition-all duration-200 shrink-0 mt-0.5">
                                <DropIcon className="w-4 h-4" />
                              </div>
                              
                              <div>
                                <h4 className="font-sans text-xs font-bold text-white/90 group-hover/item:text-white leading-none">
                                  {dropItem.name}
                                </h4>
                                <p className="font-sans text-[10px] text-[#F3F7F9]/50 leading-normal mt-1">
                                  {dropItem.desc}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SIGN IN & PRIMARY CTA buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#signin"
              className="group/signin font-sans text-sm font-medium text-[#F3F7F9]/75 hover:text-white px-4 py-2 hover:bg-white/[0.02] border border-transparent hover:border-white/10 rounded-xl transition-all duration-200 flex items-center gap-1 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/signin:opacity-100 group-hover/signin:translate-x-0.5 transition-all duration-200" />
            </a>

            <a
              href="#trial"
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              className="group relative inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F7C844] to-[#FF9933] text-[#172B36] font-sans font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-xl hover:shadow-[#F7C844]/25 transition-all duration-200 active:scale-[0.98]"
              style={{
                transform: `translate3d(${ctaOffset.x}px, ${ctaOffset.y}px, 0)`
              }}
              id="cta-navbar-trial"
            >
              {/* Shine Gradient Reflection Sweep effect */}
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </span>

              <span className="relative z-10 flex items-center gap-1.5">
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </a>
          </div>

          {/* MOBILE MENU BUTTON hamburger morph */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-9 h-9 flex items-center justify-center text-[#F3F7F9] hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F7C844]"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span 
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 transform origin-left ${
                    isMobileMenuOpen ? "rotate-45 translate-x-[2px] translate-y-[-1px]" : ""
                  }`} 
                />
                <span 
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`} 
                />
                <span 
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 transform origin-left ${
                    isMobileMenuOpen ? "-rotate-45 translate-x-[2px] translate-y-[1px]" : ""
                  }`} 
                />
              </div>
            </button>
          </div>

        </nav>
      </div>

      {/* MOBILE MENU PANEL drawer slides with staggering items */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[72px] bg-[#172B36]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300 transform origin-top ${
          isMobileMenuOpen 
            ? "opacity-100 translate-y-0 scale-y-100 py-6" 
            : "opacity-0 -translate-y-2 scale-y-95 pointer-events-none py-0"
        }`}
      >
        <div className="px-4 space-y-2">
          {["Platform", "Solutions", "Pricing", "Customers", "Resources", "Company"].map((item, idx) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-sans text-base font-semibold text-[#F3F7F9]/80 hover:text-[#F7C844] px-5 py-3.5 rounded-xl hover:bg-white/5 transition-all duration-200 transform translate-x-2 opacity-0"
              style={{
                animation: isMobileMenuOpen ? `mobileMenuSlideIn 0.3s ease-out forwards ${idx * 50}ms` : "none"
              }}
            >
              {item}
            </a>
          ))}
          
          <div className="h-px bg-white/5 my-4" />
          
          <div className="grid grid-cols-2 gap-4 px-4">
            <a
              href="#signin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center font-sans font-bold text-[#F3F7F9]/85 hover:text-white py-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-200"
            >
              Sign In
            </a>
            <a
              href="#trial"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#F7C844] to-[#FF9933] text-[#172B36] font-sans font-bold py-3.5 rounded-xl hover:shadow-lg transition-all duration-200"
            >
              Start Trial
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
