"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, Download, CreditCard, IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const earningsData = {
  totalEarnings: 48500,
  thisMonth: 8500,
  lastMonth: 7200,
  growth: 18,
  pendingPayout: 12500,
  nextPayoutDate: "Jan 5, 2025",
};

const transactions = [
  {
    id: "1",
    type: "subscription",
    from: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=priya",
    amount: 499,
    tier: "Gold",
    date: "Dec 28, 2024",
    status: "completed",
  },
  {
    id: "2",
    type: "subscription",
    from: "Rohan Verma",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    amount: 199,
    tier: "Basic",
    date: "Dec 27, 2024",
    status: "completed",
  },
  {
    id: "3",
    type: "donation",
    from: "Kavya Nair",
    avatar: "https://i.pravatar.cc/150?u=kavya",
    amount: 500,
    message: "For the amazing tutorials!",
    date: "Dec 26, 2024",
    status: "completed",
  },
  {
    id: "4",
    type: "subscription",
    from: "Ananya Gupta",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    amount: 999,
    tier: "Platinum",
    date: "Dec 25, 2024",
    status: "completed",
  },
  {
    id: "5",
    type: "donation",
    from: "Ishaan Patel",
    avatar: "https://i.pravatar.cc/150?u=ishaan",
    amount: 250,
    date: "Dec 24, 2024",
    status: "completed",
  },
];

const monthlyData = [
  { month: "Aug", earnings: 6200 },
  { month: "Sep", earnings: 6800 },
  { month: "Oct", earnings: 7100 },
  { month: "Nov", earnings: 7200 },
  { month: "Dec", earnings: 8500 },
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

export default function EarningsPage() {
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
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D4A6E]">Earnings</h1>
              <p className="text-sm text-[#2D4A6E]/60">
                Track your revenue and payouts
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
        {/* Total Earnings */}
        <Card 
          className="p-6 border-none shadow-lg relative overflow-hidden"
          style={{ 
            borderRadius: "24px",
            background: "linear-gradient(135deg, #2D4A6E 0%, #3D5A7E 100%)",
          }}
        >
          <div className="relative z-10">
            <p className="text-white/70 text-sm mb-1">Total Earnings</p>
            <p className="text-4xl font-bold text-white flex items-center">
              <IndianRupee className="w-8 h-8 mr-1" />
              {earningsData.totalEarnings.toLocaleString()}
            </p>
            <p className="text-white/50 text-xs mt-2">Lifetime earnings</p>
          </div>
          <div 
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(255,138,128,0.4) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
        </Card>

        {/* This Month */}
        <Card className="p-6 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#2D4A6E]/60 text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold text-[#2D4A6E] flex items-center">
                <IndianRupee className="w-6 h-6 mr-1" />
                {earningsData.thisMonth.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{earningsData.growth}% from last month</span>
              </div>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(129, 199, 132, 0.2)" }}
            >
              <TrendingUp className="w-6 h-6 text-[#66BB6A]" />
            </div>
          </div>
        </Card>

        {/* Pending Payout */}
        <Card className="p-6 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#2D4A6E]/60 text-sm mb-1">Pending Payout</p>
              <p className="text-3xl font-bold text-[#2D4A6E] flex items-center">
                <IndianRupee className="w-6 h-6 mr-1" />
                {earningsData.pendingPayout.toLocaleString()}
              </p>
              <p className="text-xs text-[#2D4A6E]/50 mt-2">
                Next payout: {earningsData.nextPayoutDate}
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255, 138, 128, 0.2)" }}
            >
              <Calendar className="w-6 h-6 text-[#FF8A80]" />
            </div>
          </div>
          <Button 
            className="w-full mt-4 rounded-xl text-white hover:opacity-90 text-sm"
            style={{ backgroundColor: "#2D4A6E" }}
          >
            Withdraw Now
          </Button>
        </Card>
      </motion.div>

      {/* Monthly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <Card className="p-6 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#2D4A6E]">Monthly Earnings</h3>
            <Badge 
              variant="secondary" 
              className="text-xs"
              style={{ backgroundColor: "rgba(255, 138, 128, 0.2)", color: "#FF8A80" }}
            >
              Last 5 months
            </Badge>
          </div>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-4 h-40">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.earnings / 10000) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="w-full rounded-t-lg relative group cursor-pointer"
                  style={{ 
                    background: "linear-gradient(180deg, #2D4A6E 0%, #FF8A80 100%)",
                    maxHeight: "120px",
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2D4A6E] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{data.earnings.toLocaleString()}
                  </div>
                </motion.div>
                <span className="text-xs text-[#2D4A6E]/60">{data.month}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Transactions List */}
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
                All Transactions
              </TabsTrigger>
              <TabsTrigger 
                value="subscriptions"
                className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
              >
                Subscriptions
              </TabsTrigger>
              <TabsTrigger 
                value="donations"
                className="rounded-lg data-[state=active]:bg-[#2D4A6E] data-[state=active]:text-white"
              >
                Donations
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <TransactionsList transactions={transactions} />
          </TabsContent>
          <TabsContent value="subscriptions" className="mt-0">
            <TransactionsList transactions={transactions.filter(t => t.type === "subscription")} />
          </TabsContent>
          <TabsContent value="donations" className="mt-0">
            <TransactionsList transactions={transactions.filter(t => t.type === "donation")} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Card className="p-5 bg-white border-none shadow-md" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#2D4A6E]" />
              <h3 className="font-semibold text-[#2D4A6E]">Payment Methods</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-[#FF8A80] hover:bg-[#FF8A80]/10">
              + Add New
            </Button>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "#E0F2F1" }}>
            <div className="w-10 h-6 bg-[#2D4A6E] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#2D4A6E]">HDFC Bank</p>
              <p className="text-xs text-[#2D4A6E]/60">•••• 4242</p>
            </div>
            <Badge 
              className="text-xs"
              style={{ backgroundColor: "rgba(129, 199, 132, 0.2)", color: "#66BB6A" }}
            >
              Default
            </Badge>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function TransactionsList({ transactions }: { transactions: typeof transactions }) {
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
                <AvatarImage src={transaction.avatar} />
                <AvatarFallback className="bg-[#2D4A6E] text-white text-sm">
                  {transaction.from[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-[#2D4A6E] text-sm">{transaction.from}</h4>
                  <Badge
                    className="text-[10px] border-none"
                    style={{
                      backgroundColor: transaction.type === "subscription" ? "rgba(79, 195, 247, 0.2)" : "rgba(255, 138, 128, 0.2)",
                      color: transaction.type === "subscription" ? "#29B6F6" : "#FF8A80",
                    }}
                  >
                    {transaction.type === "subscription" ? "Subscription" : "Donation"}
                  </Badge>
                </div>
                {transaction.tier && (
                  <p className="text-xs text-[#2D4A6E]/60">{transaction.tier} Tier</p>
                )}
                {transaction.message && (
                  <p className="text-xs text-[#2D4A6E]/60 italic">"{transaction.message}"</p>
                )}
              </div>

              <div className="text-right">
                <p className="font-semibold text-[#2D4A6E] flex items-center justify-end">
                  <IndianRupee className="w-4 h-4" />
                  {transaction.amount}
                </p>
                <p className="text-xs text-[#2D4A6E]/50">{transaction.date}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
