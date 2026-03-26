"use client";

import {
  Music,
  Mic,
  Palette,
  PenTool,
  Video,
  GraduationCap,
  Code2,
  Layout,
  Terminal,
  Database,
  GitBranch,
  Brain,
  Heart,
  Star,
  Eye,
  Bell,
  Bookmark,
  Gift,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

const creatorFeatures = [
  { icon: Music, label: "Music" },
  { icon: Mic, label: "Podcast" },
  { icon: Palette, label: "Art" },
  { icon: PenTool, label: "Writing" },
  { icon: Video, label: "Video" },
  { icon: GraduationCap, label: "Education" },
];

const developerFeatures = [
  { icon: Code2, label: "Frontend" },
  { icon: Terminal, label: "Backend" },
  { icon: Layout, label: "UI/UX" },
  { icon: Database, label: "Database" },
  { icon: GitBranch, label: "Open Source" },
  { icon: Brain, label: "AI/ML" },
];

const supporterFeatures = [
  { icon: Heart, label: "Fund" },
  { icon: Star, label: "Follow" },
  { icon: Eye, label: "Discover" },
  { icon: Bell, label: "Updates" },
  { icon: Bookmark, label: "Save" },
  { icon: Gift, label: "Reward" },
];

export function CreatorsDevelopersSection() {
  return (
    <section className="relative bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <Reveal as="div" className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            One Platform, Three Communities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Patronex brings creators, developers, and supporters together in a thriving
            ecosystem of creativity, innovation, and meaningful support.
          </p>
        </Reveal>

        {/* Three cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Creators Card */}
          <Reveal as="div" delayMs={60} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/35 hover:shadow-xl hover:shadow-accent/15 sm:p-8">
            {/* Glow effect */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                <Palette className="h-6 w-6 text-accent" />
              </div>

              <h3 className="mb-3 text-xl font-bold">For Creators</h3>

              <p className="mb-5 text-sm text-muted-foreground">
                Share your passion with the world and build a sustainable creative career
                through community support.
              </p>

              <ul className="mb-6 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground/80">
                    Share exclusive content with supporters
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground/80">
                    Build engaged communities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground/80">
                    Receive recurring support
                  </span>
                </li>
              </ul>

              {/* Icons grid */}
              <div className="grid grid-cols-6 gap-3">
                {creatorFeatures.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group/icon flex flex-col items-center gap-1"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-accent/10">
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover/icon:text-accent" />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Developers Card */}
          <Reveal as="div" delayMs={120} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/15 sm:p-8">
            {/* Glow effect */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
                <Code2 className="h-6 w-6 text-foreground" />
              </div>

              <h3 className="mb-3 text-xl font-bold">For Developers</h3>

              <p className="mb-5 text-sm text-muted-foreground">
                Get the support you need to keep building amazing open-source projects
                that benefit everyone.
              </p>

              <ul className="mb-6 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
                  <span className="text-sm text-foreground/80">
                    Receive open-source sponsorships
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
                  <span className="text-sm text-foreground/80">
                    Get community funding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
                  <span className="text-sm text-foreground/80">
                    Grow your technical work
                  </span>
                </li>
              </ul>

              {/* Icons grid */}
              <div className="grid grid-cols-6 gap-3">
                {developerFeatures.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group/icon flex flex-col items-center gap-1"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-primary/10">
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover/icon:text-foreground" />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Supporters Card */}
          <Reveal as="div" delayMs={180} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/20 sm:p-8">
            {/* Glow effect */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-secondary/20 p-3">
                <Heart className="h-6 w-6 text-secondary-foreground" />
              </div>

              <h3 className="mb-3 text-xl font-bold">For Supporters</h3>

              <p className="mb-5 text-sm text-muted-foreground">
                Support the creators and developers you believe in. Fund projects,
                get exclusive access, and be part of something bigger.
              </p>

              <ul className="mb-6 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span className="text-sm text-foreground/80">
                    Fund open-source projects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span className="text-sm text-foreground/80">
                    Access exclusive content & updates
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span className="text-sm text-foreground/80">
                    Follow creators & projects
                  </span>
                </li>
              </ul>

              {/* Icons grid */}
              <div className="grid grid-cols-6 gap-3">
                {supporterFeatures.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group/icon flex flex-col items-center gap-1"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-secondary/20">
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover/icon:text-secondary-foreground" />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
