"use client";
import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";

export default function CinemaMode({ iconOnly = false }: { iconOnly?: boolean }) {
  const { managedConfig } = useAdmin();
  const [active, setActive] = useState(false);
  const toggle = () => setActive(v => !v);
  return (
    <>
      <button 
        className={iconOnly ? "nav__link-compact" : "cinema-toggle"} 
        id="cinema-toggle" 
        onClick={toggle} 
        aria-label="Toggle cinematography mode"
      >
        <span className={iconOnly ? `nav-dot ${active ? "opacity-1" : "opacity-40"}` : `cinema-toggle__dot${active ? " cinema-toggle__dot--active" : ""}`} />
        {!iconOnly && (active ? "Exit Cinema" : "Cinema Mode")}
        {iconOnly && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        )}
      </button>
      <div className={`cinema-overlay${active?" active":""}`} id="cinema-overlay">
        {/* Background Video for Cinema Mode */}
        {active && (
          <video 
            src={managedConfig.cinemaVideo}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          />
        )}
        
        <div className="cinema-grain" />
        <p className="cinema-label">▶ CINEMATOGRAPHY MODE</p>
        <div className="cinema-reel relative z-10">
          <div className="cinema-reel__film" />
          <div className="cinema-reel__text">
            MilliStudiosOfficial<br/>
            <span style={{fontSize:"1rem",fontWeight:400,opacity:.6,letterSpacing:"0.3em"}}>{managedConfig.studioMotto}</span>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end relative z-10 border-t border-white/10 pt-8">
           <div className="flex flex-col gap-2">
             <span className="text-cyan text-[8px] uppercase tracking-[0.4em] font-bold">Terminal Reference</span>
             <span className="text-white text-[10px] uppercase tracking-widest">{managedConfig.contactLocation}</span>
           </div>
           <div className="flex flex-col gap-2 text-right">
             <span className="text-silver-dim text-[8px] uppercase tracking-[0.4em] font-bold">Production Layer</span>
             <span className="text-white text-[10px] uppercase tracking-widest">{new Date().getFullYear()} REEL — 4K MASTER</span>
           </div>
        </div>

        <button className="cinema-exit relative z-10 mt-12 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] uppercase tracking-widest transition-all" onClick={toggle}>
          ✕ Close Immersive View
        </button>
      </div>
    </>
  );
}
