import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDG-XZmHjZmACfGzBthLPt99A8wekZ4RBQ",
    authDomain: "react-redux-firebaseapp.firebaseapp.com",
    databaseURL: "https://react-redux-firebaseapp.firebaseio.com",
    projectId: "react-redux-firebaseapp",
    storageBucket: "react-redux-firebaseapp.appspot.com",
    messagingSenderId: "912844551720"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;