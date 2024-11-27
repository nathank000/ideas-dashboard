"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Initiative, initiativeColors } from "@/lib/types/initiative";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface InitiativeFormProps {
  initialValues?: Initiative;
  onSubmit: (data: Omit<Initiative, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const iconOptions = [
  "Target", "Flag", "Rocket", "Zap", "Star", "Award", "Compass", "Map", 
  "Navigation", "Milestone", "Mountain", "Trophy", "Crown", "Lightbulb"
];

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
] as const;

export function InitiativeForm({
  initialValues,
  onSubmit,
  onCancel,
}: InitiativeFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [icon, setIcon] = useState(initialValues?.icon || "Target");
  const [color, setColor] = useState<Initiative["color"]>(initialValues?.color || "blue");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      icon,
      color,
    });
  };

  const IconComponent = Icons[icon as keyof typeof Icons];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter initiative title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this initiative"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Icon</Label>
          <Select value={icon} onValueChange={setIcon}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-1 rounded",
                    initiativeColors[color]
                  )}>
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                  </div>
                  {icon}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((iconName) => {
                const Icon = Icons[iconName as keyof typeof Icons];
                return (
                  <SelectItem key={iconName} value={iconName}>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-1 rounded",
                        initiativeColors[color]
                      )}>
                        {Icon && <Icon className="h-4 w-4" />}
                      </div>
                      {iconName}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Color</Label>
          <Select value={color} onValueChange={(value: Initiative["color"]) => setColor(value)}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-2 rounded",
                    initiativeColors[color]
                  )}>
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                  </div>
                  {colorOptions.find(opt => opt.value === color)?.label}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2 rounded",
                      initiativeColors[option.value]
                    )}>
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                    </div>
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialValues ? "Save Changes" : "Create Initiative"}
        </Button>
      </div>
    </form>
  );
}