"use client";

import { motion } from "framer-motion";
import { Gift, ArrowUpRight, Calendar, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const donations = [
  {
    id: "1",
    name: "Sarah Chen",
    handle: "sarah.designs",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    amount: 500,
    date: "Dec 15, 2024",
    message: "Keep creating amazing content!",
  },
  {
    id: "2",
    name: "TechStudio",
    handle: "techstudio.dev",
    avatar: "https://i.pravatar.cc/150?u=techstudio",
    amount: 1000,
    date: "Nov 28, 2024",
    message: "For the open source tools",
  },
  {
    id: "3",
    name: "Alex Rivera",
    handle: "alex.codes",
    avatar: "https://i.pravatar.cc/150?u=alex",
    amount: 250,
    date: "Nov 10, 2024",
    message: "Thanks for the tutorial series",
  },
  {
    id: "4",
    name: "Design Weekly",
    handle: "designweekly",
    avatar: "https://i.pravatar.cc/150?u=designweekly",
    amount: 300,
    date: "Oct 22, 2024",
  },
  {
    id: "5",
    name: "Community Fund",
    handle: "community",
    avatar: "https://i.pravatar.cc/150?u=community",
    amount: 150,
    date: "Oct 5, 2024",
    message: "Supporting indie creators",
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
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function DonationsPage() {
  const totalDonated = donations.reduce((acc, d) => acc + d.amount, 0);

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
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#BAB2EA] to-[#365486]">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1035]">Donations</h1>
        </div>
        <p className="text-[#365486]/70 ml-11">Your one-time contributions to creators</p>
      </motion.div>

      {/* Total Contributed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8"
      >
        <Card className="p-8 bg-gradient-to-br from-[#365486] to-[#7FC7D9] border-none text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <p className="text-white/80 text-sm mb-1">Total Contributed</p>
            <p className="text-5xl font-bold">₹{totalDonated.toLocaleString()}</p>
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {donations.length} donations
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Since Oct 2024
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#7FC7D9] via-[#365486] to-[#BAB2EA] opacity-30" />

        <div className="space-y-4">
          {donations.map((donation, index) => (
            <motion.div
              key={donation.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="relative pl-14"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-5 w-4 h-4 rounded-full bg-gradient-to-br from-[#7FC7D9] to-[#365486] border-2 border-white shadow-md" />

              <Card className="p-5 bg-gradient-to-br from-white/90 to-white/70 border-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-[#7FC7D9]/30">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                    <AvatarImage src={donation.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#7FC7D9] to-[#365486] text-white">
                      {donation.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#0F1035]">{donation.name}</h3>
                        <p className="text-sm text-[#365486]/70">@{donation.handle}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#365486]">₹{donation.amount}</p>
                        <div className="flex items-center gap-1 text-xs text-[#365486]/60">
                          <Calendar className="w-3 h-3" />
                          {donation.date}
                        </div>
                      </div>
                    </div>

                    {donation.message && (
                      <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-[#7FC7D9]/10 to-[#BAB2EA]/10 border border-[#7FC7D9]/20">
                        <p className="text-sm text-[#365486]/80 italic">"{donation.message}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Empty State */}
      {donations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7FC7D9]/20 to-[#365486]/20 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-[#365486]/50" />
          </div>
          <h3 className="text-lg font-medium text-[#0F1035] mb-1">No donations yet</h3>
          <p className="text-sm text-[#365486]/70">
            When you make one-time contributions, they&apos;ll appear here.
          </p>
        </motion.div>
      )}

      {/* Impact Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/50 border border-rose-200/50 text-center"
      >
        <Heart className="w-6 h-6 text-rose-500 mx-auto mb-3" />
        <p className="text-rose-800 font-medium">Your donations make a real difference</p>
        <p className="text-sm text-rose-700/70 mt-1">
          Every contribution helps creators continue doing what they love.
        </p>
      </motion.div>
    </div>
  );
}
