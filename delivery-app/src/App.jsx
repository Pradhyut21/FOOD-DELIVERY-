import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Wallet, User, CheckCircle, Clock } from 'lucide-react';
import { riderData, todaysEarnings, activePing } from './data/mockData';

// --- COMPONENTS ---
function TopNav({ isOnline, setIsOnline }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="top-nav">
      <div className="top-nav-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-green)', cursor: 'pointer' }} onClick={() => navigate('/')}>
            CraveMate <span style={{ color: 'var(--color-text-primary)' }}>Rider</span>
          </div>
          <div className="nav-links" style={{ marginLeft: 32 }}>
            <button className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
              <MapPin size={18} /> Map
            </button>
            <button className={`nav-item ${location.pathname === '/earnings' ? 'active' : ''}`} onClick={() => navigate('/earnings')}>
              <Wallet size={18} /> Earnings
            </button>
            <button className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>
              <User size={18} /> Profile
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{riderData.name}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{riderData.vehicle} • ⭐ {riderData.rating}</div>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-elevated)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: isOnline ? 'var(--color-green)' : 'var(--color-border)',
              fontSize: 13,
              fontWeight: 700
            }}
          >
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: isOnline ? 'var(--color-green)' : 'var(--color-text-muted)',
              boxShadow: isOnline ? '0 0 10px var(--color-green)' : 'none'
            }} />
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </button>
        </div>
      </div>
    </nav>
  );
}

function PingModal({ onAccept, onReject }) {
  return (
    <div className="ping-modal-overlay">
      <div className="ping-card" style={{ maxWidth: 400 }}>
        <div className="flex justify-between items-center mb-4">
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-green)' }}>NEW DELIVERY</div>
          <div className="flex items-center gap-2" style={{ color: 'var(--color-orange)' }}>
            <Clock size={16} />
            <span style={{ fontWeight: 800 }}>0:29</span>
          </div>
        </div>
        
        <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>₹{activePing.estEarnings}</div>
        
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-2">
            <MapPin size={20} color="var(--color-text-secondary)" />
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>PICKUP</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{activePing.restaurantName}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{activePing.pickupLocation}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Navigation size={20} color="var(--color-text-secondary)" />
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>DROP-OFF</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{activePing.dropLocation}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Total distance: {activePing.distance}</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="btn btn-danger" onClick={onReject} style={{ flex: 1 }}>REJECT</button>
          <button className="btn btn-primary" onClick={onAccept} style={{ flex: 2 }}>ACCEPT</button>
        </div>
      </div>
    </div>
  );
}

