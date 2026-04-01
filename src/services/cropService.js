// src/services/cropService.js - Crop Recommendations Service
/**
 * Comprehensive crop database with region-based data
 */

const cropDatabase = {
  kharif: {
    clay: {
      crops: [
        {
          name: 'Rice',
          emoji: '🍚',
          score: 95,
          rainfall: '1500-2500mm',
          temperature: '20-30°C',
          duration: '120-150 days',
          description: 'Best suited for clay soils with high moisture retention.',
          benefits: ['High yield potential', 'Good market demand', 'Water efficient'],
        },
        {
          name: 'Sugarcane',
          emoji: '🌾',
          score: 88,
          rainfall: '1000-2250mm',
          temperature: '21-27°C',
          duration: '10-12 months',
          description: 'Excellent for clay soils. Requires adequate irrigation.',
          benefits: ['High ROI', 'Long cycle', 'Soil protection'],
        },
        {
          name: 'Maize',
          emoji: '🌽',
          score: 82,
          rainfall: '500-1000mm',
          temperature: '21-27°C',
          duration: '80-120 days',
          description: 'Adaptable to clay soils during monsoon season.',
          benefits: ['Quick maturity', 'Market value', 'Low input'],
        },
      ],
    },
    sandy: {
      crops: [
        {
          name: 'Millet',
          emoji: '🌾',
          score: 92,
          rainfall: '400-600mm',
          temperature: '25-35°C',
          duration: '70-90 days',
          description: 'Highly drought resistant and perfect for sandy soils.',
          benefits: ['Drought tolerant', 'Nutritious', 'Climate resilient'],
        },
        {
          name: 'Groundnut',
          emoji: '🥜',
          score: 89,
          rainfall: '500-1000mm',
          temperature: '24-30°C',
          duration: '120-150 days',
          description: 'Excellent nitrogen fixing crop for sandy soils.',
          benefits: ['Soil enrichment', 'High protein', 'Pest resistant'],
        },
      ],
    },
    loamy: {
      crops: [
        {
          name: 'Cotton',
          emoji: '🧵',
          score: 94,
          rainfall: '500-900mm',
          temperature: '21-30°C',
          duration: '180-210 days',
          description: 'Ideal for loamy soils with balanced conditions.',
          benefits: ['High profitability', 'Export potential', 'Good compatibility'],
        },
      ],
    },
  },
  rabi: {
    clay: {
      crops: [
        {
          name: 'Wheat',
          emoji: '🌾',
          score: 93,
          rainfall: '400-600mm',
          temperature: '15-25°C',
          duration: '120-150 days',
          description: 'Premier winter crop for clay soils.',
          benefits: ['Staple crop', 'Stable prices', 'Large market'],
        },
        {
          name: 'Chickpea',
          emoji: '🫘',
          score: 87,
          rainfall: '400-800mm',
          temperature: '15-20°C',
          duration: '100-120 days',
          description: 'Nitrogen-fixing legume for winter season.',
          benefits: ['Soil improvement', 'High protein', 'Export value'],
        },
      ],
    },
    sandy: {
      crops: [
        {
          name: 'Lentil',
          emoji: '🫘',
          score: 85,
          rainfall: '300-400mm',
          temperature: '15-20°C',
          duration: '90-100 days',
          description: 'Drought tolerant winter cultivation.',
          benefits: ['Low water need', 'Nutritious', 'Export market'],
        },
      ],
    },
    loamy: {
      crops: [
        {
          name: 'Mustard',
          emoji: '🌱',
          score: 91,
          rainfall: '300-600mm',
          temperature: '10-25°C',
          duration: '100-120 days',
          description: 'Oil crop with excellent market demand.',
          benefits: ['High oil content', 'Export demand', 'Quick return'],
        },
      ],
    },
  },
  summer: {
    loamy: {
      crops: [
        {
          name: 'Watermelon',
          emoji: '🍉',
          score: 89,
          rainfall: '400-600mm',
          temperature: '25-35°C',
          duration: '70-100 days',
          description: 'High value summer crop for loamy soils.',
          benefits: ['High market price', 'Quick returns', 'Good profit'],
        },
        {
          name: 'Muskmelon',
          emoji: '🍈',
          score: 87,
          rainfall: '400-600mm',
          temperature: '25-35°C',
          duration: '60-90 days',
          description: 'Premium summer vegetable crop.',
          benefits: ['High value', 'Export potential', 'Market demand'],
        },
      ],
    },
  },
};

/**
 * Get crop recommendations based on conditions
 * @param {string} season - Season (kharif, rabi, summer)
 * @param {string} soilType - Soil type (clay, sandy, loamy)
 * @returns {Array} - Recommended crops
 */
export const getRecommendedCrops = (season, soilType) => {
  const seasonCrops = cropDatabase[season];
  if (!seasonCrops) return [];
  
  const soilCrops = seasonCrops[soilType];
  if (!soilCrops) return [];
  
  return soilCrops.crops || [];
};

/**
 * Get all available seasons
 */
export const getSeasons = () => {
  return [
    { id: 'kharif', label: 'Kharif (Monsoon)', emoji: '🌧️' },
    { id: 'rabi', label: 'Rabi (Winter)', emoji: '❄️' },
    { id: 'summer', label: 'Summer', emoji: '☀️' },
  ];
};

/**
 * Get all available soil types
 */
export const getSoilTypes = () => {
  return [
    { id: 'clay', label: 'Clay', emoji: '🟫' },
    { id: 'sandy', label: 'Sandy', emoji: '🟨' },
    { id: 'loamy', label: 'Loamy', emoji: '🟪' },
  ];
};

/**
 * Calculate match score based on conditions
 * @returns {number} - Score 0-100
 */
export const calculateMatchScore = (crop, rainfall, temperature) => {
  let score = 50; // Base score
  
  // Parse rainfall range from crop data (e.g., "1500-2500mm")
  const rainfallMatch = crop.rainfall.match(/(\d+)-(\d+)/);
  if (rainfallMatch) {
    const min = parseInt(rainfallMatch[1]);
    const max = parseInt(rainfallMatch[2]);
    if (rainfall >= min && rainfall <= max) {
      score += 25;
    } else if (rainfall > min * 0.8 && rainfall < max * 1.2) {
      score += 15;
    }
  }
  
  // Parse temperature range (e.g., "20-30°C")
  const tempMatch = crop.temperature.match(/(\d+)-(\d+)/);
  if (tempMatch) {
    const min = parseInt(tempMatch[1]);
    const max = parseInt(tempMatch[2]);
    if (temperature >= min && temperature <= max) {
      score += 25;
    } else if (temperature > min - 5 && temperature < max + 5) {
      score += 15;
    }
  }
  
  return Math.min(score, 100);
};
