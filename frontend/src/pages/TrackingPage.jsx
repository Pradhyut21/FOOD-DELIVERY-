import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const statusSteps = [
  { id: 'confirmed', label: 'Order Confirmed', emoji: '✅', desc: 'Restaurant received your order' },
  { id: 'preparing', label: 'Being Prepared', emoji: '👨‍🍳', desc: 'Chef is cooking your food' },
  { id: 'picked_up', label: 'Picked Up', emoji: '🛵', desc: 'Ravi Kumar picked up your order' },
  { id: 'on_the_way', label: 'On the Way', emoji: '🚀', desc: '~8 minutes away' },
  { id: 'delivered', label: 'Delivered', emoji: '🎉', desc: 'Enjoy your meal!' }
];

export default function TrackingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [eta, setEta] = useState(22);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState([
    { from: 'partner', text: 'Hey! I\'ve picked up your order and heading your way 🚀', time: '12:31 PM' }
  ]);

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < statusSteps.length - 1) return prev + 1;
        clearInterval(statusTimer);
        return prev;
      });
    }, 5000);
    const etaTimer = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
    }, 60000);
    return () => { clearInterval(statusTimer); clearInterval(etaTimer); };
  }, []);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: chatMsg, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setChatMsg('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'partner', text: 'Got it! On my way 👍', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 2000);
  };

  return (
    <div className="tracking-page">
      {/* HEADER */}
      <div className="tracking-header">
        <button className="back-btn-white" onClick={() => navigate('/')} id="tracking-back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div>
          <h1 className="tracking-title">Live Tracking</h1>
          <div className="tracking-subtitle">Order #ORD003</div>
        </div>
        <button className="chat-toggle-btn" onClick={() => setChatOpen(!chatOpen)} id="chat-toggle-btn">
          💬
        </button>
      </div>

      {/* MAP AREA */}
      <div className="map-area">
        <div className="map-placeholder">
          <div className="map-bg">
            {/* Simulated map with animated delivery pin */}
            <div className="map-grid" />
            <div className="delivery-pin animate-pulse-orange" id="delivery-pin">
              🛵
            </div>
            <div className="destination-pin">
              🏠
            </div>
            <div className="dotted-route" />
          </div>
          <div className="map-overlay-info">
            <div className="eta-badge">
              <span className="eta-time">{eta}</span>
              <span className="eta-unit">min</span>
            </div>
          </div>
        </div>
      </div>

      {/* ETA BANNER */}
      <div className="eta-banner">
        <div className="eta-main">
          <div className="eta-icon">🚀</div>
          <div>
            <div className="eta-label">Estimated Arrival</div>
            <div className="eta-value">
              {eta > 0 ? `~${eta} minutes` : 'Arrived!'}
            </div>
          </div>
        </div>
        <div className="partner-info">
          <div className="partner-avatar">R</div>
          <div>
            <div className="partner-name">Ravi Kumar</div>
            <div className="partner-vehicle">🏍️ Bike · MH02 AB 1234</div>
          </div>
          <button className="chat-btn-sm" onClick={() => setChatOpen(true)} id="open-chat-btn">
            💬
          </button>
        </div>
      </div>

      {/* STATUS TIMELINE */}
      <div className="status-timeline">
        <div className="timeline-title">Order Status</div>
        {statusSteps.map((step, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={step.id} className={`timeline-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="timeline-line-wrap">
                <div className={`timeline-dot ${isCurrent ? 'animate-pulse-orange' : ''}`}>
                  {isDone ? '✓' : step.emoji}
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`timeline-line ${isDone ? 'filled' : ''}`} />
                )}
              </div>
              <div className="timeline-content">
                <div className={`timeline-label ${isCurrent ? 'text-orange' : ''}`}>{step.label}</div>
                {(isDone || isCurrent) && (
                  <div className="timeline-desc">{step.desc}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CHAT OVERLAY */}
      {chatOpen && (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setChatOpen(false)} />
          <div className="bottom-sheet" style={{ height: '60dvh' }}>
            <div className="bottom-sheet-handle" />
            <div className="chat-header">
              <div className="partner-avatar" style={{ width: 36, height: 36 }}>R</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>Ravi Kumar</div>
                <div style={{ fontSize: 11, color: 'var(--color-success)' }}>● Online</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-text-muted)' }}>
                Phone numbers hidden for privacy
              </div>
            </div>
            <div className="chat-messages" id="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.from === 'me' ? 'mine' : 'theirs'}`}>
                  <div className="bubble-text">{msg.text}</div>
                  <div className="bubble-time">{msg.time}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                className="input"
                placeholder="Type a message..."
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                id="chat-input"
              />
              <button className="btn btn-primary btn-sm" onClick={sendMessage} id="send-chat-btn">Send</button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .tracking-page {
          background: var(--bg-primary);
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        .tracking-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-btn-white {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-primary);
          cursor: pointer;
          flex-shrink: 0;
        }

        .tracking-title {
          font-size: var(--text-lg);
          font-weight: 700;
        }

        .tracking-subtitle {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .chat-toggle-btn {
          margin-left: auto;
          font-size: 22px;
          background: var(--bg-elevated);
          border: 1px solid var(--color-border);
          width: 42px;
          height: 42px;
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-area {
          flex-shrink: 0;
          height: 220px;
        }

        .map-placeholder {
          width: 100%;
          height: 100%;
          background: #0d1a12;
          position: relative;
          overflow: hidden;
        }

        .map-bg {
          position: absolute;
          inset: 0;
        }

        .map-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .delivery-pin {
          position: absolute;
          font-size: 32px;
          top: 50%;
          left: 30%;
          transform: translate(-50%, -50%);
          animation: delivery-move 8s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(255,107,0,0.5));
          z-index: 2;
        }

        @keyframes delivery-move {
          0%, 100% { left: 30%; top: 60%; }
          50% { left: 55%; top: 45%; }
        }

        .destination-pin {
          position: absolute;
          font-size: 28px;
          top: 35%;
          right: 20%;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
          z-index: 2;
          animation: float 2s ease-in-out infinite;
        }

        .dotted-route {
          position: absolute;
          top: 50%;
          left: 30%;
          width: 40%;
          height: 2px;
          background: repeating-linear-gradient(90deg, var(--color-orange) 0, var(--color-orange) 8px, transparent 8px, transparent 16px);
          transform: translateY(-50%) rotate(-15deg);
          opacity: 0.5;
        }

        .map-overlay-info {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 3;
        }

        .eta-badge {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          text-align: center;
          backdrop-filter: blur(8px);
        }

        .eta-time {
          font-size: var(--text-2xl);
          font-weight: 900;
          color: var(--color-orange);
          display: block;
        }

        .eta-unit {
          font-size: 10px;
          color: var(--color-text-muted);
        }

        .eta-banner {
          background: var(--bg-card);
          border-bottom: 1px solid var(--color-border);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .eta-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .eta-icon {
          font-size: 32px;
          animation: float 2s ease-in-out infinite;
        }

        .eta-label {
          font-size: 11px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .eta-value {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .partner-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: var(--bg-elevated);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }

        .partner-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }

        .partner-name {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .partner-vehicle {
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .chat-btn-sm {
          margin-left: auto;
          font-size: 18px;
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .status-timeline {
          padding: 20px 16px;
          flex: 1;
        }

        .timeline-title {
          font-size: var(--text-base);
          font-weight: 700;
          margin-bottom: 16px;
        }

        .timeline-item {
          display: flex;
          gap: 12px;
          opacity: 0.4;
          transition: opacity var(--transition-base);
        }

        .timeline-item.done,
        .timeline-item.current {
          opacity: 1;
        }

        .timeline-line-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .timeline-dot {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--bg-elevated);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          transition: all var(--transition-base);
        }

        .timeline-item.done .timeline-dot {
          background: var(--color-success-subtle);
          border-color: var(--color-success);
          color: var(--color-success);
          font-size: 14px;
          font-weight: 800;
        }

        .timeline-item.current .timeline-dot {
          background: var(--color-orange-subtle);
          border-color: var(--color-orange);
        }

        .timeline-line {
          width: 2px;
          flex: 1;
          min-height: 24px;
          background: var(--color-border);
          transition: background var(--transition-slow);
          margin: 4px 0;
        }

        .timeline-line.filled {
          background: var(--color-success);
        }

        .timeline-content {
          flex: 1;
          padding-bottom: 20px;
        }

        .timeline-label {
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .timeline-desc {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 3px;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .chat-messages {
          flex: 1;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          max-height: calc(60dvh - 180px);
        }

        .chat-bubble {
          max-width: 75%;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .chat-bubble.mine {
          align-self: flex-end;
          align-items: flex-end;
        }

        .chat-bubble.theirs {
          align-self: flex-start;
          align-items: flex-start;
        }

        .bubble-text {
          padding: 10px 14px;
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          line-height: 1.4;
        }

        .mine .bubble-text {
          background: var(--color-orange);
          color: white;
          border-radius: var(--radius-lg) var(--radius-lg) 4px var(--radius-lg);
        }

        .theirs .bubble-text {
          background: var(--bg-elevated);
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px;
        }

        .bubble-time {
          font-size: 9px;
          color: var(--color-text-muted);
        }

        .chat-input-row {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--color-border);
        }
      `}</style>
    </div>
  );
}
