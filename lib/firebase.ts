import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

/** Web app keys from Firebase Console → Project settings → General → Your apps (SDK snippet). */
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyAWBIVYAgf_wvK6pi0ytpw6ySrQItaMW14",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "patronex-e6750.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "patronex-e6750",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "patronex-e6750.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "722988330714",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:722988330714:web:61df0ae8478ad0dcc93fe3",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-3LX0NJFV0L",
};

// Initialize Firebase (SSR safe)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence for Firestore (only in browser)
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn("Firestore persistence failed: Multiple tabs open");
    } else if (err.code === "unimplemented") {
      // Browser doesn't support persistence
      console.warn("Firestore persistence not supported in this browser");
    }
  });
}

// Analytics can throw or fail on hosts not registered in Firebase/GA; never let that break Auth.
let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch {
    analytics = undefined;
  }
}

// Export Auth, Firestore & Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export { app, auth, db, analytics };
