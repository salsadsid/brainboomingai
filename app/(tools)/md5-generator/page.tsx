import ToolSeo from "@/components/seo/ToolSeo";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import MD5GeneratorTool from "./MD5GeneratorTool";

export const metadata = buildMetadata({
  title: "Free MD5 Hash Generator - Secure Text to MD5 Converter",
  description: "Generate MD5 hashes instantly with our free online tool. Perfect for data integrity verification, checksums, and digital signatures. Fast, secure, and easy to use.",
  path: "/md5-generator",
  keywords: toolKeywords("/md5-generator"),
});

export default function MD5GeneratorPage() {
  return (
    <>
      <ToolSeo path="/md5-generator" />
      <MD5GeneratorTool />
    </>
  );
}
