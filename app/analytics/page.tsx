import { AnalyticsOverview } from "@/components/analytics/overview";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>
      <AnalyticsOverview />
    </div>
  );
}