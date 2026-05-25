const navItems = [
  { id: 'orders', label: 'Orders', icon: '📋', badge: 3 },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'menu', label: 'Menu', icon: '🍽️' },
  { id: 'reservations', label: 'Reservations', icon: '📅' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">CraveMate</div>
        <div className="logo-sub">Restaurant Dashboard</div>
      </div>

      <div className="sidebar-restaurant">
        <div className="rest-avatar">B</div>
        <div>
          <div className="rest-name">Biryani Bros</div>
          <div className="rest-status">● Open Now</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Management</div>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
            id={`sidebar-nav-${item.id}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
