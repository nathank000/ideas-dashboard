"use client";

const SETTINGS_KEY = "public_settings";

interface PublicSettings {
  showScope: boolean;
  showAssumptions: boolean;
  showContacts: boolean;
  showRisks: boolean;
  showEvents: boolean;
  showMeetingNotes: boolean;
  showDecisionLog: boolean;
  allowVoting: boolean;
  requireEmail: boolean;
}

export function getPublicSettings(): PublicSettings {
  if (typeof window === "undefined") {
    return {
      showScope: true,
      showAssumptions: true,
      showContacts: false,
      showRisks: true,
      showEvents: true,
      showMeetingNotes: false,
      showDecisionLog: true,
      allowVoting: true,
      requireEmail: true,
    };
  }

  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored
    ? JSON.parse(stored)
    : {
        showScope: true,
        showAssumptions: true,
        showContacts: false,
        showRisks: true,
        showEvents: true,
        showMeetingNotes: false,
        showDecisionLog: true,
        allowVoting: true,
        requireEmail: true,
      };
}

export function savePublicSettings(settings: PublicSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}