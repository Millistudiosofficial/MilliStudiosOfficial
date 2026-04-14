"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { team, projects, timeline, promotionalTeam } from "@/lib/data";

interface AdminContextType {
  managedProjects: typeof projects;
  managedTeam: typeof team;
  managedPromoters: typeof promotionalTeam;
  managedTimeline: typeof timeline;
  managedVaultFrames: { src: string | null; label: string }[];
  managedConfig: {
    contactEmail: string;
    contactPhone: string;
    contactLocation: string;
    cinemaVideo: string;
    socialYoutube: string;
    socialInstagram: string;
    socialLinkedIn: string;
    // Branding overrides
    studioMotto: string;
    // Hero Fields
    heroPill: string;
    heroHeadline: string;
    heroSub: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    // Philosophy Fields
    philosophyTag: string;
    philosophyTitle: string;
    philosophyQuote: string;
    philosophyBody1: string;
    philosophyBody2: string;
    philosophyServices: string; // Comma separated for easy editing
    // Vault Comparison Fields
    vaultGradeBefore: string;
    vaultGradeAfter: string;
    // Team Fields
    teamTag: string;
    teamTitle: string;
    teamDesc: string;
    // Vault Fields
    vaultTag: string;
    vaultTitle: string;
    vaultDesc: string;
    // Promoters Fields
    promotersTag: string;
    promotersTitle: string;
    promotersDesc: string;
    // Timeline Fields
    timelineTag: string;
    timelineTitle: string;
    timelineDesc: string;
  };
  setProjects: React.Dispatch<React.SetStateAction<typeof projects>>;
  setTeam: React.Dispatch<React.SetStateAction<typeof team>>;
  setPromoters: React.Dispatch<React.SetStateAction<typeof promotionalTeam>>;
  setTimeline: React.Dispatch<React.SetStateAction<typeof timeline>>;
  setVaultFrames: React.Dispatch<React.SetStateAction<{ src: string | null; label: string }[]>>;
  setConfig: React.Dispatch<React.SetStateAction<any>>;
  syncToLocal: () => void;
  managedPasskey: string;
  setPasskey: (val: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  login: (mobile: string, pass: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [managedProjects, setProjects] = useState(projects);
  const [managedTeam, setTeam] = useState(team);
  const [managedPromoters, setPromoters] = useState(promotionalTeam);
  const [managedTimeline, setTimeline] = useState(timeline);
  const [managedPasskey, setPasskey] = useState("MILLI2026");
  const [managedVaultFrames, setVaultFrames] = useState<{ src: string | null; label: string }[]>([
    { src: "/nija-chitram.png", label: "Nija Chitram — BTS" },
    { src: "/oo-katha.png", label: "Oo Katha — Behind the Lens" },
    { src: "/oo-priyathama.png", label: "Oo Priyathama — Set" },
    { src: null, label: "Sound Studio — Dany" },
    { src: null, label: "Location Scout" },
    { src: null, label: "Director's Monitor" },
  ]);
  const [managedConfig, setConfig] = useState({
    contactEmail: "admin@millistudios.com",
    contactPhone: "+91 916421424",
    contactLocation: "KL University, IN",
    cinemaVideo: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-filmmaker-on-set-42657-large.mp4",
    socialYoutube: "https://www.youtube.com/channel/UCy9_-gmTKe72GJCeBWrCF-A",
    socialInstagram: "https://www.instagram.com/millistudiosofficial/",
    socialLinkedIn: "#",
    studioMotto: "Defying Creative Gravity",
    // Default Hero Content
    heroPill: "Cinematic Production House",
    heroHeadline: "MilliStudios",
    heroSub: "We craft stories that transcend the screen. From immersive narratives to breathtaking visuals — we push cinema beyond the possible.",
    heroCtaPrimary: "Explore Films",
    heroCtaSecondary: "Collaborate",
    // Default Philosophy Content
    philosophyTag: "The Vision",
    philosophyTitle: "Beyond The Lens",
    philosophyQuote: "MilliStudiosOfficial is a premium creative production house specializing in high-fidelity short films and cinematic sonic experiences.",
    philosophyBody1: "MilliStudiosOfficial is an elite creative collective specializing in high-quality short films and cinematic soundscapes. We are dedicated to bringing unique stories to life through visually stunning and emotionally resonant digital content.",
    philosophyBody2: "Driven by a passion for collaboration, we bridge the gap between professional production and emerging talent. We provide a dedicated platform for filmmakers, singers, actors, and editors to learn, grow, and showcase their skills alongside a supportive community.",
    philosophyServices: "Visual Storytelling, Film Direction, Cinematography, Music Covers & Arrangements, Post-Production / Editing, Digital Media Creation",
    // Default Vault Comparison
    vaultGradeBefore: "/nija-chitram.png",
    vaultGradeAfter: "/nija-chitram.png",
    teamTag: "Team Milli",
    teamTitle: "The Minds Behind\nthe Milli",
    teamDesc: "Hover a card to see their project credits.",
    vaultTag: "Behind the Scene",
    vaultTitle: "Behind the\nLens",
    vaultDesc: "BTS moments from the MilliStudiosOfficial archive.",
    promotersTag: "Promo Team Milli",
    promotersTitle: "The Voice of\nthe Milli",
    promotersDesc: "The collective driving the studio's global outreach.",
    timelineTag: "The Journey",
    timelineTitle: "From Campus\nto Cinema",
    timelineDesc: "KL University → MilliStudios → Beyond Gravity.",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedData = localStorage.getItem("milli_admin_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.team) setTeam(parsed.team);
      if (parsed.promoters) setPromoters(parsed.promoters);
      if (parsed.timeline) setTimeline(parsed.timeline);
      if (parsed.vaultFrames) setVaultFrames(parsed.vaultFrames);
      if (parsed.passkey) setPasskey(parsed.passkey);
      if (parsed.config) setConfig(parsed.config);
    }

    const savedAuth = localStorage.getItem("milli_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSetAuthenticated = (val: boolean) => {
    setIsAuthenticated(val);
    localStorage.setItem("milli_admin_auth", val.toString());
  };

  const syncToLocal = () => {
    const data = {
      projects: managedProjects,
      team: managedTeam,
      promoters: managedPromoters,
      timeline: managedTimeline,
      vaultFrames: managedVaultFrames,
      passkey: managedPasskey,
      config: managedConfig,
    };
    localStorage.setItem("milli_admin_data", JSON.stringify(data));
    alert("Data synchronized. Your security settings and branding are now persistent.");
  };

  const login = (mobile: string, pass: string) => {
    if (mobile === "916421424" && pass === managedPasskey) {
      return true;
    }
    return false;
  };

  const logout = () => handleSetAuthenticated(false);

  return (
    <AdminContext.Provider value={{
      managedProjects, managedTeam, managedPromoters, managedTimeline, managedVaultFrames, managedConfig, managedPasskey,
      setProjects, setTeam, setPromoters, setTimeline, setVaultFrames, setConfig, setPasskey,
      syncToLocal, isAuthenticated, setIsAuthenticated: handleSetAuthenticated, login, logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
