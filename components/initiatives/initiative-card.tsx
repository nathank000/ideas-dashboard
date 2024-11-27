"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Initiative } from "@/lib/types/initiative";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteInitiative } from "@/lib/storage/initiatives";
import * as LucideIcons from "lucide-react";

interface InitiativeCardProps {
  initiative: Initiative;
  onEdit: (initiative: Initiative) => void;
  onDelete: () => void;
}

export function InitiativeCard({
  initiative,
  onEdit,
  onDelete,
}: InitiativeCardProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this initiative?")) {
      deleteInitiative(initiative.id);
      onDelete();
    }
  };

  // Dynamically get the icon component
  const IconComponent = LucideIcons[initiative.icon as keyof typeof LucideIcons];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {IconComponent && <IconComponent className="h-5 w-5" />}
            <div>
              <CardTitle>{initiative.title}</CardTitle>
              <CardDescription>
                Created {new Date(initiative.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(initiative)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{initiative.description}</p>
      </CardContent>
    </Card>
  );
}