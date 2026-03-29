"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  FolderCode,
  Heart,
  BarChart3,
  Bookmark,
  Github,
  Plus,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUserProfile } from "@/hooks/use-user-profile";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const primaryNavItems = [
  { id: "home", label: "Home", href: "/developer", icon: Home },
  { id: "explore", label: "Explore", href: "/developer/explore", icon: Compass },
  { id: "notifications", label: "Notifications", href: "/developer/notifications", icon: Bell, badge: 3 },
  { id: "messages", label: "Messages", href: "/developer/messages", icon: MessageSquare, badge: 5 },
];

const buildSpaceItems = [
  { id: "projects", label: "Projects", href: "/developer/projects", icon: FolderCode },
  { id: "sponsors", label: "Sponsors", href: "/developer/sponsors", icon: Heart },
  { id: "insights", label: "Insights", href: "/developer/insights", icon: BarChart3 },
  { id: "saved", label: "Saved", href: "/developer/saved", icon: Bookmark },
];

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "sponsor",
    message: "New sponsor: Google",
    detail: "Supporting your work on v2.0",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "pr",
    message: "PR merged: #247",
    detail: "Feature: Add dark mode support",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "issue",
    message: "New issue opened: #312",
    detail: "Bug: Memory leak in worker threads",
    time: "8 hours ago",
  },
];

// Mock messages data
const messages = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    message: "Thanks for the library! Using it in production...",
    time: "Just now",
    unread: true,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    message: "Would love to collaborate on the React wrapper...",
    time: "2h ago",
    unread: true,
  },
  {
    id: 3,
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/150?u=emma",
    message: "The v3.0 roadmap looks amazing!",
    time: "5h ago",
    unread: true,
  },
];

interface DeveloperSidebarProps {
  className?: string;
}

