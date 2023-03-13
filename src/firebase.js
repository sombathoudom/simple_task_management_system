import {initializeApp} from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyCA3ezR26u_z9HZnKGTJMrt874KHGxfDrg",
    authDomain: "project-management-5311e.firebaseapp.com",
    projectId: "project-management-5311e",
    storageBucket: "project-management-5311e.appspot.com",
    messagingSenderId: "846931740095",
    appId: "1:846931740095:web:7f664bab1747c13c0bcd0a",
    measurementId: "G-S906YCER39"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// db.settings({timestampInSnapshots:true});
export default db;