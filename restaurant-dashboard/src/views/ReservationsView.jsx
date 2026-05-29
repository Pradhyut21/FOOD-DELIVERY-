import { useState } from 'react';

const mockReservations = [
  { id: 'RES-001', customer: 'Vikram Nair', date: '2026-05-25', time: '7:00 PM', party: 4, status: 'confirmed', package: null },
  { id: 'RES-002', customer: 'Meera Joshi', date: '2026-05-25', time: '7:30 PM', party: 2, status: 'confirmed', package: "Date Night Bundle" },
  { id: 'RES-003', customer: 'Aditya Rao', date: '2026-05-25', time: '8:00 PM', party: 6, status: 'pending', package: "Birthday Package" },
  { id: 'RES-004', customer: 'Ananya Singh', date: '2026-05-26', time: '7:00 PM', party: 3, status: 'confirmed', package: null },
];

const hours = Array.from({ length: 12 }, (_, i) => `${6 + i}:00 PM`).slice(0, 8);

export default function ReservationsView() {
  const [reservations, setReservations] = useState(mockReservations);
  const [activeDate, setActiveDate] = useState('2026-05-25');
  const [queueCount, setQueueCount] = useState(3);
  const [showFlashModal, setShowFlashModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [customer, setCustomer] = useState('');
const [date, setDate] = useState('');
const [time, setTime] = useState('');
const [party, setParty] = useState('');

  const dateReservations = reservations.filter(r => r.date === activeDate);

  const confirm = (id) => setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'confirmed' } : r));
  const cancel = (id) => setReservations(prev => prev.filter(r => r.id !== id));

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title" style={{ fontSize: 18 }}>Reservations & Tables</h2>
          <p className="page-subtitle">{dateReservations.length} reservations today</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" id="create-flash-table-btn" onClick={() => setShowFlashModal(true)}>
            ⚡ Create Flash Table
          </button>
          <button
          className="btn btn-primary"
          id="add-reservation-btn"
          onClick={() => setShowReservationModal(true)}> + Add Reservation</button>
        </div>
      </div>

      <div className="grid-2">
        {/* CALENDAR SIDEBAR */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">📅 Reservation Calendar</div>
          </div>
          <div className="card-body">
            {/* Date Selector */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {['2026-05-25', '2026-05-26', '2026-05-27'].map(date => (
                <button
                  key={date}
                  onClick={() => setActiveDate(date)}
                  id={`date-${date}`}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '9999px',
                    background: activeDate === date ? 'var(--color-orange)' : 'var(--bg-elevated)',
                    border: '1px solid ' + (activeDate === date ? 'var(--color-orange)' : 'var(--color-border)'),
                    color: activeDate === date ? 'white' : 'var(--color-text-muted)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </button>
              ))}
            </div>

            {/* TIMELINE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {hours.map(hour => {
                const res = dateReservations.find(r => r.time === hour);
                return (
                  <div key={hour} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', width: 60, flexShrink: 0 }}>{hour}</div>
                    {res ? (
                      <div style={{
                        flex: 1, padding: '8px 12px',
                        background: res.status === 'confirmed' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                        border: `1px solid ${res.status === 'confirmed' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)'}`,
                        borderRadius: 8, cursor: 'pointer'
                      }} id={`timeline-${res.id}`}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)' }}>{res.customer}</div>
                        <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>
                          {res.party} pax {res.package ? `· ${res.package}` : ''}
                        </div>
                      </div>
                    ) : (
                      <div style={{ flex: 1, height: 36, border: '1px dashed var(--color-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Available</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RESERVATIONS LIST + QUEUE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* WALK-IN QUEUE */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🪑 Walk-In Queue</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: 'var(--color-orange)' }}>{queueCount}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>waiting</span>
              </div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setQueueCount(q => Math.max(0, q - 1))} id="clear-queue-spot">
                  ✓ Table Ready (Next)
                </button>
                <button className="btn btn-secondary" onClick={() => setQueueCount(q => q + 1)} id="add-to-queue">
                  + Add Walk-In
                </button>
              </div>
              <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, fontSize: 12, color: 'var(--color-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated wait time</span>
                <span style={{ fontWeight: 700, color: 'var(--color-orange)' }}>~{queueCount * 8} min</span>
              </div>
            </div>
          </div>

          {/* RESERVATIONS LIST */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title">📋 Reservations</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {dateReservations.length === 0 ? (
                <div style={{ padding: 30, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
                  No reservations for this date
                </div>
              ) : (
                dateReservations.map(res => (
                  <div key={res.id} style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-divider)', display: 'flex', alignItems: 'center', gap: 12 }} id={`res-${res.id}`}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>{res.customer}</span>
                        <span className={`badge ${res.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                          {res.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 3 }}>
                        {res.time} · {res.party} pax{res.package ? ` · ${res.package}` : ''}
                      </div>
                    </div>
                    {res.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-accept" style={{ padding: '6px 12px', borderRadius: 8 }} onClick={() => confirm(res.id)} id={`confirm-res-${res.id}`}>✓</button>
                        <button className="btn-reject" style={{ padding: '6px 12px', borderRadius: 8 }} onClick={() => cancel(res.id)} id={`cancel-res-${res.id}`}>✕</button>
                      </div>
                    )}
                    {res.status === 'confirmed' && (
                      <button className="btn-reject" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11 }} onClick={() => cancel(res.id)} id={`cancel-confirmed-${res.id}`}>Cancel</button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FLASH TABLE MODAL */}
      {showFlashModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 28, width: 440, maxWidth: '90vw' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>⚡ Create Flash Table</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Table Description</label>
                <input className="input" placeholder="e.g., Rooftop Table for 2 — City View" id="flash-table-desc" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Minimum Bid (₹)</label>
                  <input className="input" type="number" placeholder="500" id="flash-min-bid" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Duration</label>
                  <select className="input" id="flash-duration">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowFlashModal(false)} id="cancel-flash">Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowFlashModal(false)} id="create-flash">⚡ Launch Auction</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showReservationModal && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}
  >
    <div
      style={{
        background: 'var(--bg-card)',
        padding: 24,
        borderRadius: 12,
        width: 400
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Add Reservation</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
  className="input"
  placeholder="Customer Name"
  value={customer}
  onChange={(e) => setCustomer(e.target.value)}
/>
        <input
  className="input"
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
        <input
  className="input"
  placeholder="Time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
/>
        <input
  className="input"
  type="number"
  placeholder="Party Size"
  value={party}
  onChange={(e) => setParty(e.target.value)}
/>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary"
            style={{ flex: 1 }}
            onClick={() => setShowReservationModal(false)}
          >
            Cancel
          </button>

          <button
  className="btn btn-primary"
  style={{ flex: 1 }}
  onClick={() => {
    const newReservation = {
      id: `RES-${Date.now()}`,
      customer,
      date,
      time,
      party: Number(party),
      status: 'confirmed',
      package: null
    };

    setReservations(prev => [...prev, newReservation]);

    setCustomer('');
    setDate('');
    setTime('');
    setParty('');

    setShowReservationModal(false);
  }}
>
  Add
</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
