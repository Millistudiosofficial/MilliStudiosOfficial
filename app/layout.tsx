import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MilliStudios — Defying Creative Gravity",
  description:
    "MilliStudios is a cinematic production house and technology collective. Films, music, UI/UX design, and game development — all defying creative gravity.",
  keywords: [
    "MilliStudios", "Akhil", "Subhani Basha", "Dany",
    "Nija Chitram", "Oo Katha", "Oo Priyathama",
    "Telugu films", "cinematography", "Antigravity", "KL University",
  ],
  openGraph: {
    title: "MilliStudios — Defying Creative Gravity",
    description: "A cinematic production house defying creative gravity.",
    type: "website",
  },
  icons: {
    icon: "/milli-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
