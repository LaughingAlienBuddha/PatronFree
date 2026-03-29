"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Search,
  Star,
  AlertCircle,
  Users,
  FileCode,
  Code,
  Link as LinkIcon,
  FolderArchive,
  Send,
  Clock,
  CheckCircle,
  TerminalSquare,
  Edit3,
  Trash2,
  Github,
  GitCommit,
  MoreHorizontal,
  Target,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useUserProfile } from "@/hooks/use-user-profile";
import { LogoutButton } from "@/components/logout-button";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

// Mock project updates
const projectUpdates = [
  {
    id: "1",
    title: "v3.0.0 Release: Async Support & Breaking Changes",
    repo: "patronex-sdk",
    version: "v3.0.0",
    buildStatus: "passing",
    codeSnippet: `const client = new PatronexClient({
  apiVersion: 'v3',
  async: true,  // New async support
  retry: 3
});
await client.connect();`,
    stars: 245,
    description: "This release introduces full async/await support and removes deprecated callbacks. See migration guide for breaking changes.",
    postedAt: "3 hours ago",
    tags: ["Release", "Breaking Change"],
  },
  {
    id: "2",
    title: "Fix: Memory leak in worker threads",
    repo: "patronex-worker",
    version: "v2.1.2",
    buildStatus: "passing",
    codeSnippet: `// Fixed: Proper cleanup of WorkerPool
workerPool.terminate().then(() => {
  console.log('Workers terminated safely');
});`,
    stars: 128,
    description: "Resolved critical memory leak when terminating worker threads. All users on v2.x should upgrade immediately.",
    postedAt: "1 day ago",
    tags: ["Bugfix", "Security"],
  },
  {
    id: "3",
    title: "RFC: GraphQL API for v4",
    repo: "patronex-api",
    version: null,
    buildStatus: null,
    codeSnippet: `type Query {
  creator(id: ID!): Creator
  projects(filter: ProjectFilter): [Project!]!
}`,
    stars: 89,
    description: "Proposing a GraphQL layer for the v4 API. Please review the RFC and share your thoughts in the discussion.",
    postedAt: "2 days ago",
    tags: ["RFC", "API Design"],
  },
];

// GitHub Activity
const githubActivity = [
  { id: 1, type: "commit", message: "feat: add webhook signature validation", time: "2m ago" },
  { id: 2, type: "commit", message: "docs: update API reference", time: "1h ago" },
  { id: 3, type: "commit", message: "fix: resolve rate limiting issue", time: "3h ago" },
];

// Milestones
const milestones = [
  { id: 1, title: "v3.0 Release Documentation", progress: 85, target: "Jan 15" },
  { id: 2, title: "TypeScript Migration", progress: 60, target: "Feb 1" },
  { id: 3, title: "GraphQL Beta", progress: 30, target: "Feb 15" },
];

// Sponsors
const sponsors = [
  { id: 1, name: "stripe", amount: 500, avatar: "https://github.com/stripe.png" },
  { id: 2, name: "vercel", amount: 250, avatar: "https://github.com/vercel.png" },
  { id: 3, name: "kentcdodds", amount: 100, avatar: "https://github.com/kentcdodds.png" },
];

const repos = ["patronex-sdk", "patronex-api", "patronex-worker", "patronex-docs"];

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

