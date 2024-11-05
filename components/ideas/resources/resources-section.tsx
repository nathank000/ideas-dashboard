"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IdeaResource } from "@/lib/types/idea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ResourceCard } from "./resource-card";
import { ResourceDialog } from "./resource-dialog";
import { addResource, deleteResource, updateResource } from "@/lib/storage";

interface ResourcesSectionProps {
  ideaId: string;
  resources: IdeaResource[];
  onUpdate: () => void;
}

export function ResourcesSection({
  ideaId,
  resources,
  onUpdate,
}: ResourcesSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<IdeaResource | undefined>();

  const handleSave = (resource: IdeaResource) => {
    if (editingResource) {
      updateResource(ideaId, resource);
    } else {
      addResource(ideaId, resource);
    }
    onUpdate();
    setEditingResource(undefined);
  };

  const handleEdit = (resource: IdeaResource) => {
    setEditingResource(resource);
    setDialogOpen(true);
  };

  const handleDelete = (resourceId: string) => {
    deleteResource(ideaId, resourceId);
    onUpdate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Resources</CardTitle>
            <CardDescription>
              Add links and files related to this idea
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