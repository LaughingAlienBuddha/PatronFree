"use client";

import { useEffect, useState, useMemo } from "react";
import { CreatorSpotlightCard, CreatorData } from "@/components/feed/CreatorSpotlightCard";
import { SearchSpotlight } from "@/components/feed/SearchSpotlight";
import { FeedFilterChips } from "@/components/feed/FeedFilterChips";
import { FeedSkeleton } from "@/components/feed/FeedSkeleton";
import { RoleSelectionModal, UserRole, getUserRole } from "@/components/role-selection-modal";
import { auth } from "@/lib/firebase";
import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Indian creators and developers with rich content
const CREATORS: CreatorData[] = [
  {
    id: "1",
    name: "Aarav Mehta",
    handle: "aarav.designs",
    initials: "AM",
    role: "creator",
    bio: "UI/UX designer crafting thoughtful digital experiences. Passionate about accessible design and Indian aesthetics.",
    tags: ["Designer", "UI/UX", "Motion", "India"],
    supportAmount: 299,
    supportLabel: "Support",
    featuredWork: {
      title: "Sacred Geometry Icon Set",
      description: "A collection of 200+ icons inspired by Indian mandala art and modern minimalism. Perfect for spiritual and wellness apps.",
      type: "artwork",
    },
    color: "#E87959",
  },
  {
    id: "2",
    name: "Ananya Sharma",
    handle: "ananya.codes",
    initials: "AS",
    role: "developer",
    bio: "Full-stack developer building tools for indie creators. Open source enthusiast and community mentor.",
    tags: ["Developer", "Open Source", "React", "Node.js"],
    supportAmount: 499,
    supportLabel: "Back this project",
    featuredWork: {
      title: "CreatorStack Dashboard",
      description: "An all-in-one dashboard for content creators to manage their analytics, schedule posts, and track revenue.",
      type: "project",
    },
    color: "#4F46E5",
  },
  {
    id: "3",
    name: "Rohan Verma",
    handle: "rohan.illustrates",
    initials: "RV",
    role: "creator",
    bio: "Digital illustrator telling stories through vibrant colors. Specializing in children's book illustrations and character design.",
    tags: ["Illustrator", "Character Design", "Children's Books"],
    supportAmount: 199,
    supportLabel: "Support",
    featuredWork: {
      title: "The Jungle Friends Series",
      description: "A heartwarming collection of Indian wildlife characters brought to life through whimsical digital paintings.",
      type: "artwork",
    },
    color: "#059669",
  },
  {
    id: "4",
    name: "Kavya Nair",
    handle: "kavya.builds",
    initials: "KN",
    role: "developer",
    bio: "AI/ML engineer creating accessible tools for rural education. Making technology work for everyone.",
    tags: ["Developer", "AI", "Education", "Python"],
    supportAmount: 599,
    supportLabel: "Back this project",
    featuredWork: {
      title: "VidyaAI - Rural Education Assistant",
      description: "A voice-first AI tutor designed for low-bandwidth environments, supporting 12 Indian languages.",
      type: "demo",
    },
    color: "#0891B2",
  },
  {
    id: "5",
    name: "Dhruv Menon",
    handle: "dhruv.creates",
    initials: "DM",
    role: "creator",
    bio: "Motion designer and 3D artist blending traditional Indian art with modern motion graphics. Studio based in Kochi.",
    tags: ["Motion", "3D", "After Effects", "Blender"],
    supportAmount: 399,
    supportLabel: "Support",
    featuredWork: {
      title: "Festivals in Motion",
      description: "A series of looping animations celebrating Indian festivals through kinetic typography and particle effects.",
      type: "artwork",
    },
    color: "#DC2626",
  },
  {
    id: "6",
    name: "Ishaan Patel",
    handle: "ishaan.dev",
    initials: "IP",
    role: "developer",
    bio: "Building developer tools that spark joy. Former Google engineer, now indie hacking full-time from Bangalore.",
    tags: ["Developer", "Tools", "TypeScript", "Open Source"],
    supportAmount: 349,
    supportLabel: "Back this project",
    featuredWork: {
      title: "DevFlow - Git Workflow Visualizer",
      description: "A beautiful desktop app that transforms confusing git histories into intuitive visual stories.",
      type: "project",
    },
    color: "#7C3AED",
  },
  {
    id: "7",
    name: "Priya Krishnan",
    handle: "priya.artistry",
    initials: "PK",
    role: "creator",
    bio: "Traditional Madhubani artist exploring digital mediums. Preserving ancient art forms through modern expression.",
    tags: ["Artist", "Traditional", "Digital Art", "Folk"],
    supportAmount: 249,
    supportLabel: "Support",
    featuredWork: {
      title: "Digital Madhubani Collection",
      description: "Reimagining ancient Madhubani patterns in high-resolution digital art, preserving every intricate detail.",
      type: "artwork",
    },
    color: "#EA580C",
  },
  {
    id: "8",
    name: "Arjun Reddy",
    handle: "arjun.builds",
    initials: "AR",
    role: "developer",
    bio: "Game developer creating narratives rooted in Indian mythology. Unity certified, Unreal enthusiast.",
    tags: ["Developer", "Games", "Unity", "Unreal"],
    supportAmount: 449,
    supportLabel: "Back this project",
    featuredWork: {
      title: "Mahabharata: The Untold Stories",
      description: "An episodic narrative game exploring lesser-known tales from the great epic. First chapter now playable.",
      type: "demo",
    },
    color: "#2563EB",
  },
  {
    id: "9",
    name: "Zara Khan",
    handle: "zara.films",
    initials: "ZK",
    role: "creator",
    bio: "Independent filmmaker documenting India's disappearing crafts. Every frame tells a story of heritage.",
    tags: ["Filmmaker", "Documentary", "Heritage"],
    supportAmount: 699,
    supportLabel: "Support",
    featuredWork: {
      title: "Threads of Tradition",
      description: "A documentary series following the last master weavers of Varanasi as they pass down centuries-old techniques.",
      type: "update",
    },
    color: "#BE185D",
  },
  {
    id: "10",
    name: "Nikhil Desai",
    handle: "nikhil.designs",
    initials: "ND",
    role: "developer",
    bio: "Design engineer bridging the gap between pixels and code. Obsessed with micro-interactions and performance.",
    tags: ["Developer", "Design Systems", "Framer", "WebGL"],
    supportAmount: 399,
    supportLabel: "Back this project",
    featuredWork: {
      title: "Orbit - Design System Framework",
      description: "A framework for building scalable design systems with built-in accessibility and dark mode support.",
      type: "project",
    },
    color: "#0891B2",
  },
];

