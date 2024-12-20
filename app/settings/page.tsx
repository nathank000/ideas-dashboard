"use client";

import { SettingsForm } from "@/components/settings/settings-form";
import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import { PublicSharingSettings } from "@/components/settings/public-sharing-settings";
import { SurveySettings } from "@/components/settings/survey-settings";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsForm />
          <SurveySettings />
          <PublicSharingSettings />
        </div>
      </div>
    </div>
  );
}