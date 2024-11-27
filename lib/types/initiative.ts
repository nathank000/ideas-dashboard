export interface Initiative {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// For linking ventures to initiatives
export interface VentureInitiative {
  ventureId: string;
  initiativeId: string;
}