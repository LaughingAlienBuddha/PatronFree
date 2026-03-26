"use client";

import { useState } from "react";
import { Image, Video, BarChart2, Link2, FileCode2, Globe, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function FeedComposer() {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState("");

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-card/80 backdrop-blur-xl",
        "shadow-[0_4px_24px_-8px_rgba(15,16,53,0.1)]",
        "transition-all duration-300 ease-out",
        expanded && "shadow-[0_8px_40px_-12px_rgba(15,16,53,0.18)]"
      )}
    >
      <div className="p-4 flex items-start gap-3">
        <Avatar className="h-9 w-9 shrink-0 mt-0.5 border border-border/40">
          <AvatarImage src="/avatar.jpg" alt="You" />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary text-xs font-bold">DX</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setExpanded(true)}
            onBlur={() => !text && setExpanded(false)}
            placeholder="Share something with the community…"
            rows={expanded ? 3 : 1}
            className={cn(
              "w-full resize-none bg-transparent text-sm text-foreground",
              "placeholder:text-muted-foreground/60 outline-none",
              "transition-all duration-300 ease-out leading-relaxed"
            )}
          />

          {expanded && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="h-px bg-border/30 mb-3" />
              <div className="flex items-center justify-between">
                {/* Media actions */}
                <div className="flex items-center gap-1">
                  {[
                    { Icon: Image, label: "Photo", color: "text-emerald-500/80" },
                    { Icon: Video, label: "Video", color: "text-blue-500/80" },
                    { Icon: BarChart2, label: "Poll", color: "text-purple-500/80" },
                    { Icon: Link2, label: "Link", color: "text-orange-500/80" },
                    { Icon: FileCode2, label: "Project update", color: "text-primary/80" },
                  ].map(({ Icon, label, color }) => (
                    <button
                      key={label}
                      title={label}
                      className={cn(
                        "p-2 rounded-lg hover:bg-muted/60 transition-all duration-150",
                        "hover:scale-110 active:scale-95",
                        color
                      )}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {/* Audience */}
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-border/40 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all">
                    <Globe size={11} />
                    Public
                    <ChevronDown size={10} />
                  </button>

                  {/* Post button */}
                  <button
                    disabled={!text.trim()}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200",
                      text.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(54,84,134,0.35)] hover:shadow-[0_6px_20px_rgba(54,84,134,0.45)]"
                        : "bg-muted text-muted-foreground/50 cursor-not-allowed"
                    )}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
