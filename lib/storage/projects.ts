import { Project } from "../types/project";

const STORAGE_KEY = "projects";

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveProject(project: Project) {
  const projects = getStoredProjects();
  projects.push(project);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function updateProject(project: Project) {
  const projects = getStoredProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index !== -1) {
    projects[index] = project;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}

export function deleteProject(id: string) {
  const projects = getStoredProjects();
  const filtered = projects.filter((project) => project.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}