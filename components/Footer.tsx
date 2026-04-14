import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";

export default function Footer() {
  const { managedConfig } = useAdmin();
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer" aria-label="Footer">
      <div className="footer__inner footer__inner--single">
        <div className="footer__brand-minimal">
          <Image src="/milli-logo.png" alt="" width={24} height={24} />
          <span className="footer__name">MilliStudiosOfficial</span>
        </div>
        
        <div className="footer__divider" />
        
        <div className="footer__copyright-minimal">
          © {year} All rights reserved.
        </div>

        <div className="footer__divider" />

        <div className="footer__socials-minimal">
          <a href={managedConfig.socialYoutube} aria-label="YouTube">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186a2.684 2.684 0 00-1.884-1.895C17.973 3.824 12 3.824 12 3.824s-5.973 0-7.698.467a2.684 2.684 0 00-1.884 1.895C2 7.92 2 12 2 12s0 4.08.418 5.814a2.684 2.684 0 001.884 1.895c1.725.467 7.698.467 7.698.467s5.973 0 7.698-.467a2.684 2.684 0 001.884-1.895C22 16.08 22 12 22 12s0-4.08-.418-5.814zm-11.83 8.358V9.456l5.776 2.544-5.776 2.544z"/></svg>
          </a>
          <a href={managedConfig.socialInstagram} aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
