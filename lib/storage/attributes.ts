import { AttributeProfile } from "../types/attributes";

const STORAGE_KEY = "attribute_profiles";

export function getStoredAttributeProfiles(): AttributeProfile[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getAttributeProfile(id: string): AttributeProfile | null {
  const profiles = getStoredAttributeProfiles();
  return profiles.find(p => p.id === id) || null;
}

export function saveAttributeProfile(profile: AttributeProfile) {
  const profiles = getStoredAttributeProfiles();
  profiles.push(profile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export function updateAttributeProfile(profile: AttributeProfile) {
  const profiles = getStoredAttributeProfiles();
  const index = profiles.findIndex(p => p.id === profile.id);
  if (index !== -1) {
    profiles[index] = profile;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }
}

export function deleteAttributeProfile(id: string) {
  const profiles = getStoredAttributeProfiles();
  const filtered = profiles.filter(profile => profile.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}