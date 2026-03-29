"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileImage,
  FileVideo,
  Code2,
  BarChart3,
  Search,
  Users,
  Eye,
  MessageCircle,
  Send,
  MoreHorizontal,
  Edit3,
  Trash2,
  Heart,
  ArrowRight,
  Calendar,
  Clock,
  Target,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useUserProfile } from "@/hooks/use-user-profile";
import { LogoutButton } from "@/components/logout-button";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

// Mock data for creator's posts
const myPosts = [
  {
    id: "1",
    title: "10 UI Design Principles Every Developer Should Know",
    preview: "Design is not just about making things look good. It's about solving problems and creating experiences that feel intuitive...",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    reach: 450,
    likes: 82,
    comments: 12,
    type: "post",
    visibility: "public",
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Sacred Geometry Icon Set - New Release",
    preview: "A collection of 200+ icons inspired by Indian mandala art and modern minimalism. Perfect for spiritual and wellness apps...",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
    reach: 890,
    likes: 156,
    comments: 28,
    type: "artwork",
    visibility: "supporters",
    postedAt: "5 days ago",
  },
  {
    id: "3",
    title: "Behind the Scenes: Creating the Festivals in Motion Series",
    preview: "Take a peek into my creative process for the Diwali animation. From initial sketches to final render...",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
    reach: 320,
    likes: 67,
    comments: 8,
    type: "update",
    visibility: "public",
    postedAt: "1 week ago",
  },
];

// Recent supporters/followers for "Say Thanks" widget
const recentSupporters = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=priya",
    action: "started supporting",
    tier: "Gold",
    time: "2 hours ago",
  },
  {
    id: "2",
    name: "Rohan Verma",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    action: "followed you",
    time: "5 hours ago",
  },
  {
    id: "3",
    name: "Kavya Nair",
    avatar: "https://i.pravatar.cc/150?u=kavya",
    action: "subscribed",
    tier: "Basic",
    time: "1 day ago",
  },
];

