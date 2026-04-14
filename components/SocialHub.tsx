"use client";

import { useAdmin } from "@/context/AdminContext";

const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1c0 2.2.3 4.4.3 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 22 12 22 12 22s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.4v-2.1C23.3 9.2 23 7 23 7zM9.7 15.5V8.3l8 3.6-8 3.6z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function SocialHub() {
  const { managedConfig } = useAdmin();
  return (
    <section className="section social-hub" id="social" aria-labelledby="social-title">
      <div className="section__inner">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 12 }}>
          <p className="section__tag" style={{ justifyContent: "center" }}>Social Hub</p>
          <h2 className="section__title" id="social-title" style={{ textAlign: "center" }}>
            Follow the{" "}
            <span style={{ background: "var(--gradient-cyan)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Journey
            </span>
          </h2>
          <p className="section__desc" style={{ margin: "12px auto 0", textAlign: "center" }}>
            Behind-the-scenes magic, new releases &amp; cinematic moments — live.
          </p>
        </div>

        <div className="social-hub__grid">
          {/* Instagram Card */}
          <div className="glass-card social-card social-card--instagram reveal reveal--delay-1">
            <div className="social-card__icon" id="social-instagram-icon">
              <InstagramIcon />
            </div>
            <p className="social-card__platform">Instagram</p>
            <h3 className="social-card__title">@MilliStudios</h3>
            <p className="social-card__desc">
              Cinematic BTS shots, film stills, and raw behind-the-lens moments.
              Visual storytelling at its finest.
            </p>
            <a
              href={managedConfig.socialInstagram}
              target="_blank"
              rel="noreferrer"
              className="social-card__link"
              id="social-instagram-link"
            >
              Follow on Instagram <ArrowIcon />
            </a>
          </div>

          {/* YouTube Card */}
          <div className="glass-card social-card social-card--youtube reveal reveal--delay-2">
            <div className="social-card__icon" id="social-youtube-icon">
              <YoutubeIcon />
            </div>
            <p className="social-card__platform">YouTube</p>
            <h3 className="social-card__title">MilliStudios</h3>
            <p className="social-card__desc">
              Films, music videos, cinematography reels, and full productions.
              Watch the universe we&apos;ve built — frame by frame.
            </p>
            <a
              href={managedConfig.socialYoutube}
              target="_blank"
              rel="noreferrer"
              className="social-card__link"
              id="social-youtube-link"
            >
              Subscribe on YouTube <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Floating Social Icons */}
        <div className="social-hub__float reveal reveal--delay-3">
          <a
            href={managedConfig.socialInstagram}
            target="_blank"
            rel="noreferrer"
            className="float-icon float-icon--instagram"
            id="social-float-instagram"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href={managedConfig.socialYoutube}
            target="_blank"
            rel="noreferrer"
            className="float-icon float-icon--youtube"
            id="social-float-youtube"
            aria-label="YouTube"
          >
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
