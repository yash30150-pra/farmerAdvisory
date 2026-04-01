// src/config/api.js - API Configuration
/**
 * API Configuration for Farmer Advisory App
 * Contains all API endpoints and keys
 */

// OpenWeatherMap API
export const WEATHER_API_KEY = 'your_openweathermap_api_key_here';
export const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Geolocation API (Nominatim - Free, no key needed)
export const GEOCODING_BASE_URL = 'https://nominatim.openstreetmap.org';

// Mock data flag (set to false when using real APIs)
export const USE_MOCK_DATA = true;

// Cache duration (in milliseconds)
export const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// API Endpoints
export const API_ENDPOINTS = {
  weather: {
    current: (lat, lon) => 
      `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
    forecast: (lat, lon) => 
      `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
  },
  geocoding: {
    search: (location) => 
      `${GEOCODING_BASE_URL}/search?q=${location}&format=json`,
  },
};

// Timeout for API requests (in milliseconds)
export const API_TIMEOUT = 10000;

// Default location (fallback)
export const DEFAULT_LOCATION = {
  name: 'New Delhi',
  latitude: 28.7041,
  longitude: 77.1025,
};
