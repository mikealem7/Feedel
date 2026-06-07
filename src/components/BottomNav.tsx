import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const navItems = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Shop', path: '/shop', icon: '🛍️' },
  { label: 'Rewards', path: '/rewards', icon: '⭐' },
  { label: 'Account', path: '/account', icon: '👤' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => {
        const isActive =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              ...styles.navBtn,
              color: isActive ? 'var(--yellow)' : 'var(--gray)',
            }}
          >
            <span style={styles.iconWrap}>
              <span style={styles.icon}>{item.icon}</span>
              {item.label === 'Shop' && totalItems > 0 && (
                <span style={styles.badge}>{totalItems}</span>
              )}
            </span>
            <span
              style={{
                ...styles.label,
                color: isActive ? 'var(--yellow)' : 'var(--gray)',
                textShadow: isActive ? 'var(--glow-yellow)' : 'none',
              }}
            >
              {item.label}
            </span>
            {isActive && <span style={styles.activeDot} />}
          </button>
        );
      })}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    background: 'var(--black-mid)',
    borderTop: '1px solid rgba(255,215,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 100,
    boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
  },
  navBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
    position: 'relative',
    minWidth: 60,
  },
  iconWrap: {
    position: 'relative',
  },
  icon: {
    fontSize: 22,
    display: 'block',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    background: 'var(--yellow)',
    color: 'var(--black)',
    fontSize: 10,
    fontWeight: 700,
    fontFamily: 'var(--font-heading)',
    borderRadius: '50%',
    width: 16,
    height: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontFamily: 'var(--font-heading)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: 'var(--yellow)',
    boxShadow: 'var(--glow-yellow)',
  },
};
