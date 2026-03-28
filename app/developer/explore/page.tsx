"use client";

import { motion } from "framer-motion";
import { Compass, Github, GitFork, Star, Search, Filter, Code, Terminal, Zap, TrendingUp, Layers, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const trendingRepos = [
  {
    id: "1",
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    author: { name: "shadcn", avatar: "https://github.com/shadcn.png" },
    language: "TypeScript",
    stars: 54100,
    forks: 2100,
    trending: true,
    tags: ["ui", "components", "react"],
  },
  {
    id: "2",
    name: "vercel/ai",
    description: "The AI SDK for TypeScript. Build AI-powered streaming text and chat UIs.",
    author: { name: "vercel", avatar: "https://github.com/vercel.png" },
    language: "TypeScript",
    stars: 8900,
    forks: 1200,
    trending: true,
    tags: ["ai", "streaming", "typescript"],
  },
  {
    id: "3",
    name: "rust-lang/rust",
    description: "Empowering everyone to build reliable and efficient software.",
    author: { name: "rust-lang", avatar: "https://github.com/rust-lang.png" },
    language: "Rust",
    stars: 94000,
    forks: 12000,
    trending: false,
    tags: ["systems", "language", "performance"],
  },
  {
    id: "4",
    name: "tailwindcss/tailwindcss",
    description: "A utility-first CSS framework for rapidly building custom designs.",
    author: { name: "tailwindcss", avatar: "https://github.com/tailwindcss.png" },
    language: "TypeScript",
    stars: 78000,
    forks: 3900,
    trending: true,
    tags: ["css", "design", "frontend"],
  },
];

const techStacks = [
  { name: "React Ecosystem", icon: Code, count: "12.4k repos", color: "#61DAFB" },
  { name: "Rust Systems", icon: Terminal, count: "5.2k repos", color: "#DEA584" },
  { name: "Go Backend", icon: Zap, count: "8.1k repos", color: "#00ADD8" },
  { name: "Python ML", icon: Layers, count: "15.6k repos", color: "#3776AB" },
];

const developersToFollow = [
  {
    id: "1",
    name: "Dan Abramov",
    handle: "gaearon",
    avatar: "https://github.com/gaearon.png",
    bio: "React core team member",
    followers: "120k",
  },
  {
    id: "2",
    name: "Kent C. Dodds",
    handle: "kentcdodds",
    avatar: "https://github.com/kentcdodds.png",
    bio: "Teaching people to build better software",
    followers: "85k",
  },
  {
    id: "3",
    name: "Ryan Dahl",
    handle: "ry",
    avatar: "https://github.com/ry.png",
    bio: "Creator of Node.js & Deno",
    followers: "45k",
  },
];

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  Rust: "#dea584",
  Go: "#00add8",
  Python: "#3776ab",
  JavaScript: "#f1e05a",
};

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

