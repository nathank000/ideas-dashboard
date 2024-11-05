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
import { getStoredIdeas } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Idea } from "@/lib/types/idea";
import { format, subDays, startOfDay } from "date-fns";

export function AnalyticsChart() {
  const { theme } = useTheme();
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    setIdeas(getStoredIdeas());
  }, []);

  // Prepare data for ideas created over time
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), i));
    const ideasOnDay = ideas.filter(
      (idea) => startOfDay(new Date(idea.createdAt)).getTime() === date.getTime()
    ).length;
    return {
      date: format(date, "MMM d"),
      ideas: ideasOnDay,
    };
  }).reverse();

  // Prepare data for average metrics
  const metricAverages = ideas.reduce(
    (acc, idea) => {
      Object.entries(idea.metrics).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + value;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  Object.keys(metricAverages).forEach((key) => {
    metricAverages[key] = +(metricAverages[key] / (ideas.length || 1)).toFixed(1);
  });

  const metricData = Object.entries(metricAverages).map(([key, value]) => ({
    metric: key.replace(/([A-Z])/g, " $1").trim(),
    value,
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Ideas Analytics</CardTitle>
        <CardDescription>Idea creation trends and metric averages</CardDescription>
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
                dataKey="ideas"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
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