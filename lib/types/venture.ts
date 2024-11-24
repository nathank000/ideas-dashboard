// Update the Contact interface to remove sentiment
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

// Add a new interface for venture-specific contact reference
export interface VentureContact {
  contactId: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  dateAdded: string;
}

// Update the Venture interface
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
  createdAt: Date;
  updatedAt: Date;
}