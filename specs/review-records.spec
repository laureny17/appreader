<original concept>

concept ReviewRecords
purpose Store reviews of applications, with editing, flagging, and comments
principle A user can submit a review for an application, and overwrite their past reviews with edits. They can also
    add a flag to an application, and write comments for other users to see.
state
    a set of Reviews with
        an Application
        an reader User
        a submittedAt DateTime
        a set of Scores
    a set of Scores with
        a criterion String
        a value Number
    a set of RedFlags with
        an Application
        an author User
    a set of Comments with
        an Application
        an author User
        a text String
        a quotedSnippet String
actions
    submitReview (reader: User, application: Application, scores: set of Scores, currentTime: DateTime): (review: Reviews)
        requires: application is in the active event, reader is a reader for that event,
        reader currently assigned this application
        effect: create a Review with the provided details
    editReview (reader: User, review: Reviews, scores: set of Scores)
        requires: reader is the creator of the review (review.reader)
        effect: overwrite the review’s scores to the provided updated values
    addRedFlag (author: User, application: Application)
        requires: application belongs to active event and author is a reader
        effect: add a RedFlag for this application associated with the author to the set of RedFlags
    addComment (author: User, application: Application, text: String, quotedSnippet: String)
        requires: application belongs to active event and author is currently reading the application
        effect: add comment with provided details to the set of comments

<edited concept, AI-augmented>
concept ReviewRecords
purpose Store reviews of applications, with editing, flagging, and comments
principle A user can submit a review for an application, and overwrite their past reviews with edits. They can also
    add a flag to an application, and write comments for other users to see.
state
    a set of Reviews with
        an Application
        an reader User
        a submittedAt DateTime
        a set of Scores
    a set of Scores with
        a criterion String
        a value Number
    a set of RedFlags with
        an Application
        an author User
    a set of Comments with
        an Application
        an author User
        a text String
        a quotedSnippet String
    a set of AIComments with
        an Application
        a category (Strong | Weak | RedFlag)
        a text String
        a justification String
actions
    submitReview (reader: User, application: Application, scores: set of Scores, currentTime: DateTime): (review: Reviews)
        requires: application is in the active event, reader is a reader for that event,
        reader currently assigned this application
        effect: create a Review with the provided details
    editReview (reader: User, review: Reviews, scores: set of Scores)
        requires: reader is the creator of the review (review.reader)
        effect: overwrite the review’s scores to the provided updated values
    addRedFlag (author: User, application: Application)
        requires: application belongs to active event and author is a reader
        effect: add a RedFlag for this application associated with the author to the set of RedFlags
    addComment (author: User, application: Application, text: String, quotedSnippet: String)
        requires: application belongs to active event and author is currently reading the application
        effect: add comment with provided details to the set of comments
    async generateAIComments (application: Application, llm:GeminiLLM)
        requires: application belongs to active event
        effect: use llm to produce categorized comments to add to the set of AIComments
