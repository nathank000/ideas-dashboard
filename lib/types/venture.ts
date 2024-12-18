export interface Venture {
  id: string;
  title: string;
  description: string;
  metrics: {
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
  };
  resources: {
    id: string;
    title: string;
    description: string;
    type: 'link' | 'file';
    url: string;
    createdAt: Date;
  }[];
  attributeProfileId?: string;
  attributes: {
    definitionId: string;
    value: string | number | boolean;
  }[];
  team: TeamMember[];
  progress: number;
  dueDate: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  active: boolean;
  risks: VentureRisk[];
  assumptions: VentureAssumption[];
  events: VentureEvent[];
  meetingNotes: MeetingNote[];
  decisionLogs: DecisionLog[];
  contacts: VentureContact[];
  scopeItems: ScopeItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VentureMetrics {
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

export interface TeamMember {
  name: string;
  avatar: string;
}

export interface VentureRisk {
  id: string;
  title: string;
  detail: string;
  mitigationPlan: string;
  mitigated: boolean;
  createdAt: Date;
}

export interface VentureAssumption {
  id: string;
  title: string;
  type: "technical" | "strategic" | "value" | "operational";
  detail: string;
  notes: string;
  holdsTrue: boolean;
  createdAt: Date;
}

export interface VentureEvent {
  id: string;
  title: string;
  when: string;
  type: "event" | "update";
  detail: string;
  notes: string;
  sentiment: "positive" | "negative" | "neutral";
  createdAt: Date;
}

export interface MeetingNote {
  id: string;
  title: string;
  when: string;
  notes: string;
  sentiment: "positive" | "negative" | "neutral";
  createdAt: Date;
}

export interface DecisionLog {
  id: string;
  title: string;
  when: string;
  notes: string;
  sentiment: "positive" | "negative" | "neutral";
  owner: string;
  createdAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  linkedIn: string;
  dateAdded: string;
  notes: string;
  createdAt: Date;
}

export interface VentureContact {
  contactId: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  dateAdded: string;
}

export interface ScopeItem {
  id: string;
  title: string;
  description: string;
  status: 'in' | 'out';
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

//added metrics for ventures in an effort to remove the notion of ideas.

export type MetricGroup = 'Desirable' | 'Viable' | 'Feasible';

export interface MetricDefinition {
  description: string;
  group: MetricGroup;
}

export const metricDefinitions: Record<keyof VentureMetrics, MetricDefinition> = {
  technicalFeasibility: {
    description: "Do you or your team have the skills and resources to build this idea with minimal external help? (10 = Very feasible)",
    group: 'Feasible'
  },
  timeToMvp: {
    description: "How quickly can a basic version of the product be developed and tested in the market? (10 = Very quick)",
    group: 'Feasible'
  },
  costToDevelop: {
    description: "What are the upfront costs (software, tools, development, etc.)? Can it be built within your current cash flow? (10 = Very cost-effective)",
    group: 'Viable'
  },
  marketDemand: {
    description: "Is there a clear market demand for this idea, and does it have potential for early revenue generation? (10 = High demand)",
    group: 'Desirable'
  },
  scalability: {
    description: "Can this idea be easily scaled once the MVP is launched, without major additional investment in time or money? (10 = Highly scalable)",
    group: 'Viable'
  },
  maintenanceComplexity: {
    description: "How complex will the ongoing maintenance be? Will it require significant ongoing time and resources? (10 = Very easy)",
    group: 'Feasible'
  },
  industryFamiliarity: {
    description: "How familiar are you with the industry and it's inner workings (10 = Very familiar)",
    group: 'Feasible'
  },
  industryRestrictions: {
    description: "Is the proposed industry restricted or regulated like medical, financial or military? (10 = Very few restrictions)",
    group: 'Viable'
  },
  prototypability: {
    description: "How easy is it to prototype this type of application? (10 = Very easy)",
    group: 'Feasible'
  },
  assumptions: {
    description: "Given a value dev sprint, how many large assumptions need to be true/false before you know this is a go/no-go on the value scale (10 = Very few assumptions)",
    group: 'Viable'
  },
  userAdjacency: {
    description: "How easy is it for you to reach the end buyer of this technology. (10 = Very close)",
    group: 'Desirable'
  }
};