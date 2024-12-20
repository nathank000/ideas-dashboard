"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, Rocket, Building2 } from "lucide-react";

interface ArchetypeStepProps {
  value: 'solopreneur' | 'entrepreneur' | 'intrapreneur' | null;
  onChange: (value: 'solopreneur' | 'entrepreneur' | 'intrapreneur') => void;
}

const archetypes = [
  {
    id: 'solopreneur',
    title: 'Solopreneur',
    description: 'Building and running your business independently',
    icon: Briefcase,
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    description: 'Building a scalable business with a team',
    icon: Rocket,
  },
  {
    id: 'intrapreneur',
    title: 'Intrapreneur',
    description: 'Innovating within an existing organization',
    icon: Building2,
  },
];

export function ArchetypeStep({ value, onChange }: ArchetypeStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Archetype</h2>
        <p className="text-muted-foreground">
          Select the option that best describes your entrepreneurial journey
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {archetypes.map((archetype) => (
          <Card
            key={archetype.id}
            className={cn(
              "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
              value === archetype.id && "border-primary bg-primary/5"
            )}
            onClick={() => onChange(archetype.id as typeof value)}
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <archetype.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{archetype.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {archetype.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}