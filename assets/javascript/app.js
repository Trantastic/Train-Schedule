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

// create function to add new train info from firebase onto the html table

database.ref().on("value", function(snapshot){
  
});