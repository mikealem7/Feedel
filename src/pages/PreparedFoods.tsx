import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

export default function PreparedFoods() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [openTip, setOpenTip] = useState<string | null>(null);
  const preparedItems = products.filter((p) => p.category === 'Prepared Foods');

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={10} />
      <div style={styles.content}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div style={styles.header}>
          <h1 style={styles.title}>Kitchen Fresh</h1>
          <p style={styles.subtitle}>Made Every Morning · Served Daily</p>
          <div style={styles.freshBanner}>
            <span style={styles.blinkDot} />
            <span style={styles.freshText}>All items prepared fresh each day — limited quantities!</span>
          </div>
        </div>

        <div style={styles.itemsGrid}>
          {preparedItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.cardImageArea}>
                <span style={styles.emoji}>{item.emoji}</span>
                <div style={styles.liveBadge}>
                  <span style={styles.liveDot} />
                  <span>Made Today</span>
                </div>
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemDesc}>{item.description}</p>
                <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>

                {item.tips && (
                  <div style={styles.tipSection}>
                    <button
                      style={styles.tipToggle}
                      onClick={() => setOpenTip(openTip === item.id ? null : item.id)}
                    >
                      💡 {openTip === item.id ? 'Hide Tip' : 'Serving Tip'}
                      <span style={{ marginLeft: 4 }}>{openTip === item.id ? '▲' : '▼'}</span>
                    </button>
                    {openTip === item.id && (
                      <div style={styles.tipContent}>
                        <p style={styles.tipText}>{item.tips}</p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  style={styles.addBtn}
                  onClick={() => { addToCart(item); navigate('/cart'); }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.noteCard}>
          <p style={styles.noteTitle}>🕐 Freshness Guarantee</p>
          <p style={styles.noteText}>
            All prepared foods are made fresh each morning by our kitchen team.
            Orders placed before 8am are ready for same-day pickup. Items sell out daily — order early!
          </p>
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
    fontSize: 12, cursor: 'pointer', marginBottom: 20, letterSpacing: 1,
  },
  header: { textAlign: 'center', marginBottom: 28 },
  title: {
    fontFamily: 'var(--font-heading)', fontSize: 32, color: 'var(--yellow)',
    textShadow: 'var(--glow-yellow-intense)', margin: '0 0 4px', letterSpacing: 4,
  },
  subtitle: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--gray)', margin: '0 0 16px' },
  freshBanner: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 20, padding: '8px 16px',
  },
  blinkDot: {
    width: 8, height: 8, borderRadius: '50%', background: '#00FF88',
    animation: 'blink-yellow 1s infinite', flexShrink: 0, display: 'inline-block',
  },
  freshText: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#00FF88', fontWeight: 600 },
  itemsGrid: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 },
  card: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.12)',
    borderRadius: 'var(--radius-lg)', overflow: 'hidden',
  },
  cardImageArea: {
    background: 'linear-gradient(135deg, #1a1500, #111)',
    height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  emoji: { fontSize: 52 },
  liveBadge: {
    position: 'absolute', top: 8, right: 10,
    display: 'flex', alignItems: 'center', gap: 5,
    background: 'rgba(0,255,136,0.12)', border: '1px solid rgba(0,255,136,0.3)',
    borderRadius: 20, padding: '3px 10px',
    fontFamily: 'var(--font-body)', fontSize: 11, color: '#00FF88',
  },
  liveDot: {
    width: 6, height: 6, borderRadius: '50%', background: '#00FF88',
    animation: 'blink-yellow 1s infinite', display: 'inline-block',
  },
  cardBody: { padding: '14px 16px 16px' },
  itemName: { fontFamily: 'var(--font-heading)', fontSize: 16, color: 'var(--white)', margin: '0 0 6px' },
  itemDesc: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gray)', margin: '0 0 8px', lineHeight: 1.5 },
  itemPrice: { fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--yellow)', margin: '0 0 12px', textShadow: 'var(--glow-yellow)' },
  tipSection: { marginBottom: 12 },
  tipToggle: {
    background: 'none', border: 'none', color: 'var(--gold)',
    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center',
  },
  tipContent: {
    background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.1)',
    borderRadius: 'var(--radius)', padding: '10px 12px', marginTop: 8,
  },
  tipText: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray)', margin: 0, lineHeight: 1.5 },
  addBtn: {
    width: '100%', background: 'var(--yellow)', color: 'var(--black)',
    border: 'none', padding: '12px 0', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700,
    letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase',
  },
  noteCard: {
    background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 'var(--radius-lg)', padding: '16px 20px',
  },
  noteTitle: { fontFamily: 'var(--font-heading)', fontSize: 13, color: 'var(--yellow)', margin: '0 0 8px', letterSpacing: 1 },
  noteText: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gray)', margin: 0, lineHeight: 1.6 },
};
