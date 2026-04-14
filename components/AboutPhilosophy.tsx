"use client";
import { useAdmin } from "@/context/AdminContext";

export default function AboutPhilosophy() {
  const { managedConfig } = useAdmin();
  
  // Parse comma separated services
  const services = managedConfig.philosophyServices
    ? managedConfig.philosophyServices.split(",").map(s => s.trim()).filter(Boolean)
    : ["Visual Storytelling", "Film Direction", "Cinematography", "Music Covers & Arrangements", "Post-Production / Editing", "Digital Media Creation"];

  return (
    <section className="section philosophy" id="studio" aria-labelledby="philosophy-title">
      <div className="blueprint-grid" />
      <div className="section__inner">
        <div className="reveal" style={{ textAlign: "center" }}>
          <p className="section__tag" style={{ justifyContent: "center" }}>{managedConfig.philosophyTag}</p>
          <h2 className="section__title" id="philosophy-title" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 16px" }}>
            {managedConfig.philosophyTitle}
          </h2>
        </div>
        <div className="philosophy__glass reveal reveal--delay-1">
          <p className="philosophy__quote" style={{ fontStyle: "italic", opacity: 0.9 }}>
            "{managedConfig.philosophyQuote}"
          </p>
          <p className="philosophy__body" style={{ color: "var(--silver)", fontSize: "1.05rem" }}>
            {managedConfig.philosophyBody1}
          </p>
          <p className="philosophy__body" style={{ color: "var(--silver-dim)" }}>
            {managedConfig.philosophyBody2}
          </p>
          <div className="philosophy__tags" style={{ justifyContent: "center", marginTop: "40px" }}>
            {services.map(t => (
              <span key={t} className="philosophy__tag" style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
