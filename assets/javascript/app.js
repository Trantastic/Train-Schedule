  // Initialize Firebase
var config = {
	apiKey: "AIzaSyCykgO2HeE6XxGo5KIMlu77zJGvEVQkhGc",
	authDomain: "train-schedule-e6f0c.firebaseapp.com",
	databaseURL: "https://train-schedule-e6f0c.firebaseio.com",
	projectId: "train-schedule-e6f0c",
	storageBucket: "train-schedule-e6f0c.appspot.com",
	messagingSenderId: "340342838667"
};
firebase.initializeApp(config);

var database = firebase.database();

// Adds trains to firebase
$("#add-train").on("click", function(event){
	event.preventDefault();

	var trainName = $("#train-name").val().trim();
	var trainDes = $("#destination").val().trim();
	var trainStart = $("#first-train").val().trim();
	var trainFreq = $("#frequency").val().trim();
	
	// Object to to hold values and push into firebase
	var newTrain = {
		name: trainName,
		des: trainDes,
		start: trainStart,
		freq: trainFreq
	};

	database.ref().push(newTrain);

	alert("New train successfully added");

	// Clears the input boxes
	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train").val("");
	$("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot);
	
	var trainName = childSnapshot.val().name;
	var trainDes = childSnapshot.val().des;
	var trainStart = childSnapshot.val().start;
	var trainFreq = childSnapshot.val().freq;

	// How far (min away) is train
	var minutesAway = moment(trainStart, "HH:mm").toNow();
	console.log(minutesAway);

	var tba = "tba";

	// Formats next train time
	// var formatFreq = moment().format();
	// console.log(formatFreq);
  	
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" + trainFreq + "</td><td>" + tba + "</td><td>" + minutesAway + "</td></tr>"); 
});
















