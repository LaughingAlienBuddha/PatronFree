"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline";
  className?: string;
  showIcon?: boolean;
  label?: string;
  isSidebar?: boolean;
}

export function LogoutButton({
  variant = "ghost",
  className,
  showIcon = true,
  label = "Logout",
  isSidebar = false,
}: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await signOut(auth);
      router.replace("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
    }
  };

  if (isSidebar) {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
          "text-rose-500/80 hover:bg-rose-50 hover:text-rose-600",
          "w-full",
          className
        )}
      >
        {showIcon && (
          <div className="p-1.5 rounded-lg bg-rose-100/50 group-hover:bg-rose-100 transition-colors">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
          </div>
        )}
        <span className="flex-1 text-left">
          {isLoading ? "Logging out..." : label}
        </span>
      </button>
    );
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant={variant}
      className={className}
    >
      {showIcon && (
        isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4 mr-2" />
        )
      )}
      {isLoading ? "Logging out..." : label}
    </Button>
  );
}
