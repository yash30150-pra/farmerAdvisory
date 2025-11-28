# Firebase Setup Guide for AQ-FAS

## 📋 Prerequisites
- Google account
- Firebase project (create one at https://console.firebase.google.com/)

---

## 🚀 Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **"Add Project"**
3. Enter project name (e.g., "AQ-FAS-Backend")
4. Click **Create project** and wait for setup to complete

---

## 🗄️ Step 2: Create Realtime Database

1. In Firebase Console, go to **Realtime Database** (left sidebar)
2. Click **Create Database**
3. Choose location (closest to your users, e.g., Asia Southeast 1)
4. Select **Start in test mode** (for development; use production rules later)
5. Click **Enable**

---

## 🔑 Step 3: Get Your Credentials

1. Go to **Project Settings** (gear icon, top-left)
2. Under **Your apps**, click **Web** icon
3. Copy the Firebase config object
4. Paste it into `firebase-config.js` replacing the placeholder values

Example config structure:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  databaseURL: "https://your-project-id-default-rtdb.asia-southeast1.firebaseio.com",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

---

## 📝 Step 4: Include Firebase Scripts in HTML

Add these to your HTML `<head>` (before `firebase-config.js`):

```html
<!-- Firebase SDK (latest version) -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"></script>

<!-- Your Firebase configuration -->
<script src="firebase-config.js"></script>

<!-- Firebase database functions -->
<script src="firebase-db.js"></script>

<!-- Firebase UI integration -->
<script src="firebase-ui.js"></script>
```

---

## 📊 Step 5: Initialize Sample Data

Run this in your browser console (F12) to populate initial data:

```javascript
// Sample market prices
const samplePrices = [
  { crop: 'Wheat', price: 2150, market: 'Delhi', trend: 'up' },
  { crop: 'Rice', price: 1980, market: 'Punjab', trend: 'down' },
  { crop: 'Sugarcane', price: 380, market: 'UP', trend: 'up' },
  { crop: 'Cotton', price: 6200, market: 'Gujarat', trend: 'stable' }
];
bulkUpdateMarketPrices(samplePrices);

// Sample government schemes
const sampleSchemes = [
  {
    name: 'PM-KISAN Scheme',
    description: 'Financial support of ₹6000 per year to eligible farmer families',
    eligibility: 'Small and marginal farmers',
    benefits: 'Direct benefit transfer to bank accounts',
    applicationURL: 'https://pmkisan.gov.in/'
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance to protect farmers against natural calamities',
    eligibility: 'All farmers growing notified crops',
    benefits: 'Insurance coverage and simplified claim process',
    applicationURL: 'https://pmfby.gov.in/'
  },
  {
    name: 'Soil Health Card Scheme',
    description: 'Free soil testing and health cards to improve soil fertility',
    eligibility: 'All farmers in participating states',
    benefits: 'Free soil test report and recommendations',
    applicationURL: 'https://soilhealth.dac.gov.in/'
  },
  {
    name: 'Kisan Credit Card',
    description: 'Access to institutional credit with subsidized interest rates',
    eligibility: 'Farmers engaged in crop production and allied activities',
    benefits: 'Low-interest loans and credit facilities',
    applicationURL: 'https://www.nabard.org/'
  }
];
bulkAddGovernmentSchemes(sampleSchemes);
```

---

## 🔐 Step 6: Set Up Database Rules (Production)

1. In Realtime Database, go to **Rules** tab
2. Replace default rules with (allow farmers to read, admins to write):

```json
{
  "rules": {
    "marketPrices": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).exists()"
    },
    "governmentSchemes": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).exists()"
    },
    "admins": {
      ".read": "root.child('admins').child(auth.uid).exists()",
      ".write": "root.child('admins').child(auth.uid).exists()"
    }
  }
}
```

3. Click **Publish**

---

## 🛠️ Usage Examples

### Fetch and display market prices:
```javascript
getMarketPrices((prices) => {
  console.log('All prices:', prices);
});
```

### Update a single market price:
```javascript
updateMarketPrice('Wheat', 2200, 'Delhi', 'up');
```

### Add a new government scheme:
```javascript
addGovernmentScheme(
  'New Farmer Support Scheme',
  'Support for new farmers',
  'Farmers with less than 2 years experience',
  'Training and subsidy',
  'https://example.com/apply'
);
```

### Get a specific scheme:
```javascript
getGovernmentScheme('PM-KISAN Scheme', (scheme) => {
  console.log('Scheme details:', scheme);
});
```

---

## 📱 Integration in Your HTML

The `firebase-ui.js` file automatically:
- ✅ Loads market prices into the market table
- ✅ Loads government schemes into the schemes section
- ✅ Refreshes prices every 5 minutes
- ✅ Updates UI in real-time when data changes

No additional code needed in your HTML!

---

## 🐛 Troubleshooting

### "Firebase not defined" error
→ Make sure Firebase SDK is loaded before `firebase-config.js`

### Database shows "Offline"
→ Check your internet connection and Firebase project status

### No data appearing
→ Check browser console (F12) for errors
→ Verify your Firebase credentials in `firebase-config.js`
→ Run the sample data initialization from Step 5

### Authentication errors
→ In Firebase Console > Realtime Database > Rules, switch to **Test Mode** temporarily for development

---

## 📞 Support
- Firebase Docs: https://firebase.google.com/docs
- Realtime Database: https://firebase.google.com/docs/database
- Contact: AQ-FAS06@Gmail.com

---

**✅ Your Firebase backend is now ready for production use!**
