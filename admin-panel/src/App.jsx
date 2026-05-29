import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Bike, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { overviewStats, gmvData, restaurants, riders } from './data/mockData';
import UsersPage from './UsersPage';
import SettingsPage from './SettingsPage';
// --- COMPONENTS ---
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/restaurants', label: 'Restaurants', icon: Store },
    { path: '/fleet', label: 'Delivery Fleet', icon: Bike },
    { path: '/users', label: 'Users & Support', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <span>Crave</span>Mate Admin
      </div>
      <nav className="nav-menu">
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Header() {
  return (
    <header
  className="header"
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }}
>
      <div className="flex items-center gap-4">
        <button style={{ position: 'relative' }}>
          <Bell size={20} color="var(--color-text-secondary)" />
          <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: 'var(--color-danger)', borderRadius: '50%' }} />
        </button>
        <div className="flex items-center gap-2">
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
            A
          </div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Admin User</div>
        </div>
      </div>
    </header>
  );
}

// --- PAGES ---
function Overview() {
  return (
    <div>
      <h1 className="text-xl mb-6">Platform Overview</h1>
      
      <div className="grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-title">Total GMV <span className="stat-change pos flex items-center gap-1"><TrendingUp size={12}/> {overviewStats.gmvGrowth}</span></div>
          <div className="stat-value">{overviewStats.totalGmv}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Orders <span className="stat-change pos flex items-center gap-1"><TrendingUp size={12}/> {overviewStats.ordersGrowth}</span></div>
          <div className="stat-value">{overviewStats.activeOrders}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Users <span className="stat-change pos flex items-center gap-1"><TrendingUp size={12}/> {overviewStats.usersGrowth}</span></div>
          <div className="stat-value">{overviewStats.activeUsers}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Restaurants <span className="stat-change pos flex items-center gap-1"><TrendingUp size={12}/> {overviewStats.restaurantsGrowth}</span></div>
          <div className="stat-value">{overviewStats.activeRestaurants}</div>
        </div>
      </div>

      <div className="card mb-6">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Revenue Split (Delivery vs Dine-Out)</h2>
        <div style={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gmvData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip cursor={{fill: 'var(--bg-hover)'}} contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="delivery" name="Delivery" stackId="a" fill="var(--color-primary)" radius={[0,0,4,4]} />
              <Bar dataKey="dineout" name="Dine-Out" stackId="a" fill="var(--color-accent)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Restaurants() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Restaurant Management</h1>
        <button className="btn btn-primary">+ Add Restaurant</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Restaurant Name</th>
              <th>Owner</th>
              <th>Commission</th>
              <th>Last Payout</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r.id}>
                <td style={{ color: 'var(--color-text-muted)' }}>{r.id}</td>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td>{r.owner}</td>
                <td>{r.commission}</td>
                <td>{r.lastPayout}</td>
                <td>
                  <span className={`badge ${
                    r.status === 'Active' ? 'badge-success' : 
                    r.status === 'Pending Approval' ? 'badge-warning' : 'badge-danger'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: 11 }}>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Fleet() {
  const [riderList, setRiderList] = useState(riders);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [showAddRider, setShowAddRider] = useState(false);
const [showMap, setShowMap] = useState(false);
const [newRider, setNewRider] = useState({
  name: '',
  rating: 5,
  status: 'Online',
  deliveries: 0
});
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Delivery Fleet</h1>
        <div className="flex gap-2">
          <button
  className="btn btn-secondary"
  onClick={() => setShowMap(true)}
>
  Map View
</button>
          <button
  className="btn btn-primary"
  onClick={() => setShowAddRider(true)}
>
  Onboard Rider
</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Rider Name</th>
              <th>Total Deliveries</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riderList.map(r => (
              <tr key={r.id}>
                <td style={{ color: 'var(--color-text-muted)' }}>{r.id}</td>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td>{r.deliveries}</td>
                <td>⭐ {r.rating}</td>
                <td>
                  <span className={`badge ${
                    r.status === 'Online' ? 'badge-success' : 
                    r.status === 'On Delivery' ? 'badge-info' : 'badge-danger'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button
  className="btn btn-secondary"
  style={{ padding: '4px 8px', fontSize: 11 }}
  onClick={() => {
    setSelectedRider(r);
    setShowProfile(true);
  }}
>
  View Profile
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showProfile && selectedRider && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <div
      style={{
        background: 'var(--bg-card)',
        padding: 28,
        borderRadius: 16,
        width: 420,
        maxWidth: '90vw'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 700,
            margin: '0 auto 16px'
          }}
        >
          {selectedRider.name.charAt(0)}
        </div>

        <h2 style={{ marginBottom: 6 }}>
          {selectedRider.name}
        </h2>

        <p style={{ color: 'var(--color-text-muted)' }}>
          Delivery Partner
        </p>

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            textAlign: 'left'
          }}
        >
          <div>📦 Deliveries: {selectedRider.deliveries}</div>

          <div>⭐ Rating: {selectedRider.rating}</div>

          <div>
            🚴 Status: {selectedRider.status}
          </div>

          <div>
            💰 Earnings: ₹
            {(selectedRider.deliveries * 45).toLocaleString()}
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: 24, width: '100%' }}
          onClick={() => setShowProfile(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{showAddRider && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}
  >
    <div
      style={{
        background: 'var(--bg-card)',
        padding: 28,
        borderRadius: 16,
        width: 420
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        Add New Rider
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}>
        <input
          className="input"
          placeholder="Rider Name"
          value={newRider.name}
          onChange={(e) =>
            setNewRider(prev => ({
              ...prev,
              name: e.target.value
            }))
          }
        />

        <select
          className="input"
          value={newRider.status}
          onChange={(e) =>
            setNewRider(prev => ({
              ...prev,
              status: e.target.value
            }))
          }
        >
          <option>Online</option>
          <option>Offline</option>
          <option>On Delivery</option>
        </select>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary"
            style={{ flex: 1 }}
            onClick={() => setShowAddRider(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={() => {
              setRiderList(prev => [
                ...prev,
                {
                  id: Date.now(),
                  ...newRider
                }
              ]);

              setNewRider({
                name: '',
                rating: 5,
                status: 'Online',
                deliveries: 0
              });

              setShowAddRider(false);
            }}
          >
            Add Rider
          </button>
        </div>
      </div>
    </div>
  </div>
)}
{showMap && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}
  >
    <div
      style={{
        background: 'var(--bg-card)',
        padding: 20,
        borderRadius: 16,
        width: '80%',
        height: '80%'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16
        }}
      >
        <h2>Delivery Fleet Map</h2>

        <button
          className="btn btn-secondary"
          onClick={() => setShowMap(false)}
        >
          Close
        </button>
      </div>

      <div
        style={{
          height: '90%',
          borderRadius: 12,
          background: 'var(--bg-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18
        }}
      >
        🗺️ Live Rider Tracking Map Coming Soon
      </div>
    </div>
  </div>
)}
    </div>
    
  );
}

// --- APP ---
export default function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
