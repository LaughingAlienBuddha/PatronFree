"use client";

import { useState } from "react";
import { UserPlus, Activity, TrendingUp, Star, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ACTIVITY_ITEMS = [
  { id: "a1", user: "nova.dev", action: "started following you", time: "2m", initials: "ND", color: "from-primary/30 to-secondary/20" },
  { id: "a2", user: "Lyra Arts", action: "liked your post", time: "9m", initials: "LA", color: "from-pink-400/30 to-purple-400/20" },
  { id: "a3", user: "buildwithkai", action: "commented on your project", time: "23m", initials: "BK", color: "from-emerald-400/30 to-cyan-400/20" },
  { id: "a4", user: "SynthWave", action: "is now supporting you", time: "1h", initials: "SW", color: "from-amber-400/30 to-orange-400/20" },
];

const SUGGESTIONS = [
  { id: "s1", name: "Aria Chen", handle: "aria.creates", role: "Creator", initials: "AC", color: "from-pink-400/30 to-violet-400/20" },
  { id: "s2", name: "Miles Okonjo", handle: "milesdev", role: "Developer", initials: "MO", color: "from-primary/30 to-secondary/20" },
  { id: "s3", name: "Luna Park", handle: "lunacodes", role: "Developer", initials: "LP", color: "from-emerald-400/30 to-cyan-400/20" },
  { id: "s4", name: "Zara Voss", handle: "zaravisuals", role: "Creator", initials: "ZV", color: "from-amber-400/30 to-rose-400/20" },
];

const TRENDING = [
  { id: "t1", name: "Kai Bennett", handle: "kaibuilds", tag: "Open Source", initials: "KB", color: "from-primary/30 to-secondary/20" },
  { id: "t2", name: "Noor Patel", handle: "noor.art", tag: "Illustration", initials: "NP", color: "from-purple-400/30 to-pink-400/20" },
  { id: "t3", name: "Sam Osei", handle: "sambuilds", tag: "React / Next.js", initials: "SO", color: "from-sky-400/30 to-indigo-400/20" },
];

const EVENTS = [
  { title: "Creator Spotlight: Aria Chen", date: "Mar 26" },
  { title: "Dev Meetup — Open Source Hour", date: "Mar 28" },
  { title: "Patronex Community AMA", date: "Apr 2" },
];

export function RightPanel() {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  return (
    <aside className="sticky top-[80px] space-y-4 h-fit">
      {/* Profile completion card */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10 p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Complete your profile</p>
            <p className="text-xs text-muted-foreground mt-0.5">Add a bio and link to boost visibility</p>
            <div className="mt-3 h-1.5 rounded-full bg-border/40 overflow-hidden">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-secondary/80 transition-all duration-700" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">65% complete</p>
          </div>
        </div>
      </div>

      {/* Activity */}
      <PanelSection title="Activity" icon={Activity}>
        <div className="space-y-3">
          {ACTIVITY_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center gap-2.5 group">
              <Avatar className="h-7 w-7 shrink-0 border border-border/30">
                <AvatarFallback className={cn("text-[10px] font-bold bg-gradient-to-br", item.color)}>
                  {item.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/90 leading-snug">
                  <span className="font-semibold">@{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground/60 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Suggested */}
      <PanelSection title="Suggested for you" icon={Star}>
        <div className="space-y-3">
          {SUGGESTIONS.map((s) => (
            <div key={s.id} className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8 shrink-0 border border-border/30">
                <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br", s.color)}>
                  {s.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{s.name}</p>
                <p className="text-[10px] text-muted-foreground">@{s.handle} · {s.role}</p>
              </div>
              <button
                onClick={() => setFollowing((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                className={cn(
                  "shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200",
                  following[s.id]
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.03] shadow-[0_2px_8px_rgba(54,84,134,0.25)]"
                )}
              >
                {following[s.id] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Trending */}
      <PanelSection title="Trending" icon={TrendingUp}>
        <div className="space-y-2.5">
          {TRENDING.map((t, i) => (
            <div key={t.id} className="flex items-center gap-2.5 group cursor-pointer">
              <span className="text-[11px] font-bold text-muted-foreground/40 w-4 text-center">{i + 1}</span>
              <Avatar className="h-7 w-7 shrink-0 border border-border/30">
                <AvatarFallback className={cn("text-[10px] font-bold bg-gradient-to-br", t.color)}>
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Events */}
      <PanelSection title="Upcoming" icon={Calendar}>
        <div className="space-y-2.5">
          {EVENTS.map((e, i) => (
            <div key={i} className="flex items-start gap-3 group cursor-pointer">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground/90 leading-snug group-hover:text-primary transition-colors">{e.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{e.date}</p>
              </div>
              <ArrowRight size={12} className="text-muted-foreground/40 shrink-0 mt-0.5 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>
      </PanelSection>
    </aside>
  );
}

function PanelSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/35 bg-card/70 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon size={13} className="text-muted-foreground/70" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{title}</h3>
        </div>
        <button className="text-[11px] font-medium text-primary/80 hover:text-primary transition-colors">
          See all
        </button>
      </div>
      {children}
    </div>
  );
}
