"use client";

import { useTheme } from "next-themes";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Coffee, GitBranch, MessageSquare, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const earningData = [
  { name: "Jan", total: 42000 },
  { name: "Feb", total: 54000 },
  { name: "Mar", total: 49000 },
  { name: "Apr", total: 72000 },
  { name: "May", total: 85000 },
  { name: "Jun", total: 104000 },
  { name: "Jul", total: 124500 },
];

const activities = [
  {
    id: 1,
    user: "Alex Rivera",
    action: "sponsored your project",
    project: "next-saas-starter",
    amount: "₹ 1,500",
    time: "2 hours ago",
    icon: Coffee,
    bgColor: "bg-amber-500/10",
    color: "text-amber-500",
  },
  {
    id: 2,
    user: "Sarah Chen",
    action: "starred repository",
    project: "react-animations",
    time: "5 hours ago",
    icon: Star,
    bgColor: "bg-amber-400/10",
    color: "text-amber-400",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "opened a pull request in",
    project: "ui-components",
    time: "Yesterday",
    icon: GitBranch,
    bgColor: "bg-blue-500/10",
    color: "text-blue-500",
  },
  {
    id: 4,
    user: "Elena Smith",
    action: "left a comment on",
    project: "next-saas-starter",
    time: "Yesterday",
    icon: MessageSquare,
    bgColor: "bg-purple-500/10",
    color: "text-purple-500",
  },
];

export function ActivityAndEarnings() {
  const { theme } = useTheme();
  
  // Adjusted colors for light/dark
  const strokeColor = "#7FC7D9"; 
  const fillColor = "url(#colorRevenue)";

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-both" style={{ animationDelay: "800ms" }}>
      
      {/* Chart Section */}
      <div className="md:col-span-3 rounded-2xl border border-border/50 bg-card p-6 shadow-sm group hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg text-foreground tracking-tight">Earnings Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">Monthly revenue from sponsors</p>
          </div>
          <select className="bg-muted/50 border-none outline-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 text-foreground">
            <option>Last 7 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="h-[280px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1f2937' : '#e5e7eb'} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8bb3c4', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8bb3c4', fontSize: 12 }}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderRadius: '12px', 
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0 10px 30px -15px rgba(0,0,0,0.2)'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`₹ ${value.toLocaleString()}`, 'Revenue']}
                labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke={strokeColor} 
                strokeWidth={3}
                fillOpacity={1} 
                fill={fillColor} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Section */}
      <div className="md:col-span-2 rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-border/80">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg text-foreground tracking-tight">Recent Activity</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:bg-primary/15 transition-colors rounded-full px-3">View All <ArrowRight size={12} className="ml-1" /></Button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto pr-2 scrollbar-none">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="group flex gap-4 transition-all duration-300 hover:bg-muted/40 hover:shadow-sm hover:scale-[1.01] hover:-translate-y-0.5 p-3 -mx-3 rounded-xl cursor-pointer"
            >
              <div className="relative mt-1">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-full z-10 relative transition-transform duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md", activity.bgColor, activity.color)}>
                  <activity.icon size={16} className="transition-transform duration-300 group-hover:-rotate-6" />
                </div>
                {index !== activities.length - 1 && (
                  <div className="absolute top-9 bottom-[-24px] left-1/2 -ml-px w-[2px] bg-border/40 group-hover:bg-primary/20 transition-colors duration-300" />
                )}
              </div>
              
              <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                <p className="text-sm text-foreground/90">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors underline decoration-transparent group-hover:decoration-primary/40 underline-offset-4">{activity.project}</span>
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-muted-foreground/80 font-medium transition-colors group-hover:text-muted-foreground">{activity.time}</span>
                  {activity.amount && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-emerald-500/40 transition-colors"></span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full group-hover:bg-emerald-500/20 transition-colors border border-emerald-500/10 group-hover:border-emerald-500/30 shadow-sm">{activity.amount}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
