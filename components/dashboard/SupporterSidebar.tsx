"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Compass,
  Bell,
  MessageSquare,
  Heart,
  Users,
  Gift,
  Bookmark,
  Settings,
  ChevronRight,
  Handshake,
  TrendingUp,
  Check,
  X,
  Search,
  MoreHorizontal,
  Send,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ChangeRoleModal } from "@/components/change-role-modal";
import { UserRole } from "@/components/role-selection-modal";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUserProfile } from "@/hooks/use-user-profile";
import { LogoutButton } from "@/components/logout-button";

// Types
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number;
}

interface SupportItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description: string;
}

interface Notification {
  id: string;
  type: "post" | "message" | "payment";
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
}

// Mock data
const notifications: Notification[] = [
  {
    id: "1",
    type: "post",
    title: "New post from Sarah Chen",
    description: "Just released my new design tutorial!",
    time: "2 min ago",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "2",
    type: "message",
    title: "Alex Rivera replied",
    description: "Thanks for the support! Really appreciate...",
    time: "15 min ago",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: "3",
    type: "payment",
    title: "Payment confirmed",
    description: "Subscription to Design Weekly renewed",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "post",
    title: "New project from TechStudio",
    description: "Open source React components library",
    time: "3 hours ago",
    read: true,
    avatar: "https://i.pravatar.cc/150?u=techstudio",
  },
];

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    lastMessage: "Thanks for being such an amazing supporter!",
    time: "2m",
    unread: 2,
    online: true,
    typing: true,
  },
  {
    id: "2",
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?u=alex",
    lastMessage: "The new tutorial is coming next week",
    time: "1h",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "TechStudio",
    avatar: "https://i.pravatar.cc/150?u=techstudio",
    lastMessage: "Early access granted to you!",
    time: "3h",
    unread: 1,
    online: false,
  },
];

