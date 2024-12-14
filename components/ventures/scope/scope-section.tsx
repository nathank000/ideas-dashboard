"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScopeItem } from "@/lib/types/venture";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ScopeItemCard } from "./scope-item-card";
import { ScopeItemDialog } from "./scope-item-dialog";
import { addVentureScopeItem, deleteVentureScopeItem, updateVentureScopeItem } from "@/lib/storage/ventures";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ScopeSectionProps {
  ventureId: string;
  scopeItems: ScopeItem[];
  onUpdate: () => void;
}

export function ScopeSection({
  ventureId,
  scopeItems,
  onUpdate,
}: ScopeSectionProps) {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScopeItem | null>(null);
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");

  const filteredItems = scopeItems.filter(item => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const handleSave = (item: ScopeItem) => {
    if (editingItem) {
      updateVentureScopeItem(ventureId, item);
    } else {
      addVentureScopeItem(ventureId, item);
    }
    onUpdate();
    setEditingItem(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Scope Management</CardTitle>
            <CardDescription>
              Define and track what's in and out of scope
            </CardDescription>
          </div>
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup 
          type="single" 
          value={filter} 
          onValueChange={(value) => value && setFilter(value as typeof filter)}
          className="justify-start"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="in">In Scope</ToggleGroupItem>
          <ToggleGroupItem value="out">Out of Scope</ToggleGroupItem>
        </ToggleGroup>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredItems.length > 0 ? (
            filteredItems
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map((item) => (
                <ScopeItemCard
                  key={item.id}
                  item={item}
                  onEdit={(item) => {
                    setEditingItem(item);
                    setNewDialogOpen(true);
                  }}
                />
              ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 col-span-2">
              No scope items match the current filter
            </p>
          )}
        </div>
      </CardContent>

      <ScopeItemDialog
        open={newDialogOpen}
        onOpenChange={(open) => {
          setNewDialogOpen(open);
          if (!open) setEditingItem(null);
        }}
        onSave={handleSave}
        initialItem={editingItem || undefined}
      />
    </Card>
  );
}