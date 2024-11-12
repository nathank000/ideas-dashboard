import { AttributeValue } from "./attributes";

export interface TeamMember {
  name: string;
  avatar: string;
}

export interface ProjectResource {
  id: string;
  title: string;
  description: string;
  type: 'link' | 'file';
  url: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  team: TeamMember[];
  status: "planning" | "in-progress" | "review" | "completed";
  resources: ProjectResource[];
  attributeProfileId?: string;
  attributes: AttributeValue[];
  createdAt: Date;
  updatedAt: Date;
}