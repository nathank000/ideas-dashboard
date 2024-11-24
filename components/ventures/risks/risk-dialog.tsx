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
import { VentureRisk } from "@/lib/types/venture";
import { useState } from "react";

interface RiskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (risk: VentureRisk) => void;
  initialRisk?: VentureRisk;
}

export function RiskDialog({
  open,
  onOpenChange,
  onSave,
  initialRisk,
}: RiskDialogProps) {
  const [title, setTitle] = useState(initialRisk?.title || "");
  const [detail, setDetail] = useState(initialRisk?.detail || "");
  const [mitigationPlan, setMitigationPlan] = useState(initialRisk?.mitigationPlan || "");

  const handleSubmit = () => {
    if (!title.trim()) return;

    const risk: VentureRisk = {
      id: initialRisk?.id || crypto.randomUUID(),
      title: title.trim(),
      detail: detail.trim(),
      mitigationPlan: mitigationPlan.trim(),
      mitigated: initialRisk?.mitigated || false,
      createdAt: initialRisk?.createdAt || new Date(),
    };

    onSave(risk);
    onOpenChange(false);
    if (!initialRisk) {
      setTitle("");
      setDetail("");
      setMitigationPlan("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialRisk ? "Edit Risk" : "Add Risk"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter risk title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="detail">Detail</Label>
            <Textarea
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Describe the risk in detail"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mitigationPlan">Mitigation Plan</Label>
            <Textarea
              id="mitigationPlan"
              value={mitigationPlan}
              onChange={(e) => setMitigationPlan(e.target.value)}
              placeholder="Describe how to mitigate this risk"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialRisk ? "Save Changes" : "Add Risk"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}