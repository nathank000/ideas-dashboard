"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDialog({ open, onOpenChange }: EventDialogProps) {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Event title" />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="reminder">Reminder</SelectItem>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Event description" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Create Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}