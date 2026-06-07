import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Ready for Pickup' | 'Cancelled';
  items: string[];
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  savedAddresses: string[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-06-01',
    total: 45.97,
    status: 'Delivered',
    items: ['Fresh Injera (5-pack)', 'Berbere Spice Blend', 'Scrambled Eggs'],
  },
  {
    id: 'ORD-002',
    date: '2026-05-28',
    total: 89.98,
    status: 'Delivered',
    items: ['Habesha Kemis (White)', 'Ethiopian Cross Necklace (Gold)'],
  },
  {
    id: 'ORD-003',
    date: '2026-06-07',
    total: 23.97,
    status: 'Ready for Pickup',
    items: ['Fried Chicken', 'Yellow Rice', 'Sambosa (6-pack)'],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders] = useState<Order[]>(mockOrders);
  const [savedAddresses] = useState<string[]>([
    '1234 Edgewood Ave NE, Atlanta, GA 30307',
    '5678 Buford Hwy, Doraville, GA 30340',
  ]);

  const login = (email: string, _password: string): boolean => {
    // Mock login
    setUser({
      id: 'u1',
      name: 'Almaz Bekele',
      email,
    });
    return true;
  };

  const signup = (name: string, email: string, _password: string): boolean => {
    setUser({ id: 'u1', name, email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, orders, savedAddresses, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
