"use client";

import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Clock, Star, Github, FileCode, BookOpen, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const savedItems = [
  {
    id: "1",
    type: "repo",
    title: "next-auth/next-auth",
    description: "Authentication for Next.js",
    author: {
      name: "NextAuth.js",
      handle: "nextauthjs",
      avatar: "https://github.com/nextauthjs.png",
    },
    stats: { stars: "18.2k", language: "TypeScript" },
    savedAt: "2 days ago",
    tags: ["auth", "nextjs"],
  },
  {
    id: "2",
    type: "article",
    title: "Understanding React Server Components",
    description: "Deep dive into RSC architecture and performance implications",
    author: {
      name: "Dan Abramov",
      handle: "dan_abramov",
      avatar: "https://github.com/gaearon.png",
    },
    savedAt: "1 week ago",
    tags: ["react", "architecture"],
  },
  {
    id: "3",
    type: "repo",
    title: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    author: {
      name: "shadcn",
      handle: "shadcn",
      avatar: "https://github.com/shadcn.png",
    },
    stats: { stars: "54.1k", language: "TypeScript" },
    savedAt: "2 weeks ago",
    tags: ["ui", "tailwind"],
  },
  {
    id: "4",
    type: "snippet",
    title: "Custom React Hook: useDebounce",
    description: `const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};`,
    author: {
      name: "Ananya Sharma",
      handle: "ananyasharma",
      avatar: "https://i.pravatar.cc/150?u=ananya",
    },
    savedAt: "3 weeks ago",
    tags: ["hooks", "utilities"],
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

const typeIcons: Record<string, { bg: string; icon: typeof FileCode; color: string }> = {
  repo: { bg: "bg-gray-100", icon: Github, color: "text-gray-700" },
  article: { bg: "bg-blue-100", icon: BookOpen, color: "text-blue-600" },
  snippet: { bg: "bg-purple-100", icon: FileCode, color: "text-purple-600" },
};

export default function DeveloperSavedPage() {
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
              style={{ background: "linear-gradient(135deg, #2D4A6E 0%, #80CBC4 100%)" }}
            >
              <Bookmark className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Saved</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                {savedItems.length} items saved for reference
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-xl border-[#E0F2F1] text-[#2D4A6E] hover:bg-[#E0F2F1]"
          >
            <Tag className="w-4 h-4 mr-2" />
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
          Repositories
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 text-[#2D4A6E]/70 hover:bg-[#E0F2F1] cursor-pointer border-[#E0F2F1]"
        >
          Articles
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full px-4 py-2 text-[#2D4A6E]/70 hover:bg-[#E0F2F1] cursor-pointer border-[#E0F2F1]"
        >
          Snippets
        </Badge>
      </motion.div>

      {/* Saved Items Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {savedItems.map((item) => {
          const TypeIcon = typeIcons[item.type]?.icon || FileCode;
          return (
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
                      className={`w-4 h-4 ${typeIcons[item.type]?.color || "text-gray-600"} fill-current`}
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-[#2D4A6E] mb-2 line-clamp-2 group-hover:text-[#80CBC4] transition-colors">
                  {item.title}
                </h3>
                
                {/* Code snippet for type 'snippet' */}
                {item.type === "snippet" ? (
                  <div 
                    className="mb-3 p-3 rounded-lg overflow-x-auto"
                    style={{ 
                      backgroundColor: "#1e1e2e",
                      borderRadius: "8px",
                    }}
                  >
                    <pre className="text-xs text-green-400 font-mono">
                      <code>{item.description}</code>
                    </pre>
                  </div>
                ) : (
                  <p className="text-sm text-[#2D4A6E]/70 line-clamp-2 mb-3 flex-1">
                    {item.description}
                  </p>
                )}

                {/* Stats for repos */}
                {item.type === "repo" && item.stats && (
                  <div className="flex items-center gap-3 text-xs text-[#2D4A6E]/60 mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {item.stats.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#3178c6" }}
                      />
                      {item.stats.language}
                    </span>
                  </div>
                )}

                {/* Footer */}
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
          );
        })}
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
            Bookmark repositories, articles, and code snippets for quick access.
          </p>
        </motion.div>
      )}

      {/* Quick Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 rounded-xl border"
        style={{ backgroundColor: "rgba(224, 242, 241, 0.5)", borderColor: "#E0F2F1" }}
      >
        <p className="text-sm text-[#2D4A6E]/80">
          <span className="font-medium">Developer tip:</span> Use{" "}
          <kbd className="px-2 py-0.5 rounded bg-white text-xs font-mono" style={{ color: "#2D4A6E" }}>Ctrl+S</kbd>{" "}
          while browsing GitHub to instantly save repositories to your collection.
        </p>
      </motion.div>
    </div>
  );
}
