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
import { FileText, Link as LinkIcon, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";

interface ResourceCardProps {
  resource: IdeaResource;
  onEdit: (resource: IdeaResource) => void;
  onDelete: (resourceId: string) => void;
}

export function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            {resource.type === "file" ? (
              <FileText className="h-4 w-4" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
            {resource.title}
          </CardTitle>
          <CardDescription>
            Added {format(new Date(resource.createdAt), "MMM d, yyyy")}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(resource)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(resource.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
        <Button variant="link" className="px-0" asChild>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Open {resource.type === "file" ? "file" : "link"}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}