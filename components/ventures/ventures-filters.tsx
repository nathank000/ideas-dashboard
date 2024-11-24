"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, LayoutGrid, LayoutList } from "lucide-react";

interface VenturesFiltersProps {
  view: "list" | "grid";
  onViewChange: (view: "list" | "grid") => void;
  activeFilter: "all" | "active" | "inactive";
  onActiveFilterChange: (filter: "all" | "active" | "inactive") => void;
}

export function VenturesFilters({
  view,
  onViewChange,
  activeFilter,
  onActiveFilterChange,
}: VenturesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ventures..."
          className="pl-8"
        />
      </div>
      
      <div className="flex gap-2">
        <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && onActiveFilterChange(value as "all" | "active" | "inactive")}>
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="active">Active</ToggleGroupItem>
          <ToggleGroupItem value="inactive">Inactive</ToggleGroupItem>
        </ToggleGroup>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date Created</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>

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