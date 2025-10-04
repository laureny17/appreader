/**
 * ReviewRecord Concept
 */

import { randomUUID } from "crypto";
import { User, Application, Score } from "./models";

export interface Review {
  id: string;
  reader: User;
  application: Application;
  submittedAt: Date;
  scores: Score[];
}

export interface RedFlag {
  id: string;
  author: User;
  application: Application;
  flaggedAt: Date;
}

export interface Comment {
  id: string;
  author: User;
  application: Application;
  text: string;
  quotedSnippet: string;
  commentedAt: Date;
}

export class ReviewRecords {
  private reviews: Map<string, Review> = new Map(); // map id to review
  private redFlags: Map<string, RedFlag> = new Map(); // map id to red flag
  private comments: Map<string, Comment> = new Map(); // map id to comment

  private applicationsToUsers: Map<Application, Set<User>> = new Map();

  // NOTE: we could add indices (application -> reviews/comments/flags) to avoid linear scans
  // This strays from the original concept design, though

  /**
   * Submit a new review for an application by a reader
   */
  submitReview(
    reader: User,
    application: Application,
    scores: Score[],
    currentTime: Date
  ): Review {
    // update applicationsToReaders
    let readersSet = this.applicationsToUsers.get(application);
    if (!readersSet) {
      readersSet = new Set<User>();
      this.applicationsToUsers.set(application, readersSet);
    }
    if (readersSet.has(reader)) {
      throw new Error(
        `User has already submitted a review for this application.`
      );
    }
    readersSet.add(reader);

    const review: Review = {
      id: randomUUID(),
      reader,
      application,
      scores,
      submittedAt: currentTime,
    };

    this.reviews.set(review.id, review);

    console.log(`User submitted review at ${currentTime.toISOString()}`);

    console.log("Scores:");
    for (const score of scores) {
      console.log(`${score.criterion}: ${score.value}`);
    }

    return review;
  }

  /**
   * Edit an existing review's scores
   */
  editReview(reader: User, review: Review, scores: Score[]): Review {
    // Check if reader is the owner of the review
    if (reader !== review.reader) {
      throw new Error(`User is not the author of this review.`);
    }

    // Update review scores to the edited version
    review.scores = scores;

    // Update time of review submission
    review.submittedAt = new Date();

    console.log(`User edited review at ${review.submittedAt.toISOString()}`);

    console.log("Scores:");
    for (const score of scores) {
      console.log(`${score.criterion}: ${score.value}`);
    }

    return review;
  }

  /**
   * Add a red flag to an application
   */
  addRedFlag(author: User, application: Application): RedFlag {
    const redFlag: RedFlag = {
      id: randomUUID(),
      author,
      application,
      flaggedAt: new Date(),
    };

    this.redFlags.set(redFlag.id, redFlag);

    console.log(
      `User added red flag to application at ${redFlag.flaggedAt.toISOString()}`
    );

    return redFlag;
  }

  /**
   * Add a comment to an application
   */
  addComment(
    author: User,
    application: Application,
    text: string,
    quotedSnippet: string
  ): Comment {
    const comment: Comment = {
      id: randomUUID(),
      author,
      application,
      text,
      quotedSnippet,
      commentedAt: new Date(),
    };

    this.comments.set(comment.id, comment);

    console.log(
      `User added comment added for application at ${comment.commentedAt.toISOString()}`
    );
    console.log(`Quoted snippet: "${quotedSnippet}"`);
    console.log(`Comment text: "${text}"`);
    return comment;
  }
}
