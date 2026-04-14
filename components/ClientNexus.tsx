"use client";
import { useState } from "react";

type ProjectType = "Short Film"|"Music Video"|"Brand Ad"|"UI/UX Design"|"";
const TYPES: ProjectType[] = ["Short Film","Music Video","Brand Ad","UI/UX Design"];
const WEEKS = ["1 Week","2 Weeks","1 Month","6 Weeks","2 Months","3 Months"];

export default function ClientNexus() {
  const [type, setType] = useState<ProjectType>("");
  const [weeks, setWeeks] = useState(2);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSent(true);
    setTimeout(()=>setSent(false), 5000);
  };

  return (
    <section className="section nexus" id="contact" aria-labelledby="nexus-title">
      <div className="section__inner">
        <div className="reveal" style={{textAlign:"center"}}>
          <p className="section__tag" style={{justifyContent:"center"}}>Client Nexus</p>
          <h2 className="section__title" id="nexus-title" style={{textAlign:"center"}}>
            Launch an<br/><span className="grad-text">Inquiry</span>
          </h2>
          <p className="section__desc" style={{margin:"0 auto 0",textAlign:"center"}}>
            High-end clients only. Let's build something extraordinary.
          </p>
        </div>

        <div className="nexus__console reveal reveal--delay-1">
          {/* Console bar */}
          <div className="nexus__console-bar">
            <span className="console-dot console-dot--r"/>
            <span className="console-dot console-dot--y"/>
            <span className="console-dot console-dot--g"/>
            <span className="console-label">MILLISTUDIOS · CLIENT NEXUS v2.0</span>
          </div>

          <div className="nexus__body">
            {sent ? (
              <div className="nexus-success">
                <div className="nexus-success__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="nexus-success__title">Inquiry Launched ✦</p>
                <p className="nexus-success__sub">We'll respond within 24–48 hours. Stay in orbit.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="nexus-form" noValidate>
                {/* Name + Email */}
                <div className="nexus-row">
                  <div className="nexus-group">
                    <label className="nexus-label" htmlFor="nexus-name">Your Name</label>
                    <input id="nexus-name" type="text" className="nexus-input" placeholder="Full name" required/>
                  </div>
                  <div className="nexus-group">
                    <label className="nexus-label" htmlFor="nexus-email">Email</label>
                    <input id="nexus-email" type="email" className="nexus-input" placeholder="you@studio.com" required/>
                  </div>
                </div>

                {/* Project Type */}
                <div className="nexus-group">
                  <label className="nexus-label">Project Type</label>
                  <div className="nexus-type">
                    {TYPES.map(t => (
                      <button type="button" key={t} className={`type-btn${type===t?" active":""}`} onClick={()=>setType(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline Slider */}
                <div className="nexus-group">
                  <label className="nexus-label">Estimated Timeline</label>
                  <div className="nexus-slider-wrap">
                    <input type="range" className="nexus-slider" id="nexus-timeline"
                      min={0} max={WEEKS.length-1} step={1} value={weeks}
                      onChange={e=>setWeeks(Number(e.target.value))}/>
                    <p className="nexus-slider-val">⏱ {WEEKS[weeks]}</p>
                    <div className="nexus-slider-labels">
                      <span>1 Week</span><span>3 Months</span>
                    </div>
                  </div>
                </div>

                {/* Visual Reference */}
                <div className="nexus-group">
                  <label className="nexus-label" htmlFor="nexus-ref">Visual Reference Link</label>
                  <input id="nexus-ref" type="url" className="nexus-input" placeholder="https://vimeo.com/your-inspiration"/>
                </div>

                {/* Message */}
                <div className="nexus-group">
                  <label className="nexus-label" htmlFor="nexus-msg">Project Vision</label>
                  <textarea id="nexus-msg" className="nexus-textarea" placeholder="Describe your project, goals, and the story you want to tell..." required/>
                </div>

                <button type="submit" className="nexus-submit" id="nexus-submit">
                  ✦ Launch Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
