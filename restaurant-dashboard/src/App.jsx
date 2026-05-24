import React, { useState } from 'react';
import './App.css';

const MOCK_ORDERS = [
  { id: '#1023', status: 'New', items: '2x Butter Chicken, 1x Naan', time: '10 mins ago', value: '₹550' },
  { id: '#1024', status: 'Accepted', items: '1x Veg Burger', time: '5 mins ago', value: '₹150' },
  { id: '#1025', status: 'Preparing', items: '1x Paneer Tikka', time: '15 mins ago', value: '₹250' },
];

const COLUMNS = ['New', 'Accepted', 'Preparing', 'Ready for Pickup', 'Done'];

function App() {
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const moveOrder = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>CraveMate Restaurant Dashboard</h1>
      </header>

      <div className="kanban-board">
        {COLUMNS.map(column => (
          <div key={column} className="kanban-column">
            <h2>{column}</h2>
            <div className="column-content">
              {orders.filter(order => order.status === column).map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className="order-value">{order.value}</span>
                  </div>
                  <p className="order-items">{order.items}</p>
                  <p className="order-time">{order.time}</p>
                  <div className="order-actions">
                    {column === 'New' && (
                      <>
                        <button onClick={() => moveOrder(order.id, 'Accepted')} className="btn-accept">Accept</button>
                        <button className="btn-reject">Reject</button>
                      </>
                    )}
                    {column === 'Accepted' && <button onClick={() => moveOrder(order.id, 'Preparing')} className="btn-next">Start Preparing</button>}
                    {column === 'Preparing' && <button onClick={() => moveOrder(order.id, 'Ready for Pickup')} className="btn-next">Mark Ready</button>}
                    {column === 'Ready for Pickup' && <button onClick={() => moveOrder(order.id, 'Done')} className="btn-next">Mark Done</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
