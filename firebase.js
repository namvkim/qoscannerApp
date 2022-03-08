import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhw5Hg2C7zTrG6hRNH6ZdtVjLpmy633zo",
  authDomain: "qoscanner.firebaseapp.com",
  databaseURL: "https://qoscanner-default-rtdb.firebaseio.com",
  projectId: "qoscanner",
  storageBucket: "qoscanner.appspot.com",
  messagingSenderId: "536190426269",
  appId: "1:536190426269:web:3a6d6645089c9e1f1a4874",
  measurementId: "G-6RK8G5VG9Q",
};

let firebaseApp;
if (firebase.apps.length === 0){
  firebaseApp = initializeApp(firebaseConfig)
}
else{
  firebaseApp = app()
}

const db = getFirestore(firebaseApp);

export { db };
