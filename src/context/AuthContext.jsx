
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import { getStoredAuth, setStoredAuth } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth());
  const [loading, setLoading] = useState(Boolean(getStoredAuth()));

  const persistAuth = (value) => {
    setAuth(value);
    setStoredAuth(value);
  };

  const refreshUser = async () => {
    const existing = getStoredAuth();
    if (!existing?.token) {
      setLoading(false);
      return null;
    }

    try {
      const { data } = await client.get('/auth/me');
      const nextAuth = { ...existing, ...data, token: existing.token };
      persistAuth(nextAuth);
      return nextAuth;
    } catch {
      persistAuth(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (payload) => {
    const { data } = await client.post('/auth/login', payload);
    persistAuth(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await client.post('/auth/register', payload);
    persistAuth(data);
    return data;
  };

  const forgotPassword = async (payload) => {
    const { data } = await client.post('/auth/forgot-password', payload);
    return data;
  };

  const resetPassword = async (payload) => {
    const { data } = await client.post('/auth/reset-password', payload);
    return data;
  };

  const updateStoredUser = (patch) => {
    const existing = getStoredAuth();
    if (!existing) return;
    const next = { ...existing, ...patch, preferences: { ...existing.preferences, ...patch.preferences } };
    persistAuth(next);
  };

  const logout = () => {
    persistAuth(null);
  };

  const value = useMemo(
    () => ({
      auth,
      user: auth,
      isAuthenticated: Boolean(auth?.token),
      loading,
      login,
      register,
      logout,
      refreshUser,
      forgotPassword,
      resetPassword,
      updateStoredUser
    }),
    [auth, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