export default function DeveloperExplorePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ background: "linear-gradient(135deg, #2D4A6E 0%, #80CBC4 100%)" }}
            >
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Explore</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                Discover repositories and developers
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-sm w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D4A6E]/40" />
            <input
              type="text"
              placeholder="Search repositories, developers..."
              className="pl-11 pr-4 py-2.5 bg-white border border-[#E0F2F1] rounded-xl text-sm text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none focus:ring-2 focus:ring-[#80CBC4]/30 shadow-sm w-full sm:w-80"
            />
          </div>
        </div>
      </motion.div>

      {/* Tech Stacks */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {techStacks.map((stack) => (
          <motion.div key={stack.name} variants={itemVariants} whileHover={{ y: -4 }}>
            <Card 
              className="p-4 bg-white border-none shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div 
                className="p-2 rounded-xl w-fit mb-3"
                style={{ backgroundColor: `${stack.color}20` }}
              >
                <stack.icon className="w-5 h-5" style={{ color: stack.color }} />
              </div>
              <h3 className="font-semibold text-[#2D4A6E] text-sm">{stack.name}</h3>
              <p className="text-xs text-[#2D4A6E]/60 mt-1">{stack.count}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Repositories */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#80CBC4]" />
                <h2 className="font-semibold text-[#2D4A6E]">Trending Repositories</h2>
              </div>
              <Badge 
                variant="secondary" 
                className="text-xs border-none cursor-pointer hover:bg-[#E0F2F1]"
                style={{ backgroundColor: "rgba(128, 203, 196, 0.2)", color: "#2D4A6E" }}
              >
                <Filter className="w-3 h-3 mr-1" />
                Filter
              </Badge>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {trendingRepos.map((repo) => (
              <motion.div
                key={repo.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <Card 
                  className="p-5 bg-white border-none shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ borderRadius: "24px" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                        <AvatarImage src={repo.author.avatar} />
                        <AvatarFallback className="bg-[#2D4A6E] text-white">
                          {repo.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-[#2D4A6E] hover:text-[#80CBC4] transition-colors cursor-pointer">
                          {repo.name}
                        </h3>
                        <p className="text-xs text-[#2D4A6E]/60">@{repo.author.name}</p>
                      </div>
                    </div>
                    {repo.trending && (
                      <Badge 
                        className="text-xs border-none"
                        style={{ backgroundColor: "#FF8A80", color: "white" }}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-[#2D4A6E]/70 mb-4">{repo.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[#2D4A6E]/60">
                      <span className="flex items-center gap-1">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || "#888" }}
                        />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {(repo.stars / 1000).toFixed(1)}k
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {(repo.forks / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {repo.tags.slice(0, 2).map((tag) => (
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
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Developers to Follow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card 
              className="p-5 bg-white border-none shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#2D4A6E]" />
                  <h3 className="font-semibold text-[#2D4A6E]">Developers to Follow</h3>
                </div>
              </div>

              <div className="space-y-3">
                {developersToFollow.map((dev, index) => (
                  <motion.div
                    key={dev.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#E0F2F1]/50 transition-colors cursor-pointer"
                  >
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src={dev.avatar} />
                      <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
                        {dev.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2D4A6E] truncate">
                        {dev.name}
                      </p>
                      <p className="text-xs text-[#2D4A6E]/60 truncate">
                        {dev.bio}
                      </p>
                      <p className="text-[10px] text-[#80CBC4]">
                        {dev.followers} followers
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs rounded-full hover:bg-[#80CBC4]/20 text-[#2D4A6E]"
                    >
                      Follow
                    </Button>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4 text-xs text-[#2D4A6E] hover:bg-[#E0F2F1]"
              >
                View more developers
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </Card>
          </motion.div>

          {/* Similar Tech Stacks CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card 
              className="p-5 bg-white border-none shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-[#80CBC4]" />
                <h3 className="font-semibold text-[#2D4A6E]">Similar Tech Stacks</h3>
              </div>
              <p className="text-xs text-[#2D4A6E]/60 mb-4">
                Discover projects using similar technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Rust", "Go", "Tailwind", "Node.js"].map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-[#E0F2F1] border-[#E0F2F1]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <Card 
          className="p-8 border-none shadow-lg relative overflow-hidden"
          style={{ 
            borderRadius: "24px",
            background: "linear-gradient(135deg, #2D4A6E 0%, #3D5A7E 100%)",
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Looking for Contributors?
              </h3>
              <p className="text-white/70 text-sm max-w-md">
                Connect with talented developers and build your open-source community together.
              </p>
            </div>
            <Button 
              className="rounded-xl bg-white text-[#2D4A6E] hover:bg-white/90 px-6"
            >
              <Github className="w-4 h-4 mr-2" />
              Find Contributors
            </Button>
          </div>
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(128,203,196,0.5) 0%, transparent 70%)",
              transform: "translate(30%, -50%)",
            }}
          />
        </Card>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-[#2D4A6E]/60">
          Showing trending repositories from GitHub's API
        </p>
        <Button 
          variant="ghost" 
          className="mt-2 text-[#80CBC4] hover:bg-[#80CBC4]/10"
        >
          View All Trending
          <TrendingUp className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
