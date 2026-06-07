import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useRewards } from '../contexts/RewardsContext';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

const statusColors: Record<string, string> = {
  'Delivered': '#00FF88',
  'Processing': '#FFD700',
  'Ready for Pickup': '#00BFFF',
  'Cancelled': '#FF4444',
};

export default function Account() {
  const navigate = useNavigate();
  const { user, orders, savedAddresses, logout } = useAuth();
  const { items: wishlist } = useWishlist();
  const { points, tier } = useRewards();
  const { addToCart } = useCart();

  if (!user) {
    return (
      <div style={styles.page}>
        <CoffeeBeanDecor count={8} />
        <div style={{ ...styles.content, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <span style={{ fontSize: 64 }}>👤</span>
          <h2 style={styles.noUserTitle}>Sign In to Your Account</h2>
          <p style={styles.noUserSub}>Track orders, earn rewards, and save favorites.</p>
          <button style={styles.loginBtn} onClick={() => navigate('/login')}>Login / Sign Up</button>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={8} />
      <div style={styles.content}>
        {/* Profile */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            <span style={{ fontSize: 32 }}>👤</span>
          </div>
          <div style={styles.profileInfo}>
            <p style={styles.profileName}>{user.name}</p>
            <p style={styles.profileEmail}>{user.email}</p>
            <div style={styles.tierBadge}>
              <span>{tier === 'Gold' ? '🥇' : tier === 'Silver' ? '🥈' : '🥉'}</span>
              <span style={styles.tierText}>{tier} Member · {points} pts</span>
            </div>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>

        {/* Quick actions */}
        <div style={styles.quickGrid}>
          <button style={styles.quickBtn} onClick={() => navigate('/rewards')}>
            <span>⭐</span><span>Rewards</span>
          </button>
          <button style={styles.quickBtn} onClick={() => navigate('/cart')}>
            <span>🛒</span><span>Cart</span>
          </button>
          <button style={styles.quickBtn} onClick={() => navigate('/prepared-foods')}>
            <span>🍳</span><span>Kitchen</span>
          </button>
          <button style={styles.quickBtn} onClick={() => navigate('/shop')}>
            <span>🛍️</span><span>Shop</span>
          </button>
        </div>

        {/* Order History */}
        <p style={styles.sectionLabel}>ORDER HISTORY</p>
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <span style={styles.orderId}>{order.id}</span>
                <span style={{ ...styles.orderStatus, color: statusColors[order.status] || 'var(--gray)' }}>
                  {order.status}
                </span>
              </div>
              <p style={styles.orderDate}>{order.date}</p>
              <p style={styles.orderItems}>{order.items.join(' · ')}</p>
              <div style={styles.orderFooter}>
                <span style={styles.orderTotal}>${order.total.toFixed(2)}</span>
                <button style={styles.reorderBtn} onClick={() => navigate('/shop')}>Reorder</button>
              </div>
            </div>
          ))}
        </div>

        {/* Saved Addresses */}
        <p style={styles.sectionLabel}>SAVED ADDRESSES</p>
        <div style={styles.addressList}>
          {savedAddresses.map((addr, i) => (
            <div key={i} style={styles.addressCard}>
              <span style={{ marginRight: 8 }}>📍</span>
              <span style={styles.addressText}>{addr}</span>
            </div>
          ))}
        </div>

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <>
            <p style={styles.sectionLabel}>MY WISHLIST</p>
            <div style={styles.wishGrid}>
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--black)', position: 'relative' },
  content: { maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px 100px', position: 'relative', zIndex: 1 },
  profileCard: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: 'linear-gradient(135deg, #1a1400, #111)',
    border: '1px solid rgba(255,215,0,0.2)', borderRadius: 'var(--radius-lg)',
    padding: '16px', marginBottom: 20,
  },
  avatar: {
    width: 56, height: 56, borderRadius: '50%',
    background: 'rgba(255,215,0,0.1)', border: '2px solid var(--yellow)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: 'var(--font-heading)', fontSize: 16, color: 'var(--white)', margin: '0 0 2px', letterSpacing: 0.5 },
  profileEmail: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray)', margin: '0 0 6px' },
  tierBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)',
    borderRadius: 12, padding: '3px 8px', fontSize: 14,
  },
  tierText: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gold)', fontWeight: 600 },
  logoutBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--gray)', padding: '6px 12px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)', fontSize: 12, cursor: 'pointer', flexShrink: 0,
  },
  quickGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 28 },
  quickBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.1)',
    borderRadius: 'var(--radius)', padding: '12px 0', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gray)',
  },
  sectionLabel: { fontFamily: 'var(--font-heading)', fontSize: 10, color: 'var(--gold)', letterSpacing: 3, margin: '0 0 12px' },
  ordersList: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 },
  orderCard: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.08)',
    borderRadius: 'var(--radius-lg)', padding: '14px 16px',
  },
  orderHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 },
  orderId: { fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--yellow)', letterSpacing: 1 },
  orderStatus: { fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700 },
  orderDate: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gray)', margin: '0 0 6px' },
  orderItems: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--white)', margin: '0 0 10px', lineHeight: 1.4 },
  orderFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  orderTotal: { fontFamily: 'var(--font-heading)', fontSize: 16, color: 'var(--yellow)' },
  reorderBtn: {
    background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)',
    color: 'var(--yellow)', padding: '6px 14px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 10, cursor: 'pointer', letterSpacing: 1,
  },
  addressList: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 },
  addressCard: {
    display: 'flex', alignItems: 'center',
    background: 'var(--black-2)', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 'var(--radius)', padding: '12px 14px',
  },
  addressText: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gray)' },
  wishGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  noUserTitle: { fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--white)', margin: '16px 0 8px', textAlign: 'center' },
  noUserSub: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gray)', margin: '0 0 24px', textAlign: 'center' },
  loginBtn: {
    background: 'var(--yellow)', color: 'var(--black)', border: 'none',
    padding: '14px 40px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 13, cursor: 'pointer',
    letterSpacing: 1, textTransform: 'uppercase', boxShadow: 'var(--glow-yellow)',
  },
};
