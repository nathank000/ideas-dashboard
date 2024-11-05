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
import { useInView } from "react-intersection-observer";
import { Idea } from "@/lib/types/idea";
import Link from "next/link";
import { format } from "date-fns";
import { getStoredIdeas } from "@/lib/storage";

export function IdeasTable() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const { ref, inView } = useInView();

  useEffect(() => {
    setIdeas(getStoredIdeas());
  }, []);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Average Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ideas.map((idea) => (
            <TableRow key={idea.id}>
              <TableCell>
                <Link href={`/ideas/${idea.id}`} className="hover:underline">
                  {idea.title}
                </Link>
              </TableCell>
              <TableCell>{format(new Date(idea.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell>{format(new Date(idea.updatedAt), "MMM d, yyyy")}</TableCell>
              <TableCell>
                {(
                  Object.values(idea.metrics).reduce((a, b) => a + b, 0) /
                  Object.values(idea.metrics).length
                ).toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
          {ideas.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No ideas yet. Create your first idea!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div ref={ref} className="h-10" />
    </div>
  );
}