import { useNavigate } from 'react-router-dom';
import { mockOrders } from '../data/mockData';

const statusConfig = {
  delivered: { label: 'Delivered', color: 'var(--color-success)', bg: 'var(--color-success-subtle)' },
  on_the_way: { label: 'On the Way', color: 'var(--color-orange)', bg: 'var(--color-orange-subtle)' },
  preparing: { label: 'Preparing', color: 'var(--color-warning)', bg: 'var(--color-warning-subtle)' },
  confirmed: { label: 'Confirmed', color: 'var(--color-info)', bg: 'rgba(59,130,246,0.1)' },
};

export default function OrdersPage() {
  const navigate = useNavigate();

  return (
    <div className="page orders-page">
      <div className="orders-header">
        <h1 className="page-title">My Orders</h1>
        <p className="page-subtitle">{mockOrders.length} orders placed</p>
      </div>

      {mockOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-emoji">🥺</div>
          <div className="empty-state-title">No orders yet</div>
          <div className="empty-state-desc">Your order history will appear here. Let's get you something delicious!</div>
          <button className="btn btn-primary" onClick={() => navigate('/')} id="start-ordering-btn">
            Start Ordering
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {mockOrders.map(order => {
            const status = statusConfig[order.status] || statusConfig.confirmed;
            const isActive = order.status !== 'delivered';
            return (
              <div
                key={order.id}
                className="order-card"
                onClick={() => isActive ? navigate('/track/ORD003') : null}
                id={`order-${order.id}`}
              >
                {/* ACTIVE ORDER GLOW */}
                {isActive && (
                  <div className="active-order-banner">
                    <span className="active-dot" />
                    Live Order — Tap to track
                  </div>
                )}

                <div className="order-card-body">
                  <div className="order-header">
                    <div className="order-rest-info">
                      <img src={order.restaurantImage} alt={order.restaurantName} className="order-rest-image" />
                      <div>
                        <div className="order-rest-name">{order.restaurantName}</div>
                        <div className="order-id">{order.id} · {order.date}</div>
                      </div>
                    </div>
                    <div
                      className="status-badge"
                      style={{ color: status.color, background: status.bg, border: `1px solid ${status.color}33` }}
                    >
                      {status.label}
                    </div>
                  </div>

                  <div className="order-items-list">
                    {order.items.map((item, i) => (
                      <div key={i} className="order-item-row">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">× {item.qty}</span>
                        <span className="order-item-price">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">Total: ₹{order.total}</div>
                    <div className="order-actions">
                      {order.status === 'delivered' ? (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={e => { e.stopPropagation(); }}
                          id={`reorder-${order.id}`}
                        >
                          🔄 Reorder
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate('/track/ORD003')}
                          id={`track-${order.id}`}
                        >
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>

                  {order.rating && (
                    <div className="order-rating">
                      <span>Your rating: </span>
                      {'⭐'.repeat(order.rating)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .orders-page {
          background: var(--bg-primary);
        }

        .orders-header {
          padding: 20px var(--content-padding) 8px;
          border-bottom: 1px solid var(--color-border);
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 12px;
        }

        .order-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .order-card:hover {
          border-color: rgba(255,107,0,0.3);
          transform: translateY(-1px);
        }

        .active-order-banner {
          background: linear-gradient(90deg, rgba(255,107,0,0.15), rgba(255,107,0,0.05));
          border-bottom: 1px solid rgba(255,107,0,0.2);
          padding: 8px 16px;
          font-size: 11px;
          font-weight: 700;
          color: var(--color-orange);
          display: flex;
          align-items: center;
          gap: 6px;
          animation: pulse-orange 2s ease infinite;
        }

        .active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-orange);
          flex-shrink: 0;
          animation: pulse 1s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .order-card-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .order-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .order-rest-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .order-rest-image {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          object-fit: cover;
          flex-shrink: 0;
        }

        .order-rest-name {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .order-id {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .order-items-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 10px;
          background: var(--bg-elevated);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-divider);
        }

        .order-item-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: var(--text-sm);
        }

        .order-item-name {
          flex: 1;
          color: var(--color-text-primary);
        }

        .order-item-qty {
          color: var(--color-text-muted);
          font-size: 11px;
        }

        .order-item-price {
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .order-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .order-total {
          font-size: var(--text-base);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .order-actions {
          display: flex;
          gap: 8px;
        }

        .order-rating {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
