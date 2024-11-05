"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Project } from "@/lib/types/project";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { NewProjectDialog } from "./new-project-dialog";
import { deleteProject } from "@/lib/storage/projects";

interface ProjectCardProps {
  project: Project;
  onProjectUpdated: () => void;
}

export function ProjectCard({ project, onProjectUpdated }: ProjectCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(project.id);
      onProjectUpdated();
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{project.title}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{project.status}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Due:</span>
            <span>{format(new Date(project.dueDate), "MMM d, yyyy")}</span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex -space-x-2">
            {project.team.map((member, i) => (
              <Avatar key={i} className="border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </CardFooter>
      </Card>

      <NewProjectDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialProject={project}
        onProjectSaved={onProjectUpdated}
      />
    </>
  );
}