// hooks/use-user-profile.ts
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { apiCall } from "@/lib/api-client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePic: string | null;
  username?: string;
  bio?: string;
  provider?: string;
  role?: string;
}

export function useUserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // INSTANT: Set user from Firebase Auth immediately (no waiting)
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        profilePic: firebaseUser.photoURL,
      });
      setLoading(false);

      // BACKGROUND: Fetch additional data in parallel (Firestore + Backend)
      try {
        const [firestoreResult, backendResult] = await Promise.allSettled([
          // Firestore role fetch
          (async () => {
            try {
              const userRef = doc(db, "users", firebaseUser.uid);
              const userDoc = await getDoc(userRef);
              return userDoc.exists() ? userDoc.data() : null;
            } catch {
              return null;
            }
          })(),
          // Backend profile fetch with 1.5s timeout
          (async () => {
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 1500);
              const response = await apiCall<UserProfile>("/profile", { signal: controller.signal });
              clearTimeout(timeoutId);
              return response.success ? response.data : null;
            } catch {
              return null;
            }
          })(),
        ]);

        // Merge results with Firebase Auth data
        const firestoreData = firestoreResult.status === "fulfilled" ? firestoreResult.value : null;
        const backendData = backendResult.status === "fulfilled" ? backendResult.value : null;

        // Only update if we got additional data
        if (firestoreData || backendData) {
          setUser((current) => ({
            ...current!,
            name: backendData?.name || current?.name || firebaseUser.displayName || "User",
            email: backendData?.email || current?.email || firebaseUser.email || "",
            profilePic: backendData?.profilePic || current?.profilePic || firebaseUser.photoURL,
            username: backendData?.username,
            bio: backendData?.bio,
            provider: backendData?.provider,
            role: firestoreData?.role || backendData?.role || current?.role,
          }));
        }
      } catch (err) {
        // Silent fail - we already have Firebase Auth data showing
        console.warn("Background profile fetch failed, using Firebase data");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}
