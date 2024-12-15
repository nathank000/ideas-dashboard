"use client";

interface Vote {
  id: string;
  ventureId: string;
  type: "up" | "down";
  email?: string;
  comment?: string;
  timestamp: Date;
}

const VOTES_KEY = "venture_votes";

export function getVotes(ventureId: string): Vote[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(VOTES_KEY);
  const votes = stored ? JSON.parse(stored) : [];
  return votes.filter((vote: Vote) => vote.ventureId === ventureId);
}

export function addVote(vote: Vote) {
  const stored = localStorage.getItem(VOTES_KEY);
  const votes = stored ? JSON.parse(stored) : [];
  votes.push(vote);
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}