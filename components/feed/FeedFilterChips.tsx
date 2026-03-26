"use client";

import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "developers", label: "Developers" },
  { id: "creators", label: "Creators" },
  { id: "trending", label: "Trending" },
  { id: "following", label: "Following" },
  { id: "saved", label: "Saved" },
];

interface FeedFilterChipsProps {
  active: string;
  setActive: (id: string) => void;
}

export function FeedFilterChips({ active, setActive }: FeedFilterChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActive(filter.id)}
          className={cn(
            "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium",
            "transition-all duration-200 ease-out whitespace-nowrap",
            active === filter.id
              ? "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(54,84,134,0.3)] scale-[1.02]"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-[1.02]"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
