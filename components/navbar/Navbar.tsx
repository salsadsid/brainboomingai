"use client";

import UserMenu from "@/components/auth/UserMenu";
import BrandMark, { BrandLockup } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ui/theme-toggle";
import { aiTools, otherTools } from "@/config/constants";
import { toolIcons } from "@/config/toolIcons";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

function ToolMenuLink({
  tool,
  onNavigate,
}: {
  tool: (typeof aiTools)[number];
  onNavigate?: () => void;
}) {
  const Icon = toolIcons[tool.icon];
  return (
    <NavigationMenuLink asChild>
      <Link
        href={tool.href}
        onClick={onNavigate}
        prefetch={false}
        className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none"
      >
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-foreground">
            {tool.shortTitle}
          </span>
          <span className="mt-0.5 block line-clamp-1 text-xs text-muted-foreground">
            {tool.description}
          </span>
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;
  const isToolActive = [...aiTools, ...otherTools].some((t) =>
    isActive(t.href)
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        isScrolled
          ? "border-border bg-background/80 shadow-[0_1px_24px_-8px_hsl(var(--primary)/0.35)] backdrop-blur-xl"
          : "border-transparent bg-background/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          prefetch={false}
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* Wordmark, deliberately not a heading: as an <h1> it appeared on
              every page and competed with the real page heading. */}
          <BrandLockup />
          <span className="sr-only">BrainBoomingAI home</span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  prefetch={false}
                  aria-current={isActive("/") ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-medium transition-colors",
                    isActive("/")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-9 rounded-lg bg-transparent px-3.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary",
                  isToolActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[38rem] grid-cols-2 gap-6 p-5">
                  <div>
                    <p className="mb-2 px-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      AI Writing Tools
                    </p>
                    <ul className="space-y-0.5">
                      {aiTools.map((tool) => (
                        <li key={tool.href}>
                          <ToolMenuLink tool={tool} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 px-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Utilities
                    </p>
                    <ul className="space-y-0.5">
                      {otherTools.map((tool) => (
                        <li key={tool.href}>
                          <ToolMenuLink tool={tool} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    prefetch={false}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <UserMenu />

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                <Menu className="size-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[19rem] overflow-y-auto border-border bg-background p-0"
            >
              <div className="border-b border-border px-5 py-4">
                <SheetTitle asChild>
                  <span className="flex items-center gap-2.5">
                    <BrandMark className="size-8" />
                    <span className="text-sm font-bold tracking-tight">
                      BRAIN BOOMING
                    </span>
                  </span>
                </SheetTitle>
              </div>

              <nav aria-label="Mobile navigation" className="px-3 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {[
                  { heading: "AI Writing Tools", items: aiTools },
                  { heading: "Utilities", items: otherTools },
                ].map((group) => (
                  <div key={group.heading} className="mt-5">
                    <p className="px-3 pb-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {group.heading}
                    </p>
                    {group.items.map((tool) => {
                      const Icon = toolIcons[tool.icon];
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          prefetch={false}
                          onClick={() => setIsMobileMenuOpen(false)}
                          aria-current={isActive(tool.href) ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive(tool.href)
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <Icon className="size-4 shrink-0" aria-hidden="true" />
                          {tool.shortTitle}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
