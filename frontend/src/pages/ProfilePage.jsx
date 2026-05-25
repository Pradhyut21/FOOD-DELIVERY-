import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders, mockLoyaltyCoins } from '../data/mockData';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: '📦', label: 'Order History', action: () => navigate('/orders'), id: 'profile-orders' },
    { icon: '📍', label: 'Saved Addresses', action: () => {}, id: 'profile-addresses' },
    { icon: '💳', label: 'Payment Methods', action: () => {}, id: 'profile-payments' },
    { icon: '🌍', label: 'Food Passport', action: () => navigate('/passport'), id: 'profile-passport' },
    { icon: '📱', label: 'Subscriptions', action: () => navigate('/subscriptions'), id: 'profile-subs' },
    { icon: '🏢', label: 'Corporate Account', action: () => {}, id: 'profile-corporate' },
    { icon: '🎁', label: 'Refer & Earn', action: () => {}, id: 'profile-refer' },
    { icon: '💬', label: 'Help & Support', action: () => {}, id: 'profile-help' },
    { icon: '⚙️', label: 'Settings', action: () => {}, id: 'profile-settings' },
  ];

  return (
    <div className="page profile-page">
      {/* PROFILE HERO */}
      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <button className="edit-avatar-btn" id="edit-avatar-btn">📷</button>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user?.name}</h1>
          <div className="profile-phone">{user?.phone}</div>
          <div className="dietary-tags">
            {user?.dietaryProfile?.map(tag => (
              <span key={tag} className="badge badge-orange" style={{ fontSize: '9px', textTransform: 'capitalize' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button className="btn btn-sm btn-secondary edit-profile-btn" id="edit-profile-btn">Edit</button>
      </div>

      {/* COINS ROW */}
      <div className="coins-row">
        <div className="coin-card green-coin">
          <div className="coin-icon">🌿</div>
          <div className="coin-value">{user?.greenCoins}</div>
          <div className="coin-label">Green Coins</div>
        </div>
        <div className="coin-card">
          <div className="coin-icon">🏆</div>
          <div className="coin-value">{Object.values(mockLoyaltyCoins).reduce((s, v) => s + v.balance, 0)}</div>
          <div className="coin-label">Loyalty Coins</div>
        </div>
        <div className="coin-card referral-card" onClick={() => navigator.clipboard?.writeText(user?.referralCode)}>
          <div className="coin-icon">🎁</div>
          <div className="coin-value">{user?.referralCode}</div>
          <div className="coin-label">Referral Code</div>
        </div>
      </div>

      {/* CORPORATE ACCOUNT */}
      {user?.corporateAccount && (
        <div className="corporate-card">
          <div className="corp-left">
            <div className="corp-icon">🏢</div>
            <div>
              <div className="corp-name">{user.corporateAccount.company}</div>
              <div className="corp-balance">
                Wallet: ₹{user.corporateAccount.walletBalance.toLocaleString('en-IN')} of ₹{user.corporateAccount.monthlyLimit.toLocaleString('en-IN')}/mo
              </div>
              <div className="progress-bar" style={{ width: 180, marginTop: 6 }}>
                <div className="progress-fill" style={{ width: `${(user.corporateAccount.walletBalance / user.corporateAccount.monthlyLimit) * 100}%` }} />
              </div>
            </div>
          </div>
          <span className="badge badge-green">Active</span>
        </div>
      )}

      {/* LOYALTY COINS */}
      <div className="loyalty-section">
        <div className="section-title" style={{ padding: '0 var(--content-padding)', marginBottom: 12 }}>🏅 Restaurant Coins</div>
        <div className="scroll-x" style={{ paddingLeft: 'var(--content-padding)' }}>
          {Object.entries(mockLoyaltyCoins).map(([restId, data]) => (
            <div key={restId} className="loyalty-card" id={`loyalty-${restId}`}>
              <div className="loyalty-coin-icon" style={{ animation: 'coin-spin 3s ease infinite' }}>🪙</div>
              <div className="loyalty-coin-val">{data.balance}</div>
              <div className="loyalty-rest-name">{data.restaurantName}</div>
              <div className="loyalty-hint">coins</div>
            </div>
          ))}
        </div>
      </div>

      {/* MENU LIST */}
      <div className="profile-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className="profile-menu-item"
            onClick={item.action}
            id={item.id}
          >
            <span className="menu-item-icon">{item.icon}</span>
            <span className="menu-item-label">{item.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        ))}
      </div>

      {/* LOGOUT */}
      <div style={{ padding: '8px var(--content-padding) 24px' }}>
        <button className="btn btn-secondary w-full" onClick={logout} id="logout-btn" style={{ color: 'var(--color-error)', borderColor: 'rgba(239,68,68,0.3)' }}>
          🚪 Logout
        </button>
      </div>

      <style>{`
        .profile-page {
          background: var(--bg-primary);
        }

        .profile-hero {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px var(--content-padding) 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .profile-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .profile-avatar {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 900;
          color: white;
          box-shadow: var(--shadow-orange);
        }

        .edit-avatar-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          border: 1px solid var(--color-border);
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .profile-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-name {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .profile-phone {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }

        .dietary-tags {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .coins-row {
          display: flex;
          gap: 8px;
          padding: 12px var(--content-padding);
        }

        .coin-card {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .coin-card:hover {
          border-color: rgba(255,107,0,0.3);
          transform: translateY(-1px);
        }

        .green-coin {
          border-color: rgba(34,197,94,0.2);
          background: rgba(34,197,94,0.05);
        }

        .referral-card {
          border-color: rgba(59,130,246,0.2);
          background: rgba(59,130,246,0.05);
        }

        .coin-icon {
          font-size: 24px;
          margin-bottom: 2px;
        }

        .coin-value {
          font-size: var(--text-lg);
          font-weight: 900;
          color: var(--color-text-primary);
        }

        .coin-label {
          font-size: 9px;
          color: var(--color-text-muted);
          text-align: center;
        }

        .corporate-card {
          margin: 0 var(--content-padding) 12px;
          background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(59,130,246,0.03));
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: var(--radius-lg);
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .corp-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .corp-icon {
          font-size: 28px;
        }

        .corp-name {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .corp-balance {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .loyalty-section {
          margin-bottom: 12px;
        }

        .loyalty-card {
          background: linear-gradient(135deg, #1a0a00, #2d1200);
          border: 1px solid rgba(255,107,0,0.2);
          border-radius: var(--radius-lg);
          padding: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          width: 110px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .loyalty-coin-icon {
          font-size: 28px;
        }

        .loyalty-coin-val {
          font-size: var(--text-2xl);
          font-weight: 900;
          color: var(--color-orange);
        }

        .loyalty-rest-name {
          font-size: 9px;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-align: center;
        }

        .loyalty-hint {
          font-size: 9px;
          color: var(--color-text-muted);
        }

        .profile-menu {
          border-top: 1px solid var(--color-divider);
          border-bottom: 1px solid var(--color-divider);
        }

        .profile-menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px var(--content-padding);
          border-bottom: 1px solid var(--color-divider);
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: var(--font-primary);
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
        }

        .profile-menu-item:hover {
          background: var(--bg-card);
        }

        .menu-item-icon {
          font-size: 20px;
          width: 28px;
          text-align: center;
        }

        .menu-item-label {
          flex: 1;
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--color-text-primary);
          text-align: left;
        }

        .edit-profile-btn {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
