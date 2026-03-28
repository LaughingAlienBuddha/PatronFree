"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CARDS = [
  {
    title: "For Creators",
    desc: "Share your passion with the world and build a sustainable creative career through community support.",
    bullets: [
      "Share exclusive content with supporters",
      "Build engaged communities",
      "Receive recurring support",
    ],
    theme: "bg-gradient-to-br from-[#e0e0e0] to-[#858585]",
    textColor: "text-[#050505]",
    logoUrl:
      "https://framerusercontent.com/images/wKCJKEBAG62LlmlJVS1LMckOpw.png?width=512&height=512",
    barUrl:
      "https://framerusercontent.com/images/kBjJX1G9pm5GH0tIDcn0LimRa3c.png?width=418&height=95",
    rotateZ: -12,
  },
  {
    title: "For Developers",
    desc: "Get the support you need to keep building amazing open-source projects that benefit everyone.",
    bullets: [
      "Receive open-source sponsorships",
      "Get community funding",
      "Grow your technical work",
    ],
    theme: "bg-gradient-to-br from-[#1f5fd2] to-[#061a69]",
    textColor: "text-white",
    logoUrl:
      "https://framerusercontent.com/images/BAx2avKDQOkIgeX1TJOhNGFwAtA.png?width=512&height=512",
    barUrl:
      "https://framerusercontent.com/images/kfrjj5dhCa4MtVtItTIEvzjE8KI.png?width=364&height=53",
    rotateZ: 0,
  },
  {
    title: "For Supporters",
    desc: "Support the creators and developers you believe in. Fund projects, get exclusive access, and be part of something bigger.",
    bullets: [
      "Fund open-source projects",
      "Access exclusive content & updates",
      "Follow creators & projects",
    ],
    theme: "bg-gradient-to-br from-[#1d1d1d] to-[#131313]",
    textColor: "text-white",
    icon: (
      <svg
        viewBox="0 0 18.5 18.5"
        className="w-full h-full text-white opacity-80"
        fill="transparent"
        strokeWidth="1.5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        <path d="M 9.25 0 C 10.25 5.25 13.25 8.25 18.5 9.25 C 13.25 10.25 10.25 13.25 9.25 18.5 C 8.25 13.25 5.25 10.25 0 9.25 C 5.25 8.25 8.25 5.25 9.25 0 Z" />
      </svg>
    ),
    barUrl:
      "https://framerusercontent.com/images/st1S9bepvXLOaIVLBw97sYcws.png?width=363&height=44",
    rotateZ: 12,
  },
];

const FRONT_IMAGE =
  "https://framerusercontent.com/images/RCwmbu2vbsKf5a5D7OchNhir3Y.png?scale-down-to=1024&width=3072&height=2048";

export function SlidingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate rotations using framer-motion useTransform
  // Each card takes up roughly 1/3 of the scroll progress
  const rotateY1_mapped = useTransform(scrollYProgress, [0, 0.33], [0, -180]);
  const rotateY2_mapped = useTransform(scrollYProgress, [0.33, 0.66], [0, -180]);
  const rotateY3_mapped = useTransform(scrollYProgress, [0.66, 1], [0, -180]);

  // We want to limit rotation to not go past -180 or stay above 0 implicitly
  const rotateY1 = useTransform(rotateY1_mapped, (v) => Math.max(Math.min(v, 0), -180));
  const rotateY2 = useTransform(rotateY2_mapped, (v) => Math.max(Math.min(v, 0), -180));
  const rotateY3 = useTransform(rotateY3_mapped, (v) => Math.max(Math.min(v, 0), -180));

  const rotations = [rotateY1, rotateY2, rotateY3];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-transparent">
      {/* Sticky section that stays on screen while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden [perspective:1200px] pt-16 md:pt-0">
        {/* Title */}
        <div className="relative w-full text-center z-10 px-4 flex flex-col items-center mb-8 md:mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full border border-border/50 bg-muted/30 backdrop-blur-md">
            <span className="text-xs md:text-sm font-medium text-primary tracking-wide uppercase">
              The Patronex Ecosystem
            </span>
          </div>
          <h2 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4">
            One Platform,{" "}
            <span className="italic font-light text-secondary-foreground/80">
              Three Communities
            </span>
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed balance-text">
            Patronex brings creators, developers, and supporters together in a
            thriving ecosystem of creativity, innovation, and meaningful
            support.
          </p>
        </div>

        {/* Cards Flex Container */}
        <div className="relative w-full max-w-6xl px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 overflow-y-auto md:overflow-visible pb-16 md:pb-0">
          {CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              className="relative w-full max-w-[280px] h-[380px] md:max-w-[320px] md:h-[450px] rounded-[12px] origin-center shadow-2xl shrink-0"
              style={{
                rotateZ: card.rotateZ,
                rotateY: rotations[idx],
                transformStyle: "preserve-3d",
              }}
            >
              {/* === Front Face === */}
              <div
                className="absolute inset-0 rounded-[12px] overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <img
                  src={FRONT_IMAGE}
                  alt="Front cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* === Back Face === */}
              <div
                className={`absolute inset-0 rounded-[12px] overflow-hidden flex flex-col justify-between p-6 md:p-8 shadow-inner ${card.theme} ${card.textColor}`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Noise overlay */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage:
                      "url(https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "256px auto",
                  }}
                />

                <div className="relative z-10 flex flex-col gap-4">
                  {/* Logo/Icon */}
                  <div className="w-10 h-10 md:w-12 md:h-12 mb-2">
                    {card.logoUrl ? (
                      <img
                        src={card.logoUrl}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      card.icon
                    )}
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed opacity-90 font-medium">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul className="text-xs md:text-sm opacity-90 list-disc pl-5 flex flex-col gap-1 md:gap-2">
                    {card.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Bar Graphic */}
                <div className="relative z-10 w-[70%] md:w-[80%] self-center mt-4">
                  <img
                    src={card.barUrl}
                    alt="Decorative bar"
                    className="w-full h-auto object-contain opacity-80"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
