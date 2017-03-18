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

$("#submitButton").on("click", function() {
	event.preventDefault();

	var name = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrain = $("#firstTrain").val().trim();
	var frequency = $("#frequency").val().trim();

	console.log(name, destination, firstTrain, frequency);

	database.ref().push({
		name: name,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});

	database.ref().on("child_added", function(childSnapshot) {
		var snap = childSnapshot.val();
		console.log(snap);
	})
});