"use client";

import { SupporterSidebar } from "@/components/dashboard/SupporterSidebar";
import { cn } from "@/lib/utils";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <SupporterSidebar />

      {/* Main content wrapper */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0",
          "ml-[280px]",
          // On mobile: full width
          "max-md:ml-0"
        )}
      >
        {/* Page content */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 min-h-0 relative overflow-x-hidden">
          {/* Subtle background mesh */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-30"
            style={{
              background:
                "radial-gradient(800px 500px at 80% 0%, rgba(127,199,217,0.12), transparent 60%), radial-gradient(600px 400px at 10% 80%, rgba(54,54,134,0.08), transparent 55%)",
            }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      </div>
    </AuthGuard>
  );
}
