// src/screens/WeatherScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../utils/colors';
import { t } from '../utils/i18n';
import { fetchWeather, searchWeatherByCity, getWeatherIcon } from '../services/weatherService';
import { getCurrentLocation } from '../services/locationService';

const WeatherScreen = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const location = await getCurrentLocation();
      const weatherData = await fetchWeather(location.latitude, location.longitude);
      setWeather(weatherData);
    } catch (err) {
      setError(t('weatherError'));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    try {
      const data = await searchWeatherByCity(searchInput);
      setWeather(data);
      setSearchInput('');
      setError(null);
    } catch (err) {
      setError(t('cityNotFound'));
    } finally {
      setLoading(false);
    }
  };

  if (loading && !weather) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchCity')}
          placeholderTextColor={colors.textTertiary}
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <>
          {/* Current Weather Card */}
          <View style={styles.currentWeather}>
            <Text style={styles.icon}>
              {getWeatherIcon(weather.weather?.[0]?.main || 'Clear')}
            </Text>
            <Text style={styles.temp}>{Math.round(weather.main?.temp)}°C</Text>
            <Text style={styles.condition}>
              {weather.weather?.[0]?.description || 'Clear Sky'}
            </Text>
            <Text style={styles.location}>{weather.name}</Text>
          </View>

          {/* Weather Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>💧</Text>
              <Text style={styles.detailValue}>{weather.main?.humidity}%</Text>
              <Text style={styles.detailName}>{t('humidity')}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>💨</Text>
              <Text style={styles.detailValue}>
                {(weather.wind?.speed * 3.6).toFixed(1)}
              </Text>
              <Text style={styles.detailName}>km/h</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>🌡️</Text>
              <Text style={styles.detailValue}>{Math.round(weather.main?.feels_like)}°</Text>
              <Text style={styles.detailName}>{t('feelsLike')}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>🔽</Text>
              <Text style={styles.detailValue}>{weather.main?.pressure}</Text>
              <Text style={styles.detailName}>hPa</Text>
            </View>
          </View>

          {/* Refresh Button */}
          <TouchableOpacity style={styles.refreshBtn} onPress={loadWeather} disabled={loading}>
            <Text style={styles.refreshBtnText}>🔄 {t('refresh')}</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: colors.text,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.glass,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 14,
  },
  searchBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    fontSize: 20,
  },
  error: {
    color: colors.error,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 14,
    padding: 10,
  },
  currentWeather: {
    backgroundColor: colors.glassLight,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    fontSize: 72,
    marginBottom: 16,
  },
  temp: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  condition: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  location: {
    fontSize: 14,
    color: colors.textTertiary,
    marginTop: 8,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  detailCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: colors.glass,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 24,
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  detailName: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 4,
  },
  refreshBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  refreshBtnText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default WeatherScreen;
