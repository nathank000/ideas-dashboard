"use client";

import { Textarea } from "@/components/ui/textarea";

interface SkillsStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function SkillsStep({ value, onChange }: SkillsStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Special Skills</h2>
        <p className="text-muted-foreground">
          What unique skills and expertise do you bring to the table?
        </p>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="List your key skills, certifications, and areas of expertise..."
        className="min-h-[200px]"
      />
    </div>
  );
}