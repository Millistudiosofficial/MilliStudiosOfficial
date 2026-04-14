"use client";
import { useEffect, useRef, useState } from "react";

export default function LensCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [large, setLarge] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => { el.style.left=`${e.clientX}px`; el.style.top=`${e.clientY}px`; };
    const enterBig = (e: Event) => { if ((e.target as HTMLElement).closest(".film-card,.project-card,.team-card,.vault-frame")) setLarge(true); };
    const leaveBig = () => setLarge(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enterBig);
    document.addEventListener("mouseout", leaveBig);
    return () => { window.removeEventListener("mousemove",move); document.removeEventListener("mouseover",enterBig); document.removeEventListener("mouseout",leaveBig); };
  }, []);
  return (
    <div ref={ref} className={`lens-cursor${large?" large":""}`} aria-hidden="true">
      <img src="/clapper-cursor.png" alt="Cursor" />
    </div>
  );
}
