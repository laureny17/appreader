concept EventDirectory
purpose Manage past and present events and their associated details.
principle Users can register for a chosen event.
    The admin can create and archive events and manage rubric/scoring guidelines, number of required reads per application, and approved readers for the active event.
state
    a set of Users with
        an email String
        a name String
        a password String
        an Event
        a readCount Number
        a totalTime Number
        a skipCount Number
    an Admin with
        a User
    a set of Events with
        a name String
        an active Flag
        a requiredReadsPerApp Number
        a rubric set of RubricDimensions
        a eligibilityCriteria set of String;
        a readers set of Users
        an unverifiedUsers set of Users
    a set of RubricDimensions with
        a name String
        a description String
        a scaleMin Number
        a scaleMax Number
actions
    createEvent (caller: User, name: String, requiredReadsPerApp: Number, rubric: set of RubricDimensions): (event: Event)
        requires: caller is the Admin
        effect: add a new Event and set its active flag to true
    activateEvent (caller: User, name: String)
        requires: caller is the admin, event with name is not active
        effect: sets the event's active flag to true
    inactivateEvent (caller: User, name: String)
        requires: caller is the Admin, event with name is active
        effect: sets the event's active flag to false
    updateEventConfig (caller: User, event: Event, requiredReadsPerApp: Number, rubric: set of RubricDimensions)
        requires: caller is the Admin and event is an active event
        effect: update provided fields
    addReader (caller: User, event: Event, user: User)
        requires: caller is the Admin, event is an active event and user is in Users
        effect: remove user from event.unverifiedUsers and add user in event.Readers
    removeReader (caller: User, event: Event, user: User)
        requires: caller is the Admin, event is an active event and user is in the event's Readers
        effect: remove user from event.Readers and add user to event.unverifiedUsers
    register (name: String, email: String, password: String, event: Event) : (user: User)
        requires: no user with the same email registered under the same event, password at least 8 characters long
        effect: creates a new user to be added to the unverifiedUsers set for the provided event
    login (email: String, password: String, event: Event) : (user: User)
        requires: password provided matches with the password associated with the User with email email under the provided event
        effect: successfully authenticate user
    incrementReadCount (user: User)
        requires: user's event is an active event
        effect: user.readCount += 1
    incrementSkipCount (user: User)
        requires: user's event is an active event
        effect: user.skipCount += 1
    addToTotalTime (user: User, seconds: Number)
        requires: user's event is an active event
        effect: user.totalTime += seconds
