"use client";
import React, { useRef, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

export default function Timeline() {
  const { managedTimeline, managedConfig } = useAdmin();
  const itemRefs = useRef<(HTMLDivElement|null)[]>([]);
  
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold:0.3 });
    itemRefs.current.forEach(el => { if(el) obs.observe(el); });
    return () => obs.disconnect();
  }, [managedTimeline]);

  return (
    <section className="section timeline-section relative overflow-hidden" id="timeline" aria-labelledby="timeline-title">
      <div className="hero__grid opacity-20" aria-hidden="true" />
      <div className="section__inner relative z-10">
        <div className="reveal">
          <p className="section__tag">{managedConfig.timelineTag}</p>
          <h2 className="section__title" id="timeline-title" style={{ whiteSpace: "pre-line" }}>
            {managedConfig.timelineTitle}
          </h2>
          <p className="section__desc">
            {managedConfig.timelineDesc}
          </p>
        </div>
        <div className="timeline">
          {managedTimeline.map((item, i) => (
            <div key={i} className="timeline-item" ref={el => { itemRefs.current[i]=el; }} style={{ width: "100%", maxWidth: "800px" }}>
              <div className="timeline-item__dot">{item.icon}</div>
              <p className="timeline-item__year">{item.year}</p>
              <h3 className="timeline-item__title">{item.title}</h3>
              <p className="timeline-item__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
