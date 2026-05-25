export const overviewStats = {
  totalGmv: '₹12.4M',
  gmvGrowth: '+14.2%',
  activeOrders: 1420,
  ordersGrowth: '+8.4%',
  activeUsers: '45.2K',
  usersGrowth: '+2.1%',
  activeRestaurants: 842,
  restaurantsGrowth: '+1.2%',
};

export const gmvData = [
  { name: 'Mon', delivery: 4000, dineout: 2400 },
  { name: 'Tue', delivery: 3000, dineout: 1398 },
  { name: 'Wed', delivery: 2000, dineout: 9800 },
  { name: 'Thu', delivery: 2780, dineout: 3908 },
  { name: 'Fri', delivery: 1890, dineout: 4800 },
  { name: 'Sat', delivery: 2390, dineout: 3800 },
  { name: 'Sun', delivery: 3490, dineout: 4300 },
];

export const restaurants = [
  { id: 'R-1001', name: 'Burger King', owner: 'Ramesh K.', status: 'Active', commission: '15%', lastPayout: '₹45,200' },
  { id: 'R-1002', name: 'Truffles', owner: 'Sanjay M.', status: 'Pending Approval', commission: '18%', lastPayout: '-' },
  { id: 'R-1003', name: 'Nagarjuna', owner: 'Reddy Group', status: 'Active', commission: '12%', lastPayout: '₹1,24,000' },
  { id: 'R-1004', name: 'Meghana Foods', owner: 'Meghana LLC', status: 'Suspended', commission: '15%', lastPayout: '₹0' },
];

export const riders = [
  { id: 'D-8421', name: 'Rajesh K.', status: 'Online', deliveries: 1240, rating: 4.8 },
  { id: 'D-8422', name: 'Suresh P.', status: 'Offline', deliveries: 840, rating: 4.5 },
  { id: 'D-8423', name: 'Amit S.', status: 'On Delivery', deliveries: 2100, rating: 4.9 },
  { id: 'D-8424', name: 'Vikram B.', status: 'Online', deliveries: 150, rating: 4.1 },
];
