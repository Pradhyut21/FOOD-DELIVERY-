export default function Header({ title, isOnline, setIsOnline, activeView }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-actions">
        <button
          className={`status-pill ${isOnline ? 'online' : 'offline'}`}
          onClick={() => setIsOnline(prev => !prev)}
          id="restaurant-status-toggle"
          style={!isOnline ? { background: 'rgba(239,68,68,0.1)', color: 'var(--color-error)', border: '1px solid rgba(239,68,68,0.2)' } : {}}
        >
          <span className="status-dot" />
          {isOnline ? 'Open' : 'Closed'}
        </button>
        <button className="header-btn" id="header-notifications">
          🔔 Alerts
        </button>
        <button className="header-btn primary" id="header-add-item">
          + Add Item
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B00, #FF8A30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900, color: 'white', cursor: 'pointer'
          }} id="header-profile">
            R
          </div>
        </div>
      </div>
    </header>
  );
}
