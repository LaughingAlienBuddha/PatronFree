"use client";

import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Clock, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const savedItems = [
  {
    id: "1",
    type: "post",
    title: "10 UI Design Principles Every Developer Should Know",
    author: {
      name: "Sarah Chen",
      handle: "sarah.designs",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    savedAt: "2 days ago",
    preview: "Design is not just about making things look good. It's about solving problems...",
    tags: ["Design", "Tutorial"],
  },
  {
    id: "2",
    type: "project",
    title: "React Performance Optimization Guide",
    author: {
      name: "TechStudio",
      handle: "techstudio.dev",
      avatar: "https://i.pravatar.cc/150?u=techstudio",
    },
    savedAt: "1 week ago",
    preview: "A comprehensive guide to optimizing React applications for production...",
    tags: ["React", "Performance", "Open Source"],
  },
  {
    id: "3",
    type: "artwork",
    title: "Digital Madhubani Collection - Part 3",
    author: {
      name: "Priya Krishnan",
      handle: "priya.artistry",
      avatar: "https://i.pravatar.cc/150?u=priya",
    },
    savedAt: "2 weeks ago",
    preview: "Exploring the intricate patterns of traditional Indian folk art in digital medium...",
    tags: ["Art", "Traditional", "Digital"],
  },
  {
    id: "4",
    type: "post",
    title: "Building Accessible Components with Radix UI",
    author: {
      name: "Alex Rivera",
      handle: "alex.codes",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    savedAt: "3 weeks ago",
    preview: "Learn how to build accessible, unstyled components that work for everyone...",
    tags: ["Accessibility", "React", "Tutorial"],
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
  project: { bg: "bg-green-100", icon: "text-green-600" },
  artwork: { bg: "bg-purple-100", icon: "text-purple-600" },
};

export default function SavedPage() {
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
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#365486] to-[#BAB2EA]">
              <Bookmark className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F1035]">Saved</h1>
              <p className="text-sm text-[#365486]/70">
                {savedItems.length} items saved for later
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-[#365486]/20 text-[#365486] hover:bg-[#365486]/5"
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
          className="rounded-full px-4 py-2 bg-white/80 text-[#365486] hover:bg-white cursor-pointer border border-white/60"
        >
          All ({savedItems.length})
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 bg-transparent text-[#365486]/70 hover:bg-white/50 cursor-pointer border-[#365486]/20"
        >
          Posts
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 bg-transparent text-[#365486]/70 hover:bg-white/50 cursor-pointer border-[#365486]/20"
        >
          Projects
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 bg-transparent text-[#365486]/70 hover:bg-white/50 cursor-pointer border-[#365486]/20"
        >
          Artwork
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
            <Card className="p-5 bg-gradient-to-br from-white/90 to-white/70 border-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-[#7FC7D9]/30 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-3">
                <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                  <AvatarImage src={item.author.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white text-xs">
                    {item.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#0F1035] text-sm">
                      {item.author.name}
                    </span>
                    <span className="text-xs text-[#365486]/60">
                      @{item.author.handle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#365486]/50 mt-0.5">
                    <Clock className="w-3 h-3" />
                    Saved {item.savedAt}
                  </div>
                </div>
                <div
                  className={`p-1.5 rounded-lg ${
                    typeIcons[item.type]?.bg || "bg-gray-100"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      typeIcons[item.type]?.icon || "text-gray-600"
                    } fill-current`}
                  />
                </div>
              </div>

              <h3 className="font-semibold text-[#0F1035] mb-2 line-clamp-2 group-hover:text-[#365486] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#365486]/70 line-clamp-2 mb-3 flex-1">
                {item.preview}
              </p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/60">
                <div className="flex gap-1 flex-wrap">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] bg-[#7FC7D9]/10 text-[#365486] border-[#7FC7D9]/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-lg text-[#365486] hover:bg-[#365486]/10"
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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7FC7D9]/20 to-[#365486]/20 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-[#365486]/50" />
          </div>
          <h3 className="text-lg font-medium text-[#0F1035] mb-1">No saved items</h3>
          <p className="text-sm text-[#365486]/70">
            Bookmark posts and projects you want to revisit later.
          </p>
        </motion.div>
      )}

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 rounded-xl bg-gradient-to-br from-[#7FC7D9]/10 to-[#BAB2EA]/10 border border-[#7FC7D9]/20"
      >
        <p className="text-sm text-[#365486]/80">
          <span className="font-medium">Pro tip:</span> Press{" "}
          <kbd className="px-2 py-0.5 rounded bg-white/60 text-xs font-mono">B</kbd> while
          viewing any post to quickly save it.
        </p>
      </motion.div>
    </div>
  );
}
