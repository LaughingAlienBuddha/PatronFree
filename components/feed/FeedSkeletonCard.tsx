"use client";

import { cn } from "@/lib/utils";

export function FeedSkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="rounded-2xl border border-border/30 bg-card/60 p-5 space-y-4 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted/60" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-28 rounded-full bg-muted/60" />
          <div className="h-2.5 w-20 rounded-full bg-muted/40" />
        </div>
        <div className="h-5 w-16 rounded-full bg-muted/40" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="h-3 rounded-full bg-muted/50" />
        <div className="h-3 w-4/5 rounded-full bg-muted/50" />
        <div className="h-3 w-3/5 rounded-full bg-muted/40" />
      </div>

      {/* Image placeholder occasionally */}
      <div className="h-40 rounded-xl bg-muted/30" />

      {/* Actions */}
      <div className="flex items-center gap-4 pt-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 w-12 rounded-full bg-muted/40" />
        ))}
      </div>
    </div>
  );
}
