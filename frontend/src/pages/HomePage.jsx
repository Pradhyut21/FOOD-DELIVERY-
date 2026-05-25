import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BannerCarousel from '../components/BannerCarousel';
import RestaurantCard from '../components/RestaurantCard';
import {
  mockRestaurants,
  mockDineOutRestaurants,
  mockHomeChefs,
  moodFilters,
  foodPassportData
} from '../data/mockData';

const hour = new Date().getHours();
const isLateNight = hour >= 22 || hour < 4;

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeMood, setActiveMood] = useState('all');
  const [locationExpanded, setLocationExpanded] = useState(false);

  const filteredRestaurants = activeMood === 'all'
    ? mockRestaurants
    : mockRestaurants.filter(r => {
        const moodMap = {
          comfort: ['Biryani', 'Mughlai', 'North Indian', 'South Indian'],
          celebration: ['Fine Dining', 'Continental', 'Italian'],
          healthy: ['Healthy', 'Vegan', 'Salads'],
          adventurous: ['Thai', 'Japanese', 'Lebanese', 'Ethiopian'],
          hangover: ['Burgers', 'American'],
          quick: ['South Indian', 'Fast Food']
        };
        return r.cuisine.some(c => (moodMap[activeMood] || []).includes(c));
      });

  const passportPct = Math.round((foodPassportData.cuisinesTried.length / foodPassportData.totalCuisines) * 100);

  return (
    <div className="page home-page">
      {/* GREETING */}
      <div className="greeting-section">
        <h1 className="greeting-text">
          Hey {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="greeting-sub">What are you craving today?</p>
      </div>

      {/* MOOD SELECTOR */}
      <div className="mood-section">
        <div className="scroll-x scroll-x-padded" style={{ paddingLeft: 'var(--content-padding)' }}>
          {moodFilters.map(mood => (
            <button
              key={mood.id}
              className={`chip ${activeMood === mood.id ? 'active' : ''}`}
              onClick={() => setActiveMood(mood.id)}
              id={`mood-${mood.id}`}
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* BANNER CAROUSEL */}
      <BannerCarousel />

      {/* FOOD PASSPORT PROGRESS */}
      <div className="passport-widget" onClick={() => navigate('/passport')} id="passport-widget">
        <div className="passport-left">
          <div className="passport-icon">🌍</div>
          <div className="passport-info">
            <div className="passport-title">Food Passport</div>
            <div className="passport-subtitle">
              {foodPassportData.cuisinesTried.length} of {foodPassportData.totalCuisines} cuisines explored
            </div>
            <div className="progress-bar" style={{ marginTop: 8 }}>
              <div className="progress-fill" style={{ width: `${passportPct}%` }} />
            </div>
          </div>
        </div>
        <div className="passport-pct gradient-text">{passportPct}%</div>
      </div>

      {/* DELIVERING NOW SECTION */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <div className="section-title">🚀 Delivering Now Near You</div>
            <div className="section-subtitle">{filteredRestaurants.length} restaurants open</div>
          </div>
          <button className="see-all" onClick={() => navigate('/explore')} id="see-all-restaurants">See All</button>
        </div>
        <div className="scroll-x desktop-grid" style={{ paddingLeft: 'var(--content-padding)' }}>
          {filteredRestaurants.map(r => (
            <RestaurantCard key={r.id} restaurant={r} variant="delivery" />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* DINE-OUT SECTION */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <div className="section-title">🍽️ Book a Table Tonight</div>
            <div className="section-subtitle">Reserve your spot now</div>
          </div>
          <button className="see-all" onClick={() => navigate('/dine-out')} id="see-all-dineout">See All</button>
        </div>
        <div className="scroll-x desktop-grid" style={{ paddingLeft: 'var(--content-padding)' }}>
          {mockDineOutRestaurants.map(r => (
            <RestaurantCard key={r.id} restaurant={r} variant="dine-out" />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* HOME CHEFS */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <div className="section-title">👩‍🍳 Home Chefs Near You</div>
            <div className="section-subtitle">Local, homemade goodness</div>
          </div>
          <button className="see-all" id="see-all-chefs">See All</button>
        </div>
        <div className="scroll-x desktop-grid" style={{ paddingLeft: 'var(--content-padding)' }}>
          {mockHomeChefs.map(chef => (
            <div key={chef.id} className="chef-card" id={`chef-card-${chef.id}`}>
              <div className="chef-card-image-wrap">
                <img src={chef.image} alt={chef.name} className="chef-card-image" loading="lazy" />
                <div className="img-overlay" />
                {chef.isVeg && (
                  <span className="badge badge-green" style={{ position: 'absolute', top: 8, left: 8, fontSize: '9px' }}>Pure Veg</span>
                )}
              </div>
              <div className="chef-card-body">
                <div className="chef-name">{chef.name}</div>
                <div className="chef-by">by {chef.chef}</div>
                <div className="chef-story">"{chef.story}"</div>
                <div className="chef-meta">
                  <span className="rating">⭐ {chef.rating}</span>
                  <span className="delivery-time">🕐 {chef.deliveryTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATE NIGHT SECTION */}
      {isLateNight && (
        <>
          <div className="section-divider" />
          <section className="home-section">
            <div className="section-header">
              <div>
                <div className="section-title">🌙 Late Night Cravings</div>
                <div className="section-subtitle">Open past midnight</div>
              </div>
            </div>
            <div className="scroll-x desktop-grid" style={{ paddingLeft: 'var(--content-padding)' }}>
              {mockRestaurants.slice(0, 3).map(r => (
                <RestaurantCard key={r.id} restaurant={r} variant="delivery" />
              ))}
            </div>
          </section>
        </>
      )}

      <div style={{ height: 20 }} />

      <style>{`
        .home-page {
          background: var(--bg-primary);
        }

        .home-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px var(--content-padding) 8px;
          position: sticky;
          top: 0;
          background: rgba(15,15,15,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 100;
          border-bottom: 1px solid var(--color-border);
        }

        .location-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
        }

        .location-icon {
          font-size: 20px;
        }

        .location-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .location-label {
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .location-value {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .topbar-icon {
          width: 38px;
          height: 38px;
        }

        .notif-btn {
          position: relative;
        }

        .notif-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: var(--color-orange);
          border-radius: 50%;
          border: 2px solid var(--bg-primary);
          animation: pulse-orange 2s ease infinite;
        }

        .greeting-section {
          padding: 16px var(--content-padding) 8px;
        }

        .greeting-text {
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .greeting-sub {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .mood-section {
          margin-bottom: var(--space-5);
          padding-top: 4px;
        }

        .passport-widget {
          margin: 0 var(--content-padding) var(--space-5);
          background: linear-gradient(135deg, #1a0a00, #2d1000);
          border: 1px solid rgba(255,107,0,0.25);
          border-radius: var(--radius-xl);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .passport-widget:hover {
          border-color: rgba(255,107,0,0.5);
          transform: translateY(-1px);
        }

        .passport-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .passport-icon {
          font-size: 36px;
          animation: float 3s ease-in-out infinite;
        }

        .passport-info {
          flex: 1;
        }

        .passport-title {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .passport-subtitle {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .passport-pct {
          font-size: var(--text-2xl);
          font-weight: 900;
        }

        .home-section {
          margin-bottom: var(--space-4);
        }

        .chef-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          width: 200px;
          flex-shrink: 0;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .chef-card:hover {
          border-color: rgba(255,107,0,0.3);
          transform: translateY(-2px);
        }

        .chef-card-image-wrap {
          position: relative;
          height: 120px;
        }

        .chef-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chef-card-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .chef-name {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .chef-by {
          font-size: 11px;
          color: var(--color-orange);
          font-weight: 500;
        }

        .chef-story {
          font-size: 10px;
          color: var(--color-text-muted);
          font-style: italic;
          line-height: 1.4;
        }

        .chef-meta {
          display: flex;
          gap: 8px;
          font-size: 10px;
          color: var(--color-text-secondary);
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
