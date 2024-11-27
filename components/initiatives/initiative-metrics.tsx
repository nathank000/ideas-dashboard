"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getVenturesForInitiative } from "@/lib/storage/initiatives";
import { getStoredVentures } from "@/lib/storage/ventures";
import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { Progress } from "@/components/ui/progress";

interface InitiativeMetricsProps {
  initiativeId: string;
}

export function InitiativeMetrics({ initiativeId }: InitiativeMetricsProps) {
  const [metrics, setMetrics] = useState({
    totalVentures: 0,
    activeVentures: 0,
    averageProgress: 0,
    completedVentures: 0,
  });

  useEffect(() => {
    const ventureIds = getVenturesForInitiative(initiativeId);
    const allVentures = getStoredVentures();
    const ventures = allVentures.filter(v => ventureIds.includes(v.id));
    
    const activeVentures = ventures.filter(v => v.active).length;
    const completedVentures = ventures.filter(v => v.status === "completed").length;
    const totalProgress = ventures.reduce((sum, v) => sum + v.progress, 0);
    const averageProgress = ventures.length ? Math.round(totalProgress / ventures.length) : 0;

    setMetrics({
      totalVentures: ventures.length,
      activeVentures,
      averageProgress,
      completedVentures,
    });
  }, [initiativeId]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Ventures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalVentures}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.activeVentures} active ventures
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl font-bold">{metrics.averageProgress}%</div>
          <Progress value={metrics.averageProgress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.completedVentures}</div>
          <p className="text-xs text-muted-foreground">
            {((metrics.completedVentures / metrics.totalVentures) * 100).toFixed(1)}% completion rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.totalVentures ? ((metrics.activeVentures / metrics.totalVentures) * 100).toFixed(1) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            Ventures in active development
          </p>
        </CardContent>
      </Card>
    </div>
  );
}