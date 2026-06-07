import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
}

export default function Header({ title, showBack = false, rightElement }: Props) {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      {showBack ? (
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
      ) : (
        <div style={{ width: 60 }} />
      )}
      <h1 style={styles.title}>{title}</h1>
      <div style={styles.right}>{rightElement ?? <div style={{ width: 60 }} />}</div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0 16px',
    borderBottom: '1px solid rgba(255,215,0,0.1)',
    marginBottom: 16,
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--yellow)',
    fontFamily: 'var(--font-heading)',
    fontSize: 12,
    cursor: 'pointer',
    letterSpacing: 0.5,
    width: 60,
    textAlign: 'left',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 14,
    color: 'var(--yellow)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadow: 'var(--glow-yellow)',
    textAlign: 'center',
  },
  right: {
    width: 60,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
