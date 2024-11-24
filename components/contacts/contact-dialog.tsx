"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Contact } from "@/lib/types/venture";
import { useState, useEffect } from "react";
import { updateContact } from "@/lib/storage/contacts";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Contact) => void;
  initialContact?: Contact;
}

export function ContactDialog({
  open,
  onOpenChange,
  onSave,
  initialContact,
}: ContactDialogProps) {
  const [name, setName] = useState(initialContact?.name || "");
  const [title, setTitle] = useState(initialContact?.title || "");
  const [company, setCompany] = useState(initialContact?.company || "");
  const [phone, setPhone] = useState(initialContact?.phone || "");
  const [email, setEmail] = useState(initialContact?.email || "");
  const [linkedIn, setLinkedIn] = useState(initialContact?.linkedIn || "");
  const [notes, setNotes] = useState(initialContact?.notes || "");

  // Update form fields when initialContact changes
  useEffect(() => {
    if (initialContact) {
      setName(initialContact.name);
      setTitle(initialContact.title);
      setCompany(initialContact.company);
      setPhone(initialContact.phone);
      setEmail(initialContact.email);
      setLinkedIn(initialContact.linkedIn);
      setNotes(initialContact.notes);
    }
  }, [initialContact]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;

    const contact: Contact = {
      id: initialContact?.id || crypto.randomUUID(),
      name: name.trim(),
      title: title.trim(),
      company: company.trim(),
      phone: phone.trim(),
      email: email.trim(),
      linkedIn: linkedIn.trim(),
      dateAdded: initialContact?.dateAdded || new Date().toISOString(),
      notes: notes.trim(),
      createdAt: initialContact?.createdAt || new Date(),
    };

    if (initialContact) {
      updateContact(contact);
    }
    
    onSave(contact);
    onOpenChange(false);
    if (!initialContact) {
      setName("");
      setTitle("");
      setCompany("");
      setPhone("");
      setEmail("");
      setLinkedIn("");
      setNotes("");
    }
  };

  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (!initialContact) {
        setName("");
        setTitle("");
        setCompany("");
        setPhone("");
        setEmail("");
        setLinkedIn("");
        setNotes("");
      } else {
        // Reset to initial values if editing
        setName(initialContact.name);
        setTitle(initialContact.title);
        setCompany(initialContact.company);
        setPhone(initialContact.phone);
        setEmail(initialContact.email);
        setLinkedIn(initialContact.linkedIn);
        setNotes(initialContact.notes);
      }
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialContact ? "Edit Contact" : "Add Contact"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contact name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedIn">LinkedIn Profile</Label>
            <Input
              id="linkedIn"
              type="url"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              placeholder="LinkedIn profile URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes about the contact"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialContact ? "Save Changes" : "Add Contact"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}