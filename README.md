## HW - {Train-Scheduler}

### Live Link
 - https://puchk.github.io/Train-Scheduler/

### Instructions/Requirements
 - When adding trains, administrators should be able to submit the following:
    - Train Name
    - Destination
    - First Train Time -- in military time
    - Frequency -- in minutes
    - Code this app to calculate when the next train will arrive; this should be relative to the current time.
    - Users from many different machines must be able to view same train times.

### Technologies Used
 - Google Firebase
 - JQuery
 - Bootstrap
 - Moment JS

### Code Example of Pushing Data to Firebase
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });