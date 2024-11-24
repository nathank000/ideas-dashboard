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
      <CardContent>
        <div className="grid gap-2 md:grid-cols-2">
          {risks?.length > 0 ? (
            risks.map((risk) => (
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
              No risks identified yet
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