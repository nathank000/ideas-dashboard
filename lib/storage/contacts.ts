"use client";

import { Contact } from "@/lib/types/venture";

const STORAGE_KEY = "contacts";

export function getStoredContacts(): Contact[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveContact(contact: Contact) {
  const contacts = getStoredContacts();
  // Check if contact with same ID already exists
  const existingIndex = contacts.findIndex(c => c.id === contact.id);
  if (existingIndex !== -1) {
    // Update existing contact
    contacts[existingIndex] = contact;
  } else {
    // Add new contact with unique ID
    contact.id = crypto.randomUUID();
    contacts.push(contact);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export function updateContact(contact: Contact) {
  const contacts = getStoredContacts();
  const index = contacts.findIndex((c) => c.id === contact.id);
  if (index !== -1) {
    contacts[index] = contact;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }
}

export function deleteContact(id: string) {
  const contacts = getStoredContacts();
  const filtered = contacts.filter((contact) => contact.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}