import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnzcBsUE-vfR1SyPLo0xxYzYV8UMv3ALw",
  authDomain: "condominio-firebase.firebaseapp.com",
  databaseURL: "https://condominio-firebase.firebaseio.com",
  projectId: "condominio-firebase",
  storageBucket: "condominio-firebase.appspot.com",
  messagingSenderId: "771443431328",
  appId: "1:771443431328:web:cae440b54c705a1910b6c5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
