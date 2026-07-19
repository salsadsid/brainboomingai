import { allTools } from "@/config/constants";
import { toolFaqs } from "@/config/toolFaqs";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  softwareAppSchema,
} from "@/lib/seo";
import JsonLd from "./JsonLd";

/**
 * Page-level structured data for a tool route.
 *
 * Emits SoftwareApplication (free-tool rich result), BreadcrumbList (SERP
 * breadcrumb trail) and, when the tool has FAQ copy on the page, FAQPage.
 * Everything is derived from the registry, so the schema cannot describe a tool
 * differently from how the rest of the site does.
 */
export default function ToolSeo({ path }: { path: string }) {
  const tool = allTools.find((t) => t.href === path);
  if (!tool) return null;

  const section = toolFaqs[path];

  const nodes: object[] = [
    softwareAppSchema({
      name: tool.title,
      description: tool.description,
      path: tool.href,
      category: tool.category,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: tool.shortTitle, path: tool.href },
    ]),
  ];

  // Only claim FAQ markup when the questions are actually rendered on the page.
  if (section?.faqs.length) {
    nodes.push(faqSchema(section.faqs));
  }

  return <JsonLd data={jsonLdGraph(...nodes)} />;
}
