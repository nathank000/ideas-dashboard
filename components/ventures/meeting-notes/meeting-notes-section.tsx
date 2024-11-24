"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MeetingNote } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { MeetingNoteCard } from "./meeting-note-card";
import { MeetingNoteDialog } from "./meeting-note-dialog";
import { MeetingNoteDetailsDialog } from "./meeting-note-details-dialog";
import { addVentureMeetingNote, deleteVentureMeetingNote, updateVentureMeetingNote } from "@/lib/storage/ventures";

interface MeetingNotesSectionProps {
  ventureId: string;
  meetingNotes: MeetingNote[];
  onUpdate: () => void;
}

export function MeetingNotesSection({
  ventureId,
  meetingNotes,
  onUpdate,
}: MeetingNotesSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<MeetingNote | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleSave = (note: MeetingNote) => {
    if (selectedNote) {
      updateVentureMeetingNote(ventureId, note);
    } else {
      addVentureMeetingNote(ventureId, note);
    }
    onUpdate();
    setSelectedNote(null);
  };

  const handleDelete = (noteId: string) => {
    if (confirm("Are you sure you want to delete this meeting note?")) {
      deleteVentureMeetingNote(ventureId, noteId);
      onUpdate();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Meeting Notes</CardTitle>
            <CardDescription>
              Track meeting discussions and outcomes
            </CardDescription>
          </div>
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 md:grid-cols-2">
          {meetingNotes?.length > 0 ? (
            meetingNotes
              .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
              .map((note) => (
                <MeetingNoteCard
                  key={note.id}
                  note={note}
                  onViewDetails={(note) => {
                    setSelectedNote(note);
                    setDetailsOpen(true);
                  }}
                />
              ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
              No meeting notes yet
            </p>
          )}
        </div>
      </CardContent>

      <MeetingNoteDialog
        open={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        onSave={handleSave}
      />

      {selectedNote && (
        <MeetingNoteDetailsDialog
          note={selectedNote}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onEdit={(note) => {
            handleSave(note);
            setDetailsOpen(false);
          }}
          onDelete={() => {
            handleDelete(selectedNote.id);
            setDetailsOpen(false);
          }}
        />
      )}
    </Card>
  );
}