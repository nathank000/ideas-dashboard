"use client";

import { InitiativeDetail } from "@/components/initiatives/initiative-detail";

export default function InitiativeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <InitiativeDetail id={params.id} />
    </div>
  );
}