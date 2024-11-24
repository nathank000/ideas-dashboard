"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Venture } from "@/lib/types/venture";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash, CheckCircle2, Circle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { NewVentureDialog } from "./new-venture-dialog";
import { deleteVenture } from "@/lib/storage/ventures";
import Link from "next/link";

interface VentureCardProps {
  venture: Venture;
  onVentureUpdated: () => void;
}

export function VentureCard({ venture, onVentureUpdated }: VentureCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this venture?")) {
      deleteVenture(venture.id);
      onVentureUpdated();
    }
  };

  return (
    <>
      <Link href={`/ventures/${venture.id}`}>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{venture.title}</h3>
                  {venture.active ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Badge variant="secondary">{venture.status}</Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={(e) => e.preventDefault()}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
                    setShowEditDialog(true);
                  }}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{venture.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{venture.progress}%</span>
              </div>
              <Progress value={venture.progress} />
            </div>
            {venture.dueDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Due:</span>
                <span>{format(new Date(venture.dueDate), "MMM d, yyyy")}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex -space-x-2">
              {venture.team.map((member, i) => (
                <Avatar key={i} className="border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>

      <NewVentureDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialVenture={venture}
        onVentureSaved={onVentureUpdated}
      />
    </>
  );
}