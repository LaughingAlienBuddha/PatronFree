"use client";

import { Heart, Lightbulb, Globe, Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of communities to support and uplift each other.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly evolving our platform to better serve creators and developers.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Making it easy for anyone, anywhere to support the work they love.",
  },
  {
    icon: Rocket,
    title: "Sustainability",
    description: "Building long-term, sustainable support systems for creative work.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div>
            <Reveal as="span" className="mb-4 inline-block text-sm font-medium text-accent">
              About Us
            </Reveal>
            <Reveal as="h2" delayMs={80} className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Empowering Creators & Developers Everywhere
            </Reveal>
            <Reveal as="p" delayMs={140} className="mb-6 text-pretty text-lg text-muted-foreground">
              At Patronex, we believe that everyone who creates value deserves to be
              supported. Whether you&apos;re an artist sharing your vision with the world or a
              developer building tools that power the internet, your work matters.
            </Reveal>
            <Reveal as="p" delayMs={200} className="mb-8 text-pretty text-muted-foreground">
              Our mission is to provide a sustainable way for creators and open-source
              developers to earn through community support. We&apos;re building the bridge
              between those who create and those who want to help them thrive.
            </Reveal>

            {/* Values grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map(({ icon: Icon, title, description }, idx) => (
                <Reveal key={title} as="div" delayMs={260 + idx * 60} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Reveal as="div" delayMs={140} className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm">
              {/* Illustration representation */}
              <div className="relative flex aspect-square items-center justify-center">
                {/* Central circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/10" />
                </div>

                {/* Orbiting elements */}
                <div className="relative h-full w-full">
                  {/* Top */}
                  <div className="absolute left-1/2 top-4 -translate-x-1/2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg border border-border/50">
                      <Heart className="h-7 w-7 text-accent" />
                    </div>
                  </div>

                  {/* Right */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg border border-border/50">
                      <Lightbulb className="h-7 w-7 text-primary" />
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg border border-border/50">
                      <Globe className="h-7 w-7 text-secondary-foreground/80" />
                    </div>
                  </div>

                  {/* Left */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg border border-border/50">
                      <Rocket className="h-7 w-7 text-primary" />
                    </div>
                  </div>

                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold">100%</span>
                    <span className="text-sm text-muted-foreground">
                      Creator Focused
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-muted-foreground">Goes to Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
