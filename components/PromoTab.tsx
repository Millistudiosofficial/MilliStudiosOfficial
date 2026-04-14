"use client";
import { useAdmin } from "@/context/AdminContext";

interface PromoTabProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function PromoTab({ setActiveTab }: PromoTabProps) {
  const { managedConfig } = useAdmin();
  const handleToggle = () => {
    setActiveTab("promoters");
  };

  return (
    <div className="promo-tab">
      <button 
        className="promo-tab__toggle" 
        onClick={handleToggle}
      >
        <span className="promo-tab__toggle-dot" />
        {managedConfig.promotersTag}
      </button>
    </div>
  );
}
