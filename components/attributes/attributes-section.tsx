"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AttributeProfile, AttributeValue } from "@/lib/types/attributes";
import { getAttributeProfile } from "@/lib/storage/attributes";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Pencil, Save } from "lucide-react";

interface AttributesSectionProps {
  attributeProfileId?: string;
  attributes: AttributeValue[];
  onUpdate: (profileId: string, values: AttributeValue[]) => void;
  className?: string;
}

export function AttributesSection({
  attributeProfileId,
  attributes,
  onUpdate,
  className,
}: AttributesSectionProps) {
  const [profile, setProfile] = useState<AttributeProfile | null>(null);
  const [values, setValues] = useState<AttributeValue[]>(attributes || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string | number | boolean>("");

  useEffect(() => {
    if (attributeProfileId) {
      const foundProfile = getAttributeProfile(attributeProfileId);
      if (foundProfile) {
        setProfile(foundProfile);
        const initialValues = foundProfile.attributes.map(attr => {
          const existingValue = attributes.find(v => v.definitionId === attr.id);
          return existingValue || {
            definitionId: attr.id,
            value: attr.type === 'number' ? 0 : attr.type === 'boolean' ? false : ''
          };
        });
        setValues(initialValues);
      }
    }
  }, [attributeProfileId, attributes]);

  const handleEdit = (definitionId: string, currentValue: string | number | boolean) => {
    setEditingId(definitionId);
    setEditValue(currentValue);
  };

  const handleSave = (definitionId: string) => {
    const newValues = values.map((v) =>
      v.definitionId === definitionId ? { ...v, value: editValue } : v
    );
    setValues(newValues);
    if (attributeProfileId) {
      onUpdate(attributeProfileId, newValues);
    }
    setEditingId(null);
  };

  const renderValue = (attr: AttributeProfile['attributes'][0], value: string | number | boolean) => {
    if (editingId === attr.id) {
      return (
        <div className="flex items-center gap-2">
          {attr.type === "longtext" ? (
            <Textarea
              value={editValue as string}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
            />
          ) : attr.type === "boolean" ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditValue(!editValue)}
              className="flex-1 justify-start"
            >
              {editValue ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            </Button>
          ) : (
            <Input
              type={attr.type === "number" ? "number" : "text"}
              value={editValue}
              onChange={(e) => setEditValue(attr.type === "number" ? Number(e.target.value) : e.target.value)}
              className="flex-1"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSave(attr.id)}
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between group">
        <div className="flex-1">
          {attr.type === "boolean" ? (
            value ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )
          ) : (
            <span className="text-sm">
              {value.toString()}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleEdit(attr.id, value)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (!profile || !attributeProfileId) {
    return null;
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Attributes - {profile.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profile.attributes.map((attr) => {
            const value = values.find((v) => v.definitionId === attr.id)?.value;
            
            return (
              <div key={attr.id} className="space-y-2">
                <Label>{attr.name}</Label>
                {renderValue(attr, value ?? (attr.type === 'boolean' ? false : ''))}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}