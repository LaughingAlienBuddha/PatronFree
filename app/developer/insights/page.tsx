"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Star, GitFork, Eye, Download, ArrowUpRight, Users, Code, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Analytics data
const analyticsData = {
  totalViews: 45800,
  viewsGrowth: 23,
  uniqueVisitors: 12400,
  visitorsGrowth: 18,
  avgTimeOnPage: "3m 42s",
  bounceRate: 42,
};

const starHistory = [
  { month: "Aug", stars: 1800 },
  { month: "Sep", stars: 2100 },
  { month: "Oct", stars: 2400 },
  { month: "Nov", stars: 2800 },
  { month: "Dec", stars: 3100 },
];

const trafficSources = [
  { source: "GitHub", percentage: 45, color: "#333" },
  { source: "Google Search", percentage: 25, color: "#4285F4" },
  { source: "Twitter/X", percentage: 15, color: "#1DA1F2" },
  { source: "Direct", percentage: 10, color: "#80CBC4" },
  { source: "Other", percentage: 5, color: "#FF8A80" },
];

const topRepos = [
  { name: "patronex-sdk", views: 15200, stars: 1240, growth: 15 },
  { name: "patronex-worker", views: 9800, stars: 856, growth: 22 },
  { name: "patronex-api", views: 7200, stars: 670, growth: 8 },
  { name: "patronex-docs", views: 4500, stars: 320, growth: 35 },
];

const recentActivity = [
  { action: "Star received", repo: "patronex-sdk", user: "kentcdodds", time: "2m ago" },
  { action: "Fork created", repo: "patronex-worker", user: "vercel", time: "15m ago" },
  { action: "PR opened", repo: "patronex-docs", user: "sarahchen", time: "1h ago" },
  { action: "Issue opened", repo: "patronex-api", user: "stripe", time: "2h ago" },
  { action: "Star received", repo: "patronex-sdk", user: "github", time: "3h ago" },
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

export default function InsightsPage() {
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
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Insights</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                Repository analytics and growth metrics
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-xl border-[#E0F2F1] text-[#2D4A6E] hover:bg-[#E0F2F1]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D4A6E]/60">Total Views</p>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(79, 195, 247, 0.2)" }}
            >
              <Eye className="w-4 h-4 text-[#29B6F6]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2D4A6E]">{(analyticsData.totalViews / 1000).toFixed(1)}k</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+{analyticsData.viewsGrowth}%</span>
          </div>
        </Card>

        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D4A6E]/60">Unique Visitors</p>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(128, 203, 196, 0.2)" }}
            >
              <Users className="w-4 h-4 text-[#80CBC4]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2D4A6E]">{(analyticsData.uniqueVisitors / 1000).toFixed(1)}k</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+{analyticsData.visitorsGrowth}%</span>
          </div>
        </Card>

        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D4A6E]/60">Avg. Time</p>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(129, 199, 132, 0.2)" }}
            >
              <Activity className="w-4 h-4 text-[#66BB6A]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2D4A6E]">{analyticsData.avgTimeOnPage}</p>
          <p className="text-xs text-[#2D4A6E]/50 mt-1">Per session</p>
        </Card>

        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#2D4A6E]/60">Bounce Rate</p>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255, 138, 128, 0.2)" }}
            >
              <TrendingUp className="w-4 h-4 text-[#FF8A80]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2D4A6E]">{analyticsData.bounceRate}%</p>
          <p className="text-xs text-[#2D4A6E]/50 mt-1">-5% vs last month</p>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Star Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FFD54F] fill-[#FFD54F]" />
                <h3 className="font-semibold text-[#2D4A6E]">Star Growth</h3>
              </div>
              <Badge 
                variant="secondary" 
                className="text-xs border-none"
                style={{ backgroundColor: "rgba(128, 203, 196, 0.2)", color: "#2D4A6E" }}
              >
                +1.3k this year
              </Badge>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between gap-3 h-40">
              {starHistory.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.stars / 3500) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    className="w-full rounded-t-lg relative group cursor-pointer"
                    style={{ 
                      background: "linear-gradient(180deg, #80CBC4 0%, #2D4A6E 100%)",
                      maxHeight: "120px",
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2D4A6E] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {(data.stars / 1000).toFixed(1)}k
                    </div>
                  </motion.div>
                  <span className="text-xs text-[#2D4A6E]/60">{data.month}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
            <h3 className="font-semibold text-[#2D4A6E] mb-6">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[#2D4A6E]">{source.source}</span>
                    <span className="text-xs text-[#2D4A6E]/60">{source.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E0F2F1" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top Repositories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6"
      >
        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <h3 className="font-semibold text-[#2D4A6E] mb-4">Top Repositories</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-[#2D4A6E]/60 border-b border-[#E0F2F1]">
                  <th className="pb-3 font-medium">Repository</th>
                  <th className="pb-3 font-medium text-right">Views</th>
                  <th className="pb-3 font-medium text-right">Stars</th>
                  <th className="pb-3 font-medium text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topRepos.map((repo) => (
                  <tr key={repo.name} className="text-sm">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-[#80CBC4]" />
                        <span className="font-medium text-[#2D4A6E]">{repo.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-[#2D4A6E]/70">
                      {(repo.views / 1000).toFixed(1)}k
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="w-3 h-3 text-[#FFD54F] fill-[#FFD54F]" />
                        <span className="text-[#2D4A6E]">{repo.stars}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-green-600 text-xs">+{repo.growth}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6"
      >
        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <h3 className="font-semibold text-[#2D4A6E] mb-4">Recent Activity</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#E0F2F1]/50 transition-colors"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#E0F2F1" }}
                >
                  {activity.action === "Star received" && <Star className="w-4 h-4 text-[#FFD54F]" />}
                  {activity.action === "Fork created" && <GitFork className="w-4 h-4 text-[#80CBC4]" />}
                  {activity.action === "PR opened" && <Code className="w-4 h-4 text-[#29B6F6]" />}
                  {activity.action === "Issue opened" && <Activity className="w-4 h-4 text-[#FF8A80]" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#2D4A6E]">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-[#2D4A6E]/60"> on </span>
                    <code className="text-[#80CBC4] font-mono text-xs">{activity.repo}</code>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#2D4A6E]/50">{activity.time}</span>
                  <Badge variant="secondary" className="text-[10px] border-none" style={{ backgroundColor: "#E0F2F1", color: "#2D4A6E" }}>
                    @{activity.user}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
