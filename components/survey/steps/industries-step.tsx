"use client";

import { Textarea } from "@/components/ui/textarea";

interface IndustriesStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function IndustriesStep({ value, onChange }: IndustriesStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Industry Experience</h2>
        <p className="text-muted-foreground">
          What industries have you worked in throughout your career?
        </p>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="List the industries you have experience in..."
        className="min-h-[200px]"
      />
    </div>
  );
}