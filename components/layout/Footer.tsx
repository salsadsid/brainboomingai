import { Facebook, Github, Heart, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const toolsLinks = [
    { name: "AI to Human Converter", href: "/free-ai-to-human" },
    { name: "Grammar Checker", href: "/free-grammar-checker" },
    { name: "Prompt Generator", href: "/prompt-generator" },
    { name: "Paraphrasing Tool", href: "/free-paraphrasing-tool" },
    { name: "Text Summarizer", href: "/free-text-summarizer" },
    { name: "Originality Analyzer", href: "/free-originality-analyzer" },
  ];

  const utilityLinks = [
    { name: "Image Compressor", href: "/image-compressor" },
    { name: "Image Resizer", href: "/image-resizer" },
    { name: "MD5 Generator", href: "/md5-generator" },
    { name: "Todo App", href: "/todo-app" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Brain Booming
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Powerful AI tools to boost your productivity. From writing
                assistance to content creation, we provide free, easy-to-use
                tools for everyone.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/brainbooming"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com/brainbooming"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/brainbooming"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/brainbooming"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View our GitHub"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* AI Writing Tools */}
          <nav aria-label="AI Writing Tools">
            <h4 className="text-lg font-semibold text-white mb-4">
              AI Writing Tools
            </h4>
            <ul className="space-y-3">
              {toolsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Utility Tools */}
          <nav aria-label="Utility Tools">
            <h4 className="text-lg font-semibold text-white mb-4">
              Utility Tools
            </h4>
            <ul className="space-y-3">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Email */}
            <div className="mt-6">
              <a
                href="mailto:hello@brainbooming.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                hello@brainbooming.com
              </a>
            </div>
          </nav>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold text-white mb-2">
              Stay Updated
            </h4>
            <p className="text-slate-400 mb-4">
              Get notified about new tools and features. No spam, ever.
            </p>
            <form className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400 mb-4 md:mb-0">
            <span>© {currentYear} Brain Booming. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" aria-hidden="true" />
            <span>for creators worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
