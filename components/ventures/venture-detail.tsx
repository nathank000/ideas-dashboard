"use client";

import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { getStoredVentures, updateVenture } from "@/lib/storage/ventures";
import { format, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewVentureDialog } from "./new-venture-dialog";
import { RisksSection } from "./risks/risks-section";
import { AssumptionsSection } from "./assumptions/assumptions-section";
import { EventsSection } from "./events/events-section";
import { MeetingNotesSection } from "./meeting-notes/meeting-notes-section";
import { DecisionLogsSection } from "./decision-logs/decision-logs-section";
import { ResourcesSection } from "./resources/resources-section";
import { AttributesSection } from "@/components/attributes/attributes-section";
import { AttributeValue } from "@/lib/types/attributes";

interface VentureDetailProps {
  id: string;
}

export function VentureDetail({ id }: VentureDetailProps) {
  const [venture, setVenture] = useState<Venture | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const loadVenture = () => {
    const ventures = getStoredVentures();
    const found = ventures.find((v) => v.id === id);
    if (found) {
      setVenture(found);
    }
  };

  useEffect(() => {
    loadVenture();
  }, [id]);

  const handleVentureUpdate = () => {
    loadVenture();
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

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, "MMMM d, yyyy") : "Invalid date";
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
          <h1 className="text-3xl font-bold">{venture.title}</h1>
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{venture.progress}%</span>
              </div>
              <Progress value={venture.progress} />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Due Date</h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(venture.dueDate)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {venture.team.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">Team Member</p>
                  </div>
                </div>
              ))}
            </div>
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