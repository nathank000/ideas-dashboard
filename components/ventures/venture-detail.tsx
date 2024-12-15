"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  LayoutList, 
  Link as LinkIcon, 
  Pencil, 
  Rows 
} from "lucide-react";
import Link from "next/link";
import { Venture } from "@/lib/types/venture";
import { getStoredVentures, updateVenture } from "@/lib/storage/ventures";
import { VentureHeader } from "./venture-header";
import { VentureMetrics } from "./venture-metrics";
import { VentureSections } from "./venture-sections";
import { NewVentureDialog } from "./new-venture-dialog";
import { AttributeValue } from "@/lib/types/attributes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VentureViewToggle } from "./venture-view-toggle";

interface VentureDetailProps {
  id: string;
}

export function VentureDetail({ id }: VentureDetailProps) {
  const [venture, setVenture] = useState<Venture | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"tabs" | "list">("tabs");

  const loadVenture = () => {
    const ventures = getStoredVentures();
    const found = ventures.find((v) => v.id === id);
    if (found) {
      setVenture(found);
    }
  };

  useEffect(() => {
    loadVenture();
  }, [id]);

  const handleVentureUpdate = () => {
    loadVenture();
  };

  const handleAttributesUpdate = (profileId: string, attributes: AttributeValue[]) => {
    if (venture) {
      const updatedVenture = {
        ...venture,
        attributes,
        updatedAt: new Date(),
      };
      updateVenture(updatedVenture);
      setVenture(updatedVenture);
    }
  };

  if (!venture) {
    return <div>Venture not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/ventures">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{venture.title}</h1>
            {venture.active ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <Badge variant="secondary">{venture.status}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <VentureViewToggle view={viewMode} onViewChange={setViewMode} />
          <Button onClick={() => setShowEditDialog(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Venture
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/v/${venture.id}`} target="_blank">
              <LinkIcon className="h-4 w-4 mr-2" />
              Public Link
            </Link>
          </Button>
        </div>
      </div>

      <VentureHeader venture={venture} />
      <VentureMetrics venture={venture} />
      <VentureSections 
        venture={venture}
        viewMode={viewMode}
        onUpdate={handleVentureUpdate}
        onAttributesUpdate={handleAttributesUpdate}
      />

      <NewVentureDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialVenture={venture}
        onVentureSaved={handleVentureUpdate}
      />
    </div>
  );
}