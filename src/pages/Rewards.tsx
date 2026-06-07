import React, { useState } from 'react';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { useRewards } from '../contexts/RewardsContext';

const TIERS = [
  { name: 'Bronze', min: 0, max: 499, color: '#CD7F32', icon: '🥉' },
  { name: 'Silver', min: 500, max: 999, color: '#C0C0C0', icon: '🥈' },
  { name: 'Gold', min: 1000, max: Infinity, color: '#FFD700', icon: '🥇' },
];

export default function Rewards() {
  const { points, history, redeemPoints, tier } = useRewards();
  const [redeemAmt, setRedeemAmt] = useState('');
  const [redeemMsg, setRedeemMsg] = useState('');

  const currentTier = TIERS.find((t) => t.name === tier)!;
  const nextTier = TIERS.find((t) => t.min > points);
  const progressPct = nextTier
    ? Math.round(((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100)
    : 100;

  const handleRedeem = () => {
    const amt = parseInt(redeemAmt, 10);
    if (isNaN(amt) || amt < 100) { setRedeemMsg('Minimum redeem is 100 points.'); return; }
    if (redeemPoints(amt)) {
      setRedeemMsg(`✓ Redeemed ${amt} pts for $${(amt / 100).toFixed(2)} off!`);
      setRedeemAmt('');
    } else {
      setRedeemMsg('Not enough points.');
    }
  };

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={10} />
      <div style={styles.content}>
        <h1 style={styles.title}>Rewards</h1>

        {/* Points balance */}
        <div style={styles.balanceCard}>
          <p style={styles.balanceLabel}>YOUR POINTS</p>
          <p style={styles.balanceNum}>{points.toLocaleString()}</p>
          <p style={styles.balanceSub}>1 point per $1 spent · 100 pts = $1 off</p>
        </div>

        {/* Tier */}
        <div style={{ ...styles.tierCard, borderColor: currentTier.color }}>
          <span style={styles.tierIcon}>{currentTier.icon}</span>
          <div style={styles.tierInfo}>
            <p style={{ ...styles.tierName, color: currentTier.color }}>{currentTier.name} Member</p>
            {nextTier ? (
              <p style={styles.tierSub}>{nextTier.min - points} pts to {nextTier.name}</p>
            ) : (
              <p style={styles.tierSub}>Top tier — Elite status!</p>
            )}
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progressPct}%`, background: currentTier.color }} />
            </div>
          </div>
        </div>

        {/* All tier badges */}
        <div style={styles.tiersRow}>
          {TIERS.map((t) => (
            <div key={t.name} style={{ ...styles.tierBadge, opacity: tier === t.name ? 1 : 0.35 }}>
              <span style={{ fontSize: 26 }}>{t.icon}</span>
              <span style={{ ...styles.tierBadgeName, color: t.color }}>{t.name}</span>
              <span style={styles.tierBadgeRange}>{t.min}–{t.max === Infinity ? '∞' : t.max}</span>
            </div>
          ))}
        </div>

        {/* Redeem */}
        <div style={styles.redeemCard}>
          <p style={styles.redeemTitle}>Redeem Points</p>
          <p style={styles.redeemDesc}>100 points = $1.00 off your order</p>
          <div style={styles.redeemRow}>
            <input
              style={styles.redeemInput}
              placeholder="Enter points (min 100)"
              value={redeemAmt}
              onChange={(e) => { setRedeemAmt(e.target.value); setRedeemMsg(''); }}
              type="number"
            />
            <button style={styles.redeemBtn} onClick={handleRedeem}>Redeem</button>
          </div>
          {redeemMsg && <p style={styles.redeemMsg}>{redeemMsg}</p>}
        </div>

        {/* History */}
        <p style={styles.sectionLabel}>POINTS HISTORY</p>
        <div style={styles.historyList}>
          {history.map((h) => (
            <div key={h.id} style={styles.historyRow}>
              <div>
                <p style={styles.historyDesc}>{h.description}</p>
                <p style={styles.historyDate}>{h.date}</p>
              </div>
              <span style={{ ...styles.historyPts, color: h.points < 0 ? '#FF4444' : '#00FF88' }}>
                {h.points > 0 ? '+' : ''}{h.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--black)', position: 'relative' },
  content: { maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 16px 100px', position: 'relative', zIndex: 1 },
  title: { fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--yellow)', margin: '0 0 24px', textShadow: 'var(--glow-yellow)', letterSpacing: 4 },
  balanceCard: {
    background: 'linear-gradient(135deg, #1a1400, #111)',
    border: '2px solid var(--yellow)', borderRadius: 'var(--radius-lg)',
    padding: '28px 20px', textAlign: 'center', boxShadow: 'var(--glow-yellow)', marginBottom: 16,
  },
  balanceLabel: { fontFamily: 'var(--font-heading)', fontSize: 10, color: 'var(--gold)', letterSpacing: 4, margin: '0 0 8px' },
  balanceNum: { fontFamily: 'var(--font-heading)', fontSize: 56, color: 'var(--yellow)', margin: '0 0 8px', textShadow: 'var(--glow-yellow-intense)', lineHeight: 1 },
  balanceSub: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray)', margin: 0 },
  tierCard: {
    display: 'flex', alignItems: 'center', gap: 16,
    background: 'var(--black-2)', border: '1px solid',
    borderRadius: 'var(--radius-lg)', padding: '14px 16px', marginBottom: 16,
  },
  tierIcon: { fontSize: 36, flexShrink: 0 },
  tierInfo: { flex: 1 },
  tierName: { fontFamily: 'var(--font-heading)', fontSize: 16, margin: '0 0 4px', letterSpacing: 1 },
  tierSub: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray)', margin: '0 0 8px' },
  progressBar: { height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3, transition: 'width 0.5s ease' },
  tiersRow: { display: 'flex', gap: 10, marginBottom: 24 },
  tierBadge: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'var(--black-2)', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 'var(--radius)', padding: '12px 8px', transition: 'opacity 0.3s',
  },
  tierBadgeName: { fontFamily: 'var(--font-heading)', fontSize: 10, letterSpacing: 1 },
  tierBadgeRange: { fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--gray)' },
  redeemCard: {
    background: 'var(--black-2)', border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 'var(--radius-lg)', padding: '16px 18px', marginBottom: 24,
  },
  redeemTitle: { fontFamily: 'var(--font-heading)', fontSize: 14, color: 'var(--yellow)', margin: '0 0 4px', letterSpacing: 1 },
  redeemDesc: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray)', margin: '0 0 14px' },
  redeemRow: { display: 'flex', gap: 10 },
  redeemInput: {
    flex: 1, background: 'var(--black)', border: '1px solid rgba(255,215,0,0.2)',
    color: 'var(--white)', padding: '10px 12px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
  },
  redeemBtn: {
    background: 'var(--yellow)', color: 'var(--black)', border: 'none',
    padding: '10px 18px', borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-heading)', fontSize: 12, cursor: 'pointer', letterSpacing: 1,
  },
  redeemMsg: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gold)', margin: '10px 0 0' },
  sectionLabel: { fontFamily: 'var(--font-heading)', fontSize: 10, color: 'var(--gold)', letterSpacing: 3, margin: '0 0 12px' },
  historyList: { display: 'flex', flexDirection: 'column', gap: 10 },
  historyRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'var(--black-2)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: 'var(--radius)', padding: '12px 14px',
  },
  historyDesc: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--white)', margin: '0 0 2px', fontWeight: 600 },
  historyDate: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gray)', margin: 0 },
  historyPts: { fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700 },
};
