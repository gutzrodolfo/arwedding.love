
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

function getRsvpId() {
  var ref = firebase.database().ref("RsvpId");
  ref.once("value")
    .then(function (snapshot) {
      var rsvpId = snapshot.val();
      return rsvpId;
    });
}
