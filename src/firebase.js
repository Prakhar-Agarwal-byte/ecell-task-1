import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGPBeJ4EX1wNkhzrr3Ryy7IjC1-jKpbOA",
  authDomain: "ecell-task-1.firebaseapp.com",
  databaseURL: "https://ecell-task-1-default-rtdb.firebaseio.com",
  projectId: "ecell-task-1",
  storageBucket: "ecell-task-1.appspot.com",
  messagingSenderId: "1096527064634",
  appId: "1:1096527064634:web:a51545d03f7b7a6a810f03",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
