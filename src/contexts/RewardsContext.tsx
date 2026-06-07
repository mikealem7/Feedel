import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PointsHistory {
  id: string;
  date: string;
  description: string;
  points: number;
}

interface RewardsContextType {
  points: number;
  history: PointsHistory[];
  addPoints: (amount: number, description: string) => void;
  redeemPoints: (points: number) => boolean;
  tier: 'Bronze' | 'Silver' | 'Gold';
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

const mockHistory: PointsHistory[] = [
  { id: 'h1', date: '2026-06-01', description: 'Purchase — $24.50', points: 24 },
  { id: 'h2', date: '2026-05-28', description: 'Purchase — $68.00', points: 68 },
  { id: 'h3', date: '2026-05-20', description: 'Purchase — $15.99', points: 15 },
  { id: 'h4', date: '2026-05-10', description: 'Sign-up Bonus', points: 50 },
];

function getTier(points: number): 'Bronze' | 'Silver' | 'Gold' {
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(157);
  const [history, setHistory] = useState<PointsHistory[]>(mockHistory);

  const addPoints = (amount: number, description: string) => {
    const earned = Math.floor(amount);
    setPoints((p) => p + earned);
    setHistory((h) => [
      {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        description,
        points: earned,
      },
      ...h,
    ]);
  };

  const redeemPoints = (pts: number): boolean => {
    if (pts > points || pts < 100) return false;
    setPoints((p) => p - pts);
    setHistory((h) => [
      {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        description: `Redeemed ${pts} points`,
        points: -pts,
      },
      ...h,
    ]);
    return true;
  };

  const tier = getTier(points);

  return (
    <RewardsContext.Provider value={{ points, history, addPoints, redeemPoints, tier }}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error('useRewards must be used within RewardsProvider');
  return ctx;
}
