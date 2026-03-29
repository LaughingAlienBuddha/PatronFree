"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Sparkles, Code2, Heart, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "./role-selection-modal";

interface ChangeRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole | null;
  onRoleChanged: (role: UserRole) => void;
}

const ROLES = [
  {
    id: "creator" as UserRole,
    label: "Creator",
    description: "Share your work and get supported",
    icon: Sparkles,
    color: "amber",
  },
  {
    id: "developer" as UserRole,
    label: "Developer",
    description: "Build projects and get backing",
    icon: Code2,
    color: "blue",
  },
  {
    id: "supporter" as UserRole,
    label: "Supporter",
    description: "Back creators you believe in",
    icon: Heart,
    color: "rose",
  },
];

export function ChangeRoleModal({
  isOpen,
  onClose,
  currentRole,
  onRoleChanged,
}: ChangeRoleModalProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!selectedRole || isLoading) return;

    const user = auth.currentUser;
    if (!user) {
      setError("Please sign in first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // INSTANT: Save to localStorage, notify parent, close modal, and redirect
      localStorage.setItem('userRole', selectedRole);
      onRoleChanged(selectedRole);
      onClose();

      // Redirect immediately - don't wait
      const redirectPath =
        selectedRole === "creator"
          ? "/creator"
          : selectedRole === "developer"
          ? "/developer"
          : "/dashboard";
      
      router.replace(redirectPath);

      // BACKGROUND: Save to Firestore (fire and forget - no await)
      const userRef = doc(db, "users", user.uid);
      setDoc(
        userRef,
        {
          role: selectedRole,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch(err => console.warn("Background role save failed:", err));
    } catch (err) {
      setIsLoading(false);
      setError("Failed to switch role. Please try again.");
      console.error("Role switch error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Change Your Role
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Select a new role that better describes how you want to use Patronex.
        </p>

        <div className="space-y-2">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            const isCurrent = currentRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                  isSelected
                    ? role.color === "amber"
                      ? "border-amber-500 bg-amber-50/50"
                      : role.color === "blue"
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-rose-500 bg-rose-50/50"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300",
                  isCurrent && "ring-2 ring-slate-300"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    role.color === "amber" && "bg-amber-100 text-amber-600",
                    role.color === "blue" && "bg-blue-100 text-blue-600",
                    role.color === "rose" && "bg-rose-100 text-rose-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {role.label}
                    </span>
                    {isCurrent && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {role.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
            disabled={!selectedRole || selectedRole === currentRole || isLoading}
            onClick={handleSave}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
