"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useTheme } from "next-themes";

const pageViews = [
  { name: "Mon", views: 2400 },
  { name: "Tue", views: 1398 },
  { name: "Wed", views: 9800 },
  { name: "Thu", views: 3908 },
  { name: "Fri", views: 4800 },
  { name: "Sat", views: 3800 },
  { name: "Sun", views: 4300 },
];

const engagementData = [
  { name: "Week 1", users: 400, sessions: 240 },
  { name: "Week 2", users: 300, sessions: 139 },
  { name: "Week 3", users: 200, sessions: 980 },
  { name: "Week 4", users: 278, sessions: 390 },
  { name: "Week 5", users: 189, sessions: 480 },
  { name: "Week 6", users: 239, sessions: 380 },
  { name: "Week 7", users: 349, sessions: 430 },
];

export function AnalyticsOverview() {
  const { theme } = useTheme();
  const chartConfig = {
    style: {
      background: "transparent",
    },
    grid: {
      stroke: theme === "dark" ? "#334155" : "#e2e8f0",
    },
    text: {
      fill: theme === "dark" ? "#94a3b8" : "#64748b",
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3K</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,234</div>
            <p className="text-xs text-muted-foreground">+10.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.3%</div>
            <p className="text-xs text-muted-foreground">-8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 13s</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Page Views</CardTitle>
            <CardDescription>Page views over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageViews}>
                  <CartesianGrid strokeDasharray="3 3" {...chartConfig.grid} />
                  <XAxis dataKey="name" {...chartConfig.text} />
                  <YAxis {...chartConfig.text} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Weekly users and sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" {...chartConfig.grid} />
                  <XAxis dataKey="name" {...chartConfig.text} />
                  <YAxis {...chartConfig.text} />
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
                    dataKey="users"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}