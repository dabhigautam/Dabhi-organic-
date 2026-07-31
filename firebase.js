import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2SQ1J-VmmH1Dd31ZptxAC_wfN6tS1VqU",
  authDomain: "myshoppingstore-63568.firebaseapp.com",
  projectId: "myshoppingstore-63568",
  storageBucket: "myshoppingstore-63568.firebasestorage.app",
  messagingSenderId: "785391468198",
  appId: "1:785391468198:web:8e1c002c436c13369bbe67"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
};