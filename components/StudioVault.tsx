"use client";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";

export default function StudioVault() {
  const { managedVaultFrames, managedConfig } = useAdmin();
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPct = useCallback((clientX: number) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    setPct(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onMouseMove = (e: React.MouseEvent) => { if (dragging) calcPct(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => calcPct(e.touches[0].clientX);

  return (
    <section className="section vault" id="vault" aria-labelledby="vault-title">
      <div className="section__inner">
        <div className="reveal">
          <p className="section__tag">{managedConfig.vaultTag}</p>
          <h2 className="section__title" id="vault-title" style={{ whiteSpace: "pre-line" }}>
            {managedConfig.vaultTitle}
          </h2>
          <p className="section__desc">{managedConfig.vaultDesc}</p>
        </div>

        {/* Film strip */}
        <div className="vault__strip reveal reveal--delay-1">
          {managedVaultFrames.map((f,i) => (
            <div key={i} className="vault-frame" style={{position:"relative"}}>
              {f.src
                ? <Image src={f.src} alt={f.label} fill style={{objectFit:"cover"}} sizes="220px"/>
                : <div style={{width:"100%",height:"100%",background:`linear-gradient(135deg,#0a0f1a,#12192e)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.2rem"}}>🎬</div>
              }
              <span className="vault-frame__label">{f.label}</span>
            </div>
          ))}
        </div>

        {/* RAW / GRADE Slider */}
        <div className="vault__slider-section reveal reveal--delay-2">
          <h3 className="vault__slider-title">Color Grade Reveal</h3>
          <p className="vault__slider-desc">Drag left–right to compare RAW footage vs. Final Color Grade.</p>
          <div
            ref={containerRef}
            className="slider-container"
            onMouseMove={onMouseMove}
            onMouseDown={()=>setDragging(true)}
            onMouseUp={()=>setDragging(false)}
            onMouseLeave={()=>setDragging(false)}
            onTouchMove={onTouchMove}
          >
            {/* RAW layer (bottom — desaturated) */}
            <Image 
              src={managedConfig.vaultGradeBefore || "/nija-chitram.png"} 
              alt="RAW" 
              width={700} 
              height={394} 
              className="slider-layer"
              style={{filter:"grayscale(0.7) contrast(0.85) brightness(1.05)"}}
            />
            {/* FINAL layer (top — clipped) */}
            <div className="slider-top" style={{width:`${pct}%`}}>
              <Image 
                src={managedConfig.vaultGradeAfter || "/nija-chitram.png"} 
                alt="Final Grade" 
                width={700} 
                height={394}
                style={{filter:"contrast(1.08) saturate(1.3)",width:"700px",height:"100%",objectFit:"cover"}}
              />
            </div>
            {/* Badges */}
            <span className="slider-badge slider-badge--raw">RAW</span>
            <span className="slider-badge slider-badge--grade">GRADED</span>
            {/* Handle */}
            <div className="slider-handle" style={{left:`${pct}%`,transform:"translateX(-50%)"}}>
              <div className="slider-handle__knob">⟷</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
