import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, deliveryFee, clearCart, restaurantName } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [selectedAddress, setSelectedAddress] = useState(user?.savedAddresses?.[0]?.id);
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [ecoPackaging, setEcoPackaging] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [placing, setPlacing] = useState(false);

  const deliveryDistance = 2.5; // km
  const carbonBase = parseFloat((deliveryDistance * 0.21).toFixed(2));
  const carbonTotal = ecoPackaging ? parseFloat((carbonBase * 0.6).toFixed(2)) : carbonBase;
  const ecoFee = ecoPackaging ? 5 : 0;
  const gst = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + ecoFee + gst - discount;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'CRAVE10') {
      const disc = Math.round(totalPrice * 0.10);
      setDiscount(disc);
      setPromoApplied(true);
      addToast(`Promo applied! ₹${disc} saved 🎉`, 'success');
    } else {
      addToast('Invalid promo code', 'error');
    }
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1800));
    addToast('Order placed! 🎉 Delivery partner assigned', 'success', 4000);
    clearCart();
    navigate('/track/ORD003');
  };

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-emoji">🥺</div>
          <div className="empty-state-title">Your cart is empty</div>
          <div className="empty-state-desc">Looks like you haven't added anything yet. Let's fix that!</div>
          <button className="btn btn-primary" onClick={() => navigate('/')} id="browse-restaurants-btn">
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page">
      {/* HEADER */}
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)} id="checkout-back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="checkout-title">Checkout</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="checkout-sections">
        {/* DELIVERY ADDRESS */}
        <div className="checkout-card">
          <div className="checkout-card-title">📍 Delivery Address</div>
          <div className="addresses">
            {user?.savedAddresses?.map(addr => (
              <button
                key={addr.id}
                className={`address-option ${selectedAddress === addr.id ? 'selected' : ''}`}
                onClick={() => setSelectedAddress(addr.id)}
                id={`address-${addr.id}`}
              >
                <div className="address-radio">
                  <div className={`radio-dot ${selectedAddress === addr.id ? 'active' : ''}`} />
                </div>
                <div>
                  <div className="address-label">{addr.label}</div>
                  <div className="address-text">{addr.address}</div>
                </div>
              </button>
            ))}
            <button className="add-address-btn" id="add-new-address-btn">
              + Add New Address
            </button>
          </div>
        </div>

        {/* DELIVERY TIME */}
        <div className="checkout-card">
          <div className="checkout-card-title">🕐 Delivery Time</div>
          <div className="delivery-time-opts">
            <button
              className={`time-opt ${!scheduleDelivery ? 'selected' : ''}`}
              onClick={() => setScheduleDelivery(false)}
              id="deliver-now-btn"
            >
              <span>⚡</span>
              <span>Deliver Now</span>
              <span className="time-est">~30 min</span>
            </button>
            <button
              className={`time-opt ${scheduleDelivery ? 'selected' : ''}`}
              onClick={() => setScheduleDelivery(true)}
              id="schedule-delivery-btn"
            >
              <span>📅</span>
              <span>Schedule</span>
            </button>
          </div>
          {scheduleDelivery && (
            <input type="datetime-local" className="input" style={{ marginTop: 12 }} id="schedule-datetime" />
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="checkout-card">
          <div className="checkout-card-title">🛒 Order Summary — {restaurantName}</div>
          <div className="order-items">
            {items.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-left">
                  <div className={`food-dot ${item.isVeg ? 'veg' : 'nonveg'}`} />
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-qty">× {item.qty}</span>
                </div>
                <span className="order-item-price">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROMO CODE */}
        <div className="checkout-card">
          <div className="checkout-card-title">🏷️ Promo Code</div>
          <div className="promo-row">
            <input
              className="input"
              placeholder="Enter code (try CRAVE10)"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value.toUpperCase())}
              disabled={promoApplied}
              id="promo-input"
            />
            <button
              className={`btn ${promoApplied ? 'btn-secondary' : 'btn-ghost'}`}
              onClick={promoApplied ? () => { setPromoApplied(false); setDiscount(0); setPromoCode(''); } : handlePromo}
              id="apply-promo-btn"
              style={{ flexShrink: 0 }}
            >
              {promoApplied ? 'Remove' : 'Apply'}
            </button>
          </div>
          {promoApplied && (
            <div className="promo-success">✅ CRAVE10 applied — ₹{discount} saved!</div>
          )}
        </div>

        {/* ECO PACKAGING */}
        <div className="checkout-card eco-card">
          <div className="eco-header">
            <div>
              <div className="checkout-card-title">🌱 Carbon Footprint</div>
              <div className="carbon-estimate">~{carbonTotal} kg CO₂ for this order</div>
            </div>
            <div className="eco-badge-wrap">
              <div className="eco-badge">🌿</div>
            </div>
          </div>
          <div className="eco-toggle-row">
            <div>
              <div className="eco-option-title">Switch to Eco Packaging</div>
              <div className="eco-option-sub">+₹5 · Earn 10 Green Coins 🪙 · Reduces CO₂ by 40%</div>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={ecoPackaging}
                onChange={e => setEcoPackaging(e.target.checked)}
                id="eco-packaging-toggle"
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="checkout-card">
          <div className="checkout-card-title">💳 Payment Method</div>
          <div className="payment-options">
            {[
              { id: 'upi', label: 'UPI / GPay', icon: '📱' },
              { id: 'card', label: 'Debit / Credit Card', icon: '💳' },
              { id: 'wallet', label: 'Wallet', icon: '👛' },
              { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
            ].map(p => (
              <button
                key={p.id}
                className={`payment-opt ${paymentMethod === p.id ? 'selected' : ''}`}
                onClick={() => setPaymentMethod(p.id)}
                id={`payment-${p.id}`}
              >
                <span className="pay-icon">{p.icon}</span>
                <span className="pay-label">{p.label}</span>
                <div className={`radio-dot ${paymentMethod === p.id ? 'active' : ''}`} style={{ marginLeft: 'auto' }} />
              </button>
            ))}
          </div>
        </div>

        {/* BILL DETAILS */}
        <div className="checkout-card bill-card">
          <div className="checkout-card-title">🧾 Bill Details</div>
          <div className="bill-rows">
            <div className="bill-row"><span>Item Total</span><span>₹{totalPrice}</span></div>
            <div className="bill-row"><span>Delivery Fee</span><span>{deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}</span></div>
            {ecoPackaging && <div className="bill-row"><span>Eco Packaging</span><span>₹{ecoFee}</span></div>}
            <div className="bill-row"><span>GST (5%)</span><span>₹{gst}</span></div>
            {discount > 0 && (
              <div className="bill-row text-success"><span>Promo Discount</span><span>− ₹{discount}</span></div>
            )}
            <div className="bill-divider" />
            <div className="bill-row bill-total">
              <span>Total</span>
              <span className="text-orange">₹{finalTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PLACE ORDER */}
      <div className="place-order-footer">
        <button
          className={`btn btn-primary btn-lg w-full ${placing ? 'placing' : ''}`}
          onClick={handlePlaceOrder}
          disabled={placing}
          id="place-order-btn"
        >
          {placing ? (
            <>
              <div className="animate-spin" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
              Placing Order...
            </>
          ) : (
            `Place Order · ₹${finalTotal}`
          )}
        </button>
      </div>

      <style>{`
        .checkout-page {
          background: var(--bg-secondary);
        }

        .checkout-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .checkout-title {
          font-size: var(--text-lg);
          font-weight: 700;
        }

        .back-btn {
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
        }

        .checkout-sections {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px 12px;
        }

        .checkout-card {
          background: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 16px;
        }

        .checkout-card-title {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 12px;
        }

        .addresses {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .address-option {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--color-border);
          background: var(--bg-elevated);
          cursor: pointer;
          transition: all var(--transition-base);
          text-align: left;
          font-family: var(--font-primary);
          color: var(--color-text-primary);
          width: 100%;
        }

        .address-option.selected {
          border-color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .address-radio {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          transition: border-color var(--transition-base);
        }

        .address-option.selected .address-radio {
          border-color: var(--color-orange);
        }

        .radio-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          position: relative;
          flex-shrink: 0;
          transition: all var(--transition-base);
        }

        .radio-dot.active {
          border-color: var(--color-orange);
          background: var(--color-orange);
        }

        .address-label {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-orange);
        }

        .address-text {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 2px;
          line-height: 1.4;
        }

        .add-address-btn {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-orange);
          padding: 10px;
          border: 1.5px dashed rgba(255,107,0,0.3);
          border-radius: var(--radius-md);
          background: transparent;
          cursor: pointer;
          font-family: var(--font-primary);
          transition: all var(--transition-base);
        }

        .add-address-btn:hover {
          background: var(--color-orange-subtle);
        }

        .delivery-time-opts {
          display: flex;
          gap: 10px;
        }

        .time-opt {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--color-border);
          background: var(--bg-elevated);
          cursor: pointer;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-secondary);
          font-family: var(--font-primary);
          transition: all var(--transition-base);
        }

        .time-opt.selected {
          border-color: var(--color-orange);
          background: var(--color-orange-subtle);
          color: var(--color-orange);
        }

        .time-est {
          font-size: 10px;
          font-weight: 400;
          color: var(--color-success);
        }

        .order-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .order-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .order-item-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .order-item-name {
          font-size: var(--text-sm);
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .order-item-qty {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .order-item-price {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .promo-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .promo-success {
          margin-top: 8px;
          font-size: var(--text-xs);
          color: var(--color-success);
          font-weight: 600;
          background: var(--color-success-subtle);
          padding: 8px 12px;
          border-radius: var(--radius-md);
        }

        .eco-card {
          background: linear-gradient(135deg, #0a1a0a, #0d200d);
          border-color: rgba(34,197,94,0.2);
        }

        .eco-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .carbon-estimate {
          font-size: 11px;
          color: var(--color-success);
          margin-top: 4px;
        }

        .eco-badge {
          font-size: 32px;
          animation: float 3s ease-in-out infinite;
        }

        .eco-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .eco-option-title {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .eco-option-sub {
          font-size: 10px;
          color: var(--color-success);
          margin-top: 2px;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .payment-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--color-border);
          background: var(--bg-elevated);
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: var(--font-primary);
          width: 100%;
          text-align: left;
        }

        .payment-opt.selected {
          border-color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .pay-icon {
          font-size: 20px;
        }

        .pay-label {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-primary);
          flex: 1;
        }

        .bill-card {
          background: var(--bg-primary);
          border-color: var(--color-divider);
        }

        .bill-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .bill-divider {
          height: 1px;
          background: var(--color-divider);
          margin: 4px 0;
        }

        .bill-total {
          font-size: var(--text-md);
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .place-order-footer {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: var(--max-width);
          padding: 12px 16px;
          background: rgba(15,15,15,0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid var(--color-border);
          z-index: 200;
        }
      `}</style>
    </div>
  );
}
