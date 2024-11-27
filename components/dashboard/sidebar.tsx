"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  Calendar,
  MessagesSquare,
  ChevronLeft,
  Plus,
  ListTodo,
  Users2,
  Rocket,
  Flag,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NewVentureDialog } from "@/components/ventures/new-venture-dialog";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Flag, label: "Initiatives", href: "/initiatives" },
  { icon: Rocket, label: "Ventures", href: "/ventures" },
  { icon: Users2, label: "Contacts", href: "/contacts" },
  { icon: ListTodo, label: "Attributes", href: "/attributes" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: MessagesSquare, label: "Messages", href: "/messages" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [newVentureOpen, setNewVentureOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex flex-col h-screen bg-background border-r pt-6 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-6 z-50 rounded-full border bg-background"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>

        <div className="flex items-center justify-center mb-8">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="ml-3">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          )}
        </div>

        <div className="px-3 mb-4">
          <Button
            className="w-full justify-start gap-2"
            onClick={() => setNewVentureOpen(true)}
          >
            <Plus className="h-4 w-4" />
            {!collapsed && "New Venture"}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>

      <NewVentureDialog open={newVentureOpen} onOpenChange={setNewVentureOpen} />
    </div>
  );
}