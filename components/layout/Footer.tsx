import BrandMark from "@/components/brand/BrandMark";
import { aiTools, otherTools } from "@/config/constants";
import { siteConfig } from "@/config/site";
import { Facebook, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const SOCIALS = [
  { href: siteConfig.socials.twitter, label: "Twitter", Icon: Twitter },
  { href: siteConfig.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: siteConfig.socials.github, label: "GitHub", Icon: Github },
];

const COMPANY_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

function LinkColumn({
  heading,
  links,
  label,
}: {
  heading: string;
  links: { name: string; href: string }[];
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Derived from the tool registry so a new tool is linked site-wide the moment
  // it is registered — the previous hand-maintained lists had drifted, omitting
  // the spell checker and image-to-text and linking a /todo-app that never shipped.
  const toolsLinks = aiTools.map((t) => ({ name: t.shortTitle, href: t.href }));
  const utilityLinks = otherTools.map((t) => ({
    name: t.shortTitle,
    href: t.href,
  }));

  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <BrandMark className="size-9" />
              <span className="text-[0.95rem] font-bold tracking-tight">
                BRAIN BOOMING
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Free AI tools for writing and productivity. No signup, no paywall —
              open a tool and get your result.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on ${label}`}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn
            heading="AI Writing Tools"
            links={toolsLinks}
            label="AI Writing Tools"
          />
          <LinkColumn
            heading="Utility Tools"
            links={utilityLinks}
            label="Utility Tools"
          />

          <div>
            <LinkColumn
              heading="Company"
              links={COMPANY_LINKS}
              label="Company"
            />
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            {/* Plain anchor: sitemap.xml is a generated route, not an app page,
                so the client router must not try to prefetch it. */}
            <a
              href="/sitemap.xml"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
