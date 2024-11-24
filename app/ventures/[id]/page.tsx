"use client";

import { VentureDetail } from "@/components/ventures/venture-detail";

export default function VentureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <VentureDetail id={params.id} />
    </div>
  );
}