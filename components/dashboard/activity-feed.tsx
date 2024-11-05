"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStoredIdeas } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Idea } from "@/lib/types/idea";
import { formatDistanceToNow } from "date-fns";

export function ActivityFeed() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const loadedIdeas = getStoredIdeas();
    // Sort ideas by updatedAt date, most recent first
    loadedIdeas.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setIdeas(loadedIdeas.slice(0, 5)); // Show only the 5 most recent ideas
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Ideas</CardTitle>
        <CardDescription>Latest ideas and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {ideas.map((idea) => (
            <div key={idea.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ID</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {idea.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  Average score:{" "}
                  {(
                    Object.values(idea.metrics).reduce((a, b) => a + b, 0) /
                    Object.values(idea.metrics).length
                  ).toFixed(1)}
                  /10
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(idea.updatedAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
          {ideas.length === 0 && (
            <p className="text-center text-muted-foreground">
              No ideas yet. Create your first idea!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}