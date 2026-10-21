import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import { identity, languages } from "@/data/cv";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s · Gloria SODJAHIN" },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Gloria Sodjahin" }],
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Gloria SODJAHIN",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#7b3fe4",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gloria Sodjahin",
  jobTitle: identity.title,
  image: `${SITE_URL}${identity.photo}`,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abomey-Calavi",
    addressCountry: "BJ",
  },
  knowsLanguage: languages.map((l) => l.name),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable} ${greatVibes.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#contenu"
          className="sr-only z-[200] rounded-full bg-prune-950 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
