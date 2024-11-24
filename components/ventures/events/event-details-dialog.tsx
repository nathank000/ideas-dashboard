"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { VentureEvent } from "@/lib/types/venture";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import { EventDialog } from "./event-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EventDetailsDialogProps {
  event: VentureEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (event: VentureEvent) => void;
  onDelete: () => void;
}

export function EventDetailsDialog({
  event,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: EventDetailsDialogProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DialogTitle>{event.title}</DialogTitle>
                <Badge variant="outline">{event.type}</Badge>
                <Badge className={cn(sentimentColors[event.sentiment])}>
                  {event.sentiment}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditDialogOpen(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onDelete}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              {format(new Date(event.when), "MMMM d, yyyy h:mm a")}
            </div>
            <div>
              <h4 className="font-medium mb-1">Detail</h4>
              <p className="text-sm text-muted-foreground">{event.detail}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Notes</h4>
              <p className="text-sm text-muted-foreground">{event.notes}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Added {format(new Date(event.createdAt), "MMMM d, yyyy")}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EventDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) onOpenChange(false);
        }}
        onSave={onEdit}
        initialEvent={event}
      />
    </>
  );
}