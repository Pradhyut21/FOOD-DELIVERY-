import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodPassportData } from '../data/mockData';

export default function PassportPage() {
  const navigate = useNavigate();
  const [expandedCuisine, setExpandedCuisine] = useState(null);
  const pct = Math.round((foodPassportData.cuisinesTried.length / foodPassportData.totalCuisines) * 100);

  return (
    <div className="page passport-page">
      <div className="passport-header">
        <button className="back-btn-plain" onClick={() => navigate(-1)} id="passport-back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div>
          <h1 className="passport-page-title">Food Passport 🌍</h1>
          <p className="passport-page-sub">Explore the world through food</p>
        </div>
      </div>

      {/* PROGRESS HERO */}
      <div className="passport-progress-card">
        <div className="pp-top">
          <div className="pp-globe">🌐</div>
          <div className="pp-stats">
            <div className="pp-number">{foodPassportData.cuisinesTried.length}</div>
            <div className="pp-label">of {foodPassportData.totalCuisines} cuisines</div>
            <div className="pp-sublabel">Keep exploring!</div>
          </div>
        </div>
        <div className="progress-bar" style={{ marginTop: 16 }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="pp-footer">
          <span className="pp-pct">{pct}% explored</span>
          <span className="pp-hint">🎁 5 more for a voucher!</span>
        </div>
      </div>

      {/* CUISINE GRID */}
      <div className="cuisine-grid">
        {foodPassportData.cuisines.map(cuisine => (
          <div
            key={cuisine.name}
            className={`cuisine-tile ${cuisine.tried ? 'stamped' : 'unstamped'}`}
            onClick={() => setExpandedCuisine(expandedCuisine === cuisine.name ? null : cuisine.name)}
            id={`cuisine-${cuisine.name.toLowerCase()}`}
          >
            <div className="cuisine-tile-emoji">{cuisine.emoji}</div>
            <div className="cuisine-tile-name">{cuisine.name}</div>
            {cuisine.tried && (
              <div className="stamp-overlay" style={{ animation: 'stamp-drop 0.5s ease' }}>
                <span className="stamp-icon">✅</span>
              </div>
            )}
            {cuisine.tried && (
              <div className="cuisine-orders">{cuisine.orders} orders</div>
            )}
          </div>
        ))}
      </div>

      {/* REWARDS SECTION */}
      <div className="rewards-section">
        <div className="section-header">
          <div className="section-title">🎁 Rewards Earned</div>
        </div>
        <div className="reward-card">
          <div className="reward-icon">🏆</div>
          <div className="reward-info">
            <div className="reward-name">Indian Cuisine Master</div>
            <div className="reward-desc">Completed all 3 Indian cuisine variants</div>
            <div className="badge badge-orange">₹150 voucher · Valid till Jun 30</div>
          </div>
        </div>
      </div>

      <style>{`
        .passport-page {
          background: var(--bg-primary);
        }

        .passport-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px var(--content-padding);
          border-bottom: 1px solid var(--color-border);
        }

        .back-btn-plain {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-primary);
          cursor: pointer;
          flex-shrink: 0;
        }

        .passport-page-title {
          font-size: var(--text-xl);
          font-weight: 800;
        }

        .passport-page-sub {
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .passport-progress-card {
          margin: 16px;
          background: linear-gradient(135deg, #1a0a00, #2d1200, #1a0a00);
          border: 1px solid rgba(255,107,0,0.25);
          border-radius: var(--radius-xl);
          padding: 20px;
        }

        .pp-top {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pp-globe {
          font-size: 64px;
          animation: float 4s ease-in-out infinite;
          line-height: 1;
        }

        .pp-number {
          font-size: 56px;
          font-weight: 900;
          color: var(--color-orange);
          line-height: 1;
        }

        .pp-label {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .pp-sublabel {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .pp-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }

        .pp-pct {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-orange);
        }

        .pp-hint {
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .cuisine-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 0 16px 16px;
        }

        .cuisine-tile {
          position: relative;
          aspect-ratio: 1;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all var(--transition-base);
          overflow: hidden;
          border: 1.5px solid var(--color-border);
          background: var(--bg-card);
        }

        .cuisine-tile:active {
          transform: scale(0.95);
        }

        .cuisine-tile.stamped {
          border-color: rgba(34,197,94,0.3);
          background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03));
        }

        .cuisine-tile.unstamped {
          opacity: 0.5;
        }

        .cuisine-tile-emoji {
          font-size: 32px;
        }

        .cuisine-tile-name {
          font-size: 10px;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-align: center;
        }

        .stamp-overlay {
          position: absolute;
          top: 6px;
          right: 6px;
        }

        .stamp-icon {
          font-size: 14px;
        }

        .cuisine-orders {
          font-size: 9px;
          color: var(--color-success);
          font-weight: 600;
        }

        .rewards-section {
          padding: 0 16px 20px;
        }

        .reward-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reward-icon {
          font-size: 36px;
          animation: float 3s ease-in-out infinite;
        }

        .reward-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .reward-name {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .reward-desc {
          font-size: 11px;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
