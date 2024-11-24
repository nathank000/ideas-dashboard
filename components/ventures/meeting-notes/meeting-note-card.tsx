"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MeetingNote } from "@/lib/types/venture";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MeetingNoteCardProps {
  note: MeetingNote;
  onViewDetails: (note: MeetingNote) => void;
}

export function MeetingNoteCard({ note, onViewDetails }: MeetingNoteCardProps) {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <Card 
      className="hover:bg-muted/50 transition-colors cursor-pointer" 
      onClick={() => onViewDetails(note)}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">{note.title}</span>
          <Badge className={cn(sentimentColors[note.sentiment])}>
            {note.sentiment}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {format(new Date(note.when), "MMM d, yyyy h:mm a")}
        </div>
      </CardContent>
    </Card>
  );
}