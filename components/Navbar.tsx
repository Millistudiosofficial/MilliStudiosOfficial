"use client";
import { useEffect, useRef, useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled?" scrolled":""}`} id="nav">
        <div className="nav__inner">
          <a href="#" className="nav__logo" id="nav-logo" aria-label="MilliStudios" onClick={(e) => handleTabClick(e, "home")}>
            <Image
              src="/milli-logo.png"
              alt="MilliStudios Logo"
              width={32}
              height={32}
              style={{ flexShrink: 0 }}
            />
            MilliStudios
          </a>
          <ul className="nav__pill">
            {NAV_LINKS.map(l => (
              <li key={`desktop-${l.id}`}>
                <a 
                  href={`#${l.id}`} 
                  className={activeTab === l.id ? "active" : ""} 
                  onClick={(e) => handleTabClick(e, l.id)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__right">
            <CinemaMode />
            <button className="nav__hamburger" id="nav-hamburger" aria-label="Menu" onClick={()=>setMobileOpen(true)}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav${mobileOpen?" open":""}`} id="mobile-nav">
        <button className="mobile-nav__close" onClick={()=>setMobileOpen(false)}>✕</button>
        <ul className="mobile-nav__links">
          {NAV_LINKS.map(l => (
            <li key={`mobile-${l.id}`}>
              <a 
                href={`#${l.id}`} 
                className={activeTab === l.id ? "active-mobile" : ""}
                onClick={(e) => handleTabClick(e, l.id)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
