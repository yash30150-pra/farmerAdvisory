// src/screens/DashboardScreen.js - Home Dashboard
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors } from '../utils/colors';
import { t } from '../utils/i18n';

const { width } = Dimensions.get('window');

/**
 * Dashboard Screen - Home with feature overview
 */
const DashboardScreen = ({ navigation }) => {
  const features = [
    {
      id: 1,
      title: 'Weather',
      emoji: '⛅',
      desc: 'Real-time weather conditions',
      screen: 'Weather',
    },
    {
      id: 2,
      title: 'Prices',
      emoji: '💹',
      desc: 'Current crop prices',
      screen: 'Prices',
    },
    {
      id: 3,
      title: 'Crops',
      emoji: '🌱',
      desc: 'Crop recommendations',
      screen: 'Crops',
    },
    {
      id: 4,
      title: 'Chat',
      emoji: '💬',
      desc: 'Chat with AI expert',
      screen: 'Chat',
    },
  ];

  const handleFeaturePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🌾</Text>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Active Farmers</Text>
          <Text style={styles.statValue}>12,430</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg Response</Text>
          <Text style={styles.statValue}>~ 1 min</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Crop Models</Text>
          <Text style={styles.statValue}>45+</Text>
        </View>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresHeader}>
        <Text style={styles.featuresTitle}>Select a Feature</Text>
      </View>

      <View style={styles.featuresGrid}>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.featureCard}
            onPress={() => handleFeaturePress(feature.screen)}
            activeOpacity={0.8}
          >
            <Text style={styles.featureEmoji}>{feature.emoji}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDesc}>{feature.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🚀 Getting Started</Text>
        <Text style={styles.infoText}>
          • Get real-time weather alerts for your area{'\n'}
          • Check market prices before selling{'\n'}
          • Get crop recommendations based on location{'\n'}
          • Chat with AI expert anytime
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.glass,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  featuresHeader: {
    marginTop: 20,
    marginBottom: 12,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureCard: {
    width: (width - 48) / 2, // Account for padding and gaps
    backgroundColor: colors.glassLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: colors.glass,
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});

export default DashboardScreen;
