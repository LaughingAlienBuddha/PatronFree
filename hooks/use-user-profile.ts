// hooks/use-user-profile.ts
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
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
      try {
        setLoading(true);
        setError(null);

        if (!firebaseUser) {
          setUser(null);
          return;
        }

        // Fetch full user profile from backend
        const response = await apiCall<UserProfile>("/profile");
        
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // Fallback to Firebase user data if backend doesn't have profile yet
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
            profilePic: firebaseUser.photoURL,
          });
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        // Fallback to Firebase data
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
            profilePic: firebaseUser.photoURL,
          });
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}
