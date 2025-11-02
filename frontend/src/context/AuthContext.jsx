import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('clinic-os-auth');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('Failed to parse stored auth payload', error);
        }
      }
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      window.localStorage.setItem('clinic-os-auth', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('clinic-os-auth');
    }
  }, [user]);

  const login = (profile) => {
    setUser({ ...profile });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
