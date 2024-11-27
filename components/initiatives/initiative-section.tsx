"use client";

import { Initiative } from "@/lib/types/initiative";
import { Venture } from "@/lib/types/venture";
import { getVenturesForInitiative } from "@/lib/storage/initiatives";
import { getStoredVentures } from "@/lib/storage/ventures";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { VentureCard } from "@/components/ventures/venture-card";
import * as LucideIcons from "lucide-react";

interface InitiativeSectionProps {
  initiative: Initiative;
}

export function InitiativeSection({ initiative }: InitiativeSectionProps) {
  const [ventures, setVentures] = useState<Venture[]>([]);

  useEffect(() => {
    const ventureIds = getVenturesForInitiative(initiative.id);
    const allVentures = getStoredVentures();
    const linkedVentures = allVentures.filter(v => ventureIds.includes(v.id));
    setVentures(linkedVentures);
  }, [initiative.id]);

  const IconComponent = LucideIcons[initiative.icon as keyof typeof LucideIcons];

  if (ventures.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {IconComponent && <IconComponent className="h-5 w-5" />}
        <h2 className="text-2xl font-semibold">{initiative.title}</h2>
      </div>
      <p className="text-muted-foreground">{initiative.description}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ventures.map((venture) => (
          <VentureCard
            key={venture.id}
            venture={venture}
            onVentureUpdated={() => {
              const ventureIds = getVenturesForInitiative(initiative.id);
              const allVentures = getStoredVentures();
              const linkedVentures = allVentures.filter(v => ventureIds.includes(v.id));
              setVentures(linkedVentures);
            }}
          />
        ))}
      </div>
    </div>
  );
}