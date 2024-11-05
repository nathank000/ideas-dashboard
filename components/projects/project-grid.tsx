"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { NewProjectCard } from "@/components/projects/new-project-card";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types/project";
import { getStoredProjects } from "@/lib/storage/projects";

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NewProjectCard onProjectCreated={() => setProjects(getStoredProjects())} />
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project}
          onProjectUpdated={() => setProjects(getStoredProjects())}
        />
      ))}
    </div>
  );
}