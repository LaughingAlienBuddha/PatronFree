"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function WelcomeSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-border/50 p-8 pt-10 pb-8 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
          <Sparkles size={14} />
          Welcome back to Patronex
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200 fill-mode-both">
          Ready to share your next project?
        </h1>
        
        <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
          Your open-source contributions have reached 1,492 developers this week. Keep the momentum going by publishing your latest work.
        </p>

        <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-500 fill-mode-both mt-4">
          <Button className="h-11 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-[0_0_20px_-3px_rgba(var(--primary),0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto overflow-hidden group relative">
            <span className="relative z-10 flex items-center">
              Publish New Project
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </Button>
          <Button variant="outline" className="h-11 px-6 rounded-xl hover:bg-muted/50 border-border/60 hover:border-border hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 transition-all w-full sm:w-auto">
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
