"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";

export default function Home() {
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
        </div>
      </main>
    </div>
  );
}