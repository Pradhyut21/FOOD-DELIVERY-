import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const MOODS = ['Comfort', 'Celebration', 'Healthy', 'Adventurous', 'Hangover Fix', 'Quick Bite'];

const RESTAURANTS = [
  { id: '1', name: 'Spice Haven', rating: 4.5, time: '30 mins', cuisine: 'Indian', isVeg: false },
  { id: '2', name: 'Green Bowl', rating: 4.8, time: '20 mins', cuisine: 'Healthy', isVeg: true },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('home'); // 'home' or 'checkout'

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const placeOrder = () => {
    alert('Order Placed Successfully!');
    setCart([]);
    setView('home');
  };

  if (view === 'checkout') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setView('home')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>
        <ScrollView style={styles.checkoutBody}>
          <Text style={styles.sectionTitle}>Your Order</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.cartItemText}>{item.name}</Text>
              <Text style={styles.cartItemText}>₹150</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{cart.length * 150}</Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
            <Text style={styles.placeOrderText}>Place Order </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
                <View>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantDetails}>
                    ⭐ {restaurant.rating} • {restaurant.time} • {restaurant.cuisine} {restaurant.isVeg ? '🥬' : '🍗'}
                  </Text>
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(restaurant)}>
                  <Text style={styles.addBtnText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <View style={styles.floatingCart}>
          <Text style={styles.cartText}>{cart.length} item(s) | ₹{cart.length * 150}</Text>
          <TouchableOpacity style={styles.viewCartBtn} onPress={() => setView('checkout')}>
            <Text style={styles.viewCartText}>View Cart →</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  backButton: {
    color: '#ff6a00ef',
    fontSize: 18,
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutBody: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  cartItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 16,
  },
  totalText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  placeOrderBtn: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addBtn: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  floatingCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  cartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewCartBtn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewCartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
