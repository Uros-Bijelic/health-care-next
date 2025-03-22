import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID || '',
};

interface IFirestoreClass {
  getDb(): Firestore;
  getAuth(): Auth;
  getApp(): FirebaseApp;
}

class FirestoreClass implements IFirestoreClass {
  private db: Firestore;
  private auth: Auth;
  private app: FirebaseApp;

  constructor() {
    this.app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }

  public getDb() {
    return this.db;
  }

  public getAuth() {
    return this.auth;
  }

  public getApp() {
    return this.app;
  }
}

export const firebaseInstance = new FirestoreClass();
