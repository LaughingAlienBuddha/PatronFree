"use client";

import { useState } from "react";
import { Search, Bell, MessageCircle, Sun, Moon, Menu, X, Heart, User, MessageSquare, DollarSign, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/use-user-profile";

// ============================================
// NOTIFICATION DATA
// ============================================
const SAMPLE_NOTIFICATIONS = [
  { id: "1", type: "follow", user: { name: "Priya Sharma", initials: "PS", avatar: "" }, message: "started following you", time: "2 min ago", read: false },
  { id: "2", type: "support", user: { name: "Rohan Verma", initials: "RV", avatar: "" }, message: "is now supporting you", time: "1 hour ago", read: false },
  { id: "3", type: "comment", user: { name: "Kavya Nair", initials: "KN", avatar: "" }, message: "commented on your post", time: "3 hours ago", read: true },
  { id: "4", type: "mention", user: { name: "Vikram Patel", initials: "VP", avatar: "" }, message: "mentioned you in a post", time: "5 hours ago", read: true },
];

// ============================================
// MESSAGE DATA
// ============================================
const SAMPLE_CONVERSATIONS = [
  { id: "1", user: { name: "Priya Sharma", initials: "PS", avatar: "" }, lastMessage: "Thanks for the help!", time: "2 min ago", unread: 2 },
  { id: "2", user: { name: "Rohan Verma", initials: "RV", avatar: "" }, lastMessage: "When will the new update be ready?", time: "1 hour ago", unread: 0 },
  { id: "3", user: { name: "Ananya Sharma", initials: "AS", avatar: "" }, lastMessage: "Great work on the project!", time: "3 hours ago", unread: 1 },
  { id: "4", user: { name: "Kavya Nair", initials: "KN", avatar: "" }, lastMessage: "Can we schedule a call?", time: "Yesterday", unread: 0 },
];

interface FeedTopBarProps { collapsed: boolean; onMenuClick?: () => void; }

export function FeedTopBar({ collapsed, onMenuClick }: FeedTopBarProps) {
  const { theme, setTheme } = useTheme();
  const { user, loading } = useUserProfile();
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  // Get initials for avatar fallback
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "US";

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className={cn("fixed top-0 right-0 z-30 h-[68px] flex items-center gap-4 px-5 bg-background/80 backdrop-blur-2xl border-b border-border/20 shadow-[0_1px_20px_-8px_rgba(15,16,53,0.08)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]", collapsed ? "left-[72px]" : "left-[270px]")}>
      <button onClick={onMenuClick} className="md:hidden p-2 rounded-xl hover:bg-muted/60 transition-colors"><Menu size={20} /></button>
      <div className={cn("relative flex-1 transition-all duration-300", searchFocused ? "max-w-lg" : "max-w-md")}>
        <Search size={16} className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200", searchFocused ? "text-primary" : "text-muted-foreground/60")} />
        <input type="text" placeholder="Search creators, developers, projects..." onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} className="w-full h-10 rounded-full pl-11 pr-4 text-sm bg-muted/40 border border-border/40 placeholder:text-muted-foreground/50 text-foreground outline-none transition-all duration-300 focus:bg-background focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(54,84,134,0.08),0_4px_20px_-4px_rgba(127,199,217,0.2)]" />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        {/* Theme Toggle */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="relative w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95" aria-label="Toggle theme">
          <Sun size={17} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon size={17} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setMessagesOpen(false);
            }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <Bell size={17} className="transition-transform group-hover:animate-wiggle" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-background animate-pulse-soft" />
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationsOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-card rounded-2xl border border-border/50 shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs text-primary hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/30 last:border-0",
                        !notification.read && "bg-primary/5"
                      )}
                    >
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="text-xs font-medium bg-muted-foreground/20">
                          {notification.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{notification.user.name}</span>{" "}
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative">
          <button 
            onClick={() => {
              setMessagesOpen(!messagesOpen);
              setNotificationsOpen(false);
            }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <MessageCircle size={17} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </button>

          {/* Messages Panel */}
          {messagesOpen && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-card rounded-2xl border border-border/50 shadow-xl z-50 overflow-hidden">
              {activeConversation ? (
                /* Chat View */
                <div className="flex flex-col h-[480px]">
                  <div className="flex items-center gap-3 p-4 border-b border-border/50">
                    <button 
                      onClick={() => setActiveConversation(null)}
                      className="p-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                    {(() => {
                      const conv = SAMPLE_CONVERSATIONS.find(c => c.id === activeConversation);
                      if (!conv) return null;
                      return (
                        <>
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs font-medium bg-muted-foreground/20">
                              {conv.user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{conv.user.name}</p>
                            <p className="text-xs text-muted-foreground">Online</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex justify-center">
                      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Today</span>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-[10px] bg-muted-foreground/20">
                          {SAMPLE_CONVERSATIONS.find(c => c.id === activeConversation)?.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-2 max-w-[80%]">
                        <p className="text-sm text-foreground">Hey! How is it going?</p>
                        <span className="text-[10px] text-muted-foreground">10:30 AM</span>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-2 max-w-[80%]">
                        <p className="text-sm">Great! Just working on some new features.</p>
                        <span className="text-[10px] text-primary-foreground/70">10:32 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-full bg-muted text-sm border-0 focus:ring-2 focus:ring-primary/20"
                      />
                      <button className="p-2 rounded-full bg-primary text-primary-foreground hover:shadow-md transition-all">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Conversations List */
                <div className="flex flex-col h-[480px]">
                  <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <h3 className="font-semibold text-foreground">Messages</h3>
                    <span className="text-xs text-muted-foreground">{SAMPLE_CONVERSATIONS.filter(c => c.unread > 0).length} unread</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {SAMPLE_CONVERSATIONS.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setActiveConversation(conversation.id)}
                        className="w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0 text-left"
                      >
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback className="text-xs font-medium bg-muted-foreground/20">
                            {conversation.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-foreground text-sm">{conversation.user.name}</p>
                            <span className="text-xs text-muted-foreground">{conversation.time}</span>
                          </div>
                          <p className={cn(
                            "text-sm truncate",
                            conversation.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                          )}>
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unread > 0 && (
                          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0">
                            {conversation.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Avatar */}
        <button className="ml-1 group relative">
          <div className={cn("absolute -inset-0.5 rounded-full bg-gradient-to-r blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300 from-amber-400/40 to-orange-400/30")} />
          <Avatar className="relative h-9 w-9 border-2 border-background shadow-md ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-200">
            <AvatarImage src={user?.profilePic || "/avatar.jpg"} alt={user?.name || "User"} />
            <AvatarFallback className={cn("text-[10px] font-bold bg-gradient-to-br from-amber-400/40 to-orange-400/30")}>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
