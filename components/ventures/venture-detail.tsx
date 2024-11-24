"use client";

import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { getStoredVentures, updateVenture } from "@/lib/storage/ventures";
import { SpiderChart } from "@/components/ideas/spider-chart";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectResourcesSection } from "@/components/projects/resources/project-resources-section";
import { AttributesSection } from "@/components/attributes/attributes-section";
import { AttributeValue } from "@/lib/types/attributes";
import { RisksSection } from "./risks/risks-section";
import { AssumptionsSection } from "./assumptions/assumptions-section";
import { EventsSection } from "./events/events-section";
import { MeetingNotesSection } from "./meeting-notes/meeting-notes-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VentureDetailProps {
  id: string;
}

export function VentureDetail({ id }: VentureDetailProps) {
  const [venture, setVenture] = useState<Venture | null>(null);

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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/ventures">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold mb-2">{venture.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{venture.status}</Badge>
            <span>•</span>
            <span>Created on {format(new Date(venture.createdAt), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle>Metrics Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <SpiderChart metrics={venture.metrics} />
        </CardContent>
      </Card>

      {venture.attributeProfileId && (
        <AttributesSection
          attributeProfileId={venture.attributeProfileId}
          attributes={venture.attributes || []}
          onUpdate={handleAttributesUpdate}
        />
      )}

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

      <ProjectResourcesSection
        projectId={venture.id}
        resources={venture.resources || []}
        onUpdate={handleVentureUpdate}
      />
    </div>
  );
}