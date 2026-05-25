import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDineOutRestaurants, mockFlashTables } from '../data/mockData';

const tabs = ['Reserve Table', 'Walk-In Queue', 'Experiences', 'Flash Tables'];

function useCountdown(targetDate) {
  const [now, setNow] = useState(Date.now());
  const diff = Math.max(0, targetDate - now);
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function FlashTableCard({ table }) {
  const countdown = useCountdown(table.endsAt);
  const [bid, setBid] = useState('');
  const [bidPlaced, setBidPlaced] = useState(false);

  const handleBid = () => {
    const amount = parseInt(bid);
    if (!amount || amount <= table.currentBid) {
      alert(`Bid must be higher than ₹${table.currentBid}`);
      return;
    }
    setBidPlaced(true);
  };

  return (
    <div className="flash-card" id={`flash-table-${table.id}`}>
      <div className="flash-card-img">
        <img src={table.restaurantImage} alt={table.restaurantName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="img-overlay" />
        <div className="flash-timer-badge">
          ⏱️ {countdown}
        </div>
      </div>
      <div className="flash-card-body">
        <div className="flash-restaurant">{table.restaurantName}</div>
        <div className="flash-table-info">{table.tableInfo}</div>
        <div className="flash-bid-info">
          <div>
            <div className="flash-bid-label">Current Highest Bid</div>
            <div className="flash-bid-amount">₹{table.currentBid}</div>
          </div>
          <div>
            <div className="flash-bid-label">Min Bid</div>
            <div className="flash-bid-amount" style={{ color: 'var(--color-text-muted)' }}>₹{table.minBid}</div>
          </div>
          <div>
            <div className="flash-bid-label">Bids</div>
            <div className="flash-bid-amount" style={{ color: 'var(--color-info)' }}>{table.bids}</div>
          </div>
        </div>
        {bidPlaced ? (
          <div className="bid-success">🎉 Bid placed! You're in the lead!</div>
        ) : (
          <div className="bid-row">
            <input
              className="input bid-input"
              type="number"
              placeholder={`Enter bid > ₹${table.currentBid}`}
              value={bid}
              onChange={e => setBid(e.target.value)}
              id={`bid-input-${table.id}`}
            />
            <button className="btn btn-primary btn-sm" onClick={handleBid} id={`place-bid-${table.id}`}>
              Bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DineOutPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [queueJoined, setQueueJoined] = useState(false);

  const experiences = [
    {
      id: 1,
      name: "Chef's Table Experience",
      restaurant: "Skyline Bistro",
      price: 2499,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop",
      includes: ["5-course meal", "Chef interaction", "Kitchen tour", "Welcome cocktail"],
      slots: 3,
      emoji: "👨‍🍳"
    },
    {
      id: 2,
      name: "Date Night Bundle",
      restaurant: "Bamboo House",
      price: 3499,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=200&fit=crop",
      includes: ["Sushi platter", "Sake tasting", "Couples dessert", "Flower arrangement"],
      slots: 5,
      emoji: "🌹"
    },
    {
      id: 3,
      name: "Birthday Package",
      restaurant: "The Spice Garden",
      price: 1999,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop",
      includes: ["Custom birthday cake", "Decorated table", "Group photo", "15% off bill"],
      slots: 8,
      emoji: "🎂"
    }
  ];

  return (
    <div className="page dine-out-page">
      <div className="dine-header">
        <h1 className="page-title">Dine-Out</h1>
        <p className="page-subtitle">Reserve · Queue · Experience · Bid</p>
      </div>

      {/* TABS */}
      <div className="tabs-scroll">
        <div className="scroll-x" style={{ paddingLeft: 16 }}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`tab-chip ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
              id={`dine-tab-${i}`}
            >
              {i === 3 && <span style={{ animation: 'pulse 1s ease infinite', display: 'inline-block' }}>⚡</span>}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 0 && (
        <div className="tab-content">
          {/* SEARCH FILTERS */}
          <div className="reserve-filters">
            <select className="input filter-select" id="area-select">
              <option>All Areas</option>
              <option>Koramangala</option>
              <option>Indiranagar</option>
              <option>MG Road</option>
            </select>
            <input type="date" className="input filter-select" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} id="date-picker" />
            <div className="party-size-ctrl">
              <button onClick={() => setPartySize(Math.max(1, partySize - 1))} id="party-decrease">−</button>
              <span>{partySize} pax</span>
              <button onClick={() => setPartySize(Math.min(20, partySize + 1))} id="party-increase">+</button>
            </div>
          </div>

          {/* RESTAURANT LIST */}
          {mockDineOutRestaurants.map(r => (
            <div key={r.id} className="dine-list-card" id={`reserve-card-${r.id}`}>
              <img src={r.image} alt={r.name} className="dine-list-image" />
              <div className="dine-list-body">
                <div className="dine-list-header">
                  <div>
                    <h3 className="dine-list-name">{r.name}</h3>
                    <div className="dine-list-cuisine">{r.cuisine.join(' · ')}</div>
                  </div>
                  <div className="rating" style={{ fontSize: 'var(--text-sm)' }}>⭐ {r.rating}</div>
                </div>
                <div className="dine-list-meta">
                  <span className={`badge ${r.crowdMeter === 'Quiet' ? 'badge-green' : r.crowdMeter === 'Packed' ? 'badge-red' : 'badge-warning'}`}>
                    {r.crowdMeter === 'Quiet' ? '🟢' : r.crowdMeter === 'Packed' ? '🔴' : '🟡'} {r.crowdMeter}
                  </span>
                  <span className="badge badge-dark">{r.availableSlots} slots</span>
                  <span className="price-info">₹{r.priceForTwo} for two</span>
                </div>
                <div className="slot-times">
                  {['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'].map(time => (
                    <button key={time} className="slot-btn" id={`slot-${r.id}-${time.replace(/[: ]/g, '')}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 1 && (
        <div className="tab-content">
          <div className="queue-hero">
            <div className="queue-restaurant-select">
              <select className="input" id="queue-restaurant">
                <option>Select Restaurant</option>
                {mockDineOutRestaurants.map(r => (
                  <option key={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            {!queueJoined ? (
              <div className="queue-join-card">
                <div className="queue-emoji">🪑</div>
                <div className="queue-title">Join Walk-In Queue</div>
                <div className="queue-desc">Get notified when your table is ready. No need to wait at the door!</div>
                <button className="btn btn-primary" onClick={() => setQueueJoined(true)} id="join-queue-btn">
                  Join Queue
                </button>
              </div>
            ) : (
              <div className="queue-status-card">
                <div className="queue-number">
                  <span className="queue-num-big">3rd</span>
                  <span className="queue-num-label">in line</span>
                </div>
                <div className="queue-wait">
                  <div className="queue-wait-label">Estimated Wait</div>
                  <div className="queue-wait-time">~25 min</div>
                </div>
                <div className="progress-bar" style={{ width: '100%', marginTop: 12 }}>
                  <div className="progress-fill" style={{ width: '25%' }} />
                </div>
                <div className="toggle-wrapper" style={{ marginTop: 16 }}>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked id="notify-ready-toggle" />
                    <span className="toggle-slider" />
                  </label>
                  <span style={{ fontSize: 'var(--text-sm)' }}>Notify me when table is ready</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="tab-content">
          {experiences.map(exp => (
            <div key={exp.id} className="experience-card" id={`exp-card-${exp.id}`}>
              <div className="exp-image-wrap">
                <img src={exp.image} alt={exp.name} className="exp-image" />
                <div className="img-overlay" />
                <div className="exp-emoji-badge">{exp.emoji}</div>
              </div>
              <div className="exp-body">
                <div className="exp-name">{exp.name}</div>
                <div className="exp-restaurant">@ {exp.restaurant}</div>
                <div className="exp-includes">
                  {exp.includes.map(inc => (
                    <span key={inc} className="exp-include-tag">✓ {inc}</span>
                  ))}
                </div>
                <div className="exp-footer">
                  <div>
                    <div className="exp-price">₹{exp.price.toLocaleString('en-IN')}</div>
                    <div className="exp-slots">{exp.slots} slots left</div>
                  </div>
                  <button className="btn btn-primary btn-sm" id={`book-exp-${exp.id}`}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 3 && (
        <div className="tab-content">
          <div className="flash-intro">
            <div className="flash-intro-text">
              ⚡ <strong>Flash Tables</strong> — Bid on exclusive last-minute spots. Highest bid wins when timer hits zero!
            </div>
          </div>
          {mockFlashTables.map(table => (
            <FlashTableCard key={table.id} table={table} />
          ))}
        </div>
      )}

      <style>{`
        .dine-out-page {
          background: var(--bg-primary);
        }

        .dine-header {
          padding: 20px var(--content-padding) 8px;
        }

        .page-title {
          font-size: var(--text-3xl);
          font-weight: 900;
          color: var(--color-text-primary);
        }

        .page-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .tabs-scroll {
          margin-bottom: var(--space-4);
        }

        .tab-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-muted);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all var(--transition-base);
          font-family: var(--font-primary);
        }

        .tab-chip.active {
          background: var(--color-orange);
          border-color: var(--color-orange);
          color: white;
          box-shadow: var(--shadow-orange);
        }

        .tab-content {
          padding: 0 var(--content-padding);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .reserve-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-select {
          flex: 1;
          min-width: 120px;
          padding: 10px 12px;
          font-size: var(--text-sm);
        }

        .party-size-ctrl {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .party-size-ctrl button {
          font-size: 18px;
          color: var(--color-orange);
          background: none;
          border: none;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-primary);
        }

        .dine-list-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .dine-list-card:hover {
          border-color: rgba(255,107,0,0.3);
          transform: translateY(-1px);
        }

        .dine-list-image {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        .dine-list-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dine-list-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .dine-list-name {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .dine-list-cuisine {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .dine-list-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .price-info {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .slot-times {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .slot-btn {
          padding: 8px 14px;
          border-radius: var(--radius-full);
          border: 1.5px solid rgba(255,107,0,0.3);
          background: var(--color-orange-subtle);
          color: var(--color-orange);
          font-size: var(--text-xs);
          font-weight: 700;
          cursor: pointer;
          font-family: var(--font-primary);
          transition: all var(--transition-base);
        }

        .slot-btn:hover {
          background: var(--color-orange);
          color: white;
        }

        .queue-hero {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .queue-join-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .queue-emoji {
          font-size: 56px;
          animation: float 3s ease-in-out infinite;
        }

        .queue-title {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .queue-desc {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          max-width: 260px;
          line-height: 1.6;
        }

        .queue-status-card {
          background: linear-gradient(135deg, #1a0a00, #2d1a00);
          border: 1px solid rgba(255,107,0,0.25);
          border-radius: var(--radius-xl);
          padding: 24px;
        }

        .queue-number {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }

        .queue-num-big {
          font-size: 56px;
          font-weight: 900;
          color: var(--color-orange);
          line-height: 1;
        }

        .queue-num-label {
          font-size: var(--text-lg);
          color: var(--color-text-muted);
        }

        .queue-wait-label {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .queue-wait-time {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .experience-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .experience-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .exp-image-wrap {
          position: relative;
          height: 160px;
        }

        .exp-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .exp-emoji-badge {
          position: absolute;
          bottom: 12px;
          right: 16px;
          font-size: 40px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
          animation: float 3s ease-in-out infinite;
        }

        .exp-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .exp-name {
          font-size: var(--text-lg);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .exp-restaurant {
          font-size: var(--text-sm);
          color: var(--color-orange);
          font-weight: 500;
        }

        .exp-includes {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .exp-include-tag {
          font-size: 10px;
          color: var(--color-success);
          background: var(--color-success-subtle);
          padding: 3px 8px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(34,197,94,0.2);
        }

        .exp-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }

        .exp-price {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .exp-slots {
          font-size: 11px;
          color: var(--color-error);
          font-weight: 600;
        }

        .flash-intro {
          background: linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,107,0,0.05));
          border: 1px solid rgba(255,107,0,0.2);
          border-radius: var(--radius-md);
          padding: 12px 14px;
        }

        .flash-intro-text {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .flash-card {
          background: var(--bg-card);
          border: 1px solid rgba(255,107,0,0.2);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .flash-card-img {
          position: relative;
          height: 140px;
        }

        .flash-timer-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          color: var(--color-orange);
          font-size: 13px;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,107,0,0.3);
          font-family: monospace;
          letter-spacing: 1px;
          animation: pulse-orange 1s ease infinite;
        }

        .flash-card-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .flash-restaurant {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-orange);
        }

        .flash-table-info {
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .flash-bid-info {
          display: flex;
          gap: 20px;
        }

        .flash-bid-label {
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .flash-bid-amount {
          font-size: var(--text-lg);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .bid-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .bid-input {
          flex: 1;
          padding: 10px 12px;
          font-size: var(--text-sm);
        }

        .bid-success {
          background: var(--color-success-subtle);
          color: var(--color-success);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: var(--text-sm);
          font-weight: 600;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
