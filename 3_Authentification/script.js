var config = {
  apiKey: 'AIzaSyCvB1a8MMvfRgsM9tyHfNBPYxHF0F3PbEY',
  authDomain: 'workshop-firebase-pedro.firebaseapp.com',
  databaseURL: 'https://workshop-firebase-pedro.firebaseio.com',
  projectId: 'workshop-firebase-pedro',
  storageBucket: 'workshop-firebase-pedro.appspot.com',
  messagingSenderId: '20689145006'
}
firebase.initializeApp(config)
// const database = firebase.database()
// var storage = firebase.storage()
const auth = firebase.auth()

document.getElementById('btnSignUp').addEventListener('click', e => {
  const email = document.getElementById('txtEmail').value
  const password = document.getElementById('txtPassword').value

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        console.log("You're signed up")
      }
    })
    .catch(function (error) {
      console.log('fail')
      console.log(error)
    })
})

// document.getElementById("btnLogin").addEventListener("click", e => {});

// document.getElementById("btnLogOut").addEventListener("click", e => {});
