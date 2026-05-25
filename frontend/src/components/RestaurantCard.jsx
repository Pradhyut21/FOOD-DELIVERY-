import { useNavigate } from 'react-router-dom';

const crowdColors = {
  'Quiet': 'crowd-quiet',
  'Moderate': 'crowd-moderate',
  'Packed': 'crowd-packed'
};

const crowdEmoji = {
  'Quiet': '🟢',
  'Moderate': '🟡',
  'Packed': '🔴'
};

export default function RestaurantCard({ restaurant, variant = 'delivery', style }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  if (variant === 'dine-out') {
    return (
      <div className="restaurant-card dine-card" onClick={handleClick} style={style} id={`dine-card-${restaurant.id}`}>
        <div className="restaurant-card-image-wrap">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="restaurant-card-image"
            loading="lazy"
          />
          <div className="img-overlay" />
          <div className="card-image-badges">
            <span className={`badge badge-dark crowd-badge ${crowdColors[restaurant.crowdMeter]}`}>
              {crowdEmoji[restaurant.crowdMeter]} {restaurant.crowdMeter}
            </span>
          </div>
          <div className="slots-badge">
            <span>{restaurant.availableSlots} slots left</span>
          </div>
        </div>
        <div className="restaurant-card-body">
          <div className="card-row-1">
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <div className="rating">
              ⭐ {restaurant.rating}
              <span className="rating-count">({restaurant.ratingCount})</span>
            </div>
          </div>
          <div className="cuisine-tags">
            {restaurant.cuisine.slice(0, 2).map(c => (
              <span key={c} className="cuisine-tag">{c}</span>
            ))}
          </div>
          <div className="card-footer">
            <span className="price-for-two">₹{restaurant.priceForTwo} for two</span>
            <span className="distance-tag">📍 {restaurant.distance}</span>
          </div>
          {restaurant.experiences?.length > 0 && (
            <div className="experience-tags">
              {restaurant.experiences.slice(0,1).map(exp => (
                <span key={exp} className="badge badge-orange" style={{ fontSize: '9px' }}>✨ {exp}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Delivery card
  return (
    <div className="restaurant-card" onClick={handleClick} style={style} id={`rest-card-${restaurant.id}`}>
      <div className="restaurant-card-image-wrap">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-card-image"
          loading="lazy"
        />
        <div className="img-overlay" />
        {restaurant.hasLiveCam && (
          <div className="live-badge">
            <span className="live-dot" />
            LIVE
          </div>
        )}
        {restaurant.offers?.length > 0 && (
          <div className="offer-strip">
            🏷️ {restaurant.offers[0]}
          </div>
        )}
      </div>
      <div className="restaurant-card-body">
        <div className="card-row-1">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="veg-indicator">
            <div className={`food-dot ${restaurant.isVeg ? 'veg' : 'nonveg'}`} />
          </div>
        </div>
        <div className="cuisine-tags">
          {restaurant.cuisine.slice(0, 2).map(c => (
            <span key={c} className="cuisine-tag">{c}</span>
          ))}
        </div>
        <div className="card-meta">
          <div className="rating">
            ⭐ {restaurant.rating}
            <span className="rating-count">({(restaurant.ratingCount / 1000).toFixed(1)}k)</span>
          </div>
          <span className="meta-dot">•</span>
          <span className="delivery-time">🕐 {restaurant.deliveryTime}</span>
          <span className="meta-dot">•</span>
          <span className="delivery-fee">
            {restaurant.deliveryFee === 0 ? '🆓 Free' : `₹${restaurant.deliveryFee} delivery`}
          </span>
        </div>
        {restaurant.tags?.length > 0 && (
          <div className="card-tags">
            {restaurant.tags.map(tag => (
              <span key={tag} className="badge badge-orange" style={{ fontSize: '9px' }}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .restaurant-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-base);
          width: 220px;
          flex-shrink: 0;
        }

        .restaurant-card:active {
          transform: scale(0.97);
        }

        .restaurant-card:hover {
          border-color: rgba(255,107,0,0.3);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .dine-card {
          width: 240px;
        }

        .restaurant-card-image-wrap {
          position: relative;
          height: 130px;
          overflow: hidden;
        }

        .restaurant-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .restaurant-card:hover .restaurant-card-image {
          transform: scale(1.05);
        }

        .card-image-badges {
          position: absolute;
          top: 8px;
          left: 8px;
        }

        .crowd-badge {
          font-size: 9px;
          font-weight: 700;
          padding: 4px 8px;
        }

        .slots-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          color: white;
          font-size: 9px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,255,255,0.15);
        }

        .live-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 4px 8px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 4px;
          animation: pulse-red 1.5s ease infinite;
        }

        .live-dot {
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          animation: pulse 1s ease infinite;
        }

        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50% { box-shadow: 0 0 0 4px rgba(239,68,68,0); }
        }

        .offer-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
          padding: 16px 10px 8px;
          font-size: 10px;
          color: #FFD700;
          font-weight: 600;
        }

        .restaurant-card-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-row-1 {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 4px;
        }

        .restaurant-name {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.2;
          flex: 1;
        }

        .cuisine-tags {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .cuisine-tag {
          font-size: 9px;
          color: var(--color-text-muted);
          background: var(--bg-elevated);
          padding: 2px 6px;
          border-radius: var(--radius-full);
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .card-meta .rating,
        .delivery-time,
        .delivery-fee {
          font-size: 10px;
          color: var(--color-text-secondary);
        }

        .meta-dot {
          color: var(--color-text-muted);
          font-size: 10px;
        }

        .card-tags {
          display: flex;
          gap: 4px;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .price-for-two {
          font-size: 11px;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        .distance-tag {
          font-size: 10px;
          color: var(--color-text-muted);
        }

        .experience-tags {
          display: flex;
          gap: 4px;
        }

        .crowd-quiet { color: var(--color-success) !important; }
        .crowd-moderate { color: var(--color-warning) !important; }
        .crowd-packed { color: var(--color-error) !important; }
      `}</style>
    </div>
  );
}
