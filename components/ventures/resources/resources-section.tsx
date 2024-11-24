"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Venture } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ResourceCard } from "./resource-card";
import { ResourceDialog } from "./resource-dialog";
import { updateVenture, getStoredVentures } from "@/lib/storage/ventures";

interface ResourcesSectionProps {
  ventureId: string;
  resources: Venture["resources"];
  onUpdate: () => void;
}

export function ResourcesSection({
  ventureId,
  resources,
  onUpdate,
}: ResourcesSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Venture["resources"][0] | undefined>();

  const handleSave = (resource: Venture["resources"][0]) => {
    const ventures = getStoredVentures();
    const venture = ventures.find((v) => v.id === ventureId);
    if (venture) {
      if (editingResource) {
        venture.resources = venture.resources.map((r) =>
          r.id === resource.id ? resource : r
        );
      } else {
        venture.resources = [...(venture.resources || []), resource];
      }
      venture.updatedAt = new Date();
      updateVenture(venture);
      onUpdate();
    }
    setEditingResource(undefined);
  };

  const handleEdit = (resource: Venture["resources"][0]) => {
    setEditingResource(resource);
    setDialogOpen(true);
  };

  const handleDelete = (resourceId: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      const ventures = getStoredVentures();
      const venture = ventures.find((v) => v.id === ventureId);
      if (venture) {
        venture.resources = venture.resources.filter((r) => r.id !== resourceId);
        venture.updatedAt = new Date();
        updateVenture(venture);
        onUpdate();
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Resources</CardTitle>
            <CardDescription>
              Add links and files related to this venture
            </CardDescription>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources?.length > 0 ? (
            resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No resources added yet
            </p>
          )}
        </div>
      </CardContent>

      <ResourceDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingResource(undefined);
        }}
        onSave={handleSave}
        initialResource={editingResource}
      />
    </Card>
  );
}