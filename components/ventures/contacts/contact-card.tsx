"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/lib/types/venture";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Mail, Phone, Linkedin } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onViewDetails: (contact: Contact) => void;
}

export function ContactCard({ contact, onViewDetails }: ContactCardProps) {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <Card 
      className="hover:bg-muted/50 transition-colors cursor-pointer" 
      onClick={() => onViewDetails(contact)}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-medium">{contact.name}</div>
            <div className="text-sm text-muted-foreground">{contact.title}</div>
            <div className="text-sm text-muted-foreground">{contact.company}</div>
          </div>
          <Badge className={cn(sentimentColors[contact.sentiment])}>
            {contact.sentiment}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>Phone</span>
          </div>
          {contact.linkedIn && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Added {format(new Date(contact.dateAdded), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
}