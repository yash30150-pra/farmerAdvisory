// src/utils/i18n.js - Internationalization (English & Hindi)
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    weather: 'Weather',
    prices: 'Market Prices',
    crops: 'Crops',
    chat: 'Chat',
    
    // Dashboard
    title: '🌾 Farmer Advisory',
    subtitle: 'Your complete farming companion',
    selectFeature: 'Select a feature below',
    
    // Weather
    weatherTitle: '⛅ Weather Forecast',
    weatherDesc: 'Real-time weather for your area',
    searchCity: 'Enter city or location',
    search: 'Search',
    currentWeather: 'Current Weather',
    forecast: '5-Day Forecast',
    temperature: 'Temperature',
    feelsLike: 'Feels Like',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    pressure: 'Pressure',
    condition: 'Condition',
    
    // Prices
    pricesTitle: '💹 Market Prices',
    pricesDesc: 'Real-time crop prices',
    filterMarket: 'Filter by Market',
    filterCategory: 'Filter by Category',
    allMarkets: 'All Markets',
    allCategories: 'All Categories',
    delhi: 'Delhi',
    mumbai: 'Mumbai',
    bangalore: 'Bangalore',
    cereals: 'Cereals',
    pulses: 'Pulses',
    vegetables: 'Vegetables',
    currentPrice: 'Current Price',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    trend: 'Trend',
    change: 'Change',
    
    // Crops
    cropsTitle: '🌱 Crop Recommendations',
    cropsDesc: 'AI-powered suggestions for your farm',
    location: 'Location',
    season: 'Season',
    soilType: 'Soil Type',
    rainfall: 'Annual Rainfall (mm)',
    temperature: 'Avg Temperature (°C)',
    areaSize: 'Farm Area (Acres)',
    getRecommendations: 'Get Recommendations',
    reset: 'Reset',
    recommendedCrops: 'Recommended Crops',
    matchScore: 'Match Score',
    duration: 'Duration',
    benefits: 'Benefits',
    
    // Chat
    chatTitle: '💬 Expert Chat',
    chatDesc: 'Chat with AI agricultural expert',
    typeQuestion: 'Type your question...',
    send: 'Send',
    quickQuestions: 'Quick Questions',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    weather: 'मौसम',
    prices: 'बाजार भाव',
    crops: 'फसलें',
    chat: 'चैट',
    
    // Dashboard
    title: '🌾 किसान सलाहकार',
    subtitle: 'आपका संपूर्ण कृषि साथी',
    selectFeature: 'नीचे एक विशेषता चुनें',
    
    // Weather
    weatherTitle: '⛅ मौसम पूर्वानुमान',
    weatherDesc: 'आपके क्षेत्र के लिए रीयल-टाइम मौसम',
    searchCity: 'शहर या स्थान दर्ज करें',
    search: 'खोजें',
    currentWeather: 'वर्तमान मौसम',
    forecast: '5-दिन का पूर्वानुमान',
    temperature: 'तापमान',
    feelsLike: 'लगता है',
    humidity: 'नमी',
    windSpeed: 'हवा की गति',
    pressure: 'दबाव',
    condition: 'स्थिति',
    
    // Prices
    pricesTitle: '💹 बाजार भाव',
    pricesDesc: 'रीयल-टाइम फसल मूल्य',
    filterMarket: 'बाजार द्वारा फ़िल्टर करें',
    filterCategory: 'श्रेणी द्वारा फ़िल्टर करें',
    allMarkets: 'सभी बाजार',
    allCategories: 'सभी श्रेणियां',
    delhi: 'दिल्ली',
    mumbai: 'मुंबई',
    bangalore: 'बेंगलुरु',
    cereals: 'अनाज',
    pulses: 'दालें',
    vegetables: 'सब्जियां',
    currentPrice: 'वर्तमान मूल्य',
    minPrice: 'न्यूनतम मूल्य',
    maxPrice: 'अधिकतम मूल्य',
    trend: 'प्रवृत्ति',
    change: 'परिवर्तन',
    
    // Crops
    cropsTitle: '🌱 फसल सिफारिशें',
    cropsDesc: 'आपके खेत के लिए AI-संचालित सुझाव',
    location: 'स्थान',
    season: 'मौसम',
    soilType: 'मिट्टी का प्रकार',
    rainfall: 'वार्षिक वर्षा (मिमी)',
    temperature: 'औसत तापमान (°C)',
    areaSize: 'खेत का क्षेत्र (एकड़)',
    getRecommendations: 'सिफारिशें प्राप्त करें',
    reset: 'रीसेट करें',
    recommendedCrops: 'अनुशंसित फसलें',
    matchScore: 'मिलान स्कोर',
    duration: 'अवधि',
    benefits: 'लाभ',
    
    // Chat
    chatTitle: '💬 विशेषज्ञ चैट',
    chatDesc: 'AI कृषि विशेषज्ञ से चैट करें',
    typeQuestion: 'अपना प्रश्न टाइप करें...',
    send: 'भेजें',
    quickQuestions: 'त्वरित प्रश्न',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    retry: 'पुनः प्रयास करें',
    close: 'बंद करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
  },
};

/**
 * Get translated string
 * @param {string} key - Translation key
 * @param {string} language - Language code (en/hi)
 * @returns {string} - Translated string
 */
export const t = (key, language = 'en') => {
  return translations[language]?.[key] || translations.en[key] || key;
};
