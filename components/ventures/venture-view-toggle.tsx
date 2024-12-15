"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutList, Rows } from "lucide-react";

interface VentureViewToggleProps {
  view: "tabs" | "list";
  onViewChange: (view: "tabs" | "list") => void;
}

export function VentureViewToggle({ view, onViewChange }: VentureViewToggleProps) {
  return (
    <ToggleGroup 
      type="single" 
      value={view} 
      onValueChange={(value) => value && onViewChange(value as "tabs" | "list")}
    >
      <ToggleGroupItem value="tabs" aria-label="Tabbed view">
        <Rows className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <LayoutList className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}