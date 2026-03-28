"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  LayoutGrid,
  Users,
  Wallet,
  Bookmark,
  ArrowRight,
  Sparkles,
  X,
  MoreHorizontal,
  Send,
  Search,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUserProfile } from "@/hooks/use-user-profile";

// Types
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number;
}

interface StudioItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description: string;
}

interface Notification {
  id: string;
  type: "follow" | "support" | "comment" | "like";
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
    type: "follow",
    title: "New follower",
    description: "Priya Sharma started following you",
    time: "2 min ago",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    id: "2",
    type: "support",
    title: "New supporter",
    description: "Rohan Verma subscribed to Gold tier",
    time: "15 min ago",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=rohan",
  },
  {
    id: "3",
    type: "comment",
    title: "New comment",
    description: "Alex Rivera commented on your post",
    time: "1 hour ago",
    read: false,
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
];

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=priya",
    lastMessage: "Love your latest design work!",
    time: "2m",
    unread: 2,
    online: true,
    typing: true,
  },
  {
    id: "2",
    name: "Rohan Verma",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    lastMessage: "Thanks for the feedback",
    time: "1h",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Kavya Nair",
    avatar: "https://i.pravatar.cc/150?u=kavya",
    lastMessage: "When is the next tutorial?",
    time: "3h",
    unread: 3,
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

export function CreatorSidebar() {
  const pathname = usePathname();
  const { user, loading } = useUserProfile();
  const [activeTab, setActiveTab] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

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
    { name: "Home", href: "/creator", icon: Home },
    { name: "Explore", href: "/creator/explore", icon: Compass },
    {
      name: "Notifications",
      href: "#",
      icon: Bell,
      badge: 3,
    },
    { name: "Messages", href: "#", icon: MessageSquare, badge: 5 },
  ];

  const studioItems: StudioItem[] = [
    {
      name: "My Content",
      href: "/creator/content",
      icon: LayoutGrid,
      description: "Manage your posts and projects",
    },
    {
      name: "Audience",
      href: "/creator/audience",
      icon: Users,
      description: "View followers and supporters",
    },
    {
      name: "Earnings",
      href: "/creator/earnings",
      icon: Wallet,
      description: "Track your revenue",
    },
    {
      name: "Saved",
      href: "/creator/saved",
      icon: Bookmark,
      description: "Content you've bookmarked",
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
            "linear-gradient(165deg, #E0F2F1 0%, rgba(224, 242, 241, 0.95) 50%, rgba(255, 255, 255, 0.9) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "4px 0 24px -8px rgba(45, 74, 110, 0.1)",
        }}
      >
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-6">
            {/* Brand Logo */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2D4A6E] to-[#FF8A80] flex items-center justify-center shadow-lg shadow-[#2D4A6E]/20">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-[#2D4A6E] tracking-tight">
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
                {/* Soft pink glow */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, #FF8A80 0%, #FFB6C1 100%)",
                    filter: "blur(12px)",
                  }}
                />

                <div className="relative bg-white rounded-2xl p-4 border border-[#E0F2F1] shadow-sm transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                        <AvatarImage
                          src={user?.profilePic || `https://i.pravatar.cc/150?u=${user?.email || 'user'}`}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#2D4A6E] to-[#FF8A80] text-white text-lg">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF8A80] via-[#FFB6C1] to-[#FF8A80] opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-[#2D4A6E] block">
                        {loading ? "Loading..." : user?.name || "User"}
                      </span>
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-[#FF8A80]/20 text-[#FF8A80] border-[#FF8A80]/30 text-xs font-medium"
                      >
                        Creator
                      </Badge>
                      <p className="text-xs text-[#2D4A6E]/60 mt-1">
                        Crafting digital experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Primary Menu */}
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-xs font-semibold text-[#2D4A6E]/40 uppercase tracking-wider mb-2 px-2">
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
                          ? "bg-white text-[#2D4A6E] shadow-sm"
                          : "text-[#2D4A6E]/70 hover:bg-white/60 hover:text-[#2D4A6E]"
                      )}
                    >
                      {/* Active indicator - light blue glow for Home */}
                      {isActive && item.name === "Home" && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute left-0 w-1 h-6 rounded-full bg-gradient-to-b from-[#4FC3F7] to-[#29B6F6]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {isActive && item.name !== "Home" && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute left-0 w-1 h-6 rounded-full bg-gradient-to-b from-[#2D4A6E] to-[#FF8A80]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div className="relative">
                        <item.icon
                          size={18}
                          className={cn(
                            "transition-all duration-300",
                            isActive
                              ? "text-[#2D4A6E] scale-110"
                              : "group-hover:text-[#2D4A6E] group-hover:scale-105"
                          )}
                        />
                        {item.name === "Notifications" && hasBadge && (
                          <motion.div
                            variants={pulseVariants}
                            animate="pulse"
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF4444] flex items-center justify-center text-[10px] text-white font-bold border-2 border-white"
                          >
                            {item.badge}
                          </motion.div>
                        )}
                        {item.name === "Messages" && hasBadge && (
                          <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF8A80] flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">
                            {item.badge}
                          </div>
                        )}
                      </div>

                      <span className="flex-1">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <Separator className="bg-[#E0F2F1]" />

            {/* Your Studio Section */}
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-xs font-semibold text-[#2D4A6E]/40 uppercase tracking-wider mb-2 px-2">
                Your Studio
              </p>
              {studioItems.map((item) => {
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
                          ? "bg-white text-[#2D4A6E] shadow-sm"
                          : "text-[#2D4A6E]/70 hover:bg-white/60 hover:text-[#2D4A6E]"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute left-0 w-1 h-6 rounded-full bg-gradient-to-b from-[#2D4A6E] to-[#FF8A80]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-br from-[#2D4A6E] to-[#FF8A80] text-white"
                            : "bg-[#E0F2F1] text-[#2D4A6E] group-hover:bg-[#2D4A6E]/10"
                        )}
                      >
                        <item.icon size={16} />
                      </div>

                      <span className="flex-1">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Creator Tip Widget - Glassmorphic */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl p-4"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 8px 32px -8px rgba(45, 74, 110, 0.1)",
              }}
            >
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#FF8A80]" />
                  <span className="font-semibold text-[#2D4A6E] text-sm">Creator Tip</span>
                </div>
                <p className="text-xs text-[#2D4A6E]/70 leading-relaxed">
                  Posts with polls get <span className="font-semibold text-[#FF8A80]">3x more engagement!</span>
                </p>
                <div className="flex items-center gap-1 mt-2 text-[#2D4A6E]/50">
                  <span className="text-xs">Try it now</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollArea>
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
              background: "linear-gradient(165deg, #FFFFFF 0%, #E0F2F1 100%)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(224, 242, 241, 0.8)",
              boxShadow: "-4px 0 24px -8px rgba(45, 74, 110, 0.15)",
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#E0F2F1]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF8A80] to-[#2D4A6E]">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#2D4A6E]">Notifications</h2>
                    <p className="text-xs text-[#2D4A6E]/60">3 new updates</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#2D4A6E] hover:bg-[#E0F2F1]"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark all read
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-[#E0F2F1]"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="w-4 h-4 text-[#2D4A6E]" />
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
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.9)" }}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-200 border",
                        notification.read
                          ? "bg-white/60 border-[#E0F2F1]"
                          : "bg-gradient-to-r from-[#FF8A80]/10 to-transparent border-[#FF8A80]/20"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {notification.avatar && (
                          <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                            <AvatarImage src={notification.avatar} />
                            <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
                              {notification.title[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              notification.read ? "text-[#2D4A6E]" : "text-[#2D4A6E]"
                            )}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-[#2D4A6E]/60 mt-0.5">
                            {notification.description}
                          </p>
                          <p className="text-xs text-[#FF8A80] mt-1">{notification.time}</p>
                        </div>

                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-[#FF8A80] flex-shrink-0 mt-1" />
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
              background: "linear-gradient(165deg, #FFFFFF 0%, #E0F2F1 100%)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(224, 242, 241, 0.8)",
              boxShadow: "-4px 0 24px -8px rgba(45, 74, 110, 0.15)",
            }}
          >
            {/* Conversations List */}
            <div className="w-[280px] border-r border-[#E0F2F1] flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-[#E0F2F1]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#2D4A6E] to-[#FF8A80]">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#2D4A6E]">Messages</h2>
                    <p className="text-xs text-[#2D4A6E]/60">5 conversations</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-[#E0F2F1]"
                  onClick={() => setShowMessages(false)}
                >
                  <X className="w-4 h-4 text-[#2D4A6E]" />
                </Button>
              </div>

              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D4A6E]/40" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E0F2F1] rounded-xl text-sm text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none focus:ring-2 focus:ring-[#FF8A80]/30"
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
                          ? "bg-white shadow-sm border border-[#FF8A80]/30"
                          : "bg-white/40 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
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
                            <p className="text-sm font-medium text-[#2D4A6E] truncate">
                              {chat.name}
                            </p>
                            <span className="text-xs text-[#2D4A6E]/50">{chat.time}</span>
                          </div>
                          <p className="text-xs text-[#2D4A6E]/60 truncate mt-0.5">
                            {chat.typing ? (
                              <span className="text-[#FF8A80] flex items-center gap-1">
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
                          <div className="w-5 h-5 rounded-full bg-[#FF8A80] flex items-center justify-center text-[10px] text-white font-medium flex-shrink-0">
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
                  <div className="flex items-center gap-3 p-5 border-b border-[#E0F2F1]">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback className="bg-[#2D4A6E] text-white">
                        {selectedChat.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-[#2D4A6E]">{selectedChat.name}</p>
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
                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-[#E0F2F1]">
                      <MoreHorizontal className="w-5 h-5 text-[#2D4A6E]" />
                    </Button>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-5">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedChat.avatar} />
                          <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
                            {selectedChat.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[70%] shadow-sm">
                          <p className="text-sm text-[#2D4A6E]">
                            Love your latest design work!
                          </p>
                          <p className="text-xs text-[#2D4A6E]/50 mt-1">2:30 PM</p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="bg-gradient-to-br from-[#2D4A6E] to-[#FF8A80] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                          <p className="text-sm text-white">
                            Thanks so much! Really appreciate the support.
                          </p>
                          <p className="text-xs text-white/60 mt-1">2:32 PM</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedChat.avatar} />
                          <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
                            {selectedChat.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[70%] shadow-sm">
                          <p className="text-sm text-[#2D4A6E]">{selectedChat.lastMessage}</p>
                          <p className="text-xs text-[#2D4A6E]/50 mt-1">Just now</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t border-[#E0F2F1]">
                    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none"
                      />
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2D4A6E] to-[#FF8A80] hover:opacity-90"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <MessageSquare className="w-8 h-8 text-[#2D4A6E]/40" />
                    </div>
                    <p className="text-[#2D4A6E]/60">Select a conversation to start chatting</p>
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
              className="fixed inset-0 z-40 bg-[#2D4A6E]/20 backdrop-blur-sm"
              onClick={() => setShowProfileDrawer(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed left-[300px] top-20 z-50 w-[320px] rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(165deg, #FFFFFF 0%, #E0F2F1 100%)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 25px 50px -12px rgba(45, 74, 110, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user?.profilePic || `https://i.pravatar.cc/150?u=${user?.email || 'user'}`} />
                    <AvatarFallback className="bg-gradient-to-br from-[#2D4A6E] to-[#FF8A80] text-white text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg text-[#2D4A6E]">{user?.name || "User"}</h3>
                    <Badge className="mt-1 bg-[#FF8A80]/20 text-[#FF8A80] border-[#FF8A80]/30">
                      Creator
                    </Badge>
                    <p className="text-xs text-[#2D4A6E]/60 mt-1">Member since 2023</p>
                  </div>
                </div>

                <Separator className="bg-[#E0F2F1] my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-[#2D4A6E]/60">Total Followers</span>
                    <span className="font-semibold text-[#2D4A6E]">1,240</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-[#2D4A6E]/60">Paid Supporters</span>
                    <span className="font-semibold text-[#2D4A6E]">32</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-[#2D4A6E]/60">Monthly Earnings</span>
                    <span className="font-semibold text-[#2D4A6E]">₹24,500</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl border-[#E0F2F1] bg-white hover:bg-[#E0F2F1] text-[#2D4A6E]"
                    onClick={() => setShowProfileDrawer(false)}
                  >
                    View Profile
                  </Button>
                  <Button
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#2D4A6E] to-[#FF8A80] hover:opacity-90 text-white"
                    onClick={() => setShowProfileDrawer(false)}
                  >
                    Settings
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
