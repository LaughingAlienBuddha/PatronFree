"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function AuthRedirectHandler() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const isAuthPage = pathname.includes("/signin") || pathname.includes("/signup");
  
  // Only show the checking spinner if we land on an auth page
  const [checking, setChecking] = useState(isAuthPage);

  useEffect(() => {
    // Only run on auth pages
    if (!isAuthPage) {
      setChecking(false);
      return;
    }

    setChecking(true);
    let unsub: (() => void) | null = null;
    let cancelled = false;

    const checkAuthStatus = async () => {
      // Wait for Firebase auth to be ready
      await auth.authStateReady();
      if (cancelled) return;

      // Check if already logged in
      if (auth.currentUser) {
        console.log("[Auth] Already logged in, redirecting to dashboard");
        router.replace("/dashboard");
        return;
      }

      // Listen for auth changes on login pages
      unsub = onAuthStateChanged(auth, (user) => {
        if (cancelled) return;
        
        if (user) {
          console.log("[Auth] User signed in, redirecting to dashboard");
          router.replace("/dashboard");
        }
      });

      setChecking(false);
    };

    checkAuthStatus();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [isAuthPage, router]);

  // Show spinner while checking auth status (only on /signin or /signup)
  if (checking && isAuthPage) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060916]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-3 border-blue-500/30 border-t-blue-500 animate-spin" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
