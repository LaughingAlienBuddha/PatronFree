"use client";

import { Github, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntegrationPanel() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 fill-mode-both hover:shadow-md hover:border-border/80" style={{ animationDelay: "700ms" }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg text-foreground tracking-tight">Active Integrations</h3>
          <p className="text-sm text-muted-foreground mt-1">Manage connected platforms</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-300 hover:bg-muted/40 hover:border-primary/30 hover:shadow-[0_4px_20px_-5px_rgba(var(--primary),0.15)] hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#24292F] text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-sm">
              <Github size={24} />
            </div>
            <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">GitHub</h4>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-500 transition-colors group-hover:bg-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Connected
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Syncs repositories & sponsors</p>
            </div>
            <Button variant="ghost" size="icon" className="group-hover:text-primary transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 h-8 w-8 rounded-full">
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>

        <div className="group rounded-xl border border-border/60 bg-muted/10 p-4 transition-all duration-300 hover:bg-primary/5 hover:border-primary/40 hover:shadow-[0_4px_20px_-5px_rgba(var(--primary),0.1)] hover:-translate-y-1 border-dashed cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
              <Play size={24} className="ml-1 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex-1 cursor-pointer transition-transform duration-300 group-hover:translate-x-1">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Connect YouTube</h4>
              <p className="text-xs text-muted-foreground">Link your tutorial channel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
