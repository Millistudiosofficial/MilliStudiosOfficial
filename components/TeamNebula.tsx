import { useRef, useEffect } from "react";
import { team } from "@/lib/data";
import { useAdmin } from "@/context/AdminContext";

export default function TeamNebula() {
  const { managedTeam, managedConfig } = useAdmin();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handlers: Array<{ el: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -10;
        const rotateY = ((x - cx) / cx) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = "transform 0.1s ease-out";
      };

      const onLeave = () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        card.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.push({ el: card, move: onMove, leave: onLeave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [managedTeam]);

  return (
    <section className="section team" id="team" aria-labelledby="team-title">
      <div className="section__inner">
        <div className="reveal">
          <p className="section__tag">{managedConfig.teamTag}</p>
          <h2 className="section__title" id="team-title" style={{ whiteSpace: "pre-line" }}>
            {managedConfig.teamTitle}
          </h2>
          <p className="section__desc">
            {managedConfig.teamDesc}
          </p>
        </div>
        <div className="team__grid">
          {managedTeam.map((member, i) => (
            <div 
              key={member.id} 
              className={`team-card reveal reveal--delay-${i+1}`} 
              id={`team-${member.id}`}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <div className="team-card__inner">
                {/* FRONT */}
                <div className="team-card__front" style={{ ["--avatar-glow" as string]: `${member.accentColor}4d` }}>
                  <div className="team-card__avatar" style={{ background: `linear-gradient(135deg,${member.accentColor},${member.accentColor}88)` }}>
                    {(member as any).image ? (
                      <img src={(member as any).image} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      member.initials
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "6px" }}>
                    <h3 className="team-card__name" style={{ marginBottom: 0 }}>{member.name}</h3>
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noreferrer" 
                         style={{ color: member.accentColor, opacity: 0.7, transition: "opacity 0.2s" }}
                         onMouseOver={e => e.currentTarget.style.opacity = "1"}
                         onMouseOut={e => e.currentTarget.style.opacity = "0.7"}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="team-card__role">{member.role}</p>
                  <div className="team-card__skills">
                    {member.specialties.map(s => (
                      <span key={s} className="team-skill" style={{ borderColor:`${member.accentColor}22`, color: member.accentColor }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="team-card__flip-hint">↻ Hover for credits</p>
                </div>
                {/* BACK */}
                <div className="team-card__back" style={{ ["--avatar-glow" as string]: `${member.accentColor}4d` }}>
                  <div className="core-id-flicker" style={{position:"absolute",top:"12px",right:"16px"}} aria-hidden="true">
                    ACCESS_KEY: {Math.random().toString(16).slice(2, 10).toUpperCase()}
                  </div>
                  <p className="team-card__back-title">Project Credits</p>
                  <p className="team-card__bio">{member.bio}</p>
                  <ul className="team-card__credits">
                    {member.credits.map(c => <li key={c}>{c}</li>)}
                  </ul>
                  <div className="team-card__edu">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    {member.edu}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
