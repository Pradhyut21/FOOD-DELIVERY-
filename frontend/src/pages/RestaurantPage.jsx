import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockRestaurants, mockMenuItems, mockMenuCategories } from '../data/mockData';
import DishCard from '../components/DishCard';
import { useCart } from '../contexts/CartContext';

export default function RestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { totalItems, totalPrice, restaurantId } = useCart();
  const [activeCategory, setActiveCategory] = useState('starters');
  const [showLiveCam, setShowLiveCam] = useState(false);

  const restaurant = mockRestaurants.find(r => r.id === parseInt(id)) || mockRestaurants[0];
  const menuItems = mockMenuItems.filter(i => i.restaurantId === (restaurant?.id || 1));
  const categories = mockMenuCategories.filter(cat =>
    menuItems.some(i => i.category === cat.id)
  );
  const filteredItems = menuItems.filter(i => i.category === activeCategory);
  const showCartBar = restaurantId === restaurant?.id && totalItems > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="restaurant-page">
      {/* HERO */}
      <div className="restaurant-hero">
        <button className="back-btn" onClick={() => navigate(-1)} id="restaurant-back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>

        <img
          src={restaurant?.image}
          alt={restaurant?.name}
          className="hero-image"
        />
        <div className="hero-gradient" />

        {restaurant?.hasLiveCam && (
          <button
            className="live-cam-btn"
            onClick={() => setShowLiveCam(!showLiveCam)}
            id="live-cam-btn"
          >
            <span className="live-cam-dot" />
            LIVE CAM
          </button>
        )}

        <div className="hero-info">
          <div className="hero-badges">
            <div className={`food-dot ${restaurant?.isVeg ? 'veg' : 'nonveg'}`} />
            <span className="badge badge-dark">Open Now</span>
          </div>
          <h1 className="hero-name">{restaurant?.name}</h1>
          <div className="hero-cuisine">{restaurant?.cuisine?.join(' • ')}</div>
          <div className="hero-meta">
            <span className="rating">⭐ {restaurant?.rating} ({(restaurant?.ratingCount / 1000).toFixed(1)}k reviews)</span>
            <span className="hero-sep">•</span>
            <span>🕐 {restaurant?.deliveryTime}</span>
            <span className="hero-sep">•</span>
            <span>{restaurant?.deliveryFee === 0 ? '🆓 Free Delivery' : `₹${restaurant?.deliveryFee} delivery`}</span>
          </div>
        </div>
      </div>

      {/* LIVE CAM TILE */}
      {showLiveCam && restaurant?.hasLiveCam && (
        <div className="live-cam-tile">
          <div className="live-cam-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="live-cam-dot" />
              <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>Live Kitchen Cam</span>
            </div>
            <button onClick={() => setShowLiveCam(false)} style={{ color: 'var(--color-text-muted)', fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          </div>
          <div className="live-cam-stream">
            <div className="cam-placeholder">
              <span style={{ fontSize: 48 }}>👨‍🍳</span>
              <p>Live stream from kitchen</p>
              <p style={{ fontSize: 11, opacity: 0.6 }}>Currently preparing your favorites</p>
            </div>
          </div>
        </div>
      )}

      {/* RESTAURANT INFO CHIPS */}
      <div className="rest-chips">
        <div className="scroll-x" style={{ paddingLeft: 16 }}>
          <span className="info-chip">📍 {restaurant?.distance}</span>
          <span className="info-chip">🛵 Min order ₹{restaurant?.minOrder}</span>
          {restaurant?.offers?.map(o => (
            <span key={o} className="info-chip offer-chip">🏷️ {o}</span>
          ))}
        </div>
      </div>

      {/* MENU */}
      <div className="menu-layout">
        {/* CATEGORY SIDEBAR */}
        <div className="category-sidebar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              id={`cat-${cat.id}`}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* MENU ITEMS */}
        <div className="menu-items">
          <div className="menu-category-header">
            <h2 className="menu-cat-title">
              {categories.find(c => c.id === activeCategory)?.emoji}{' '}
              {categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="menu-cat-count">{filteredItems.length} items</span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 20px' }}>
              <div className="empty-state-emoji">🍽️</div>
              <div className="empty-state-title">No items here</div>
              <div className="empty-state-desc">This category has no items available right now</div>
            </div>
          ) : (
            <div className="menu-items-list desktop-grid">
              {filteredItems.map(item => (
                <DishCard
                  key={item.id}
                  item={item}
                  restaurantId={restaurant?.id}
                  restaurantName={restaurant?.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FLOATING CART BAR */}
      {showCartBar && (
        <div className="cart-bar" onClick={() => navigate('/checkout')} id="view-cart-btn">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="cart-bar-count">{totalItems}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'white' }}>
                View Cart
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
                {restaurant?.name}
              </div>
            </div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 'var(--text-md)', color: 'white' }}>
            ₹{totalPrice} →
          </div>
        </div>
      )}

      <div style={{ height: showCartBar ? 140 : 80 }} />

      <style>{`
        .restaurant-page {
          background: var(--bg-primary);
          min-height: 100dvh;
          animation: fade-up 0.3s ease;
        }

        .restaurant-hero {
          position: relative;
          height: 260px;
        }

        .back-btn {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .back-btn:hover {
          background: rgba(255,107,0,0.4);
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(15,15,15,0.3) 60%, transparent 100%);
        }

        .live-cam-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(239,68,68,0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          animation: pulse-red 1.5s ease infinite;
        }

        .live-cam-dot {
          width: 7px;
          height: 7px;
          background: white;
          border-radius: 50%;
          animation: pulse 1s ease infinite;
          flex-shrink: 0;
        }

        .hero-info {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
        }

        .hero-badges {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .hero-name {
          font-size: var(--text-2xl);
          font-weight: 900;
          color: white;
          line-height: 1.1;
        }

        .hero-cuisine {
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.7);
          margin: 4px 0;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          font-size: 11px;
          color: rgba(255,255,255,0.8);
        }

        .hero-sep {
          opacity: 0.5;
        }

        .live-cam-tile {
          margin: 12px 16px;
          background: var(--bg-card);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .live-cam-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-bottom: 1px solid var(--color-border);
        }

        .live-cam-stream {
          height: 160px;
          background: #0a0a0a;
        }

        .cam-placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--color-text-muted);
          font-size: var(--text-sm);
        }

        .rest-chips {
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .info-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          border: 1px solid var(--color-border);
          font-size: 11px;
          color: var(--color-text-secondary);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .offer-chip {
          border-color: rgba(255,215,0,0.2);
          color: #FFD700;
          background: rgba(255,215,0,0.05);
        }

        .menu-layout {
          display: flex;
          gap: 0;
        }

        .category-sidebar {
          width: 80px;
          flex-shrink: 0;
          border-right: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          align-self: flex-start;
          max-height: calc(100dvh - 200px);
          overflow-y: auto;
        }

        .category-item {
          width: 100%;
          padding: 14px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          border-bottom: 1px solid var(--color-divider);
          background: none;
          border-left: 3px solid transparent;
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: var(--font-primary);
        }

        .category-item.active {
          background: var(--color-orange-subtle);
          border-left-color: var(--color-orange);
        }

        .cat-emoji {
          font-size: 20px;
        }

        .cat-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--color-text-muted);
          text-align: center;
          line-height: 1.2;
        }

        .category-item.active .cat-label {
          color: var(--color-orange);
        }

        .menu-items {
          flex: 1;
          overflow: hidden;
        }

        .menu-category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 16px 8px;
        }

        .menu-cat-title {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .menu-cat-count {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          background: var(--bg-elevated);
          padding: 3px 8px;
          border-radius: var(--radius-full);
        }

        .menu-items-list {
          padding: 0 12px 12px;
          gap: 8px;
        }

        .cart-bar {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(var(--max-width) - 32px);
          max-width: calc(100vw - 32px);
          background: var(--color-orange);
          border-radius: var(--radius-xl);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: var(--shadow-orange-lg);
          z-index: 200;
          cursor: pointer;
          animation: slide-up-cart 0.4s var(--transition-spring) forwards;
        }

        .cart-bar-count {
          width: 26px;
          height: 26px;
          background: rgba(0,0,0,0.3);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          color: white;
        }

        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
