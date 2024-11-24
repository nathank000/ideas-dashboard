"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, LayoutGrid, LayoutList } from "lucide-react";

interface ContactsFiltersProps {
  view: "list" | "grid";
  onViewChange: (view: "list" | "grid") => void;
}

export function ContactsFilters({
  view,
  onViewChange,
}: ContactsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          className="pl-8"
        />
      </div>
      
      <div className="flex gap-2">
        <div className="border-l pl-2">
          <ToggleGroup type="single" value={view} onValueChange={(value) => value && onViewChange(value as "list" | "grid")}>
            <ToggleGroupItem value="list" aria-label="List view">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}