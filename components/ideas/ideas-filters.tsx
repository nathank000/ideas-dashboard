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
import { metricDefinitions } from "@/lib/types/idea";
import { Search } from "lucide-react";

export function IdeasFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ideas..."
          className="pl-8"
        />
      </div>
      
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date Created</SelectItem>
            <SelectItem value="activity">Last Activity</SelectItem>
            <SelectItem value="score">Average Score</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by metric" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(metricDefinitions).map(([key]) => (
              <SelectItem key={key} value={key}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline">Reset Filters</Button>
      </div>
    </div>
  );
}