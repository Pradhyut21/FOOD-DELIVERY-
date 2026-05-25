// Mock data for CraveMate application

export const mockRestaurants = [
  {
    id: 1,
    name: "Biryani Bros",
    cuisine: ["Biryani", "Mughlai", "North Indian"],
    rating: 4.7,
    ratingCount: 2841,
    deliveryTime: "25-35 min",
    deliveryFee: 29,
    minOrder: 150,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=250&fit=crop",
    isVeg: false,
    isOpen: true,
    offers: ["20% off on first order"],
    tags: ["Bestseller", "Fast Delivery"],
    crowdMeter: "Moderate",
    availableSlots: 4,
    hasLiveCam: true,
    cuisineType: "Indian"
  },
  {
    id: 2,
    name: "Green Bowl Co.",
    cuisine: ["Salads", "Healthy", "Vegan"],
    rating: 4.5,
    ratingCount: 1203,
    deliveryTime: "20-30 min",
    deliveryFee: 19,
    minOrder: 200,
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
    isVeg: true,
    isOpen: true,
    offers: ["Free delivery above ₹399"],
    tags: ["Healthy", "Vegan Friendly"],
    crowdMeter: "Quiet",
    availableSlots: 8,
    hasLiveCam: false,
    cuisineType: "Healthy"
  },
  {
    id: 3,
    name: "Pizza Paradiso",
    cuisine: ["Pizza", "Italian", "Pasta"],
    rating: 4.4,
    ratingCount: 3102,
    deliveryTime: "30-40 min",
    deliveryFee: 39,
    minOrder: 299,
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop",
    isVeg: false,
    isOpen: true,
    offers: ["Buy 1 Get 1 on weekends"],
    tags: ["Trending", "Must Try"],
    crowdMeter: "Packed",
    availableSlots: 2,
    hasLiveCam: true,
    cuisineType: "Italian"
  },
  {
    id: 4,
    name: "Dosa Darbar",
    cuisine: ["South Indian", "Dosa", "Filter Coffee"],
    rating: 4.8,
    ratingCount: 5421,
    deliveryTime: "15-25 min",
    deliveryFee: 0,
    minOrder: 100,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=250&fit=crop",
    isVeg: true,
    isOpen: true,
    offers: ["Free delivery always"],
    tags: ["Top Rated", "Pure Veg"],
    crowdMeter: "Moderate",
    availableSlots: 6,
    hasLiveCam: false,
    cuisineType: "South Indian"
  },
  {
    id: 5,
    name: "Burger Barn",
    cuisine: ["Burgers", "American", "Fries"],
    rating: 4.3,
    ratingCount: 1876,
    deliveryTime: "20-30 min",
    deliveryFee: 29,
    minOrder: 199,
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop",
    isVeg: false,
    isOpen: true,
    offers: ["10% off with CRAVE10"],
    tags: ["Late Night", "Quick Bite"],
    crowdMeter: "Quiet",
    availableSlots: 10,
    hasLiveCam: false,
    cuisineType: "American"
  },
  {
    id: 6,
    name: "Thai Garden",
    cuisine: ["Thai", "Pan-Asian", "Sushi"],
    rating: 4.6,
    ratingCount: 987,
    deliveryTime: "35-45 min",
    deliveryFee: 49,
    minOrder: 350,
    distance: "3.2 km",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=250&fit=crop",
    isVeg: false,
    isOpen: true,
    offers: ["Chef's special today"],
    tags: ["Exotic", "Premium"],
    crowdMeter: "Moderate",
    availableSlots: 5,
    hasLiveCam: false,
    cuisineType: "Thai"
  }
];

export const mockDineOutRestaurants = [
  {
    id: 101,
    name: "Skyline Bistro",
    cuisine: ["Continental", "Fine Dining"],
    rating: 4.8,
    ratingCount: 892,
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
    crowdMeter: "Moderate",
    availableSlots: 6,
    priceForTwo: 1200,
    experiences: ["Chef's Table", "Date Night Bundle"],
    isVeg: false
  },
  {
    id: 102,
    name: "The Spice Garden",
    cuisine: ["Indian", "Rajasthani"],
    rating: 4.6,
    ratingCount: 1543,
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
    crowdMeter: "Packed",
    availableSlots: 2,
    priceForTwo: 800,
    experiences: ["Birthday Package", "Family Feast"],
    isVeg: false
  },
  {
    id: 103,
    name: "Bamboo House",
    cuisine: ["Japanese", "Sushi", "Ramen"],
    rating: 4.9,
    ratingCount: 634,
    distance: "4.1 km",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=250&fit=crop",
    crowdMeter: "Quiet",
    availableSlots: 12,
    priceForTwo: 1800,
    experiences: ["Omakase Experience", "Sake Pairing"],
    isVeg: false
  }
];

