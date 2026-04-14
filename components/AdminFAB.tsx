"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

export default function AdminFAB() {
  return (
    <div 
      key="admin-fab-root"
      className="fixed z-[99999] flex flex-col items-end gap-2"
      style={{ bottom: '1.5rem', right: '1.5rem', position: 'fixed' }}
    >
      <Link href="/admin">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group flex items-center justify-center transition-all duration-300 cursor-none"
          style={{ width: '1cm', height: '1cm' }}
        >
          <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 rounded-full blur-2xl transition-opacity" />
          
          <div className="flex items-center justify-center w-full h-full relative z-10 p-2">
            <img 
              src="/milli-logo.png" 
              alt="M" 
              className="w-full h-full object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" 
            />
          </div>
          
          {/* Subtle glow pulse */}
          <div className="absolute -inset-4 bg-cyan/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none rounded-full" />
          
          {/* Hover Label */}
          <div className="absolute right-[1.2cm] bg-obsidian/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[9px] text-white uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
            Admin Console
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
