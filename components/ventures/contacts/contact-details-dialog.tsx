"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/lib/types/venture";
import { format } from "date-fns";
import { Pencil, Trash, Mail, Phone, Linkedin } from "lucide-react";
import { ContactDialog } from "./contact-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactDetailsDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (contact: Contact) => void;
  onDelete: () => void;
}

export function ContactDetailsDialog({
  contact,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: ContactDetailsDialogProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DialogTitle>{contact.name}</DialogTitle>
                <Badge className={cn(sentimentColors[contact.sentiment])}>
                  {contact.sentiment}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditDialogOpen(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onDelete}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">{contact.title}</div>
              <div className="text-sm text-muted-foreground">{contact.company}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
                  {contact.phone}
                </a>
              </div>
              {contact.linkedIn && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <a 
                    href={contact.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium mb-1">Notes</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {contact.notes}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Added {format(new Date(contact.dateAdded), "MMMM d, yyyy")}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ContactDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) onOpenChange(false);
        }}
        onSave={onEdit}
        initialContact={contact}
      />
    </>
  );
}