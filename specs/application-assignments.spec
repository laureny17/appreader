concept ApplicationAssignments
purpose Store application data (including read-counts) and assign them one at a time to users to read, allowing skips.
principle The admin can add applications to an active event. This should initialize all applications in the database to
    have 0 reads. Each reader is assigned one application to read at a time. Applications are assigned prioritizing
    those with the fewest reads so far, and a user cannot read an application they have already read. Applications can
    be skipped, and get prioritized if so.
state
    a set of CurrentAssignments with
        a User
        an Application
        a startTime DateTime
    a set of Applications with
        an applicantID String
        an applicantYear String
        a set of QuestionsAndAnswers
        a readsCompleted Number
        a readers set of Users
    a set of QuestionsAndAnswers with
        a question String
        an answer String
actions
    addApplications (adder: User, event: Event, applications: set of Applications): (application: Applications)
        requires: adder is the Admin and event is an active event
        effect: create applications for each applicantID associated with an applicantYear, a set of questions and
        answers from the application, and readsCompleted = 0
    getNextAssignment (user: User, event: Event, startTime: DateTime): (assignment: CurrentAssignments)
        requires: event is the active event, and user is a reader for event
        effect: create a CurrentAssignment for this user with startTime, with an application
            that does not have user in readers set
