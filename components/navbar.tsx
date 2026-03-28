"use client";

import { useState } from "react";
import Link from "next/link";
import { HomeLink } from "@/components/home-link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const creatorsDropdown = [
  { label: "Musicians", href: "#" },
  { label: "Podcasters", href: "#" },
  { label: "Artists", href: "#" },
  { label: "Writers", href: "#" },
  { label: "Content Creators", href: "#" },
  { label: "Educators", href: "#" },
];

const developersDropdown = [
  { label: "Frontend Developers", href: "#" },
  { label: "Backend Developers", href: "#" },
  { label: "UI/UX Designers", href: "#" },
  { label: "Database Engineers", href: "#" },
  { label: "Open Source Maintainers", href: "#" },
  { label: "AI / ML Developers", href: "#" },
];

const supportersDropdown = [
  { label: "Support Creators", href: "#" },
  { label: "Fund Open Source", href: "#" },
  { label: "Exclusive Content", href: "#" },
  { label: "Project Updates", href: "#" },
  { label: "Follow Projects", href: "#" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/65 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <HomeLink className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/20">
            <span className="text-sm font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Patronex</span>
        </HomeLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Creators Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("creators")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="ui-navlink flex items-center gap-1">
              Creators
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdown === "creators" && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                openDropdown === "creators"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="ui-dropdown w-56">
                {creatorsDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Developers Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("developers")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="ui-navlink flex items-center gap-1">
              Developers
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdown === "developers" && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                openDropdown === "developers"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="ui-dropdown w-56">
                {developersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Supporters Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("supporters")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="ui-navlink flex items-center gap-1">
              Supporters
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdown === "supporters" && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                openDropdown === "supporters"
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="ui-dropdown w-56">
                {supportersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="#features"
            className="ui-navlink"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="ui-navlink"
          >
            About Us
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-foreground/80 hover:bg-muted/60 hover:text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileMenuOpen ? "max-h-[32rem]" : "max-h-0"
        )}
      >
        <div className="space-y-1 px-4 py-4">
          <div className="space-y-1">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "m-creators" ? null : "m-creators")
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
            >
              Creators
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === "m-creators" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "m-creators" && (
              <div className="ml-4 space-y-1">
                {creatorsDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "m-developers" ? null : "m-developers")
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
            >
              Developers
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === "m-developers" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "m-developers" && (
              <div className="ml-4 space-y-1">
                {developersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "m-supporters" ? null : "m-supporters")
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
            >
              Supporters
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openDropdown === "m-supporters" && "rotate-180"
                )}
              />
            </button>
            {openDropdown === "m-supporters" && (
              <div className="ml-4 space-y-1">
                {supportersDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="#features"
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
          >
            About Us
          </Link>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button size="sm" className="flex-1" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
