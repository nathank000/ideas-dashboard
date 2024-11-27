export interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: "red" | "green" | "blue" | "yellow" | "purple" | "orange";
  createdAt: Date;
  updatedAt: Date;
}

// For linking ventures to initiatives
export interface VentureInitiative {
  ventureId: string;
  initiativeId: string;
}

export const initiativeColors = {
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
} as const;