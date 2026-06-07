import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { useCart } from '../contexts/CartContext';
import { useRewards } from '../contexts/RewardsContext';

type PayMethod = 'cash' | 'card';
type PickupTime = '15 min' | '30 min' | '45 min' | '1 hour';

export default function Checkout() {
  const navigate = useNavigate();
  const { subtotal, clearCart, items } = useCart();
  const { addPoints } = useRewards();
  const [payMethod, setPayMethod] = useState<PayMethod>('cash');
  const [pickupTime, setPickupTime] = useState<PickupTime>('30 min');
  const [cardName, setCardName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [placed, setPlaced] = useState(false);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const pickupOptions: PickupTime[] = ['15 min', '30 min', '45 min', '1 hour'];

  const handlePlaceOrder = () => {
    if (payMethod === 'card' && (!cardName || cardNum.length < 16 || !expiry || !cvv)) {
      alert('Please fill in all card details.');
      return;
    }
    addPoints(subtotal, `Purchase — $${subtotal.toFixed(2)}`);
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div style={styles.page}>
        <CoffeeBeanDecor count={8} />
        <div style={{ ...styles.content, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <div style={styles.successRing}>✓</div>
          <h2 style={styles.successTitle}>Order Placed!</h2>
          <p style={styles.successSub}>Estimated pickup: <span style={{ color: 'var(--yellow)' }}>{pickupTime}</span></p>
          <p style={styles.successNote}>
            {payMethod === 'cash' ? 'Pay with cash when you arrive at the store.' : 'Payment charged to your card.'}
          </p>
          <p style={styles.pointsNote}>🌟 Points earned for this purchase!</p>
          <button style={styles.doneBtn} onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={6} />
      <div style={styles.content}>
        <div style={styles.headerRow}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
          <h1 style={styles.title}>Checkout</h1>
          <span />
        </div>

        {/* Order summary */}
        <div style={styles.orderSummary}>
          <p style={styles.sectionLabel}>ORDER SUMMARY</p>
          {items.map((item) => (
            <div key={item.product.id} style={styles.summaryItem}>
              <span style={styles.summaryItemName}>{item.product.name} ×{item.quantity}</span>
              <span style={styles.summaryItemPrice}>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={styles.divider} />
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalValue}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pickup time */}
        <p style={styles.sectionLabel}>ESTIMATED PICKUP TIME</p>
        <div style={styles.pickupGrid}>
          {pickupOptions.map((t) => (
            <button
              key={t}
              style={{ ...styles.pickupBtn, ...(pickupTime === t ? styles.pickupBtnActive : {}) }}
              onClick={() => setPickupTime(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Payment method */}
        <p style={styles.sectionLabel}>PAYMENT METHOD</p>
        <div style={styles.payRow}>
          <button
            style={{ ...styles.payCard, ...(payMethod === 'cash' ? styles.payCardActive : {}) }}
            onClick={() => setPayMethod('cash')}
          >
            <span style={styles.payIcon}>💵</span>
            <span style={styles.payLabel}>Pay at Pickup</span>
            <span style={styles.payDesc}>Cash when you arrive</span>
          </button>
          <button
            style={{ ...styles.payCard, ...(payMethod === 'card' ? styles.payCardActive : {}) }}
            onClick={() => setPayMethod('card')}
          >
            <span style={styles.payIcon}>💳</span>
            <span style={styles.payLabel}>Pay Online</span>
            <span style={styles.payDesc}>Credit / Debit card</span>
          </button>
        </div>

        {/* Card form */}
        {payMethod === 'card' && (
          <div style={styles.cardForm}>
            <input
              style={styles.input} placeholder="Cardholder Name"
              value={cardName} onChange={(e) => setCardName(e.target.value)}
            />
            <input
              style={styles.input} placeholder="Card Number (16 digits)"
              maxLength={16} value={cardNum}
              onChange={(e) => setCardNum(e.target.value.replace(/\D/g, ''))}
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                style={{ ...styles.input, flex: 1 }} placeholder="MM/YY"
                maxLength={5} value={expiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                  setExpiry(v);
                }}
              />
              <input
                style={{ ...styles.input, flex: 1 }} placeholder="CVV"
                maxLength={4} value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
        )}

        <button style={styles.placeBtn} onClick={handlePlaceOrder}>
          Place Order · ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--black)', position: 'relative' },
  content: { maxWidth: 'var(--max-width)', margin: '0 auto', padding: '16px 16px 100px', position: 'relative', zIndex: 1 },
  headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  backBtn: {
    background: 'none', border: '1px solid rgba(255,215,0,0.2)', color: 'var(--yellow)',
    padding: '8px 14px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-heading)',
    fontSize: 11, cursor: 'pointer', letterSpacing: 1,
  },
  title: { fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--yellow)', margin: 0 },
  sectionLabel: { fontFamily: 'var(--font-heading)', fontSize: 10, color: 'var(--gold)', letterSpacing: 3, margin: '20px 0 10px', textTransform: 'uppercase' },
  orderSummary: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.1)',
    borderRadius: 'var(--radius-lg)', padding: '14px 16px', marginBottom: 4,
  },
  summaryItem: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  summaryItemName: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gray)' },
  summaryItemPrice: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--white)', fontWeight: 600 },
  divider: { height: 1, background: 'rgba(255,215,0,0.1)', margin: '10px 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between' },
  totalLabel: { fontFamily: 'var(--font-heading)', fontSize: 14, color: 'var(--yellow)', letterSpacing: 1 },
  totalValue: { fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--yellow)', textShadow: 'var(--glow-yellow)' },
  pickupGrid: { display: 'flex', gap: 10, marginBottom: 4, flexWrap: 'wrap' },
  pickupBtn: {
    flex: 1, minWidth: 70,
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.15)',
    color: 'var(--gray)', padding: '10px 0', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 11, cursor: 'pointer', letterSpacing: 1,
  },
  pickupBtnActive: {
    background: 'rgba(255,215,0,0.1)', border: '1px solid var(--yellow)',
    color: 'var(--yellow)', boxShadow: 'var(--glow-yellow)',
  },
  payRow: { display: 'flex', gap: 12, marginBottom: 4 },
  payCard: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 6, background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.12)',
    borderRadius: 'var(--radius-lg)', padding: '16px 12px', cursor: 'pointer',
    transition: 'all 0.2s',
  },
  payCardActive: {
    border: '2px solid var(--yellow)', boxShadow: 'var(--glow-yellow)',
    background: 'rgba(255,215,0,0.05)',
  },
  payIcon: { fontSize: 28 },
  payLabel: { fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--white)', letterSpacing: 1 },
  payDesc: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gray)', textAlign: 'center' },
  cardForm: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 4 },
  input: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.2)',
    color: 'var(--white)', padding: '12px 14px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)', fontSize: 15, outline: 'none',
  },
  placeBtn: {
    width: '100%', background: 'var(--yellow)', color: 'var(--black)',
    border: 'none', padding: '16px 0', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700,
    letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase',
    boxShadow: 'var(--glow-yellow)', marginTop: 20,
  },
  successRing: {
    width: 90, height: 90, borderRadius: '50%',
    border: '3px solid var(--yellow)', boxShadow: 'var(--glow-yellow-intense)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 42, color: 'var(--yellow)', marginBottom: 20,
  },
  successTitle: { fontFamily: 'var(--font-heading)', fontSize: 30, color: 'var(--yellow)', margin: '0 0 8px', textShadow: 'var(--glow-yellow-intense)' },
  successSub: { fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--white)', margin: '0 0 8px' },
  successNote: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gray)', margin: '0 0 12px', textAlign: 'center' },
  pointsNote: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gold)', margin: '0 0 28px' },
  doneBtn: {
    background: 'var(--yellow)', color: 'var(--black)', border: 'none',
    padding: '14px 40px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 13, cursor: 'pointer',
    letterSpacing: 1, textTransform: 'uppercase',
  },
};
