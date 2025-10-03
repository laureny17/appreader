// shared across EventDirectory, ApplicationAssignments, and ReviewRecords

export interface User {
  id: string;
  name: string;
}

export interface Application {
  id: string;
  applicantName: string;
  submittedAt: Date;
}

export interface Score {
  criterion: string;
  value: number; // e.g., 1-10 scale
}
