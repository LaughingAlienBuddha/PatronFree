"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { CreatorSpotlightCard, CreatorData } from "@/components/feed/CreatorSpotlightCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Featured creators for explore
const FEATURED_CREATORS: CreatorData[] = [
  {
    id: "e1",
    name: "Ananya Sharma",
    handle: "ananya.codes",
    initials: "AS",
    role: "developer",
    bio: "Full-stack developer building tools for indie creators. Open source enthusiast.",
    tags: ["Developer", "Open Source", "React"],
    supportAmount: 499,
    supportLabel: "Back this project",
    featuredWork: {
      title: "CreatorStack Dashboard",
      description: "An all-in-one dashboard for content creators to manage analytics.",
      type: "project",
    },
    color: "#4F46E5",
  },
  {
    id: "e2",
    name: "Aarav Mehta",
    handle: "aarav.designs",
    initials: "AM",
    role: "creator",
    bio: "UI/UX designer crafting thoughtful digital experiences with Indian aesthetics.",
    tags: ["Designer", "UI/UX", "Motion"],
    supportAmount: 299,
    supportLabel: "Support",
    featuredWork: {
      title: "Sacred Geometry Icon Set",
      description: "200+ icons inspired by Indian mandala art and modern minimalism.",
      type: "artwork",
    },
    color: "#E87959",
  },
  {
    id: "e3",
    name: "Zara Khan",
    handle: "zara.films",
    initials: "ZK",
    role: "creator",
    bio: "Independent filmmaker documenting India's disappearing crafts.",
    tags: ["Filmmaker", "Documentary", "Heritage"],
    supportAmount: 699,
    supportLabel: "Support",
    featuredWork: {
      title: "Threads of Tradition",
      description: "Documentary series following master weavers of Varanasi.",
      type: "update",
    },
    color: "#BE185D",
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

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#7FC7D9] to-[#BAB2EA]">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1035]">Explore</h1>
        </div>
        <p className="text-[#365486]/70 ml-11">
          Discover amazing creators and developers to support
        </p>
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
            <Card className="p-4 bg-gradient-to-br from-white/90 to-white/70 border-white/60 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#7FC7D9]/30">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#7FC7D9]/20 to-[#365486]/20 w-fit mb-3">
                <category.icon className="w-5 h-5 text-[#365486]" />
              </div>
              <h3 className="font-semibold text-[#0F1035] text-sm">{category.name}</h3>
              <p className="text-xs text-[#365486]/60 mt-1">{category.count}</p>
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
            <Sparkles className="w-4 h-4 text-[#7FC7D9]" />
            <h2 className="font-semibold text-[#0F1035]">Featured Creators</h2>
          </div>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700"
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

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <Card className="p-8 bg-gradient-to-br from-[#365486]/10 to-[#7FC7D9]/10 border-[#365486]/20">
          <p className="text-lg font-medium text-[#0F1035] mb-2">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <p className="text-sm text-[#365486]/70 mb-4">
            Browse our full directory of {categories.reduce((acc, c) => acc + parseInt(c.count) || 0, 0).toLocaleString()}+ creators
          </p>
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#365486] to-[#7FC7D9] text-white font-medium hover:opacity-90 transition-opacity">
            View All Creators
          </button>
        </Card>
      </motion.div>
    </div>
  );
}
