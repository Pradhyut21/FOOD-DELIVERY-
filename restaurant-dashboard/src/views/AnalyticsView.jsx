import { useState } from 'react';

const revenueData = [
  { day: 'Mon', value: 12400 },
  { day: 'Tue', value: 18200 },
  { day: 'Wed', value: 15800 },
  { day: 'Thu', value: 22100 },
  { day: 'Fri', value: 28400 },
  { day: 'Sat', value: 35200 },
  { day: 'Sun', value: 30100 },
];

const maxRevenue = Math.max(...revenueData.map(d => d.value));

const topDishes = [
  { name: 'Hyderabadi Dum Biryani', orders: 142, revenue: 49558, rating: 4.9 },
  { name: 'Mutton Seekh Kebab', orders: 89, revenue: 26611, rating: 4.7 },
  { name: 'Rose Lassi', orders: 201, revenue: 19899, rating: 4.6 },
  { name: 'Veg Dum Biryani', orders: 76, revenue: 18924, rating: 4.5 },
  { name: 'Double Ka Meetha', orders: 134, revenue: 17286, rating: 4.8 },
];

const hourlyData = [
  2, 1, 0, 0, 0, 1, 3, 8, 12, 15, 18, 22,
  25, 20, 16, 12, 18, 28, 35, 30, 22, 15, 8, 4
];

const maxHourly = Math.max(...hourlyData);

export default function AnalyticsView() {
  const [period, setPeriod] = useState('week');

  const gmv = revenueData.reduce((s, d) => s + d.value, 0);

  return (
    <div>
      {/* PERIOD SELECTOR */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="page-title" style={{ fontSize: 18 }}>Performance Overview</h2>
          <p className="page-subtitle">Real-time analytics for Biryani Bros</p>
        </div>
        <div className="section-tabs">
          {['week', 'month', 'quarter'].map(p => (
            <button
              key={p}
              className={`section-tab ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
              id={`period-${p}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TOP METRICS */}
      <div className="stats-grid mb-6">
        {[
          { label: 'Total GMV', value: `₹${(gmv / 1000).toFixed(1)}k`, icon: '💰', change: '+23% vs last week', dir: 'up' },
          { label: 'Total Orders', value: '847', icon: '📦', change: '+18% vs last week', dir: 'up' },
          { label: 'Avg Order Value', value: '₹612', icon: '🧾', change: '+5% vs last week', dir: 'up' },
          { label: 'Repeat Customers', value: '64%', icon: '💗', change: '+8% vs last week', dir: 'up' },
        ].map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.dir}`}>↑ {stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-6">
        {/* REVENUE CHART */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">📈 Revenue — This Week</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--color-orange)' }}>
              ₹{(gmv / 1000).toFixed(1)}k
            </div>
          </div>
          <div className="card-body">
            <div className="chart-area" style={{ height: 180 }}>
              {revenueData.map((d, i) => (
                <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
                  <div
                    className="chart-bar"
                    title={`₹${d.value.toLocaleString('en-IN')}`}
                    style={{
                      height: `${(d.value / maxRevenue) * 100}%`,
                      width: '100%',
                      background: i === revenueData.length - 2
                        ? 'linear-gradient(to top, var(--color-orange), rgba(255,107,0,0.8))'
                        : 'linear-gradient(to top, rgba(255,107,0,0.6), rgba(255,107,0,0.2))',
                    }}
                  >
                    <div className="chart-bar-label">{d.day}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DELIVERY VS DINE-OUT */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">🍽️ Revenue Split</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Delivery Orders', pct: 68, amount: '₹108k', color: 'var(--color-orange)' },
                { label: 'Dine-Out', pct: 24, amount: '₹38k', color: 'var(--color-info)' },
                { label: 'Subscriptions', pct: 8, amount: '₹13k', color: 'var(--color-success)' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.pct}% · {item.amount}</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--bg-elevated)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '9999px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* CUSTOMER REPEAT RATE */}
            <div style={{ marginTop: 24, padding: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Customer Repeat Rate</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--color-success)' }}>64%</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>↑ 8% from last month</div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP DISHES */}
      <div className="card mb-6">
        <div className="card-header">
          <div className="card-title">🏆 Top Performing Dishes</div>
          <button className="btn btn-secondary btn-sm" id="export-dishes">Export CSV</button>
        </div>
        <div style={{ overflow: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dish Name</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Avg Rating</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {topDishes.map((dish, i) => (
                <tr key={dish.name} id={`dish-row-${i}`}>
                  <td style={{ color: 'var(--color-text-muted)', fontWeight: 700 }}>#{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{dish.name}</td>
                  <td>{dish.orders}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-orange)' }}>₹{dish.revenue.toLocaleString('en-IN')}</td>
                  <td>
                    <span style={{ color: 'var(--color-warning)', fontWeight: 700 }}>⭐ {dish.rating}</span>
                  </td>
                  <td>
                    <div style={{ width: 80, height: 6, background: 'var(--bg-elevated)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(dish.orders / 201) * 100}%`, background: 'var(--color-orange)', borderRadius: '9999px' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PEAK HOURS HEATMAP */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">🔥 Peak Order Hours</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 11, color: 'var(--color-text-muted)' }}>
            <span>Low</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0.1, 0.3, 0.5, 0.7, 1].map(op => (
                <div key={op} style={{ width: 16, height: 16, borderRadius: 3, background: `rgba(255,107,0,${op})` }} />
              ))}
            </div>
            <span>High</span>
          </div>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            {hourlyData.map((val, i) => {
              const intensity = val / maxHourly;
              return (
                <div
                  key={i}
                  title={`${i}:00 — ${val} orders`}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 4,
                    background: `rgba(255, 107, 0, ${Math.max(0.05, intensity)})`,
                    border: '1px solid rgba(255,107,0,0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: 2,
                    transition: 'all 0.2s ease'
                  }}
                  id={`peak-hour-${i}`}
                >
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{i}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>12 AM</span>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>6 AM</span>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>12 PM</span>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>6 PM</span>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>12 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
