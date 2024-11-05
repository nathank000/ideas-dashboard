"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "meeting" | "reminder" | "task";
  description: string;
}

const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    date: new Date(),
    type: "meeting",
    description: "Weekly team sync",
  },
  {
    id: "2",
    title: "Project Deadline",
    date: new Date(Date.now() + 86400000),
    type: "reminder",
    description: "Submit final deliverables",
  },
  {
    id: "3",
    title: "Code Review",
    date: new Date(Date.now() + 172800000),
    type: "task",
    description: "Review pull requests",
  },
];

interface EventListProps {
  selectedDate?: Date;
}

export function EventList({ selectedDate }: EventListProps) {
  const filteredEvents = selectedDate
    ? dummyEvents.filter(
        (event) => format(event.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )
    : dummyEvents;

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="flex flex-col space-y-2 border-b pb-4 last:border-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{event.title}</span>
              <Badge
                variant={
                  event.type === "meeting"
                    ? "default"
                    : event.type === "reminder"
                    ? "secondary"
                    : "outline"
                }
              >
                {event.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <p className="text-sm text-muted-foreground">
              {format(event.date, "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <p className="text-center text-muted-foreground">No events found</p>
        )}
      </div>
    </ScrollArea>
  );
}