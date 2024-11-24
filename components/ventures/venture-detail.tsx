"use client";

import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { getStoredVentures, updateVenture } from "@/lib/storage/ventures";
import { SpiderChart } from "./spider-chart";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourcesSection } from "./resources/resources-section";
import { AttributesSection } from "@/components/attributes/attributes-section";
import { RisksSection } from "./risks/risks-section";
import { AssumptionsSection } from "./assumptions/assumptions-section";
import { EventsSection } from "./events/events-section";
import { MeetingNotesSection } from "./meeting-notes/meeting-notes-section";
import { DecisionLogsSection } from "./decision-logs/decision-logs-section";
import { ContactsSection } from "./contacts/contacts-section";
import { NewVentureDialog } from "./new-venture-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AttributeValue } from "@/lib/types/attributes";
import { CheckCircle2, Circle } from "lucide-react";

interface VentureDetailProps {
  id: string;
}

export function VentureDetail({ id }: VentureDetailProps) {
  const [venture, setVenture] = useState<Venture | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    const ventures = getStoredVentures();
    const found = ventures.find((v) => v.id === id);
    if (found) {
      setVenture(found);
    }
  }, [id]);

  const handleVentureUpdate = () => {
    const ventures = getStoredVentures();
    const updated = ventures.find((v) => v.id === id);
    if (updated) {
      setVenture(updated);
    }
  };

  const handleAttributesUpdate = (profileId: string, attributes: AttributeValue[]) => {
    if (venture) {
      const updatedVenture = {
        ...venture,
        attributes,
        updatedAt: new Date(),
      };
      updateVenture(updatedVenture);
      setVenture(updatedVenture);
    }
  };

  if (!venture) {
    return <div>Venture not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/ventures">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{venture.title}</h1>
            {venture.active ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <Badge variant="secondary">{venture.status}</Badge>
        </div>
        <Button onClick={() => setShowEditDialog(true)}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Venture
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Venture Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">
                {venture.description || "No description provided."}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Created</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(venture.createdAt), "MMMM d, yyyy")}
              </p>
            </div>
            {venture.dueDate && (
              <div className="space-y-1">
                <h3 className="font-medium">Due Date</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(venture.dueDate), "MMMM d, yyyy")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metrics Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <SpiderChart metrics={venture.metrics} />
          </CardContent>
        </Card>
      </div>

      {venture.attributeProfileId && (
        <AttributesSection
          attributeProfileId={venture.attributeProfileId}
          attributes={venture.attributes || []}
          onUpdate={handleAttributesUpdate}
        />
      )}

      <ContactsSection
        ventureId={venture.id}
        contacts={venture.contacts || []}
        onUpdate={handleVentureUpdate}
      />

      <ResourcesSection
        ventureId={venture.id}
        resources={venture.resources || []}
        onUpdate={handleVentureUpdate}
      />

      <RisksSection
        ventureId={venture.id}
        risks={venture.risks || []}
        onUpdate={handleVentureUpdate}
      />

      <AssumptionsSection
        ventureId={venture.id}
        assumptions={venture.assumptions || []}
        onUpdate={handleVentureUpdate}
      />

      <EventsSection
        ventureId={venture.id}
        events={venture.events || []}
        onUpdate={handleVentureUpdate}
      />

      <MeetingNotesSection
        ventureId={venture.id}
        meetingNotes={venture.meetingNotes || []}
        onUpdate={handleVentureUpdate}
      />

      <DecisionLogsSection
        ventureId={venture.id}
        decisionLogs={venture.decisionLogs || []}
        onUpdate={handleVentureUpdate}
      />

      <NewVentureDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialVenture={venture}
        onVentureSaved={handleVentureUpdate}
      />
    </div>
  );
}