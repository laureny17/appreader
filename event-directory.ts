import config from "./config.json";

export interface Event {
  name: String;
  active: Boolean;
  requiredReadsPerApp: Number;
  questions: Set<String>;
  rubric: Set<RubricDimensions>;
  readers: Set<User>;
  unverifiedUsers: Set<User>;
}

export interface RubricDimensions {
  name: String;
  description: String;
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
