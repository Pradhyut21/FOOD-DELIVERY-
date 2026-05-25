import { useState } from 'react';

export default function SettingsView() {
  const [liveCam, setLiveCam] = useState(true);
  const [rtmpKey] = useState('rtmp://stream.cravemate.in/live/biryani-bros-k8x9p2');
  const [loyaltyRate, setLoyaltyRate] = useState(10); // 1 coin per ₹10
  const [redemptionRate, setRedemptionRate] = useState(100); // 100 coins = free starter

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title" style={{ fontSize: 18 }}>Restaurant Settings</h2>
          <p className="page-subtitle">Configure your restaurant preferences</p>
        </div>
        <button className="btn btn-primary" id="save-settings-btn">Save Changes</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* RESTAURANT INFO */}
        <div className="card">
          <div className="card-header"><div className="card-title">🏪 Restaurant Information</div></div>
          <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Restaurant Name', value: 'Biryani Bros', id: 'rest-name' },
              { label: 'GSTIN', value: '29AABCU9603R1ZJ', id: 'rest-gstin' },
              { label: 'FSSAI Number', value: '12821004001025', id: 'rest-fssai' },
              { label: 'Contact Phone', value: '+91 98765 43210', id: 'rest-phone' },
            ].map(field => (
              <div key={field.id}>
                <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>{field.label}</label>
                <input className="input" defaultValue={field.value} id={field.id} />
              </div>
            ))}
          </div>
        </div>

        {/* OPENING HOURS */}
        <div className="card">
          <div className="card-header"><div className="card-title">🕐 Opening Hours</div></div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 90, fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', flexShrink: 0 }}>{day}</div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked={day !== 'Sunday'} id={`day-toggle-${day.toLowerCase()}`} />
                    <span className="toggle-slider" />
                  </label>
                  <input className="input" type="time" defaultValue="10:00" style={{ width: 110 }} id={`open-${day.toLowerCase()}`} />
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>to</span>
                  <input className="input" type="time" defaultValue="23:00" style={{ width: 110 }} id={`close-${day.toLowerCase()}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LIVE CAM */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">📷 Live Kitchen Cam</div>
            <label className="toggle">
              <input type="checkbox" checked={liveCam} onChange={e => setLiveCam(e.target.checked)} id="live-cam-toggle" />
              <span className="toggle-slider" />
            </label>
          </div>
          {liveCam && (
            <div className="card-body">
              <div>
                <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 8 }}>RTMP Stream Key</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="input" value={rtmpKey} readOnly id="rtmp-key" style={{ fontFamily: 'monospace', fontSize: 11 }} />
                  <button className="btn btn-secondary" onClick={() => navigator.clipboard?.writeText(rtmpKey)} id="copy-rtmp-key">Copy</button>
                </div>
                <p style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Use OBS or any RTMP-compatible software to stream your kitchen cam. Stream will appear as "LIVE CAM" button on your restaurant page.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* LOYALTY COINS */}
        <div className="card">
          <div className="card-header"><div className="card-title">🪙 Loyalty Coin Rules</div></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 8 }}>
                Earn Rate: 1 coin per every ₹{loyaltyRate} spent
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>₹5</span>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={loyaltyRate}
                  onChange={e => setLoyaltyRate(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--color-orange)' }}
                  id="loyalty-earn-rate"
                />
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>₹50</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--color-orange)', minWidth: 40, textAlign: 'right' }}>₹{loyaltyRate}</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 8 }}>
                Redemption: {redemptionRate} coins = Free Starter
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>50</span>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={50}
                  value={redemptionRate}
                  onChange={e => setRedemptionRate(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--color-orange)' }}
                  id="loyalty-redeem-rate"
                />
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>500</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--color-orange)', minWidth: 50, textAlign: 'right' }}>{redemptionRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* INSIDER MEMBERSHIP */}
        <div className="card">
          <div className="card-header"><div className="card-title">⭐ Restaurant Insider Membership</div></div>
          <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Monthly Fee (₹)</label>
              <input className="input" type="number" defaultValue="299" id="insider-fee" />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Subscriber Count</label>
              <input className="input" readOnly value="42 active subscribers" id="subscriber-count" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 11, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Member Perks (one per line)</label>
              <textarea
                className="input"
                rows={4}
                defaultValue={"10% off all orders\nFree delivery always\nPriority table booking\nMonthly chef's special box"}
                id="insider-perks"
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
