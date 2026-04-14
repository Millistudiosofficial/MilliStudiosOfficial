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
    <section className="section timeline-section" id="timeline" aria-labelledby="timeline-title">
      <div className="section__inner">
        <div className="reveal" style={{textAlign:"center"}}>
          <p className="section__tag" style={{justifyContent:"center"}}>{managedConfig.timelineTag}</p>
          <h2 className="section__title" id="timeline-title" style={{textAlign:"center", whiteSpace: "pre-line"}}>
            {managedConfig.timelineTitle}
          </h2>
          <p className="section__desc" style={{margin:"0 auto",textAlign:"center"}}>
            {managedConfig.timelineDesc}
          </p>
        </div>
        <div className="timeline" style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 auto", maxWidth: "900px" }}>
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
