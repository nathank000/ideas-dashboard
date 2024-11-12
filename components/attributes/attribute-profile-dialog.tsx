"use client";

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
import { AttributeDefinition, AttributeProfile, AttributeType } from "@/lib/types/attributes";
import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { saveAttributeProfile, updateAttributeProfile } from "@/lib/storage/attributes";
import { toast } from "sonner";

interface AttributeProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProfile?: AttributeProfile;
  onSave: () => void;
}

export function AttributeProfileDialog({
  open,
  onOpenChange,
  initialProfile,
  onSave,
}: AttributeProfileDialogProps) {
  const [name, setName] = useState(initialProfile?.name || "");
  const [description, setDescription] = useState(initialProfile?.description || "");
  const [attributes, setAttributes] = useState<AttributeDefinition[]>(
    initialProfile?.attributes || []
  );

  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      {
        id: crypto.randomUUID(),
        name: "",
        type: "text",
      },
    ]);
  };

  const handleRemoveAttribute = (id: string) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  const handleAttributeChange = (
    id: string,
    field: keyof AttributeDefinition,
    value: string
  ) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, [field]: value } : attr
      )
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Please enter a profile name");
      return;
    }

    if (attributes.some((attr) => !attr.name.trim())) {
      toast.error("Please fill in all attribute names");
      return;
    }

    const profile: AttributeProfile = {
      id: initialProfile?.id || crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      attributes,
    };

    if (initialProfile) {
      updateAttributeProfile(profile);
      toast.success("Profile updated successfully");
    } else {
      saveAttributeProfile(profile);
      toast.success("Profile created successfully");
    }

    onSave();
    onOpenChange(false);
    if (!initialProfile) {
      setName("");
      setDescription("");
      setAttributes([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialProfile ? "Edit Profile" : "New Attribute Profile"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Profile Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter profile name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this attribute profile"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Attributes</h3>
              <Button onClick={handleAddAttribute}>
                <Plus className="h-4 w-4 mr-2" />
                Add Attribute
              </Button>
            </div>

            <div className="space-y-4">
              {attributes.map((attr) => (
                <div key={attr.id} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={attr.name}
                      onChange={(e) =>
                        handleAttributeChange(attr.id, "name", e.target.value)
                      }
                      placeholder="Attribute name"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={attr.type}
                      onValueChange={(value: AttributeType) =>
                        handleAttributeChange(attr.id, "type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="longtext">Long Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => handleRemoveAttribute(attr.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {initialProfile ? "Save Changes" : "Create Profile"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}