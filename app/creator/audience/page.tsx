"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, UserPlus, MessageCircle, Heart, Crown, Star, ArrowUpRight, Filter, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const followers = [
  {
    id: "1",
    name: "Priya Sharma",
    handle: "priya.s",
    avatar: "https://i.pravatar.cc/150?u=priya",
    joined: "2 days ago",
    isSupporter: false,
  },
  {
    id: "2",
    name: "Rohan Verma",
    handle: "rohan.v",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    joined: "5 days ago",
    isSupporter: true,
    tier: "Gold",
  },
  {
    id: "3",
    name: "Kavya Nair",
    handle: "kavya.n",
    avatar: "https://i.pravatar.cc/150?u=kavya",
    joined: "1 week ago",
    isSupporter: true,
    tier: "Basic",
  },
  {
    id: "4",
    name: "Ishaan Patel",
    handle: "ishaan.p",
    avatar: "https://i.pravatar.cc/150?u=ishaan",
    joined: "2 weeks ago",
    isSupporter: false,
  },
  {
    id: "5",
    name: "Ananya Gupta",
    handle: "ananya.g",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    joined: "3 weeks ago",
    isSupporter: true,
    tier: "Platinum",
  },
];

const supporterTiers = [
  { name: "Basic", count: 12, color: "#81C784" },
  { name: "Gold", count: 15, color: "#FFD54F" },
  { name: "Platinum", count: 5, color: "#FF8A80" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function AudiencePage() {
  const totalFollowers = 1240;
  const totalSupporters = 32;
  const conversionRate = ((totalSupporters / totalFollowers) * 100).toFixed(1);

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
          <div 
            className="p-2 rounded-xl"
            style={{ background: "linear-gradient(135deg, #2D4A6E 0%, #FF8A80 100%)" }}
          >
            <Users className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#2D4A6E]">Audience</h1>
        </div>
        <p className="text-sm text-[#2D4A6E]/60 ml-11">
          Manage your followers and supporters
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2D4A6E]/60 mb-1">Total Followers</p>
              <p className="text-3xl font-bold text-[#2D4A6E]">{totalFollowers.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+12% this month</span>
              </div>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(79, 195, 247, 0.2)" }}
            >
              <Users className="w-6 h-6 text-[#29B6F6]" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2D4A6E]/60 mb-1">Paid Supporters</p>
              <p className="text-3xl font-bold text-[#2D4A6E]">{totalSupporters}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+3 this week</span>
              </div>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255, 138, 128, 0.2)" }}
            >
              <Heart className="w-6 h-6 text-[#FF8A80]" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2D4A6E]/60 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-[#2D4A6E]">{conversionRate}%</p>
              <p className="text-xs text-[#2D4A6E]/50 mt-1">
                Above average (2.1%)
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(129, 199, 132, 0.2)" }}
            >
              <ArrowUpRight className="w-6 h-6 text-[#66BB6A]" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Supporter Tiers Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <h3 className="font-semibold text-[#2D4A6E] mb-4">Supporter Tiers</h3>
          <div className="space-y-4">
            {supporterTiers.map((tier) => (
              <div key={tier.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4" style={{ color: tier.color }} />
                    <span className="text-sm font-medium text-[#2D4A6E]">{tier.name}</span>
                  </div>
                  <span className="text-sm text-[#2D4A6E]/70">{tier.count} supporters</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E0F2F1" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(tier.count / totalSupporters) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Audience List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white p-1 rounded-xl" style={{ borderRadius: "12px" }}>
              <TabsTrigger 
                value="all" 
                className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
              >
                All ({followers.length})
              </TabsTrigger>
              <TabsTrigger 
                value="supporters"
                className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
              >
                Supporters ({followers.filter(f => f.isSupporter).length})
              </TabsTrigger>
              <TabsTrigger 
                value="followers"
                className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
              >
                Followers Only ({followers.filter(f => !f.isSupporter).length})
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D4A6E]/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 bg-white border border-[#E0F2F1] rounded-xl text-sm text-[#2D4A6E] placeholder:text-[#2D4A6E]/40 focus:outline-none focus:ring-2 focus:ring-[#FF8A80]/30"
                />
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white text-[#2D4A6E]">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <AudienceList members={followers} />
          </TabsContent>
          <TabsContent value="supporters" className="mt-0">
            <AudienceList members={followers.filter(f => f.isSupporter)} />
          </TabsContent>
          <TabsContent value="followers" className="mt-0">
            <AudienceList members={followers.filter(f => !f.isSupporter)} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function AudienceList({ members }: { members: typeof followers }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {members.map((member) => (
        <motion.div
          key={member.id}
          variants={itemVariants}
          whileHover={{ scale: 1.005 }}
        >
          <Card 
            className="p-4 bg-white border-none shadow-sm hover:shadow-md transition-shadow"
            style={{ borderRadius: "16px" }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-[#2D4A6E] text-white">
                  {member.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-[#2D4A6E]">{member.name}</h4>
                  {member.isSupporter && (
                    <Badge
                      className="text-xs border-none"
                      style={{ 
                        backgroundColor: member.tier === "Platinum" ? "#FF8A80" : member.tier === "Gold" ? "#FFD54F" : "#81C784",
                        color: "white",
                        borderRadius: "8px"
                      }}
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      {member.tier}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-[#2D4A6E]/60">@{member.handle}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#2D4A6E]/50">Joined {member.joined}</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg hover:bg-[#E0F2F1] text-[#2D4A6E]"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
