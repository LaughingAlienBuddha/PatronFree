"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Completes signInWithRedirect (Google/GitHub). Must run once on app load;
 * the redirect result can only be consumed once.
 */
export function AuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          router.replace("/dashboard");
        }
      })
      .catch(() => {
        // Ignore missing/expired redirect; normal page loads have no pending redirect
      });
  }, [router]);

  return null;
}
