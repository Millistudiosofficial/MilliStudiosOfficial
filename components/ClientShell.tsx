"use client";
import dynamic from "next/dynamic";
import { AdminProvider } from "@/context/AdminContext";

const LiquidMesh = dynamic(() => import("@/components/LiquidMesh"), { ssr: false });
const LensCursor = dynamic(() => import("@/components/LensCursor"), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LiquidMesh />
      <LensCursor />
      <AdminProvider>
        {children}
      </AdminProvider>
    </>
  );
}
