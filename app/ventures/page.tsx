"use client";

import { VenturesTable } from "@/components/ventures/ventures-table";
import { VenturesFilters } from "@/components/ventures/ventures-filters";
import { useState } from "react";

export default function VenturesPage() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ventures</h1>
      </div>
      <VenturesFilters
        view={view}
        onViewChange={setView}
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
      />
      <VenturesTable
        view={view}
        activeFilter={activeFilter}
      />
    </div>
  );
}