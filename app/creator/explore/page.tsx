"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles, TrendingUp, Users, Zap, Search } from "lucide-react";
import { CreatorSpotlightCard, CreatorData } from "@/components/feed/CreatorSpotlightCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Featured creators for creator explore
const FEATURED_CREATORS: CreatorData[] = [
  {
    id: "c1",
    name: "Zara Khan",
    handle: "zara.films",
    initials: "ZK",
    role: "creator",
    bio: "Independent filmmaker documenting India's disappearing crafts and heritage.",
    tags: ["Filmmaker", "Documentary", "Heritage"],
    supportAmount: 699,
    supportLabel: "Support",
    featuredWork: {
      title: "Threads of Tradition",
      description: "A documentary series following master weavers of Varanasi.",
      type: "update",
    },
    color: "#BE185D",
  },
  {
    id: "c2",
    name: "Arjun Reddy",
    handle: "arjun.builds",
    initials: "AR",
    role: "developer",
    bio: "Game developer creating narratives rooted in Indian mythology.",
    tags: ["Developer", "Games", "Unity"],
    supportAmount: 449,
    supportLabel: "Back this project",
    featuredWork: {
      title: "Mahabharata: The Untold Stories",
      description: "Episodic narrative game exploring lesser-known tales.",
      type: "demo",
    },
    color: "#2563EB",
  },
  {
    id: "c3",
    name: "Nikhil Desai",
    handle: "nikhil.designs",
    initials: "ND",
    role: "developer",
    bio: "Design engineer bridging the gap between pixels and code.",
    tags: ["Developer", "Design Systems", "Framer"],
    supportAmount: 399,
    supportLabel: "Back this project",
    featuredWork: {
      title: "Orbit - Design System Framework",
      description: "Framework for building scalable design systems.",
      type: "project",
    },
    color: "#0891B2",
  },
];

const categories = [
  { name: "Trending", icon: TrendingUp, count: "1.2K creators" },
  { name: "New Creators", icon: Sparkles, count: "500+ this week" },
  { name: "Top Supporters", icon: Users, count: "Most generous" },
  { name: "Quick Rising", icon: Zap, count: "Fastest growing" },
];

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

export default function CreatorExplorePage() {
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
              style={{ background: "linear-gradient(135deg, #2D4A6E 0%, #FF8A80 100%)" }}
            >
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Explore</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                Discover talented creators and developers
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-sm w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D4A6E]/40" />
            <input
              type="text"
              placeholder="Search creators, projects..."
              className="pl-11 pr-4 py-2.5 bg-white border border-[#E0F2F1] rounded-xl text-sm text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none focus:ring-2 focus:ring-[#FF8A80]/30 shadow-sm w-full sm:w-64"
            />
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {categories.map((category) => (
          <motion.div key={category.name} variants={itemVariants} whileHover={{ y: -4 }}>
            <Card 
              className="p-4 bg-white border-none shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
              style={{ borderRadius: "24px" }}
            >
              <div 
                className="p-2 rounded-xl w-fit mb-3"
                style={{ backgroundColor: "#E0F2F1" }}
              >
                <category.icon className="w-5 h-5 text-[#2D4A6E]" />
              </div>
              <h3 className="font-semibold text-[#2D4A6E] text-sm">{category.name}</h3>
              <p className="text-xs text-[#2D4A6E]/60 mt-1">{category.count}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF8A80]" />
            <h2 className="font-semibold text-[#2D4A6E]">Featured Creators</h2>
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs"
            style={{ backgroundColor: "rgba(255, 138, 128, 0.2)", color: "#FF8A80" }}
          >
            Handpicked for you
          </Badge>
        </div>
      </motion.div>

      {/* Creators Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {FEATURED_CREATORS.map((creator, index) => (
          <CreatorSpotlightCard key={creator.id} creator={creator} index={index} />
        ))}
      </motion.div>

      {/* Collaboration CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
                Looking to Collaborate?
              </h3>
              <p className="text-white/70 text-sm max-w-md">
                Connect with fellow creators and developers. Build something amazing together.
              </p>
            </div>
            <Button 
              className="rounded-xl bg-white text-[#2D4A6E] hover:bg-white/90 px-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Find Collaborators
            </Button>
          </div>
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(255,138,128,0.5) 0%, transparent 70%)",
              transform: "translate(30%, -50%)",
            }}
          />
        </Card>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-[#2D4A6E]/60">
          Showing {FEATURED_CREATORS.length} featured creators from our community
        </p>
        <Button 
          variant="ghost" 
          className="mt-2 text-[#FF8A80] hover:bg-[#FF8A80]/10"
        >
          View All Creators
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
