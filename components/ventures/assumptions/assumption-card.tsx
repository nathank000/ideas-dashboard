"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VentureAssumption } from "@/lib/types/venture";
import { CheckCircle2, Circle } from "lucide-react";

interface AssumptionCardProps {
  assumption: VentureAssumption;
  onHoldsTrueChange: (assumption: VentureAssumption) => void;
  onViewDetails: (assumption: VentureAssumption) => void;
}

export function AssumptionCard({ assumption, onHoldsTrueChange, onViewDetails }: AssumptionCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => onViewDetails(assumption)}>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">{assumption.title}</span>
            <Badge variant="outline">{assumption.type}</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Assumption holds true?</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();
              onHoldsTrueChange({ ...assumption, holdsTrue: !assumption.holdsTrue });
            }}
          >
            {assumption.holdsTrue ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}