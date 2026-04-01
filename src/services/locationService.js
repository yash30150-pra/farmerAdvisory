// src/services/locationService.js - Geolocation Service with Expo
import * as Location from 'expo-location';
import { DEFAULT_LOCATION } from '../config/api';

/**
 * Request location permission from user
 */
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

/**
 * Get current device location
 * @returns {Promise<Object>} - { latitude, longitude, name }
 */
export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) {
      console.log('Location permission denied, using default');
      return DEFAULT_LOCATION;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;
    
    // Try to get city name from coordinates
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (geocode && geocode[0]) {
        return {
          latitude,
          longitude,
          name: geocode[0].city || geocode[0].region || 'Current Location',
        };
      }
    } catch (error) {
      console.log('Geocoding error:', error);
    }

    return { latitude, longitude, name: 'Current Location' };
  } catch (error) {
    console.error('Location service error:', error);
    return DEFAULT_LOCATION;
  }
};

/**
 * Watch user location (continuous updates)
 */
export const watchLocation = async (onLocationUpdate) => {
  try {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000, // Update every 5 seconds
        distanceInterval: 100, // Update every 100 meters
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        onLocationUpdate({ latitude, longitude });
      }
    );

    return subscription;
  } catch (error) {
    console.error('Watch position error:', error);
  }
};

/**
 * Stop watching location
 */
export const stopWatchingLocation = (subscription) => {
  if (subscription) {
    subscription.remove();
  }
};

/**
 * Get region name from coordinates
 * @returns {string} - Region name
 */
export const getRegionFromCoordinates = (latitude, longitude) => {
  // North India: lat > 26
  if (latitude > 26) return 'north';
  
  // South India: lat < 13
  if (latitude < 13) return 'south';
  
  // Central India: lat 18-26
  if (latitude >= 18 && latitude <= 26) return 'central';
  
  // Eastern India: lon 72-88
  if (longitude >= 72 && longitude <= 88) return 'east';
  
  return 'central'; // Default
};
