"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectResource } from "@/lib/types/project";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProjectResourceCard } from "./project-resource-card";
import { ProjectResourceDialog } from "./project-resource-dialog";
import { addProjectResource, deleteProjectResource, updateProjectResource } from "@/lib/storage/projects";

interface ProjectResourcesSectionProps {
  projectId: string;
  resources: ProjectResource[];
  onUpdate: () => void;
}

export function ProjectResourcesSection({
  projectId,
  resources,
  onUpdate,
}: ProjectResourcesSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ProjectResource | undefined>();

  const handleSave = (resource: ProjectResource) => {
    if (editingResource) {
      updateProjectResource(projectId, resource);
    } else {
      addProjectResource(projectId, resource);
    }
    onUpdate();
    setEditingResource(undefined);
  };

  const handleEdit = (resource: ProjectResource) => {
    setEditingResource(resource);
    setDialogOpen(true);
  };

  const handleDelete = (resourceId: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      deleteProjectResource(projectId, resourceId);
      onUpdate();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Resources</CardTitle>
            <CardDescription>
              Add links and files related to this project
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
              <ProjectResourceCard
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

      <ProjectResourceDialog
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