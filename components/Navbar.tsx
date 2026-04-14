"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const CinemaMode = dynamic(() => import("@/components/CinemaMode"), { ssr: false });

const NAV_LINKS = [
  { label:"Home", id:"home" },
  { label:"About", id:"about" },
  { label:"Projects", id:"projects" },
  { label:"Team", id:"team" },
  { label:"Behind the Scene", id:"legacy" },
  { label:"Contact", id:"contact" },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleTabClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const getMobileContent = (link: typeof NAV_LINKS[0]) => {
    switch (link.id) {
      case "home": return <div className="nav-dot" />;
      case "about": return "ME";
      case "projects": return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
      case "team": return "3A";
      case "legacy": return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        </svg>
      );
      case "contact": return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      );
      default: return "";
    }
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`} aria-label="Main Navigation">
      <div className="nav__inner">
        <div className="nav__brand">
          <a href="#" className="nav__logo" id="nav-logo" aria-label="MilliStudios" onClick={(e) => handleTabClick(e, "home")}>
            <Image 
              src="/milli-logo.png" 
              width={32} 
              height={32} 
              alt="MilliStudios Logo"
              style={{ flexShrink: 0 }}
            />
            <span className="nav__logo-text">MilliStudios</span>
          </a>
          
          <ul className="nav__pill nav__pill--desktop">
            {NAV_LINKS.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`nav__link ${activeTab === l.id ? "nav__link--active" : ""}`}
                  onClick={(e) => handleTabClick(e, l.id)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li><CinemaMode /></li>
          </ul>

          <ul className="nav__pill nav__pill--mobile">
            {NAV_LINKS.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`nav__link-compact ${activeTab === l.id ? "nav__link-compact--active" : ""}`}
                  onClick={(e) => handleTabClick(e, l.id)}
                  aria-label={l.label}
                >
                  {getMobileContent(l)}
                </a>
              </li>
            ))}
            <li>
              <CinemaMode iconOnly />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
