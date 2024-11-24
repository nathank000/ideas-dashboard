"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VentureEvent } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EventCard } from "./event-card";
import { EventDialog } from "./event-dialog";
import { EventDetailsDialog } from "./event-details-dialog";
import { addVentureEvent, deleteVentureEvent, updateVentureEvent } from "@/lib/storage/ventures";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface EventsSectionProps {
  ventureId: string;
  events: VentureEvent[];
  onUpdate: () => void;
}

export function EventsSection({
  ventureId,
  events,
  onUpdate,
}: EventsSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<VentureEvent | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "negative" | "neutral">("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "past" | "future">("all");

  const filteredEvents = events.filter(event => {
    const matchesSentiment = sentimentFilter === "all" || event.sentiment === sentimentFilter;
    const now = new Date();
    const eventDate = new Date(event.when);
    const matchesTime = timeFilter === "all" || 
      (timeFilter === "past" ? eventDate < now : eventDate > now);
    return matchesSentiment && matchesTime;
  });

  const handleSave = (event: VentureEvent) => {
    if (selectedEvent) {
      updateVentureEvent(ventureId, event);
    } else {
      addVentureEvent(ventureId, event);
    }
    onUpdate();
    setSelectedEvent(null);
  };

  const handleDelete = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteVentureEvent(ventureId, eventId);
      onUpdate();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Events & Updates</CardTitle>
            <CardDescription>
              Track important events and updates
            </CardDescription>
          </div>
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <ToggleGroup 
              type="single" 
              value={sentimentFilter} 
              onValueChange={(value) => value && setSentimentFilter(value as typeof sentimentFilter)}
              className="justify-start"
            >
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="positive">Positive</ToggleGroupItem>
              <ToggleGroupItem value="negative">Negative</ToggleGroupItem>
              <ToggleGroupItem value="neutral">Neutral</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <ToggleGroup 
            type="single" 
            value={timeFilter} 
            onValueChange={(value) => value && setTimeFilter(value as typeof timeFilter)}
            className="justify-start"
          >
            <ToggleGroupItem value="all">All Time</ToggleGroupItem>
            <ToggleGroupItem value="past">Past</ToggleGroupItem>
            <ToggleGroupItem value="future">Future</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {filteredEvents.length > 0 ? (
            filteredEvents
              .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
              .map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={(event) => {
                    setSelectedEvent(event);
                    setDetailsOpen(true);
                  }}
                />
              ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
              No events match the current filters
            </p>
          )}
        </div>
      </CardContent>

      <EventDialog
        open={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        onSave={handleSave}
      />

      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onEdit={(event) => {
            handleSave(event);
            setDetailsOpen(false);
          }}
          onDelete={() => {
            handleDelete(selectedEvent.id);
            setDetailsOpen(false);
          }}
        />
      )}
    </Card>
  );
}