// Animation variants
const sidebarVariants = {
  hidden: { x: -100, opacity: 0, filter: "blur(10px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function SupporterSidebar() {
  const pathname = usePathname();
  const { user, loading } = useUserProfile();
  const [activeTab, setActiveTab] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);

  // Get initials for avatar fallback
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "US";

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const primaryNavItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: House },
    { name: "Explore", href: "/dashboard/explore", icon: Compass },
    {
      name: "Notifications",
      href: "#",
      icon: Bell,
      badge: 3,
    },
    { name: "Messages", href: "#", icon: MessageSquare, badge: 3 },
  ];

  const supportItems: SupportItem[] = [
    {
      name: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: Heart,
      description: "People you support financially",
    },
    {
      name: "Following",
      href: "/dashboard/following",
      icon: Users,
      description: "Creators you follow",
    },
    {
      name: "Donations",
      href: "/dashboard/donations",
      icon: Gift,
      description: "Your one-time contributions",
    },
    {
      name: "Saved",
      href: "/dashboard/saved",
      icon: Bookmark,
      description: "Content you've bookmarked",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      description: "Account preferences",
    },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.name === "Notifications") {
      setShowNotifications(true);
      setShowMessages(false);
    } else if (item.name === "Messages") {
      setShowMessages(true);
      setShowNotifications(false);
    }
  };

  return (
    <>
      {/* Main Sidebar */}
      <motion.aside
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className="fixed left-0 top-0 z-40 h-screen w-[280px] flex flex-col"
        style={{
          background:
            "linear-gradient(165deg, rgba(220, 242, 241, 0.85) 0%, rgba(127, 199, 217, 0.4) 50%, rgba(186, 178, 234, 0.6) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 0 60px -15px rgba(54, 84, 134, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.3)",
          borderRadius: "0 20px 20px 0",
        }}
      >
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-6">
            {/* Brand Logo */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#365486] to-[#7FC7D9] flex items-center justify-center shadow-lg shadow-[#365486]/20">
                <Handshake className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-[#0F1035] tracking-tight">
                Patronex
              </span>
            </motion.div>

            {/* Identity Section */}
            <motion.div
              variants={itemVariants}
              className="relative"
              onClick={() => setShowProfileDrawer(true)}
            >
              <div className="relative group cursor-pointer">
                {/* Animated gradient glow */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, #7FC7D9 0%, #365486 50%, #BAB2EA 100%)",
                    filter: "blur(12px)",
                  }}
                />

                <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-white/80">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                        <AvatarImage
                          src={user?.profilePic || `https://i.pravatar.cc/150?u=${user?.email || 'supporter'}`}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white text-lg">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      {/* Animated glow ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7FC7D9] via-[#365486] to-[#BAB2EA] opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-500 animate-pulse" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0F1035] truncate">
                          {loading ? "Loading..." : user?.name || "User"}
                        </span>
                      </div>
                      {user?.role && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "mt-1 text-xs font-medium capitalize",
                            user.role === "creator" && "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-600 border-amber-200/50",
                            user.role === "developer" && "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600 border-blue-200/50",
                            user.role === "supporter" && "bg-gradient-to-r from-rose-100 to-rose-50 text-rose-600 border-rose-200/50"
                          )}
                        >
                          <Heart className={cn(
                            "w-3 h-3 mr-1",
                            user.role === "creator" && "fill-amber-500 text-amber-500",
                            user.role === "developer" && "fill-blue-500 text-blue-500",
                            user.role === "supporter" && "fill-rose-500 text-rose-500"
                          )} />
                          {user.role}
                        </Badge>
                      )}
                      <p className="text-xs text-[#365486]/70 mt-1">
                        {user?.role === "creator" && "Creating amazing content"}
                        {user?.role === "developer" && "Building the future"}
                        {user?.role === "supporter" && "Supporting creators & developers"}
                        {!user?.role && "Select your role to get started"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Primary Menu */}
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-xs font-semibold text-[#365486]/50 uppercase tracking-wider mb-2 px-2">
                Menu
              </p>
              {primaryNavItems.map((item) => {
                const isActive = activeTab === item.href;
                const hasBadge = item.badge && item.badge > 0;

                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.name === "Notifications" || item.name === "Messages") {
                          e.preventDefault();
                          handleNavClick(item);
                        }
                      }}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-white/80 text-[#365486] shadow-sm"
                          : "text-[#365486]/70 hover:bg-white/50 hover:text-[#0F1035]"
                      )}
                    >
                      {/* Active indicator pill */}
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute left-0 w-1 h-6 rounded-full bg-gradient-to-b from-[#7FC7D9] to-[#365486]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div className="relative">
                        <item.icon
                          size={18}
                          className={cn(
                            "transition-all duration-300",
                            isActive
                              ? "text-[#365486] scale-110"
                              : "group-hover:text-[#365486] group-hover:scale-105"
                          )}
                        />
                        {item.name === "Notifications" && hasBadge && (
                          <motion.div
                            variants={pulseVariants}
                            animate="pulse"
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white"
                          >
                            {item.badge}
                          </motion.div>
                        )}
                      </div>

                      <span className="flex-1">{item.name}</span>

                      {hasBadge && item.name !== "Notifications" && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-600 text-xs font-medium"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <Separator className="bg-white/40" />

            {/* Your Support Section */}
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-xs font-semibold text-[#365486]/50 uppercase tracking-wider mb-2 px-2">
                Your Support
              </p>
              {supportItems.map((item) => {
                const isActive = activeTab === item.href;

                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    title={item.description}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-white/80 text-[#365486] shadow-sm"
                          : "text-[#365486]/70 hover:bg-white/50 hover:text-[#0F1035]"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute left-0 w-1 h-6 rounded-full bg-gradient-to-b from-[#7FC7D9] to-[#365486]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white"
                            : "bg-[#7FC7D9]/20 text-[#365486] group-hover:bg-[#7FC7D9]/40"
                        )}
                      >
                        <item.icon size={16} />
                      </div>

                      <div className="flex-1">
                        <span className="block">{item.name}</span>
                      </div>

                      <ChevronRight
                        size={14}
                        className={cn(
                          "text-[#365486]/40 transition-transform duration-300",
                          "group-hover:translate-x-1 group-hover:text-[#365486]"
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Your Impact Section - Emotional Hook */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl p-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(54, 84, 134, 0.1) 0%, rgba(127, 199, 217, 0.15) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7FC7D9]/30 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#BAB2EA]/20 to-transparent rounded-tr-full" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#365486] to-[#7FC7D9]">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-[#0F1035] text-sm">Your Impact</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-[#365486]">₹2,300</p>
                    <p className="text-xs text-[#365486]/70">contributed</p>
                  </div>
                  <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-[#365486]">12</p>
                    <p className="text-xs text-[#365486]/70">creators supported</p>
                  </div>
                </div>

                <p className="text-xs text-[#365486]/60 mt-3 italic">
                  “Small acts, big impact”
                </p>
              </div>
            </motion.div>
          </div>
        </ScrollArea>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="p-5 pt-0"
        >
          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 group"
            style={{
              background:
                "linear-gradient(135deg, #365486 0%, #7FC7D9 50%, #BAB2EA 100%)",
              boxShadow: "0 10px 30px -10px rgba(54, 84, 134, 0.4)",
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/20 to-transparent" />

            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">
                  Discover creators to support
                </p>
                <p className="text-white/70 text-xs">Find your next favorite</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-screen w-[380px]"
            style={{
              background:
                "linear-gradient(165deg, rgba(220, 242, 241, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "-10px 0 60px -15px rgba(15, 16, 53, 0.1)",
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#7FC7D9] to-[#365486]">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#0F1035]">Notifications</h2>
                    <p className="text-xs text-[#365486]/70">3 new updates</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#365486] hover:bg-white/50"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark all read
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-white/50"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="w-4 h-4 text-[#365486]" />
                  </Button>
                </div>
              </div>

              {/* Notifications List */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.8)" }}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-200 border",
                        notification.read
                          ? "bg-white/40 border-white/30"
                          : "bg-gradient-to-r from-[#7FC7D9]/10 to-transparent border-[#7FC7D9]/20"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {notification.avatar ? (
                          <Avatar className="w-10 h-10 border-2 border-white">
                            <AvatarImage src={notification.avatar} />
                            <AvatarFallback className="bg-[#7FC7D9] text-white">
                              {notification.title[0]}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center border-2 border-white",
                              notification.type === "payment"
                                ? "bg-green-100"
                                : "bg-[#7FC7D9]/20"
                            )}
                          >
                            {notification.type === "payment" ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Bell className="w-5 h-5 text-[#365486]" />
                            )}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              notification.read ? "text-[#365486]" : "text-[#0F1035]"
                            )}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-[#365486]/70 mt-0.5 truncate">
                            {notification.description}
                          </p>
                          <p className="text-xs text-[#7FC7D9] mt-1">{notification.time}</p>
                        </div>

                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-[#7FC7D9] flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Panel */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-screen w-[700px] flex"
            style={{
              background:
                "linear-gradient(165deg, rgba(220, 242, 241, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "-10px 0 60px -15px rgba(15, 16, 53, 0.1)",
            }}
          >
            {/* Conversations List */}
            <div className="w-[280px] border-r border-white/40 flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-white/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#BAB2EA] to-[#365486]">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#0F1035]">Messages</h2>
                    <p className="text-xs text-[#365486]/70">3 conversations</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-white/50"
                  onClick={() => setShowMessages(false)}
                >
                  <X className="w-4 h-4 text-[#365486]" />
                </Button>
              </div>

              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#365486]/50" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white/50 border border-white/50 rounded-xl text-sm text-[#0F1035] placeholder:text-[#365486]/50 focus:outline-none focus:ring-2 focus:ring-[#7FC7D9]/50"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1 px-3 pb-3">
                <div className="space-y-1">
                  {conversations.map((chat, index) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.8)" }}
                      onClick={() => setSelectedChat(chat)}
                      className={cn(
                        "p-3 rounded-xl cursor-pointer transition-all duration-200",
                        selectedChat?.id === chat.id
                          ? "bg-white shadow-sm border border-[#7FC7D9]/30"
                          : "bg-white/30 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10 border-2 border-white">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback className="bg-[#7FC7D9] text-white text-xs">
                              {chat.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-[#0F1035] truncate">
                              {chat.name}
                            </p>
                            <span className="text-xs text-[#365486]/50">{chat.time}</span>
                          </div>
                          <p className="text-xs text-[#365486]/70 truncate mt-0.5">
                            {chat.typing ? (
                              <span className="text-[#7FC7D9] flex items-center gap-1">
                                <motion.span
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                  typing
                                </motion.span>
                                <span className="flex gap-0.5">
                                  <motion.span
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6 }}
                                  >
                                    .
                                  </motion.span>
                                  <motion.span
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                  >
                                    .
                                  </motion.span>
                                  <motion.span
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                  >
                                    .
                                  </motion.span>
                                </span>
                              </span>
                            ) : (
                              chat.lastMessage
                            )}
                          </p>
                        </div>

                        {chat.unread > 0 && (
                          <div className="w-5 h-5 rounded-full bg-[#7FC7D9] flex items-center justify-center text-[10px] text-white font-medium flex-shrink-0">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 p-5 border-b border-white/40">
                    <Avatar className="w-10 h-10 border-2 border-white">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback className="bg-[#7FC7D9] text-white">
                        {selectedChat.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-[#0F1035]">{selectedChat.name}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        {selectedChat.online ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Online
                          </>
                        ) : (
                          "Offline"
                        )}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white/50">
                      <MoreHorizontal className="w-5 h-5 text-[#365486]" />
                    </Button>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-5">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedChat.avatar} />
                          <AvatarFallback className="bg-[#7FC7D9] text-white text-xs">
                            {selectedChat.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-white/70 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[70%]">
                          <p className="text-sm text-[#0F1035]">
                            Hey! Thanks so much for your support! 🙏
                          </p>
                          <p className="text-xs text-[#365486]/50 mt-1">2:30 PM</p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="bg-gradient-to-br from-[#365486] to-[#7FC7D9] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                          <p className="text-sm text-white">
                            You&apos;re welcome! Love your content!
                          </p>
                          <p className="text-xs text-white/60 mt-1">2:32 PM</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedChat.avatar} />
                          <AvatarFallback className="bg-[#7FC7D9] text-white text-xs">
                            {selectedChat.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-white/70 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[70%]">
                          <p className="text-sm text-[#0F1035]">{selectedChat.lastMessage}</p>
                          <p className="text-xs text-[#365486]/50 mt-1">Just now</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t border-white/40">
                    <div className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm text-[#0F1035] placeholder:text-[#365486]/50 focus:outline-none"
                      />
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#365486] to-[#7FC7D9] hover:opacity-90"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-[#365486]/50" />
                    </div>
                    <p className="text-[#365486]/70">Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Mini Drawer */}
      <AnimatePresence>
        {showProfileDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowProfileDrawer(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed left-[300px] top-20 z-50 w-[320px] rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(165deg, rgba(255, 255, 255, 0.95) 0%, rgba(220, 242, 241, 0.9) 100%)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 25px 50px -12px rgba(15, 16, 53, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user?.profilePic || `https://i.pravatar.cc/150?u=${user?.email || 'supporter'}`} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg text-[#0F1035]">{user?.name || "User"}</h3>
                    {user?.role && (
                      <Badge className={cn(
                        "mt-1 capitalize",
                        user.role === "creator" && "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-600 border-amber-200/50",
                        user.role === "developer" && "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600 border-blue-200/50",
                        user.role === "supporter" && "bg-gradient-to-r from-rose-100 to-rose-50 text-rose-600 border-rose-200/50"
                      )}>
                        <Heart className={cn(
                          "w-3 h-3 mr-1",
                          user.role === "creator" && "fill-amber-500",
                          user.role === "developer" && "fill-blue-500",
                          user.role === "supporter" && "fill-rose-500"
                        )} />
                        {user.role}
                      </Badge>
                    )}
                    <p className="text-xs text-[#365486]/70 mt-1">Member since 2024</p>
                  </div>
                </div>

                <Separator className="bg-white/40 my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-[#365486]/70">Total Contributed</span>
                    <span className="font-semibold text-[#365486]">₹2,300</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-[#365486]/70">Creators Supported</span>
                    <span className="font-semibold text-[#365486]">12</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-[#365486]/70">Active Subscriptions</span>
                    <span className="font-semibold text-[#365486]">5</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl border-white/60 bg-white/50 hover:bg-white"
                    onClick={() => setShowProfileDrawer(false)}
                  >
                    View Profile
                  </Button>
                  <Button
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#365486] to-[#7FC7D9] hover:opacity-90 text-white"
                    onClick={() => setShowProfileDrawer(false)}
                  >
                    Settings
                  </Button>
                </div>

                {/* Change Role Button */}
                <Button
                  variant="outline"
                  className="w-full mt-3 rounded-xl border-white/60 bg-white/30 hover:bg-white/50 text-[#365486]"
                  onClick={() => setShowChangeRoleModal(true)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Change Role
                </Button>

                <Separator className="bg-white/40 my-4" />

                <LogoutButton isSidebar className="rounded-xl" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Change Role Modal */}
      <ChangeRoleModal
        isOpen={showChangeRoleModal}
        onClose={() => setShowChangeRoleModal(false)}
        currentRole={(user?.role as UserRole) || null}
        onRoleChanged={(newRole) => {
          // Role changed - could redirect to appropriate page here
          console.log("Role changed to:", newRole);
        }}
      />
    </>
  );
}