export const mockHomeChefs = [
  {
    id: 201,
    name: "Amma's Kitchen",
    chef: "Lakshmi Menon",
    specialty: ["Home-cooked South Indian", "Traditional Kerala"],
    rating: 4.9,
    ratingCount: 312,
    deliveryTime: "45-60 min",
    minOrder: 200,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
    isVeg: true,
    story: "25 years of traditional cooking"
  },
  {
    id: 202,
    name: "Bake & Bloom",
    chef: "Priya Sharma",
    specialty: ["Artisan Breads", "Cakes", "French Pastry"],
    rating: 4.8,
    ratingCount: 198,
    deliveryTime: "Same-day order",
    minOrder: 350,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=250&fit=crop",
    isVeg: true,
    story: "Paris-trained baker"
  },
  {
    id: 203,
    name: "Grandma's Pickles & More",
    chef: "Saraswati Devi",
    specialty: ["Pickles", "Papads", "Home Meals"],
    rating: 5.0,
    ratingCount: 89,
    deliveryTime: "1-2 days",
    minOrder: 150,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop",
    isVeg: true,
    story: "Secret family recipes from Rajasthan"
  }
];

export const mockBanners = [
  {
    id: 1,
    title: "50% OFF",
    subtitle: "On your first 3 orders",
    badge: "NEW USER",
    gradient: "linear-gradient(135deg, #FF6B00 0%, #FF8A30 50%, #FFB347 100%)",
    emoji: "🎉"
  },
  {
    id: 2,
    title: "Free Delivery",
    subtitle: "All weekend long — no minimum",
    badge: "WEEKEND DEAL",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accentColor: "#3B82F6",
    emoji: "🚀"
  },
  {
    id: 3,
    title: "Dine Out Tonight",
    subtitle: "Book a table & get ₹200 cashback",
    badge: "DINE-OUT",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #2d1000 50%, #3d1a00 100%)",
    accentColor: "#FF6B00",
    emoji: "🍽️"
  }
];

export const moodFilters = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'comfort', label: 'Comfort', emoji: '🍲' },
  { id: 'celebration', label: 'Celebration', emoji: '🎉' },
  { id: 'healthy', label: 'Healthy', emoji: '🥗' },
  { id: 'adventurous', label: 'Adventurous', emoji: '🌍' },
  { id: 'hangover', label: 'Hangover Fix', emoji: '🥤' },
  { id: 'quick', label: 'Quick Bite', emoji: '⚡' }
];

