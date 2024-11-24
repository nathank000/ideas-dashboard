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
import { DecisionLog } from "@/lib/types/venture";
import { useState } from "react";

interface DecisionLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (decision: DecisionLog) => void;
  initialDecision?: DecisionLog;
}

export function DecisionLogDialog({
  open,
  onOpenChange,
  onSave,
  initialDecision,
}: DecisionLogDialogProps) {
  const [title, setTitle] = useState(initialDecision?.title || "");
  const [when, setWhen] = useState(initialDecision?.when || new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState(initialDecision?.notes || "");
  const [sentiment, setSentiment] = useState<DecisionLog["sentiment"]>(
    initialDecision?.sentiment || "neutral"
  );
  const [owner, setOwner] = useState(initialDecision?.owner || "");

  const handleSubmit = () => {
    if (!title.trim() || !when || !owner.trim()) return;

    const decision: DecisionLog = {
      id: initialDecision?.id || crypto.randomUUID(),
      title: title.trim(),
      when,
      notes: notes.trim(),
      sentiment,
      owner: owner.trim(),
      createdAt: initialDecision?.createdAt || new Date(),
    };

    onSave(decision);
    onOpenChange(false);
    if (!initialDecision) {
      setTitle("");
      setWhen(new Date().toISOString().slice(0, 16));
      setNotes("");
      setSentiment("neutral");
      setOwner("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialDecision ? "Edit Decision" : "Add Decision"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter decision title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="when">When</Label>
            <Input
              id="when"
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <Input
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Decision owner"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sentiment">Sentiment</Label>
            <Select 
              value={sentiment} 
              onValueChange={(value: DecisionLog["sentiment"]) => setSentiment(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Decision details and context"
              className="min-h-[200px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialDecision ? "Save Changes" : "Add Decision"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}