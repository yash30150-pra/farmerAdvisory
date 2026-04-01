// src/services/chatService.js - AI Chat Service
/**
 * AI Chat responses with farming context
 */

const farmingResponses = {
  monsoon: 'During monsoon season (Kharif), you can grow rice, maize, cotton, sugarcane, pulses, and various vegetables. Choose crops based on your soil type and local rainfall patterns.',
  winter: 'Rabi season crops include wheat, barley, chickpeas, lentils, mustard, and various winter vegetables. These crops thrive in cooler temperatures (10-25°C).',
  harvest: 'Harvest timing depends on crop type. Rice & Wheat: 120-150 days, Cotton: 180-210 days. Harvest when grains are golden/brown and dry.',
  disease: 'Common disease prevention:\n1. Crop rotation\n2. Use resistant varieties\n3. Proper irrigation\n4. Timely fungicide application\n5. Good field sanitation',
  price: 'Market prices vary by location and season. Check local mandis. Staple crops (wheat, rice) have stable prices, vegetables are volatile.',
  soil: 'Soil testing is crucial. Clay retains moisture (good for rice), sandy needs irrigation (good for millets), loamy is versatile. Conduct soil test for pH, nutrients.',
  irrigation: 'Irrigation needs: Rice 40-60cm, Wheat 40-50cm, Cotton 50-65cm water. Drip irrigation saves water and reduces disease.',
  pest: 'Common pests: Armyworm, Stem borer, Aphids. Prevention: resistant varieties, field hygiene, intercropping, biological pest control.',
  fertilizer: 'Balanced fertilization: Use 5-10 tons/hectare organic compost + chemical based on soil test. Avoid over-fertilization.',
  weather: 'Check weather regularly. High rainfall? Ensure drainage. Frost? Cover crops. Heat? Increase irrigation. Adapt to weather patterns.',
  default: 'I can help with crop selection, farming techniques, pest management, weather insights, and market prices. What would you like to know?',
};

/**
 * Get AI response based on user question
 * @param {string} question - User's question
 * @returns {string} - AI response
 */
export const getChatResponse = (question) => {
  const lowerQuestion = question.toLowerCase();

  // Check for keywords
  for (const [keyword, response] of Object.entries(farmingResponses)) {
    if (lowerQuestion.includes(keyword)) {
      return response;
    }
  }

  // Check for common patterns
  if (lowerQuestion.includes('how') || lowerQuestion.includes('what') || lowerQuestion.includes('help')) {
    return farmingResponses.default;
  }

  if (lowerQuestion.includes('thank')) {
    return 'You\'re welcome! Feel free to ask more questions about farming. I\'m here to help! 🌾';
  }

  if (lowerQuestion.includes('hi') || lowerQuestion.includes('hello')) {
    return 'Hello! How can I assist you with your farming today? Need advice on crops, weather, or market prices?';
  }

  // Fallback response
  return 'That\'s a great question! For specific guidance, check our weather and prices sections, or consult with local agricultural experts. Is there something specific I can help with?';
};

/**
 * Get quick suggestion questions
 */
export const getQuickSuggestions = () => {
  return [
    'What crops should I grow in monsoon?',
    'How to prevent crop diseases?',
    'Best time to harvest wheat?',
    'Current market prices?',
  ];
};
