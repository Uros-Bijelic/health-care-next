// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAr35lFhO5V_nXkLoxl0m1q-az0fuEKMHU',
  authDomain: 'react-health-records.firebaseapp.com',
  projectId: 'react-health-records',
  storageBucket: 'react-health-records.firebasestorage.app',
  messagingSenderId: '894725964608',
  appId: '1:894725964608:web:68a0bdce1c386508bcb0a5',
  measurementId: 'G-MK8DCG69HS',
};

interface IFirestoreClass {
  getFirebaseApp(): FirebaseApp;
  getDb(): Firestore;
}

class FirestoreClass implements IFirestoreClass {
  app: FirebaseApp;
  db: Firestore;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  public getFirebaseApp() {
    return this.app;
  }
  public getDb() {
    return this.db;
  }
}

export const firebaseInstnace = new FirestoreClass();
