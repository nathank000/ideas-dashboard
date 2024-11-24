"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DecisionLog } from "@/lib/types/venture";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DecisionLogCardProps {
  decision: DecisionLog;
  onViewDetails: (decision: DecisionLog) => void;
}

export function DecisionLogCard({ decision, onViewDetails }: DecisionLogCardProps) {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <Card 
      className="hover:bg-muted/50 transition-colors cursor-pointer" 
      onClick={() => onViewDetails(decision)}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">{decision.title}</span>
          <Badge className={cn(sentimentColors[decision.sentiment])}>
            {decision.sentiment}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{format(new Date(decision.when), "MMM d, yyyy h:mm a")}</span>
          <span>Owner: {decision.owner}</span>
        </div>
      </CardContent>
    </Card>
  );
}