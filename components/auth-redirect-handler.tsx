"use client";

import { useEffect } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { redirectToDashboard } from "@/lib/auth-navigation";

function isAuthPagePath(): boolean {
  if (typeof window === "undefined") return false;
  const p = window.location.pathname.replace(/\/$/, "") || "/";
  return p.endsWith("/signin") || p.endsWith("/signup");
}

/**
 * Completes signInWithRedirect (Google/GitHub), then subscribes for email/OAuth edge cases.
 */
export function AuthRedirectHandler() {
  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;

    (async () => {
      await auth.authStateReady();
      if (cancelled) return;

      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          redirectToDashboard();
          return;
        }
      } catch {
        // No pending redirect
      }

      if (cancelled) return;
      if (auth.currentUser && isAuthPagePath()) {
        redirectToDashboard();
        return;
      }

      unsub = onAuthStateChanged(auth, (user) => {
        if (cancelled || !user) return;
        if (isAuthPagePath()) {
          redirectToDashboard();
        }
      });
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  return null;
}
