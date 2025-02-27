export interface Timer {
    id: string;
    name: string;
    unit: "Seconds" | "Hours" | "Minutes";
    duration: number;
    category: string;
    remainingTime: number;
    status: "running" | "paused" | "completed";
    halfwayAlert: boolean;
    completionTime: string;
  }