"use client";

import { useEffect, useState } from "react";
import { Project } from "@/lib/types/project";
import { getStoredProjects, updateProject } from "@/lib/storage/projects";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewProjectDialog } from "./new-project-dialog";
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
import { ProjectResourcesSection } from "./resources/project-resources-section";
import { AttributesSection } from "@/components/attributes/attributes-section";
import { AttributeValue } from "@/lib/types/attributes";

interface ProjectDetailProps {
  id: string;
}

export function ProjectDetail({ id }: ProjectDetailProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    const projects = getStoredProjects();
    const found = projects.find((p) => p.id === id);
    if (found) {
      setProject(found);
    }
  }, [id]);

  const handleProjectUpdate = () => {
    const projects = getStoredProjects();
    const updated = projects.find((p) => p.id === id);
    if (updated) {
      setProject(updated);
    }
  };

  const handleAttributesUpdate = (profileId: string, attributes: AttributeValue[]) => {
    if (project) {
      const updatedProject = {
        ...project,
        attributes,
        updatedAt: new Date(),
      };
      updateProject(updatedProject);
      setProject(updatedProject);
    }
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <Badge variant="secondary">{project.status}</Badge>
        </div>
        <Button onClick={() => setShowEditDialog(true)}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Created on {format(new Date(project.createdAt), "MMMM d, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">
                {project.description || "No description provided."}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Due Date</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(project.dueDate), "MMMM d, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>People working on this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.team.map((member, index) => (
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

      {project.attributeProfileId && (
        <AttributesSection
          attributeProfileId={project.attributeProfileId}
          attributes={project.attributes || []}
          onUpdate={handleAttributesUpdate}
        />
      )}

      <ProjectResourcesSection
        projectId={project.id}
        resources={project.resources || []}
        onUpdate={handleProjectUpdate}
      />

      <NewProjectDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialProject={project}
        onProjectSaved={handleProjectUpdate}
      />
    </div>
  );
}