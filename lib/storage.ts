import { Idea, IdeaResource } from "./types/idea";

const STORAGE_KEY = "ideas";

export function getStoredIdeas(): Idea[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveIdea(idea: Idea) {
  const ideas = getStoredIdeas();
  ideas.push(idea);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

export function updateIdea(idea: Idea) {
  const ideas = getStoredIdeas();
  const index = ideas.findIndex((i) => i.id === idea.id);
  if (index !== -1) {
    ideas[index] = idea;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }
}

export function deleteIdea(id: string) {
  const ideas = getStoredIdeas();
  const filtered = ideas.filter((idea) => idea.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function addResource(ideaId: string, resource: IdeaResource) {
  const ideas = getStoredIdeas();
  const idea = ideas.find((i) => i.id === ideaId);
  if (idea) {
    idea.resources = [...(idea.resources || []), resource];
    idea.updatedAt = new Date();
    updateIdea(idea);
  }
}

export function updateResource(ideaId: string, resource: IdeaResource) {
  const ideas = getStoredIdeas();
  const idea = ideas.find((i) => i.id === ideaId);
  if (idea) {
    idea.resources = (idea.resources || []).map((r) =>
      r.id === resource.id ? resource : r
    );
    idea.updatedAt = new Date();
    updateIdea(idea);
  }
}

export function deleteResource(ideaId: string, resourceId: string) {
  const ideas = getStoredIdeas();
  const idea = ideas.find((i) => i.id === ideaId);
  if (idea) {
    idea.resources = (idea.resources || []).filter((r) => r.id !== resourceId);
    idea.updatedAt = new Date();
    updateIdea(idea);
  }
}