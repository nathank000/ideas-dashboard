"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NewIdeaDialog } from "./new-idea-dialog";
import { useState } from "react";

export function NewIdeaButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={() => setOpen(true)}
      >
        <PlusCircle className="h-5 w-5" />
        <span className="ml-3">New Idea</span>
      </Button>
      <NewIdeaDialog open={open} onOpenChange={setOpen} />
    </>
  );
}