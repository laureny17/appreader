import config from "../config.json";

export interface Event {
  name: string;
  active: Boolean;
  requiredReadsPerApp: Number;
  questions: string[];
  rubric: RubricDimensions[];
  eligibilityCriteria: string[];
  readers: Set<User>;
  unverifiedUsers: Set<User>;
}

export interface RubricDimensions {
  name: string;
  description: string;
  scaleMin: Number;
  scaleMax: Number;
}

export interface User {
  email: string;
  name: string;
  password: string;
  event: Event;
  readCount: number;
  totalTime: number;
  skipCount: number;
}

export const admin: User = {
  email: config.adminEmail,
  name: config.adminName,
  password: config.adminPassword,
  event: {} as Event,
  readCount: 0,
  totalTime: 0,
  skipCount: 0,
};

export class EventDirectory {
  static incrementUserReadCount(user: User): void {
    user.readCount += 1;
  }

  static incrementUserSkipCount(user: User): void {
    user.skipCount += 1;
  }
}
