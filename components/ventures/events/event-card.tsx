"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VentureEvent } from "@/lib/types/venture";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: VentureEvent;
  onViewDetails: (event: VentureEvent) => void;
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <Card 
      className="hover:bg-muted/50 transition-colors cursor-pointer" 
      onClick={() => onViewDetails(event)}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">{event.title}</span>
            <Badge variant="outline">{event.type}</Badge>
          </div>
          <Badge className={cn(sentimentColors[event.sentiment])}>
            {event.sentiment}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {format(new Date(event.when), "MMM d, yyyy h:mm a")}
        </div>
      </CardContent>
    </Card>
  );
}