"use client";

import { PublicVentureView } from "@/components/public/public-venture-view";

export default function PublicVenturePage({
  params,
}: {
  params: { id: string };
}) {
  return <PublicVentureView id={params.id} />;
}