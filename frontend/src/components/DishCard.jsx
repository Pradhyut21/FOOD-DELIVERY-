import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const allergenIcons = {
  gluten: '🌾',
  dairy: '🥛',
  nuts: '🥜',
  eggs: '🥚',
  shellfish: '🦐',
  soy: '🫘'
};

export default function DishCard({ item, restaurantId, restaurantName }) {
  const { addItem, removeItem, getItemQty } = useCart();
  const { user } = useAuth();
  const [addAnimating, setAddAnimating] = useState(false);

  const qty = getItemQty(item.id);

  const isIncompatible = item.allergens?.some(allergen => {
    const profile = user?.dietaryProfile || [];
    return (
      (profile.includes('vegan') && !item.dietaryTags?.includes('vegan')) ||
      (profile.includes('gluten-free') && allergen === 'gluten') ||
      (profile.includes('nut-allergy') && allergen === 'nuts') ||
      (profile.includes('dairy-free') && allergen === 'dairy')
    );
  });

  const handleAdd = () => {
    addItem(item, restaurantId, restaurantName);
    setAddAnimating(true);
    setTimeout(() => setAddAnimating(false), 400);
  };

  return (
    <div className={`dish-card ${isIncompatible ? 'incompatible' : ''}`} id={`dish-${item.id}`}>
      {isIncompatible && (
        <div className="incompatible-banner">⚠️ Contains items from your allergen list</div>
      )}

      <div className="dish-card-body">
        <div className="dish-info">
          <div className="dish-top">
            <div className={`food-dot ${item.isVeg ? 'veg' : 'nonveg'}`} />
            {item.isBestseller && <span className="badge badge-orange" style={{ fontSize: '9px' }}>🏆 Bestseller</span>}
            {item.isPopular && !item.isBestseller && <span className="badge badge-warning" style={{ fontSize: '9px', background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>🔥 Popular</span>}
          </div>
          <h4 className="dish-name">{item.name}</h4>
          <div className="dish-rating">
            ⭐ <span>{item.rating}</span>
            <span className="rating-count">({item.ratingCount})</span>
          </div>
          <p className="dish-desc">{item.description}</p>
          {item.allergens?.length > 0 && (
            <div className="allergen-tags">
              {item.allergens.map(a => (
                <span key={a} className="allergen-tag" title={a}>
                  {allergenIcons[a] || '⚠️'}
                </span>
              ))}
            </div>
          )}
          <div className="dish-price">₹{item.price}</div>
        </div>

        <div className="dish-right">
          <div className="dish-image-wrap">
            <img src={item.image} alt={item.name} className="dish-image" loading="lazy" />
          </div>
          <div className={`dish-qty-control ${addAnimating ? 'animating' : ''}`}>
            {qty === 0 ? (
              <button
                className="btn-add-dish"
                onClick={handleAdd}
                id={`add-dish-${item.id}`}
              >
                ADD
              </button>
            ) : (
              <div className="qty-stepper">
                <button
                  className="qty-btn qty-minus"
                  onClick={() => removeItem(item.id)}
                  id={`remove-dish-${item.id}`}
                >−</button>
                <span className="qty-count">{qty}</span>
                <button
                  className="qty-btn qty-plus"
                  onClick={handleAdd}
                  id={`add-more-dish-${item.id}`}
                >+</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dish-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .dish-card.incompatible {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.03);
        }

        .incompatible-banner {
          background: var(--color-error-subtle);
          color: var(--color-error);
          font-size: 10px;
          font-weight: 600;
          padding: 6px 12px;
          border-bottom: 1px solid rgba(239,68,68,0.2);
        }

        .dish-card-body {
          display: flex;
          gap: var(--space-3);
          padding: 14px;
          align-items: flex-start;
        }

        .dish-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dish-top {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dish-name {
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.3;
        }

        .dish-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 600;
          color: var(--color-warning);
        }

        .dish-desc {
          font-size: 11px;
          color: var(--color-text-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .allergen-tags {
          display: flex;
          gap: 4px;
        }

        .allergen-tag {
          font-size: 14px;
          opacity: 0.7;
        }

        .dish-price {
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .dish-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .dish-image-wrap {
          width: 90px;
          height: 90px;
          border-radius: var(--radius-md);
          overflow: hidden;
          flex-shrink: 0;
        }

        .dish-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dish-qty-control.animating .btn-add-dish,
        .dish-qty-control.animating .qty-stepper {
          animation: bounce-in 0.35s var(--transition-spring);
        }

        .btn-add-dish {
          background: var(--bg-primary);
          border: 1.5px solid var(--color-orange);
          color: var(--color-orange);
          font-size: var(--text-sm);
          font-weight: 700;
          font-family: var(--font-primary);
          padding: 6px 20px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-base);
          letter-spacing: 0.5px;
        }

        .btn-add-dish:hover {
          background: var(--color-orange-subtle);
        }

        .btn-add-dish:active {
          transform: scale(0.95);
        }

        .qty-stepper {
          display: flex;
          align-items: center;
          background: var(--color-orange);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: background var(--transition-fast);
          background: transparent;
          border: none;
          font-family: var(--font-primary);
        }

        .qty-btn:hover {
          background: rgba(0,0,0,0.15);
        }

        .qty-count {
          font-size: var(--text-sm);
          font-weight: 700;
          color: white;
          min-width: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
