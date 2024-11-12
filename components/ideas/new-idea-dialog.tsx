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
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Idea, IdeaMetrics, metricDefinitions } from "@/lib/types/idea";
import { Info } from "lucide-react";
import { Editor } from "@/components/ideas/editor";
import { saveIdea } from "@/lib/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AttributeProfile, AttributeValue } from "@/lib/types/attributes";
import { getStoredAttributeProfiles } from "@/lib/storage/attributes";

interface NewIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewIdeaDialog({ open, onOpenChange }: NewIdeaDialogProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attributeProfileId, setAttributeProfileId] = useState<string>("none");
  const [attributeProfiles, setAttributeProfiles] = useState<AttributeProfile[]>([]);
  const [metrics, setMetrics] = useState<IdeaMetrics>({
    technicalFeasibility: 5,
    timeToMvp: 5,
    costToDevelop: 5,
    marketDemand: 5,
    scalability: 5,
    maintenanceComplexity: 5,
    industryFamiliarity: 5,
    industryRestrictions: 5,
    prototypability: 5,
    assumptions: 5,
    userAdjacency: 5,
  });

  useEffect(() => {
    setAttributeProfiles(getStoredAttributeProfiles());
  }, []);

  const handleMetricChange = (metric: keyof IdeaMetrics, value: number[]) => {
    setMetrics((prev) => ({
      ...prev,
      [metric]: value[0],
    }));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your idea");
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

    const newIdea: Idea = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description,
      metrics,
      resources: [],
      attributeProfileId: attributeProfileId === "none" ? undefined : attributeProfileId,
      attributes: initialAttributes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveIdea(newIdea);
    toast.success("Idea created successfully!");
    router.refresh();
    onOpenChange(false);
    setTitle("");
    setDescription("");
    setAttributeProfileId("none");
    setMetrics({
      technicalFeasibility: 5,
      timeToMvp: 5,
      costToDevelop: 5,
      marketDemand: 5,
      scalability: 5,
      maintenanceComplexity: 5,
      industryFamiliarity: 5,
      industryRestrictions: 5,
      prototypability: 5,
      assumptions: 5,
      userAdjacency: 5,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Idea</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter idea title"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Editor value={description} onChange={setDescription} />
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Metrics</h3>
            <TooltipProvider>
              {(Object.keys(metrics) as Array<keyof IdeaMetrics>).map((metric) => (
                <div key={metric} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={metric} className="capitalize">
                      {metric.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metricDefinitions[metric]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    id={metric}
                    min={1}
                    max={10}
                    step={1}
                    value={[metrics[metric]]}
                    onValueChange={(value) => handleMetricChange(metric, value)}
                  />
                </div>
              ))}
            </TooltipProvider>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Idea</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}