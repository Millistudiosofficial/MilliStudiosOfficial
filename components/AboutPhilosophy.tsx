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
      <div className="section__inner">
        <div className="reveal" style={{textAlign:"center"}}>
          <p className="section__tag" style={{justifyContent:"center"}}>{managedConfig.philosophyTag}</p>
          <h2 className="section__title" id="philosophy-title" style={{textAlign:"center"}}>
            {managedConfig.philosophyTitle}
          </h2>
        </div>
        <div className="philosophy__glass reveal reveal--delay-1">
          <p className="philosophy__quote">
            "{managedConfig.philosophyQuote}"
          </p>
          <p className="philosophy__body">
            {managedConfig.philosophyBody1}
          </p>
          <p className="philosophy__body">
            {managedConfig.philosophyBody2}
          </p>
          <div className="philosophy__tags">
            {services.map(t => (
              <span key={t} className="philosophy__tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
