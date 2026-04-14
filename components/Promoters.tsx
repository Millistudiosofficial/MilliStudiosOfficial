import { promotionalTeam } from "@/lib/data";
import { useAdmin } from "@/context/AdminContext";

export default function Promoters() {
  const { managedPromoters, managedConfig } = useAdmin();
  return (
    <section className="section promoters relative overflow-hidden" id="promoters" aria-labelledby="promoters-title">
      <div className="hero__grid opacity-20" aria-hidden="true" />
      <div className="section__inner relative z-10">
        <div className="reveal" style={{ textAlign: "center" }}>
          <p className="section__tag" style={{ justifyContent: "center" }}>{managedConfig.promotersTag}</p>
          <h2 className="section__title" id="promoters-title" style={{ textAlign: "center" }}>
            {managedConfig.promotersTitle}
          </h2>
          <p className="section__desc" style={{ margin: "0 auto", textAlign: "center" }}>
            {managedConfig.promotersDesc}
          </p>
        </div>
        <div className="team__grid">
          {managedPromoters.map((member, i) => (
            <div key={member.id} className={`team-card reveal reveal--delay-${i + 1}`} id={`promoters-${member.id}`}>
              <div className="team-card__inner">
                {/* FRONT */}
                <div className="team-card__front" style={{ ["--avatar-glow" as string]: `${member.accentColor}4d` }}>
                  <div className="team-card__avatar" style={{ background: `linear-gradient(135deg,${member.accentColor},${member.accentColor}88)` }}>
                    {member.initials}
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
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="team-card__role">{member.role}</p>
                  <div className="team-card__skills">
                    {member.specialties.map(s => (
                      <span key={s} className="team-skill" style={{ borderColor: `${member.accentColor}22`, color: member.accentColor }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="team-card__flip-hint">↻ Hover for details</p>
                </div>
                {/* BACK */}
                <div className="team-card__back" style={{ ["--avatar-glow" as string]: `${member.accentColor}4d` }}>
                  <div className="core-id-flicker" style={{position:"absolute",top:"12px",right:"16px"}} aria-hidden="true">
                    PRM_UNIT: {Math.random().toString(16).slice(2, 6).toUpperCase()}
                  </div>
                  <p className="team-card__back-title">Outreach Credits</p>
                  <p className="team-card__bio">{member.bio}</p>
                  <ul className="team-card__credits">
                    {member.credits.map(c => <li key={c}>{c}</li>)}
                  </ul>
                  <div className="team-card__edu">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
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