export function DeveloperSidebar({ className }: DeveloperSidebarProps) {
  const pathname = usePathname();
  const { user, loading } = useUserProfile();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // INSTANT: Get role from localStorage for immediate display (no Firestore delay)
  const [instantRole, setInstantRole] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole') || user?.role || '';
    }
    return user?.role || '';
  });
  
  // Update role when localStorage updates
  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem('userRole');
      if (role) setInstantRole(role);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      const role = localStorage.getItem('userRole');
      if (role && role !== instantRole) {
        setInstantRole(role);
      }
    }, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [instantRole]);

  // Get user's display name from Firebase or profile
  const userName = user?.name || auth.currentUser?.displayName || "Developer";
  const userAvatar = user?.profilePic || auth.currentUser?.photoURL || undefined;
  
  // Get initials for avatar fallback
  const initials = userName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "DV";

  const isActive = (href: string) => pathname === href;

  const handleNavClick = (id: string, href: string) => {
    setActiveTab(id);
  };

  const togglePanel = (panel: string) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          "fixed top-4 left-4 z-[60] p-2 rounded-xl md:hidden transition-all duration-300",
          "bg-white shadow-lg border border-[#E0F2F1]"
        )}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-[#2D4A6E]" />
        ) : (
          <Menu className="w-5 h-5 text-[#2D4A6E]" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#2D4A6E]/20 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen z-[56] w-[280px]",
          "flex flex-col",
          "border-r border-[#E0F2F1]",
          "bg-white",
          "transition-all duration-300 ease-out",
          "max-md:translate-x-0",
          isMobileMenuOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
          className
        )}
      >
        {/* Scrollable Content */}
        <ScrollArea className="flex-1">
          <div className="p-5 space-y-6">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="flex items-center gap-3"
            >
              <Avatar className="w-12 h-12 border-2 border-[#80CBC4] ring-2 ring-[#80CBC4]/20 shadow-md">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="bg-[#2D4A6E] text-white font-semibold">
                  {loading ? "..." : initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-[#2D4A6E] truncate">
                  {loading ? "..." : userName}
                </h2>
                {instantRole && (
                  <Badge
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium capitalize border-none shadow-sm",
                      instantRole === "creator" && "bg-amber-500 text-white",
                      instantRole === "developer" && "bg-blue-500 text-white",
                      instantRole === "supporter" && "bg-rose-500 text-white"
                    )}
                    style={{ borderRadius: "6px" }}
                  >
                    {instantRole}
                  </Badge>
                )}
                <p className="text-xs text-[#2D4A6E]/50 mt-1 truncate">
                  {instantRole === "creator" && "Creating amazing content"}
                  {instantRole === "developer" && "Building the future"}
                  {instantRole === "supporter" && "Supporting creators"}
                  {!instantRole && "Select your role"}
                </p>
              </div>
            </motion.div>

            {/* Primary Navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="space-y-1.5"
            >
              {primaryNavItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {item.id === "notifications" || item.id === "messages" ? (
                      <button
                        onClick={() => togglePanel(item.id)}
                        className={cn(
                          "flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                          active
                            ? "text-[#2D4A6E] shadow-md"
                            : "text-[#2D4A6E]/70 hover:text-[#2D4A6E] hover:bg-[#E0F2F1]/50",
                          active && "bg-white border border-[#80CBC4]/30"
                        )}
                        style={active ? { boxShadow: "0 2px 8px rgba(128, 203, 196, 0.15)" } : undefined}
                      >
                        <div
                          className={cn(
                            "relative mr-3 transition-all duration-200",
                            active && "scale-110"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "w-5 h-5",
                              active ? "text-[#80CBC4]" : "text-[#2D4A6E]/60"
                            )}
                          />
                          {item.badge && activePanel !== item.id && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF8A80] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium transition-all",
                              activePanel === item.id
                                ? "bg-[#80CBC4]/20 text-[#2D4A6E]"
                                : "bg-[#FF8A80]/10 text-[#FF8A80]"
                            )}
                          >
                            {activePanel === item.id ? "Close" : item.badge}
                          </span>
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.id, item.href)}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                          active
                            ? "text-[#2D4A6E] shadow-md"
                            : "text-[#2D4A6E]/70 hover:text-[#2D4A6E] hover:bg-[#E0F2F1]/50",
                          active && "bg-white border border-[#80CBC4]/30"
                        )}
                        style={active ? { boxShadow: "0 2px 8px rgba(128, 203, 196, 0.15)" } : undefined}
                      >
                        <div
                          className={cn(
                            "relative mr-3 transition-all duration-200",
                            active && "scale-110"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "w-5 h-5",
                              active ? "text-[#80CBC4]" : "text-[#2D4A6E]/60"
                            )}
                          />
                        </div>
                        <span>{item.label}</span>
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 w-1 h-8 rounded-r-full"
                            style={{ backgroundColor: "#80CBC4" }}
                          />
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Notifications Panel */}
            <AnimatePresence>
              {activePanel === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(224, 242, 241, 0.5)",
                      borderColor: "#E0F2F1",
                    }}
                  >
                    <h3 className="text-xs font-semibold text-[#2D4A6E] mb-3 uppercase tracking-wider">
                      Notifications
                    </h3>
                    <div className="space-y-2">
                      {notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-2 rounded-lg bg-white/60 text-xs cursor-pointer hover:bg-white transition-colors"
                        >
                          <p className="font-medium text-[#2D4A6E]">{notif.message}</p>
                          <p className="text-[#2D4A6E]/60 text-[10px]">{notif.detail}</p>
                          <p className="text-[#80CBC4] text-[10px] mt-1">{notif.time}</p>
                        </motion.div>
                      ))}
                    </div>
                    <button className="w-full mt-2 py-2 text-xs text-[#2D4A6E] hover:text-[#80CBC4] transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Panel */}
            <AnimatePresence>
              {activePanel === "messages" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(224, 242, 241, 0.5)",
                      borderColor: "#E0F2F1",
                    }}
                  >
                    <h3 className="text-xs font-semibold text-[#2D4A6E] mb-3 uppercase tracking-wider">
                      Messages
                    </h3>
                    <div className="space-y-2">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white/60 cursor-pointer hover:bg-white transition-colors"
                        >
                          <Avatar className="w-7 h-7">
                            <AvatarImage src={msg.avatar} />
                            <AvatarFallback className="bg-[#2D4A6E] text-white text-[10px]">
                              {msg.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#2D4A6E] truncate">
                              {msg.name}
                            </p>
                            <p className="text-[10px] text-[#2D4A6E]/60 truncate">
                              {msg.message}
                            </p>
                          </div>
                          {msg.unread && (
                            <div className="w-2 h-2 rounded-full bg-[#80CBC4]" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <button className="w-full mt-2 py-2 text-xs text-[#2D4A6E] hover:text-[#80CBC4] transition-colors">
                      View all messages
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <Separator className="bg-[#E0F2F1]" />

            {/* Your Build Space Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className="text-[10px] font-semibold text-[#2D4A6E]/40 uppercase tracking-widest mb-3 px-2">
                Your Build Space
              </h3>
              <nav className="space-y-1">
                {buildSpaceItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.id, item.href)}
                        className={cn(
                          "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                          active
                            ? "bg-[#E0F2F1] text-[#2D4A6E]"
                            : "text-[#2D4A6E]/70 hover:text-[#2D4A6E] hover:bg-[#E0F2F1]/50"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4 mr-3 transition-colors",
                            active ? "text-[#80CBC4]" : "text-[#2D4A6E]/50"
                          )}
                        />
                        <span>{item.label}</span>
                        {active && (
                          <ChevronRight className="w-4 h-4 ml-auto text-[#80CBC4]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>

            {/* New Project Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                className="w-full h-11 rounded-xl font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                style={{
                  background: "linear-gradient(135deg, #2D4A6E 0%, #3D5A7E 100%)",
                }}
              >
                <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                New Project
              </Button>
            </motion.div>
          </div>
        </ScrollArea>

        {/* Bottom Widget - GitHub Sync Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-5 mt-auto"
        >
          <div
            className="relative p-4 rounded-2xl border overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(224, 242, 241, 0.8) 0%, rgba(128, 203, 196, 0.1) 100%)",
              borderColor: "#80CBC4",
            }}
          >
            {/* Green Pulse Icon */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <Github className="w-4 h-4 text-[#2D4A6E]" />
              </div>
              <span className="text-[10px] text-[#2D4A6E]/60">2m ago</span>
            </div>
            <p className="text-xs font-medium text-[#2D4A6E]">GitHub Sync Status</p>
            <p className="text-xs text-green-600 font-medium">Connected</p>
          </div>
        </motion.div>
      </aside>
    </>
  );
}
