"use client";

import { Slider } from "@/components/ui/slider";

interface TechnicalAbilityStepProps {
  value: number;
  onChange: (value: number) => void;
}

export function TechnicalAbilityStep({ value, onChange }: TechnicalAbilityStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Technical Ability</h2>
        <p className="text-muted-foreground">
          Rate your technical expertise on a scale from 0 (non-technical) to 10 (highly technical)
        </p>
      </div>

      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={0}
          max={10}
          step={1}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Non-technical</span>
          <span>Highly technical</span>
        </div>
      </div>
    </div>
  );
}