"use client";

import { Button } from "@/components/ui/button";
import { initializeStorage } from "@/lib/storage/init";
import { useRouter } from "next/navigation";

export function StorageReset() {
  const router = useRouter();

  const handleReset = () => {
    localStorage.clear();
    initializeStorage();
    router.refresh();
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleReset}
      className="fixed bottom-4 right-4 z-50"
    >
      Reset App Data
    </Button>
  );
}