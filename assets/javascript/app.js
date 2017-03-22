 // Initialize Firebase
var config = {
	apiKey: "AIzaSyDq35cQCk3GD895zwJYtSUetyI98lcnJ5o",
	authDomain: "trainschedule-a409d.firebaseapp.com",
	databaseURL: "https://trainschedule-a409d.firebaseio.com",
	storageBucket: "trainschedule-a409d.appspot.com",
	messagingSenderId: "184867364779"
};
	firebase.initializeApp(config);			

var database = firebase.database();

// Set Variables
var name = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

$("#submitButton").on("click", function(event) {
	event.preventDefault();

	// Value from inputs
	name = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();

	// Make sure all fields are complete
	if ((name === "") || (destination === "") || (firstTrain === "") || (frequency === "")) {
		alert("Please complete all fields.");
	}
	else {
		database.ref().push({
			name: name,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});

		// Clear input values
		$("#trainName").val("");
		$("#destination").val("");
		$("#firstTrain").val("");
		$("#frequency").val("");
	};
});

	database.ref().on("child_added", function(childSnapshot) {
      name = childSnapshot.val().name;
      destination = childSnapshot.val().destination;
      firstTrain = childSnapshot.val().firstTrain;
      frequency = childSnapshot.val().frequency;
      dateAdded = childSnapshot.val().dateAdded;
      console.log(name, destination, firstTrain, frequency, dateAdded);


      var firstTrainStart = moment(firstTrain, "HH:mm");
      console.log("first train: " + firstTrainStart);

      var currentTime = moment();
      console.log("current time: " + currentTime);

      var timeDiff = currentTime.diff(moment(firstTrainStart), "minutes");
      console.log("time diff: " + timeDiff);

    // Makes sure the first train is after the current time
    if (timeDiff >= 0) {
      var timeRemainder = timeDiff % frequency;
      console.log(timeRemainder);

      var minutesAway = frequency - timeRemainder;
      console.log("Minutes Away: " + minutesAway);

      var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
      console.log("Next arrival: " + nextArrival);
  }
  	// Uses the first train time if the current time is before this
  	else {
  		var minutesAway = timeDiff*-1;
  		var nextArrival = firstTrainStart.format("HH:mm");
  	};

      $("#example").append("<tr class='well'><td class='name'> " + name +
        " </td><td class='destination'> " + destination +
        " </td><td class='firstTrain'> " + firstTrain +
        " </td><td class='frequency'> " + frequency + 
        " min </td><td class='nextArrival'>" + nextArrival +
        "</td><td class='minutesAway'>" + minutesAway + " min</td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
