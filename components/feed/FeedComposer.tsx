"use client";

import { useState, useRef } from "react";
import { Image, Video, BarChart3, Link2, X, Send, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/use-user-profile";

interface FeedComposerProps {
  onSubmit?: (content: string, type: string) => void;
}

export function FeedComposer({ onSubmit }: FeedComposerProps) {
  const { user, loading } = useUserProfile();
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Get initials for avatar fallback
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "US";

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit?.(content, selectedType || "text");
    setContent("");
    setSelectedType(null);
    setIsExpanded(false);
  };

  const actionButtons = [
    { id: "image", icon: Image, label: "Image", color: "text-emerald-500 hover:bg-emerald-500/10" },
    { id: "video", icon: Video, label: "Video", color: "text-rose-500 hover:bg-rose-500/10" },
    { id: "poll", icon: BarChart3, label: "Poll", color: "text-amber-500 hover:bg-amber-500/10" },
    { id: "link", icon: Link2, label: "Link", color: "text-sky-500 hover:bg-sky-500/10" },
  ];

  return (
    <div className={cn("relative rounded-2xl border border-border/30 bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-sm shadow-[0_4px_20px_-8px_rgba(15,16,53,0.08)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] animate-slide-in-up overflow-hidden", isExpanded && "shadow-[0_8px_32px_-12px_rgba(15,16,53,0.12)]")}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative p-5">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className={cn("absolute -inset-0.5 rounded-full bg-gradient-to-r blur-sm opacity-40 from-amber-400/40 to-orange-400/30")} />
            <Avatar className="relative h-10 w-10 border-2 border-background shadow-md">
              <AvatarImage src={user?.profilePic || "/avatar.jpg"} alt={user?.name || "User"} />
              <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br from-amber-400/40 to-orange-400/30")}>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share something with the community..."
              className="w-full min-h-[48px] max-h-[200px] resize-none bg-transparent border-none outline-none text-[15px] text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
              rows={isExpanded ? 3 : 1}
            />
            {selectedType && (
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 animate-fade-in-scale">
                  {(() => {
                    const Icon = actionButtons.find(b => b.id === selectedType)?.icon;
                    return Icon ? <Icon size={12} /> : null;
                  })()}
                  {actionButtons.find(b => b.id === selectedType)?.label}
                  <button onClick={() => setSelectedType(null)} className="ml-1 hover:text-destructive transition-colors"><X size={10} /></button>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={cn("flex items-center justify-between mt-4 pt-4 border-t border-border/20 transition-all duration-300", !isExpanded && "opacity-70")}>
          <div className="flex items-center gap-1">
            {actionButtons.map((btn) => {
              const Icon = btn.icon;
              const isSelected = selectedType === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setSelectedType(isSelected ? null : btn.id)}
                  className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95", isSelected ? "bg-primary/10 text-primary border border-primary/20" : cn("text-muted-foreground", btn.color))}
                >
                  <Icon size={16} className={cn(isSelected && "scale-110")} />
                  <span className="hidden sm:inline">{btn.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
              <Sparkles size={12} />
              <span>Everyone</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className={cn("flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out hover:scale-105 active:scale-95", content.trim() ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed")}
            >
              <Send size={14} />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
