"use client";

import { MessagesView } from "@/components/messages/messages-view";
import { MessagesSidebar } from "@/components/messages/messages-sidebar";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <MessagesSidebar />
      <MessagesView />
    </div>
  );
}