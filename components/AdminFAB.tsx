"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminFAB() {
  return (
    <div className="admin-fab">
      <Link href="/admin">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="admin-fab__btn"
          aria-label="Admin Console"
        >
          {/* Neon Plus Icon */}
          <svg 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>

          {/* Label Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-1 bg-obsidian/90 backdrop-blur-md border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap text-[8px] uppercase tracking-widest font-bold text-white shadow-2xl">
            Secure Console
          </div>
        </motion.button>
      </Link>
    </div>
  );
}
