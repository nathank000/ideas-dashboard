"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LinkedinStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function LinkedinStep({ value, onChange }: LinkedinStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">LinkedIn Profile</h2>
        <p className="text-muted-foreground">
          Share your LinkedIn profile URL to connect your professional network
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          id="linkedin"
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://linkedin.com/in/your-profile"
        />
      </div>
    </div>
  );
}