"use client";

import { useEffect, useState } from "react";
import { Contact, Venture } from "@/lib/types/venture";
import { getStoredContacts } from "@/lib/storage/contacts";
import { getStoredVentures } from "@/lib/storage/ventures";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Linkedin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ContactDetailProps {
  id: string;
}

export function ContactDetail({ id }: ContactDetailProps) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [relatedVentures, setRelatedVentures] = useState<Array<Venture & { sentiment: string }>>([]);

  useEffect(() => {
    const contacts = getStoredContacts();
    const foundContact = contacts.find((c) => c.id === id);
    if (foundContact) {
      setContact(foundContact);

      const ventures = getStoredVentures();
      const venturesWithContact = ventures
        .filter(v => v.contacts?.some(c => c.contactId === id))
        .map(v => ({
          ...v,
          sentiment: v.contacts?.find(c => c.contactId === id)?.sentiment || 'neutral'
        }));
      setRelatedVentures(venturesWithContact);
    }
  }, [id]);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/contacts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{contact.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium">{contact.title}</div>
              <div className="text-muted-foreground">{contact.company}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${contact.phone}`} className="hover:underline">
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
                    className="hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>

            {contact.notes && (
              <div className="space-y-1">
                <div className="font-medium">Notes</div>
                <div className="text-muted-foreground whitespace-pre-wrap">
                  {contact.notes}
                </div>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              Added {format(new Date(contact.dateAdded), "MMMM d, yyyy")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Ventures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedVentures.map((venture) => (
                <Link key={venture.id} href={`/ventures/${venture.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <div className="font-medium">{venture.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {venture.status} - {venture.progress}% complete
                      </div>
                    </div>
                    <Badge className={cn(sentimentColors[venture.sentiment])}>
                      {venture.sentiment}
                    </Badge>
                  </div>
                </Link>
              ))}
              {relatedVentures.length === 0 && (
                <p className="text-center text-muted-foreground">
                  No related ventures found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}