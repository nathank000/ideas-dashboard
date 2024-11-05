"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, MoreVertical } from "lucide-react";

const messages = [
  {
    id: 1,
    sender: "Alice Johnson",
    avatar: "https://github.com/shadcn.png",
    content: "Hi! How's the project coming along?",
    timestamp: "10:30 AM",
    isSelf: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hey Alice! It's going well. I've completed the initial designs.",
    timestamp: "10:32 AM",
    isSelf: true,
  },
  {
    id: 3,
    sender: "Alice Johnson",
    avatar: "https://github.com/shadcn.png",
    content: "That's great! Can you share them with me?",
    timestamp: "10:33 AM",
    isSelf: false,
  },
];

export function MessagesView() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alice Johnson</h3>
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.isSelf ? "flex-row-reverse" : ""
              }`}
            >
              {!message.isSelf && (
                <Avatar>
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback>
                    {message.sender
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[70%] ${
                  message.isSelf
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <span
                  className={`text-xs ${
                    message.isSelf
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form className="flex gap-2">
          <Button type="button" size="icon" variant="ghost">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input placeholder="Type a message..." className="flex-1" />
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}