var config = {
  apiKey: "AIzaSyCvB1a8MMvfRgsM9tyHfNBPYxHF0F3PbEY",
  authDomain: "workshop-firebase-pedro.firebaseapp.com",
  databaseURL: "https://workshop-firebase-pedro.firebaseio.com",
  projectId: "workshop-firebase-pedro",
  storageBucket: "workshop-firebase-pedro.appspot.com",
  messagingSenderId: "20689145006"
};
firebase.initializeApp(config);
const database = firebase.database();
var storage = firebase.storage();

//Add image
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("change", e => {
  let file = e.target.files[0];
  let locationRef = storage.ref("users/" + file.name);
  let task = locationRef.put(file);
  let uploader = document.getElementById("progressBar");

  // Progress bar
  task.on(
    "state_changed",
    function progress(snapshot) {
      let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percent;
    },
    function error(error) {},
    function complete() {
      console.log("File transfered");
    }
  );
});
