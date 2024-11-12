"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/lib/types/project";
import { saveProject, updateProject } from "@/lib/storage/projects";
import { toast } from "sonner";
import { AttributeProfile, AttributeValue } from "@/lib/types/attributes";
import { getStoredAttributeProfiles } from "@/lib/storage/attributes";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProject?: Project;
  onProjectSaved: () => void;
}

export function NewProjectDialog({
  open,
  onOpenChange,
  initialProject,
  onProjectSaved,
}: NewProjectDialogProps) {
  const [title, setTitle] = useState(initialProject?.title || "");
  const [description, setDescription] = useState(initialProject?.description || "");
  const [status, setStatus] = useState<Project["status"]>(
    initialProject?.status || "planning"
  );
  const [dueDate, setDueDate] = useState(initialProject?.dueDate || "");
  const [progress, setProgress] = useState(initialProject?.progress || 0);
  const [attributeProfileId, setAttributeProfileId] = useState<string>(
    initialProject?.attributeProfileId || "none"
  );
  const [attributeProfiles, setAttributeProfiles] = useState<AttributeProfile[]>([]);

  useEffect(() => {
    setAttributeProfiles(getStoredAttributeProfiles());
  }, []);

  const handleSubmit = () => {
    if (!title.trim() || !dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    let initialAttributes: AttributeValue[] = [];
    if (attributeProfileId !== "none") {
      const profile = attributeProfiles.find(p => p.id === attributeProfileId);
      if (profile) {
        initialAttributes = profile.attributes.map(attr => ({
          definitionId: attr.id,
          value: attr.type === 'number' ? 0 : ''
        }));
      }
    }

    const projectData: Project = {
      id: initialProject?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status,
      progress,
      dueDate,
      team: initialProject?.team || [
        { name: "John Doe", avatar: "https://github.com/shadcn.png" },
      ],
      resources: initialProject?.resources || [],
      attributeProfileId: attributeProfileId === "none" ? undefined : attributeProfileId,
      attributes: initialAttributes,
      createdAt: initialProject?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialProject) {
      updateProject(projectData);
      toast.success("Project updated successfully");
    } else {
      saveProject(projectData);
      toast.success("Project created successfully");
    }

    onProjectSaved();
    onOpenChange(false);
    if (!initialProject) {
      setTitle("");
      setDescription("");
      setStatus("planning");
      setDueDate("");
      setProgress(0);
      setAttributeProfileId("none");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialProject ? "Edit Project" : "Create New Project"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value: Project["status"]) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date</Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Attribute Profile</Label>
            <Select value={attributeProfileId} onValueChange={setAttributeProfileId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an attribute profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {attributeProfiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialProject ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}