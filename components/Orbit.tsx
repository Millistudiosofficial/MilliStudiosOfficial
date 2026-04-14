"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";

export default function Orbit() {
  const { managedProjects } = useAdmin();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Take first 3 projects for the orbit grid
  const films = managedProjects.slice(0, 3).map(p => ({
    id: p.id,
    title: p.title,
    year: p.year,
    tags: p.tags,
    image: p.image,
    gradient: p.gradient || "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
    emoji: p.emoji || "🎬",
    link: p.link || "#"
  }));

  // 3D tilt effect
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
        const rotateX = ((y - cy) / cy) * -8;
        const rotateY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      };

      const onLeave = () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
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
  }, []);

  return (
    <section className="section orbit" id="orbit" aria-labelledby="orbit-title">
      <div className="section__inner">
        <div className="orbit__header reveal">
          <div>
            <p className="section__tag">Project Orbit</p>
            <h2 className="section__title" id="orbit-title">
              Films That<br />
              <span style={{ background: "var(--gradient-cyan)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Drift in Space
              </span>
            </h2>
          </div>
          <p className="section__desc" style={{ alignSelf: "flex-end" }}>
            Each project is a universe of its own — handcrafted narratives that challenge,
            move, and inspire.
          </p>
        </div>

        <div className="orbit__grid">
          {films.map((film, i) => (
            <a
              key={film.id}
              href={film.link}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
              id={`film-card-${film.id}`}
            >
              <div
                className={`film-card reveal reveal--delay-${i + 1}`}
                ref={(el) => { cardsRef.current[i] = el; }}
              >
                {/* Thumbnail */}
                <div className="film-card__thumb">
                  {film.image ? (
                    <Image
                      src={film.image}
                      alt={film.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 600px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className="film-thumb-placeholder"
                      style={{ background: film.gradient, height: "100%" }}
                    >
                      {film.emoji}
                    </div>
                  )}
                </div>

                {/* Glow overlay on hover */}
                <div className="film-card__overlay" />

                {/* Play button */}
                <div className="film-card__play" aria-label={`Play ${film.title}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

                {/* Info */}
                <div className="film-card__info">
                  <div className="film-card__tags">
                    {film.tags.map((tag) => (
                      <span key={tag} className="film-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="film-card__title">{film.title}</h3>
                  <p className="film-card__year">{film.year}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
