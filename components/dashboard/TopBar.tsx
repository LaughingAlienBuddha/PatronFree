"use client";

import { Search, Bell, Plus, Eye, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function TopBar({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <header 
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between px-6 bg-background/60 backdrop-blur-xl border-b border-border/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <Button size="sm" className="rounded-full shadow-sm shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
          <Plus size={16} className="mr-1.5" />
          Publish
        </Button>
        <Button size="sm" variant="secondary" className="rounded-full hover:-translate-y-0.5 transition-all bg-secondary/50 hover:bg-secondary/80">
          <Eye size={16} className="mr-1.5" />
          Preview
        </Button>
      </div>

      <div className="flex-1 max-w-md mx-6 px-4 hidden md:flex">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects, transactions, or users..." 
            className="w-full h-9 bg-muted/30 border border-border/50 rounded-full pl-9 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:shadow-[0_0_15px_-3px_rgba(var(--primary),0.2)]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-muted/60 relative"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-background"></span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-muted/60"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}
