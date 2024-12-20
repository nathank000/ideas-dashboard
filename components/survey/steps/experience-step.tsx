"use client";

import { Slider } from "@/components/ui/slider";

interface ExperienceStepProps {
  value: number;
  onChange: (value: number) => void;
}

export function ExperienceStep({ value, onChange }: ExperienceStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Years of Experience</h2>
        <p className="text-muted-foreground">
          How many years of professional experience do you have?
        </p>
      </div>

      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={0}
          max={99}
          step={1}
        />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">0 years</span>
          <span className="font-semibold">{value} years</span>
          <span className="text-muted-foreground">99 years</span>
        </div>
      </div>
    </div>
  );
}