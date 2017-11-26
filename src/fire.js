import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDuz_JAgs1iVpIUe5IjwtqmwxujeBlvcf4",
    authDomain: "omkar-electricals.firebaseapp.com",
    databaseURL: "https://omkar-electricals.firebaseio.com",
    projectId: "omkar-electricals",
    storageBucket: "",
    messagingSenderId: "538350696230"
};
var fire = firebase.initializeApp(config);
export default fire;