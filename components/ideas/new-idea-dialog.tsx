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
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Idea, IdeaMetrics, metricDefinitions } from "@/lib/types/idea";
import { Info } from "lucide-react";
import { useState } from "react";
import { Editor } from "@/components/ideas/editor";
import { saveIdea } from "@/lib/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NewIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewIdeaDialog({ open, onOpenChange }: NewIdeaDialogProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

    const newIdea: Idea = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description,
      metrics,
      resources: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveIdea(newIdea);
    toast.success("Idea created successfully!");
    router.refresh();
    onOpenChange(false);
    setTitle("");
    setDescription("");
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