export default function FeedPage() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Instant role check - no waiting
  useEffect(() => {
    // Check localStorage first (instant, no network delay)
    const cachedRole = localStorage.getItem('userRole') as UserRole | null;
    if (cachedRole) {
      setUserRole(cachedRole);
      return;
    }

    // No cached role - show modal immediately
    setShowRoleModal(true);
  }, []);

  // Shorter loading simulation (500ms instead of 1200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter creators based on active filter
  const filteredCreators = useMemo(() => {
    let filtered = [...CREATORS];

    switch (activeFilter) {
      case "creators":
        filtered = filtered.filter((c) => c.role === "creator");
        break;
      case "developers":
        filtered = filtered.filter((c) => c.role === "developer");
        break;
      case "trending":
        // Simulate trending as higher support amounts for now
        filtered = filtered.sort((a, b) => b.supportAmount - a.supportAmount).slice(0, 5);
        break;
      case "following":
        // Simulate following - would be based on actual follows
        filtered = filtered.slice(0, 4);
        break;
    }

    return filtered;
  }, [activeFilter]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Role Selection Modal for first-time users */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      />

      {/* Search Spotlight Modal */}
      <SearchSpotlight
        creators={CREATORS}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {/* Feed Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles size={20} className="text-primary" />
              Discover
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Support talented creators and developers from India
            </p>
          </div>

          {/* Search Bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className={cn(
              "relative flex items-center gap-3 px-4 py-2.5 rounded-xl",
              "bg-muted/50 border border-border/40",
              "hover:bg-muted hover:border-border/60",
              "transition-all duration-200",
              "w-full sm:w-auto sm:min-w-[320px]"
            )}
          >
            <Search size={16} className="text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground flex-1 text-left">
              Search creators, developers, projects...
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-background border border-border/40">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="mt-6">
          <FeedFilterChips active={activeFilter} setActive={setActiveFilter} />
        </div>
      </div>

      {/* Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <FeedSkeleton count={4} />
        ) : filteredCreators.length === 0 ? (
          <EmptyState filter={activeFilter} />
        ) : (
          filteredCreators.map((creator, index) => (
            <CreatorSpotlightCard
              key={creator.id}
              creator={creator}
              index={index}
            />
          ))
        )}
      </div>

      {/* Load more indicator */}
      {!loading && filteredCreators.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCreators.length} talented {activeFilter === "all" ? "people" : activeFilter}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            More creators joining every day
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyState({ filter }: { filter: string }) {
  const messages: Record<string, { title: string; description: string }> = {
    following: {
      title: "No creators followed yet",
      description: "Start discovering and following creators to see them here.",
    },
    creators: {
      title: "No creators found",
      description: "Check back soon as new creators join the platform.",
    },
    developers: {
      title: "No developers found",
      description: "Check back soon as new developers join the platform.",
    },
    trending: {
      title: "Trending content coming soon",
      description: "We're calculating what's hot right now. Check back shortly.",
    },
  };

  const { title, description } = messages[filter] || {
    title: "Nothing here yet",
    description: "No content matches this filter. Try another option.",
  };

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-8 rounded-2xl border border-dashed border-border/50 bg-gradient-to-b from-muted/30 to-muted/10 text-center animate-fade-in-scale">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/20 flex items-center justify-center mb-5 shadow-lg">
        <Sparkles size={24} className="text-primary/60" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
}
