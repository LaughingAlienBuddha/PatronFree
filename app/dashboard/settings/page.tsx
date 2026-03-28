"use client";

import { motion } from "framer-motion";
import { Settings, Bell, CreditCard, Shield, User, Palette, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const settingsSections = [
  {
    id: "account",
    title: "Account",
    icon: User,
    description: "Manage your profile and personal information",
    items: [
      { label: "Edit Profile", type: "button" as const },
      { label: "Change Password", type: "button" as const },
      { label: "Two-Factor Authentication", type: "switch" as const, value: true },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Choose what updates you receive",
    items: [
      { label: "New posts from creators you support", type: "switch" as const, value: true },
      { label: "Messages and replies", type: "switch" as const, value: true },
      { label: "Payment confirmations", type: "switch" as const, value: true },
      { label: "Marketing emails", type: "switch" as const, value: false },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    icon: CreditCard,
    description: "Manage your payment methods",
    items: [
      { label: "Saved Cards", type: "button" as const, extra: "2 cards" },
      { label: "UPI IDs", type: "button" as const, extra: "1 linked" },
      { label: "Billing History", type: "button" as const },
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize how Patronex looks",
    items: [
      { label: "Dark Mode", type: "switch" as const, value: false },
      { label: "Compact View", type: "switch" as const, value: false },
      { label: "Reduce Motion", type: "switch" as const, value: false },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Shield,
    description: "Control your privacy settings",
    items: [
      { label: "Public Profile", type: "switch" as const, value: false },
      { label: "Show Support Activity", type: "switch" as const, value: true },
      { label: "Allow Messages from Creators", type: "switch" as const, value: true },
    ],
  },
  {
    id: "language",
    title: "Language & Region",
    icon: Globe,
    description: "Set your preferred language",
    items: [
      { label: "Language", type: "button" as const, extra: "English" },
      { label: "Currency", type: "button" as const, extra: "INR (₹)" },
      { label: "Time Zone", type: "button" as const, extra: "IST (UTC+5:30)" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#365486] to-[#7FC7D9]">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1035]">Settings</h1>
        </div>
        <p className="text-[#365486]/70 ml-11">Manage your account preferences</p>
      </motion.div>

      {/* Settings Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {settingsSections.map((section) => (
          <motion.div key={section.id} variants={itemVariants}>
            <Card className="p-5 bg-gradient-to-br from-white/90 to-white/70 border-white/60 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#7FC7D9]/20 to-[#365486]/20">
                  <section.icon className="w-5 h-5 text-[#365486]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F1035]">{section.title}</h3>
                  <p className="text-xs text-[#365486]/60">{section.description}</p>
                </div>
              </div>

              <Separator className="bg-white/60 mb-4" />

              <div className="space-y-3">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm text-[#365486]/80">{item.label}</span>
                    {item.type === "switch" ? (
                      <Switch
                        defaultChecked={item.value}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#365486] data-[state=checked]:to-[#7FC7D9]"
                      />
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-[#365486] hover:bg-[#365486]/10"
                      >
                        {item.extra && (
                          <span className="text-[#365486]/60 mr-2">{item.extra}</span>
                        )}
                        <span className="text-sm">Configure</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
      >
        <div>
          <p className="text-sm text-[#365486]/60">Patronex v2.1.0</p>
          <p className="text-xs text-[#365486]/40 mt-0.5">
            Last updated: Dec 2024
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-lg border-red-200 text-red-600 hover:bg-red-50"
          >
            Sign Out
          </Button>
          <Button
            variant="outline"
            className="rounded-lg border-red-200 text-red-600 hover:bg-red-50"
          >
            Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
