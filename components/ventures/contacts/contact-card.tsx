"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Contact, VentureContact } from "@/lib/types/venture";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  contact: Contact;
  sentiment: VentureContact['sentiment'];
  dateAdded: string;
  onViewDetails: () => void;
}

export function ContactCard({ contact, sentiment, dateAdded, onViewDetails }: ContactCardProps) {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <Card 
      className="hover:bg-muted/50 transition-colors cursor-pointer" 
      onClick={onViewDetails}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-medium">{contact.name}</div>
            <div className="text-sm text-muted-foreground">{contact.title}</div>
            <div className="text-sm text-muted-foreground">{contact.company}</div>
          </div>
          <Badge className={cn(sentimentColors[sentiment])}>
            {sentiment}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Added {format(new Date(dateAdded), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
}