"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Initiative } from "@/lib/types/initiative";
import { saveInitiative, updateInitiative } from "@/lib/storage/initiatives";
import { toast } from "sonner";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";
import { InitiativeForm } from "./initiative-form";

interface InitiativeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialInitiative?: Initiative;
  onSave?: () => void;
}

export function InitiativeDialog({
  open,
  onOpenChange,
  initialInitiative,
  onSave,
}: InitiativeDialogProps) {
  const router = useRouter();

  const handleSubmit = (formData: Omit<Initiative, "id" | "createdAt" | "updatedAt">) => {
    const initiative: Initiative = {
      id: initialInitiative?.id || crypto.randomUUID(),
      ...formData,
      createdAt: initialInitiative?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialInitiative) {
      updateInitiative(initiative);
      toast.success("Initiative updated successfully");
    } else {
      saveInitiative(initiative);
      toast.success("Initiative created successfully");
    }

    if (onSave) {
      onSave();
    }
    router.refresh();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialInitiative ? "Edit Initiative" : "New Initiative"}
          </DialogTitle>
        </DialogHeader>
        <InitiativeForm
          initialValues={initialInitiative}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}