'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // Important: Some deploy targets (like Firebase Hosting) can automatically
    // initialize the Firebase App via environment. For other hosts (Vercel, Netlify)
    // we should fall back to the explicit `firebaseConfig` object.
    // To avoid noisy warnings in production, make auto-init opt-in via the
    // `NEXT_PUBLIC_FIREBASE_AUTO_INIT` env var. Set it to 'true' when deploying
    // with Firebase Hosting source-based deploys.
    const shouldAttemptAutoInit = process.env.NEXT_PUBLIC_FIREBASE_AUTO_INIT === 'true'

    let firebaseApp;
    if (shouldAttemptAutoInit) {
      try {
        // Attempt to initialize via Firebase Hosting environment variables
        firebaseApp = initializeApp();
      } catch (_e) {
        // If auto-init fails, fall back to explicit config
        firebaseApp = initializeApp(firebaseConfig);
      }
    } else {
      // Do not attempt auto-init; use explicit config to avoid unexpected runtime warnings
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  const firestore = getFirestore(firebaseApp);
  
  // Enable offline persistence for PWA functionality
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(firestore, {
      synchronizeTabs: true, // Allow multiple tabs to share cache
    }).catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Offline persistence failed: Multiple tabs open. Using memory cache.');
      } else if (err.code === 'unimplemented') {
        // Browser doesn't support persistence
        console.warn('Offline persistence not supported in this browser.');
      } else {
        console.error('Error enabling offline persistence:', err);
      }
    });
  }
  
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
