/**
 * Firebase Data Initialization Script
 * Use this to populate initial market prices and government schemes
 * 
 * Run in browser console after firebase-config.js and firebase-db.js are loaded
 */

// Verify Firebase is loaded
if (typeof firebase === 'undefined') {
  console.error('❌ Firebase not loaded. Include firebase-config.js first.');
} else {
  console.log('✅ Firebase loaded. Ready to initialize data.');
}

/**
 * Sample Market Prices Data
 * Format: { crop, price, market, trend }
 */
const SAMPLE_MARKET_PRICES = [
  { crop: 'Wheat', price: 2150, market: 'Delhi', trend: 'up' },
  { crop: 'Rice', price: 1980, market: 'Punjab', trend: 'down' },
  { crop: 'Sugarcane', price: 380, market: 'Uttar Pradesh', trend: 'up' },
  { crop: 'Cotton', price: 6200, market: 'Gujarat', trend: 'stable' },
  { crop: 'Maize', price: 1850, market: 'Karnataka', trend: 'up' },
  { crop: 'Pulses', price: 5200, market: 'Maharashtra', trend: 'down' },
  { crop: 'Soybean', price: 4100, market: 'Madhya Pradesh', trend: 'stable' },
  { crop: 'Groundnut', price: 6500, market: 'Rajasthan', trend: 'up' },
  { crop: 'Tomato', price: 1200, market: 'Tamil Nadu', trend: 'down' },
  { crop: 'Onion', price: 2000, market: 'Karnataka', trend: 'stable' },
  { crop: 'Potato', price: 1500, market: 'West Bengal', trend: 'up' },
  { crop: 'Cabbage', price: 800, market: 'Himachal Pradesh', trend: 'down' }
];

/**
 * Sample Government Schemes Data
 */
const SAMPLE_GOVERNMENT_SCHEMES = [
  {
    name: 'PM-KISAN Scheme',
    description: 'Pradhan Mantri Kisan Samman Nidhi - Direct cash transfer to eligible farmers',
    eligibility: 'Small and marginal farmers | Land ownership less than 2 hectares',
    benefits: '₹6000 per year in 3 installments | Direct bank transfer',
    applicationURL: 'https://pmkisan.gov.in/'
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive crop insurance scheme to protect against crop losses',
    eligibility: 'All farmers (tenant farmers also eligible) | Growing notified crops',
    benefits: 'Full crop coverage | Simplified claim process | Premium subsidy up to 50%',
    applicationURL: 'https://pmfby.gov.in/'
  },
  {
    name: 'Soil Health Card Scheme',
    description: 'Free soil testing and personalized health cards for soil improvement',
    eligibility: 'All farmers in participating states | Any farm size',
    benefits: 'Free soil test | Nutrient recommendations | Improved yield potential',
    applicationURL: 'https://soilhealth.dac.gov.in/'
  },
  {
    name: 'Kisan Credit Card',
    description: 'Easy credit facility for farmers at reasonable interest rates',
    eligibility: 'Individual farmers | Tenant farmers | Small & marginal farmers',
    benefits: 'Credit limit up to ₹3 lakh | Interest subsidy | Digital payment benefits',
    applicationURL: 'https://www.nabard.org/'
  },
  {
    name: 'Rashtriya Krishi Vikas Yojana',
    description: 'State-specific agricultural development and innovation program',
    eligibility: 'Farmers in implementing states | Project-based participation',
    benefits: 'Subsidized inputs | Extension services | Market linkages',
    applicationURL: 'https://rkvy.rkvy.nic.in/'
  },
  {
    name: 'Pradhan Mantri Krishi Sinchayee Yojana',
    description: 'Irrigation development for efficient water use and farm productivity',
    eligibility: 'Farmers in command areas | Groundwater-dependent farmers',
    benefits: 'Drip/sprinkler irrigation subsidy | Micro-irrigation equipment support',
    applicationURL: 'https://pmksy.gov.in/'
  },
  {
    name: 'Paramparagat Krishi Vikas Yojana',
    description: 'Promotes organic farming through cluster approach and subsidies',
    eligibility: 'Farmers willing to adopt organic farming | Any farm size',
    benefits: 'Organic inputs subsidy | Technical training | Certification support',
    applicationURL: 'https://www.dac.gov.in/'
  },
  {
    name: 'Atmanirbhar Bharat Rozgar Yojana',
    description: 'Employment and income support for farmers and farm workers',
    eligibility: 'Agricultural workers | Small farmers | Self-employed farmers',
    benefits: 'Wage subsidy | Skill training | Employment guarantee',
    applicationURL: 'https://www.india.gov.in/'
  }
];

/**
 * Initialize Market Prices
 */
function initializeMarketPrices() {
  console.log('📊 Initializing market prices...');
  
  if (typeof bulkUpdateMarketPrices === 'undefined') {
    console.error('❌ bulkUpdateMarketPrices function not found. Make sure firebase-db.js is loaded.');
    return;
  }
  
  bulkUpdateMarketPrices(SAMPLE_MARKET_PRICES);
  console.log(`✅ ${SAMPLE_MARKET_PRICES.length} market prices initialized`);
}

/**
 * Initialize Government Schemes
 */
function initializeGovernmentSchemes() {
  console.log('🏛️ Initializing government schemes...');
  
  if (typeof bulkAddGovernmentSchemes === 'undefined') {
    console.error('❌ bulkAddGovernmentSchemes function not found. Make sure firebase-db.js is loaded.');
    return;
  }
  
  bulkAddGovernmentSchemes(SAMPLE_GOVERNMENT_SCHEMES);
  console.log(`✅ ${SAMPLE_GOVERNMENT_SCHEMES.length} government schemes initialized`);
}

/**
 * Initialize All Data
 */
function initializeAllData() {
  console.log('🚀 Starting Firebase data initialization...');
  initializeMarketPrices();
  initializeGovernmentSchemes();
  console.log('✅ All Firebase data initialized successfully!');
}

/**
 * Export functions for use
 */
const firebaseInit = {
  initializeMarketPrices,
  initializeGovernmentSchemes,
  initializeAllData,
  SAMPLE_MARKET_PRICES,
  SAMPLE_GOVERNMENT_SCHEMES
};

// Log availability
console.log('📌 Available commands:');
console.log('   initializeMarketPrices()    - Load sample market prices');
console.log('   initializeGovernmentSchemes() - Load sample government schemes');
console.log('   initializeAllData()          - Load all sample data');
