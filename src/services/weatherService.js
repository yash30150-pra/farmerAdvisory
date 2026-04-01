// src/services/weatherService.js - Weather API Service
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEATHER_API_KEY, WEATHER_BASE_URL, CACHE_DURATION, DEFAULT_LOCATION, USE_MOCK_DATA } from '../config/api';

/**
 * Mock weather data for fallback
 */
const mockWeatherData = {
  'New Delhi': {
    name: 'New Delhi',
    main: {
      temp: 28,
      feels_like: 32,
      humidity: 65,
      pressure: 1013,
    },
    weather: [{ main: 'Cloudy', description: 'partly cloudy', icon: '02d' }],
    wind: { speed: 3.33 }, // m/s
    sys: { country: 'IN' },
  },
  'Mumbai': {
    name: 'Mumbai',
    main: {
      temp: 31,
      feels_like: 35,
      humidity: 75,
      pressure: 1010,
    },
    weather: [{ main: 'Humid', description: 'humidity', icon: '04d' }],
    wind: { speed: 2.22 },
    sys: { country: 'IN' },
  },
  'Bangalore': {
    name: 'Bangalore',
    main: {
      temp: 25,
      feels_like: 26,
      humidity: 55,
      pressure: 1012,
    },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 2.78 },
    sys: { country: 'IN' },
  },
};

/**
 * Fetch weather from real API or mock data
 * @param {number} latitude - User's latitude
 * @param {number} longitude - User's longitude
 * @returns {Promise<Object>} - Weather data
 */
export const fetchWeather = async (latitude, longitude) => {
  try {
    // Check cache first
    const cached = await getWeatherCache();
    if (cached) {
      return cached;
    }

    // If using mock data flag, return mock
    if (USE_MOCK_DATA) {
      const mockData = Object.values(mockWeatherData)[0];
      saveWeatherCache(mockData);
      return mockData;
    }

    // Fetch from real API
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_openweathermap_api_key_here') {
      console.warn('Weather API key not configured. Using mock data.');
      return Object.values(mockWeatherData)[0];
    }

    const url = `${WEATHER_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(url, { timeout: 10000 });
    
    saveWeatherCache(response.data);
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error.message);
    // Return mock data on error
    return Object.values(mockWeatherData)[0];
  }
};

/**
 * Search weather by city name
 * @param {string} cityName - City name to search
 * @returns {Promise<Object>} - Weather data
 */
export const searchWeatherByCity = async (cityName) => {
  try {
    // Check if mock data exists for this city
    if (mockWeatherData[cityName]) {
      return mockWeatherData[cityName];
    }

    if (USE_MOCK_DATA) {
      return Object.values(mockWeatherData)[0];
    }

    // Try to geocode the city first
    const coords = await geocodeCity(cityName);
    if (coords) {
      return fetchWeather(coords.latitude, coords.longitude);
    }

    return Object.values(mockWeatherData)[0];
  } catch (error) {
    console.error('Search Weather Error:', error.message);
    return Object.values(mockWeatherData)[0];
  }
};

/**
 * Geocode city name to coordinates
 * @param {string} cityName - City name
 * @returns {Promise<Object>} - { latitude, longitude }
 */
export const geocodeCity = async (cityName) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json`;
    const response = await axios.get(url, { timeout: 10000 });
    
    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        name: result.display_name,
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding Error:', error.message);
    return null;
  }
};

/**
 * Get weather cache
 */
const getWeatherCache = async () => {
  try {
    const cached = await AsyncStorage.getItem('weatherCache');
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.ts < CACHE_DURATION) {
        return data.weather;
      }
    }
  } catch (error) {
    console.error('Cache retrieval error:', error);
  }
  return null;
};

/**
 * Save weather cache
 */
const saveWeatherCache = async (weatherData) => {
  try {
    await AsyncStorage.setItem('weatherCache', JSON.stringify({
      ts: Date.now(),
      weather: weatherData,
    }));
  } catch (error) {
    console.error('Cache save error:', error);
  }
};

/**
 * Map weather condition to emoji
 */
export const getWeatherIcon = (condition) => {
  const iconMap = {
    'Sunny': '☀️',
    'Clear': '🌞',
    'Cloudy': '☁️',
    'Clouds': '☁️',
    'Rainy': '🌧️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Humid': '💧',
  };
  return iconMap[condition] || '⛅';
};
