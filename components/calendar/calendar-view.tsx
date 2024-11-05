"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventList } from "@/components/calendar/event-list";
import { EventDialog } from "@/components/calendar/event-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showEventDialog, setShowEventDialog] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-7">
      <Card className="md:col-span-5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendar</CardTitle>
            <Button onClick={() => setShowEventDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <EventList selectedDate={date} />
        </CardContent>
      </Card>

      <EventDialog open={showEventDialog} onOpenChange={setShowEventDialog} />
    </div>
  );
}