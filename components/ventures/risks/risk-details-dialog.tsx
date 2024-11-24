"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VentureRisk } from "@/lib/types/venture";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { RiskDialog } from "./risk-dialog";
import { useState } from "react";

interface RiskDetailsDialogProps {
  risk: VentureRisk;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (risk: VentureRisk) => void;
}

export function RiskDetailsDialog({
  risk,
  open,
  onOpenChange,
  onEdit,
}: RiskDetailsDialogProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{risk.title}</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setEditDialogOpen(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Detail</h4>
              <p className="text-sm text-muted-foreground">{risk.detail}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Mitigation Plan</h4>
              <p className="text-sm text-muted-foreground">{risk.mitigationPlan}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Added {format(new Date(risk.createdAt), "MMMM d, yyyy")}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RiskDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) onOpenChange(false);
        }}
        onSave={onEdit}
        initialRisk={risk}
      />
    </>
  );
}