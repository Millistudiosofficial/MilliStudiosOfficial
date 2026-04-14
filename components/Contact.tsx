"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";

interface MeshDot {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  dur: number;
  delay: number;
}

function MeshDots() {
  const [dots, setDots] = useState<MeshDot[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200,
      dur: 6 + Math.random() * 8,
      delay: Math.random() * -10,
    }));
    setDots(generated);
  }, []);

  return (
    <>
      {dots.map((d) => (
        <div
          key={d.id}
          className="mesh-dot"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            ["--dx" as string]: `${d.dx}px`,
            ["--dy" as string]: `${d.dy}px`,
          }}
        />
      ))}
    </>
  );
}

export default function Contact() {
  const { managedConfig } = useAdmin();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      {/* Mesh dots background */}
      <div className="contact__mesh" aria-hidden="true">
        <MeshDots />
      </div>

      <div className="section__inner">
        <div className="reveal" style={{ textAlign: "center" }}>
          <p className="section__tag" style={{ justifyContent: "center" }}>Collaborate</p>
          <h2
            className="section__title"
            id="contact-title"
            style={{ textAlign: "center" }}
          >
            Let&apos;s Create{" "}
            <span
              style={{
                background: "var(--gradient-cyan)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Together
            </span>
          </h2>
        </div>

        <div className="contact__content">
          {/* Left info */}
          <div className="contact__left reveal reveal--delay-1">
            <p>
              Have a project in mind? A story to tell? Or just want to say hello?
              We&apos;re always open to new creative collaborations — whether it&apos;s a feature film,
              a music video, a brand narrative, or something entirely new.
            </p>
            <p>
              Reach out and let&apos;s make something extraordinary together.
            </p>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span>{managedConfig.contactEmail}</span>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span>{managedConfig.contactLocation}</span>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span>Response within 24–48 hours</span>
            </div>
          </div>

          {/* Glass form */}
          <div className="glass-card contact__form reveal reveal--delay-2">
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  minHeight: 300,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "var(--cyan-dark)",
                    border: "1px solid rgba(0,234,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--cyan)",
                    boxShadow: "0 0 30px rgba(0,234,255,0.2)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--white)", marginBottom: 8 }}>
                    Message Sent!
                  </p>
                  <p style={{ color: "var(--silver)", fontSize: "0.9rem" }}>
                    We&apos;ll be in touch soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-project">Project Type</label>
                  <input
                    id="contact-project"
                    type="text"
                    className="form-input"
                    placeholder="Feature film, music video, brand story…"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="Tell us about your project and vision…"
                    required
                  />
                </div>

                <button type="submit" className="form-submit" id="contact-submit">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
