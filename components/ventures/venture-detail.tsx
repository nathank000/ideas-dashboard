"use client";

import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { getStoredVentures, updateVenture } from "@/lib/storage/ventures";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { NewVentureDialog } from "./new-venture-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SpiderChart } from "@/components/ideas/spider-chart";
import { ProjectResourcesSection } from "@/components/projects/resources/project-resources-section";
import { AttributesSection } from "@/components/attributes/attributes-section";
import { AttributeValue } from "@/lib/types/attributes";
import { RisksSection } from "./risks/risks-section";

interface VentureDetailProps {
  id: string;
}

export function VentureDetail({ id }: VentureDetailProps) {
  const router = useRouter();
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

  const handleActiveToggle = () => {
    if (venture) {
      const updatedVenture = {
        ...venture,
        active: !venture.active,
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
          <h1 className="text-3xl font-bold">{venture.title}</h1>
          <Badge variant="secondary">{venture.status}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={venture.active}
              onCheckedChange={handleActiveToggle}
            />
            <span className="text-sm">Active</span>
          </div>
          <Button onClick={() => setShowEditDialog(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Venture
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Venture Details</CardTitle>
            <CardDescription>
              Created on {format(new Date(venture.createdAt), "MMMM d, yyyy")}
            </CardDescription>
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
            <CardDescription>People working on this venture</CardDescription>
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

      <ProjectResourcesSection
        projectId={venture.id}
        resources={venture.resources || []}
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