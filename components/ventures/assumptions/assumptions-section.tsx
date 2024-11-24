"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VentureAssumption } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AssumptionCard } from "./assumption-card";
import { AssumptionDialog } from "./assumption-dialog";
import { AssumptionDetailsDialog } from "./assumption-details-dialog";
import { addVentureAssumption, deleteVentureAssumption, updateVentureAssumption } from "@/lib/storage/ventures";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssumptionsSectionProps {
  ventureId: string;
  assumptions: VentureAssumption[];
  onUpdate: () => void;
}

export function AssumptionsSection({
  ventureId,
  assumptions,
  onUpdate,
}: AssumptionsSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedAssumption, setSelectedAssumption] = useState<VentureAssumption | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [validityFilter, setValidityFilter] = useState<"all" | "true" | "false">("all");
  const [typeFilter, setTypeFilter] = useState<VentureAssumption["type"] | "all">("all");

  const filteredAssumptions = assumptions.filter(assumption => {
    const matchesValidity = validityFilter === "all" || 
      (validityFilter === "true" ? assumption.holdsTrue : !assumption.holdsTrue);
    const matchesType = typeFilter === "all" || assumption.type === typeFilter;
    return matchesValidity && matchesType;
  });

  const handleSave = (assumption: VentureAssumption) => {
    if (selectedAssumption) {
      updateVentureAssumption(ventureId, assumption);
    } else {
      addVentureAssumption(ventureId, assumption);
    }
    onUpdate();
    setSelectedAssumption(null);
  };

  const handleDelete = (assumptionId: string) => {
    if (confirm("Are you sure you want to delete this assumption?")) {
      deleteVentureAssumption(ventureId, assumptionId);
      onUpdate();
    }
  };

  const handleHoldsTrueChange = (assumption: VentureAssumption) => {
    updateVentureAssumption(ventureId, assumption);
    onUpdate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Assumptions</CardTitle>
            <CardDescription>
              Track and validate key assumptions
            </CardDescription>
          </div>
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Assumption
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <ToggleGroup 
              type="single" 
              value={validityFilter} 
              onValueChange={(value) => value && setValidityFilter(value as typeof validityFilter)}
              className="justify-start"
            >
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="true">Holds True</ToggleGroupItem>
              <ToggleGroupItem value="false">Holds False</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as typeof typeFilter)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="strategic">Strategic</SelectItem>
              <SelectItem value="value">Value</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {filteredAssumptions.length > 0 ? (
            filteredAssumptions.map((assumption) => (
              <AssumptionCard
                key={assumption.id}
                assumption={assumption}
                onHoldsTrueChange={handleHoldsTrueChange}
                onViewDetails={(assumption) => {
                  setSelectedAssumption(assumption);
                  setDetailsOpen(true);
                }}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
              No assumptions match the current filters
            </p>
          )}
        </div>
      </CardContent>

      <AssumptionDialog
        open={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        onSave={handleSave}
      />

      {selectedAssumption && (
        <AssumptionDetailsDialog
          assumption={selectedAssumption}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onEdit={(assumption) => {
            handleSave(assumption);
            setDetailsOpen(false);
          }}
        />
      )}
    </Card>
  );
}