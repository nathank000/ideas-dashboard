"use client";

import { CalendarView } from "@/components/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Calendar</h1>
      </div>
      <CalendarView />
    </div>
  );
}