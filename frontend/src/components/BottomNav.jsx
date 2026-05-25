import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const navItems = [
  { path: '/', label: 'Home', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { path: '/explore', label: 'Explore', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'none' : 'none'} stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  )},
  { path: '/orders', label: 'Orders', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="2"/>
    </svg>
  )},
  { path: '/dine-out', label: 'Dine-Out', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'none' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M3 2l1.578 9.467A1 1 0 005.568 12H6M3 2h4l1 7H3M3 2v20M21 2v4a4 4 0 01-4 4h-1v10"/>
    </svg>
  )},
  { path: '/profile', label: 'Profile', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )}
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              id={`nav-${item.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
            >
              <div className="nav-icon-wrapper">
                {item.icon(isActive)}
                {item.label === 'Orders' && totalItems > 0 && (
                  <span className="nav-badge">{totalItems}</span>
                )}
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: var(--max-width);
          height: var(--bottom-nav-height);
          background: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 8px;
          z-index: 500;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          flex: 1;
          padding: 8px 4px;
          border-radius: var(--radius-md);
          color: var(--color-text-muted);
          transition: all var(--transition-base);
          position: relative;
        }

        .bottom-nav-item.active {
          color: var(--color-orange);
        }

        .bottom-nav-item:active {
          transform: scale(0.92);
        }

        .nav-icon-wrapper {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: var(--color-orange);
          color: white;
          font-size: 9px;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounce-in 0.3s var(--transition-spring);
        }

        .nav-label {
          font-size: 10px;
          font-weight: 500;
          line-height: 1;
        }

        .bottom-nav-item.active .nav-label {
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
