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
import { IdeaResource } from "@/lib/types/idea";
import { useState } from "react";

interface ResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (resource: IdeaResource) => void;
  initialResource?: IdeaResource;
}

export function ResourceDialog({
  open,
  onOpenChange,
  onSave,
  initialResource,
}: ResourceDialogProps) {
  const [title, setTitle] = useState(initialResource?.title || "");
  const [description, setDescription] = useState(initialResource?.description || "");
  const [type, setType] = useState<"link" | "file">(initialResource?.type || "link");
  const [url, setUrl] = useState(initialResource?.url || "");

  const handleSubmit = () => {
    if (!title.trim() || !url.trim()) return;

    const resource: IdeaResource = {
      id: initialResource?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      type,
      url: url.trim(),
      createdAt: initialResource?.createdAt || new Date(),
    };

    onSave(resource);
    onOpenChange(false);
    if (!initialResource) {
      setTitle("");
      setDescription("");
      setType("link");
      setUrl("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialResource ? "Edit Resource" : "Add Resource"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resource title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter resource description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: "link" | "file") => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="file">File</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">
              {type === "file" ? "File URL" : "Link URL"}
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                type === "file"
                  ? "Enter file URL or upload file"
                  : "Enter link URL"
              }
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialResource ? "Save Changes" : "Add Resource"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}