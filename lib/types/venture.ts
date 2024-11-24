import { AttributeValue } from "./attributes";
import { IdeaMetrics } from "./idea";
import { TeamMember } from "./project";

export interface VentureResource {
  id: string;
  title: string;
  description: string;
  type: 'link' | 'file';
  url: string;
  createdAt: Date;
}

export interface Venture {
  id: string;
  title: string;
  description: string;
  metrics: IdeaMetrics;
  resources: VentureResource[];
  attributeProfileId?: string;
  attributes: AttributeValue[];
  team: TeamMember[];
  progress: number;
  dueDate?: string;
  status: "planning" | "in-progress" | "review" | "completed";
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}