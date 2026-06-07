import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={styles.page}>
        <div style={styles.content}>
          <p style={styles.notFound}>Product not found.</p>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={8} />
      <div style={styles.content}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div style={styles.imageArea}>
          <span style={styles.emoji}>{product.emoji}</span>
          {product.isFresh && (
            <div style={styles.freshBadge}>
              <span style={styles.freshDot} />
              <span>Made Fresh Daily</span>
            </div>
          )}
        </div>

        <div style={styles.infoCard}>
          <div style={styles.categoryTag}>{product.category}</div>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p style={styles.description}>{product.description}</p>

          {product.tips && (
            <div style={styles.tipsBox}>
              <p style={styles.tipsTitle}>💡 Serving Tip</p>
              <p style={styles.tipsText}>{product.tips}</p>
            </div>
          )}

          <div style={styles.actions}>
            <button
              style={{ ...styles.wishBtn, color: wishlisted ? 'var(--yellow)' : 'var(--gray)', borderColor: wishlisted ? 'var(--yellow)' : 'rgba(255,255,255,0.1)' }}
              onClick={() => toggleWishlist(product)}
            >
              {wishlisted ? '❤️ Saved' : '🤍 Wishlist'}
            </button>
            <button
              style={{ ...styles.cartBtn, background: added ? '#00FF88' : 'var(--yellow)', color: added ? 'var(--black)' : 'var(--black)' }}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--black)', position: 'relative' },
  content: { maxWidth: 'var(--max-width)', margin: '0 auto', padding: '16px 16px 100px', position: 'relative', zIndex: 1 },
  backBtn: {
    background: 'none', border: '1px solid rgba(255,215,0,0.2)', color: 'var(--yellow)',
    padding: '8px 16px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-heading)',
    fontSize: 12, cursor: 'pointer', marginBottom: 16, letterSpacing: 1,
  },
  imageArea: {
    background: 'linear-gradient(135deg, #1a1a1a, #111)',
    border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 'var(--radius-lg)',
    height: 240,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, position: 'relative', overflow: 'hidden',
  },
  emoji: { fontSize: 80 },
  freshBadge: {
    position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
    borderRadius: 20, padding: '4px 12px',
    fontFamily: 'var(--font-body)', fontSize: 12, color: '#00FF88', whiteSpace: 'nowrap',
  },
  freshDot: {
    width: 7, height: 7, borderRadius: '50%', background: '#00FF88',
    animation: 'blink-yellow 1s infinite', flexShrink: 0, display: 'inline-block',
  },
  infoCard: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.1)',
    borderRadius: 'var(--radius-lg)', padding: 20,
  },
  categoryTag: {
    display: 'inline-block', background: 'rgba(255,215,0,0.1)', color: 'var(--yellow)',
    fontFamily: 'var(--font-heading)', fontSize: 10, letterSpacing: 2,
    padding: '4px 10px', borderRadius: 20, marginBottom: 12, textTransform: 'uppercase',
  },
  name: {
    fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--white)',
    margin: '0 0 8px', lineHeight: 1.3,
  },
  price: {
    fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--yellow)',
    margin: '0 0 16px', textShadow: 'var(--glow-yellow)',
  },
  description: {
    fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gray)',
    lineHeight: 1.6, margin: '0 0 16px',
  },
  tipsBox: {
    background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 'var(--radius)', padding: '12px 14px', marginBottom: 20,
  },
  tipsTitle: { fontFamily: 'var(--font-heading)', fontSize: 11, color: 'var(--gold)', margin: '0 0 6px', letterSpacing: 1 },
  tipsText: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gray)', margin: 0, lineHeight: 1.5 },
  actions: { display: 'flex', gap: 12 },
  wishBtn: {
    flex: 0, whiteSpace: 'nowrap', background: 'transparent',
    border: '1px solid', padding: '14px 16px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
  },
  cartBtn: {
    flex: 1, border: 'none', padding: '14px 0',
    borderRadius: 'var(--radius)', fontFamily: 'var(--font-heading)',
    fontSize: 13, fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
    textTransform: 'uppercase', transition: 'all 0.3s',
  },
  notFound: { fontFamily: 'var(--font-body)', color: 'var(--gray)', fontSize: 16 },
};
