// src/services/priceService.js - Market Price Service
/**
 * Market price data and filtering logic
 */

const marketData = [
  {
    id: 1,
    crop: 'Wheat',
    emoji: '🌾',
    category: 'cereals',
    market: 'delhi',
    currentPrice: 2500,
    previousPrice: 2400,
    trend: 'up',
    change: 4.2,
    minPrice: 2400,
    maxPrice: 2650,
    unit: '₹/Quintal',
  },
  {
    id: 2,
    crop: 'Rice',
    emoji: '🍚',
    category: 'cereals',
    market: 'delhi',
    currentPrice: 3200,
    previousPrice: 3150,
    trend: 'up',
    change: 1.6,
    minPrice: 3100,
    maxPrice: 3300,
    unit: '₹/Quintal',
  },
  {
    id: 3,
    crop: 'Lentils',
    emoji: '🫘',
    category: 'pulses',
    market: 'delhi',
    currentPrice: 6500,
    previousPrice: 6700,
    trend: 'down',
    change: -2.9,
    minPrice: 6300,
    maxPrice: 7000,
    unit: '₹/Quintal',
  },
  {
    id: 4,
    crop: 'Chickpeas',
    emoji: '🫘',
    category: 'pulses',
    market: 'mumbai',
    currentPrice: 7200,
    previousPrice: 7000,
    trend: 'up',
    change: 3.1,
    minPrice: 6900,
    maxPrice: 7500,
    unit: '₹/Quintal',
  },
  {
    id: 5,
    crop: 'Tomato',
    emoji: '🍅',
    category: 'vegetables',
    market: 'bangalore',
    currentPrice: 1800,
    previousPrice: 1900,
    trend: 'down',
    change: -5.3,
    minPrice: 1500,
    maxPrice: 2200,
    unit: '₹/Quintal',
  },
  {
    id: 6,
    crop: 'Onion',
    emoji: '🧅',
    category: 'vegetables',
    market: 'mumbai',
    currentPrice: 2100,
    previousPrice: 2000,
    trend: 'up',
    change: 5.0,
    minPrice: 1800,
    maxPrice: 2400,
    unit: '₹/Quintal',
  },
  {
    id: 7,
    crop: 'Potato',
    emoji: '🥔',
    category: 'vegetables',
    market: 'delhi',
    currentPrice: 900,
    previousPrice: 950,
    trend: 'down',
    change: -5.3,
    minPrice: 800,
    maxPrice: 1100,
    unit: '₹/Quintal',
  },
  {
    id: 8,
    crop: 'Maize',
    emoji: '🌽',
    category: 'cereals',
    market: 'bangalore',
    currentPrice: 1900,
    previousPrice: 1850,
    trend: 'up',
    change: 2.7,
    minPrice: 1800,
    maxPrice: 2100,
    unit: '₹/Quintal',
  },
];

/**
 * Get all market prices
 */
export const getAllPrices = () => {
  return marketData;
};

/**
 * Filter prices by market and category
 * @param {string} market - Market name (delhi, mumbai, bangalore, all)
 * @param {string} category - Category (cereals, pulses, vegetables, all)
 */
export const filterPrices = (market = 'all', category = 'all') => {
  return marketData.filter(item => {
    const marketMatch = market === 'all' || item.market === market;
    const categoryMatch = category === 'all' || item.category === category;
    return marketMatch && categoryMatch;
  });
};

/**
 * Get prices by market
 */
export const getPricesByMarket = (market) => {
  return marketData.filter(item => item.market === market);
};

/**
 * Get prices by category
 */
export const getPricesByCategory = (category) => {
  return marketData.filter(item => item.category === category);
};

/**
 * Get trending crops
 */
export const getTrendingCrops = () => {
  return marketData.sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5);
};

/**
 * Get price for specific crop
 */
export const getCropPrice = (cropName) => {
  return marketData.find(item => item.crop.toLowerCase() === cropName.toLowerCase());
};

/**
 * Get available markets
 */
export const getAvailableMarkets = () => {
  const markets = [...new Set(marketData.map(item => item.market))];
  return markets;
};

/**
 * Get available categories
 */
export const getAvailableCategories = () => {
  const categories = [...new Set(marketData.map(item => item.category))];
  return categories;
};
