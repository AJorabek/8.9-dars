import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBqWIKUsMcagpOuODsBilooQ6DpHhKzNA",
  authDomain: "fn12-b48db.firebaseapp.com",
  projectId: "fn12-b48db",
  storageBucket: "fn12-b48db.appspot.com",
  messagingSenderId: "29671894181",
  appId: "1:29671894181:web:f472342a1c8a16064ab14c",
};

const app = initializeApp(firebaseConfig);

export  const auth=getAuth(app)
export const db=getFirestore(app)
