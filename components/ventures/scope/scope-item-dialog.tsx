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
import { ScopeItem } from "@/lib/types/venture";
import { useState } from "react";

interface ScopeItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: ScopeItem) => void;
  initialItem?: ScopeItem;
}

export function ScopeItemDialog({
  open,
  onOpenChange,
  onSave,
  initialItem,
}: ScopeItemDialogProps) {
  const [title, setTitle] = useState(initialItem?.title || "");
  const [description, setDescription] = useState(initialItem?.description || "");
  const [status, setStatus] = useState<ScopeItem["status"]>(initialItem?.status || "in");
  const [reason, setReason] = useState(initialItem?.reason || "");

  const handleSubmit = () => {
    if (!title.trim()) return;

    const item: ScopeItem = {
      id: initialItem?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status,
      reason: reason.trim(),
      createdAt: initialItem?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(item);
    onOpenChange(false);
    if (!initialItem) {
      setTitle("");
      setDescription("");
      setStatus("in");
      setReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialItem ? "Edit Scope Item" : "Add Scope Item"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter item title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the scope item"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: ScopeItem["status"]) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">In Scope</SelectItem>
                <SelectItem value="out">Out of Scope</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this item is in/out of scope"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialItem ? "Save Changes" : "Add Item"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}