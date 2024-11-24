"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";
import { getStoredVentures } from "@/lib/storage/ventures";
import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { format, subDays, startOfDay } from "date-fns";

export function AnalyticsChart() {
  const { theme } = useTheme();
  const [ventures, setVentures] = useState<Venture[]>([]);

  useEffect(() => {
    setVentures(getStoredVentures());
  }, []);

  // Prepare data for ventures created over time
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), i));
    const venturesOnDay = ventures.filter(
      (venture) => startOfDay(new Date(venture.createdAt)).getTime() === date.getTime()
    ).length;
    const activeVenturesOnDay = ventures.filter(
      (venture) => 
        startOfDay(new Date(venture.createdAt)).getTime() === date.getTime() &&
        venture.active
    ).length;
    return {
      date: format(date, "MMM d"),
      ventures: venturesOnDay,
      active: activeVenturesOnDay,
    };
  }).reverse();

  // Prepare data for average metrics
  const metricAverages = ventures.reduce(
    (acc, venture) => {
      Object.entries(venture.metrics).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + value;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  Object.keys(metricAverages).forEach((key) => {
    metricAverages[key] = +(metricAverages[key] / (ventures.length || 1)).toFixed(1);
  });

  const metricData = Object.entries(metricAverages).map(([key, value]) => ({
    metric: key.replace(/([A-Z])/g, " $1").trim(),
    value,
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Ventures Analytics</CardTitle>
        <CardDescription>Venture creation trends and metric averages</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7Days}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
              />
              <XAxis
                dataKey="date"
                stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
              />
              <YAxis stroke={theme === "dark" ? "#94a3b8" : "#64748b"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="ventures"
                name="Total Ventures"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="active"
                name="Active Ventures"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metricData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
              />
              <XAxis
                type="number"
                domain={[0, 10]}
                stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
              />
              <YAxis
                dataKey="metric"
                type="category"
                width={150}
                stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}