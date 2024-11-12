import { AttributeValue } from "./attributes";

export interface IdeaMetrics {
  technicalFeasibility: number;
  timeToMvp: number;
  costToDevelop: number;
  marketDemand: number;
  scalability: number;
  maintenanceComplexity: number;
  industryFamiliarity: number;
  industryRestrictions: number;
  prototypability: number;
  assumptions: number;
  userAdjacency: number;
}

export interface IdeaResource {
  id: string;
  title: string;
  description: string;
  type: 'link' | 'file';
  url: string;
  createdAt: Date;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  metrics: IdeaMetrics;
  resources: IdeaResource[];
  attributeProfileId?: string;
  attributes: AttributeValue[];
  createdAt: Date;
  updatedAt: Date;
}

export const metricDefinitions: Record<keyof IdeaMetrics, string> = {
  technicalFeasibility: "How technically feasible is the implementation? (10 = Very feasible)",
  timeToMvp: "How quickly can an MVP be developed? (10 = Very quick)",
  costToDevelop: "How cost-effective is the development? (10 = Very cost-effective)",
  marketDemand: "What is the market demand and revenue potential? (10 = High demand)",
  scalability: "How scalable is the solution? (10 = Highly scalable)",
  maintenanceComplexity: "How easy is it to maintain? (10 = Very easy)",
  industryFamiliarity: "How familiar are we with the industry? (10 = Very familiar)",
  industryRestrictions: "How free from regulations is it? (10 = Very few restrictions)",
  prototypability: "How easy is it to prototype? (10 = Very easy)",
  assumptions: "How few major assumptions are there? (10 = Very few assumptions)",
  userAdjacency: "How close is it to existing users? (10 = Very close)"
};