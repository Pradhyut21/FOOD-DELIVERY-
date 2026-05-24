import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';

const MOODS = ['Comfort', 'Celebration', 'Healthy', 'Adventurous', 'Hangover Fix', 'Quick Bite'];

const RESTAURANTS = [
  { id: '1', name: 'Spice Haven', rating: 4.5, time: '30 mins', cuisine: 'Indian', isVeg: false },
  { id: '2', name: 'Green Bowl', rating: 4.8, time: '20 mins', cuisine: 'Healthy', isVeg: true },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.locationText}>📍 Current Location</Text>
          <View style={styles.topIcons}>
            <Text style={styles.icon}>🔍</Text>
            <Text style={styles.icon}>🔔</Text>
          </View>
        </View>

        {/* Mood Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodSelector}>
          {MOODS.map((mood, index) => (
            <TouchableOpacity key={index} style={styles.moodChip}>
              <Text style={styles.moodText}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner Carousel Placeholder */}
        <View style={styles.bannerCarousel}>
          <Text style={styles.bannerText}>Promo: 50% OFF on First Order!</Text>
        </View>

        {/* Delivering Now Near You */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivering Now Near You</Text>
          {RESTAURANTS.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantCard}>
              <View style={styles.imagePlaceholder} />
              <View style={styles.cardInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantDetails}>
                  ⭐ {restaurant.rating} • {restaurant.time} • {restaurant.cuisine} {restaurant.isVeg ? '🥬' : '🍗'}
                </Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topIcons: {
    flexDirection: 'row',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 16,
  },
  moodSelector: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  moodChip: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  moodText: {
    color: '#FFFFFF',
  },
  bannerCarousel: {
    marginHorizontal: 16,
    height: 120,
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  restaurantCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#333333',
  },
  cardInfo: {
    padding: 12,
  },
  restaurantName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantDetails: {
    color: '#AAAAAA',
    fontSize: 14,
  },
});
