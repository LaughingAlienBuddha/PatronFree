"use client";

import { DeveloperSidebar } from "@/components/dashboard/DeveloperSidebar";
import { cn } from "@/lib/utils";

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="flex min-h-screen w-full"
      style={{ backgroundColor: "#E0F2F1" }}
    >
      <DeveloperSidebar />

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
          {/* Subtle background */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: "radial-gradient(800px 500px at 80% 0%, rgba(128, 203, 196, 0.08), transparent 60%), radial-gradient(600px 400px at 10% 80%, rgba(45, 74, 110, 0.06), transparent 55%)",
            }}
          />
          <div className="relative z-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
