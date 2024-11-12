"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { NewProjectDialog } from "./new-project-dialog";

interface NewProjectCardProps {
  onProjectCreated: () => void;
}

export function NewProjectCard({ onProjectCreated }: NewProjectCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Card
        className="flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setShowDialog(true)}
      >
        <div className="p-8 text-center">
          <Plus className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium">New Project</p>
          <p className="text-sm text-muted-foreground">Create a new project</p>
        </div>
      </Card>

      <NewProjectDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onProjectSaved={onProjectCreated}
      />
    </>
  );
}