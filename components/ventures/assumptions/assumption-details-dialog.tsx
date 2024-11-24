"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { VentureAssumption } from "@/lib/types/venture";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { AssumptionDialog } from "./assumption-dialog";
import { useState } from "react";

interface AssumptionDetailsDialogProps {
  assumption: VentureAssumption;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (assumption: VentureAssumption) => void;
}

export function AssumptionDetailsDialog({
  assumption,
  open,
  onOpenChange,
  onEdit,
}: AssumptionDetailsDialogProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DialogTitle>{assumption.title}</DialogTitle>
                <Badge variant="outline">{assumption.type}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setEditDialogOpen(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Detail</h4>
              <p className="text-sm text-muted-foreground">{assumption.detail}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Notes</h4>
              <p className="text-sm text-muted-foreground">{assumption.notes}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Added {format(new Date(assumption.createdAt), "MMMM d, yyyy")}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AssumptionDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) onOpenChange(false);
        }}
        onSave={onEdit}
        initialAssumption={assumption}
      />
    </>
  );
}