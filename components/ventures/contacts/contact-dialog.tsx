"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Contact } from "@/lib/types/venture";
import { useState, useEffect } from "react";
import { getStoredContacts } from "@/lib/storage/contacts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [existingContacts, setExistingContacts] = useState<Contact[]>([]);
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [selectedContactId, setSelectedContactId] = useState<string>("");

  // New contact form state
  const [name, setName] = useState(initialContact?.name || "");
  const [title, setTitle] = useState(initialContact?.title || "");
  const [company, setCompany] = useState(initialContact?.company || "");
  const [phone, setPhone] = useState(initialContact?.phone || "");
  const [email, setEmail] = useState(initialContact?.email || "");
  const [linkedIn, setLinkedIn] = useState(initialContact?.linkedIn || "");
  const [notes, setNotes] = useState(initialContact?.notes || "");
  const [sentiment, setSentiment] = useState<Contact["sentiment"]>(
    initialContact?.sentiment || "neutral"
  );

  useEffect(() => {
    setExistingContacts(getStoredContacts());
  }, []);

  const handleSubmit = () => {
    if (mode === "existing") {
      const selectedContact = existingContacts.find(c => c.id === selectedContactId);
      if (selectedContact) {
        onSave(selectedContact);
      }
    } else {
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
        sentiment,
        createdAt: initialContact?.createdAt || new Date(),
      };

      onSave(contact);
    }

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    if (!initialContact) {
      setMode("new");
      setSelectedContactId("");
      setName("");
      setTitle("");
      setCompany("");
      setPhone("");
      setEmail("");
      setLinkedIn("");
      setNotes("");
      setSentiment("neutral");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialContact ? "Edit Contact" : "Add Contact"}
          </DialogTitle>
          {!initialContact && (
            <DialogDescription>
              Create a new contact or select an existing one
            </DialogDescription>
          )}
        </DialogHeader>

        {!initialContact && (
          <RadioGroup
            value={mode}
            onValueChange={(value) => setMode(value as "new" | "existing")}
            className="grid grid-cols-2 gap-4 mb-4"
          >
            <div>
              <RadioGroupItem
                value="new"
                id="new"
                className="peer sr-only"
              />
              <Label
                htmlFor="new"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>New Contact</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="existing"
                id="existing"
                className="peer sr-only"
              />
              <Label
                htmlFor="existing"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span>Existing Contact</span>
              </Label>
            </div>
          </RadioGroup>
        )}

        {mode === "existing" && !initialContact ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {existingContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedContactId === contact.id
                      ? "border-primary bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setSelectedContactId(contact.id)}
                >
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {contact.title} at {contact.company}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {contact.email}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
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
              <Label htmlFor="sentiment">Sentiment</Label>
              <Select 
                value={sentiment} 
                onValueChange={(value: Contact["sentiment"]) => setSentiment(value)}
              >
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
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={mode === "existing" && !selectedContactId}
          >
            {initialContact ? "Save Changes" : "Add Contact"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}