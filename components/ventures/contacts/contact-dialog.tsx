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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contact, VentureContact } from "@/lib/types/venture";
import { useState } from "react";
import { getStoredContacts } from "@/lib/storage/contacts";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Contact, sentiment: VentureContact['sentiment']) => void;
  existingContactIds?: string[];
}

export function ContactDialog({
  open,
  onOpenChange,
  onSave,
  existingContactIds = [],
}: ContactDialogProps) {
  const [selectedContactId, setSelectedContactId] = useState<string>("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [notes, setNotes] = useState("");
  const [sentiment, setSentiment] = useState<VentureContact['sentiment']>("neutral");
  const [mode, setMode] = useState<"new" | "existing">("new");

  const existingContacts = getStoredContacts()
    .filter(contact => !existingContactIds.includes(contact.id));

  const handleSubmit = () => {
    if (mode === "existing") {
      const selectedContact = existingContacts.find(c => c.id === selectedContactId);
      if (selectedContact) {
        onSave(selectedContact, sentiment);
      }
    } else {
      if (!name.trim() || !email.trim()) return;

      const contact: Contact = {
        id: crypto.randomUUID(),
        name: name.trim(),
        title: title.trim(),
        company: company.trim(),
        phone: phone.trim(),
        email: email.trim(),
        linkedIn: linkedIn.trim(),
        dateAdded: new Date().toISOString(),
        notes: notes.trim(),
        createdAt: new Date(),
      };

      onSave(contact, sentiment);
    }

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedContactId("");
    setName("");
    setTitle("");
    setCompany("");
    setPhone("");
    setEmail("");
    setLinkedIn("");
    setNotes("");
    setSentiment("neutral");
    setMode("new");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Contact</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {existingContacts.length > 0 && (
            <div className="space-y-2">
              <Label>Add Contact From</Label>
              <div className="flex gap-2">
                <Button
                  variant={mode === "new" ? "default" : "outline"}
                  onClick={() => setMode("new")}
                  className="flex-1"
                >
                  New Contact
                </Button>
                <Button
                  variant={mode === "existing" ? "default" : "outline"}
                  onClick={() => setMode("existing")}
                  className="flex-1"
                >
                  Existing Contact
                </Button>
              </div>
            </div>
          )}

          {mode === "existing" ? (
            <div className="space-y-2">
              <Label>Select Contact</Label>
              <Select value={selectedContactId} onValueChange={setSelectedContactId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  {existingContacts.map(contact => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <>
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
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="sentiment">Initial Sentiment</Label>
            <Select value={sentiment} onValueChange={(value: VentureContact['sentiment']) => setSentiment(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={mode === "existing" ? !selectedContactId : !name.trim() || !email.trim()}
          >
            Add Contact
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}