export const mockMenuCategories = [
  { id: 'starters', label: 'Starters', emoji: '🥗' },
  { id: 'mains', label: 'Mains', emoji: '🍱' },
  { id: 'breads', label: 'Breads', emoji: '🫓' },
  { id: 'desserts', label: 'Desserts', emoji: '🍮' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' }
];

export const mockMenuItems = [
  {
    id: 1001,
    restaurantId: 1,
    category: 'starters',
    name: 'Mutton Seekh Kebab',
    price: 299,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&h=200&fit=crop',
    isVeg: false,
    rating: 4.7,
    ratingCount: 342,
    allergens: ['gluten'],
    dietaryTags: ['halal'],
    description: 'Tender mutton minced with aromatic spices, grilled on skewers',
    isPopular: true,
    isBestseller: true
  },
  {
    id: 1002,
    restaurantId: 1,
    category: 'mains',
    name: 'Hyderabadi Dum Biryani',
    price: 349,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop',
    isVeg: false,
    rating: 4.9,
    ratingCount: 1203,
    allergens: ['dairy'],
    dietaryTags: ['halal'],
    description: 'Slow-cooked basmati rice layered with succulent mutton in aromatic spices',
    isPopular: true,
    isBestseller: true
  },
  {
    id: 1003,
    restaurantId: 1,
    category: 'mains',
    name: 'Veg Dum Biryani',
    price: 249,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200&h=200&fit=crop',
    isVeg: true,
    rating: 4.5,
    ratingCount: 678,
    allergens: ['dairy'],
    dietaryTags: ['vegetarian'],
    description: 'Fragrant basmati rice cooked with fresh vegetables and whole spices',
    isPopular: false,
    isBestseller: false
  },
  {
    id: 1004,
    restaurantId: 1,
    category: 'starters',
    name: 'Hara Bhara Kabab',
    price: 199,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=200&h=200&fit=crop',
    isVeg: true,
    rating: 4.3,
    ratingCount: 234,
    allergens: ['gluten'],
    dietaryTags: ['vegetarian', 'jain'],
    description: 'Green spinach and peas patties with mint chutney',
    isPopular: false,
    isBestseller: false
  },
  {
    id: 1005,
    restaurantId: 1,
    category: 'desserts',
    name: 'Double Ka Meetha',
    price: 129,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
    isVeg: true,
    rating: 4.8,
    ratingCount: 456,
    allergens: ['dairy', 'gluten', 'nuts'],
    dietaryTags: ['vegetarian'],
    description: 'Hyderabadi bread pudding with rabri and dried fruits',
    isPopular: true,
    isBestseller: false
  },
  {
    id: 1006,
    restaurantId: 1,
    category: 'drinks',
    name: 'Rose Lassi',
    price: 99,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200&h=200&fit=crop',
    isVeg: true,
    rating: 4.6,
    ratingCount: 312,
    allergens: ['dairy'],
    dietaryTags: ['vegetarian'],
    description: 'Chilled yoghurt blended with rose syrup and garnished with pistachios',
    isPopular: false,
    isBestseller: false
  }
];

export const mockOrders = [
  {
    id: 'ORD001',
    restaurantId: 1,
    restaurantName: 'Biryani Bros',
    restaurantImage: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop',
    items: [
      { name: 'Hyderabadi Dum Biryani', qty: 2, price: 349 },
      { name: 'Rose Lassi', qty: 2, price: 99 }
    ],
    status: 'delivered',
    total: 896,
    date: '2026-05-24',
    deliveryPartner: 'Ravi Kumar',
    rating: 5
  },
  {
    id: 'ORD002',
    restaurantId: 2,
    restaurantName: 'Green Bowl Co.',
    restaurantImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
    items: [
      { name: 'Quinoa Power Bowl', qty: 1, price: 299 }
    ],
    status: 'on_the_way',
    total: 318,
    date: '2026-05-25',
    deliveryPartner: 'Suresh M',
    rating: null
  }
];

export const mockLoyaltyCoins = {
  1: { balance: 240, restaurantName: 'Biryani Bros' },
  2: { balance: 50, restaurantName: 'Green Bowl Co.' }
};

export const mockGreenCoins = 180;

export const foodPassportData = {
  cuisinesTried: ['Indian', 'Italian', 'South Indian', 'Chinese'],
  totalCuisines: 12,
  cuisines: [
    { name: 'Indian', emoji: '🇮🇳', tried: true, orders: 15 },
    { name: 'Italian', emoji: '🇮🇹', tried: true, orders: 4 },
    { name: 'Thai', emoji: '🇹🇭', tried: false, orders: 0 },
    { name: 'Japanese', emoji: '🇯🇵', tried: false, orders: 0 },
    { name: 'South Indian', emoji: '🥘', tried: true, orders: 8 },
    { name: 'Chinese', emoji: '🇨🇳', tried: true, orders: 6 },
    { name: 'Lebanese', emoji: '🇱🇧', tried: false, orders: 0 },
    { name: 'Mexican', emoji: '🇲🇽', tried: false, orders: 0 },
    { name: 'Ethiopian', emoji: '🇪🇹', tried: false, orders: 0 },
    { name: 'American', emoji: '🇺🇸', tried: false, orders: 0 },
    { name: 'Korean', emoji: '🇰🇷', tried: false, orders: 0 },
    { name: 'Mediterranean', emoji: '🫒', tried: false, orders: 0 },
  ]
};

export const mockFlashTables = [
  {
    id: 301,
    restaurantId: 101,
    restaurantName: 'Skyline Bistro',
    restaurantImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop',
    tableInfo: 'Rooftop Table for 2 — City View',
    minBid: 500,
    currentBid: 750,
    endsAt: new Date(Date.now() + 45 * 60 * 1000), // 45 min from now
    bids: 7
  },
  {
    id: 302,
    restaurantId: 102,
    restaurantName: 'The Spice Garden',
    restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
    tableInfo: 'Private Alcove for 4 — Garden View',
    minBid: 300,
    currentBid: 450,
    endsAt: new Date(Date.now() + 92 * 60 * 1000), // 92 min
    bids: 4
  }
];
