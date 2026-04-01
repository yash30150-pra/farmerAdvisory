// src/screens/CropsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { colors } from '../utils/colors';
import { t } from '../utils/i18n';
import {
  getRecommendedCrops,
  getSeasons,
  getSoilTypes,
} from '../services/cropService';

const CropsScreen = () => {
  const [season, setSeason] = useState('kharif');
  const [soilType, setSoilType] = useState('clay');
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [seasonModalVisible, setSeasonModalVisible] = useState(false);
  const [soilModalVisible, setSoilModalVisible] = useState(false);

  const seasons = getSeasons();
  const soilTypes = getSoilTypes();

  const handleGetRecommendations = () => {
    if (!rainfall || !temperature) {
      alert(t('fillAllFields'));
      return;
    }

    const crops = getRecommendedCrops(season, soilType);
    setRecommendations(crops);
  };

  const renderCropCard = (crop) => (
    <View key={crop.id} style={styles.cropCard}>
      <View style={styles.cropHeader}>
        <Text style={styles.cropEmoji}>{crop.emoji}</Text>
        <View style={styles.cropInfo}>
          <Text style={styles.cropTitle}>{crop.name}</Text>
          <Text style={styles.cropDuration}>⏱️ {crop.duration}</Text>
        </View>
        <Text style={styles.matchScore}>{Math.round(crop.score)}%</Text>
      </View>

      <Text style={styles.cropDescription}>{crop.description}</Text>

      <View style={styles.specGrid}>
        <View style={styles.specBox}>
          <Text style={styles.specLabel}>💧 Rain</Text>
          <Text style={styles.specValue}>{crop.rainfall}</Text>
        </View>
        <View style={styles.specBox}>
          <Text style={styles.specLabel}>🌡️ Temp</Text>
          <Text style={styles.specValue}>{crop.temperature}</Text>
        </View>
      </View>

      <Text style={styles.benefitsLabel}>✅ Benefits:</Text>
      {crop.benefits.map((benefit, idx) => (
        <Text key={idx} style={styles.benefit}>• {benefit}</Text>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Form Section */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{t('cropRecommendationForm')}</Text>

        {/* Season Selector */}
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setSeasonModalVisible(true)}
        >
          <Text style={styles.selectorLabel}>🌾 Season</Text>
          <Text style={styles.selectorValue}>{season}</Text>
        </TouchableOpacity>

        {/* Season Modal */}
        <Modal transparent visible={seasonModalVisible} animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setSeasonModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('selectSeason')}</Text>
              {seasons.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={styles.modalOption}
                  onPress={() => {
                    setSeason(s);
                    setSeasonModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Soil Type Selector */}
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setSoilModalVisible(true)}
        >
          <Text style={styles.selectorLabel}>🌍 Soil Type</Text>
          <Text style={styles.selectorValue}>{soilType}</Text>
        </TouchableOpacity>

        {/* Soil Type Modal */}
        <Modal transparent visible={soilModalVisible} animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setSoilModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('selectSoilType')}</Text>
              {soilTypes.map((st) => (
                <TouchableOpacity
                  key={st}
                  style={styles.modalOption}
                  onPress={() => {
                    setSoilType(st);
                    setSoilModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{st}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Rainfall Input */}
        <TextInput
          style={styles.input}
          placeholder={t('rainfallMm')}
          placeholderTextColor={colors.textTertiary}
          keyboardType="decimal-pad"
          value={rainfall}
          onChangeText={setRainfall}
        />

        {/* Temperature Input */}
        <TextInput
          style={styles.input}
          placeholder={t('temperatureCelsius')}
          placeholderTextColor={colors.textTertiary}
          keyboardType="decimal-pad"
          value={temperature}
          onChangeText={setTemperature}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleGetRecommendations}
        >
          <Text style={styles.submitBtnText}>{t('getRecommendations')}</Text>
        </TouchableOpacity>
      </View>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <View>
          <Text style={styles.recommendationsTitle}>
            🎯 {recommendations.length} {t('recommendedCrops')}
          </Text>
          {recommendations.map((crop) => renderCropCard(crop))}
        </View>
      )}

      {recommendations.length === 0 && rainfall && temperature && (
        <Text style={styles.noRecommendations}>{t('noRecommendations')}</Text>
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
  formCard: {
    backgroundColor: colors.glassLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  selector: {
    backgroundColor: colors.glass,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectorLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  selectorValue: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.glass,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    width: '80%',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalOptionText: {
    color: colors.text,
    fontSize: 14,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 12,
  },
  cropCard: {
    backgroundColor: colors.glassLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cropEmoji: {
    fontSize: 32,
    marginRight: 10,
  },
  cropInfo: {
    flex: 1,
  },
  cropTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cropDuration: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
  matchScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  cropDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  specGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  specBox: {
    flex: 1,
    backgroundColor: colors.glass,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  specLabel: {
    fontSize: 11,
    color: colors.textTertiary,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 2,
  },
  benefitsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 6,
  },
  benefit: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  noRecommendations: {
    textAlign: 'center',
    color: colors.textTertiary,
    marginTop: 32,
    fontSize: 14,
  },
});

export default CropsScreen;
