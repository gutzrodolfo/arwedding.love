
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2HltkRxPcyuOmoRR3doDv39JKXDp8-1E",
    authDomain: "arwedding-31ea4.firebaseapp.com",
    databaseURL: "https://arwedding-31ea4.firebaseio.com",
    projectId: "arwedding-31ea4",
    storageBucket: "arwedding-31ea4.appspot.com",
    messagingSenderId: "1035994472977"
  };
  firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
console.log("database: ", database.ref("https://arwedding-31ea4.firebaseio.com/RsvpId"));
