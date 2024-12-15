"use client";

import { Venture } from "@/lib/types/venture";
import { InitiativesHeader } from "./initiatives/initiatives-header";

interface VentureHeaderProps {
  venture: Venture;
}

export function VentureHeader({ venture }: VentureHeaderProps) {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">{venture.description}</p>
      <InitiativesHeader ventureId={venture.id} />
    </div>
  );
}