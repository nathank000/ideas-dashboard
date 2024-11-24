"use client";

import { useEffect, useState } from "react";
import { Contact } from "@/lib/types/venture";
import { getStoredContacts } from "@/lib/storage/contacts";
import { getStoredVentures } from "@/lib/storage/ventures";
import { ContactsTable } from "./contacts-table";
import { ContactsGrid } from "./contacts-grid";

interface ContactsViewProps {
  view: "list" | "grid";
}

export function ContactsView({ view }: ContactsViewProps) {
  const [contacts, setContacts] = useState<(Contact & { ventureCount: number })[]>([]);

  const loadContacts = () => {
    const loadedContacts = getStoredContacts();
    const ventures = getStoredVentures();

    // Calculate average sentiment for each contact
    const contactsWithAverageSentiment = loadedContacts.map(contact => {
      const contactVentures = ventures.filter(v => 
        v.contacts?.some(c => c.contactId === contact.id)
      );

      const sentiments = contactVentures.map(v => 
        v.contacts?.find(c => c.contactId === contact.id)?.sentiment
      ).filter((s): s is string => s !== undefined);

      const sentimentCounts = {
        positive: sentiments.filter(s => s === 'positive').length,
        negative: sentiments.filter(s => s === 'negative').length,
        neutral: sentiments.filter(s => s === 'neutral').length,
      };

      // Determine average sentiment
      let averageSentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      if (sentimentCounts.positive > sentimentCounts.negative && 
          sentimentCounts.positive > sentimentCounts.neutral) {
        averageSentiment = 'positive';
      } else if (sentimentCounts.negative > sentimentCounts.positive && 
                 sentimentCounts.negative > sentimentCounts.neutral) {
        averageSentiment = 'negative';
      }

      return {
        ...contact,
        sentiment: averageSentiment,
        ventureCount: contactVentures.length,
      };
    });

    setContacts(contactsWithAverageSentiment);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  if (view === "grid") {
    return <ContactsGrid contacts={contacts} onContactsChange={loadContacts} />;
  }

  return <ContactsTable contacts={contacts} onContactsChange={loadContacts} />;
}