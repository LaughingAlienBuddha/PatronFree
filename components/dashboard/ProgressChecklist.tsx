"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const items = [
  { id: 1, title: "Connect GitHub Account", completed: true },
  { id: 2, title: "Set up payout method", completed: true },
  { id: 3, title: "Publish your first project", completed: false },
  { id: 4, title: "Share on social media", completed: false },
];

export function ProgressChecklist() {
  const completedCount = items.filter(i => i.completed).length;
  const progressPercentage = Math.round((completedCount / items.length) * 100);

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 fill-mode-both hover:shadow-md hover:border-border/80" style={{ animationDelay: "600ms" }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-lg text-foreground tracking-tight">Getting Started</h3>
          <p className="text-sm text-muted-foreground mt-1">Complete your profile to unlock all features</p>
        </div>
        <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full shadow-sm">
          {progressPercentage}%
        </div>
      </div>

      <div className="mb-6 relative">
        <Progress value={progressPercentage} className="h-2.5 rounded-full overflow-hidden bg-muted/50" />
      </div>

      <div className="space-y-1.5">
        {items.map((item) => (
          <div 
            key={item.id}
            className={cn(
              "group flex items-center gap-3 p-3 -mx-3 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden relative",
              item.completed ? "hover:bg-muted/40" : "hover:bg-muted/60 hover:-translate-y-0.5 hover:shadow-sm"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {item.completed ? (
              <CheckCircle2 size={20} className="text-emerald-500 shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm z-10" />
            ) : (
              <Circle size={20} className="text-muted-foreground/60 shrink-0 transition-all duration-300 group-hover:text-primary group-hover:scale-110 z-10" />
            )}
            
            <span className={cn(
              "text-sm font-medium transition-all duration-300 z-10 relative",
              item.completed ? "text-muted-foreground line-through decoration-muted-foreground/30 group-hover:text-foreground/60" : "text-foreground group-hover:text-primary group-hover:translate-x-1"
            )}>
              {item.title}
            </span>

            {!item.completed && (
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1 z-10 relative">
                <div className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/15 px-2.5 py-1 rounded-md shadow-[0_0_10px_-2px_rgba(var(--primary),0.3)]">
                  Start
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
