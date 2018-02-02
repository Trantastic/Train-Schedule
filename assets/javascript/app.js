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

	//Assigning values from input
	var trainName = $("#train-name").val().trim();
	var trainDes = $("#destination").val().trim();
	var trainStart = $("#first-train").val().trim();
	var trainFreq = $("#frequency").val().trim();
	// Assigning unique id
	// for(var i = 0; i >)
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
	// console.log(childSnapshot);
	
	var trainName = childSnapshot.val().name;
	var trainDes = childSnapshot.val().des;
	var trainStart = childSnapshot.val().start;
	var trainFreq = childSnapshot.val().freq;

	// Formatting time
	var formatTime = moment(trainStart, "hh:mm").subtract(1, "years");
	// Grabbing current time
	var currentTime = moment();
	var differenceTime = moment().diff(moment(formatTime), "minutes");
	var timeRemain = differenceTime % trainFreq;
	// console.log(timeRemain);
	var minAway = trainFreq - timeRemain;
	var nextT = moment().add(minAway, "minutes");
	// Formatting next train time
	var nextTrain = moment(nextT).format("hh:mm A");

  	
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>"); 
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);});
















