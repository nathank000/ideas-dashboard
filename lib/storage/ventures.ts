"use client";

import { Venture, VentureContact, ScopeItem } from "@/lib/types/venture";

const STORAGE_KEY = "ventures";

export function getStoredVentures(): Venture[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading ventures from storage:", error);
    return [];
  }
}

export function saveVenture(venture: Venture) {
  const ventures = getStoredVentures();
  ventures.push(venture);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ventures));
}

export function updateVenture(venture: Venture) {
  const ventures = getStoredVentures();
  const index = ventures.findIndex((v) => v.id === venture.id);
  if (index !== -1) {
    ventures[index] = venture;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ventures));
  }
}

export function deleteVenture(id: string) {
  const ventures = getStoredVentures();
  const filtered = ventures.filter((venture) => venture.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// Risk management
export function addVentureRisk(ventureId: string, risk: Venture["risks"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.risks = [...(venture.risks || []), risk];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureRisk(ventureId: string, risk: Venture["risks"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.risks = venture.risks.map((r) =>
      r.id === risk.id ? risk : r
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureRisk(ventureId: string, riskId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.risks = venture.risks.filter((r) => r.id !== riskId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Assumption management
export function addVentureAssumption(ventureId: string, assumption: Venture["assumptions"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.assumptions = [...(venture.assumptions || []), assumption];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureAssumption(ventureId: string, assumption: Venture["assumptions"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.assumptions = venture.assumptions.map((a) =>
      a.id === assumption.id ? assumption : a
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureAssumption(ventureId: string, assumptionId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.assumptions = venture.assumptions.filter((a) => a.id !== assumptionId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Event management
export function addVentureEvent(ventureId: string, event: Venture["events"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.events = [...(venture.events || []), event];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureEvent(ventureId: string, event: Venture["events"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.events = venture.events.map((e) =>
      e.id === event.id ? event : e
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureEvent(ventureId: string, eventId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.events = venture.events.filter((e) => e.id !== eventId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Meeting notes management
export function addVentureMeetingNote(ventureId: string, note: Venture["meetingNotes"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.meetingNotes = [...(venture.meetingNotes || []), note];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureMeetingNote(ventureId: string, note: Venture["meetingNotes"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.meetingNotes = venture.meetingNotes.map((n) =>
      n.id === note.id ? note : n
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureMeetingNote(ventureId: string, noteId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.meetingNotes = venture.meetingNotes.filter((n) => n.id !== noteId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Decision log management
export function addVentureDecisionLog(ventureId: string, decision: Venture["decisionLogs"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.decisionLogs = [...(venture.decisionLogs || []), decision];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureDecisionLog(ventureId: string, decision: Venture["decisionLogs"][0]) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.decisionLogs = venture.decisionLogs.map((d) =>
      d.id === decision.id ? decision : d
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureDecisionLog(ventureId: string, decisionId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.decisionLogs = venture.decisionLogs.filter((d) => d.id !== decisionId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Contact management
export function addVentureContact(ventureId: string, contact: Contact, sentiment: VentureContact['sentiment'] = 'neutral') {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.contacts = [...(venture.contacts || []), {
      contactId: contact.id,
      sentiment,
      dateAdded: new Date().toISOString(),
    }];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureContact(ventureId: string, contactId: string, sentiment: VentureContact['sentiment']) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.contacts = venture.contacts.map((c) =>
      c.contactId === contactId ? { ...c, sentiment } : c
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureContact(ventureId: string, contactId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.contacts = venture.contacts.filter((c) => c.contactId !== contactId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Scope management
export function addVentureScopeItem(ventureId: string, scopeItem: ScopeItem) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.scopeItems = [...(venture.scopeItems || []), scopeItem];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureScopeItem(ventureId: string, scopeItem: ScopeItem) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.scopeItems = venture.scopeItems.map((item) =>
      item.id === scopeItem.id ? scopeItem : item
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureScopeItem(ventureId: string, scopeItemId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.scopeItems = venture.scopeItems.filter((item) => item.id !== scopeItemId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}