"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Contact } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ContactCard } from "./contact-card";
import { ContactDialog } from "./contact-dialog";
import { ContactDetailsDialog } from "./contact-details-dialog";
import { addVentureContact, deleteVentureContact, updateVentureContact } from "@/lib/storage/ventures";
import { saveContact, updateContact } from "@/lib/storage/contacts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ContactsSectionProps {
  ventureId: string;
  contacts: Contact[];
  onUpdate: () => void;
}

export function ContactsSection({
  ventureId,
  contacts,
  onUpdate,
}: ContactsSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "negative" | "neutral">("all");

  const filteredContacts = contacts.filter(contact => 
    sentimentFilter === "all" || contact.sentiment === sentimentFilter
  );

  const handleSave = (contact: Contact) => {
    if (selectedContact) {
      // Update the contact globally
      updateContact(contact);
      // Update the contact in the venture
      updateVentureContact(ventureId, contact);
    } else {
      // Save or update the contact globally
      saveContact(contact);
      // Add the contact to the venture
      addVentureContact(ventureId, contact);
    }
    onUpdate();
    setSelectedContact(null);
  };

  const handleDelete = (contactId: string) => {
    if (confirm("Are you sure you want to remove this contact from the venture?")) {
      deleteVentureContact(ventureId, contactId);
      onUpdate();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>
              Track important contacts and relationships
            </CardDescription>
          </div>
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup 
          type="single" 
          value={sentimentFilter} 
          onValueChange={(value) => value && setSentimentFilter(value as typeof sentimentFilter)}
          className="justify-start"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="positive">Positive</ToggleGroupItem>
          <ToggleGroupItem value="negative">Negative</ToggleGroupItem>
          <ToggleGroupItem value="neutral">Neutral</ToggleGroupItem>
        </ToggleGroup>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredContacts.length > 0 ? (
            filteredContacts
              .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
              .map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onViewDetails={(contact) => {
                    setSelectedContact(contact);
                    setDetailsOpen(true);
                  }}
                />
              ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
              No contacts match the current filter
            </p>
          )}
        </div>
      </CardContent>

      <ContactDialog
        open={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        onSave={handleSave}
      />

      {selectedContact && (
        <ContactDetailsDialog
          contact={selectedContact}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onEdit={(contact) => {
            handleSave(contact);
            setDetailsOpen(false);
          }}
          onDelete={() => {
            handleDelete(selectedContact.id);
            setDetailsOpen(false);
          }}
        />
      )}
    </Card>
  );
}