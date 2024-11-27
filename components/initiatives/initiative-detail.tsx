"use client";

import { useEffect, useState } from "react";
import { Initiative } from "@/lib/types/initiative";
import { getStoredInitiatives } from "@/lib/storage/initiatives";
import { InitiativeHeader } from "./initiative-header";
import { InitiativeVentures } from "./initiative-ventures";
import { InitiativeMetrics } from "./initiative-metrics";

interface InitiativeDetailProps {
  id: string;
}

export function InitiativeDetail({ id }: InitiativeDetailProps) {
  const [initiative, setInitiative] = useState<Initiative | null>(null);

  useEffect(() => {
    const initiatives = getStoredInitiatives();
    const found = initiatives.find((i) => i.id === id);
    if (found) {
      setInitiative(found);
    }
  }, [id]);

  if (!initiative) {
    return <div>Initiative not found</div>;
  }

  return (
    <div className="space-y-6">
      <InitiativeHeader initiative={initiative} onUpdate={() => {
        const initiatives = getStoredInitiatives();
        const found = initiatives.find((i) => i.id === id);
        if (found) {
          setInitiative(found);
        }
      }} />
      <InitiativeMetrics initiativeId={initiative.id} />
      <InitiativeVentures initiativeId={initiative.id} />
    </div>
  );
}