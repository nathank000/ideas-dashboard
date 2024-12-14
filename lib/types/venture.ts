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