"use client";

import { useEffect, useRef } from "react";
import { useAdmin } from "@/context/AdminContext";

interface HeroProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { managedConfig } = useAdmin();

  const handleLink = (e: React.MouseEvent, tab: string) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // Increased range
      const y = (e.clientY / innerHeight - 0.5) * 30;

      // Parallax for headline
      const headline = contentRef.current.querySelector<HTMLElement>(".hero__headline");
      if (headline) {
        headline.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
      }

      const floats = document.querySelectorAll<HTMLElement>(".hero__float-icon");
      floats.forEach((el, i) => {
        const depth = (i + 1) * 0.8;
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });

      const orbs = document.querySelectorAll<HTMLElement>(".bokeh-orb");
      orbs.forEach((el, i) => {
        const depth = (i + 1) * 0.2;
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero">
      {/* Bokeh background */}
      <div className="hero__bokeh" aria-hidden="true">
        <div className="bokeh-orb bokeh-orb--1" />
        <div className="bokeh-orb bokeh-orb--2" />
        <div className="bokeh-orb bokeh-orb--3" />
        <div className="bokeh-orb bokeh-orb--4" />
      </div>

      {/* Grid overlay */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Floating decorative icons */}
      <div className="hero__float-icon hero__float-icon--1" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(0,234,255,0.6)" strokeWidth="1.5">
          <path d="M23 7l-7 5 7 5V7z"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      </div>
      <div className="hero__float-icon hero__float-icon--2" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(0,234,255,0.5)" strokeWidth="1.5">
          <path d="M23 7l-7 5 7 5V7z"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      </div>
      <div className="hero__float-icon hero__float-icon--3" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(0,234,255,0.5)" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M20.188 10.938C20.725 10.389 21 9.706 21 9c0-1.657-1.343-3-3-3h-.5L16 4H8L6.5 6H6C4.343 6 3 7.343 3 9c0 .706.275 1.389.812 1.938C2.696 11.541 2 12.689 2 14c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4 0-1.311-.696-2.459-1.812-3.062z"/>
        </svg>
      </div>

      {/* Main content */}
      <div className="hero__content" ref={contentRef}>
        <div className="hero__pill">
          <span className="hero__pill-dot" />
          {managedConfig.heroPill}
        </div>

        <h1 className="hero__headline">
          <span className="hero__headline-glow">{managedConfig.heroHeadline}</span>
        </h1>

        <p className="hero__sub">
          {managedConfig.heroSub}
        </p>

        <div className="hero__cta">
          <a 
            href="#projects" 
            className="btn-primary" 
            id="hero-cta-films"
            onClick={(e) => handleLink(e, "projects")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {managedConfig.heroCtaPrimary}
          </a>
          <a 
            href="#contact" 
            className="btn-secondary" 
            id="hero-cta-contact"
            onClick={(e) => handleLink(e, "contact")}
          >
            {managedConfig.heroCtaSecondary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>


    </section>
  );
}
