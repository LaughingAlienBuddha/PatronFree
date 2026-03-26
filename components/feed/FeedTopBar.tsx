"use client";

import { useState } from "react";
import { Search, Bell, MessageCircle, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function FeedTopBar({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-[64px] flex items-center gap-4 px-5",
        "bg-background/80 backdrop-blur-2xl border-b border-border/30",
        "shadow-[0_1px_20px_-8px_rgba(15,16,53,0.1)]",
        "transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
        collapsed ? "left-[72px]" : "left-[260px]"
      )}
    >
      {/* Search bar */}
      <div
        className={cn(
          "relative flex-1 max-w-md transition-all duration-300",
          searchFocused ? "max-w-lg" : "max-w-md"
        )}
      >
        <Search
          size={15}
          className={cn(
            "absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200",
            searchFocused ? "text-primary" : "text-muted-foreground/60"
          )}
        />
        <input
          type="text"
          placeholder="Search creators, developers, projects…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={cn(
            "w-full h-9 rounded-full pl-9 pr-4 text-sm",
            "bg-muted/40 border border-border/40",
            "placeholder:text-muted-foreground/50 text-foreground",
            "outline-none transition-all duration-300",
            "focus:bg-background focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(54,84,134,0.1),0_0_20px_-4px_rgba(127,199,217,0.3)]"
          )}
        />
        {!searchFocused && (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border/50 bg-muted/60 px-1.5 font-mono text-[10px] text-muted-foreground/70">
            <span>⌘</span>K
          </kbd>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Role badge */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-muted/30 hover:bg-muted/60 transition-all duration-200 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Creator Mode
          <ChevronDown size={11} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
          aria-label="Toggle theme"
        >
          <Sun size={16} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon size={16} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 group">
          <Bell size={16} className="group-hover:animate-[wiggle_0.3s_ease]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
        </button>

        {/* Messages */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200">
          <MessageCircle size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary ring-2 ring-background" />
        </button>

        {/* Avatar */}
        <button className="ml-1 group">
          <Avatar className="h-8 w-8 border-2 border-border/50 ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-200 cursor-pointer">
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary text-xs font-bold">
              DX
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
