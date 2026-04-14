"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const LETTERS = "MilliStudios".split("");
const CONFIGS = LETTERS.map((l, i) => ({
  letter: l,
  rx: `${((i * 127) % 100 - 50) * 0.7}deg`,
  ry: `${((i * 89) % 100 - 50) * 0.6}deg`,
  tx: `${((i * 71) % 300 - 150)}px`,
  ty: `${((i * 53) % 220 - 110)}px`,
  tz: `${(i * 43) % 400}px`,
  delay: `${i * 0.07}s`,
}));

export default function LogoIntro() {
  const [phase, setPhase] = useState<"assembling"|"hold"|"exit"|"done">("assembling");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1900);
    const t2 = setTimeout(() => setPhase("exit"), 2900);
    const t3 = setTimeout(() => setPhase("done"), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  if (phase === "done") return null;
  return (
    <div className={`logo-intro${phase==="exit"?" logo-intro--exit":""}`} onClick={() => setPhase("done")} aria-label="MilliStudios intro">
      {/* Brand logo mark */}
      <div style={{
        opacity: phase==="assembling" ? 0 : 1,
        transform: phase==="assembling" ? "scale(0.5) translateY(20px)" : "scale(1) translateY(0)",
        transition: "opacity 0.6s ease 1.2s, transform 0.6s cubic-bezier(.23,1,.32,1) 1.2s",
        marginBottom: 8,
      }}>
        <Image
          src="/milli-logo.png"
          alt="MilliStudios"
          width={100}
          height={100}
        />
      </div>
      <div className="logo-intro__word">
        {CONFIGS.map((c, i) => (
          <span key={i} className={`logo-intro__letter${phase!=="assembling"?" logo-intro__letter--in":""}`}
            style={{ "--delay":c.delay, "--rx":c.rx, "--ry":c.ry, "--tx":c.tx, "--ty":c.ty, "--tz":c.tz } as React.CSSProperties}>
            {c.letter}
          </span>
        ))}
      </div>
      <p className="logo-intro__sub">A Cinematic Production House</p>
      <p className="logo-intro__skip">Click to skip</p>
    </div>
  );
}
