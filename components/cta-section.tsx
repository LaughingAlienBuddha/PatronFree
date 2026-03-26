"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Reveal as="div" className="rounded-3xl border border-border/50 bg-card/80 p-8 text-center backdrop-blur-sm sm:p-12 lg:p-16">
          {/* Decorative gradient border effect */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-accent/20 via-transparent to-transparent opacity-50" />

          <div className="relative">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Support Creativity.{" "}
              <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
                Fund Innovation.
              </span>
            </h2>

            <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-muted-foreground">
              Join Patronex and start supporting creators and developers today. Be part
              of a community that values creative and technical work.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 px-8">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Join as Creator
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                No hidden fees
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                Instant payouts
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                Cancel anytime
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
