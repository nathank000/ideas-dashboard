"use client";

import { Venture } from "@/lib/types/venture";
import { AttributeValue } from "@/lib/types/attributes";
import { AttributesSection } from "@/components/attributes/attributes-section";
import { ScopeSection } from "./scope/scope-section";
import { ContactsSection } from "./contacts/contacts-section";
import { ResourcesSection } from "./resources/resources-section";
import { RisksSection } from "./risks/risks-section";
import { AssumptionsSection } from "./assumptions/assumptions-section";
import { EventsSection } from "./events/events-section";
import { MeetingNotesSection } from "./meeting-notes/meeting-notes-section";
import { DecisionLogsSection } from "./decision-logs/decision-logs-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VentureSectionsProps {
  venture: Venture;
  viewMode: "tabs" | "list";
  onUpdate: () => void;
  onAttributesUpdate: (profileId: string, attributes: AttributeValue[]) => void;
}

export function VentureSections({ 
  venture, 
  viewMode,
  onUpdate,
  onAttributesUpdate 
}: VentureSectionsProps) {
  const sections = [
    {
      id: "scope",
      title: "Scope",
      content: (
        <ScopeSection
          ventureId={venture.id}
          scopeItems={venture.scopeItems || []}
          onUpdate={onUpdate}
        />
      )
    },
    {
      id: "contacts",
      title: "Contacts",
      content: (
        <ContactsSection
          ventureId={venture.id}
          contacts={venture.contacts || []}
          onUpdate={onUpdate}
        />
      )
    },
    // ... Add other sections
  ];

  if (viewMode === "tabs") {
    return (
      <Tabs defaultValue="scope" className="space-y-6">
        <TabsList>
          {sections.map(section => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map(section => (
          <TabsContent key={section.id} value={section.id}>
            {section.content}
          </TabsContent>
        ))}
      </Tabs>
    );
  }

  return (
    <div className="space-y-6">
      {venture.attributeProfileId && (
        <AttributesSection
          attributeProfileId={venture.attributeProfileId}
          attributes={venture.attributes || []}
          onUpdate={onAttributesUpdate}
        />
      )}
      {sections.map(section => (
        <div key={section.id}>{section.content}</div>
      ))}
    </div>
  );
}