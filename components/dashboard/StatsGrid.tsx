"use client";

import { ArrowUpRight, ArrowDownRight, Users, Heart, Coins, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Revenue",
    value: "₹ 1,24,500",
    trend: "+12.5%",
    trendUp: true,
    icon: Coins,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Active Sponsors",
    value: "342",
    trend: "+4.1%",
    trendUp: true,
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Followers",
    value: "8,912",
    trend: "+24.8%",
    trendUp: true,
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    trend: "-1.4%",
    trendUp: false,
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent blur-3xl -z-10 rounded-full" />
      {stats.map((stat, i) => (
        <div 
          key={stat.title}
          className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(var(--primary),0.2)] hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary/20 hover:z-10 animate-in fade-in slide-in-from-bottom-8 fill-mode-both cursor-pointer"
          style={{ animationDelay: `${i * 100 + 400}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay" />
          
          <div className="flex items-start justify-between mb-4">
            <div className={cn("inline-flex items-center justify-center rounded-xl w-10 h-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-inner", stat.bgColor, stat.color)}>
              <stat.icon size={20} className="drop-shadow-sm" />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 shadow-sm",
              stat.trendUp ? "text-emerald-500 bg-emerald-500/15" : "text-red-500 bg-red-500/15"
            )}>
              {stat.trendUp ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
              {stat.trend}
            </div>
          </div>
          
          <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            <h3 className="text-sm font-medium text-muted-foreground/80 mb-1 group-hover:text-foreground/70 transition-colors">{stat.title}</h3>
            <p className="text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
