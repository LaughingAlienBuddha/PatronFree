"use client";

import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Clock, Heart, FileText, Image as ImageIcon, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const savedItems = [
  {
    id: "1",
    type: "post",
    title: "The Future of Design Systems in 2024",
    author: {
      name: "Nikhil Desai",
      handle: "nikhil.designs",
      avatar: "https://i.pravatar.cc/150?u=nikhil",
    },
    savedAt: "2 days ago",
    preview: "Exploring how design systems are evolving with AI and component-driven development...",
    tags: ["Design Systems", "2024", "Trends"],
  },
  {
    id: "2",
    type: "artwork",
    title: "Digital Madhubani Collection",
    author: {
      name: "Priya Krishnan",
      handle: "priya.artistry",
      avatar: "https://i.pravatar.cc/150?u=priya",
    },
    savedAt: "1 week ago",
    preview: "Reimagining ancient Madhubani patterns in high-resolution digital art...",
    tags: ["Art", "Traditional", "Digital"],
  },
  {
    id: "3",
    type: "video",
    title: "Unity Game Development Tutorial Series",
    author: {
      name: "Arjun Reddy",
      handle: "arjun.builds",
      avatar: "https://i.pravatar.cc/150?u=arjun",
    },
    savedAt: "2 weeks ago",
    preview: "Complete guide to building narrative-driven games with Unity...",
    tags: ["Games", "Unity", "Tutorial"],
  },
  {
    id: "4",
    type: "post",
    title: "Building Accessible Components",
    author: {
      name: "TechStudio",
      handle: "techstudio.dev",
      avatar: "https://i.pravatar.cc/150?u=techstudio",
    },
    savedAt: "3 weeks ago",
    preview: "Learn how to build accessible, unstyled components that work for everyone...",
    tags: ["Accessibility", "React", "Components"],
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

const typeIcons: Record<string, { bg: string; icon: string }> = {
  post: { bg: "bg-blue-100", icon: "text-blue-600" },
  artwork: { bg: "bg-purple-100", icon: "text-purple-600" },
  video: { bg: "bg-red-100", icon: "text-red-600" },
};

export default function CreatorSavedPage() {
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
              <Bookmark className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Saved</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                {savedItems.length} items saved for later
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-xl border-[#E0F2F1] text-[#2D4A6E] hover:bg-[#E0F2F1]"
          >
            Organize
          </Button>
        </div>
      </motion.div>

      {/* Filter Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 flex-wrap"
      >
        <Badge
          variant="secondary"
          className="rounded-full px-4 py-2 text-[#2D4A6E] cursor-pointer border-none"
          style={{ backgroundColor: "#E0F2F1" }}
        >
          All ({savedItems.length})
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 text-[#2D4A6E]/70 hover:bg-[#E0F2F1] cursor-pointer border-[#E0F2F1]"
        >
          Posts
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 text-[#2D4A6E]/70 hover:bg-[#E0F2F1] cursor-pointer border-[#E0F2F1]"
        >
          Projects
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 text-[#2D4A6E]/70 hover:bg-[#E0F2F1] cursor-pointer border-[#E0F2F1]"
        >
          Videos
        </Badge>
      </motion.div>

      {/* Saved Items Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {savedItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group"
          >
            <Card 
              className="p-5 bg-white border-none shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col"
              style={{ borderRadius: "24px" }}
            >
              <div className="flex items-start gap-4 mb-3">
                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                  <AvatarImage src={item.author.avatar} />
                  <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
                    {item.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#2D4A6E] text-sm">
                      {item.author.name}
                    </span>
                    <span className="text-xs text-[#2D4A6E]/50">
                      @{item.author.handle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#2D4A6E]/40 mt-0.5">
                    <Clock className="w-3 h-3" />
                    Saved {item.savedAt}
                  </div>
                </div>
                <div
                  className={`p-1.5 rounded-lg ${typeIcons[item.type]?.bg || "bg-gray-100"}`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${typeIcons[item.type]?.icon || "text-gray-600"} fill-current`}
                  />
                </div>
              </div>

              <h3 className="font-semibold text-[#2D4A6E] mb-2 line-clamp-2 group-hover:text-[#FF8A80] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#2D4A6E]/70 line-clamp-2 mb-3 flex-1">
                {item.preview}
              </p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E0F2F1]">
                <div className="flex gap-1 flex-wrap">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] border-none"
                      style={{ backgroundColor: "#E0F2F1", color: "#2D4A6E" }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-lg text-[#2D4A6E] hover:bg-[#E0F2F1]"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {savedItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#E0F2F1" }}
          >
            <Bookmark className="w-8 h-8 text-[#2D4A6E]/50" />
          </div>
          <h3 className="text-lg font-medium text-[#2D4A6E] mb-1">No saved items</h3>
          <p className="text-sm text-[#2D4A6E]/60">
            Bookmark posts and projects you want to revisit later.
          </p>
        </motion.div>
      )}

      {/* Pro Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 rounded-xl border"
        style={{ backgroundColor: "rgba(224, 242, 241, 0.5)", borderColor: "#E0F2F1" }}
      >
        <p className="text-sm text-[#2D4A6E]/80">
          <span className="font-medium">Pro tip:</span> Press{" "}
          <kbd className="px-2 py-0.5 rounded bg-white text-xs font-mono" style={{ color: "#2D4A6E" }}>B</kbd>{" "}
          while viewing any post to quickly save it.
        </p>
      </motion.div>
    </div>
  );
}
