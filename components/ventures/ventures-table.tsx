"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import Link from "next/link";
import { format } from "date-fns";
import { getStoredVentures } from "@/lib/storage/ventures";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { VentureCard } from "./venture-card";

interface VenturesTableProps {
  view: "list" | "grid";
  activeFilter: "all" | "active" | "inactive";
}

export function VenturesTable({ view, activeFilter }: VenturesTableProps) {
  const [ventures, setVentures] = useState<Venture[]>([]);

  useEffect(() => {
    loadVentures();
  }, [activeFilter]);

  const loadVentures = () => {
    let filteredVentures = getStoredVentures();
    
    if (activeFilter === "active") {
      filteredVentures = filteredVentures.filter(v => v.active);
    } else if (activeFilter === "inactive") {
      filteredVentures = filteredVentures.filter(v => !v.active);
    }

    setVentures(filteredVentures);
  };

  if (view === "grid") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ventures.map((venture) => (
          <VentureCard
            key={venture.id}
            venture={venture}
            onVentureUpdated={loadVentures}
          />
        ))}
        {ventures.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">
            No ventures found.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Average Score</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Last Activity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ventures.map((venture) => (
            <TableRow key={venture.id}>
              <TableCell>
                <Link href={`/ventures/${venture.id}`} className="hover:underline">
                  {venture.title}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{venture.status}</Badge>
              </TableCell>
              <TableCell>
                {venture.active ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell>{venture.progress}%</TableCell>
              <TableCell>
                {(
                  Object.values(venture.metrics).reduce((a, b) => a + b, 0) /
                  Object.values(venture.metrics).length
                ).toFixed(1)}
              </TableCell>
              <TableCell>{format(new Date(venture.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell>{format(new Date(venture.updatedAt), "MMM d, yyyy")}</TableCell>
            </TableRow>
          ))}
          {ventures.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No ventures found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}