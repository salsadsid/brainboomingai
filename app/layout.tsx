import Footer from "@/components/layout/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Providers } from "@/redux/provider";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "🧠 Brain Booming - Free AI Tools for Content Creation",
  description:
    "Discover powerful free AI tools for writing, content creation, and productivity. Transform your workflow with our AI-powered grammar checker, text converter, and more.",
  keywords: [
    "AI tools",
    "free AI tools",
    "content creation",
    "writing tools",
    "productivity tools",
    "grammar checker",
    "text converter",
    "AI writing assistant",
  ],
  authors: [{ name: "Brain Booming" }],
  creator: "Brain Booming",
  publisher: "Brain Booming",
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
  openGraph: {
    title: "🧠 Brain Booming - Free AI Tools for Content Creation",
    description:
      "Discover powerful free AI tools for writing, content creation, and productivity. Transform your workflow with our AI-powered tools.",
    url: "https://brainbooming.com",
    siteName: "Brain Booming",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "Brain Booming - Free AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🧠 Brain Booming - Free AI Tools",
    description:
      "Discover powerful free AI tools for writing, content creation, and productivity.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainbooming.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="relative flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
