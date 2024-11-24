"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VentureRisk } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { RiskCard } from "./risk-card";
import { RiskDialog } from "./risk-dialog";
import { RiskDetailsDialog } from "./risk-details-dialog";
import { addVentureRisk, deleteVentureRisk, updateVentureRisk } from "@/lib/storage/ventures";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface RisksSectionProps {
  ventureId: string;
  risks: VentureRisk[];
  onUpdate: () => void;
}

export function RisksSection({
  ventureId,
  risks,
  onUpdate,
}: RisksSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<VentureRisk | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [mitigationFilter, setMitigationFilter] = useState<"all" | "mitigated" | "unmitigated">("all");

  const filteredRisks = risks.filter(risk => {
    switch (mitigationFilter) {
      case "mitigated":
        return risk.mitigated;
      case "unmitigated":
        return !risk.mitigated;
      default:
        return true;
    }
  });

  const handleSave = (risk: VentureRisk) => {
    if (selectedRisk) {
      updateVentureRisk(ventureId, risk);
    } else {
      addVentureRisk(ventureId, risk);
    }
    onUpdate();
    setSelectedRisk(null);
  };

  const handleDelete = (riskId: string) => {
    if (confirm("Are you sure you want to delete this risk?")) {
      deleteVentureRisk(ventureId, riskId);
      onUpdate();
    }
  };

  const handleMitigatedChange = (risk: VentureRisk) => {
    updateVentureRisk(ventureId, risk);
    onUpdate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Risks</CardTitle>
            <CardDescription>
              Track and manage potential risks
            </CardDescription>
          </div>
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Risk
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup 
          type="single" 
          value={mitigationFilter} 
          onValueChange={(value) => value && setMitigationFilter(value as typeof mitigationFilter)}
          className="justify-start"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="mitigated">Mitigated</ToggleGroupItem>
          <ToggleGroupItem value="unmitigated">Unmitigated</ToggleGroupItem>
        </ToggleGroup>

        <div className="grid gap-2 md:grid-cols-2">
          {filteredRisks.length > 0 ? (
            filteredRisks.map((risk) => (
              <RiskCard
                key={risk.id}
                risk={risk}
                onMitigatedChange={handleMitigatedChange}
                onViewDetails={(risk) => {
                  setSelectedRisk(risk);
                  setDetailsOpen(true);
                }}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
              No risks match the current filter
            </p>
          )}
        </div>
      </CardContent>

      <RiskDialog
        open={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        onSave={handleSave}
      />

      {selectedRisk && (
        <RiskDetailsDialog
          risk={selectedRisk}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onEdit={(risk) => {
            handleSave(risk);
            setDetailsOpen(false);
          }}
        />
      )}
    </Card>
  );
}