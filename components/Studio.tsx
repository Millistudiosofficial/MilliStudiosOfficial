"use client";

export default function Studio() {
  const cards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="3"/>
          <path d="M20.188 10.938C20.725 10.389 21 9.706 21 9c0-1.657-1.343-3-3-3h-.5L16 4H8L6.5 6H6C4.343 6 3 7.343 3 9c0 .706.275 1.389.812 1.938C2.696 11.541 2 12.689 2 14c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4 0-1.311-.696-2.459-1.812-3.062z"/>
        </svg>
      ),
      title: "Cinematic Direction",
      desc: "Visually-driven storytelling with a sharp eye for composition, light, and human emotion.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 16.1A5 5 0 0 1 5.5 8h.5a7 7 0 1 1 14 0h.5a5 5 0 0 1 1.1 8"/>
          <line x1="12" y1="16" x2="12" y2="23"/>
          <polyline points="8 20 12 16 16 20"/>
        </svg>
      ),
      title: "Post Production",
      desc: "Color grading, sound design, and VFX that bring raw footage to cinematic life.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: "Creative Production",
      desc: "From concept to final cut — music videos, short films, and brand narratives.",
    },
  ];

  return (
    <section className="section studio" id="studio" aria-labelledby="studio-title">
      <div className="section__inner">
        <div className="studio__grid">
          {/* Left: Text */}
          <div className="studio__text reveal">
            <p className="section__tag">The Studio</p>
            <h2 className="section__title" id="studio-title">
              Where Gravity<br />
              <span style={{ background: "var(--gradient-cyan)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Meets Story
              </span>
            </h2>
            <p>
              MilliStudios is an independent cinematic production house born from a passion for
              authentic storytelling. We believe every frame is a canvas — every story, a journey.
            </p>
            <p>
              Based in the heart of Telugu cinema, we collaborate with visionary directors, writers,
              and artists to produce films that resonate far beyond the screen.
            </p>

            <div className="studio__stats">
              <div className="stat">
                <span className="stat__num">8+</span>
                <span className="stat__label">Productions</span>
              </div>
              <div className="stat">
                <span className="stat__num">4K</span>
                <span className="stat__label">Quality</span>
              </div>
              <div className="stat">
                <span className="stat__num">3+</span>
                <span className="stat__label">Years Active</span>
              </div>
            </div>
          </div>

          {/* Right: Glass Cards */}
          <div className="studio__cards">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`glass-card studio__card reveal reveal--delay-${i + 1}`}
              >
                <div className="studio__card-icon">{card.icon}</div>
                <h3 className="studio__card-title">{card.title}</h3>
                <p className="studio__card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
