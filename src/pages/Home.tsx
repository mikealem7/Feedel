import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { CATEGORIES } from '../data/products';

export default function Home() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate title on mount
    const el = titleRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'all 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={12} />
      <div style={styles.content}>
        {/* Logo section */}
        <div style={styles.logoSection}>
          <div style={styles.logoRing}>
            <span style={styles.logoIcon}>☕</span>
          </div>
          <h1 ref={titleRef} style={styles.title}>FEEDEL</h1>
          <p style={styles.subtitle}>International Market</p>
          <p style={styles.tagline}>Ethiopian Roots · Global Flavors</p>
          <div style={styles.divider} />
        </div>

        {/* Quick actions */}
        <div style={styles.quickActions}>
          <button style={styles.primaryBtn} onClick={() => navigate('/shop')}>
            Browse Market
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate('/prepared-foods')}>
            🍽️ Today's Kitchen
          </button>
        </div>

        {/* Fresh daily banner */}
        <div style={styles.freshBanner}>
          <span style={styles.blinkDot} />
          <span style={styles.freshText}>Injera &amp; Prepared Foods Made Fresh Daily</span>
        </div>

        {/* Category grid */}
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>SHOP BY CATEGORY</span>
          <span style={styles.sectionLine} />
        </div>
        <div style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={styles.catChip}
              onClick={() => navigate(`/shop/${encodeURIComponent(cat)}`)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Store info */}
        <div style={styles.infoCard}>
          <p style={styles.infoTitle}>📍 Visit Us</p>
          <p style={styles.infoText}>Feedel International Market</p>
          <p style={styles.infoText}>Open Mon–Sat · 8am–9pm</p>
          <p style={styles.infoText}>Sun · 10am–7pm</p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'var(--black)',
    position: 'relative',
  },
  content: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '32px 16px 100px',
    position: 'relative',
    zIndex: 1,
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: 32,
  },
  logoRing: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    border: '2px solid var(--yellow)',
    boxShadow: 'var(--glow-yellow)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontSize: 36,
    background: 'rgba(255,215,0,0.05)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 52,
    fontWeight: 900,
    color: 'var(--yellow)',
    letterSpacing: 8,
    textShadow: 'var(--glow-yellow-intense)',
    margin: 0,
    animation: 'glow-pulse 3s ease-in-out infinite',
  },
  subtitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 12,
    color: 'var(--gold)',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  tagline: {
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'var(--gray)',
    marginTop: 8,
    letterSpacing: 1,
  },
  divider: {
    width: 80,
    height: 1,
    background: 'linear-gradient(to right, transparent, var(--yellow), transparent)',
    margin: '20px auto 0',
  },
  quickActions: {
    display: 'flex',
    gap: 12,
    marginBottom: 20,
  },
  primaryBtn: {
    flex: 1,
    background: 'var(--yellow)',
    color: 'var(--black)',
    border: 'none',
    padding: '14px 0',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    flex: 1,
    background: 'transparent',
    color: 'var(--yellow)',
    border: '1px solid var(--yellow)',
    padding: '14px 0',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  freshBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(255,215,0,0.05)',
    border: '1px solid rgba(255,215,0,0.2)',
    borderRadius: 'var(--radius)',
    padding: '10px 14px',
    marginBottom: 28,
  },
  blinkDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--yellow)',
    animation: 'blink-yellow 1s infinite',
    flexShrink: 0,
    display: 'inline-block',
  },
  freshText: {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    color: 'var(--yellow)',
    fontWeight: 600,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 11,
    color: 'var(--gold)',
    letterSpacing: 2,
    whiteSpace: 'nowrap',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    background: 'rgba(201,162,39,0.2)',
    display: 'block',
  },
  categoryGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 28,
  },
  catChip: {
    background: 'var(--black-light)',
    border: '1px solid rgba(255,215,0,0.2)',
    color: 'var(--gray-light, #ccc)',
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    padding: '8px 14px',
    borderRadius: 20,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  infoCard: {
    background: 'var(--black-light)',
    border: '1px solid rgba(201,162,39,0.2)',
    borderRadius: 'var(--radius)',
    padding: '16px',
    textAlign: 'center',
  },
  infoTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 13,
    color: 'var(--yellow)',
    marginBottom: 8,
    letterSpacing: 1,
  },
  infoText: {
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'var(--gray)',
    marginBottom: 2,
  },
};
