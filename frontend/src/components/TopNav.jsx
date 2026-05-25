import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/orders', label: 'Orders' },
  { path: '/dine-out', label: 'Dine-Out' }
];

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <>
      <nav className="top-nav">
        <div className="top-nav-content">
          <div className="nav-brand" onClick={() => navigate('/')}>
            <span style={{ fontSize: 24, fontWeight: 900, color: 'var(--color-orange)' }}>CraveMate</span>
          </div>
          
          <div className="nav-links">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                  id={`nav-${item.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
                >
                  {item.label}
                  {item.label === 'Orders' && totalItems > 0 && (
                    <span className="nav-badge-inline">{totalItems}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="nav-actions">
            <button className="btn-icon" onClick={() => navigate('/profile')} id="nav-profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <style>{`
        .top-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--top-nav-height);
          background: rgba(15, 15, 15, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border);
          z-index: 500;
          display: flex;
          justify-content: center;
        }

        .top-nav-content {
          width: 100%;
          max-width: var(--max-width);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--content-padding);
        }

        .nav-brand {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-muted);
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
        }

        .nav-link.active {
          color: var(--color-orange);
        }

        .nav-badge-inline {
          background: var(--color-orange);
          color: white;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: var(--radius-full);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
      `}</style>
    </>
  );
}
