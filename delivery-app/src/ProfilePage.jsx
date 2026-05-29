import { riderData } from './data/mockData';

export default function ProfilePage() {
  return (
    <div className="page" style={{ padding: 24 }}>
      <div
        className="card"
        style={{
          maxWidth: 500,
          margin: '0 auto',
          textAlign: 'center',
          padding: 32
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'var(--color-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            fontWeight: 800,
            margin: '0 auto 20px'
          }}
        >
          {riderData.name.charAt(0)}
        </div>

        {/* Rider Info */}
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          {riderData.name}
        </h1>

        <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
          Delivery Partner
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            textAlign: 'left'
          }}
        >
          <div>📞 Phone: {riderData.phone}</div>

          <div>⭐ Rating: {riderData.rating}</div>

          <div>🚴 Vehicle: {riderData.vehicle}</div>

          <div>📦 Total Deliveries: {riderData.deliveries}</div>

          <div>💰 Weekly Earnings: ₹4,250</div>
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: 28, width: '100%' }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}