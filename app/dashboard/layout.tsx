"use client";

import { useState } from "react";
import { FeedSidebar } from "@/components/feed/FeedSidebar";
import { FeedTopBar } from "@/components/feed/FeedTopBar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <FeedSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main content wrapper — shifts right based on sidebar state */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0",
          "transition-[margin] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          sidebarCollapsed ? "ml-[72px]" : "ml-[260px]",
          // On mobile: full width, sidebar becomes overlay
          "max-md:ml-0"
        )}
      >
        <FeedTopBar collapsed={sidebarCollapsed} />

        {/* Page content — padded below the fixed top bar */}
        <main className="flex-1 pt-[64px] px-4 md:px-6 lg:px-8 pb-10 min-h-0 relative overflow-x-hidden">
          {/* Subtle background mesh */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-30"
            style={{
              background:
                "radial-gradient(800px 500px at 80% 0%, rgba(127,199,217,0.12), transparent 60%), radial-gradient(600px 400px at 10% 80%, rgba(54,84,134,0.08), transparent 55%)",
            }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
