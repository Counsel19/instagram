import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { seedDatabase } from "../seed";

//call the seed file only once;

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:  process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = initializeApp(config);

const auth = getAuth(firebase)

const db = getFirestore(firebase)
// seedDatabase(firebase)


export { firebase, FieldValue, auth, db};
