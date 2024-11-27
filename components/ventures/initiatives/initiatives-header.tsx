"use client";

import { Badge } from "@/components/ui/badge";
import { getInitiativesForVenture, getStoredInitiatives } from "@/lib/storage/initiatives";
import { Initiative } from "@/lib/types/initiative";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Target } from "lucide-react";

interface InitiativesHeaderProps {
  ventureId: string;
}

export function InitiativesHeader({ ventureId }: InitiativesHeaderProps) {
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

  if (initiatives.length === 0) {
    return (
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Target className="h-4 w-4" />
        <span>No initiatives linked</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Target className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-wrap gap-2">
        {initiatives.map((initiative) => (
          <Link key={initiative.id} href={`/initiatives/${initiative.id}`}>
            <Badge 
              variant="outline" 
              className="hover:bg-secondary cursor-pointer transition-colors"
            >
              {initiative.title}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}