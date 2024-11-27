"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Initiative } from "@/lib/types/initiative";
import { getInitiativesForVenture, getStoredInitiatives } from "@/lib/storage/initiatives";
import { useEffect, useState } from "react";
import Link from "next/link";

interface InitiativesSectionProps {
  ventureId: string;
}

export function InitiativesSection({ ventureId }: InitiativesSectionProps) {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  useEffect(() => {
    const loadInitiatives = () => {
      const allInitiatives = getStoredInitiatives();
      const linkedInitiativeIds = getInitiativesForVenture(ventureId);
      const linkedInitiatives = allInitiatives.filter(i => linkedInitiativeIds.includes(i.id));
      setInitiatives(linkedInitiatives);
    };

    loadInitiatives();
  }, [ventureId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Initiatives</CardTitle>
        <CardDescription>
          Strategic initiatives this venture contributes to
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initiatives.map((initiative) => (
            <Link 
              key={initiative.id} 
              href={`/initiatives/${initiative.id}`}
              className="block"
            >
              <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="font-medium">{initiative.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {initiative.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {initiatives.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No initiatives linked to this venture
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}