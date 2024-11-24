"use client";

import { ContactsView } from "@/components/contacts/contacts-view";
import { ContactsFilters } from "@/components/contacts/contacts-filters";
import { useState } from "react";

export default function ContactsPage() {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>
      </div>
      <ContactsFilters
        view={view}
        onViewChange={setView}
      />
      <ContactsView view={view} />
    </div>
  );
}