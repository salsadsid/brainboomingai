import { Metadata } from "next";
import MD5GeneratorTool from "./MD5GeneratorTool";

export const metadata: Metadata = {
  title:
    "Free MD5 Hash Generator - Secure Text to MD5 Converter | BrainBoomingAI",
  description:
    "Generate MD5 hashes instantly with our free online tool. Perfect for data integrity verification, checksums, and digital signatures. Fast, secure, and easy to use.",
  keywords: [
    "MD5 generator",
    "hash generator",
    "MD5 hash",
    "data integrity",
    "checksum generator",
    "cryptographic hash",
    "text to MD5",
    "free MD5 tool",
    "online hash converter",
    "digital signature",
  ],
  openGraph: {
    title: "Free MD5 Hash Generator - Secure Text to MD5 Converter",
    description:
      "Generate MD5 hashes instantly with our free online tool. Perfect for data integrity verification, checksums, and digital signatures.",
    type: "website",
    url: "https://brainboomingai.com/md5-generator",
    images: [
      {
        url: "/api/og?title=MD5%20Hash%20Generator&description=Generate%20MD5%20hashes%20instantly",
        width: 1200,
        height: 630,
        alt: "MD5 Hash Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free MD5 Hash Generator - Secure Text to MD5 Converter",
    description:
      "Generate MD5 hashes instantly with our free online tool. Perfect for data integrity verification and checksums.",
    images: [
      "/api/og?title=MD5%20Hash%20Generator&description=Generate%20MD5%20hashes%20instantly",
    ],
  },
  alternates: {
    canonical: "https://brainboomingai.com/md5-generator",
  },
};

export default function MD5GeneratorPage() {
  return <MD5GeneratorTool />;
}
