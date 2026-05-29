import { useState } from 'react';

const mockMenu = [
  { id: 1, name: 'Hyderabadi Dum Biryani', category: 'Mains', price: 349, isVeg: false, available: true, rating: 4.9, orders: 142, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=80&h=80&fit=crop' },
  { id: 2, name: 'Mutton Seekh Kebab', category: 'Starters', price: 299, isVeg: false, available: true, rating: 4.7, orders: 89, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=80&h=80&fit=crop' },
  { id: 3, name: 'Veg Dum Biryani', category: 'Mains', price: 249, isVeg: true, available: true, rating: 4.5, orders: 76, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=80&h=80&fit=crop' },
  { id: 4, name: 'Hara Bhara Kabab', category: 'Starters', price: 199, isVeg: true, available: false, rating: 4.3, orders: 45, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=80&h=80&fit=crop' },
  { id: 5, name: 'Double Ka Meetha', category: 'Desserts', price: 129, isVeg: true, available: true, rating: 4.8, orders: 134, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=80&h=80&fit=crop' },
  { id: 6, name: 'Rose Lassi', category: 'Drinks', price: 99, isVeg: true, available: true, rating: 4.6, orders: 201, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=80&h=80&fit=crop' },
];

export default function MenuView() {
  const [menu, setMenu] = useState(mockMenu);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Mains', isVeg: true });
  const [showEditModal, setShowEditModal] = useState(false);
const [editItem, setEditItem] = useState(null);
  const categories = ['All', ...new Set(mockMenu.map(i => i.category))];
  const filtered = activeCategory === 'All' ? menu : menu.filter(i => i.category === activeCategory);

  const toggleAvailability = (id) => {
    setMenu(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;
    setMenu(prev => [...prev, {
      ...newItem,
      id: Date.now(),
      price: parseFloat(newItem.price),
      available: true,
      rating: 0,
      orders: 0,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop'
    }]);
    setNewItem({ name: '', price: '', category: 'Mains', isVeg: true });
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title" style={{ fontSize: 18 }}>Menu Management</h2>
          <p className="page-subtitle">{menu.length} items · {menu.filter(i => i.available).length} available</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)} id="add-menu-item-btn">
          + Add Dish
        </button>
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`section-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            id={`menu-cat-${cat.toLowerCase()}`}
            style={{ padding: '6px 16px', borderRadius: '9999px', background: activeCategory === cat ? 'var(--color-orange)' : 'var(--bg-elevated)', border: '1px solid var(--color-border)', color: activeCategory === cat ? 'white' : 'var(--color-text-muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-primary)', transition: 'all 0.2s ease' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU TABLE */}
      <div className="card">
        <div style={{ overflow: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Orders</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} id={`menu-item-${item.id}`}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{
                            width: 10, height: 10, borderRadius: item.isVeg ? '50%' : '0',
                            background: item.isVeg ? 'var(--color-success)' : 'var(--color-error)',
                            border: `1.5px solid ${item.isVeg ? 'var(--color-success)' : 'var(--color-error)'}`,
                            flexShrink: 0
                          }} />
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: 11 }}>{item.category}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--color-orange)' }}>₹{item.price}</td>
                  <td>
                    {item.rating > 0
                      ? <span style={{ color: 'var(--color-warning)', fontWeight: 700 }}>⭐ {item.rating}</span>
                      : <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                    }
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{item.orders}</td>
                  <td>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={item.available}
                        onChange={() => toggleAvailability(item.id)}
                        id={`toggle-item-${item.id}`}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
  className="btn btn-secondary btn-sm"
  id={`edit-item-${item.id}`}
  onClick={() => {
    setEditItem(item);
    setShowEditModal(true);
  }}
>
  Edit
</button>
                      <button
  className="btn btn-sm"
  style={{
    background: 'var(--color-error-subtle)',
    color: 'var(--color-error)',
    border: '1px solid rgba(239,68,68,0.2)'
  }}
  id={`delete-item-${item.id}`}
  onClick={() => {
    setMenu(prev => prev.filter(i => i.id !== item.id));
  }}
>
  Delete
</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD ITEM MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 28, width: 440, maxWidth: '90vw', animation: 'bounce-in 0.3s ease' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Add New Dish</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Dish Name</label>
                <input className="input" placeholder="e.g., Chicken Biryani" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} id="new-item-name" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Price (₹)</label>
                  <input className="input" type="number" placeholder="299" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: e.target.value }))} id="new-item-price" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Category</label>
                  <select className="input" value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))} id="new-item-category">
                    <option>Starters</option>
                    <option>Mains</option>
                    <option>Desserts</option>
                    <option>Drinks</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label className="toggle">
                  <input type="checkbox" checked={newItem.isVeg} onChange={e => setNewItem(p => ({ ...p, isVeg: e.target.checked }))} id="new-item-veg" />
                  <span className="toggle-slider" />
                </label>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Vegetarian</span>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAddModal(false)} id="cancel-add-item">Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAddItem} id="confirm-add-item">Add Dish</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && editItem && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <div
      style={{
        background: 'var(--bg-card)',
        padding: 28,
        borderRadius: 16,
        width: 440
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Edit Dish</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          className="input"
          value={editItem.name}
          onChange={(e) =>
            setEditItem(prev => ({
              ...prev,
              name: e.target.value
            }))
          }
        />

        <input
          className="input"
          type="number"
          value={editItem.price}
          onChange={(e) =>
            setEditItem(prev => ({
              ...prev,
              price: e.target.value
            }))
          }
        />

        <select
          className="input"
          value={editItem.category}
          onChange={(e) =>
            setEditItem(prev => ({
              ...prev,
              category: e.target.value
            }))
          }
        >
          <option>Starters</option>
          <option>Mains</option>
          <option>Desserts</option>
          <option>Drinks</option>
        </select>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary"
            style={{ flex: 1 }}
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={() => {
              setMenu(prev =>
                prev.map(i =>
                  i.id === editItem.id ? editItem : i
                )
              );

              setShowEditModal(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
