"use client";

import { ProjectDetail } from "@/components/projects/project-detail";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <ProjectDetail id={params.id} />
    </div>
  );
}