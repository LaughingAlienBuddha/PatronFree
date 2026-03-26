"use client";

import {
  CreditCard,
  GitFork,
  Eye,
  Users,
  Compass,
  Handshake,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

const features = [
  {
    icon: CreditCard,
    title: "Creator Subscriptions",
    description:
      "Set up flexible subscription tiers and let your supporters choose how they want to back your work.",
  },
  {
    icon: GitFork,
    title: "Open Source Sponsorship",
    description:
      "Enable seamless sponsorships for your open-source projects with transparent funding options.",
  },
  {
    icon: Eye,
    title: "Transparent Funding",
    description:
      "Full visibility into where funds come from and where they go. Build trust with your community.",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Foster meaningful connections between creators and supporters with built-in engagement tools.",
  },
  {
    icon: Compass,
    title: "Project Discovery",
    description:
      "Help supporters find creators and projects that match their interests and values.",
  },
  {
    icon: Handshake,
    title: "Collaboration Tools",
    description:
      "Connect with other creators and developers to collaborate on projects and grow together.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <Reveal as="div" className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Powerful features designed to help creators and developers build sustainable
            support from their communities.
          </p>
        </Reveal>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal
              key={feature.title}
              delayMs={index * 60}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card hover:shadow-xl hover:shadow-primary/10 sm:p-8"
            >
              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors duration-300 group-hover:bg-accent/10">
                  <feature.icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
                </div>

                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
