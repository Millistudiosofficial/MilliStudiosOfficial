"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutPhilosophy from "@/components/AboutPhilosophy";
import TeamNebula from "@/components/TeamNebula";
import ProjectMatrix from "@/components/ProjectMatrix";
import Promoters from "@/components/Promoters";
import StudioVault from "@/components/StudioVault";
import Timeline from "@/components/Timeline";
import ClientNexus from "@/components/ClientNexus";
import Footer from "@/components/Footer";
import AdminFAB from "@/components/AdminFAB";
import PromoTab from "@/components/PromoTab";
const LogoIntro = dynamic(() => import("@/components/LogoIntro"), { ssr: false });

// Dynamic imports for canvas/cursor (client-only)
export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  // Scroll reveal
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); });
    },{ threshold:0.1, rootMargin:"0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  },[activeTab]);

  return (
    <div className="app-container relative">
      <LogoIntro />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="tab-content">
        {activeTab === "home" && <Hero setActiveTab={setActiveTab} />}
        {activeTab === "about" && <AboutPhilosophy />}
        {activeTab === "projects" && <ProjectMatrix />}
        {activeTab === "team" && <TeamNebula />}
        {activeTab === "promoters" && <Promoters />}
        {activeTab === "legacy" && (
          <>
            <StudioVault />
            <Timeline />
          </>
        )}
        {activeTab === "contact" && <ClientNexus />}
      </main>
      <Footer />
      {activeTab === "home" && <PromoTab setActiveTab={setActiveTab} />}
      
      <AdminFAB />
    </div>
  );
}
