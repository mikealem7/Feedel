import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (mode === 'signup' && !name) { setError('Please enter your name.'); return; }
    const ok = mode === 'login' ? login(email, password) : signup(name, email, password);
    if (ok) navigate('/account');
    else setError('Something went wrong. Try again.');
  };

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={10} />
      <div style={styles.content}>
        <div style={styles.logoArea}>
          <div style={styles.logoRing}>☕</div>
          <h1 style={styles.logo}>FEEDEL</h1>
          <p style={styles.logoSub}>International Market</p>
        </div>

        <div style={styles.toggleRow}>
          <button style={{ ...styles.toggleBtn, ...(mode === 'login' ? styles.toggleActive : {}) }} onClick={() => setMode('login')}>Login</button>
          <button style={{ ...styles.toggleBtn, ...(mode === 'signup' ? styles.toggleActive : {}) }} onClick={() => setMode('signup')}>Sign Up</button>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              style={styles.input} placeholder="Full Name"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            style={styles.input} placeholder="Email Address" type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input} placeholder="Password" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.submitBtn} type="submit">
            {mode === 'login' ? 'Login →' : 'Create Account →'}
          </button>
        </form>

        <div style={styles.perksBox}>
          <p style={styles.perksTitle}>🌟 Member Perks</p>
          <p style={styles.perkItem}>• Earn 1 point per $1 spent</p>
          <p style={styles.perkItem}>• Exclusive member deals</p>
          <p style={styles.perkItem}>• Order history & easy reorder</p>
          <p style={styles.perkItem}>• Save your favorites</p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--black)', position: 'relative' },
  content: { maxWidth: 'var(--max-width)', margin: '0 auto', padding: '40px 20px 100px', position: 'relative', zIndex: 1 },
  logoArea: { textAlign: 'center', marginBottom: 36 },
  logoRing: {
    width: 64, height: 64, borderRadius: '50%',
    border: '2px solid var(--yellow)', boxShadow: 'var(--glow-yellow)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 12px', fontSize: 28, background: 'rgba(255,215,0,0.05)',
  },
  logo: { fontFamily: 'var(--font-heading)', fontSize: 38, color: 'var(--yellow)', textShadow: 'var(--glow-yellow-intense)', margin: '0 0 4px', letterSpacing: 6 },
  logoSub: { fontFamily: 'var(--font-heading)', fontSize: 10, color: 'var(--gold)', letterSpacing: 3, margin: 0 },
  toggleRow: {
    display: 'flex', background: 'var(--black-2)',
    border: '1px solid rgba(255,215,0,0.15)', borderRadius: 'var(--radius)',
    padding: 4, marginBottom: 24, gap: 4,
  },
  toggleBtn: {
    flex: 1, background: 'none', border: 'none', color: 'var(--gray)',
    padding: '10px 0', borderRadius: 6,
    fontFamily: 'var(--font-heading)', fontSize: 12, cursor: 'pointer', letterSpacing: 1,
  },
  toggleActive: {
    background: 'var(--yellow)', color: 'var(--black)',
    boxShadow: 'var(--glow-yellow)',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 },
  input: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.2)',
    color: 'var(--white)', padding: '14px 16px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)', fontSize: 15, outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  error: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#FF4444', margin: 0 },
  submitBtn: {
    background: 'var(--yellow)', color: 'var(--black)', border: 'none',
    padding: '15px 0', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700,
    letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase',
    boxShadow: 'var(--glow-yellow)',
  },
  perksBox: {
    background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.1)',
    borderRadius: 'var(--radius-lg)', padding: '16px 18px',
  },
  perksTitle: { fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--gold)', margin: '0 0 10px', letterSpacing: 1 },
  perkItem: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--gray)', margin: '0 0 6px' },
};
