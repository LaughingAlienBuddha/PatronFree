"use client";

import { motion } from "framer-motion";
import { Users, Heart, Plus, Sparkles, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const following = [
  {
    id: "1",
    name: "Rohan Verma",
    handle: "rohan.illustrates",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    role: "creator",
    bio: "Digital illustrator telling stories through vibrant colors",
    followers: "12.5K",
  },
  {
    id: "2",
    name: "Kavya Nair",
    handle: "kavya.builds",
    avatar: "https://i.pravatar.cc/150?u=kavya",
    role: "developer",
    bio: "AI/ML engineer creating accessible tools for rural education",
    followers: "8.2K",
  },
  {
    id: "3",
    name: "Dhruv Menon",
    handle: "dhruv.creates",
    avatar: "https://i.pravatar.cc/150?u=dhruv",
    role: "creator",
    bio: "Motion designer blending traditional Indian art with modern graphics",
    followers: "24.1K",
  },
  {
    id: "4",
    name: "Ishaan Patel",
    handle: "ishaan.dev",
    avatar: "https://i.pravatar.cc/150?u=ishaan",
    role: "developer",
    bio: "Building developer tools that spark joy",
    followers: "15.8K",
  },
];

const suggestions = [
  {
    id: "5",
    name: "Priya Krishnan",
    handle: "priya.artistry",
    avatar: "https://i.pravatar.cc/150?u=priya",
    role: "creator",
    bio: "Traditional Madhubani artist exploring digital mediums",
    followers: "6.3K",
  },
  {
    id: "6",
    name: "Arjun Reddy",
    handle: "arjun.builds",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    role: "developer",
    bio: "Game developer creating narratives rooted in Indian mythology",
    followers: "9.7K",
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

export default function FollowingPage() {
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
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#7FC7D9] to-[#365486]">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F1035]">Following</h1>
              <p className="text-sm text-[#365486]/70">
                {following.length} creators you follow (non-paid)
              </p>
            </div>
          </div>
          <Button className="rounded-full bg-gradient-to-r from-[#365486] to-[#7FC7D9] hover:opacity-90 text-white">
            <Plus className="w-4 h-4 mr-1" />
            Follow more
          </Button>
        </div>
      </motion.div>

      {/* Following Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        {following.map((person) => (
          <motion.div
            key={person.id}
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            <Card className="p-5 bg-gradient-to-br from-white/90 to-white/70 border-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-[#7FC7D9]/30">
              <div className="flex items-start gap-4">
                <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white">
                    {person.name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F1035]">{person.name}</h3>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        person.role === "creator"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {person.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#365486]/70">@{person.handle}</p>
                  <p className="text-sm text-[#365486]/80 mt-2 line-clamp-2">{person.bio}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-[#365486]/60">
                      <span className="font-semibold text-[#365486]">{person.followers}</span> followers
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full rounded-lg border-[#365486]/20 text-[#365486] hover:bg-[#365486]/5"
                  >
                    Following
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Suggestions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#7FC7D9]" />
          <h2 className="font-semibold text-[#0F1035]">You might like...</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-4 bg-gradient-to-br from-[#7FC7D9]/10 to-[#BAB2EA]/10 border-[#7FC7D9]/20">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-white">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white text-sm">
                      {person.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#0F1035] text-sm">{person.name}</h4>
                    <p className="text-xs text-[#365486]/70 truncate">{person.bio}</p>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-[#365486] to-[#7FC7D9] hover:opacity-90 text-white text-xs h-8"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Follow
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50"
      >
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">Following vs Subscribing</p>
            <p className="text-xs text-amber-700/80 mt-1">
              Following lets you see public updates. Subscribing unlocks exclusive content and directly supports creators financially.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
