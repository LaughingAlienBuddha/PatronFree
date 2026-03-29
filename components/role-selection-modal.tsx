"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Sparkles, Code2, Heart, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserRole = "creator" | "developer" | "supporter";

interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: string[];
}

const ROLES: RoleOption[] = [
  {
    id: "creator",
    label: "Creator",
    description: "Share your work and get supported by your audience",
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-600",
    features: ["Create posts", "Receive donations", "Build community"],
  },
  {
    id: "developer",
    label: "Developer",
    description: "Build open-source projects and get backing",
    icon: Code2,
    gradient: "from-blue-500 to-indigo-600",
    features: ["Share projects", "Get sponsors", "Collaborate"],
  },
  {
    id: "supporter",
    label: "Supporter",
    description: "Back creators and projects you believe in",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    features: ["Follow creators", "Make donations", "Save favorites"],
  },
];

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleSelectionModal({
  isOpen,
  onClose,
}: RoleSelectionModalProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selectedRole || isLoading) return;

    const user = auth.currentUser;
    if (!user) {
      setError("Please sign in first");
      return;
    }

    // INSTANT: Save to localStorage and redirect immediately
    localStorage.setItem('userRole', selectedRole);
    
    const redirectPath =
      selectedRole === "creator"
        ? "/creator"
        : selectedRole === "developer"
        ? "/developer"
        : "/dashboard";

    router.replace(redirectPath);

    // BACKGROUND: Save to Firestore (fire and forget)
    const userRef = doc(db, "users", user.uid);
    setDoc(
      userRef,
      {
        role: selectedRole,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    ).catch(err => console.warn("Background save failed:", err));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="text-3xl font-bold mb-2">Welcome to Patronex!</h2>
                <p className="text-slate-300 text-lg">
                  How would you like to use our platform?
                </p>
              </div>
            </div>

            {/* Role Options */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;

                  return (
                    <motion.button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative rounded-2xl p-6 text-left transition-all duration-300 border-2",
                        isSelected
                          ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                      )}
                    >
                      {/* Selection indicator - animated without layoutId to avoid background disturbance */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isSelected ? 1 : 0,
                          opacity: isSelected ? 1 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-10"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>

                      {/* Selection border glow effect */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isSelected ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-2xl bg-blue-400/10 pointer-events-none"
                      />

                      {/* Icon */}
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                          role.gradient
                        )}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                        {role.label}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        {role.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-1">
                        {role.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.button>
                  );
                })}
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center mt-4"
                >
                  {error}
                </motion.p>
              )}

              {/* Continue Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedRole || isLoading}
                  size="lg"
                  className={cn(
                    "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8",
                    !selectedRole && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Hook to check if user has a role - optimized with timeout
export async function getUserRole(userId: string): Promise<UserRole | null> {
  // First check localStorage for fast client-side lookup
  const cachedRole = localStorage.getItem('userRole') as UserRole | null;
  if (cachedRole) {
    return cachedRole;
  }

  try {
    const userRef = doc(db, "users", userId);

    // Add a 5-second timeout to prevent hanging - returns null on timeout instead of throwing
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => {
        console.warn("Role check timed out, assuming no role");
        resolve(null);
      }, 5000);
    });

    const docPromise = getDoc(userRef).then(doc => doc).catch(err => {
      console.warn("Firestore error checking role:", err);
      return null;
    });

    // Race between Firestore and timeout - both resolve to null on failure
    const userDoc = await Promise.race([docPromise, timeoutPromise]);

    if (userDoc && userDoc.exists && userDoc.exists()) {
      const data = userDoc.data();
      const role = (data?.role as UserRole) || null;
      // Cache the role in localStorage for faster future lookups
      if (role) {
        localStorage.setItem('userRole', role);
      }
      return role;
    }

    return null;
  } catch (error) {
    console.warn("Error getting user role:", error);
    return null;
  }
}
