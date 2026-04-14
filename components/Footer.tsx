import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";

export default function Footer() {
  const { managedConfig } = useAdmin();
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer" aria-label="Footer">
      <div className="footer__inner">
        {/* Left: Brand */ }
        <div className="footer__brand">
          <Image src="/milli-logo.png" alt="MilliStudios Logo" width={40} height={40} style={{ flexShrink: 0 }} />
          <div>
            <h3 className="footer__brand-name">MilliStudios</h3>
            <span className="footer__brand-tag">{managedConfig.studioMotto}</span>
          </div>
        </div>

        {/* Center: Copyright */ }
        <div className="footer__copyright">
          © {year} MilliStudios.<br />All rights reserved.
        </div>

        {/* Right: Socials */ }
        <div className="footer__socials">
          <a href={managedConfig.socialYoutube} aria-label="YouTube" className="footer__social-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.582 6.186a2.684 2.684 0 00-1.884-1.895C17.973 3.824 12 3.824 12 3.824s-5.973 0-7.698.467a2.684 2.684 0 00-1.884 1.895C2 7.92 2 12 2 12s0 4.08.418 5.814a2.684 2.684 0 001.884 1.895c1.725.467 7.698.467 7.698.467s5.973 0 7.698-.467a2.684 2.684 0 001.884-1.895C22 16.08 22 12 22 12s0-4.08-.418-5.814zm-11.83 8.358V9.456l5.776 2.544-5.776 2.544z"/>
            </svg>
          </a>
          <a href={managedConfig.socialInstagram} aria-label="Instagram" className="footer__social-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href={managedConfig.socialLinkedIn} aria-label="LinkedIn" className="footer__social-btn">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
               <rect x="2" y="9" width="4" height="12"></rect>
               <circle cx="4" cy="4" r="2"></circle>
             </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
