"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Contact, VentureContact } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ContactCard } from "./contact-card";
import { ContactDialog } from "./contact-dialog";
import { ContactDetailsDialog } from "./contact-details-dialog";
import { addVentureContact, deleteVentureContact, updateVentureContact } from "@/lib/storage/ventures";
import { saveContact, updateContact, getStoredContacts } from "@/lib/storage/contacts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ContactsSectionProps {
  ventureId: string;
  contacts: VentureContact[];
  onUpdate: () => void;
}

export function ContactsSection({
  ventureId,
  contacts,
  onUpdate,
}: ContactsSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{contact: Contact, ventureContact: VentureContact} | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "negative" | "neutral">("all");

  const allContacts = getStoredContacts();
  const contactsWithDetails = contacts
    .map(ventureContact => ({
      contact: allContacts.find(c => c.id === ventureContact.contactId),
      ventureContact
    }))
    .filter((item): item is {contact: Contact, ventureContact: VentureContact} => item.contact !== undefined);

  const filteredContacts = contactsWithDetails.filter(({ ventureContact }) => 
    sentimentFilter === "all" || ventureContact.sentiment === sentimentFilter
  );

  const handleSave = (contact: Contact, sentiment: VentureContact['sentiment']) => {
    if (selectedContact) {
      // Update the contact globally
      updateContact(contact);
      // Update the contact's sentiment in the venture
      updateVentureContact(ventureId, contact.id, sentiment);
    } else {
      // Save or update the contact globally
      saveContact(contact);
      // Add the contact to the venture with sentiment
      addVentureContact(ventureId, contact, sentiment);
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
              .sort((a, b) => new Date(b.ventureContact.dateAdded).getTime() - new Date(a.ventureContact.dateAdded).getTime())
              .map(({ contact, ventureContact }) => (
                <ContactCard
                  key={`${contact.id}-${ventureId}`}
                  contact={contact}
                  sentiment={ventureContact.sentiment}
                  dateAdded={ventureContact.dateAdded}
                  onViewDetails={() => {
                    setSelectedContact({ contact, ventureContact });
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
        existingContactIds={contacts.map(c => c.contactId)} // Pass existing contact IDs
      />

      {selectedContact && (
        <ContactDetailsDialog
          contact={selectedContact.contact}
          sentiment={selectedContact.ventureContact.sentiment}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onEdit={(contact, sentiment) => {
            handleSave(contact, sentiment);
            setDetailsOpen(false);
          }}
          onDelete={() => {
            handleDelete(selectedContact.contact.id);
            setDetailsOpen(false);
          }}
          onSentimentChange={(sentiment) => {
            updateVentureContact(ventureId, selectedContact.contact.id, sentiment);
            onUpdate();
          }}
        />
      )}
    </Card>
  );
}