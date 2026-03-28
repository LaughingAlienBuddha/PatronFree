"use client";

import { motion } from "framer-motion";
import { Heart, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Download, CreditCard, Github, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const sponsorshipData = {
  monthlyRecurring: 42000,
  oneTimeDonations: 15000,
  totalReceived: 295000,
  growth: 23,
  pendingPayout: 12500,
  goalProgress: 65,
  goalTarget: 50000,
};

const sponsors = [
  {
    id: 1,
    name: "Stripe",
    handle: "stripe",
    avatar: "https://github.com/stripe.png",
    type: "organization",
    tier: "Platinum",
    amount: 1000,
    duration: "12 months",
    since: "Jan 2024",
  },
  {
    id: 2,
    name: "Vercel",
    handle: "vercel",
    avatar: "https://github.com/vercel.png",
    type: "organization",
    tier: "Gold",
    amount: 500,
    duration: "8 months",
    since: "May 2024",
  },
  {
    id: 3,
    name: "Kent C. Dodds",
    handle: "kentcdodds",
    avatar: "https://github.com/kentcdodds.png",
    type: "individual",
    tier: "Gold",
    amount: 250,
    duration: "ongoing",
    since: "Mar 2024",
  },
  {
    id: 4,
    name: "GitHub",
    handle: "github",
    avatar: "https://github.com/github.png",
    type: "organization",
    tier: "Silver",
    amount: 200,
    duration: "6 months",
    since: "Jul 2024",
  },
  {
    id: 5,
    name: "Sarah Chen",
    handle: "sarahchen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    type: "individual",
    tier: "Bronze",
    amount: 50,
    duration: "ongoing",
    since: "Sep 2024",
  },
];

const recentTransactions = [
  {
    id: "1",
    from: "Stripe",
    avatar: "https://github.com/stripe.png",
    amount: 1000,
    type: "recurring",
    date: "Dec 28, 2024",
  },
  {
    id: "2",
    from: "Anonymous",
    avatar: null,
    amount: 500,
    type: "one-time",
    date: "Dec 26, 2024",
  },
  {
    id: "3",
    from: "Vercel",
    avatar: "https://github.com/vercel.png",
    amount: 500,
    type: "recurring",
    date: "Dec 25, 2024",
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

export default function SponsorsPage() {
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
              style={{ background: "linear-gradient(135deg, #2D4A6E 0%, #FF8A80 100%)" }}
            >
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Sponsors</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                Your supporters and funding overview
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-xl border-[#E0F2F1] text-[#2D4A6E] hover:bg-[#E0F2F1]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Main Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        {/* Monthly Recurring */}
        <Card 
          className="p-6 border-none shadow-lg relative overflow-hidden"
          style={{ 
            borderRadius: "24px",
            background: "linear-gradient(135deg, #2D4A6E 0%, #3D5A7E 100%)",
          }}
        >
          <div className="relative z-10">
            <p className="text-white/70 text-sm mb-1">Monthly Recurring</p>
            <p className="text-4xl font-bold text-white flex items-center">
              ₹{sponsorshipData.monthlyRecurring.toLocaleString()}
            </p>
            <p className="text-white/50 text-xs mt-2">MRR</p>
          </div>
          <div 
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(128,203,196,0.4) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
        </Card>

        {/* One-time Donations */}
        <Card className="p-6 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#2D4A6E]/60 text-sm mb-1">One-time (This Month)</p>
              <p className="text-3xl font-bold text-[#2D4A6E]">
                ₹{sponsorshipData.oneTimeDonations.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                <span>+15% from last month</span>
              </div>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(128, 203, 196, 0.2)" }}
            >
              <TrendingUp className="w-6 h-6 text-[#80CBC4]" />
            </div>
          </div>
        </Card>

        {/* Total Received */}
        <Card className="p-6 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#2D4A6E]/60 text-sm mb-1">Total Received</p>
              <p className="text-3xl font-bold text-[#2D4A6E]">
                ₹{(sponsorshipData.totalReceived / 1000).toFixed(1)}k
              </p>
              <p className="text-xs text-[#2D4A6E]/50 mt-2">Since Jan 2024</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255, 138, 128, 0.2)" }}
            >
              <Wallet className="w-6 h-6 text-[#FF8A80]" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#2D4A6E]">Monthly Goal</h3>
              <p className="text-sm text-[#2D4A6E]/60">₹{sponsorshipData.monthlyRecurring.toLocaleString()} of ₹{sponsorshipData.goalTarget.toLocaleString()}</p>
            </div>
            <Badge 
              className="text-xs border-none"
              style={{ backgroundColor: "rgba(128, 203, 196, 0.2)", color: "#2D4A6E" }}
            >
              {sponsorshipData.goalProgress}%
            </Badge>
          </div>
          <Progress 
            value={sponsorshipData.goalProgress} 
            className="h-2"
            style={{ backgroundColor: "#E0F2F1" }}
          />
          <p className="text-xs text-[#2D4A6E]/50 mt-3">
            Only ₹{(sponsorshipData.goalTarget - sponsorshipData.monthlyRecurring).toLocaleString()} more to reach your monthly goal!
          </p>
        </Card>
      </motion.div>

      {/* Sponsors List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="active" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white p-1 rounded-xl" style={{ borderRadius: "12px" }}>
              <TabsTrigger 
                value="active" 
                className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
              >
                Active Sponsors
              </TabsTrigger>
              <TabsTrigger 
                value="transactions"
                className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
              >
                Recent Transactions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="mt-0">
            <SponsorsList sponsors={sponsors} />
          </TabsContent>
          <TabsContent value="transactions" className="mt-0">
            <TransactionsList transactions={recentTransactions} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function SponsorsList({ sponsors }: { sponsors: typeof sponsors }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {sponsors.map((sponsor) => (
        <motion.div
          key={sponsor.id}
          variants={itemVariants}
          whileHover={{ scale: 1.005 }}
        >
          <Card 
            className="p-4 bg-white border-none shadow-sm hover:shadow-md transition-shadow"
            style={{ borderRadius: "16px" }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                {sponsor.avatar ? (
                  <AvatarImage src={sponsor.avatar} />
                ) : (
                  <AvatarFallback className="bg-[#2D4A6E] text-white">
                    <Github className="w-6 h-6" />
                  </AvatarFallback>
                )}
                <AvatarFallback className="bg-[#2D4A6E] text-white">
                  {sponsor.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-[#2D4A6E]">{sponsor.name}</h4>
                  <Badge
                    className="text-xs border-none"
                    style={{
                      backgroundColor: 
                        sponsor.tier === "Platinum" ? "#80CBC4" :
                        sponsor.tier === "Gold" ? "#FFD54F" :
                        sponsor.tier === "Silver" ? "#E0E0E0" :
                        "#D4A574",
                      color: sponsor.tier === "Silver" ? "#333" : "white",
                    }}
                  >
                    {sponsor.tier}
                  </Badge>
                </div>
                <p className="text-sm text-[#2D4A6E]/60">@{sponsor.handle}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-[#2D4A6E]">₹{sponsor.amount}/mo</p>
                <p className="text-xs text-[#2D4A6E]/50">Since {sponsor.since}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function TransactionsList({ transactions }: { transactions: typeof recentTransactions }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {transactions.map((transaction) => (
        <motion.div
          key={transaction.id}
          variants={itemVariants}
          whileHover={{ scale: 1.005 }}
        >
          <Card 
            className="p-4 bg-white border-none shadow-sm hover:shadow-md transition-shadow"
            style={{ borderRadius: "16px" }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                {transaction.avatar ? (
                  <AvatarImage src={transaction.avatar} />
                ) : (
                  <AvatarFallback className="bg-[#E0F2F1] text-[#2D4A6E]">
                    <Users className="w-4 h-4" />
                  </AvatarFallback>
                )}
                <AvatarFallback className="bg-[#2D4A6E] text-white text-sm">
                  {transaction.from[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#2D4A6E] text-sm">{transaction.from}</h4>
                <Badge
                  variant="secondary"
                  className="text-[10px] border-none"
                  style={{
                    backgroundColor: transaction.type === "recurring" ? "rgba(128, 203, 196, 0.2)" : "rgba(255, 138, 128, 0.2)",
                    color: transaction.type === "recurring" ? "#2D4A6E" : "#FF8A80",
                  }}
                >
                  {transaction.type === "recurring" ? "Recurring" : "One-time"}
                </Badge>
              </div>

              <div className="text-right">
                <p className="font-semibold text-[#2D4A6E]">₹{transaction.amount}</p>
                <p className="text-xs text-[#2D4A6E]/50">{transaction.date}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
