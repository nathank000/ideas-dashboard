"use client";

import { useEffect, useState } from "react";
import { Initiative } from "@/lib/types/initiative";
import { getStoredInitiatives } from "@/lib/storage/initiatives";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InitiativeCard } from "@/components/initiatives/initiative-card";
import { InitiativeDialog } from "@/components/initiatives/initiative-dialog";

export default function InitiativesPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInitiative, setEditingInitiative] = useState<Initiative | undefined>();

  useEffect(() => {
    setInitiatives(getStoredInitiatives());
  }, []);

  const handleInitiativeUpdate = () => {
    setInitiatives(getStoredInitiatives());
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Initiatives</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Initiative
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initiatives.map((initiative) => (
          <InitiativeCard
            key={initiative.id}
            initiative={initiative}
            onEdit={(initiative) => {
              setEditingInitiative(initiative);
              setDialogOpen(true);
            }}
            onDelete={handleInitiativeUpdate}
          />
        ))}
        {initiatives.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">
            No initiatives yet. Create your first one!
          </p>
        )}
      </div>

      <InitiativeDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingInitiative(undefined);
        }}
        initialInitiative={editingInitiative}
        onSave={handleInitiativeUpdate}
      />
    </div>
  );
}