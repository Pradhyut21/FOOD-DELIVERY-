import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRestaurants, mockDineOutRestaurants } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';

const allRestaurants = [
  ...mockRestaurants,
  ...mockDineOutRestaurants.map(r => ({
    ...r,
    deliveryTime: '30-45 min',
    deliveryFee: 39,
    minOrder: 300,
    tags: [],
    hasLiveCam: false,
    offers: []
  }))
];

const cuisineFilters = ['All', 'Indian', 'Italian', 'Thai', 'Japanese', 'South Indian', 'Healthy', 'American'];
const sortOptions = ['Relevance', 'Rating', 'Delivery Time', 'Cost: Low to High'];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [activeSort, setActiveSort] = useState('Relevance');
  const [isVegOnly, setIsVegOnly] = useState(false);

  const filtered = allRestaurants
    .filter(r => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()));
      const matchCuisine = activeCuisine === 'All' || r.cuisine.some(c => c.toLowerCase().includes(activeCuisine.toLowerCase())) || r.cuisineType === activeCuisine;
      const matchVeg = !isVegOnly || r.isVeg;
      return matchSearch && matchCuisine && matchVeg;
    })
    .sort((a, b) => {
      if (activeSort === 'Rating') return b.rating - a.rating;
      if (activeSort === 'Delivery Time') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (activeSort === 'Cost: Low to High') return (a.minOrder || 0) - (b.minOrder || 0);
      return 0;
    });

  return (
    <div className="page explore-page">
      {/* SEARCH BAR */}
      <div className="explore-search-wrap">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search restaurants, cuisines..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="explore-search-input"
            autoFocus
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')} id="clear-search">✕</button>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div className="explore-filters">
        <div className="scroll-x" style={{ paddingLeft: 16, marginBottom: 8 }}>
          {cuisineFilters.map(c => (
            <button
              key={c}
              className={`chip ${activeCuisine === c ? 'active' : ''}`}
              onClick={() => setActiveCuisine(c)}
              id={`cuisine-filter-${c.toLowerCase()}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <div className="scroll-x" style={{ paddingLeft: 16, gap: 8 }}>
            {sortOptions.map(s => (
              <button
                key={s}
                className={`sort-chip ${activeSort === s ? 'active' : ''}`}
                onClick={() => setActiveSort(s)}
                id={`sort-${s.toLowerCase().replace(/[: ]/g, '-')}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="veg-toggle-wrap">
            <span className="veg-label">🥦 Veg</span>
            <label className="toggle" style={{ width: 36, height: 20 }}>
              <input type="checkbox" checked={isVegOnly} onChange={e => setIsVegOnly(e.target.checked)} id="veg-filter-toggle" />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="explore-results-info">
        <span className="results-count">{filtered.length} places found</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-emoji">🔍</div>
          <div className="empty-state-title">Nothing found</div>
          <div className="empty-state-desc">Try a different search or cuisine filter</div>
        </div>
      ) : (
        <div className="explore-grid desktop-grid">
          {filtered.map(r => (
            <div key={`${r.id}-${r.name}`} className="explore-card-wrap">
              <div
                className="explore-list-card"
                onClick={() => navigate(`/restaurant/${r.id}`)}
                id={`explore-${r.id}`}
              >
                <div className="explore-card-img">
                  <img src={r.image} alt={r.name} loading="lazy" />
                  <div className="img-overlay" />
                  {r.hasLiveCam && (
                    <div className="live-badge-sm">🔴 LIVE</div>
                  )}
                  {r.offers?.length > 0 && (
                    <div className="offer-tag">🏷️ {r.offers[0]}</div>
                  )}
                </div>
                <div className="explore-card-body">
                  <div className="explore-card-header">
                    <div>
                      <h3 className="explore-card-name">{r.name}</h3>
                      <div className="explore-cuisine">{r.cuisine.slice(0, 3).join(' · ')}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <div className={`food-dot ${r.isVeg ? 'veg' : 'nonveg'}`} />
                      <div className="rating">⭐ {r.rating}</div>
                    </div>
                  </div>
                  <div className="explore-meta">
                    <span>🕐 {r.deliveryTime || '35-45 min'}</span>
                    <span>•</span>
                    <span>{(r.deliveryFee || 0) === 0 ? '🆓 Free delivery' : `₹${r.deliveryFee} delivery`}</span>
                    <span>•</span>
                    <span>📍 {r.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .explore-page {
          background: var(--bg-primary);
        }

        .explore-search-wrap {
          padding: 14px 16px;
          background: rgba(15,15,15,0.95);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--color-border);
          backdrop-filter: blur(20px);
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-elevated);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-full);
          padding: 10px 16px;
          transition: border-color var(--transition-base);
        }

        .search-bar:focus-within {
          border-color: var(--color-orange);
          box-shadow: 0 0 0 3px var(--color-orange-glow);
        }

        .search-icon {
          font-size: 16px;
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--color-text-primary);
          font-size: var(--text-base);
          font-family: var(--font-primary);
        }

        .search-input::placeholder {
          color: var(--color-text-muted);
        }

        .search-clear {
          font-size: 14px;
          color: var(--color-text-muted);
          cursor: pointer;
          background: none;
          border: none;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--bg-card);
        }

        .explore-filters {
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .sort-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          border: 1px solid var(--color-border);
          font-size: 11px;
          font-weight: 500;
          color: var(--color-text-muted);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          font-family: var(--font-primary);
          transition: all var(--transition-base);
        }

        .sort-chip.active {
          background: var(--color-orange-subtle);
          border-color: var(--color-orange);
          color: var(--color-orange);
        }

        .veg-toggle-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-right: 16px;
          flex-shrink: 0;
        }

        .veg-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-muted);
          white-space: nowrap;
        }

        .explore-results-info {
          padding: 10px 16px;
        }

        .results-count {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .explore-grid {
          padding: 0 12px 16px;
        }

        .explore-list-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-base);
          display: flex;
          gap: 0;
        }

        .explore-list-card:hover {
          border-color: rgba(255,107,0,0.3);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .explore-card-img {
          width: 110px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .explore-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .explore-list-card:hover .explore-card-img img {
          transform: scale(1.05);
        }

        .live-badge-sm {
          position: absolute;
          top: 6px;
          left: 6px;
          font-size: 9px;
          font-weight: 800;
          color: white;
          background: rgba(239,68,68,0.9);
          padding: 2px 6px;
          border-radius: var(--radius-full);
        }

        .offer-tag {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.8);
          color: #FFD700;
          font-size: 9px;
          font-weight: 600;
          padding: 4px 6px;
        }

        .explore-card-body {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          justify-content: center;
        }

        .explore-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .explore-card-name {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.2;
        }

        .explore-cuisine {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .explore-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--color-text-muted);
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
