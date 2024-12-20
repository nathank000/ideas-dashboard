"use client";

import { Slider } from "@/components/ui/slider";

interface AvailableHoursStepProps {
  value: number;
  onChange: (value: number) => void;
}

export function AvailableHoursStep({ value, onChange }: AvailableHoursStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Available Hours</h2>
        <p className="text-muted-foreground">
          How many hours per day can you dedicate to your venture?
        </p>
      </div>

      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={0}
          max={24}
          step={1}
        />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">0 hours</span>
          <span className="font-semibold">{value} hours</span>
          <span className="text-muted-foreground">24 hours</span>
        </div>
      </div>
    </div>
  );
}