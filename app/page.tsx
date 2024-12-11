"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { InitiativeSection } from "@/components/initiatives/initiative-section";
import { useEffect, useState } from "react";
import { Initiative } from "@/lib/types/initiative";
import { getStoredInitiatives } from "@/lib/storage/initiatives";
import { useHotkeys } from "react-hotkeys-hook";

export default function Home() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [showNewVentureModal, setShowNewVentureModal] = useState(false);

  useEffect(() => {
    setInitiatives(getStoredInitiatives());
  }, []);

  // useHotkeys('ctrl+n', (event) => {
  //   event.preventDefault();
  //   console.log('NPK:: ctrl+n pressed');
  //   setShowNewVentureModal(true);
  // }, { enableOnFormTags: true });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block" />
      
      <main className="flex-1 overflow-y-auto">
        <Header />
        
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>

          <StatsCards />

          <div className="grid gap-6 md:grid-cols-7">
            <AnalyticsChart />
            <div className="md:col-span-3">
              <ActivityFeed />
            </div>
          </div>

          <div className="space-y-8">
            {initiatives.map((initiative) => (
              <InitiativeSection
                key={initiative.id}
                initiative={initiative}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}