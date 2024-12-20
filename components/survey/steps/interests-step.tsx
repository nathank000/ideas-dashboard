"use client";

import { Textarea } from "@/components/ui/textarea";

interface InterestsStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function InterestsStep({ value, onChange }: InterestsStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Your Interests</h2>
        <p className="text-muted-foreground">
          What are your personal and professional interests?
        </p>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your interests, hobbies, and passions..."
        className="min-h-[200px]"
      />
    </div>
  );
}