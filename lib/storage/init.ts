"use client";

import { Initiative } from "../types/initiative";
import { saveInitiative } from "./initiatives";

const DEFAULT_INITIATIVE: Initiative = {
  id: "default-initiative",
  title: "General Projects",
  description: "Default initiative for general projects and ventures",
  icon: "Rocket",
  color: "blue",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function initializeStorage() {
  if (typeof window === "undefined") return;
  
  const INIT_KEY = "app_initialized";
  
  // Check if app has been initialized before
  if (!localStorage.getItem(INIT_KEY)) {
    // Clear any existing data
    localStorage.clear();
    
    // Create default initiative
    saveInitiative(DEFAULT_INITIATIVE);
    
    // Mark as initialized
    localStorage.setItem(INIT_KEY, "true");
  }
}