// --- PAGES ---
function Dashboard({ isOnline }) {
  const navigate = useNavigate();
  const [showPing, setShowPing] = useState(false);

  useState(() => {
    let timer;
    if (isOnline) {
      timer = setTimeout(() => setShowPing(true), 3000);
    }
    return () => clearTimeout(timer);
  }, [isOnline]);

  return (
    <div className="page" style={{ padding: 24 }}>
      <div className="desktop-grid">
        {/* Left Column: Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Today's Summary</h2>
          <div className="flex gap-4">
            <div className="card" style={{ margin: 0, flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>EARNINGS</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-green)' }}>₹{todaysEarnings.total}</div>
            </div>
            <div className="card" style={{ margin: 0, flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>ORDERS</div>
              <div style={{ fontSize: 32, fontWeight: 800 }}>{todaysEarnings.deliveries}</div>
            </div>
          </div>
          
          <div className="card" style={{ margin: 0 }}>
            <div className="flex justify-between items-center mb-2">
              <div style={{ fontSize: 14, fontWeight: 600 }}>Daily Target</div>
              <div style={{ fontSize: 12, color: 'var(--color-orange)' }}>₹150 Extra</div>
            </div>
            <div style={{ height: 8, background: 'var(--bg-primary)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '80%', background: 'var(--color-green)' }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8 }}>
              12 of 15 deliveries completed
            </div>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="card" style={{ margin: 0, padding: 0, overflow: 'hidden', height: 400, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', flexDirection: 'column', gap: 8 }}>
            <MapPin size={48} opacity={0.5} />
            {isOnline ? 'Searching for nearby orders in high-demand zones...' : 'Go online to receive orders'}
          </div>
          {isOnline && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          )}
        </div>
      </div>

      {showPing && isOnline && (
        <PingModal 
          onReject={() => setShowPing(false)} 
          onAccept={() => {
            setShowPing(false);
            navigate('/delivery');
          }} 
        />
      )}
      
      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function ActiveDelivery() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('picking_up');

  return (
    <div className="page" style={{ padding: 24 }}>
      <div className="desktop-grid" style={{ height: 'calc(100vh - 120px)' }}>
        
        {/* Map View */}
        <div className="card" style={{ margin: 0, padding: 0, overflow: 'hidden', background: '#111', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
            [Live Navigation Map]
          </div>
        </div>

        {/* Info Panel */}
        <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {status === 'picking_up' && (
            <>
              <div style={{ fontSize: 14, color: 'var(--color-orange)', fontWeight: 700 }}>PICKUP FROM</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{activePing.restaurantName}</div>
                <div style={{ fontSize: 15, color: 'var(--color-text-secondary)' }}>{activePing.pickupLocation}</div>
              </div>
              <button className="btn btn-primary" onClick={() => setStatus('reaching_drop')} style={{ marginTop: 'auto' }}>
                CONFIRM PICKUP
              </button>
            </>
          )}

          {status === 'reaching_drop' && (
            <>
              <div style={{ fontSize: 14, color: 'var(--color-green)', fontWeight: 700 }}>DELIVER TO</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Aarti S.</div>
                <div style={{ fontSize: 15, color: 'var(--color-text-secondary)' }}>{activePing.dropLocation}</div>
              </div>
              <div className="flex gap-4" style={{ marginTop: 'auto' }}>
                <button className="btn btn-secondary" style={{ flex: 1 }}>Call Customer</button>
                <button className="btn btn-primary" onClick={() => setStatus('delivered')} style={{ flex: 2 }}>
                  MARK DELIVERED
                </button>
              </div>
            </>
          )}

          {status === 'delivered' && (
            <div style={{ textAlign: 'center', margin: 'auto' }}>
              <CheckCircle size={64} color="var(--color-green)" style={{ margin: '0 auto 24px' }} />
              <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Delivery Complete!</div>
              <div style={{ fontSize: 16, color: 'var(--color-text-muted)', marginBottom: 32 }}>You earned ₹{activePing.estEarnings}</div>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Earnings() {
  return (
    <div className="page" style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Earnings & Payouts</h1>
      
      <div className="desktop-grid">
        <div className="card" style={{ margin: 0, background: 'linear-gradient(135deg, #111, #1a1a1a)', borderColor: 'var(--color-green)' }}>
          <div style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 8 }}>THIS WEEK'S EARNINGS</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--color-green)' }}>₹4,250</div>
          <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 12 }}>Next automated payout on Monday to HDFC Bank ****1234</div>
        </div>

        <div className="card" style={{ margin: 0 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 16 }}>TODAY'S BREAKDOWN</h3>
          <div className="flex justify-between items-center" style={{ padding: '12px 0', borderBottom: '1px solid var(--color-divider)' }}>
            <span style={{ fontSize: 15 }}>Base Order Pay</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>₹600</span>
          </div>
          <div className="flex justify-between items-center" style={{ padding: '12px 0', borderBottom: '1px solid var(--color-divider)' }}>
            <span style={{ fontSize: 15 }}>Surge & Incentives</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-orange)' }}>+ ₹150</span>
          </div>
          <div className="flex justify-between items-center" style={{ padding: '12px 0' }}>
            <span style={{ fontSize: 15 }}>Customer Tips</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-green)' }}>+ ₹90</span>
          </div>
          <div className="flex justify-between items-center mt-4" style={{ paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Total Earned Today</span>
            <span style={{ fontSize: 20, fontWeight: 800 }}>₹840</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <TopNav isOnline={isOnline} setIsOnline={setIsOnline} />
        <Routes>
          <Route path="/" element={<Dashboard isOnline={isOnline} />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/profile" element={<div className="page" style={{padding: 24, textAlign: 'center'}}>Profile Settings Coming Soon</div>} />
          <Route path="/delivery" element={<ActiveDelivery />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
