"use client";

import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectFilters } from "@/components/projects/project-filters";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>
      <ProjectFilters />
      <ProjectGrid />
    </div>
  );
}