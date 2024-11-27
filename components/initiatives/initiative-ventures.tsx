"use client";

import { VentureCard } from "@/components/ventures/venture-card";
import { getVenturesForInitiative } from "@/lib/storage/initiatives";
import { getStoredVentures } from "@/lib/storage/ventures";
import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InitiativeVenturesProps {
  initiativeId: string;
}

export function InitiativeVentures({ initiativeId }: InitiativeVenturesProps) {
  const [ventures, setVentures] = useState<Venture[]>([]);

  const loadVentures = () => {
    const ventureIds = getVenturesForInitiative(initiativeId);
    const allVentures = getStoredVentures();
    const linkedVentures = allVentures.filter(v => ventureIds.includes(v.id));
    setVentures(linkedVentures);
  };

  useEffect(() => {
    loadVentures();
  }, [initiativeId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Ventures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ventures.map((venture) => (
            <VentureCard
              key={venture.id}
              venture={venture}
              onVentureUpdated={loadVentures}
            />
          ))}
          {ventures.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-8">
              No ventures linked to this initiative yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}