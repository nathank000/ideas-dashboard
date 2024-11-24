"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Contact, VentureContact } from "@/lib/types/venture";
import { format } from "date-fns";
import { Mail, Phone, Linkedin, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactDetailsDialogProps {
  contact: Contact;
  sentiment: VentureContact['sentiment'];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (contact: Contact, sentiment: VentureContact['sentiment']) => void;
  onDelete: () => void;
  onSentimentChange: (sentiment: VentureContact['sentiment']) => void;
}

export function ContactDetailsDialog({
  contact,
  sentiment,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  onSentimentChange,
}: ContactDetailsDialogProps) {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle>{contact.name}</DialogTitle>
              <div className="text-sm text-muted-foreground">
                {contact.title} at {contact.company}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => onDelete()}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sentiment</span>
              <Select value={sentiment} onValueChange={onSentimentChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

          {contact.notes && (
            <div className="space-y-1">
              <span className="text-sm font-medium">Notes</span>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {contact.notes}
              </p>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Added {format(new Date(contact.dateAdded), "MMMM d, yyyy")}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}