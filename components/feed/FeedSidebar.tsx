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
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Zap,
  Layers,
  Users,
  Wallet,
  FolderGit2,
  HandCoins,
  BarChart3,
  Sparkles,
  Plus,
  Heart,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/use-user-profile";

type UserRole = "creator" | "developer" | "supporter";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

interface NavGroup {
  key: string;
  label?: string;
  items: NavItem[];
}

// Role-based navigation configuration
const ROLE_NAV_CONFIG: Record<UserRole, NavGroup[]> = {
  creator: [
    {
      key: "main",
      items: [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Explore", href: "/dashboard/explore", icon: Compass },
        { name: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 4 },
        { name: "Messages", href: "/dashboard/messages", icon: MessageCircle, badge: 2 },
      ],
    },
    {
      key: "workspace",
      label: "Your Space",
      items: [
        { name: "My Content", href: "/dashboard/content", icon: Layers },
        { name: "Audience", href: "/dashboard/audience", icon: Users },
        { name: "Earnings", href: "/dashboard/earnings", icon: Wallet },
        { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
      ],
    },
  ],
  developer: [
    {
      key: "main",
      items: [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Explore", href: "/dashboard/explore", icon: Compass },
        { name: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 3 },
        { name: "Messages", href: "/dashboard/messages", icon: MessageCircle },
      ],
    },
    {
      key: "workspace",
      label: "Your Space",
      items: [
        { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
        { name: "Sponsors", href: "/dashboard/sponsors", icon: HandCoins },
        { name: "Insights", href: "/dashboard/insights", icon: BarChart3 },
        { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
      ],
    },
  ],
  supporter: [
    {
      key: "main",
      items: [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Explore", href: "/dashboard/explore", icon: Compass },
        { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
        { name: "Messages", href: "/dashboard/messages", icon: MessageCircle },
      ],
    },
    {
      key: "workspace",
      label: "Your Support",
      items: [
        { name: "My Support", href: "/dashboard/support", icon: Heart },
        { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Zap },
        { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
      ],
    },
  ],
};

// Available roles for multi-role switching
const AVAILABLE_ROLES: { id: UserRole; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }[] = [
  { id: "creator", label: "Creator", icon: Zap, color: "text-amber-500" },
  { id: "developer", label: "Developer", icon: Code2, color: "text-sky-500" },
  { id: "supporter", label: "Supporter", icon: Heart, color: "text-rose-500" },
];

// Indian names for realism
const INDIAN_USERS = [
  { name: "Aarav Mehta", initials: "AM", color: "from-amber-400/40 to-orange-400/30" },
  { name: "Ananya Sharma", initials: "AS", color: "from-rose-400/40 to-pink-400/30" },
  { name: "Rohan Verma", initials: "RV", color: "from-emerald-400/40 to-teal-400/30" },
  { name: "Priya Patel", initials: "PP", color: "from-violet-400/40 to-purple-400/30" },
  { name: "Arjun Reddy", initials: "AR", color: "from-sky-400/40 to-blue-400/30" },
];

interface FeedSidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export function FeedSidebar({ collapsed, setCollapsed }: FeedSidebarProps) {
  const pathname = usePathname();
  const { user, loading } = useUserProfile();
  const [activeRole, setActiveRole] = useState<UserRole>("creator");
  const [userRoles, setUserRoles] = useState<UserRole[]>(["creator", "developer"]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [showRoleSwitchHint, setShowRoleSwitchHint] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Get initials for avatar fallback
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "US";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowRoleSwitchHint(true), 500);
    const hideTimer = setTimeout(() => setShowRoleSwitchHint(false), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleRoleSwitch = (role: UserRole) => {
    setActiveRole(role);
    setRoleMenuOpen(false);
  };

  const navGroups = ROLE_NAV_CONFIG[activeRole];
  const hasMultipleRoles = userRoles.length > 1;
  const inactiveRoles = AVAILABLE_ROLES.filter(r => r.id !== activeRole && userRoles.includes(r.id));
  const missingRoles = AVAILABLE_ROLES.filter(r => !userRoles.includes(r.id));

  const currentRoleConfig = AVAILABLE_ROLES.find(r => r.id === activeRole);

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden animate-fade-in-scale"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col",
          "bg-gradient-to-b from-background via-background to-muted/20",
          "border-r border-border/30",
          "shadow-[4px_0_40px_-12px_rgba(15,16,53,0.08)]",
          "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          collapsed ? "w-[72px]" : "w-[270px]"
        )}
      >
        {/* Header */}
        <div className="flex h-[68px] items-center px-4 border-b border-border/20 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 blur-lg animate-pulse-soft" />
              <div className="relative w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">P</span>
              </div>
            </div>
            <span
              className={cn(
                "font-bold text-[16px] tracking-tight text-foreground whitespace-nowrap",
                "transition-all duration-300 ease-out",
                collapsed ? "opacity-0 -translate-x-3 pointer-events-none" : "opacity-100 translate-x-0"
              )}
            >
              Patronex
            </span>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "ml-auto shrink-0 w-7 h-7 rounded-lg flex items-center justify-center",
              "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
              collapsed && "mx-auto"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              size={14}
              className={cn(
                "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                !collapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Role Switcher */}
        {hasMultipleRoles && !collapsed && (
          <div ref={roleMenuRef} className="px-3 pt-3 relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl",
                "bg-gradient-to-r from-muted/50 to-muted/20",
                "border border-border/30 hover:border-primary/30",
                "transition-all duration-300 ease-out group",
                "hover:shadow-md hover:-translate-y-0.5"
              )}
            >
              <div className={cn("p-1.5 rounded-lg bg-background/80", currentRoleConfig?.color)}>
                {currentRoleConfig && <currentRoleConfig.icon size={14} />}
              </div>
              <div className="flex-1 text-left">
                <p className="text-[11px] text-muted-foreground font-medium">Viewing as</p>
                <p className="text-sm font-semibold text-foreground">{currentRoleConfig?.label}</p>
              </div>
              <ChevronDown
                size={14}
                className={cn(
                  "text-muted-foreground transition-transform duration-300",
                  roleMenuOpen && "rotate-180"
                )}
              />
            </button>

            {roleMenuOpen && (
              <div className="absolute top-full left-3 right-3 mt-1 z-50 animate-fade-in-scale">
                <div className="rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-xl p-1.5">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
                    Switch to
                  </p>
                  {inactiveRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSwitch(role.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium",
                        "transition-all duration-200 hover:bg-muted/60 text-left group"
                      )}
                    >
                      <div className={cn("p-1 rounded-md bg-muted/50", role.color)}>
                        <role.icon size={14} />
                      </div>
                      <span className="text-foreground">{role.label}</span>
                      <Sparkles size={12} className="ml-auto text-muted-foreground/50 group-hover:text-amber-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showRoleSwitchHint && (
              <div className="absolute -top-1 right-0 animate-slide-in-up">
                <div className="bg-primary text-primary-foreground text-[10px] font-medium px-2 py-1 rounded-full shadow-lg">
                  Switch roles here!
                </div>
              </div>
            )}
          </div>
        )}

        {hasMultipleRoles && collapsed && (
          <div className="px-3 pt-3 flex justify-center">
            <button
              onClick={() => setCollapsed(false)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br from-muted/60 to-muted/30",
                "border border-border/30 hover:border-primary/40",
                "transition-all duration-300 hover:scale-110",
                currentRoleConfig?.color
              )}
              title={`Viewing as: ${currentRoleConfig?.label}`}
            >
              {currentRoleConfig && <currentRoleConfig.icon size={18} />}
            </button>
          </div>
        )}

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-5 scrollbar-none">
          {navGroups.map((group, groupIndex) => (
            <div
              key={group.key}
              className="animate-slide-in-up"
              style={{ animationDelay: `${groupIndex * 80}ms` }}
            >
              {group.label && !collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 mb-2 transition-opacity duration-200">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      title={collapsed ? item.name : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium",
                        "transition-all duration-300 ease-out",
                        isActive
                          ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-primary to-primary/60" />
                      )}

                      <div className="relative shrink-0">
                        <Icon
                          size={18}
                          className={cn(
                            "transition-all duration-300",
                            isActive
                              ? "text-primary scale-110"
                              : "group-hover:scale-110 group-hover:text-primary/80"
                          )}
                        />
                        {item.badge && (
                          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center leading-none animate-pulse-soft shadow-sm">
                            {item.badge > 9 ? "9+" : item.badge}
                          </span>
                        )}
                      </div>

                      {!collapsed && (
                        <span className="truncate transition-all duration-200">{item.name}</span>
                      )}

                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA for missing roles */}
          {!collapsed && missingRoles.length > 0 && (
            <div className="pt-2 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
              <div className="rounded-xl border border-dashed border-border/50 bg-muted/30 p-3">
                <p className="text-[11px] text-muted-foreground mb-2">Want to do more?</p>
                {missingRoles.slice(0, 1).map((role) => (
                  <button
                    key={role.id}
                    className={cn(
                      "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium",
                      "bg-background/60 hover:bg-background border border-border/30",
                      "transition-all duration-200 hover:shadow-sm group"
                    )}
                  >
                    <Plus size={12} className={role.color} />
                    <span className="text-foreground">
                      {role.id === "creator" && "Start Creating"}
                      {role.id === "developer" && "Become a Developer"}
                      {role.id === "supporter" && "Join as Supporter"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Profile Card */}
        <div
          ref={profileRef}
          className="relative p-3 border-t border-border/20 bg-gradient-to-t from-muted/30 via-muted/10 to-transparent shrink-0"
        >
          {profileOpen && (
            <div
              className={cn(
                "absolute bottom-full mb-2 left-3 right-3 z-50",
                "rounded-2xl border border-border/40 bg-background/98 backdrop-blur-xl",
                "shadow-[0_-12px_48px_-12px_rgba(15,16,53,0.2)]",
                "animate-fade-in-scale overflow-hidden",
                collapsed && "left-full ml-2 right-auto w-56 bottom-2"
              )}
            >
              <div className="px-4 py-3 bg-gradient-to-r from-muted/50 to-transparent border-b border-border/20">
                <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">@{user?.name?.toLowerCase().replace(" ", "") || "user"}</p>
              </div>
              
              <div className="p-2 space-y-0.5">
                <ProfileMenuItem icon={Users} label="View Profile" />
                <ProfileMenuItem icon={Settings} label="Account Settings" />
                
                {!hasMultipleRoles && (
                  <>
                    <div className="h-px bg-border/40 my-1 mx-2" />
                    {AVAILABLE_ROLES.filter(r => r.id !== activeRole).map((role) => (
                      <ProfileMenuItem
                        key={role.id}
                        icon={role.icon}
                        label={`Switch to ${role.label}`}
                        iconClass={role.color}
                        onClick={() => handleRoleSwitch(role.id)}
                      />
                    ))}
                  </>
                )}
                
                <div className="h-px bg-border/40 my-1 mx-2" />
                <ProfileMenuItem icon={LogOut} label="Logout" danger />
              </div>
            </div>
          )}

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              "w-full flex items-center gap-3 rounded-xl p-2.5",
              "hover:bg-muted/50 transition-all duration-300 group",
              collapsed && "justify-center",
              profileOpen && "bg-muted/60"
            )}
          >
            <div className="relative shrink-0">
              <div className={cn(
                "absolute -inset-0.5 rounded-full bg-gradient-to-r blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300 from-amber-400/40 to-orange-400/30"
              )} />
              <Avatar className="relative h-10 w-10 border-2 border-background shadow-md">
                <AvatarImage src={user?.profilePic || "/avatar.jpg"} alt={user?.name || "User"} />
                <AvatarFallback className={cn("text-xs font-bold bg-gradient-to-br from-amber-400/40 to-orange-400/30")}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background shadow-sm animate-pulse-soft" />
            </div>

            {!collapsed && (
              <>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">{user?.name || "User"}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                    )}>
                      {currentRoleConfig?.icon && <currentRoleConfig.icon size={9} />}
                      {currentRoleConfig?.label}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-muted-foreground/70 shrink-0 transition-transform duration-300",
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

function ProfileMenuItem({
  icon: Icon,
  label,
  danger,
  iconClass,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  danger?: boolean;
  iconClass?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium",
        "transition-all duration-200 text-left group",
        danger
          ? "text-red-500/80 hover:bg-red-500/10 hover:text-red-500"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
    >
      <Icon size={14} className={cn("transition-transform duration-200 group-hover:scale-110", iconClass)} />
      {label}
    </button>
  );
}
