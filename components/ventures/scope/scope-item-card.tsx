"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScopeItem } from "@/lib/types/venture";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScopeItemCardProps {
  item: ScopeItem;
  onEdit: (item: ScopeItem) => void;
}

export function ScopeItemCard({ item, onEdit }: ScopeItemCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{item.title}</h3>
              <Badge
                variant={item.status === "in" ? "default" : "secondary"}
                className={cn(
                  item.status === "in" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                )}
              >
                {item.status === "in" ? "In Scope" : "Out of Scope"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        {item.reason && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Reason: </span>
            {item.reason}
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Last updated {format(new Date(item.updatedAt), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
}