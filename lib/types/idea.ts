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
  technicalFeasibility: "Do you or your team have the skills and resources to build this idea with minimal external help? (10 = Very feasible)",
  timeToMvp: "How quickly can a basic version of the product be developed and tested in the market? (10 = Very quick)",
  costToDevelop: "What are the upfront costs (software, tools, development, etc.)? Can it be built within your current cash flow? (10 = Very cost-effective)",
  marketDemand: "Is there a clear market demand for this idea, and does it have potential for early revenue generation? (10 = High demand)",
  scalability: "Can this idea be easily scaled once the MVP is launched, without major additional investment in time or money? (10 = Highly scalable)",
  maintenanceComplexity: "How complex will the ongoing maintenance be? Will it require significant ongoing time and resources? (10 = Very easy)",
  industryFamiliarity: "How familiar are you with the industry and it's inner workings (10 = Very familiar)",
  industryRestrictions: "Is the proposed industry restricted or regulated like medical, financial or military?  (10 = Very few restrictions)",
  prototypability: "How easy is it to prototype this type of application? (10 = Very easy)",
  assumptions: "Given a value dev sprint, how many large assumptions need to be true/false before you know this is a go/no-go on the value scale (10 = Very few assumptions)",
  userAdjacency: "How easy is it for you to reach the end buyer of this technology. (10 = Very close)"
};