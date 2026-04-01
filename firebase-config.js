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
  apiKey: "AIzaSyBizSWBQzyYpVNcHDzsvgeYdCq2VHLDXV8",
  authDomain: "farmer-query-e02c6.firebaseapp.com",
  projectId: "farmer-query-e02c6",
  storageBucket: "farmer-query-e02c6.firebasestorage.app",
  messagingSenderId: "994211780944",
  appId: "1:994211780944:web:0244e3c05432f558ee7455",
  measurementId: "G-SJ73M4WWNE"
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
