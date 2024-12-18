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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Editor } from "@/components/ideas/editor";
import { saveVenture, updateVenture } from "@/lib/storage/ventures";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AttributeProfile, AttributeValue } from "@/lib/types/attributes";
import { getStoredAttributeProfiles } from "@/lib/storage/attributes";
import { Venture } from "@/lib/types/venture";
import { metricDefinitions } from "@/lib/types/idea";
import { Initiative } from "@/lib/types/initiative";
import { getInitiativesForVenture, getStoredInitiatives, linkVentureToInitiatives } from "@/lib/storage/initiatives";
import { Badge } from "@/components/ui/badge";

interface NewVentureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialVenture?: Venture;
  onVentureSaved?: () => void;
}

export function NewVentureDialog({
  open,
  onOpenChange,
  initialVenture,
  onVentureSaved,
}: NewVentureDialogProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialVenture?.title || "");
  const [description, setDescription] = useState(initialVenture?.description || "");
  const [attributeProfileId, setAttributeProfileId] = useState<string>(
    initialVenture?.attributeProfileId || "none"
  );
  const [attributeProfiles, setAttributeProfiles] = useState<AttributeProfile[]>([]);
  const [status, setStatus] = useState<Venture["status"]>(
    initialVenture?.status || "planning"
  );
  const [progress, setProgress] = useState(initialVenture?.progress || 0);
  const [dueDate, setDueDate] = useState(initialVenture?.dueDate || "");
  const [active, setActive] = useState(initialVenture?.active || false);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [selectedInitiativeIds, setSelectedInitiativeIds] = useState<string[]>([]);
  const [metrics, setMetrics] = useState(
    initialVenture?.metrics || {
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
    }
  );

  useEffect(() => {
    setAttributeProfiles(getStoredAttributeProfiles());
    setInitiatives(getStoredInitiatives());

    // Load linked initiatives when editing
    if (initialVenture) {
      const linkedInitiativeIds = getInitiativesForVenture(initialVenture.id);
      setSelectedInitiativeIds(linkedInitiativeIds);
    }
  }, [initialVenture]);

  const handleMetricChange = (metric: keyof typeof metrics, value: number[]) => {
    setMetrics((prev) => ({
      ...prev,
      [metric]: value[0],
    }));
  };

  const handleInitiativeToggle = (initiativeId: string) => {
    setSelectedInitiativeIds(prev => 
      prev.includes(initiativeId)
        ? prev.filter(id => id !== initiativeId)
        : [...prev, initiativeId]
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your venture");
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

    const ventureData: Venture = {
      id: initialVenture?.id || crypto.randomUUID(),
      title: title.trim(),
      description,
      metrics,
      resources: initialVenture?.resources || [],
      attributeProfileId: attributeProfileId === "none" ? undefined : attributeProfileId,
      attributes: initialVenture?.attributes || initialAttributes,
      team: initialVenture?.team || [
        { name: "John Doe", avatar: "https://github.com/shadcn.png" },
      ],
      progress,
      dueDate,
      status,
      active,
      risks: initialVenture?.risks || [],
      assumptions: initialVenture?.assumptions || [],
      events: initialVenture?.events || [],
      meetingNotes: initialVenture?.meetingNotes || [],
      decisionLogs: initialVenture?.decisionLogs || [],
      contacts: initialVenture?.contacts || [],
      createdAt: initialVenture?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialVenture) {
      updateVenture(ventureData);
      toast.success("Venture updated successfully!");
    } else {
      saveVenture(ventureData);
      toast.success("Venture created successfully!");
    }

    // Link the venture to selected initiatives
    linkVentureToInitiatives(ventureData.id, selectedInitiativeIds);

    if (onVentureSaved) {
      onVentureSaved();
    }
    router.refresh();
    onOpenChange(false);

    if (!initialVenture) {
      setTitle("");
      setDescription("");
      setAttributeProfileId("none");
      setStatus("planning");
      setProgress(0);
      setDueDate("");
      setActive(false);
      setSelectedInitiativeIds([]);
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialVenture ? "Edit Venture" : "New Venture"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter venture title"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Editor value={description} onChange={setDescription} />
          </div>

          <div className="space-y-2">
            <Label>Initiatives</Label>
            <div className="flex flex-wrap gap-2">
              {initiatives.map((initiative) => (
                <Badge
                  key={initiative.id}
                  variant={selectedInitiativeIds.includes(initiative.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleInitiativeToggle(initiative.id)}
                >
                  {initiative.title}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(value: Venture["status"]) => setStatus(value)}>
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
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={active}
              onCheckedChange={setActive}
            />
            <Label htmlFor="active">Active Venture</Label>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Metrics</h3>
            <TooltipProvider>
              {(Object.keys(metrics) as Array<keyof typeof metrics>).map((metric) => (
                <div key={metric} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={metric} className="capitalize">
                      {metric.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <br/>
                    <br/>
                    <br/>
                    <p className="text-muted-foreground">{metricDefinitions[metric].description as string}</p>
                    {/* <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metricDefinitions[metric]}</p>
                      </TooltipContent>
                    </Tooltip> */}
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
            <Button onClick={handleSubmit}>
              {initialVenture ? "Save Changes" : "Create Venture"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}