"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contact } from "@/lib/types/venture";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ContactDialog } from "./contact-dialog";
import { deleteContact } from "@/lib/storage/contacts";

interface ContactsTableProps {
  contacts: (Contact & { ventureCount: number })[];
  onContactsChange: () => void;
}

export function ContactsTable({ contacts, onContactsChange }: ContactsTableProps) {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const sentimentColors = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  };

  const handleDelete = (contact: Contact) => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      deleteContact(contact.id);
      onContactsChange();
    }
  };

  // Ensure unique contacts by filtering duplicates based on ID
  const uniqueContacts = contacts.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as (Contact & { ventureCount: number })[]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ventures</TableHead>
            <TableHead>Average Sentiment</TableHead>
            <TableHead>Added</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Link href={`/contacts/${contact.id}`} className="hover:underline">
                  {contact.name}
                </Link>
              </TableCell>
              <TableCell>{contact.title}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.ventureCount}</TableCell>
              <TableCell>
                <Badge className={cn(sentimentColors[contact.sentiment])}>
                  {contact.sentiment}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(contact.dateAdded), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setEditingContact(contact);
                      setEditDialogOpen(true);
                    }}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(contact)}
                      className="text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ContactDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialContact={editingContact || undefined}
        onSave={(contact) => {
          onContactsChange();
          setEditDialogOpen(false);
          setEditingContact(null);
        }}
      />
    </>
  );
}