// Upcoming events
const upcomingEvents = [
  {
    id: "1",
    title: "Scheduled Post",
    description: "Design Trends 2024",
    time: "Tomorrow at 10:00 AM",
    icon: Calendar,
  },
  {
    id: "2",
    title: "Live Q&A Session",
    description: "Ask me anything about UI design",
    time: "Friday, 6:00 PM",
    icon: MessageCircle,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function CreatorDashboardPage() {
  const { user, loading } = useUserProfile();
  const [composerText, setComposerText] = useState("");
  const [visibility, setVisibility] = useState<"public" | "supporters">("public");
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [hasPosted, setHasPosted] = useState(true);

  // Get user's display name from Firebase or profile
  const userName = user?.name || auth.currentUser?.displayName || "Creator";

  return (
    <div className="min-h-screen">
      {/* Header with logout */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2D4A6E]">
            Welcome back, {loading ? "..." : userName}!
          </h1>
          <p className="text-sm text-[#2D4A6E]/60 mt-1">
            Manage your creator content and community
          </p>
        </div>
        <LogoutButton variant="outline" className="rounded-xl border-[#2D4A6E]/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Non-Revenue Metrics Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(79, 195, 247, 0.2)" }}
              >
                <Users className="w-4 h-4 text-[#29B6F6]" />
                <span className="text-sm text-[#2D4A6E]">
                  <strong>1,240</strong> Followers
                </span>
              </div>
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(129, 199, 132, 0.2)" }}
              >
                <Eye className="w-4 h-4 text-[#66BB6A]" />
                <span className="text-sm text-[#2D4A6E]">
                  <strong>+15%</strong> Reach this week
                </span>
              </div>
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(255, 138, 128, 0.2)" }}
              >
                <MessageCircle className="w-4 h-4 text-[#FF8A80]" />
                <span className="text-sm text-[#2D4A6E]">
                  <strong>12</strong> Unread comments
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D4A6E]/40" />
              <input
                type="text"
                placeholder="Search your posts, followers, or analytics..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E0F2F1] rounded-xl text-sm text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none focus:ring-2 focus:ring-[#FF8A80]/30 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Composer Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card 
              className="p-5 bg-white border-none shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <textarea
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                placeholder="Share an update with your community..."
                className="w-full h-24 resize-none bg-transparent text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none text-sm leading-relaxed"
              />

              <Separator className="my-4 bg-[#E0F2F1]" />

              <div className="flex items-center justify-between">
                {/* Tool Icons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                  >
                    <FileImage className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                  >
                    <FileVideo className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                  >
                    <Code2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Visibility Toggle & Post Button */}
                <div className="flex items-center gap-4">
                  {/* Segmented Control */}
                  <div 
                    className="flex items-center p-1 rounded-xl"
                    style={{ backgroundColor: "#E0F2F1" }}
                  >
                    <button
                      onClick={() => setVisibility("public")}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        visibility === "public"
                          ? "bg-white text-[#2D4A6E] shadow-sm"
                          : "text-[#2D4A6E]/60"
                      )}
                    >
                      Public
                    </button>
                    <button
                      onClick={() => setVisibility("supporters")}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        visibility === "supporters"
                          ? "bg-white text-[#2D4A6E] shadow-sm"
                          : "text-[#2D4A6E]/60"
                      )}
                    >
                      Supporters Only
                    </button>
                  </div>

                  <Button
                    className="rounded-xl px-6 py-2 h-10 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#2D4A6E" }}
                    disabled={!composerText.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Update
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Management Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2D4A6E]">Your Posts</h2>
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ backgroundColor: "rgba(255, 138, 128, 0.2)", color: "#FF8A80" }}
              >
                {myPosts.length} posts
              </Badge>
            </div>

            <AnimatePresence>
              {hasPosted ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {myPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      onMouseEnter={() => setHoveredPost(post.id)}
                      onMouseLeave={() => setHoveredPost(null)}
                    >
                      <Card 
                        className="overflow-hidden bg-white border-none shadow-md transition-all duration-300 hover:shadow-xl"
                        style={{ borderRadius: "24px" }}
                      >
                        {/* Post Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {/* Visibility Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge
                              className={cn(
                                "text-xs font-medium",
                                post.visibility === "supporters"
                                  ? "bg-[#FF8A80] text-white"
                                  : "bg-[#2D4A6E] text-white"
                              )}
                              style={{ borderRadius: "12px" }}
                            >
                              {post.visibility === "supporters" ? "Supporter Exclusive" : "Public"}
                            </Badge>
                          </div>
                          {/* Hover Edit/Delete Icons */}
                          <div 
                            className={cn(
                              "absolute top-4 left-4 flex gap-2 transition-opacity duration-300",
                              hoveredPost === post.id ? "opacity-100" : "opacity-0"
                            )}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-[#2D4A6E]"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-[#FF8A80]"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-5">
                          <h3 className="font-semibold text-[#2D4A6E] mb-2">{post.title}</h3>
                          <p className="text-sm text-[#2D4A6E]/70 line-clamp-2 mb-4">{post.preview}</p>

                          {/* Admin Overlay Stats */}
                          <div 
                            className="flex items-center justify-between p-3 rounded-xl"
                            style={{ backgroundColor: "rgba(224, 242, 241, 0.5)" }}
                          >
                            <div className="flex items-center gap-4 text-xs text-[#2D4A6E]/70">
                              <span>
                                <strong className="text-[#2D4A6E]">Reach:</strong> {post.reach}
                              </span>
                              <span>
                                <strong className="text-[#2D4A6E]">Likes:</strong> {post.likes}
                              </span>
                              <span>
                                <strong className="text-[#2D4A6E]">Comments:</strong> {post.comments}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs text-[#2D4A6E] hover:bg-[#E0F2F1]"
                            >
                              Edit Post
                            </Button>
                          </div>

                          {/* Posted Time */}
                          <div className="flex items-center gap-1 mt-3 text-xs text-[#2D4A6E]/50">
                            <Clock className="w-3 h-3" />
                            Posted {post.postedAt}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Empty State - Getting Started Checklist */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: "rgba(255, 138, 128, 0.1)" }}
                  >
                    <Sparkles className="w-10 h-10 text-[#FF8A80]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2D4A6E] mb-2">Getting Started</h3>
                  <p className="text-sm text-[#2D4A6E]/60 mb-6 max-w-sm mx-auto">
                    Complete these steps to launch your creator journey
                  </p>
                  
                  <div className="max-w-sm mx-auto space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-[#E0F2F1] flex items-center justify-center" />
                      <span className="text-sm text-[#2D4A6E]">Create your first post</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-[#E0F2F1] flex items-center justify-center" />
                      <span className="text-sm text-[#2D4A6E]">Invite your followers</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-[#E0F2F1] flex items-center justify-center" />
                      <span className="text-sm text-[#2D4A6E]">Set up your tiers</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Say Thanks Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card 
              className="p-5 bg-white border-none shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-[#FF8A80]" />
                <h3 className="font-semibold text-[#2D4A6E]">Say Thanks</h3>
              </div>
              <p className="text-xs text-[#2D4A6E]/60 mb-4">
                Recent supporters and followers
              </p>

              <div className="space-y-3">
                {recentSupporters.map((supporter, index) => (
                  <motion.div
                    key={supporter.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src={supporter.avatar} />
                      <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
                        {supporter.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2D4A6E] truncate">
                        {supporter.name}
                      </p>
                      <p className="text-xs text-[#2D4A6E]/60">
                        {supporter.action}
                        {supporter.tier && (
                          <span className="text-[#FF8A80] font-medium"> ({supporter.tier})</span>
                        )}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-3 text-xs rounded-full hover:bg-[#E0F2F1] text-[#2D4A6E]"
                    >
                      Message
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Goal Tracker Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card 
              className="p-5 bg-white border-none shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[#2D4A6E]" />
                <h3 className="font-semibold text-[#2D4A6E]">Next Milestone</h3>
              </div>

              <p className="text-sm text-[#2D4A6E] mb-2">Reach 50 Paid Supporters</p>
              <div className="flex items-center justify-between text-xs text-[#2D4A6E]/60 mb-3">
                <span>32 / 50 supporters</span>
                <span>65%</span>
              </div>

              <Progress 
                value={65} 
                className="h-2 mb-4"
                style={{ 
                  backgroundColor: "#E0F2F1",
                }}
              />
              <style jsx>{`
                :global([data-slot="progress-indicator"]) {
                  background-color: #2D4A6E !important;
                }
              `}</style>

              <p className="text-xs text-[#2D4A6E]/60 text-center">
                Only 18 more to unlock the Creator Pro badge!
              </p>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card 
              className="p-5 bg-white border-none shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#FF8A80]" />
                <h3 className="font-semibold text-[#2D4A6E]">Upcoming</h3>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "rgba(224, 242, 241, 0.8)" }}
                    >
                      <event.icon className="w-4 h-4 text-[#2D4A6E]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#2D4A6E]">{event.title}</p>
                      <p className="text-xs text-[#2D4A6E]/70">{event.description}</p>
                      <p className="text-xs text-[#FF8A80] mt-1">{event.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4 text-xs text-[#2D4A6E] hover:bg-[#E0F2F1]"
              >
                View all events
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
