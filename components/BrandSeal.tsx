"use client";
import Image from "next/image";

export default function BrandSeal() {
  return (
    <div className="brand-seal" id="brand-seal">
      <div className="brand-seal__inner">
        <Image 
          src="/milli-logo.png" 
          alt="Studio Seal" 
          width={40} 
          height={40} 
          style={{ opacity: 0.8 }}
        />
      </div>
    </div>
  );
}
