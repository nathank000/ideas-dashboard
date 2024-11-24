"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DecisionLog } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DecisionLogCard } from "./decision-log-card";
import { DecisionLogDialog } from "./decision-log-dialog";
import { DecisionLogDetailsDialog } from "./decision-log-details-dialog";
import { addVentureDecisionLog, deleteVentureDecisionLog, updateVentureDecisionLog } from "@/lib/storage/ventures";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DecisionLogsSectionProps {
  ventureId: string;
  decisionLogs: DecisionLog[];
  onUpdate: () => void;
}

export function DecisionLogsSection({
  ventureId,
  decisionLogs,
  onUpdate,
}: DecisionLogsSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<DecisionLog | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "negative" | "neutral">("all");

  const filteredDecisions = decisionLogs.filter(decision => 
    sentimentFilter === "all" || decision.sentiment === sentimentFilter
  );

  const handleSave = (decision: DecisionLog) => {
    if (selectedDecision) {
      updateVentureDecisionLog(ventureId, decision);
    } else {
      addVentureDecisionLog(ventureId, decision);
    }
    onUpdate();
    setSelectedDecision(null);
  };

  const handleDelete = (decisionId: string) => {
    if (confirm("Are you sure you want to delete this decision?")) {
      deleteVentureDecisionLog(ventureId, decisionId);
      onUpdate();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Decision Log</CardTitle>
            <CardDescription>
              Track important decisions and their context
            </CardDescription>
          </div>
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Decision
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup 
          type="single" 
          value={sentimentFilter} 
          onValueChange={(value) => value && setSentimentFilter(value as typeof sentimentFilter)}
          className="justify-start"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="positive">Positive</ToggleGroupItem>
          <ToggleGroupItem value="negative">Negative</ToggleGroupItem>
          <ToggleGroupItem value="neutral">Neutral</ToggleGroupItem>
        </ToggleGroup>

        <div className="grid gap-2 md:grid-cols-2">
          {filteredDecisions.length > 0 ? (
            filteredDecisions
              .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
              .map((decision) => (
                <DecisionLogCard
                  key={decision.id}
                  decision={decision}
                  onViewDetails={(decision) => {
                    setSelectedDecision(decision);
                    setDetailsOpen(true);
                  }}
                />
              ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
              No decisions match the current filter
            </p>
          )}
        </div>
      </CardContent>

      <DecisionLogDialog
        open={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        onSave={handleSave}
      />

      {selectedDecision && (
        <DecisionLogDetailsDialog
          decision={selectedDecision}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onEdit={(decision) => {
            handleSave(decision);
            setDetailsOpen(false);
          }}
          onDelete={() => {
            handleDelete(selectedDecision.id);
            setDetailsOpen(false);
          }}
        />
      )}
    </Card>
  );
}