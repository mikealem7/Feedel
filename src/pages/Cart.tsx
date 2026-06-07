import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={6} />
      <div style={styles.content}>
        <div style={styles.headerRow}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
          <h1 style={styles.title}>Cart</h1>
          <span />
        </div>

        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={{ fontSize: 64 }}>🛒</span>
            <p style={styles.emptyText}>Your cart is empty</p>
            <button style={styles.shopBtn} onClick={() => navigate('/shop')}>Browse Market</button>
          </div>
        ) : (
          <>
            <div style={styles.itemsList}>
              {items.map((item) => (
                <div key={item.product.id} style={styles.itemRow}>
                  <div style={styles.itemEmoji}>{item.product.emoji}</div>
                  <div style={styles.itemInfo}>
                    <p style={styles.itemName}>{item.product.name}</p>
                    <p style={styles.itemPrice}>${(item.product.price * item.quantity).toFixed(2)}</p>
                    {item.product.isFresh && (
                      <span style={styles.freshTag}>Fresh Daily</span>
                    )}
                  </div>
                  <div style={styles.qtyControls}>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
                    <span style={styles.qtyNum}>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                  <button style={styles.removeBtn} onClick={() => removeFromCart(item.product.id)}>✕</button>
                </div>
              ))}
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal</span>
                <span style={styles.summaryValue}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Tax (8%)</span>
                <span style={styles.summaryValue}>${tax.toFixed(2)}</span>
              </div>
              <div style={styles.divider} />
              <div style={styles.summaryRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button style={styles.checkoutBtn} onClick={() => navigate('/checkout')}>
              Proceed to Checkout →
            </button>
          </>
        )}
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
  title: { fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--yellow)', margin: 0, textShadow: 'var(--glow-yellow)' },
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: 300, gap: 16,
  },
  emptyText: { fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--gray)' },
  shopBtn: {
    background: 'var(--yellow)', color: 'var(--black)', border: 'none',
    padding: '14px 32px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-heading)',
    fontSize: 13, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase',
  },
  itemsList: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 },
  itemRow: {
    display: 'flex', alignItems: 'center', gap: 12,
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.08)',
    borderRadius: 'var(--radius-lg)', padding: '12px 14px',
  },
  itemEmoji: {
    fontSize: 32, width: 44, height: 44,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(255,215,0,0.05)', borderRadius: 'var(--radius)', flexShrink: 0,
  },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--white)', margin: '0 0 4px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  itemPrice: { fontFamily: 'var(--font-heading)', fontSize: 15, color: 'var(--yellow)', margin: 0 },
  freshTag: {
    display: 'inline-block', fontSize: 10, color: '#00FF88',
    border: '1px solid rgba(0,255,136,0.3)', borderRadius: 10,
    padding: '2px 6px', marginTop: 4, fontFamily: 'var(--font-body)',
  },
  qtyControls: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)',
    color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontSize: 16,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  qtyNum: { fontFamily: 'var(--font-heading)', fontSize: 15, color: 'var(--white)', minWidth: 20, textAlign: 'center' },
  removeBtn: {
    background: 'none', border: 'none', color: 'var(--gray)',
    fontSize: 16, cursor: 'pointer', padding: 4, flexShrink: 0,
  },
  summaryCard: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.1)',
    borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: 20,
  },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gray)' },
  summaryValue: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--white)', fontWeight: 600 },
  divider: { height: 1, background: 'rgba(255,215,0,0.1)', margin: '12px 0' },
  totalLabel: { fontFamily: 'var(--font-heading)', fontSize: 16, color: 'var(--yellow)', letterSpacing: 1 },
  totalValue: { fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--yellow)', textShadow: 'var(--glow-yellow)' },
  checkoutBtn: {
    width: '100%', background: 'var(--yellow)', color: 'var(--black)',
    border: 'none', padding: '16px 0', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700,
    letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase',
    boxShadow: 'var(--glow-yellow)',
  },
};
