"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Zap, MoreHorizontal, Code2, Palette } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface PostData {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar?: string;
    initials: string;
    role: "developer" | "creator" | "supporter";
  };
  timestamp: string;
  tag: "Developer" | "Creator" | "Update" | "Release" | "Artwork" | "Announcement" | "Milestone";
  content: string;
  image?: string;
  stats: { likes: number; comments: number; shares: number };
  hasSupport?: boolean;
}

const TAG_CONFIG: Record<PostData["tag"], { color: string; bg: string }> = {
  Developer: { color: "text-primary", bg: "bg-primary/10" },
  Creator: { color: "text-secondary-foreground", bg: "bg-secondary/30" },
  Update: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  Release: { color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10" },
  Artwork: { color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-500/10" },
  Announcement: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  Milestone: { color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-500/10" },
};

const ROLE_ICONS: Record<PostData["author"]["role"], React.ComponentType<{ size?: number; className?: string }>> = {
  developer: Code2,
  creator: Palette,
  supporter: Heart,
};

interface FeedPostCardProps {
  post: PostData;
  style?: React.CSSProperties;
}

export function FeedPostCard({ post, style }: FeedPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [supported, setSupported] = useState(false);

  const RoleIcon = ROLE_ICONS[post.author.role];
  const tagCfg = TAG_CONFIG[post.tag];

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  return (
    <article
      style={style}
      className={cn(
        "group relative rounded-2xl border border-border/35 bg-card/80 backdrop-blur-sm",
        "shadow-[0_2px_16px_-6px_rgba(15,16,53,0.08)]",
        "hover:shadow-[0_8px_32px_-8px_rgba(15,16,53,0.16)] hover:-translate-y-0.5 hover:border-border/60",
        "transition-all duration-300 ease-out",
        "animate-in fade-in slide-in-from-bottom-3",
        "overflow-hidden"
      )}
    >
      {/* Card content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10 border border-border/40 ring-2 ring-transparent group-hover:ring-primary/15 transition-all duration-300">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary text-xs font-bold">
                  {post.author.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-background flex items-center justify-center border border-border/40">
                <RoleIcon size={9} className="text-muted-foreground" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground leading-tight">{post.author.name}</span>
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
                    tagCfg.bg,
                    tagCfg.color
                  )}
                >
                  {post.tag}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-muted-foreground">@{post.author.handle}</span>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <span className="text-xs text-muted-foreground/70">{post.timestamp}</span>
              </div>
            </div>
          </div>

          <button className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <MoreHorizontal size={15} />
          </button>
        </div>

        {/* Post content */}
        <p className="text-sm text-foreground/90 leading-relaxed mb-4">{post.content}</p>

        {/* Image preview */}
        {post.image && (
          <div className="relative rounded-xl overflow-hidden mb-4 border border-border/20">
            <div
              className="w-full h-48 bg-gradient-to-br from-muted/60 to-muted/30 group-hover:scale-[1.02] transition-transform duration-500 ease-out flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, var(--p-200) 0%, var(--p-700) 100%)`,
              }}
            >
              <span className="text-white/60 text-xs font-medium uppercase tracking-widest">{post.image}</span>
            </div>
          </div>
        )}

        {/* Support CTA */}
        {post.hasSupport && (
          <button
            onClick={() => setSupported(!supported)}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold mb-4",
              "border transition-all duration-200",
              supported
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-gradient-to-r from-primary/5 to-secondary/10 border-border/40 text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5"
            )}
          >
            <Zap size={14} className={cn("transition-all", supported && "text-primary")} />
            {supported ? "Supporting this creator ✓" : "Back this creator"}
          </button>
        )}

        {/* Actions */}
        <div className="flex items-center gap-0 pt-2 border-t border-border/20">
          <ActionBtn
            icon={Heart}
            count={likeCount}
            active={liked}
            activeColor="text-red-500"
            activeBg="hover:bg-red-500/10"
            onClick={handleLike}
            label="Like"
          />
          <ActionBtn
            icon={MessageCircle}
            count={post.stats.comments}
            activeColor="text-primary"
            activeBg="hover:bg-primary/10"
            label="Comment"
          />
          <ActionBtn
            icon={Share2}
            count={post.stats.shares}
            activeColor="text-emerald-500"
            activeBg="hover:bg-emerald-500/10"
            label="Share"
          />
          <div className="ml-auto">
            <ActionBtn
              icon={Bookmark}
              active={saved}
              activeColor="text-primary"
              activeBg="hover:bg-primary/10"
              onClick={() => setSaved(!saved)}
              label="Save"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionBtn({
  icon: Icon,
  count,
  active,
  activeColor,
  activeBg,
  onClick,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  count?: number;
  active?: boolean;
  activeColor: string;
  activeBg: string;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium",
        "transition-all duration-200 ease-out hover:scale-[1.04] active:scale-[0.97]",
        active
          ? cn(activeColor, "bg-opacity-10")
          : "text-muted-foreground/70 hover:text-foreground",
        activeBg
      )}
    >
      <Icon
        size={15}
        className={cn(
          "transition-transform duration-200",
          active && cn(activeColor, "scale-110", "fill-current"),
          !active && "group-hover:scale-110"
        )}
      />
      {count !== undefined && (
        <span className={cn("tabular-nums", active && activeColor)}>{count}</span>
      )}
    </button>
  );
}
