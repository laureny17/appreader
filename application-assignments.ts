/**
 * ReviewRecords Concept
 */

import { randomUUID } from "crypto";
import { GeminiLLM } from "./gemini-llm";
import { User, admin } from "./event-directory";
import { Score } from "./models";

interface CurrentAssignment {
  user: User;
  application: Application;
  startTime: Date;
}

interface Application {
  applicantID: string;
  applicantYear: string;
  answers: string[];
  readsCompleted: number;
  readers: Set<User>;
}

export class ApplicationAssignments {
  private applications: Application[] = [];
  private currentAssignments: CurrentAssignment[] = [];

  addApplication(
    adder: User,
    event: Event,
    applicantID: string,
    applicantYear: string,
    answers: string[]
  ) {
    if (adder !== admin) {
      console.log("Only Admin can add an application!");
    }

    const newApplication: Application = {
      applicantID: applicantID,
      applicantYear: applicantYear,
      answers: [...answers],
      readsCompleted: 0,
      readers: new Set<User>(),
    };
    this.applications.push(newApplication);

    console.log(`Added application for ${applicantID}.`);
  }

  getNextAssignment(
    user: User,
    startTime: Date
  ): CurrentAssignment | undefined {
    // Scan from front and return first application user hasn't read yet
    for (const application of this.applications) {
      // Don't assign if user has already read this application
      if (application.readers.has(user)) {
        continue;
      }

      // Create assignment
      const assignment: CurrentAssignment = {
        user,
        application,
        startTime,
      };

      // Update application state
      application.readers.add(user);
      application.readsCompleted += 1;

      // Add to current assignments
      this.currentAssignments.push(assignment);
      console.log(
        `Assigned application ${application.applicantID} to user ${
          user.name
        } at ${startTime.toISOString()}.`
      );

      // Move the assigned application to the end of the list
      this.moveToEnd(application);
      return assignment;
    }

    // No unread applications found
    console.log(`No unread applications available for user ${user.name}.`);
    return undefined;
  }

  moveToEnd(application: Application): void {
    const index = this.applications.indexOf(application);
    if (index > -1) {
      this.applications.splice(index, 1);
      this.applications.push(application);
      console.log(
        `Moved application ${application.applicantID} to end of list.`
      );
    }
  }

  moveToFront(application: Application): void {
    const index = this.applications.indexOf(application);
    if (index > -1) {
      this.applications.splice(index, 1);
      this.applications.unshift(application);
      console.log(
        `Moved application ${application.applicantID} to front of list.`
      );
    }
  }
}
