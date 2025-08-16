import type { Metadata } from "next";
import ParaphrasingTool from "./ParaphrasingTool";

export const metadata: Metadata = {
  title: "Free Paraphrasing Tool - Rewrite Text & Avoid Plagiarism | Brain Booming",
  description: "Paraphrase and rewrite text instantly with our free AI-powered paraphrasing tool. Create unique content while maintaining original meaning. 100% free and secure.",
  keywords: [
    "paraphrasing tool",
    "text paraphraser",
    "rewrite text",
    "content rewriter",
    "plagiarism free tool",
    "AI paraphrasing",
    "free paraphrasing tool",
    "text rewriting",
    "article rewriter",
    "sentence rephraser"
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
    title: "Free Paraphrasing Tool - Rewrite Text & Avoid Plagiarism | Brain Booming",
    description: "Paraphrase and rewrite text instantly with our free AI-powered paraphrasing tool. Create unique content while maintaining original meaning.",
    url: "https://brainbooming.com/free-paraphrasing-tool",
    siteName: "Brain Booming",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "Free Paraphrasing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Paraphrasing Tool - Brain Booming",
    description: "Paraphrase and rewrite text instantly with our free AI-powered paraphrasing tool.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainbooming.com/free-paraphrasing-tool",
  },
};

export default function Page() {
  return <ParaphrasingTool />;
}
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generateResponse, { isLoading, data, error }] =
    useGenerateResponseMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setResponse(null);
    // Generate the response from the AI
    if (!prompt.trim()) return;
    setLoading(true);

    const modifiedPrompt = free_grammer_checker_prompt(prompt);

    try {
      const result = await generateResponse({
        prompt: modifiedPrompt,
        tool: "free-paraphrasing-tool",
      }).unwrap();
      // console.log(result, "RESULT");
      setResponse(result ?? "No response received.");
      setLoading(false);
    } catch (err) {
      console.error("Error generating response:", err);
    }
    // console.log(result, "RESULT");
    // // Handle the response: if it's null or undefined, set a default message
    // setResponse(result ?? "No response received.");
    // setLoading(false);
  };

  return (
    <section className="max-w-4xl flex flex-col gap-10 justify-center mx-auto py-16">
      <article>
        <h1 className="text-2xl font-mono text-gray-800 font-bold my-4 text-center md:text-7xl">
          Free Paraphrasing Tool
        </h1>
        <p className="text-lg text-gray-500 my-4 text-center">
          Take your AI-generated text and turn it into something that reads like
          it was written by a human. Just copy and paste your text into our
          converter and watch it transform in seconds.
        </p>
      </article>
      <article className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl w-full md:min-w-[700px] px-1.5"
        >
          <AutosizeTextarea
            placeholder="Paste your AI-generated text here."
            name="message"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            minHeight={100}
            maxHeight={300}
            className="text-base"
          />

          <div className="flex gap-4 mt-6 items-center flex-col sm:flex-row">
            <Button
              type="submit"
              disabled={loading || isLoading}
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground font-medium text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              {loading || isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>

          {loading || isLoading ? (
            <div className="flex flex-col mt-6 space-y-3">
              <Skeleton className="w-full h-40 rounded-xl" />
            </div>
          ) : null}

          {response && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="flex gap-2 text-gray-500">
                <span>{characterCount(response)} characters</span>
                <span className="font-bold">&#183;</span>
                <span>{wordCount(response)} words</span>

                {/* Display mistakes count */}
              </p>
              <p
                className="text-gray-800 text-lg mt-4 space-y-3"
                dangerouslySetInnerHTML={{
                  __html: response,
                }} // Corrected paragraph
              ></p>
            </div>
          )}
        </form>
      </article>
    </section>
  );
}
