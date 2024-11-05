"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://github.com/shadcn.png",
    lastMessage: "Sure, let's discuss it tomorrow",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://github.com/shadcn.png",
    lastMessage: "The project looks great!",
    time: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Carol Williams",
    avatar: "https://github.com/shadcn.png",
    lastMessage: "Can you send me the files?",
    time: "2h ago",
    unread: 1,
  },
];

export function MessagesSidebar() {
  return (
    <div className="w-80 border-r flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Messages</h2>
          <Button size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search messages..." />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className="w-full justify-start px-2 h-auto py-3"
            >
              <div className="flex items-center w-full gap-3">
                <Avatar>
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {conversation.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </span>
                    {conversation.unread > 0 && (
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}