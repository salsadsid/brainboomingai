import SessionProvider from "@/components/auth/SessionProvider";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig, siteUrl } from "@/config/site";
import { jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  display: "swap",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const HOME_TITLE =
  "Free AI Writing Tools — Grammar Checker, Paraphraser & Summarizer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: HOME_TITLE,
    // Child pages set only their own title; branding is appended here so the
    // suffix can never drift between pages.
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "free AI tools",
    "AI writing tools",
    "grammar checker",
    "paraphrasing tool",
    "text summarizer",
    "AI to human text converter",
    "image to text",
    "spell checker",
    "AI content detector",
    "online productivity tools",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // No `images` here on purpose — app/opengraph-image.tsx generates the card.
  openGraph: {
    title: HOME_TITLE,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  alternates: { canonical: siteUrl },
  // Paste the token from Search Console here (or set the env var) to verify
  // ownership — required before Google will report indexing status.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  // Must track the --background tokens in globals.css, or the browser chrome
  // sits at a visibly different shade from the page it frames.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08070f" },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Site-wide entity graph; tool pages add their own page-level nodes. */}
        <JsonLd data={jsonLdGraph(organizationSchema(), websiteSchema())} />
        <SessionProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  className:
                    "!bg-popover !text-popover-foreground !border !border-border !shadow-lg !rounded-lg",
                }}
              />
              <div className="flex flex-col min-h-screen">
                <a href="#main-content" className="skip-to-content">
                  Skip to main content
                </a>
                <Navbar />
                <main id="main-content" className="relative flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
