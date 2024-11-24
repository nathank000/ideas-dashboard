"use client";

import { Contact } from "@/lib/types/venture";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Mail, Phone, Linkedin, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ContactDialog } from "./contact-dialog";
import { deleteContact } from "@/lib/storage/contacts";

interface ContactsGridProps {
  contacts: (Contact & { ventureCount: number })[];
  onContactsChange: () => void;
}

export function ContactsGrid({ contacts, onContactsChange }: ContactsGridProps) {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  const handleDelete = (contact: Contact) => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      deleteContact(contact.id);
      onContactsChange();
    }
  };

  // Ensure unique contacts by filtering duplicates based on ID
  const uniqueContacts = contacts.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as (Contact & { ventureCount: number })[]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {uniqueContacts.map((contact) => (
          <Card key={`contact-grid-${contact.id}`} className="relative">
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setEditingContact(contact);
                    setEditDialogOpen(true);
                  }}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(contact)}
                    className="text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link href={`/contacts/${contact.id}`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.title}</p>
                    <p className="text-sm text-muted-foreground">{contact.company}</p>
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

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{contact.ventureCount} ventures</span>
                  <span>Added {format(new Date(contact.dateAdded), "MMM d, yyyy")}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <ContactDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialContact={editingContact || undefined}
        onSave={(contact) => {
          onContactsChange();
          setEditDialogOpen(false);
          setEditingContact(null);
        }}
      />
    </>
  );
}