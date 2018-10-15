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

const keyLang = {
  birthday: "Anniversaire",
  city: "Ville",
  firstname: "Prenom",
  lastname: "Nom",
  mail: "E-mail"
};

function reloadData(snapshot) {
  document.getElementById("myList").innerHTML = "";
  snapshot.forEach(item => {
    const data = item.val();

    let newData = {
      firstname: data.firstname,
      lastname: data.lastname,
      birthday: data.birthday,
      city: data.city,
      mail: data.mail
    };
    let nodeUser = document.createElement("LI");
    let nodeUserUL = document.createElement("UL");

    for (let i in newData) {
      let propertyValue = document.createTextNode(
        keyLang[i] + " : " + newData[i]
      );
      let nodeUserLI = document.createElement("LI");
      nodeUserLI.appendChild(propertyValue);
      nodeUserUL.appendChild(nodeUserLI);
    }
    nodeUser.appendChild(nodeUserUL);
    document.getElementById("myList").appendChild(nodeUser);
  });
}

//dynamic update
const rootRef = database.ref("users/");
rootRef.on("value", function(snapshot) {
  reloadData(snapshot);
});

//console.log
var ref = firebase.database().ref();
ref.on(
  "value",
  function(snapshot) {
    console.log(snapshot.val());
  },
  function(error) {
    console.log("Error: " + error.code);
  }
);

//add new user to database with html form version push
var addUser = firebase.database().ref("users");
var submitUser = function() {
  var addfirstame = document.getElementById("addFirstname").value;
  var addLastname = document.getElementById("addLastname").value;
  var addBirthday = document.getElementById("addBirthday").value;
  var addEmail = document.getElementById("addEmail").value;
  var addCity = document.getElementById("addCity").value;
  addUser.push({
    birthday: addBirthday,
    city: addCity,
    firstname: addfirstame,
    lastname: addLastname,
    mail: addEmail
  });
};

function submitUser() {
  var submitUserForm = document.getElementsByClassName("addFirebase");
  submitUserForm.submit(submitUser);
}

// Add User version Cédric version set
// ADD / UPDATE dans le form onsubmit="writeData(this)
// Get user ID to update

function writeData(form) {
  database.ref("users/" + form.userID.value).set({
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    birthday: form.birthday.value,
    city: form.city.value,
    mail: form.mail.value
  });
}

function removeData(form) {
  database
    .ref("users/" + form.userID.value)
    .remove()
    .then(function() {
      console.log("removed");
    })
    .catch(function(error) {
      console.log("remove failed: " + error.message);
    });
}
