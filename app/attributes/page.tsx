"use client";

import { AttributeProfilesView } from "@/components/attributes/attribute-profiles-view";

export default function AttributesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Attribute Profiles</h1>
      </div>
      <AttributeProfilesView />
    </div>
  );
}