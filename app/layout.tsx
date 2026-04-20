import Providers from "@/provider/providers";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans, Geist_Mono } from "next/font/google";
import { AuthGuard } from "@/provider/auth-guard";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsentBanner } from "@/components/gdpr/cookie-consent-banner";
import { Analytics } from "@vercel/analytics/next"
import { APP_NAME, APP_VERSION } from "@/constants/app";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chat Noir — The Ultimate Cat Archive",
    template: "%s | Chat Noir",
  },
  description:
    "A curated database of cats across all categories — browsable, searchable, and open to the archive. Discover, favorite, and submit cats.",
  keywords: ["cats", "cat archive", "cat database", "cat photos", "cat breeds", "ChatNoir"],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  generator: `${APP_NAME} v${APP_VERSION}`,
  metadataBase: new URL("https://chatnoir.fun"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chatnoir.fun",
    title: "Chat Noir — The Ultimate Cat Archive",
    description:
      "A curated database of cats across all categories — browsable, searchable, and open to the archive.",
    siteName: "Chat Noir",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat Noir — The Ultimate Cat Archive",
    description: "A curated database of cats — browsable, searchable, and open to the archive.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#030303" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics mode="production" />
        <Providers>
          <AuthGuard>{children}</AuthGuard>
          <Toaster position="top-center" richColors />
          <CookieConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
