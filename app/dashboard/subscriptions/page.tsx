"use client";

import { motion } from "framer-motion";
import { Heart, Crown, ArrowRight, Calendar, CreditCard, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const subscriptions = [
  {
    id: "1",
    name: "Sarah Chen",
    handle: "sarah.designs",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    tier: "Gold Member",
    amount: 499,
    billing: "monthly",
    joined: "Jan 2024",
    nextBilling: "Dec 28, 2024",
  },
  {
    id: "2",
    name: "TechStudio",
    handle: "techstudio.dev",
    avatar: "https://i.pravatar.cc/150?u=techstudio",
    tier: "Supporter",
    amount: 199,
    billing: "monthly",
    joined: "Mar 2024",
    nextBilling: "Dec 15, 2024",
  },
  {
    id: "3",
    name: "Alex Rivera",
    handle: "alex.codes",
    avatar: "https://i.pravatar.cc/150?u=alex",
    tier: "Platinum",
    amount: 999,
    billing: "monthly",
    joined: "Feb 2024",
    nextBilling: "Jan 3, 2025",
  },
  {
    id: "4",
    name: "Design Weekly",
    handle: "designweekly",
    avatar: "https://i.pravatar.cc/150?u=designweekly",
    tier: "Basic",
    amount: 99,
    billing: "monthly",
    joined: "Jun 2024",
    nextBilling: "Dec 30, 2024",
  },
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

export default function SubscriptionsPage() {
  const totalMonthly = subscriptions.reduce((acc, sub) => acc + sub.amount, 0);

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
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-400 to-rose-500">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1035]">Subscriptions</h1>
        </div>
        <p className="text-[#365486]/70 ml-11">
          Manage your paid support to creators and developers
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <Card className="p-5 bg-gradient-to-br from-white/80 to-white/60 border-white/60 backdrop-blur-sm">
          <p className="text-sm text-[#365486]/70 mb-1">Active Subscriptions</p>
          <p className="text-3xl font-bold text-[#365486]">{subscriptions.length}</p>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-white/80 to-white/60 border-white/60 backdrop-blur-sm">
          <p className="text-sm text-[#365486]/70 mb-1">Monthly Spending</p>
          <p className="text-3xl font-bold text-[#365486]">₹{totalMonthly}</p>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-white/80 to-white/60 border-white/60 backdrop-blur-sm">
          <p className="text-sm text-[#365486]/70 mb-1">Total Contributed</p>
          <p className="text-3xl font-bold text-[#365486]">₹8,450</p>
          <p className="text-xs text-[#7FC7D9] mt-1">Since Jan 2024</p>
        </Card>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6"
      >
        <Button
          variant="secondary"
          className="rounded-full bg-white/80 text-[#365486] hover:bg-white border border-white/60"
        >
          Active
        </Button>
        <Button
          variant="ghost"
          className="rounded-full text-[#365486]/70 hover:text-[#365486] hover:bg-white/50"
        >
          Expired
        </Button>
        <Button
          variant="ghost"
          className="rounded-full text-[#365486]/70 hover:text-[#365486] hover:bg-white/50"
        >
          Cancelled
        </Button>
      </motion.div>

      {/* Subscriptions Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {subscriptions.map((sub) => (
          <motion.div
            key={sub.id}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group"
          >
            <Card className="p-5 bg-gradient-to-br from-white/90 to-white/70 border-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#7FC7D9]/10 hover:border-[#7FC7D9]/30">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                    <AvatarImage src={sub.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white">
                      {sub.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-gradient-to-br from-amber-400 to-amber-500">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#0F1035]">{sub.name}</h3>
                      <p className="text-sm text-[#365486]/70">@{sub.handle}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4 text-[#365486]" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border-amber-200/50"
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      {sub.tier}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/60">
                    <div className="flex items-center gap-2 text-sm text-[#365486]/80">
                      <CreditCard className="w-4 h-4" />
                      <span className="font-semibold text-[#365486]">₹{sub.amount}</span>
                      <span>/ {sub.billing}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#365486]/60">
                      <Calendar className="w-4 h-4" />
                      <span>Renews {sub.nextBilling}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-lg border-[#365486]/20 text-[#365486] hover:bg-[#365486]/5"
                >
                  Manage
                </Button>
                <Button
                  size="sm"
                  className="flex-1 rounded-lg bg-gradient-to-r from-[#365486] to-[#7FC7D9] hover:opacity-90 text-white"
                >
                  View Profile
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State for Expired (hidden by default) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/60 to-white/40 border border-white/60 text-center"
      >
        <p className="text-sm text-[#365486]/70">
          You can cancel subscriptions anytime. Your support history will always be preserved.
        </p>
      </motion.div>
    </div>
  );
}