export default function DeveloperDashboardPage() {
  const { user, loading } = useUserProfile();
  const [changelogText, setChangelogText] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(repos[0]);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  // Get user's display name from Firebase or profile
  const userName = user?.name || auth.currentUser?.displayName || "Developer";

  return (
    <div className="min-h-screen">
      {/* Header with logout */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2D4A6E] flex items-center gap-2">
            <Terminal className="w-7 h-7 text-[#80CBC4]" />
            Systems check complete, {loading ? "..." : userName}.
          </h1>
          <p className="text-sm text-[#2D4A6E]/60 mt-1">
            Manage your projects and engage with sponsors
          </p>
        </div>
        <LogoutButton variant="outline" className="rounded-xl border-[#2D4A6E]/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Section - Build Health Strip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* Build Status Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Total Stars */}
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(128, 203, 196, 0.2)" }}
              >
                <Star className="w-4 h-4 text-[#80CBC4] fill-[#80CBC4]" />
                <span className="text-sm text-[#2D4A6E]">
                  <strong>2.4k</strong> Total Stars
                </span>
              </div>
              {/* Open Issues */}
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(255, 167, 38, 0.2)" }}
              >
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-[#2D4A6E]">
                  <strong>5</strong> Open Issues
                </span>
              </div>
              {/* Active Sponsors */}
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(79, 195, 247, 0.2)" }}
              >
                <Users className="w-4 h-4 text-[#29B6F6]" />
                <span className="text-sm text-[#2D4A6E]">
                  <strong>42</strong> Active Sponsors
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D4A6E]/40" />
              <input
                type="text"
                placeholder="Search repositories, sponsors, or documentation..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E0F2F1] rounded-xl text-sm text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none focus:ring-2 focus:ring-[#80CBC4]/30 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Changelog Composer */}
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
                value={changelogText}
                onChange={(e) => setChangelogText(e.target.value)}
                placeholder="What's the latest commit or roadmap update?"
                className="w-full h-28 resize-none bg-transparent text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none text-sm leading-relaxed"
                style={{ fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace" }}
              />

              <Separator className="my-4 bg-[#E0F2F1]" />

              <div className="flex items-center justify-between flex-wrap gap-3">
                {/* Technical Tool Icons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                    title="Markdown"
                  >
                    <FileCode className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                    title="Code Block"
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                    title="Link GitHub Issue"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-[#E0F2F1] text-[#2D4A6E]/60"
                    title="Attach Release/ZIP"
                  >
                    <FolderArchive className="w-4 h-4" />
                  </Button>
                </div>

                {/* Repo Selector & Publish Button */}
                <div className="flex items-center gap-3">
                  {/* Repo Dropdown */}
                  <select
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    className="px-3 py-2 rounded-xl text-xs text-[#2D4A6E] bg-[#E0F2F1] border-none focus:outline-none cursor-pointer hover:bg-[#d4ebe8] transition-colors"
                  >
                    {repos.map((repo) => (
                      <option key={repo} value={repo}>{repo}</option>
                    ))}
                  </select>

                  <Button
                    className="rounded-xl px-6 py-2 h-10 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#2D4A6E" }}
                    disabled={!changelogText.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish Update
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Project Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2D4A6E]">Updates & Releases</h2>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className="text-xs border-none"
                  style={{ backgroundColor: "rgba(128, 203, 196, 0.2)", color: "#2D4A6E" }}
                >
                  {projectUpdates.length} updates
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="text-xs border-none"
                  style={{ backgroundColor: "rgba(129, 199, 132, 0.2)", color: "#66BB6A" }}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  All builds passing
                </Badge>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {projectUpdates.map((update, index) => (
                <motion.div
                  key={update.id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredPost(update.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <Card 
                    className="overflow-hidden bg-white border-none shadow-md transition-all duration-300 hover:shadow-xl"
                    style={{ borderRadius: "24px" }}
                  >
                    {/* Header */}
                    <div className="p-5 pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium"
                            style={{ backgroundColor: "#E0F2F1", color: "#2D4A6E" }}
                          >
                            <Github className="w-3.5 h-3.5" />
                            {update.repo}
                          </div>
                          {update.version && (
                            <code 
                              className="px-2 py-0.5 rounded text-xs"
                              style={{ 
                                backgroundColor: "#2D4A6E", 
                                color: "white",
                                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
                              }}
                            >
                              {update.version}
                            </code>
                          )}
                          {update.buildStatus && (
                            <Badge 
                              className="text-xs border-none"
                              style={{ 
                                backgroundColor: update.buildStatus === "passing" ? "rgba(129, 199, 132, 0.2)" : "rgba(239, 83, 80, 0.2)",
                                color: update.buildStatus === "passing" ? "#66BB6A" : "#EF5350",
                              }}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Build: {update.buildStatus}
                            </Badge>
                          )}
                        </div>
                        {/* Hover Edit/Delete */}
                        <div 
                          className={cn(
                            "flex gap-1 transition-opacity duration-300",
                            hoveredPost === update.id ? "opacity-100" : "opacity-0"
                          )}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-[#E0F2F1] text-[#2D4A6E]"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-red-50 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <h3 className="font-semibold text-[#2D4A6E] mb-2">{update.title}</h3>
                      <p className="text-sm text-[#2D4A6E]/70">{update.description}</p>
                    </div>

                    {/* Code Preview Block */}
                    {update.codeSnippet && (
                      <div className="mx-5 mb-4">
                        <div 
                          className="rounded-lg overflow-hidden"
                          style={{ 
                            backgroundColor: "#1e1e2e",
                            borderRadius: "8px" 
                          }}
                        >
                          <div 
                            className="flex items-center gap-1.5 px-3 py-2"
                            style={{ backgroundColor: "#252535" }}
                          >
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            <span className="ml-2 text-xs text-gray-400 font-mono">{update.repo}</span>
                          </div>
                          <pre className="p-4 text-xs overflow-x-auto">
                            <code className="text-green-400 font-mono" style={{ fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace" }}>
                              {update.codeSnippet}
                            </code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="px-5 pb-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Star Button (GitHub-style) */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-lg border-[#E0F2F1] hover:bg-[#E0F2F1] text-[#2D4A6E]"
                          >
                            <Star className="w-4 h-4 mr-1.5" />
                            {update.stars}
                          </Button>
                          {/* Tags */}
                          <div className="flex gap-2">
                            {update.tags.map((tag) => (
                              <Badge 
                                key={tag}
                                variant="secondary" 
                                className="text-xs border-none"
                                style={{ backgroundColor: "#E0F2F1", color: "#2D4A6E" }}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#2D4A6E]/50">
                          <Clock className="w-3 h-3" />
                          {update.postedAt}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* GitHub Activity Widget */}
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
                <Github className="w-5 h-5 text-[#2D4A6E]" />
                <h3 className="font-semibold text-[#2D4A6E]">GitHub Activity</h3>
              </div>
              <p className="text-xs text-[#2D4A6E]/60 mb-4">
                Recent commits to patronex-sdk
              </p>

              <div className="relative">
                {/* Vertical line */}
                <div 
                  className="absolute left-4 top-0 bottom-0 w-px"
                  style={{ backgroundColor: "#E0F2F1" }}
                />
                
                <div className="space-y-4">
                  {githubActivity.map((commit, index) => (
                    <motion.div
                      key={commit.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3 relative pl-9"
                    >
                      <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-[#80CBC4] border-2 border-white shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#2D4A6E] truncate font-mono">
                          {commit.message}
                        </p>
                        <p className="text-[10px] text-[#2D4A6E]/50 mt-0.5">{commit.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4 text-xs text-[#2D4A6E] hover:bg-[#E0F2F1]"
              >
                View full history
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Card>
          </motion.div>

          {/* Project Milestones Card */}
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
                <Target className="w-5 h-5 text-[#80CBC4]" />
                <h3 className="font-semibold text-[#2D4A6E]">Project Milestones</h3>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium text-[#2D4A6E]">{milestone.title}</p>
                      <span className="text-xs text-[#2D4A6E]/60">{milestone.progress}%</span>
                    </div>
                    <Progress 
                      value={milestone.progress} 
                      className="h-2 mb-1.5"
                      style={{ backgroundColor: "#E0F2F1" }}
                    />
                    <p className="text-xs text-[#80CBC4]">Target: {milestone.target}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Sponsor Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card 
              className="p-5 bg-white border-none shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#FF8A80]" />
                  <h3 className="font-semibold text-[#2D4A6E]">Sponsor Spotlight</h3>
                </div>
                <span className="text-xs text-[#80CBC4] font-medium">₹42k/mo</span>
              </div>
              <p className="text-xs text-[#2D4A6E]/60 mb-4">
                Top contributors this month
              </p>

              <div className="space-y-3">
                {sponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      <AvatarImage src={sponsor.avatar} />
                      <AvatarFallback className="bg-[#2D4A6E] text-white text-xs">
                        {sponsor.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2D4A6E] truncate">
                        {sponsor.name}
                      </p>
                      <p className="text-xs text-[#2D4A6E]/60">
                        <code style={{ fontFamily: "monospace" }}>₹{sponsor.amount}/mo</code>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs rounded-full hover:bg-[#E0F2F1] text-[#2D4A6E]"
                    >
                      Thanks
                    </Button>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4 text-xs text-[#2D4A6E] hover:bg-[#E0F2F1]"
              >
                View all sponsors
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
