import { initializeApp } from 'firebase/app';
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDgxnapQe8-2BagmWZJ3CzupN6n-3qRnSI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'silphor.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'silphor',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'silphor.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1034321772079',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1034321772079:web:b37fea89001172d4e710da',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-4N0CNRG5L1',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const EMAIL_STORAGE_KEY = 'silphor_registration_email';

function getFirebaseAuthError(error: unknown): Error {
  const code = error instanceof Error ? error.message : '';
  if (code.includes('auth/configuration-not-found')) {
    return new Error('Firebase Email Link is not enabled. In Firebase Console, open Authentication > Sign-in method, enable Email link, and add this site under Authorized domains.');
  }
  if (code.includes('auth/operation-not-allowed')) {
    return new Error('Firebase rejected Email Link sign-in because the provider is disabled. Enable Email link under Firebase Console > Authentication > Sign-in method.');
  }
  return error instanceof Error ? error : new Error('Firebase email verification failed.');
}

function getActionSettings() {
  return {
    url: `${window.location.origin}/registration`,
    handleCodeInApp: true,
  };
}

export async function sendRegistrationEmailLink(email: string): Promise<void> {
  try {
    await sendSignInLinkToEmail(auth, email, getActionSettings());
  } catch (error) {
    throw getFirebaseAuthError(error);
  }
  window.localStorage.setItem(EMAIL_STORAGE_KEY, email);
}

export function hasRegistrationEmailLink(): boolean {
  return isSignInWithEmailLink(auth, window.location.href);
}

export async function completeRegistrationEmailLink(): Promise<string> {
  const email = window.localStorage.getItem(EMAIL_STORAGE_KEY);
  if (!email) {
    throw new Error('Enter the same email address used to request the verification link.');
  }

  let credential;
  try {
    credential = await signInWithEmailLink(auth, email, window.location.href);
  } catch (error) {
    throw getFirebaseAuthError(error);
  }
  window.localStorage.removeItem(EMAIL_STORAGE_KEY);
  window.history.replaceState({}, document.title, '/registration');
  return credential.user.email || email;
}
