import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEZdujRybLa4EXiGO-ykUIBDZ4MMIAYoM",
  authDomain: "hanna-skinstudio.firebaseapp.com",
  projectId: "hanna-skinstudio",
  storageBucket: "hanna-skinstudio.firebasestorage.app",
  messagingSenderId: "566500899390",
  appId: "1:566500899390:web:926c19983dc0a1ddb46f6f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);