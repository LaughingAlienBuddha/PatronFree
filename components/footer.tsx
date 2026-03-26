"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin, Youtube } from "lucide-react";
import { Reveal } from "@/components/reveal";

const footerLinks = {
  Platform: [
    { label: "Creators", href: "#" },
    { label: "Developers", href: "#" },
    { label: "Features", href: "#features" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Community", href: "#" },
    { label: "Help Center", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand column */}
          <Reveal as="div" className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Patronex</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Empowering creators and open-source developers with sustainable community
              support.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:-translate-y-0.5 hover:bg-accent/15 hover:text-foreground"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <Reveal key={category} as="div" delayMs={60 + idx * 60}>
              <h4 className="mb-4 text-sm font-semibold">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Bottom bar */}
        <Reveal as="div" delayMs={220} className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Patronex. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Cookies
            </Link>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
