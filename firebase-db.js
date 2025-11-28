/**
 * Firebase Database Functions
 * Manages market prices and government schemes data
 * 
 * Usage:
 * - getMarketPrices() → fetches all market prices
 * - getMarketPrice(cropName) → fetches specific crop price
 * - updateMarketPrice(crop, price, market, trend) → adds/updates price
 * - getGovernmentSchemes() → fetches all schemes
 * - getGovernmentScheme(schemeName) → fetches specific scheme
 * - addGovernmentScheme(schemeName, description, eligibility, benefits) → adds new scheme
 */

/**
 * MARKET PRICES - Functions
 */

// Fetch all market prices in real-time
function getMarketPrices(callback) {
  marketPricesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      console.log('No market prices found');
      callback({});
    }
  }, (error) => {
    console.error('Error fetching market prices:', error);
  });
}

// Fetch a specific crop's market price
function getMarketPrice(cropName, callback) {
  const cropKey = cropName.toLowerCase().replace(/\s+/g, '_');
  marketPricesRef.child(cropKey).on('value', (snapshot) => {
    const data = snapshot.val();
    callback(data);
  }, (error) => {
    console.error(`Error fetching price for ${cropName}:`, error);
    callback(null);
  });
}

// Add or update a market price entry
function updateMarketPrice(cropName, pricePerQuintal, market, trend = 'stable') {
  const cropKey = cropName.toLowerCase().replace(/\s+/g, '_');
  const priceData = {
    crop: cropName,
    price: pricePerQuintal,
    market: market,
    trend: trend, // 'up', 'down', 'stable'
    unit: '₹/Quintal',
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  };
  
  marketPricesRef.child(cropKey).set(priceData)
    .then(() => {
      console.log(`✅ Market price updated for ${cropName}`);
    })
    .catch((error) => {
      console.error(`❌ Error updating price for ${cropName}:`, error);
    });
}

// Batch update market prices (useful for daily updates)
function bulkUpdateMarketPrices(pricesArray) {
  // pricesArray format: [{crop: 'Wheat', price: 2150, market: 'Delhi', trend: 'up'}, ...]
  const updates = {};
  
  pricesArray.forEach((item) => {
    const cropKey = item.crop.toLowerCase().replace(/\s+/g, '_');
    updates[cropKey] = {
      crop: item.crop,
      price: item.price,
      market: item.market,
      trend: item.trend || 'stable',
      unit: '₹/Quintal',
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    };
  });
  
  marketPricesRef.update(updates)
    .then(() => {
      console.log(`✅ Bulk updated ${pricesArray.length} market prices`);
    })
    .catch((error) => {
      console.error('❌ Error bulk updating prices:', error);
    });
}

/**
 * GOVERNMENT SCHEMES - Functions
 */

// Fetch all government schemes in real-time
function getGovernmentSchemes(callback) {
  governmentSchemesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      console.log('No government schemes found');
      callback({});
    }
  }, (error) => {
    console.error('Error fetching government schemes:', error);
  });
}

// Fetch a specific government scheme
function getGovernmentScheme(schemeName, callback) {
  const schemeKey = schemeName.toLowerCase().replace(/\s+/g, '_');
  governmentSchemesRef.child(schemeKey).on('value', (snapshot) => {
    const data = snapshot.val();
    callback(data);
  }, (error) => {
    console.error(`Error fetching scheme ${schemeName}:`, error);
    callback(null);
  });
}

// Add a new government scheme
function addGovernmentScheme(schemeName, description, eligibility, benefits, applicationURL = '') {
  const schemeKey = schemeName.toLowerCase().replace(/\s+/g, '_');
  const schemeData = {
    name: schemeName,
    description: description,
    eligibility: eligibility, // string or array of requirements
    benefits: benefits, // string or array of benefits
    applicationURL: applicationURL,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    lastUpdated: firebase.database.ServerValue.TIMESTAMP
  };
  
  governmentSchemesRef.child(schemeKey).set(schemeData)
    .then(() => {
      console.log(`✅ Government scheme added: ${schemeName}`);
    })
    .catch((error) => {
      console.error(`❌ Error adding scheme ${schemeName}:`, error);
    });
}

// Update a government scheme
function updateGovernmentScheme(schemeName, updates) {
  const schemeKey = schemeName.toLowerCase().replace(/\s+/g, '_');
  const updateData = {
    ...updates,
    lastUpdated: firebase.database.ServerValue.TIMESTAMP
  };
  
  governmentSchemesRef.child(schemeKey).update(updateData)
    .then(() => {
      console.log(`✅ Government scheme updated: ${schemeName}`);
    })
    .catch((error) => {
      console.error(`❌ Error updating scheme ${schemeName}:`, error);
    });
}

// Batch add multiple government schemes
function bulkAddGovernmentSchemes(schemesArray) {
  // schemesArray format: [{name: 'PM-KISAN', description: '...', eligibility: '...', benefits: '...'}, ...]
  const updates = {};
  
  schemesArray.forEach((scheme) => {
    const schemeKey = scheme.name.toLowerCase().replace(/\s+/g, '_');
    updates[schemeKey] = {
      name: scheme.name,
      description: scheme.description,
      eligibility: scheme.eligibility,
      benefits: scheme.benefits,
      applicationURL: scheme.applicationURL || '',
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      lastUpdated: firebase.database.ServerValue.TIMESTAMP
    };
  });
  
  governmentSchemesRef.update(updates)
    .then(() => {
      console.log(`✅ Bulk added ${schemesArray.length} government schemes`);
    })
    .catch((error) => {
      console.error('❌ Error bulk adding schemes:', error);
    });
}

// Delete a market price entry
function deleteMarketPrice(cropName) {
  const cropKey = cropName.toLowerCase().replace(/\s+/g, '_');
  marketPricesRef.child(cropKey).remove()
    .then(() => {
      console.log(`✅ Market price deleted: ${cropName}`);
    })
    .catch((error) => {
      console.error(`❌ Error deleting price for ${cropName}:`, error);
    });
}

// Delete a government scheme
function deleteGovernmentScheme(schemeName) {
  const schemeKey = schemeName.toLowerCase().replace(/\s+/g, '_');
  governmentSchemesRef.child(schemeKey).remove()
    .then(() => {
      console.log(`✅ Government scheme deleted: ${schemeName}`);
    })
    .catch((error) => {
      console.error(`❌ Error deleting scheme ${schemeName}:`, error);
    });
}

// Export all functions
const firebaseDBFunctions = {
  // Market Prices
  getMarketPrices,
  getMarketPrice,
  updateMarketPrice,
  bulkUpdateMarketPrices,
  deleteMarketPrice,
  
  // Government Schemes
  getGovernmentSchemes,
  getGovernmentScheme,
  addGovernmentScheme,
  updateGovernmentScheme,
  bulkAddGovernmentSchemes,
  deleteGovernmentScheme
};

console.log('✅ Firebase database functions loaded');
