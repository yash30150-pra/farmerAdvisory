/**
 * Firebase Configuration & Initialization
 * Manages real-time database for market prices and government schemes
 * 
 * Setup Instructions:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use existing)
 * 3. Add Realtime Database (start in test mode for development)
 * 4. Replace apiKey, authDomain, projectId, databaseURL with your credentials below
 */

// Replace these with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDYourAPIKeyHere", // Get from Firebase Console > Project Settings
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  databaseURL: "https://your-project-id-default-rtdb.asia-southeast1.firebaseio.com",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase (only if not already initialized)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get references to Firebase services
const database = firebase.database();
const marketPricesRef = database.ref('marketPrices');
const governmentSchemesRef = database.ref('governmentSchemes');

// Export for use in other modules
const firebaseDB = {
  database,
  marketPricesRef,
  governmentSchemesRef
};

console.log('✅ Firebase initialized successfully');
