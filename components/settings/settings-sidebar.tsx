"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  CreditCard,
  KeyRound,
} from "lucide-react";
import { useState } from "react";

const settingsSections = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: Lock, label: "Privacy", id: "privacy" },
  { icon: Palette, label: "Appearance", id: "appearance" },
  { icon: Globe, label: "Language", id: "language" },
  { icon: Shield, label: "Security", id: "security" },
  { icon: CreditCard, label: "Billing", id: "billing" },
  { icon: KeyRound, label: "API Keys", id: "api-keys" },
];

export function SettingsSidebar() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1">
        {settingsSections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeSection === section.id && "bg-muted"
            )}
            onClick={() => setActiveSection(section.id)}
          >
            <section.icon className="mr-2 h-4 w-4" />
            {section.label}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}