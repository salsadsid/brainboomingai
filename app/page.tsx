import AnimatedToolsGrid from "@/components/home/AnimatedToolsGrid";
import HeroSection from "@/components/home/HeroSection";
import JsonLd from "@/components/seo/JsonLd";
import { aiTools, allTools, otherTools } from "@/config/constants";
import { absoluteUrl } from "@/config/site";
import { jsonLdGraph } from "@/lib/seo";
import { MagicWandIcon, RocketIcon } from "@radix-ui/react-icons";

/**
 * The home page is the site's hub. An ItemList naming every tool gives crawlers
 * an explicit inventory rather than making them infer it from the grid markup.
 */
const toolListSchema = {
  "@type": "ItemList",
  name: "Free AI tools",
  itemListElement: allTools.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: tool.title,
    description: tool.description,
    url: absoluteUrl(tool.href),
  })),
};

function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 mb-6 shadow-lg">
        {icon}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent dark:from-slate-100 dark:via-blue-300 dark:to-indigo-300 mb-4">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLdGraph(toolListSchema)} />

      {/* Hero Section - Client Island */}
      <HeroSection />

      {/* Features Section */}
      <section
        id="features"
        aria-label="AI Tools"
        className="w-full bg-white dark:bg-slate-900 relative"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="max-w-7xl mx-auto">
            <SectionTitle
              title="AI Tools"
              icon={<RocketIcon className="w-6 h-6" />}
            />
            <AnimatedToolsGrid tools={aiTools} columns={4} />
          </div>
        </div>
      </section>

      {/* Productivity Suite Section */}
      <section aria-label="Productivity Suite" className="w-full bg-gray-50 dark:bg-slate-800/50 relative">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="max-w-7xl mx-auto">
            <SectionTitle
              title="Productivity Suite"
              icon={<MagicWandIcon className="w-6 h-6" />}
            />
            <AnimatedToolsGrid tools={otherTools} columns={3} />
          </div>
        </div>
      </section>
    </div>
  );
}
