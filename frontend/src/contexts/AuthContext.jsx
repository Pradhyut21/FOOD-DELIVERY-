import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 'user001',
    name: 'Arjun Mehta',
    phone: '+91 98765 43210',
    email: 'arjun@example.com',
    dietaryProfile: ['halal'],
    greenCoins: 180,
    referralCode: 'ARJUN50',
    avatar: null,
    savedAddresses: [
      { id: 'a1', label: 'Home', address: '12, MG Road, Bangalore - 560001', lat: 12.9716, lng: 77.5946 },
      { id: 'a2', label: 'Work', address: 'WeWork, Koramangala, Bangalore - 560034', lat: 12.9352, lng: 77.6245 }
    ],
    corporateAccount: {
      company: 'TechCorp Pvt Ltd',
      walletBalance: 3500,
      monthlyLimit: 5000
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Start logged in for demo

  const login = (phone) => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateDietaryProfile = (profile) => {
    setUser(prev => ({ ...prev, dietaryProfile: profile }));
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateDietaryProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
