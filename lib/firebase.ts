// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWBIVYAgf_wvK6pi0ytpw6ySrQItaMW14",
  authDomain: "patronex-e6750.firebaseapp.com",
  projectId: "patronex-e6750",
  storageBucket: "patronex-e6750.firebasestorage.app",
  messagingSenderId: "722988330714",
  appId: "1:722988330714:web:61df0ae8478ad0dcc93fe3",
  measurementId: "G-3LX0NJFV0L"
};

// Initialize Firebase (SSR safe)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Analytics is only available in the browser context
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Auth & Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export { app, auth, analytics };
