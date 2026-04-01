// src/screens/PricesScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { colors } from '../utils/colors';
import { t } from '../utils/i18n';
import {
  filterPrices,
  getAvailableMarkets,
  getAvailableCategories,
} from '../services/priceService';

const PricesScreen = () => {
  const [market, setMarket] = useState('all');
  const [category, setCategory] = useState('all');
  const [prices, setPrices] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [marketModalVisible, setMarketModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    setMarkets(getAvailableMarkets());
    setCategories(getAvailableCategories());
    updatePrices();
  }, []);

  useEffect(() => {
    updatePrices();
  }, [market, category]);

  const updatePrices = () => {
    const filtered = filterPrices(market, category);
    setPrices(filtered);
  };

  const renderPriceCard = ({ item }) => (
    <View style={styles.priceCard}>
      <View style={styles.priceHeader}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={styles.priceInfo}>
          <Text style={styles.cropName}>{item.crop}</Text>
          <Text style={styles.market}>{item.market.toUpperCase()}</Text>
        </View>
        <Text style={[styles.trendIcon]}>
          {item.trend === 'up' ? '📈' : '📉'}
        </Text>
      </View>

      <View style={styles.priceValue}>
        <Text style={styles.price}>₹{item.currentPrice}</Text>
        <Text style={[styles.change, item.trend === 'up' ? styles.changeUp : styles.changeDown]}>
          {item.trend === 'up' ? '+' : ''}{item.change}%
        </Text>
      </View>

      <View style={styles.priceRange}>
        <Text style={styles.rangeLabel}>Min: ₹{item.minPrice}</Text>
        <View style={styles.rangeDivider} />
        <Text style={styles.rangeLabel}>Max: ₹{item.maxPrice}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Bar */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setMarketModalVisible(true)}
        >
          <Text style={styles.filterBtnText}>📍 {market === 'all' ? t('allMarkets') : market}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.filterBtnText}>
            🏷️ {category === 'all' ? t('allCategories') : category}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Market Filter Modal */}
      <Modal transparent visible={marketModalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMarketModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('selectMarket')}</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setMarket('all');
                setMarketModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>All Markets</Text>
            </TouchableOpacity>
            {markets.map((m) => (
              <TouchableOpacity
                key={m}
                style={styles.modalOption}
                onPress={() => {
                  setMarket(m);
                  setMarketModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Category Filter Modal */}
      <Modal transparent visible={categoryModalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('selectCategory')}</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setCategory('all');
                setCategoryModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>All Categories</Text>
            </TouchableOpacity>
            {categories.map((c) => (
              <TouchableOpacity
                key={c}
                style={styles.modalOption}
                onPress={() => {
                  setCategory(c);
                  setCategoryModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Price Cards List */}
      <FlatList
        data={prices}
        renderItem={renderPriceCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t('noPricesFound')}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  filterBtn: {
    flex: 1,
    backgroundColor: colors.glass,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
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
  listContent: {
    paddingBottom: 16,
  },
  priceCard: {
    backgroundColor: colors.glassLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 28,
    marginRight: 10,
  },
  priceInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  market: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
  trendIcon: {
    fontSize: 20,
  },
  priceValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
  changeUp: {
    color: colors.primary,
  },
  changeDown: {
    color: colors.error,
  },
  priceRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rangeLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    flex: 1,
  },
  rangeDivider: {
    width: 1,
    height: 12,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textTertiary,
    marginTop: 32,
    fontSize: 14,
  },
});

export default PricesScreen;
