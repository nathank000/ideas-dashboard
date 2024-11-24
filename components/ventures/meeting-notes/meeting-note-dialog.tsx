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
import { MeetingNote } from "@/lib/types/venture";
import { useState } from "react";

interface MeetingNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (note: MeetingNote) => void;
  initialNote?: MeetingNote;
}

export function MeetingNoteDialog({
  open,
  onOpenChange,
  onSave,
  initialNote,
}: MeetingNoteDialogProps) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [when, setWhen] = useState(initialNote?.when || new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState(initialNote?.notes || "");
  const [sentiment, setSentiment] = useState<MeetingNote["sentiment"]>(
    initialNote?.sentiment || "neutral"
  );

  const handleSubmit = () => {
    if (!title.trim() || !when) return;

    const note: MeetingNote = {
      id: initialNote?.id || crypto.randomUUID(),
      title: title.trim(),
      when,
      notes: notes.trim(),
      sentiment,
      createdAt: initialNote?.createdAt || new Date(),
    };

    onSave(note);
    onOpenChange(false);
    if (!initialNote) {
      setTitle("");
      setWhen(new Date().toISOString().slice(0, 16));
      setNotes("");
      setSentiment("neutral");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialNote ? "Edit Meeting Note" : "Add Meeting Note"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
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
            <Label htmlFor="sentiment">Sentiment</Label>
            <Select 
              value={sentiment} 
              onValueChange={(value: MeetingNote["sentiment"]) => setSentiment(value)}
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
              placeholder="Meeting notes and discussion points"
              className="min-h-[200px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialNote ? "Save Changes" : "Add Note"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}