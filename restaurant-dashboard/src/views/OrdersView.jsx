import { useState } from 'react';

const mockOrders = [
  {
    id: 'ORD-1001', customer: 'Arjun M.', items: ['Hyderabadi Dum Biryani ×2', 'Rose Lassi ×2'],
    total: 896, prepTime: '20 min', status: 'new', note: 'Less spicy please', time: '12:24 PM'
  },
  {
    id: 'ORD-1002', customer: 'Priya S.', items: ['Mutton Seekh Kebab ×1', 'Veg Biryani ×1'],
    total: 548, prepTime: '25 min', status: 'new', note: '', time: '12:26 PM'
  },
  {
    id: 'ORD-1003', customer: 'Rahul K.', items: ['Hara Bhara Kabab ×2', 'Lassi ×1'],
    total: 497, prepTime: '15 min', status: 'accepted', note: '', time: '12:18 PM'
  },
  {
    id: 'ORD-1004', customer: 'Sneha V.', items: ['Biryani ×1'],
    total: 349, prepTime: '18 min', status: 'preparing', note: 'Extra raita', time: '12:10 PM'
  },
  {
    id: 'ORD-1005', customer: 'Kiran P.', items: ['Double Ka Meetha ×2', 'Biryani ×1'],
    total: 607, prepTime: '12 min', status: 'ready', note: '', time: '12:05 PM'
  },
];

const columns = [
  { id: 'new', label: 'New Orders', color: '#3B82F6', bgColor: 'rgba(59,130,246,0.1)' },
  { id: 'accepted', label: 'Accepted', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.1)' },
  { id: 'preparing', label: 'Preparing', color: '#FF6B00', bgColor: 'rgba(255,107,0,0.1)' },
  { id: 'ready', label: 'Ready for Pickup', color: '#22C55E', bgColor: 'rgba(34,197,94,0.1)' },
  { id: 'done', label: 'Delivered', color: '#606060', bgColor: 'rgba(96,96,96,0.1)' },
];

export default function OrdersView() {
  const [orders, setOrders] = useState(mockOrders);
  const [prepTime, setPrepTime] = useState(20);

  const moveOrder = (orderId, toStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: toStatus } : o));
  };

  const getColumnOrders = (colId) => orders.filter(o => o.status === colId);

  return (
    <div>
      {/* STATS ROW */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'Active Orders', value: orders.filter(o => o.status !== 'done').length, icon: '📋', change: '+2 in last hr', dir: 'up' },
          { label: "Today's Revenue", value: '₹18,420', icon: '💰', change: '+12% vs yesterday', dir: 'up' },
          { label: 'Avg Prep Time', value: `${prepTime} min`, icon: '⏱️', change: '-3 min vs avg', dir: 'up' },
          { label: 'Rating Today', value: '4.8 ⭐', icon: '🌟', change: '+0.1 vs last week', dir: 'up' },
        ].map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.dir}`}>
              {stat.dir === 'up' ? '↑' : '↓'} {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* PREP TIME SETTER */}
      <div className="card mb-4">
        <div className="card-header">
          <div className="card-title">⚙️ Avg Prep Time</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-orange)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-primary)' }}
              onClick={() => setPrepTime(t => Math.max(5, t - 5))}
              id="decrease-prep-time"
            >−</button>
            <span style={{ fontWeight: 800, fontSize: 18 }}>{prepTime} min</span>
            <button
              style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-orange)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-primary)' }}
              onClick={() => setPrepTime(t => Math.min(90, t + 5))}
              id="increase-prep-time"
            >+</button>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Updates ETA for customers</span>
          </div>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="kanban-board">
        {columns.map(col => {
          const colOrders = getColumnOrders(col.id);
          return (
            <div key={col.id} className="kanban-col">
              <div className="kanban-col-header">
                <span className="kanban-col-title" style={{ color: col.color }}>{col.label}</span>
                <span className="kanban-count" style={{ background: col.bgColor, color: col.color }}>
                  {colOrders.length}
                </span>
              </div>
              <div className="kanban-col-body">
                {colOrders.length === 0 ? (
                  <div style={{ padding: '20px 10px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 12 }}>
                    No orders
                  </div>
                ) : (
                  colOrders.map(order => (
                    <div key={order.id} className="order-kanban-card" id={`kanban-order-${order.id}`}>
                      <div className="kanban-order-id">{order.id}</div>
                      <div className="kanban-customer">{order.customer}</div>
                      <div className="kanban-items">
                        {order.items.map(item => <div key={item}>{item}</div>)}
                      </div>
                      {order.note && (
                        <div style={{ marginTop: 6, padding: '4px 8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, fontSize: 10, color: 'var(--color-warning)' }}>
                          📝 {order.note}
                        </div>
                      )}
                      <div className="kanban-footer">
                        <span className="kanban-amount">₹{order.total}</span>
                        <span className="kanban-time">{order.time}</span>
                      </div>
                      {col.id === 'new' && (
                        <div className="kanban-actions">
                          <button className="btn-accept" onClick={() => moveOrder(order.id, 'accepted')} id={`accept-${order.id}`}>✓ Accept</button>
                          <button className="btn-reject" onClick={() => moveOrder(order.id, 'done')} id={`reject-${order.id}`}>✕ Reject</button>
                        </div>
                      )}
                      {col.id === 'accepted' && (
                        <button className="btn-accept w-full" style={{ marginTop: 6 }} onClick={() => moveOrder(order.id, 'preparing')} id={`start-prep-${order.id}`}>
                          Start Preparing
                        </button>
                      )}
                      {col.id === 'preparing' && (
                        <button className="btn-accept w-full" style={{ marginTop: 6 }} onClick={() => moveOrder(order.id, 'ready')} id={`mark-ready-${order.id}`}>
                          Mark Ready
                        </button>
                      )}
                      {col.id === 'ready' && (
                        <button className="btn-accept w-full" style={{ marginTop: 6, background: 'var(--color-success-subtle)', color: 'var(--color-success)' }} onClick={() => moveOrder(order.id, 'done')} id={`mark-delivered-${order.id}`}>
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
