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

	name = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();

	database.ref().push({
		name: name,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");
	});

	database.ref().on("child_added", function(childSnapshot) {
      name = childSnapshot.val().name;
      destination = childSnapshot.val().destination;
      firstTrain = childSnapshot.val().firstTrain;
      frequency = childSnapshot.val().frequency;
      dateAdded = childSnapshot.val().dateAdded;
      console.log(name, destination, firstTrain, frequency, dateAdded);


      var firstTrainStart = moment(firstTrain, "hh:mm").subtract(1, "years");
      console.log("first train: " + firstTrainStart);

      var currentTime = moment();
      console.log("current time: " + currentTime);

      var timeDiff = moment().diff(moment(firstTrainStart), "minutes");
      console.log("time diff: " + timeDiff);

      var timeRemainder = timeDiff % frequency;
      console.log(timeRemainder);

      var minutesAway = frequency - timeRemainder;
      console.log("Minutes Away: " + minutesAway);

      var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
      console.log("Next arrival: " + nextArrival);

      $("#example").append("<tr class='well'><td class='name'> " + name +
        " </td><td class='destination'> " + destination +
        // " </td><td class='firstTrain'> " + firstTrain +
        " </td><td class='frequency'> " + frequency + 
        " min </td><td class='nextArrival'>" + nextArrival +
        "</td><td class='minutesAway'>" + minutesAway + " min</td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
