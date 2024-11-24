"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { Venture } from "@/lib/types/venture";

interface SpiderChartProps {
  metrics: Venture["metrics"];
}

export function SpiderChart({ metrics }: SpiderChartProps) {
  const { theme } = useTheme();

  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: key.replace(/([A-Z])/g, " $1").trim(),
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid stroke={theme === "dark" ? "#334155" : "#e2e8f0"} />
        <PolarAngleAxis
          dataKey="metric"
          tick={{ fill: theme === "dark" ? "#94a3b8" : "#64748b" }}
        />
        <Radar
          name="Metrics"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}