"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VentureAssumption } from "@/lib/types/venture";
import { useState } from "react";

interface AssumptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (assumption: VentureAssumption) => void;
  initialAssumption?: VentureAssumption;
}

export function AssumptionDialog({
  open,
  onOpenChange,
  onSave,
  initialAssumption,
}: AssumptionDialogProps) {
  const [title, setTitle] = useState(initialAssumption?.title || "");
  const [type, setType] = useState<VentureAssumption["type"]>(initialAssumption?.type || "technical");
  const [detail, setDetail] = useState(initialAssumption?.detail || "");
  const [notes, setNotes] = useState(initialAssumption?.notes || "");

  const handleSubmit = () => {
    if (!title.trim()) return;

    const assumption: VentureAssumption = {
      id: initialAssumption?.id || crypto.randomUUID(),
      title: title.trim(),
      type,
      detail: detail.trim(),
      notes: notes.trim(),
      holdsTrue: initialAssumption?.holdsTrue || false,
      createdAt: initialAssumption?.createdAt || new Date(),
    };

    onSave(assumption);
    onOpenChange(false);
    if (!initialAssumption) {
      setTitle("");
      setType("technical");
      setDetail("");
      setNotes("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialAssumption ? "Edit Assumption" : "Add Assumption"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assumption title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: VentureAssumption["type"]) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="strategic">Strategic</SelectItem>
                <SelectItem value="value">Value</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="detail">Detail</Label>
            <Textarea
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Describe the assumption in detail"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or observations"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialAssumption ? "Save Changes" : "Add Assumption"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}