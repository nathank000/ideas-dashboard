const STORAGE_KEY = "ventures";

import { Venture, Contact, VentureRisk, VentureAssumption, VentureEvent, MeetingNote, DecisionLog } from "../types/venture";

export function getStoredVentures(): Venture[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
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

// Risk methods
export function addVentureRisk(ventureId: string, risk: VentureRisk) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.risks = [...(venture.risks || []), risk];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureRisk(ventureId: string, risk: VentureRisk) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.risks = (venture.risks || []).map((r) =>
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
    venture.risks = (venture.risks || []).filter((r) => r.id !== riskId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Assumption methods
export function addVentureAssumption(ventureId: string, assumption: VentureAssumption) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.assumptions = [...(venture.assumptions || []), assumption];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureAssumption(ventureId: string, assumption: VentureAssumption) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.assumptions = (venture.assumptions || []).map((a) =>
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
    venture.assumptions = (venture.assumptions || []).filter((a) => a.id !== assumptionId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Event methods
export function addVentureEvent(ventureId: string, event: VentureEvent) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.events = [...(venture.events || []), event];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureEvent(ventureId: string, event: VentureEvent) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.events = (venture.events || []).map((e) =>
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
    venture.events = (venture.events || []).filter((e) => e.id !== eventId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Meeting note methods
export function addVentureMeetingNote(ventureId: string, note: MeetingNote) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.meetingNotes = [...(venture.meetingNotes || []), note];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureMeetingNote(ventureId: string, note: MeetingNote) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.meetingNotes = (venture.meetingNotes || []).map((n) =>
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
    venture.meetingNotes = (venture.meetingNotes || []).filter((n) => n.id !== noteId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Decision log methods
export function addVentureDecisionLog(ventureId: string, decision: DecisionLog) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.decisionLogs = [...(venture.decisionLogs || []), decision];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureDecisionLog(ventureId: string, decision: DecisionLog) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.decisionLogs = (venture.decisionLogs || []).map((d) =>
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
    venture.decisionLogs = (venture.decisionLogs || []).filter((d) => d.id !== decisionId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

// Contact methods
export function addVentureContact(ventureId: string, contact: Contact) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.contacts = [...(venture.contacts || []), contact];
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function updateVentureContact(ventureId: string, contact: Contact) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.contacts = (venture.contacts || []).map((c) =>
      c.id === contact.id ? contact : c
    );
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}

export function deleteVentureContact(ventureId: string, contactId: string) {
  const ventures = getStoredVentures();
  const venture = ventures.find((v) => v.id === ventureId);
  if (venture) {
    venture.contacts = (venture.contacts || []).filter((c) => c.id !== contactId);
    venture.updatedAt = new Date();
    updateVenture(venture);
  }
}