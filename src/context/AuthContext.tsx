import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserProfile, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAgent: boolean;
  signIn: (email: string, password?: string, role?: UserRole) => Promise<boolean>;
  signUp: (data: { name: string; email: string; password?: string; role: UserRole; phone: string; agencyName?: string }) => Promise<boolean>;
  socialSignIn: (provider: 'google' | 'facebook', email: string, name?: string) => Promise<boolean>;
  signOut: () => void;
  switchRole: (role: UserRole) => void;
  demoLogin: (role: 'buyer' | 'agent') => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const STORAGE_KEY = 'securestay_auth_user';

const DEMO_BUYER: UserProfile = {
  id: 'usr-demo-buyer',
  name: 'Devraj Kapoor',
  email: 'devraj.kapoor@example.com',
  role: 'buyer',
  phone: '+91 98110 54321',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  isEmailVerified: true,
  savedPropertyIds: ['prop-grand-oak', 'prop-palm-grove-goa'],
  createdAt: '2025-01-15',
};

const DEMO_AGENT: UserProfile = {
  id: 'usr-demo-agent',
  name: 'Vikram Patel',
  email: 'vikram.patel@securestay.com',
  role: 'agent',
  phone: '+91 98450 18234',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
  agencyName: 'SecureStay Advisory Prime',
  licenseNumber: 'RERA-KA-2023-88910',
  isEmailVerified: true,
  savedPropertyIds: ['prop-skyline-crest'],
  createdAt: '2024-03-20',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEMO_BUYER;
    } catch {
      return DEMO_BUYER;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('securestay_auth_token');
      }
    } catch (e) {
      console.error('Error persisting auth state:', e);
    }
  }, [user]);

  const signIn = async (email: string, password?: string, role: UserRole = 'buyer'): Promise<boolean> => {
    try {
      const res = await api.auth.login(email, password);
      if (res && res.user) {
        setUser({
          ...res.user,
          role: role || res.user.role || 'buyer',
          savedPropertyIds: res.user.savedProperties || res.user.savedPropertyIds || [],
        });
        return true;
      }
    } catch {
      // Fallback
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role,
      phone: '+91 98000 12345',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      isEmailVerified: true,
      savedPropertyIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    return true;
  };

  const signUp = async (data: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    phone: string;
    agencyName?: string;
  }): Promise<boolean> => {
    try {
      const res = await api.auth.register({
        name: data.name,
        email: data.email,
        password: data.password || 'securestay123',
        role: (data.role === 'admin' ? 'agent' : data.role),
        phone: data.phone,
        agencyName: data.agencyName,
      });
      if (res && res.user) {
        setUser({
          ...res.user,
          savedPropertyIds: res.user.savedProperties || [],
        });
        return true;
      }
    } catch {
      // Fallback
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      agencyName: data.agencyName,
      isEmailVerified: true,
      savedPropertyIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    return true;
  };

  const socialSignIn = async (provider: 'google' | 'facebook', email: string, name?: string): Promise<boolean> => {
    try {
      const res = await api.auth.socialAuth(provider, email, name);
      if (res && res.user) {
        setUser({
          ...res.user,
          savedPropertyIds: res.user.savedProperties || [],
        });
        return true;
      }
    } catch {
      // Fallback
    }
    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    setUser({ ...user, role: newRole });
  };

  const demoLogin = (role: 'buyer' | 'agent') => {
    if (role === 'buyer') {
      setUser(DEMO_BUYER);
    } else {
      setUser(DEMO_AGENT);
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAgent: user?.role === 'agent' || user?.role === 'admin',
        signIn,
        signUp,
        socialSignIn,
        signOut,
        switchRole,
        demoLogin,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
