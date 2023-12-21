import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2LuPEZ_01lISk_VisN_Y4Ub7r42ipftI",
  authDomain: "todos-a8691.firebaseapp.com",
  projectId: "todos-a8691",
  storageBucket: "todos-a8691.appspot.com",
  messagingSenderId: "891238203792",
  appId: "1:891238203792:web:13bee3d5fa4dcfc771b315",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
