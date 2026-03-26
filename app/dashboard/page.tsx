"use client";

import { useEffect, useState } from "react";
import { FeedComposer } from "@/components/feed/FeedComposer";
import { FeedFilterChips } from "@/components/feed/FeedFilterChips";
import { FeedPostCard, PostData } from "@/components/feed/FeedPostCard";
import { FeedSkeletonCard } from "@/components/feed/FeedSkeletonCard";
import { RightPanel } from "@/components/feed/RightPanel";
import { cn } from "@/lib/utils";

const MOCK_POSTS: PostData[] = [
  {
    id: "p1",
    author: { name: "Aria Chen", handle: "aria.creates", initials: "AC", role: "creator" },
    timestamp: "2m ago",
    tag: "Artwork",
    content:
      "Just finished the brand identity refresh for a new open-source design toolkit. Loved collaborating with the dev team on this — it's rare to find that kind of creative alignment. Excited to share the full case study soon! ✨",
    image: "Brand Identity Artwork",
    stats: { likes: 142, comments: 18, shares: 9 },
    hasSupport: true,
  },
  {
    id: "p2",
    author: { name: "Miles Okonjo", handle: "milesdev", initials: "MO", role: "developer" },
    timestamp: "14m ago",
    tag: "Release",
    content:
      "🚀 v2.1 of my open-source CLI tool is live! This release adds auto-config detection, better error reporting, and a completely revamped plugin API. Check the repo — would love your feedback before the stable tag.",
    stats: { likes: 87, comments: 31, shares: 14 },
  },
  {
    id: "p3",
    author: { name: "Luna Park", handle: "lunacodes", initials: "LP", role: "developer" },
    timestamp: "42m ago",
    tag: "Update",
    content:
      "Been heads-down on a new React animation library that wraps CSS houdini worklets. The API feel so far is immaculate — targeting zero runtime overhead. Alpha dropping next week for early supporters 🎯",
    stats: { likes: 63, comments: 11, shares: 5 },
    hasSupport: true,
  },
  {
    id: "p4",
    author: { name: "Zara Voss", handle: "zaravisuals", initials: "ZV", role: "creator" },
    timestamp: "1h ago",
    tag: "Announcement",
    content:
      "My first paid workshop is officially open for enrollment! 'Visual Storytelling for Tech Products' — 6 live sessions, recorded replays, and a private community. Early bird pricing available this week only 🌟",
    image: "Workshop Banner",
    stats: { likes: 211, comments: 47, shares: 33 },
    hasSupport: true,
  },
  {
    id: "p5",
    author: { name: "Kai Bennett", handle: "kaibuilds", initials: "KB", role: "developer" },
    timestamp: "2h ago",
    tag: "Milestone",
    content:
      "100 supporters 🎉 I genuinely didn't expect this when I started sharing my infra work publicly. Every bit of support has gone directly into better hardware and more open-source tooling. Thank you all so much.",
    stats: { likes: 389, comments: 72, shares: 21 },
  },
  {
    id: "p6",
    author: { name: "Noor Patel", handle: "noor.art", initials: "NP", role: "creator" },
    timestamp: "3h ago",
    tag: "Creator",
    content:
      "Working on a generative art series — each piece is unique, seeded by on-chain timestamps. It's the weirdest and most exciting crossover of my creative and technical worlds. Preview dropping for supporters first.",
    image: "Generative Art Preview",
    stats: { likes: 174, comments: 29, shares: 8 },
    hasSupport: true,
  },
];

export default function FeedPage() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState<PostData[]>([]);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setPosts(MOCK_POSTS);
    }, 1100);
    return () => clearTimeout(t);
  }, []);

  // Filter posts
  const visiblePosts = posts.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "developers") return p.author.role === "developer";
    if (activeFilter === "creators") return p.author.role === "creator";
    if (activeFilter === "trending") return p.stats.likes > 100;
    if (activeFilter === "following") return ["aria.creates", "milesdev"].includes(p.author.handle);
    if (activeFilter === "saved") return false;
    return true;
  });

  return (
    <div className="flex gap-6 py-6 items-start">

      {/* ── Center feed ─────────────────────────────────────── */}
      <section className="flex-1 min-w-0 flex flex-col gap-4">

        {/* Composer */}
        <FeedComposer />

        {/* Filter chips */}
        <FeedFilterChips active={activeFilter} setActive={setActiveFilter} />

        {/* Feed cards */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <>
              <FeedSkeletonCard delay={0} />
              <FeedSkeletonCard delay={80} />
              <FeedSkeletonCard delay={160} />
            </>
          ) : visiblePosts.length === 0 ? (
            <EmptyState filter={activeFilter} />
          ) : (
            visiblePosts.map((post, i) => (
              <FeedPostCard
                key={post.id}
                post={post}
                style={{
                  animation: `feed-card-in 420ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                }}
              />
            ))
          )}
        </div>
      </section>

      {/* ── Right panel ─────────────────────────────────────── */}
      <aside className="hidden xl:block w-[280px] shrink-0">
        <RightPanel />
      </aside>
    </div>
  );
}

function EmptyState({ filter }: { filter: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 rounded-2xl border border-dashed border-border/50 bg-muted/20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/20 flex items-center justify-center mb-5 shadow-[0_8px_24px_-8px_rgba(54,84,134,0.2)]">
        <span className="text-3xl">✦</span>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1.5">Nothing here yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        {filter === "saved"
          ? "Posts you save will appear here for easy access."
          : filter === "following"
          ? "Follow more creators and developers to populate this feed."
          : "No posts match this filter right now. Check back soon."}
      </p>
    </div>
  );
}
