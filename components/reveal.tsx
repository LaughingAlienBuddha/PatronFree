"use client";

import * as React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
};

export function Reveal({ children, className, as = "div", delayMs = 0 }: RevealProps) {
  const Comp = as as any;
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      el.setAttribute("data-visible", "true");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).setAttribute("data-visible", "true");
          obs.unobserve(entry.target);
        }
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Comp
      ref={ref as any}
      data-reveal=""
      data-visible="false"
      style={{ transitionDelay: delayMs ? `${delayMs}ms` : undefined }}
      className={className}
    >
      {children}
    </Comp>
  );
}

