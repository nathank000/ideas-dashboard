"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket, TrendingUp, Target, Brain } from "lucide-react";
import { getStoredVentures } from "@/lib/storage/ventures";
import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";

export function StatsCards() {
  const [ventures, setVentures] = useState<Venture[]>([]);

  useEffect(() => {
    setVentures(getStoredVentures());
  }, []);

  const totalVentures = ventures.length;
  const activeVentures = ventures.filter(v => v.active).length;

  const averageMetrics = ventures.reduce(
    (acc, venture) => {
      const metrics = venture.metrics;
      Object.keys(metrics).forEach((key) => {
        acc[key] = (acc[key] || 0) + metrics[key as keyof typeof metrics];
      });
      return acc;
    },
    {} as Record<string, number>
  );

  Object.keys(averageMetrics).forEach((key) => {
    averageMetrics[key] = averageMetrics[key] / (totalVentures || 1);
  });

  const avgFeasibility = (
    (averageMetrics.technicalFeasibility || 0) +
    (averageMetrics.timeToMvp || 0) +
    (averageMetrics.costToDevelop || 0)
  ) / 3;

  const avgMarketPotential = (
    (averageMetrics.marketDemand || 0) +
    (averageMetrics.scalability || 0)
  ) / 2;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Ventures</CardTitle>
          <Rocket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVentures}</div>
          <p className="text-xs text-muted-foreground">
            {activeVentures} active ventures
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Feasibility</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {avgFeasibility.toFixed(1)}/10
          </div>
          <p className="text-xs text-muted-foreground">
            Technical, time, and cost metrics
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Market Potential</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {avgMarketPotential.toFixed(1)}/10
          </div>
          <p className="text-xs text-muted-foreground">
            Demand and scalability score
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalVentures ? ((activeVentures / totalVentures) * 100).toFixed(1) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            Ventures in active development
          </p>
        </CardContent>
      </Card>
    </div>
  );
}