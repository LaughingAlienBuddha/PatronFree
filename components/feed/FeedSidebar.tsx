"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Bell,
  MessageCircle,
  Bookmark,
  UserCheck,
  Heart,
  LayoutDashboard,
  Code2,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  User,
  Repeat2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home, group: "main" },
  { name: "Explore", href: "/dashboard/explore", icon: Compass, group: "main" },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell, group: "main", badge: 4 },
  { name: "Messages", href: "/dashboard/messages", icon: MessageCircle, group: "main", badge: 2 },
  { name: "Saved", href: "/dashboard/saved", icon: Bookmark, group: "main" },
  { name: "Following", href: "/dashboard/following", icon: UserCheck, group: "social" },
  { name: "My Support", href: "/dashboard/support", icon: Heart, group: "social" },
  { name: "Creator Dashboard", href: "/dashboard/creator", icon: Zap, group: "role" },
  { name: "Developer Dashboard", href: "/dashboard/developer", icon: Code2, group: "role" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, group: "bottom" },
];

const profileMenuItems = [
  { label: "View Profile", icon: User, action: "profile" },
  { label: "Switch to Creator Mode", icon: Zap, action: "creator" },
  { label: "Switch to Developer Mode", icon: Code2, action: "developer" },
  { label: "Account Settings", icon: Settings, action: "settings" },
  { label: "Logout", icon: LogOut, action: "logout", danger: true },
];

interface FeedSidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export function FeedSidebar({ collapsed, setCollapsed }: FeedSidebarProps) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const groups = [
    { key: "main", items: navItems.filter((n) => n.group === "main") },
    { key: "social", label: "Social", items: navItems.filter((n) => n.group === "social") },
    { key: "role", label: "Dashboards", items: navItems.filter((n) => n.group === "role") },
  ];

  return (
    <>
      {/* Overlay backdrop on mobile when expanded */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-border/30",
          "bg-background/85 backdrop-blur-2xl shadow-[4px_0_32px_-8px_rgba(15,16,53,0.12)]",
          "transition-[width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          collapsed ? "w-[72px]" : "w-[260px]"
        )}
      >
        {/* Header / Logo */}
        <div className="flex h-[64px] items-center px-4 border-b border-border/30 shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-primary to-secondary/70 flex items-center justify-center shadow-[0_4px_12px_rgba(54,84,134,0.4)]">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span
              className={cn(
                "font-bold text-[15px] tracking-tight text-foreground whitespace-nowrap",
                "transition-[opacity,transform] duration-200 ease-out",
                collapsed ? "opacity-0 -translate-x-2 pointer-events-none" : "opacity-100 translate-x-0"
              )}
            >
              Patronex
            </span>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "ml-auto shrink-0 w-7 h-7 rounded-lg flex items-center justify-center",
              "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              "transition-all duration-200",
              collapsed && "mx-auto ml-auto"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              size={14}
              className={cn(
                "transition-transform duration-300",
                !collapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-5 scrollbar-none">
          {groups.map((group) => (
            <div key={group.key}>
              {group.label && !collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-2 mb-2 transition-opacity duration-200">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      title={collapsed ? item.name : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                        "transition-all duration-200 ease-out",
                        isActive
                          ? "bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-primary" />
                      )}

                      <div className="relative shrink-0">
                        <Icon
                          size={18}
                          className={cn(
                            "transition-all duration-200",
                            isActive
                              ? "text-primary"
                              : "group-hover:scale-110 group-hover:text-primary/80",
                            isActive && "drop-shadow-[0_0_6px_rgba(54,84,134,0.5)]"
                          )}
                        />
                        {(item as any).badge && (
                          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center leading-none">
                            {(item as any).badge}
                          </span>
                        )}
                      </div>

                      {!collapsed && (
                        <span className="truncate transition-all duration-200">{item.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Profile Card */}
        <div
          ref={profileRef}
          className="relative p-3 border-t border-border/30 bg-gradient-to-t from-muted/20 to-transparent shrink-0"
        >
          {/* Profile Menu Popup */}
          {profileOpen && (
            <div
              className={cn(
                "absolute bottom-full mb-2 left-3 right-3 z-50",
                "rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl",
                "shadow-[0_-8px_40px_-8px_rgba(15,16,53,0.2)]",
                "animate-in slide-in-from-bottom-2 fade-in duration-200",
                collapsed && "left-full ml-2 right-auto w-48 bottom-2"
              )}
            >
              <div className="p-2 space-y-0.5">
                {profileMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.action}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium",
                        "transition-all duration-150 text-left",
                        item.danger
                          ? "text-red-500/80 hover:bg-red-500/10 hover:text-red-500"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <Icon size={14} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              "w-full flex items-center gap-3 rounded-xl p-2",
              "hover:bg-muted/50 transition-all duration-200 group",
              collapsed && "justify-center"
            )}
          >
            <div className="relative shrink-0">
              <Avatar className="h-9 w-9 border-2 border-border/50 ring-2 ring-transparent group-hover:ring-primary/25 transition-all duration-200">
                <AvatarImage src="/avatar.jpg" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary text-xs font-bold">
                  DX
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background" />
            </div>

            {!collapsed && (
              <>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">DevX Team</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-0 bg-primary/10 text-primary text-[10px] font-semibold">
                      <Zap size={8} />
                      Creator
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-muted-foreground/70 shrink-0 transition-transform duration-200",
                    profileOpen && "rotate-180"
                  )}
                />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
