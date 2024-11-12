"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttributeProfile } from "@/lib/types/attributes";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteAttributeProfile } from "@/lib/storage/attributes";
import { Badge } from "@/components/ui/badge";

interface AttributeProfileCardProps {
  profile: AttributeProfile;
  onEdit: (profile: AttributeProfile) => void;
  onDelete: () => void;
}

export function AttributeProfileCard({
  profile,
  onEdit,
  onDelete,
}: AttributeProfileCardProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this attribute profile?")) {
      deleteAttributeProfile(profile.id);
      onDelete();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{profile.name}</CardTitle>
            <CardDescription>
              {profile.attributes.length} attribute{profile.attributes.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(profile)}>
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
        <div className="space-y-4">
          {profile.description && (
            <p className="text-sm text-muted-foreground">{profile.description}</p>
          )}
          <div>
            <h4 className="text-sm font-medium mb-2">Attributes</h4>
            <div className="flex flex-wrap gap-2">
              {profile.attributes.map((attr) => (
                <Badge key={attr.id} variant="secondary">
                  {attr.name} ({attr.type})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}