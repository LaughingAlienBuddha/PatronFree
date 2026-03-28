"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code2,
  Sparkles,
  Terminal,
  Braces,
  Cpu,
  Palette,
  PenTool,
  Video,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import * as React from "react";

type HeroCard = {
  id: string;
  label: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
};

const HERO_CARDS: HeroCard[] = [
  {
    id: "dev-1",
    label: "Developers",
    title: "Terminal-first workflows",
    icon: Terminal,
    gradient: "from-secondary/30 via-primary/20 to-transparent",
  },
  {
    id: "dev-2",
    label: "Developers",
    title: "Ship open-source faster",
    icon: Braces,
    gradient: "from-primary/35 via-secondary/15 to-transparent",
  },
  {
    id: "dev-3",
    label: "Developers",
    title: "Fund critical projects",
    icon: Cpu,
    gradient: "from-secondary/25 via-primary/25 to-transparent",
  },
  {
    id: "cre-1",
    label: "Creators",
    title: "Design. Publish. Grow.",
    icon: Palette,
    gradient: "from-secondary/35 via-primary/15 to-transparent",
  },
  {
    id: "cre-2",
    label: "Creators",
    title: "Tell stories with content",
    icon: PenTool,
    gradient: "from-primary/30 via-secondary/20 to-transparent",
  },
  {
    id: "cre-3",
    label: "Creators",
    title: "Cinematic visuals & media",
    icon: Video,
    gradient: "from-secondary/30 via-primary/20 to-transparent",
  },
  {
    id: "mix-1",
    label: "Together",
    title: "Creators × Developers",
    icon: Layers,
    gradient: "from-primary/35 via-secondary/15 to-transparent",
  },
];

export function HeroSection() {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = React.useState<number>(0);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let raf = 0;
    let last = 0;

    const tick = (t: number) => {
      if (t - last > 120) {
        last = t;
        const vp = viewport.getBoundingClientRect();
        const centerX = vp.left + vp.width / 2;

        let best = { idx: 0, dist: Number.POSITIVE_INFINITY };
        for (let i = 0; i < cardRefs.current.length; i++) {
          const el = cardRefs.current[i];
          if (!el) continue;
          const r = el.getBoundingClientRect();
          const x = r.left + r.width / 2;
          const d = Math.abs(x - centerX);
          if (d < best.dist) best = { idx: i, dist: d };
        }
        setActiveIdx(best.idx);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Immersive background */}
      <div className="absolute inset-0 hero-mesh" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(800px_420px_at_50%_55%,rgba(127,199,217,0.16),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <Reveal
            as="div"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.65)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            <span>Creator + Developer powered funding</span>
          </Reveal>

          {/* Headline */}
          <Reveal
            as="h1"
            delayMs={80}
            className="max-w-5xl text-balance text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="inline-block bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(127,199,217,0.22)]">
              FUND THE CODE,
            </span>{" "}
            <span className="inline-block bg-gradient-to-r from-secondary via-white/90 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(127,199,217,0.35)]">
              FUEL THE CREATOR
            </span>
          </Reveal>

          {/* Subtext */}
          <Reveal
            as="p"
            delayMs={140}
            className="mt-6 max-w-2xl text-pretty text-lg text-white/70 sm:text-xl"
          >
            A premium platform where supporters fund open-source builders and creators—with
            beautiful discovery, clean UX, and cinematic momentum.
          </Reveal>

          {/* Dynamic carousel */}
          <Reveal as="div" delayMs={210} className="relative mt-12 w-full max-w-6xl">
            {/* Soft neon aura + spotlight */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-56 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-44 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div
              ref={viewportRef}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 px-2 py-8 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-6"
              style={{ perspective: "1100px" }}
            >
              <div className="mask-image-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="hero-track gap-4 px-4 sm:gap-6 sm:px-2">
                  {[...HERO_CARDS, ...HERO_CARDS].map((card, i) => {
                    const idx = i % HERO_CARDS.length;
                    const dist = Math.min(
                      Math.abs(i - activeIdx),
                      Math.abs(i - (activeIdx + HERO_CARDS.length))
                    );
                    const dim = dist >= 3;
                    const soften = dist === 2;
                    const isActive = i === activeIdx;
                    const Icon = card.icon;

                    return (
                      <div
                        key={`${card.id}-${i}`}
                        ref={(el) => {
                          cardRefs.current[i] = el;
                        }}
                        className={[
                          "group relative h-40 w-[15.5rem] shrink-0 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 text-left text-white/85 backdrop-blur-md",
                          "transition-[transform,filter,opacity,box-shadow,border-color] duration-300 ease-out",
                          "hover:-translate-y-1 hover:scale-[1.03] hover:border-secondary/40 hover:shadow-[0_20px_80px_-40px_rgba(127,199,217,0.55)]",
                          dim ? "opacity-45 blur-[0.7px]" : soften ? "opacity-70" : "opacity-95",
                          isActive ? "scale-[1.06] border-secondary/45 shadow-[0_30px_120px_-70px_rgba(127,199,217,0.65)]" : "",
                        ].join(" ")}
                        style={{
                          transform: `translateZ(${isActive ? 28 : 0}px) rotateX(1deg) rotateY(${
                            dist === 0 ? 0 : dist === 1 ? 6 : dist === 2 ? 10 : 12
                          }deg)`,
                        }}
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient}`}
                        />
                        <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-secondary/0 blur-2xl transition-opacity duration-300 group-hover:bg-secondary/15" />

                        <div className="relative flex items-start justify-between">
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] text-white/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                            {card.label}
                          </div>
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                            <Icon className="h-5 w-5 text-white/80" />
                          </div>
                        </div>

                        <div className="relative mt-4">
                          <div className="text-sm font-semibold tracking-tight text-white">
                            {card.title}
                          </div>
                          <div className="mt-1 text-xs text-white/60">
                            {idx < 3 ? "Code, terminals, projects" : idx < 6 ? "Art, design, content" : "Collaboration"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Center-focused glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal as="div" delayMs={260} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 px-8 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25"
            >
              Explore Projects
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
