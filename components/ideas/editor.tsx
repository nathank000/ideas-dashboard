"use client";

import { cn } from "@/lib/utils";
import { Bold, Italic, Link as LinkIcon, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Editor({ value, onChange, className }: EditorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <ToggleGroup type="multiple" className="justify-start">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="Toggle list">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="link" aria-label="Add link">
          <LinkIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px]"
        placeholder="Describe your idea..."
      />
    </div>
  );
}