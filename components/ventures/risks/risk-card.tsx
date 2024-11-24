"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VentureRisk } from "@/lib/types/venture";
import { CheckCircle2, Circle } from "lucide-react";

interface RiskCardProps {
  risk: VentureRisk;
  onMitigatedChange: (risk: VentureRisk) => void;
  onViewDetails: (risk: VentureRisk) => void;
}

export function RiskCard({ risk, onMitigatedChange, onViewDetails }: RiskCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => onViewDetails(risk)}>
      <CardContent className="p-4 flex items-center justify-between">
        <span className="font-medium">{risk.title}</span>
        <Button
          variant="ghost"
          size="sm"
          className="ml-2"
          onClick={(e) => {
            e.stopPropagation();
            onMitigatedChange({ ...risk, mitigated: !risk.mitigated });
          }}
        >
          {risk.mitigated ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}