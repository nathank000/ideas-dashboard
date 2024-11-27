"use client";

import { Button } from "@/components/ui/button";
import { Initiative } from "@/lib/types/initiative";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { InitiativeDialog } from "./initiative-dialog";

interface InitiativeHeaderProps {
  initiative: Initiative;
  onUpdate: () => void;
}

export function InitiativeHeader({ initiative, onUpdate }: InitiativeHeaderProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/initiatives">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{initiative.title}</h1>
        </div>
        <Button onClick={() => setShowEditDialog(true)}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Initiative
        </Button>
      </div>

      <p className="text-muted-foreground">{initiative.description}</p>

      <InitiativeDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialInitiative={initiative}
        onSave={onUpdate}
      />
    </>
  );
}