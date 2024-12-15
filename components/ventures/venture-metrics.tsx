"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Venture } from "@/lib/types/venture";
import { SpiderChart } from "./spider-chart";
import { format } from "date-fns";

interface VentureMetricsProps {
  venture: Venture;
}

export function VentureMetrics({ venture }: VentureMetricsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Venture Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-muted-foreground">
              {venture.description || "No description provided."}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">Created</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(venture.createdAt), "MMMM d, yyyy")}
            </p>
          </div>
          {venture.dueDate && (
            <div className="space-y-1">
              <h3 className="font-medium">Due Date</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(venture.dueDate), "MMMM d, yyyy")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metrics Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <SpiderChart metrics={venture.metrics} />
        </CardContent>
      </Card>
    </div>
  );
}