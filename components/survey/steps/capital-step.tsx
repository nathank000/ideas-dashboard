"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CapitalStepProps {
  value: number;
  onChange: (value: number) => void;
}

export function CapitalStep({ value, onChange }: CapitalStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Available Capital</h2>
        <p className="text-muted-foreground">
          How much capital can you commit to your venture?
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="capital">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5">$</span>
          <Input
            id="capital"
            type="number"
            min={0}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="pl-7"
          />
        </div>
      </div>
    </div>
  );
}