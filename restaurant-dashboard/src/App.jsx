import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OrdersView from './views/OrdersView';
import AnalyticsView from './views/AnalyticsView';
import MenuView from './views/MenuView';
import ReservationsView from './views/ReservationsView';
import SettingsView from './views/SettingsView';

export default function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeView, setActiveView] = useState('orders');

  const viewTitles = {
    orders: 'Order Management',
    analytics: 'Analytics',
    menu: 'Menu Management',
    reservations: 'Reservations & Tables',
    settings: 'Settings'
  };

  const renderView = () => {
    switch (activeView) {
      case 'orders': return <OrdersView />;
      case 'analytics': return <AnalyticsView />;
      case 'menu': return <MenuView />;
      case 'reservations': return <ReservationsView />;
      case 'settings': return <SettingsView />;
      default: return <OrdersView />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="dashboard-main">
        <Header
          title={viewTitles[activeView]}
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          activeView={activeView}
        />
        <div className="dashboard-content animate-fade-in">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
