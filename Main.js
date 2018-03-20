var config = {
    apiKey: "AIzaSyA_GxAOd7-blk4SXcCnB68eDgYvbUpTaVg",
    authDomain: "train-homework-f1c73.firebaseapp.com",
    databaseURL: "https://train-homework-f1c73.firebaseio.com",
    projectId: "train-homework-f1c73",
    storageBucket: "",
    messagingSenderId: "911735223158"
};

firebase.initializeApp(config);

var trainData = firebase.database();
$("#addTrainBtn").on("click", function(){
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();
	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}
	trainData.ref().push(newTrain);
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");
	return false;
});
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;
	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});

