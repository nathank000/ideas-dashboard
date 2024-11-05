"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, TrendingUp, Target, Brain } from "lucide-react";
import { getStoredIdeas } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Idea } from "@/lib/types/idea";

export function StatsCards() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    setIdeas(getStoredIdeas());
  }, []);

  const totalIdeas = ideas.length;

  const averageMetrics = ideas.reduce(
    (acc, idea) => {
      const metrics = idea.metrics;
      Object.keys(metrics).forEach((key) => {
        acc[key] = (acc[key] || 0) + metrics[key as keyof typeof metrics];
      });
      return acc;
    },
    {} as Record<string, number>
  );

  Object.keys(averageMetrics).forEach((key) => {
    averageMetrics[key] = averageMetrics[key] / (totalIdeas || 1);
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

  const avgImplementation = (
    (averageMetrics.maintenanceComplexity || 0) +
    (averageMetrics.prototypability || 0)
  ) / 2;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Ideas</CardTitle>
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalIdeas}</div>
          <p className="text-xs text-muted-foreground">
            Active idea collection
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
          <CardTitle className="text-sm font-medium">Implementation</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {avgImplementation.toFixed(1)}/10
          </div>
          <p className="text-xs text-muted-foreground">
            Maintenance and prototype ease
          </p>
        </CardContent>
      </Card>
    </div>
  );
}