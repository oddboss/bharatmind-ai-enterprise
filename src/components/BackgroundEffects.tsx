import React, { useEffect, useRef, useState } from "react";

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", listener);

    if (!mediaQuery.matches) {
      const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setCoords({ x, y });
        }
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        mediaQuery.removeEventListener("change", listener);
      };
    }
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-50 bg-[#172B36]"
      style={{
        ["--mouse-x" as any]: `${coords.x}px`,
        ["--mouse-y" as any]: `${coords.y}px`,
      }}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-80 pointer-events-none" />

      {/* Mouse Spotlight Glow */}
      {!prefersReduced && (
        <div className="absolute inset-0 mouse-spotlight-bg transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Slowly Animated Mesh Gradients */}
      <div className="absolute top-[-10%] left-[20%] w-[70vw] h-[70vw] max-w-[900px] rounded-full bg-[#114C5A]/35 blur-[120px] animate-pulse-breathe" />
      <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] max-w-[800px] rounded-full bg-[#152731]/85 blur-[140px]" />
      
      {/* Moving background glow */}
      {!prefersReduced && (
        <div className="absolute top-[30%] left-[40%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-[#FF9933]/5 blur-[150px] animate-mesh-bg" />
      )}

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-35 radial-mask" />

      {/* Custom Tiny Particles / Star Field */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.25]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="15%" r="1" fill="#F7C844" className="animate-pulse" style={{ animationDuration: "3s" }} />
        <circle cx="85%" cy="20%" r="1" fill="#FF9933" className="animate-pulse" style={{ animationDuration: "4s" }} />
        <circle cx="25%" cy="75%" r="1" fill="#F3F7F9" className="animate-pulse" style={{ animationDuration: "5s" }} />
        <circle cx="70%" cy="80%" r="1.5" fill="#F7C844" className="animate-pulse" style={{ animationDuration: "6s" }} />
        <circle cx="50%" cy="40%" r="1" fill="#FF9933" className="animate-pulse" style={{ animationDuration: "3.5s" }} />
        <circle cx="92%" cy="65%" r="1" fill="#F3F7F9" className="animate-pulse" style={{ animationDuration: "4.5s" }} />
      </svg>

      {/* Diagonal Line Accents */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonal-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M-10 20 L30 -20 M0 80 L80 0 M60 100 L110 50" stroke="#F3F7F9" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-pattern)" />
      </svg>
    </div>
  );
}
