"use client";

import { motion } from "framer-motion";
import { FolderCode, Plus, Github, GitBranch, Star, GitFork, ExternalLink, Code, BookOpen, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "1",
    name: "patronex-sdk",
    description: "Official JavaScript SDK for Patronex API integration",
    language: "TypeScript",
    stars: 1240,
    forks: 89,
    issues: 5,
    buildStatus: "passing",
    lastUpdate: "2 hours ago",
    isPublic: true,
    tags: ["npm", "javascript", "api"],
  },
  {
    id: "2",
    name: "patronex-worker",
    description: "Background job processing for Patronex platform",
    language: "Rust",
    stars: 856,
    forks: 45,
    issues: 2,
    buildStatus: "passing",
    lastUpdate: "1 day ago",
    isPublic: true,
    tags: ["rust", "async", "performance"],
  },
  {
    id: "3",
    name: "patronex-api",
    description: "Core API infrastructure - GraphQL & REST endpoints",
    language: "Go",
    stars: 670,
    forks: 32,
    issues: 8,
    buildStatus: "failing",
    lastUpdate: "3 hours ago",
    isPublic: false,
    tags: ["go", "graphql", "internal"],
  },
  {
    id: "4",
    name: "patronex-docs",
    description: "Documentation site built with Next.js and MDX",
    language: "TypeScript",
    stars: 320,
    forks: 18,
    issues: 3,
    buildStatus: "passing",
    lastUpdate: "5 days ago",
    isPublic: true,
    tags: ["nextjs", "documentation", "mdx"],
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

export default function ProjectsPage() {
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
              <FolderCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Projects</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                Manage your repositories and open-source work
              </p>
            </div>
          </div>
          <Button 
            className="rounded-xl text-white hover:opacity-90"
            style={{ backgroundColor: "#2D4A6E" }}
          >
            <Plus className="w-4 h-4 mr-1" />
            New Project
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
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Total Repos</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">4</p>
        </Card>
        <Card className="p-4 bg-white border-none shadow-md" style={{ borderRadius: "16px" }}>
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Total Stars</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">3.1k</p>
        </Card>
        <Card className="p-4 bg-white border-none shadow-md" style={{ borderRadius: "16px" }}>
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Open Issues</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">18</p>
        </Card>
        <Card className="p-4 bg-white border-none shadow-md" style={{ borderRadius: "16px" }}>
          <p className="text-sm text-[#2D4A6E]/60 mb-1">Active Forks</p>
          <p className="text-2xl font-bold text-[#2D4A6E]">184</p>
        </Card>
      </motion.div>

      {/* Projects Tabs */}
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
              All Repositories
            </TabsTrigger>
            <TabsTrigger 
              value="public"
              className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
            >
              Public
            </TabsTrigger>
            <TabsTrigger 
              value="private"
              className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
            >
              Private
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <ProjectsGrid projects={projects} />
          </TabsContent>
          <TabsContent value="public" className="mt-0">
            <ProjectsGrid projects={projects.filter(p => p.isPublic)} />
          </TabsContent>
          <TabsContent value="private" className="mt-0">
            <ProjectsGrid projects={projects.filter(p => !p.isPublic)} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function ProjectsGrid({ projects }: { projects: typeof projects }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.01 }}
        >
          <Card 
            className="p-5 bg-white border-none shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col"
            style={{ borderRadius: "24px" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-[#2D4A6E]" />
                <h3 className="font-semibold text-[#2D4A6E]">{project.name}</h3>
                <Badge 
                  variant="outline" 
                  className="text-[10px] border-[#E0F2F1]"
                >
                  {project.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#E0F2F1]">
                  <Settings className="w-4 h-4 text-[#2D4A6E]/60" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-[#2D4A6E]/70 mb-4 flex-1">{project.description}</p>

            {/* Stats Row */}
            <div className="flex items-center gap-4 text-xs text-[#2D4A6E]/60 mb-4">
              {/* Language */}
              <div className="flex items-center gap-1">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: languageColors[project.language] || "#888" }}
                />
                <span>{project.language}</span>
              </div>
              {/* Stars */}
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                <span>{project.stars}</span>
              </div>
              {/* Forks */}
              <div className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                <span>{project.forks}</span>
              </div>
              {/* Build Status */}
              <Badge 
                className="text-[10px] border-none"
                style={{ 
                  backgroundColor: project.buildStatus === "passing" ? "rgba(129, 199, 132, 0.2)" : "rgba(239, 83, 80, 0.2)",
                  color: project.buildStatus === "passing" ? "#66BB6A" : "#EF5350",
                }}
              >
                {project.buildStatus === "passing" ? "✓ Passing" : "✗ Failing"}
              </Badge>
            </div>

            {/* Tags */}
            <div className="flex gap-1 flex-wrap mb-4">
              {project.tags.map((tag) => (
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

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E0F2F1]">
              <span className="text-xs text-[#2D4A6E]/50">Updated {project.lastUpdate}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs rounded-lg hover:bg-[#E0F2F1] text-[#2D4A6E]"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  Docs
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs rounded-lg hover:bg-[#E0F2F1] text-[#2D4A6E]"
                >
                  <Code className="w-3.5 h-3.5 mr-1" />
                  Code
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs rounded-lg hover:bg-[#E0F2F1] text-[#2D4A6E]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
