// var firebaseConfig = {
//     apiKey: "AIzaSyD2TdcH4dVnk_hgI4pd_lnjTqQyY9rmDmk",
//     authDomain: "newmusicapp-424fa.firebaseapp.com",
//     databaseURL: "https://newmusicapp-424fa.firebaseio.com",
//     projectId: "newmusicapp-424fa",
//     storageBucket: "newmusicapp-424fa.appspot.com",
//     messagingSenderId: "608051405478",
//     appId: "1:608051405478:web:0b0bcd65ecbc6250f94a67",
//     measurementId: "G-G9CKET0QWP"
// };
var firebaseConfig = {
    apiKey: "AIzaSyBwCXhcUSv5JOrAy4sID2q1w19B6j-obbM",
    authDomain: "humanresourcemanager-57f05.firebaseapp.com",
    databaseURL: "https://humanresourcemanager-57f05.firebaseio.com",
    projectId: "humanresourcemanager-57f05",
    storageBucket: "humanresourcemanager-57f05.appspot.com",
    messagingSenderId: "1067047056856",
    appId: "1:1067047056856:web:a7f2b35fbde5e4a0142ead"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signIn() {
    var email = document.getElementById("input-emai").value;
    var password = document.getElementById("input-password").value
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));

}