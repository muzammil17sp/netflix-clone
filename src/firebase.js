import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBo19YkwF0b85hC7OrBWSCgybrSgsefC5o",
  authDomain: "netflix-clone-afa12.firebaseapp.com",
  projectId: "netflix-clone-afa12",
  storageBucket: "netflix-clone-afa12.appspot.com",
  messagingSenderId: "1080176838063",
  appId: "1:1080176838063:web:e058762a211181a4449b5a",
  measurementId: "G-WDX7395555",
});
export const auth = firebaseApp.auth()
