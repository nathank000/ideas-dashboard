"use client";

import { ContactDetail } from "@/components/contacts/contact-detail";

export default function ContactDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <ContactDetail id={params.id} />
    </div>
  );
}