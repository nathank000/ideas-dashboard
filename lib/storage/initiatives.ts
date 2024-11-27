"use client";

import { Initiative, VentureInitiative } from "../types/initiative";

const INITIATIVES_KEY = "initiatives";
const VENTURE_INITIATIVES_KEY = "venture_initiatives";

export function getStoredInitiatives(): Initiative[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(INITIATIVES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading initiatives from storage:", error);
    return [];
  }
}

export function saveInitiative(initiative: Initiative) {
  const initiatives = getStoredInitiatives();
  initiatives.push(initiative);
  localStorage.setItem(INITIATIVES_KEY, JSON.stringify(initiatives));
}

export function updateInitiative(initiative: Initiative) {
  const initiatives = getStoredInitiatives();
  const index = initiatives.findIndex((i) => i.id === initiative.id);
  if (index !== -1) {
    initiatives[index] = initiative;
    localStorage.setItem(INITIATIVES_KEY, JSON.stringify(initiatives));
  }
}

export function deleteInitiative(id: string) {
  const initiatives = getStoredInitiatives();
  const filtered = initiatives.filter((initiative) => initiative.id !== id);
  localStorage.setItem(INITIATIVES_KEY, JSON.stringify(filtered));

  // Also remove all venture links to this initiative
  const ventureInitiatives = getVentureInitiatives();
  const updatedLinks = ventureInitiatives.filter(
    (link) => link.initiativeId !== id
  );
  localStorage.setItem(
    VENTURE_INITIATIVES_KEY,
    JSON.stringify(updatedLinks)
  );
}

// Venture-Initiative linking functions
export function getVentureInitiatives(): VentureInitiative[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(VENTURE_INITIATIVES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading venture initiatives from storage:", error);
    return [];
  }
}

export function getInitiativesForVenture(ventureId: string): string[] {
  const links = getVentureInitiatives();
  return links
    .filter((link) => link.ventureId === ventureId)
    .map((link) => link.initiativeId);
}

export function getVenturesForInitiative(initiativeId: string): string[] {
  const links = getVentureInitiatives();
  return links
    .filter((link) => link.initiativeId === initiativeId)
    .map((link) => link.ventureId);
}

export function linkVentureToInitiatives(
  ventureId: string,
  initiativeIds: string[]
) {
  // Remove existing links for this venture
  const existingLinks = getVentureInitiatives().filter(
    (link) => link.ventureId !== ventureId
  );

  // Add new links
  const newLinks = initiativeIds.map((initiativeId) => ({
    ventureId,
    initiativeId,
  }));

  const updatedLinks = [...existingLinks, ...newLinks];
  localStorage.setItem(
    VENTURE_INITIATIVES_KEY,
    JSON.stringify(updatedLinks)
  );
}