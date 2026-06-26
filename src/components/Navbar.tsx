import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isGlassBlurred, setIsGlassBlurred] = useState(false);

  // Dedicated useEffect hook for glass-blur scroll listening
  useEffect(() => {
    const handleGlassBlurScroll = () => {
      if (window.scrollY > 20) {
        setIsGlassBlurred(true);
      } else {
        setIsGlassBlurred(false);
      }
    };
    window.addEventListener("scroll", handleGlassBlurScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleGlassBlurScroll);
    };
  }, []);

  useEffect(() => {
    // Orchestrated entry trigger
    const timer = setTimeout(() => setIsMounted(true), 100);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      } ${
        isScrolled
          ? "bg-[#172B36]/80 border-b border-white/5 py-4 shadow-lg shadow-black/10"
          : "bg-transparent py-6"
      } ${isGlassBlurred ? "glass-blur" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo with interactive scaling */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#F7C844] rounded-lg p-1 transition-transform duration-200 active:scale-95"
            id="nav-logo"
          >
            <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#114C5A] to-[#152731] border border-white/10 rounded-xl shadow-inner group-hover:border-[#F7C844]/40 transition-colors duration-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F7C844] group-hover:scale-105 group-hover:rotate-12 transition-transform duration-300"
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
              <span className="font-mono text-[8px] tracking-widest text-[#FF9933] uppercase leading-none font-bold">
                Enterprise
              </span>
            </div>
          </a>

          {/* Desktop Nav Links - Smooth hover transitions with underlines */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {["Platform", "Solutions", "Pricing", "Customers", "Resources", "Company"].map((item, idx) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans text-sm font-medium text-[#F3F7F9]/75 hover:text-[#F7C844] px-3.5 py-1.5 rounded-md transition-all duration-200 relative group focus:outline-none focus:text-[#F7C844]"
                style={{
                  transitionDelay: `${idx * 40}ms`
                }}
              >
                {item}
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#F7C844] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </div>

          {/* CTAs with hover lifting and glow */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#signin"
              className="font-sans text-sm font-medium text-[#F3F7F9]/85 hover:text-[#F3F7F9] px-4 py-2 hover:bg-white/[0.02] rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#F7C844]"
            >
              Sign In
            </a>
            <a
              href="#trial"
              className="group relative inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F7C844] to-[#FF9933] text-[#172B36] font-sans font-semibold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#F7C844]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#172B36] focus:ring-[#F7C844]"
              id="cta-navbar-trial"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#F3F7F9]/85 hover:text-[#F3F7F9] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7C844]"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[72px] bg-[#172B36] border-b border-white/5 shadow-2xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 space-y-3">
          {["Platform", "Solutions", "Pricing", "Customers", "Resources", "Company"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-sans text-base font-medium text-[#F3F7F9]/75 hover:text-[#F7C844] px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-150"
            >
              {item}
            </a>
          ))}
          <div className="h-px bg-white/5 my-4" />
          <div className="grid grid-cols-2 gap-4 px-4">
            <a
              href="#signin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center font-sans font-medium text-[#F3F7F9]/85 hover:text-white py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-150"
            >
              Sign In
            </a>
            <a
              href="#trial"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#F7C844] to-[#FF9933] text-[#172B36] font-sans font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-150"
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
