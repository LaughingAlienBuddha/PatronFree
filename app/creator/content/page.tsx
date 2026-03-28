"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Plus, Image, Video, FileText, BarChart3, Eye, Heart, MessageCircle, MoreHorizontal, Edit3, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const myContent = [
  {
    id: "1",
    title: "10 UI Design Principles Every Developer Should Know",
    type: "post",
    status: "published",
    reach: 450,
    likes: 82,
    comments: 12,
    postedAt: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Sacred Geometry Icon Set",
    type: "artwork",
    status: "published",
    reach: 890,
    likes: 156,
    comments: 28,
    postedAt: "5 days ago",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Behind the Scenes: Festivals in Motion",
    type: "video",
    status: "published",
    reach: 320,
    likes: 67,
    comments: 8,
    postedAt: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "React Performance Guide",
    type: "post",
    status: "draft",
    postedAt: "Draft saved 2 hours ago",
    thumbnail: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const typeIcons: Record<string, { icon: typeof Image; color: string; bg: string }> = {
  post: { icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
  artwork: { icon: Image, color: "text-purple-600", bg: "bg-purple-100" },
  video: { icon: Video, color: "text-red-600", bg: "bg-red-100" },
};

export default function MyContentPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ background: "linear-gradient(135deg, #2D4A6E 0%, #FF8A80 100%)" }}
            >
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">My Content</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                Manage your posts, projects, and drafts
              </p>
            </div>
          </div>
          <Button 
            className="rounded-xl text-white hover:opacity-90"
            style={{ backgroundColor: "#2D4A6E" }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Create New
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <Card className="p-4 bg-white border-none shadow-md" style={{ borderRadius: "16px" }}>
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Total Posts</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">24</p>
        </Card>
        <Card className="p-4 bg-white border-none shadow-md" style={{ borderRadius: "16px" }}>
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Total Reach</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">12.4K</p>
        </Card>
        <Card className="p-4 bg-white border-none shadow-md" style={{ borderRadius: "16px" }}>
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Engagement</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">8.5%</p>
        </Card>
        <Card className="p-4 bg-white border-none shadow-md" style={{ borderRadius: "16px" }}>
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Drafts</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">3</p>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white p-1 rounded-xl mb-6" style={{ borderRadius: "12px" }}>
            <TabsTrigger 
              value="all" 
              className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
            >
              All Content
            </TabsTrigger>
            <TabsTrigger 
              value="published"
              className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
            >
              Published
            </TabsTrigger>
            <TabsTrigger 
              value="drafts"
              className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
            >
              Drafts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <ContentGrid content={myContent} />
          </TabsContent>
          <TabsContent value="published" className="mt-0">
            <ContentGrid content={myContent.filter(c => c.status === "published")} />
          </TabsContent>
          <TabsContent value="drafts" className="mt-0">
            <ContentGrid content={myContent.filter(c => c.status === "draft")} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function ContentGrid({ content }: { content: typeof myContent }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {content.map((item) => {
        const TypeIcon = typeIcons[item.type]?.icon || FileText;
        return (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <Card 
              className="overflow-hidden bg-white border-none shadow-md transition-all duration-300 hover:shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              {/* Thumbnail */}
              {item.thumbnail ? (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={cn(
                        "text-xs font-medium border-none",
                        typeIcons[item.type]?.bg || "bg-gray-100",
                        typeIcons[item.type]?.color || "text-gray-600"
                      )}
                      style={{ borderRadius: "8px" }}
                    >
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={cn(
                        "text-xs font-medium border-none",
                        item.status === "published" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      )}
                      style={{ borderRadius: "8px" }}
                    >
                      {item.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div 
                  className="h-32 flex items-center justify-center"
                  style={{ backgroundColor: "#E0F2F1" }}
                >
                  <TypeIcon className="w-12 h-12 text-[#2D4A6E]/20" />
                </div>
              )}

              {/* Content Info */}
              <div className="p-4">
                <h3 className="font-semibold text-[#2D4A6E] mb-2 line-clamp-1">{item.title}</h3>
                
                {item.status === "published" && (
                  <div className="flex items-center gap-4 text-xs text-[#2D4A6E]/60 mb-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.reach}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {item.comments}
                    </span>
                  </div>
                )}

                <p className="text-xs text-[#2D4A6E]/50 mb-3">{item.postedAt}</p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E0F2F1]">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg hover:bg-[#E0F2F1] text-[#2D4A6E]"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-[#2D4A6E] hover:bg-[#E0F2F1]"
                  >
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
