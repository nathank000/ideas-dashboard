export interface TeamMember {
  name: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  team: TeamMember[];
  status: "planning" | "in-progress" | "review" | "completed";
  createdAt: Date;
  updatedAt: Date;
}