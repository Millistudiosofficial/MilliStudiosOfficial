"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Save, Trash2, Plus, GripVertical, Image as ImageIcon, 
  Users, Film, MonitorPlay, Settings, Download, Globe, Lock, LayoutDashboard, LogOut
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import Link from "next/link";

export default function AdminPage() {
  const [activeModule, setActiveModule] = useState<"projects" | "team" | "cinema" | "config" | "timeline" | "narrative" | "vault" | "security">("projects");
  const { 
    managedProjects, setProjects, 
    managedTeam, setTeam,
    managedPromoters, setPromoters,
    managedTimeline, setTimeline,
    managedVaultFrames, setVaultFrames,
    managedPasskey, setPasskey,
    syncToLocal, managedConfig, setConfig,
    isAuthenticated, setIsAuthenticated, login, logout
  } = useAdmin();

  const [loginStep, setLoginStep] = useState<"creds" | "otp">("creds");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleCreds = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(mobile, password)) {
      setLoginStep("otp");
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "8888") {
      setIsAuthenticated(true);
      setOtp("");
    } else {
      alert("Invalid OTP code. Try '8888'.");
    }
  };

  // Project Functions
  const addProject = () => {
    const baseProj: any = {
      id: `new-${Date.now()}`,
      title: "New Masterpiece",
      subtitle: "Cinematic Journey",
      category: "Films",
      subCategory: "", 
      year: new Date().getFullYear().toString(),
      tags: ["Creative"],
      image: "",
      gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
      crew: { Director: "Milli Team", DOP: "Milli Team", Editor: "Milli Team", Music: "" },
      link: "",
      featured: false,
      emoji: "🎬"
    };
    setProjects([baseProj, ...managedProjects]);
  };

  const deleteProject = (id: string) => {
    setProjects(managedProjects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, updates: any) => {
    setProjects(managedProjects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ 
      projects: managedProjects, 
      team: managedTeam,
      promoters: managedPromoters,
      timeline: managedTimeline,
      vaultFrames: managedVaultFrames,
      passkey: managedPasskey,
      config: managedConfig 
    }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "milli_data_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Added extra glow for login wall */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="admin-panel p-10 w-full max-w-md relative z-10">
          <div className="flex flex-col items-center gap-6 mb-10">
            <Link href="/" className="hover:scale-110 transition-transform">
              <img src="/milli-logo.png" alt="Milli" className="w-16 h-16 object-contain" />
            </Link>
            <div className="text-center">
              <h1 className="text-white font-display font-bold text-3xl tracking-tighter uppercase">Admin Portal</h1>
              <p className="text-silver-dim text-[10px] uppercase tracking-[0.3em] mt-3 opacity-60">System authorization required</p>
            </div>
          </div>
...

          <AnimatePresence mode="wait">
            {loginStep === "creds" ? (
              <motion.form 
                key="creds"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleCreds}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] uppercase tracking-widest text-silver-dim font-bold ml-1">Terminal ID (Mobile)</label>
                   <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    className="nexus-input"
                  />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] uppercase tracking-widest text-silver-dim font-bold ml-1">Access Key</label>
                   <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="nexus-input"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-gradient-cyan text-obsidian font-bold py-4 rounded-xl text-xs uppercase tracking-widest mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyan/20"
                >
                  Request Authorization
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="otp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleOtp}
                className="flex flex-col gap-4"
              >
                <p className="text-silver-dim text-xs text-center mb-2">Verify identity code sent to your terminal</p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="0 0 0 0"
                  className="nexus-input text-center text-2xl tracking-[0.5em] py-4"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="bg-gradient-cyan text-obsidian font-bold py-4 rounded-xl text-xs uppercase tracking-widest mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyan/20"
                >
                  Confirm Identity
                </button>
                <button 
                  type="button" 
                  onClick={() => setLoginStep("creds")}
                  className="text-silver-dim text-[10px] uppercase tracking-widest hover:text-white transition-colors text-center"
                >
                  ← Back to credentials
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row overflow-hidden relative">
      {/* Removed GPU-heavy blur circles */}

      {/* Sidebar */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 flex flex-col p-6 md:p-8 bg-black/20 backdrop-blur-2xl relative z-20 flex-shrink-0 max-h-[40vh] md:max-h-screen overflow-y-auto">
        <div className="flex items-center gap-4 mb-8 md:mb-12 px-2">
          <Link href="/" className="block w-10 h-10 hover:scale-110 transition-transform flex-shrink-0">
            <img src="/milli-logo.png" alt="M" className="w-full h-full object-contain" />
          </Link>
          <div>
            <h2 className="text-white font-display font-bold text-sm tracking-widest uppercase">Console</h2>
            <p className="text-cyan text-[9px] uppercase tracking-widest mt-1 opacity-70 font-bold">Authorized Access</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <SidebarBtn active={activeModule === "projects"} onClick={() => setActiveModule("projects")} icon={<Film size={20} />} label="Project Matrix" />
          <SidebarBtn active={activeModule === "timeline"} onClick={() => setActiveModule("timeline")} icon={<LayoutDashboard size={20} />} label="Timeline Engine" />
          <SidebarBtn active={activeModule === "narrative"} onClick={() => setActiveModule("narrative")} icon={<MonitorPlay size={20} />} label="Hero & Narrative" />
          <SidebarBtn active={activeModule === "vault"} onClick={() => setActiveModule("vault")} icon={<ImageIcon size={20} />} label="Vault Matrix" />
          <SidebarBtn active={activeModule === "team"} onClick={() => setActiveModule("team")} icon={<Users size={20} />} label="Team Engines" />
          <SidebarBtn active={activeModule === "cinema"} onClick={() => setActiveModule("cinema")} icon={<MonitorPlay size={20} />} label="Atmosphere" />
          <SidebarBtn active={activeModule === "security"} onClick={() => setActiveModule("security")} icon={<Lock size={20} />} label="Security & Brand" />
          <SidebarBtn active={activeModule === "config"} onClick={() => setActiveModule("config")} icon={<Globe size={20} />} label="Global Config" />
        </nav>

        <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-white/5">
           <Link 
            href="/"
            className="flex items-center gap-3 p-3 text-silver-dim font-bold text-[10px] uppercase tracking-widest hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <X size={16} /> Exit to Site
          </Link>

          <button 
            onClick={syncToLocal}
            className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-all text-cyan"
          >
            <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest">
              <Save size={16} /> Sync Local
            </div>
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse group-hover:shadow-[0_0_10px_rgba(0,234,255,0.5)]" />
          </button>
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-3 p-3 text-silver-dim font-bold text-[10px] uppercase tracking-widest hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <Download size={16} /> Export JSON
          </button>

          <button 
            onClick={logout}
            className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <LogOut size={16} /> Terminate
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto p-12 custom-scrollbar relative z-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 flex justify-between items-end">
            <div>
              <p className="text-cyan font-display font-bold text-xs tracking-[0.4em] uppercase mb-3 opacity-80">Management Module</p>
              <h1 className="text-5xl text-white font-display font-bold uppercase tracking-tighter">
                {activeModule === "projects" && "Project Matrix"}
                {activeModule === "timeline" && "Timeline Engine"}
                {activeModule === "narrative" && "Hero & Narrative"}
                {activeModule === "vault" && "Vault Matrix"}
                {activeModule === "team" && "Team Roster"}
                {activeModule === "cinema" && "Atmosphere"}
                {activeModule === "security" && "Security & Brand"}
                {activeModule === "config" && "Global Config"}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={logout}
                className="bg-red-500/20 text-red-500 px-6 py-4 rounded-xl flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-500/30"
              >
                <Lock size={18} /> Lock Console
              </button>
            
              {activeModule === "projects" && (
                <button 
                  onClick={addProject}
                  className="bg-gradient-cyan text-obsidian px-8 py-4 rounded-xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan/20"
                >
                  <Plus size={18} /> New Project
                </button>
              )}
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {activeModule === "projects" && (
                <div className="grid gap-6">
                  {managedProjects.map((p, i) => (
                    <div key={p.id} className="admin-panel p-6 flex gap-8 hover:border-cyan/30 hover:bg-white/[0.07] transition-all group">
                      <div className="w-56 h-32 bg-charcoal rounded-xl overflow-hidden relative flex-shrink-0 border border-white/5 shadow-2xl">
                        {p.image ? (
                          <img src={p.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-silver-dim/30">
                             <ImageIcon size={32} />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                          <Input label="Title" value={p.title} onChange={v => updateProject(p.id, { title: v })} />
                          <Input label="Subtitle" value={p.subtitle || ""} onChange={v => updateProject(p.id, { subtitle: v })} />
                          <Input label="Thumbnail Image URL" value={p.image || ""} onChange={v => updateProject(p.id, { image: v })} />
                          <Input label="Background Gradient" value={p.gradient || ""} onChange={v => updateProject(p.id, { gradient: v })} />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Input label="Year" value={p.year} onChange={v => updateProject(p.id, { year: v })} />
                            <Input label="Category" value={p.category} onChange={v => updateProject(p.id, { category: v })} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input label="Icon/Emoji" value={p.emoji || ""} onChange={v => updateProject(p.id, { emoji: v })} />
                            <div className="nexus-group !mb-0 flex items-center justify-between">
                              <label className="nexus-label">Featured Project</label>
                              <div 
                                onClick={() => updateProject(p.id, { featured: !p.featured })}
                                className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${p.featured ? 'bg-cyan' : 'bg-white/10'}`}
                              >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${p.featured ? 'left-7' : 'left-1'}`} />
                              </div>
                            </div>
                          </div>
                          <Input label="YouTube/Video Link" value={p.link || ""} onChange={v => updateProject(p.id, { link: v })} />
                          <Input label="Tags (Comma separated)" value={(p.tags || []).join(", ")} onChange={v => updateProject(p.id, { tags: v.split(",").map(s => s.trim()) })} />
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end w-12">
                         <button 
                          onClick={() => deleteProject(p.id)}
                          className="p-3 bg-red-500/10 text-red-500/50 hover:text-red-500 hover:bg-red-500/20 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                        <button className="p-3 text-silver-dim/30 hover:text-cyan cursor-grab">
                          <GripVertical size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModule === "team" && (
                <div className="grid gap-12">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-white font-bold text-xl flex items-center gap-4">
                        <div className="p-2 bg-cyan/10 rounded-lg"><Users className="text-cyan" size={20} /></div>
                        Creative Team
                      </h3>
                      <button 
                        onClick={() => setTeam([{ id: `team-${Date.now()}`, name: "New Member", role: "Role", initials: "NM", bio: "", specialties: [], credits: [], accentColor: "#ffffff", edu: "", instagram: "", image: "" }, ...managedTeam])}
                        className="bg-cyan/10 text-cyan px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-cyan/20 transition-all"
                      >
                        <Plus size={16} /> Add Member
                      </button>
                    </div>
                    <div className="grid gap-4">
                      {managedTeam.map(member => (
                        <div key={member.id} className="admin-panel p-8 flex gap-8 items-center">
                          <div className="w-20 h-20 bg-gradient-cyan rounded-2xl flex items-center justify-center text-obsidian font-black text-2xl flex-shrink-0 shadow-lg shadow-cyan/20">
                            {member.initials}
                          </div>
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="flex flex-col gap-4">
                                <Input label="Name" value={member.name} onChange={v => setTeam(managedTeam.map(m => m.id === member.id ? {...m, name: v} : m))} />
                                <Input label="Role" value={member.role} onChange={v => setTeam(managedTeam.map(m => m.id === member.id ? {...m, role: v} : m))} />
                                <Input label="Initials / Accent Hex" value={`${member.initials} / ${member.accentColor}`} onChange={v => {
                                  const [ini, color] = v.split(" / ");
                                  setTeam(managedTeam.map(m => m.id === member.id ? {...m, initials: ini || "XX", accentColor: color || m.accentColor} : m));
                                }} />
                                <Input label="Instagram URL" value={member.instagram || ""} onChange={v => setTeam(managedTeam.map(m => m.id === member.id ? {...m, instagram: v} : m))} />
                                <Input label="Image URL" value={member.image || ""} onChange={v => setTeam(managedTeam.map(m => m.id === member.id ? {...m, image: v} : m))} />
                              </div>
                              <div className="flex flex-col gap-4">
                                <TextArea label="Bio" value={member.bio || ""} onChange={v => setTeam(managedTeam.map(m => m.id === member.id ? {...m, bio: v} : m))} />
                                <Input label="Specialties (Comma Sep)" value={(member.specialties || []).join(", ")} onChange={v => setTeam(managedTeam.map(m => m.id === member.id ? {...m, specialties: v.split(",").map(s=>s.trim())} : m))} />
                                <Input label="Credits (Comma Sep)" value={(member.credits || []).join(", ")} onChange={v => setTeam(managedTeam.map(m => m.id === member.id ? {...m, credits: v.split(",").map(s=>s.trim())} : m))} />
                              </div>
                            </div>
                          <button 
                            onClick={() => setTeam(managedTeam.filter(m => m.id !== member.id))}
                            className="p-3 text-red-500/30 hover:text-red-500 transition-all bg-red-500/5 rounded-xl ml-4 flex-shrink-0"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-white font-bold text-xl flex items-center gap-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg"><Users className="text-purple-400" size={20} /></div>
                        Promotional Team
                      </h3>
                      <button 
                        onClick={() => setPromoters([{ id: `promo-${Date.now()}`, name: "New Promoter", role: "Role", initials: "NP", bio: "", specialties: [], credits: [], accentColor: "#ffffff", edu: "", instagram: "" }, ...managedPromoters])}
                        className="bg-purple-500/10 text-purple-400 px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-purple-500/20 transition-all"
                      >
                        <Plus size={16} /> Add Promoter
                      </button>
                    </div>
                    <div className="grid gap-4">
                      {managedPromoters.map(member => (
                        <div key={member.id} className="admin-panel p-8 flex gap-8 items-center">
                          <div className="w-20 h-20 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 border border-purple-400/20 shadow-lg shadow-purple-500/10">
                            {member.initials}
                          </div>
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="flex flex-col gap-4">
                                <Input label="Name" value={member.name} onChange={v => setPromoters(managedPromoters.map(m => m.id === member.id ? {...m, name: v} : m))} />
                                <Input label="Role" value={member.role} onChange={v => setPromoters(managedPromoters.map(m => m.id === member.id ? {...m, role: v} : m))} />
                                <Input label="Initials / Accent Hex" value={`${member.initials} / ${member.accentColor}`} onChange={v => {
                                  const [ini, color] = v.split(" / ");
                                  setPromoters(managedPromoters.map(m => m.id === member.id ? {...m, initials: ini || "XX", accentColor: color || m.accentColor} : m));
                                }} />
                                <Input label="Instagram URL" value={member.instagram || ""} onChange={v => setPromoters(managedPromoters.map(m => m.id === member.id ? {...m, instagram: v} : m))} />
                              </div>
                              <div className="flex flex-col gap-4">
                                <TextArea label="Bio" value={member.bio || ""} onChange={v => setPromoters(managedPromoters.map(m => m.id === member.id ? {...m, bio: v} : m))} />
                                <Input label="Specialties (Comma Sep)" value={(member.specialties || []).join(", ")} onChange={v => setPromoters(managedPromoters.map(m => m.id === member.id ? {...m, specialties: v.split(",").map(s=>s.trim())} : m))} />
                                <Input label="Credits (Comma Sep)" value={(member.credits || []).join(", ")} onChange={v => setPromoters(managedPromoters.map(m => m.id === member.id ? {...m, credits: v.split(",").map(s=>s.trim())} : m))} />
                              </div>
                            </div>
                          <button 
                            onClick={() => setPromoters(managedPromoters.filter(m => m.id !== member.id))}
                            className="p-3 text-red-500/30 hover:text-red-500 transition-all bg-red-500/5 rounded-xl ml-4 flex-shrink-0"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "timeline" && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-white font-bold text-2xl">Studio Chronicles</h3>
                    <button 
                      onClick={() => setTimeline([{ year: "2026", title: "New Milestone", desc: "Description here...", icon: "✦" }, ...managedTimeline])}
                      className="bg-cyan/10 text-cyan px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-cyan/20 transition-all"
                    >
                      <Plus size={16} /> Add Milestone
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {managedTimeline.map((item, idx) => (
                      <div key={idx} className="admin-panel p-8 flex gap-8 items-start relative group">
                        <div className="flex flex-col gap-4 flex-grow">
                          <div className="grid grid-cols-4 gap-6">
                            <Input label="Year" value={item.year} onChange={v => setTimeline(managedTimeline.map((it, i) => i === idx ? {...it, year: v} : it))} />
                            <div className="col-span-2">
                              <Input label="Title" value={item.title} onChange={v => setTimeline(managedTimeline.map((it, i) => i === idx ? {...it, title: v} : it))} />
                            </div>
                            <Input label="Icon (Emoji/Symbol)" value={item.icon} onChange={v => setTimeline(managedTimeline.map((it, i) => i === idx ? {...it, icon: v} : it))} />
                          </div>
                          <TextArea label="Description" value={item.desc} onChange={v => setTimeline(managedTimeline.map((it, i) => i === idx ? {...it, desc: v} : it))} />
                        </div>
                        <button 
                          onClick={() => setTimeline(managedTimeline.filter((_, i) => i !== idx))}
                          className="p-3 text-red-500/30 hover:text-red-500 transition-all bg-red-500/5 rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule === "vault" && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-white font-bold text-2xl">Studio Vault BTS</h3>
                    <button 
                      onClick={() => setVaultFrames([{ src: null, label: "New BTS Capture" }, ...managedVaultFrames])}
                      className="bg-cyan/10 text-cyan px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-cyan/20 transition-all"
                    >
                      <Plus size={16} /> Add BTS Frame
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {managedVaultFrames.map((frame, idx) => (
                      <div key={idx} className="admin-panel p-6 flex gap-6 items-center relative group">
                        <div className="w-24 h-24 bg-charcoal rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                           {frame.src ? <img src={frame.src} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-silver-dim/20"><ImageIcon size={24} /></div>}
                        </div>
                        <div className="flex-grow flex flex-col gap-3">
                          <Input label="Label" value={frame.label} onChange={v => setVaultFrames(managedVaultFrames.map((f, i) => i === idx ? {...f, label: v} : f))} />
                          <Input label="Image URL" value={frame.src || ""} onChange={v => setVaultFrames(managedVaultFrames.map((f, i) => i === idx ? {...f, src: v || null} : f))} />
                        </div>
                        <button 
                          onClick={() => setVaultFrames(managedVaultFrames.filter((_, i) => i !== idx))}
                          className="absolute top-4 right-4 p-2 text-red-500/30 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule === "cinema" && (
                <div className="grid grid-cols-1 gap-12">
                  <div className="max-w-3xl admin-panel p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-[100px] -mr-32 -mt-32" />
                    <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-4">
                      <div className="p-2 bg-cyan/10 rounded-lg"><MonitorPlay className="text-cyan" size={24} /></div>
                      Atmosphere Adjustment
                    </h3>
                    <div className="space-y-8">
                      <Input 
                        label="Background Video URL (Local or Remote)" 
                        value={managedConfig.cinemaVideo} 
                        onChange={v => setConfig({...managedConfig, cinemaVideo: v})} 
                      />
                      <div className="bg-black/40 rounded-3xl p-8 border border-white/10">
                        <p className="text-silver-dim text-[10px] uppercase tracking-[0.3em] font-bold mb-6 opacity-60">Playback Engine Status</p>
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="w-4 h-4 rounded-full bg-cyan animate-ping absolute opacity-40" />
                            <div className="w-4 h-4 rounded-full bg-cyan shadow-[0_0_15px_rgba(0,234,255,0.6)]" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-white font-bold text-sm uppercase tracking-widest">Active High-Def Stream</span>
                            <span className="text-silver-dim text-[9px] uppercase tracking-widest">Resolving 4K Meta-Layer...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-3xl admin-panel p-12">
                    <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg"><ImageIcon className="text-purple-400" size={24} /></div>
                      Color Grade Reveal
                    </h3>
                    <div className="grid grid-cols-2 gap-8">
                      <Input label="Before Image (RAW)" value={managedConfig.vaultGradeBefore} onChange={v => setConfig({...managedConfig, vaultGradeBefore: v})} />
                      <Input label="After Image (GRADED)" value={managedConfig.vaultGradeAfter} onChange={v => setConfig({...managedConfig, vaultGradeAfter: v})} />
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "security" && (
                <div className="max-w-3xl admin-panel p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] -mr-32 -mt-32" />
                  <h3 className="text-white font-bold text-2xl mb-10 flex items-center gap-4">
                    <div className="p-2 bg-red-500/10 rounded-lg"><Lock className="text-red-400" size={24} /></div>
                    Terminal Security & Identity
                  </h3>
                  
                  <div className="space-y-10">
                    <div className="bg-black/40 rounded-3xl p-8 border border-white/10">
                       <p className="text-silver-dim text-[10px] uppercase tracking-[0.3em] font-bold mb-6 opacity-60">Authentication Override</p>
                       <div className="flex flex-col gap-6">
                         <Input 
                          label="Admin Access Key (Passkey)" 
                          value={managedPasskey} 
                          onChange={v => setPasskey(v)} 
                         />
                         <p className="text-[9px] text-red-500/60 uppercase tracking-widest leading-loose">
                           CAUTION: This key grants total system access. Update with extreme prejudice. 
                           Current key remains persistent in browser memory until next sync.
                         </p>
                       </div>
                    </div>

                    <div className="space-y-8 pt-4">
                       <h4 className="text-white text-xs uppercase tracking-[0.4em] font-bold opacity-60 ml-2">Studio Identity</h4>
                       <Input 
                        label="Global Studio Motto" 
                        value={managedConfig.studioMotto} 
                        onChange={v => setConfig({...managedConfig, studioMotto: v})} 
                       />
                       <p className="text-[10px] text-silver-dim/40 leading-relaxed px-2">
                         This motto appears in the site footer and the immersive cinema mode overlay.
                       </p>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "narrative" && (
                <div className="grid grid-cols-1 gap-12">
                  <div className="admin-panel p-12">
                    <h3 className="text-white font-bold text-2xl mb-10 flex items-center gap-4">
                      <div className="p-2 bg-cyan/10 rounded-lg"><MonitorPlay className="text-cyan" size={24} /></div>
                      Hero Segment
                    </h3>
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 gap-8">
                        <Input label="Pill Text (Top)" value={managedConfig.heroPill} onChange={v => setConfig({...managedConfig, heroPill: v})} />
                        <Input label="Main Headline" value={managedConfig.heroHeadline} onChange={v => setConfig({...managedConfig, heroHeadline: v})} />
                      </div>
                      <TextArea label="Hero Sub-headline" value={managedConfig.heroSub} onChange={v => setConfig({...managedConfig, heroSub: v})} />
                      <div className="grid grid-cols-2 gap-8">
                        <Input label="Primary CTA (Explore)" value={managedConfig.heroCtaPrimary} onChange={v => setConfig({...managedConfig, heroCtaPrimary: v})} />
                        <Input label="Secondary CTA (Inquiry)" value={managedConfig.heroCtaSecondary} onChange={v => setConfig({...managedConfig, heroCtaSecondary: v})} />
                      </div>
                    </div>
                  </div>

                  <div className="admin-panel p-12">
                    <h3 className="text-white font-bold text-2xl mb-10 flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg"><MonitorPlay className="text-purple-400" size={24} /></div>
                      Philosophy & About
                    </h3>
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                        <Input label="Section Tag" value={managedConfig.philosophyTag} onChange={v => setConfig({...managedConfig, philosophyTag: v})} />
                        <Input label="Main Title" value={managedConfig.philosophyTitle} onChange={v => setConfig({...managedConfig, philosophyTitle: v})} />
                      </div>
                      <TextArea label="Lead Quote" value={managedConfig.philosophyQuote} onChange={v => setConfig({...managedConfig, philosophyQuote: v})} />
                      <TextArea label="Body Paragraph 1" value={managedConfig.philosophyBody1} onChange={v => setConfig({...managedConfig, philosophyBody1: v})} />
                      <TextArea label="Body Paragraph 2" value={managedConfig.philosophyBody2} onChange={v => setConfig({...managedConfig, philosophyBody2: v})} />
                      <TextArea label="Services (Comma Separated)" value={managedConfig.philosophyServices} onChange={v => setConfig({...managedConfig, philosophyServices: v})} />
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "config" && (
                <div className="grid grid-cols-1 gap-12">
                  <div className="max-w-3xl admin-panel p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-[100px] -mr-32 -mt-32" />
                    <h3 className="text-white font-bold text-2xl mb-10 flex items-center gap-4">
                      <div className="p-2 bg-cyan/10 rounded-lg"><Globe className="text-cyan" size={24} /></div>
                      Contact Information
                    </h3>
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                        <Input label="Contact Email" value={managedConfig.contactEmail} onChange={v => setConfig({...managedConfig, contactEmail: v})} />
                        <Input label="Phone Number" value={managedConfig.contactPhone} onChange={v => setConfig({...managedConfig, contactPhone: v})} />
                      </div>
                      <Input label="Location" value={managedConfig.contactLocation} onChange={v => setConfig({...managedConfig, contactLocation: v})} />
                    </div>
                  </div>

                  <div className="max-w-3xl admin-panel p-12 relative overflow-hidden">
                    <h3 className="text-white font-bold text-2xl mb-10 flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg"><Globe className="text-purple-400" size={24} /></div>
                      Social Network Links
                    </h3>
                    <div className="space-y-8">
                      <Input label="YouTube URL" value={managedConfig.socialYoutube} onChange={v => setConfig({...managedConfig, socialYoutube: v})} />
                      <Input label="Instagram URL" value={managedConfig.socialInstagram} onChange={v => setConfig({...managedConfig, socialInstagram: v})} />
                      <Input label="LinkedIn URL" value={managedConfig.socialLinkedIn} onChange={v => setConfig({...managedConfig, socialLinkedIn: v})} />
                    </div>
                  </div>

                  <div className="max-w-3xl admin-panel p-12 relative overflow-hidden">
                    <h3 className="text-white font-bold text-2xl mb-10 flex items-center gap-4">
                      <div className="p-2 bg-cyan/10 rounded-lg"><Settings className="text-cyan" size={24} /></div>
                      Section Headers & Navigation Maps
                    </h3>
                    
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h4 className="text-white text-xs uppercase tracking-[0.4em] font-bold opacity-60 ml-2">Team Nebula</h4>
                        <div className="grid grid-cols-2 gap-8">
                          <Input label="Section Tag" value={managedConfig.teamTag} onChange={v => setConfig({...managedConfig, teamTag: v})} />
                          <Input label="Main Title" value={managedConfig.teamTitle} onChange={v => setConfig({...managedConfig, teamTitle: v})} />
                        </div>
                        <TextArea label="Description" value={managedConfig.teamDesc} onChange={v => setConfig({...managedConfig, teamDesc: v})} />
                      </div>

                      <div className="space-y-6 pt-6 border-t border-white/5">
                        <h4 className="text-white text-xs uppercase tracking-[0.4em] font-bold opacity-60 ml-2">Studio Vault</h4>
                        <div className="grid grid-cols-2 gap-8">
                          <Input label="Section Tag" value={managedConfig.vaultTag} onChange={v => setConfig({...managedConfig, vaultTag: v})} />
                          <Input label="Main Title" value={managedConfig.vaultTitle} onChange={v => setConfig({...managedConfig, vaultTitle: v})} />
                        </div>
                        <TextArea label="Description" value={managedConfig.vaultDesc} onChange={v => setConfig({...managedConfig, vaultDesc: v})} />
                      </div>

                      <div className="space-y-6 pt-6 border-t border-white/5">
                        <h4 className="text-white text-xs uppercase tracking-[0.4em] font-bold opacity-60 ml-2">Promoters</h4>
                        <div className="grid grid-cols-2 gap-8">
                          <Input label="Section Tag" value={managedConfig.promotersTag} onChange={v => setConfig({...managedConfig, promotersTag: v})} />
                          <Input label="Main Title" value={managedConfig.promotersTitle} onChange={v => setConfig({...managedConfig, promotersTitle: v})} />
                        </div>
                        <TextArea label="Description" value={managedConfig.promotersDesc} onChange={v => setConfig({...managedConfig, promotersDesc: v})} />
                      </div>

                      <div className="space-y-6 pt-6 border-t border-white/5">
                        <h4 className="text-white text-xs uppercase tracking-[0.4em] font-bold opacity-60 ml-2">Timeline</h4>
                        <div className="grid grid-cols-2 gap-8">
                          <Input label="Section Tag" value={managedConfig.timelineTag} onChange={v => setConfig({...managedConfig, timelineTag: v})} />
                          <Input label="Main Title" value={managedConfig.timelineTitle} onChange={v => setConfig({...managedConfig, timelineTitle: v})} />
                        </div>
                        <TextArea label="Description" value={managedConfig.timelineDesc} onChange={v => setConfig({...managedConfig, timelineDesc: v})} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarBtn({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-300 ${
        active 
          ? "bg-gradient-cyan text-obsidian font-bold shadow-xl shadow-cyan/20 scale-[1.02]" 
          : "text-silver-dim hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className={active ? "text-obsidian" : "text-cyan opacity-60 group-hover:opacity-100"}>{icon}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{label}</span>
    </button>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

function Input({ label, value, onChange, placeholder = "", type = "text" }: InputProps) {
  return (
    <div className="nexus-group !mb-0">
      <label className="nexus-label">{label}</label>
      <input 
        type={type}
        value={value} 
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="nexus-input"
      />
    </div>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function TextArea({ label, value, onChange }: TextAreaProps) {
  return (
    <div className="nexus-group !mb-0">
      <label className="nexus-label">{label}</label>
      <textarea 
        rows={3}
        value={value} 
        onChange={e => onChange(e.target.value)}
        className="nexus-textarea"
      />
    </div>
  );
}
