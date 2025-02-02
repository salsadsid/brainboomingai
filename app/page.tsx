import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { aiTools, otherTools } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-5  font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2">
        <div className="flex gap-4 items-center flex-col">
          <h1 className="text-5xl flex flex-col items-center gap-2 font-bold mb-4">
            AI Tools
            <span className="flex bg-gradient-to-tr from-pink-100 p-1 rounded to-purple-100   items-start gap-1 ml-2">
              <span className="text-sm font-light">powered by </span>
              <Image
                src={"/Google_Gemini_logo.svg.png"}
                width={40}
                height={30}
                alt={"Google Gemini"}
                className="inline"
              />
            </span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
            {aiTools.map((tool) => (
              <Link href={tool.href} key={tool.href}>
                <Card key={tool.title}>
                  <CardHeader className="flex flex-col items-center gap-2">
                    <Image
                      src={tool.featuresImg}
                      width={60}
                      height={60}
                      alt={tool.title}
                    />
                    <CardTitle>{tool.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-20 items-center flex-col">
          <h1 className="text-4xl font-bold mb-4">Other Tools</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
            {otherTools.map((tool) => (
              <Link href={tool.href} key={tool.href}>
                <Card key={tool.title}>
                  <CardHeader className="flex flex-col items-center gap-2">
                    <Image
                      src={tool.featuresImg}
                      width={60}
                      height={60}
                      alt={tool.title}
                    />
                    <CardTitle>{tool.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
