"use client";

import { IdeasTable } from "@/components/ideas/ideas-table";

export default function IdeasPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ideas</h1>
      </div>
      <IdeasTable />
    </div>
  );
}