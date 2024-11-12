"use client";

import { useEffect, useState } from "react";
import { AttributeProfile } from "@/lib/types/attributes";
import { getStoredAttributeProfiles } from "@/lib/storage/attributes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AttributeProfileCard } from "./attribute-profile-card";
import { AttributeProfileDialog } from "./attribute-profile-dialog";

export function AttributeProfilesView() {
  const [profiles, setProfiles] = useState<AttributeProfile[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<AttributeProfile | undefined>();

  useEffect(() => {
    setProfiles(getStoredAttributeProfiles());
  }, []);

  const handleProfileUpdate = () => {
    setProfiles(getStoredAttributeProfiles());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <AttributeProfileCard
            key={profile.id}
            profile={profile}
            onEdit={(profile) => {
              setEditingProfile(profile);
              setDialogOpen(true);
            }}
            onDelete={handleProfileUpdate}
          />
        ))}
        {profiles.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">
            No attribute profiles yet. Create your first one!
          </p>
        )}
      </div>

      <AttributeProfileDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingProfile(undefined);
        }}
        initialProfile={editingProfile}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}