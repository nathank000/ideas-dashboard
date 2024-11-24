"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStoredVentures } from "@/lib/storage/ventures";
import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

export function ActivityFeed() {
  const [ventures, setVentures] = useState<Venture[]>([]);

  useEffect(() => {
    const loadedVentures = getStoredVentures();
    // Sort ventures by updatedAt date, most recent first
    loadedVentures.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setVentures(loadedVentures.slice(0, 5)); // Show only the 5 most recent ventures
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Ventures</CardTitle>
        <CardDescription>Latest ventures and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {ventures.map((venture) => (
            <div key={venture.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>VN</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">
                    {venture.title}
                  </p>
                  {venture.active ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {venture.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Progress: {venture.progress}%
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(venture.updatedAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
          {ventures.length === 0 && (
            <p className="text-center text-muted-foreground">
              No ventures yet. Create your first venture!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}