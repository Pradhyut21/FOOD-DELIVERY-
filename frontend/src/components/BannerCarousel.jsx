import { useState, useEffect } from 'react';
import { mockBanners } from '../data/mockData';

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % mockBanners.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const banner = mockBanners[current];

  return (
    <div className="banner-section">
      <div
        className="banner-card"
        style={{ background: banner.gradient }}
        key={banner.id}
      >
        <div className="banner-content">
          <span className="banner-badge" style={{ color: banner.accentColor || 'var(--color-orange)' }}>
            {banner.badge}
          </span>
          <div className="banner-title">{banner.title}</div>
          <div className="banner-subtitle">{banner.subtitle}</div>
          <button className="btn btn-sm banner-cta">
            Grab Now →
          </button>
        </div>
        <div className="banner-emoji">{banner.emoji}</div>
      </div>

      <div className="banner-dots">
        {mockBanners.map((_, i) => (
          <button
            key={i}
            className={`banner-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            id={`banner-dot-${i}`}
          />
        ))}
      </div>

      <style>{`
        .banner-section {
          padding: 0 var(--content-padding);
          margin-bottom: var(--space-6);
        }

        .banner-card {
          position: relative;
          border-radius: var(--radius-xl);
          padding: 24px 20px;
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          animation: fade-up 0.4s ease;
        }

        .banner-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.2);
          border-radius: var(--radius-xl);
        }

        .banner-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .banner-badge {
          font-size: var(--text-xs);
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: rgba(255,255,255,0.15);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          display: inline-block;
          width: fit-content;
          backdrop-filter: blur(8px);
        }

        .banner-title {
          font-size: var(--text-3xl);
          font-weight: 900;
          color: white;
          line-height: 1.1;
        }

        .banner-subtitle {
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.8);
          font-weight: 400;
        }

        .banner-cta {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(8px);
          margin-top: 4px;
          width: fit-content;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 700;
        }

        .banner-cta:hover {
          background: rgba(255,255,255,0.3);
        }

        .banner-emoji {
          font-size: 72px;
          position: relative;
          z-index: 1;
          line-height: 1;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
          animation: float 3s ease-in-out infinite;
        }

        .banner-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
        }

        .banner-dot {
          width: 6px;
          height: 6px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.2);
          transition: all var(--transition-base);
        }

        .banner-dot.active {
          width: 20px;
          background: var(--color-orange);
        }
      `}</style>
    </div>
  );
}
