"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  LineChart, 
  CreditCard, 
  Megaphone, 
  MessageSquare, 
  Bell, 
  Settings,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Library", href: "/dashboard/library", icon: BookOpen },
  { name: "Audience", href: "/dashboard/audience", icon: Users },
  { name: "Insights", href: "/dashboard/insights", icon: LineChart },
  { name: "Payouts", href: "/dashboard/payouts", icon: CreditCard },
  { name: "Promotions", href: "/dashboard/promotions", icon: Megaphone },
  { name: "Chats", href: "/dashboard/chats", icon: MessageSquare },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (c: boolean) => void }) {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col border-r border-border/40 bg-background/80 backdrop-blur-xl",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="flex h-16 items-center px-4 justify-between border-b border-border/40">
        {!collapsed && (
          <div className="flex items-center gap-2 font-bold text-lg text-foreground tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-xl">▲</span>
            </div>
            Patronex
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
            ▲
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors",
            collapsed && "mx-auto mt-2 absolute -right-3 top-4 bg-background border shadow-sm rounded-full"
          )}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 scrollbar-none pb-20">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-all duration-200", 
                  isActive ? "text-primary scale-110" : "group-hover:scale-110 group-hover:text-foreground"
                )} 
              />
              {!collapsed && (
                <span className="truncate">{item.name}</span>
              )}
              {isActive && !collapsed && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary animate-in fade-in zoom-in" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/40 bg-background/50">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="h-9 w-9 border border-border/50 ring-2 ring-transparent transition-all hover:ring-primary/20 cursor-pointer">
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">DX</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 flex items-center justify-between overflow-hidden cursor-pointer hover:bg-muted/50 p-1.5 -ml-1.5 rounded-lg transition-colors">
              <div className="truncate">
                <p className="text-sm font-medium text-foreground truncate">DevX Team</p>
                <p className="text-xs text-muted-foreground truncate">Free Plan</p>
              </div>
              <ChevronDown size={14} className="text-muted-foreground shrink-0" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
