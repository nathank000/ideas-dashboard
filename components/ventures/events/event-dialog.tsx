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
import { VentureEvent } from "@/lib/types/venture";
import { useState } from "react";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: VentureEvent) => void;
  initialEvent?: VentureEvent;
}

export function EventDialog({
  open,
  onOpenChange,
  onSave,
  initialEvent,
}: EventDialogProps) {
  const [title, setTitle] = useState(initialEvent?.title || "");
  const [when, setWhen] = useState(initialEvent?.when || "");
  const [type, setType] = useState<VentureEvent["type"]>(initialEvent?.type || "event");
  const [detail, setDetail] = useState(initialEvent?.detail || "");
  const [notes, setNotes] = useState(initialEvent?.notes || "");
  const [sentiment, setSentiment] = useState<VentureEvent["sentiment"]>(
    initialEvent?.sentiment || "neutral"
  );

  const handleSubmit = () => {
    if (!title.trim() || !when) return;

    const event: VentureEvent = {
      id: initialEvent?.id || crypto.randomUUID(),
      title: title.trim(),
      when,
      type,
      detail: detail.trim(),
      notes: notes.trim(),
      sentiment,
      createdAt: initialEvent?.createdAt || new Date(),
    };

    onSave(event);
    onOpenChange(false);
    if (!initialEvent) {
      setTitle("");
      setWhen("");
      setType("event");
      setDetail("");
      setNotes("");
      setSentiment("neutral");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialEvent ? "Edit Event" : "Add Event"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
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
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: VentureEvent["type"]) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="update">Update</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sentiment">Sentiment</Label>
            <Select 
              value={sentiment} 
              onValueChange={(value: VentureEvent["sentiment"]) => setSentiment(value)}
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
            <Label htmlFor="detail">Detail</Label>
            <Textarea
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Describe the event in detail"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialEvent ? "Save Changes" : "Add Event"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}